"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface Region {
  id: string;
  name: string;
}

export default function AddKKPage() {
  const [formData, setFormData] = useState({
    no_kk: "",
    provinsi: "",
    nama_provinsi: "",
    kabupaten: "",
    nama_kabupaten: "",
    kecamatan: "",
    nama_kecamatan: "",
    kelurahan: "",
    nama_kelurahan: "",
    dusun: "",
    rw: "",
    rt: "",
    kode_pos: "",
  });

  const [provinces, setProvinces] = useState<Region[]>([]);
  const [regencies, setRegencies] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [villages, setVillages] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState({
    provinces: false,
    regencies: false,
    districts: false,
    villages: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const dusunOptions = [
    "Stasiun",
    "Lubuak Nan Godang",
    "Pasar Baru",
    "Pasar Usang",
    "Bukit Kuning"
  ];

  // API Functions
  const fetchProvinces = async () => {
    setIsLoading(prev => ({ ...prev, provinces: true }));
    try {
      const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("Gagal memuat provinsi:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: "Gagal memuat daftar provinsi. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const fetchRegencies = async (provinceId: string) => {
    if (!provinceId) return;
    setIsLoading(prev => ({ ...prev, regencies: true }));
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      const data = await response.json();
      setRegencies(data);
    } catch (error) {
      console.error("Gagal memuat kabupaten:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, regencies: false }));
    }
  };

  const fetchDistricts = async (regencyId: string) => {
    if (!regencyId) return;
    setIsLoading(prev => ({ ...prev, districts: true }));
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error("Gagal memuat kecamatan:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const fetchVillages = async (districtId: string) => {
    if (!districtId) return;
    setIsLoading(prev => ({ ...prev, villages: true }));
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`);
      const data = await response.json();
      setVillages(data);
    } catch (error) {
      console.error("Gagal memuat kelurahan:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, villages: false }));
    }
  };

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Load regencies when province is selected
  useEffect(() => {
    if (formData.provinsi) {
      fetchRegencies(formData.provinsi);
      // Find selected province name
      const selectedProvince = provinces.find(p => p.id === formData.provinsi);
      setFormData(prev => ({
        ...prev,
        kabupaten: "",
        nama_kabupaten: "",
        kecamatan: "",
        nama_kecamatan: "",
        kelurahan: "",
        nama_kelurahan: "",
        nama_provinsi: selectedProvince?.name || ""
      }));
    }
  }, [formData.provinsi]);

  // Load districts when regency is selected
  useEffect(() => {
    if (formData.kabupaten) {
      fetchDistricts(formData.kabupaten);
      // Find selected regency name
      const selectedRegency = regencies.find(r => r.id === formData.kabupaten);
      setFormData(prev => ({
        ...prev,
        kecamatan: "",
        nama_kecamatan: "",
        kelurahan: "",
        nama_kelurahan: "",
        nama_kabupaten: selectedRegency?.name || ""
      }));
    }
  }, [formData.kabupaten]);

  // Load villages when district is selected
  useEffect(() => {
    if (formData.kecamatan) {
      fetchVillages(formData.kecamatan);
      // Find selected district name
      const selectedDistrict = districts.find(d => d.id === formData.kecamatan);
      setFormData(prev => ({
        ...prev,
        kelurahan: "",
        nama_kelurahan: "",
        nama_kecamatan: selectedDistrict?.name || ""
      }));
    }
  }, [formData.kecamatan]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers for no_kk and kode_pos
    if ((name === "no_kk" || name === "kode_pos") && value !== "" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Create a new object for submission, using names instead of IDs
      const submitData = {
        no_kk: formData.no_kk,
        provinsi: formData.nama_provinsi,
        kabupaten: formData.nama_kabupaten,
        kecamatan: formData.nama_kecamatan,
        kelurahan: formData.nama_kelurahan,
        dusun: formData.dusun,
        rw: formData.rw,
        rt: formData.rt,
        kode_pos: formData.kode_pos,
      };
      await fetchData("/kelola-kk/createKK", {
        method: "POST",
        data: submitData,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kartu Keluarga berhasil ditambahkan!",
      });
      router.push("/data-penduduk");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambah Kartu Keluarga: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
          <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-[#073046] hover:bg-[#073046]/10" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#073046] to-[#0a4a66] bg-clip-text text-transparent">
                  Tambah Kartu Keluarga
                </h1>
                <p className="text-sm text-slate-600">Masukkan data Kartu Keluarga baru</p>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-[#073046]">Form Tambah Kartu Keluarga</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="no_kk">Nomor KK</Label>
                    <Input
                      id="no_kk"
                      name="no_kk"
                      type="number"
                      placeholder="Masukkan nomor KK"
                      value={formData.no_kk}
                      onChange={handleInputChange}
                      required
                      pattern="\d*"
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>

                  {/* Provinsi Dropdown */}
                  <div className="space-y-2">
                    <Label>Provinsi</Label>
                    <Select
                      value={formData.provinsi}
                      onValueChange={(value) => handleSelectChange("provinsi", value)}
                      disabled={isLoading.provinces}
                    >
                      <SelectTrigger className="border-gray-200 focus:ring-[#073046]">
                        <SelectValue placeholder={isLoading.provinces ? "Memuat..." : "Pilih Provinsi"} />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Kabupaten Dropdown */}
                  <div className="space-y-2">
                    <Label>Kabupaten/Kota</Label>
                    <Select
                      value={formData.kabupaten}
                      onValueChange={(value) => handleSelectChange("kabupaten", value)}
                      disabled={!formData.provinsi || isLoading.regencies}
                    >
                      <SelectTrigger className="border-gray-200 focus:ring-[#073046]">
                        <SelectValue 
                          placeholder={
                            !formData.provinsi 
                              ? "Pilih provinsi terlebih dahulu" 
                              : isLoading.regencies 
                                ? "Memuat..." 
                                : "Pilih Kabupaten/Kota"
                          } 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {regencies.map((regency) => (
                          <SelectItem key={regency.id} value={regency.id}>
                            {regency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Kecamatan Dropdown */}
                  <div className="space-y-2">
                    <Label>Kecamatan</Label>
                    <Select
                      value={formData.kecamatan}
                      onValueChange={(value) => handleSelectChange("kecamatan", value)}
                      disabled={!formData.kabupaten || isLoading.districts}
                    >
                      <SelectTrigger className="border-gray-200 focus:ring-[#073046]">
                        <SelectValue 
                          placeholder={
                            !formData.kabupaten 
                              ? "Pilih kabupaten terlebih dahulu" 
                              : isLoading.districts 
                                ? "Memuat..." 
                                : "Pilih Kecamatan"
                          } 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Kelurahan Dropdown */}
                  <div className="space-y-2">
                    <Label>Kelurahan/Desa</Label>
                    <Select
                      value={formData.kelurahan}
                      onValueChange={(value) => {
                        const selectedVillage = villages.find(v => v.id === value);
                        setFormData(prev => ({
                          ...prev,
                          kelurahan: value,
                          nama_kelurahan: selectedVillage?.name || ""
                        }));
                      }}
                      disabled={!formData.kecamatan || isLoading.villages}
                    >
                      <SelectTrigger className="border-gray-200 focus:ring-[#073046]">
                        <SelectValue 
                          placeholder={
                            !formData.kecamatan 
                              ? "Pilih kecamatan terlebih dahulu" 
                              : isLoading.villages 
                                ? "Memuat..." 
                                : "Pilih Kelurahan/Desa"
                          } 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {villages.map((village) => (
                          <SelectItem key={village.id} value={village.id}>
                            {village.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dusun Dropdown */}
                  <div className="space-y-2">
                    <Label>Dusun</Label>
                    <Select
                      value={formData.dusun}
                      onValueChange={(value) => handleSelectChange("dusun", value)}
                      disabled={!formData.kelurahan}
                    >
                      <SelectTrigger className="border-gray-200 focus:ring-[#073046]">
                        <SelectValue 
                          placeholder={
                            !formData.kelurahan 
                              ? "Pilih kelurahan terlebih dahulu" 
                              : "Pilih Dusun"
                          } 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dusunOptions.map((dusun) => (
                          <SelectItem key={dusun} value={dusun}>
                            {dusun}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rw">RW</Label>
                      <Input
                        id="rw"
                        name="rw"
                        placeholder="Masukkan RW"
                        value={formData.rw}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:ring-[#073046]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rt">RT</Label>
                      <Input
                        id="rt"
                        name="rt"
                        placeholder="Masukkan RT"
                        value={formData.rt}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:ring-[#073046]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kode_pos">Kode Pos</Label>
                    <Input
                      id="kode_pos"
                      name="kode_pos"
                      type="number"
                      placeholder="Masukkan kode pos"
                      value={formData.kode_pos}
                      onChange={handleInputChange}
                      required
                      pattern="\d*"
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/data-penduduk")}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#0d5a7a]"
                      disabled={isSubmitting || Object.values(isLoading).some(Boolean)}
                    >
                      {isSubmitting ? "Menyimpan..." : "Simpan Kartu Keluarga"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}