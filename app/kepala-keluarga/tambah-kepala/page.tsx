"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KartuKeluarga {
  id: string;
  no_kk: string;
  kepalaKeluargaId: string | null;
}

export default function TambahKepalaKeluargaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    no_akta_kelahiran: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    golongan_darah: "",
    agama: "",
    status_perkawinan: "",
    pendidikan_akhir: "",
    pekerjaan: "",
    nama_ayah: "",
    nama_ibu: "",
    kkId: "",
    scan_ktp: null as File | null,
    scan_kk: null as File | null,
    scan_akta_lahir: null as File | null,
    scan_buku_nikah: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [kartuKeluargas, setKartuKeluargas] = useState<KartuKeluarga[]>([]);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const agamaOptions = [
    "Islam",
    "Kristen",
    "Katolik",
    "Hindu",
    "Buddha",
    "Konghucu"
  ];

  const pendidikanOptions = [
    "Tidak Sekolah",
    "SD",
    "SMP",
    "SMA",
    "D1",
    "D2",
    "D3",
    "S1",
    "S2",
    "S3"
  ];

  useEffect(() => {
    const loadKartuKeluargas = async () => {
      try {
        const response = await fetchData("/kelola-kk/getAllKK");
        const kks = Array.isArray(response) ? response : response.data || [];
        setKartuKeluargas(kks.filter((kk: KartuKeluarga) => !kk.kepalaKeluargaId));
      } catch (err) {
        setError(`Gagal memuat data KK: ${err.message || "Terjadi kesalahan"}`);
      }
    };
    loadKartuKeluargas();
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.nik) errors.nik = "NIK harus diisi";
    else if (!/^\d{16}$/.test(formData.nik)) errors.nik = "NIK harus 16 digit angka";
    if (!formData.kkId) errors.kkId = "Nomor Kartu Keluarga harus dipilih";
    if (!formData.nama) errors.nama = "Nama harus diisi";
    if (!formData.jenis_kelamin) errors.jenis_kelamin = "Jenis Kelamin harus dipilih";
    if (!formData.tempat_lahir) errors.tempat_lahir = "Tempat Lahir harus diisi";
    if (!formData.tanggal_lahir) errors.tanggal_lahir = "Tanggal Lahir harus diisi";
    if (!formData.agama) errors.agama = "Agama harus dipilih";
    if (!formData.status_perkawinan) errors.status_perkawinan = "Status Perkawinan harus dipilih";
    if (!formData.pendidikan_akhir) errors.pendidikan_akhir = "Pendidikan Terakhir harus dipilih";
    if (!formData.pekerjaan) errors.pekerjaan = "Pekerjaan harus diisi";
    if (!formData.nama_ayah) errors.nama_ayah = "Nama Ayah harus diisi";
    if (!formData.nama_ibu) errors.nama_ibu = "Nama Ibu harus diisi";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Allow only numbers for nik and no_akta_kelahiran
    if ((name === "nik" || name === "no_akta_kelahiran") && value !== "" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Harap lengkapi semua field yang diperlukan dengan benar",
      });
      return;
    }

    setIsLoading(true);

    const form = new FormData();
    form.append("nik", formData.nik);
    form.append("kkId", formData.kkId);
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== "nik" && key !== "kkId") {
        form.append(key, value);
      }
    });

    try {
      await fetchData("/kelola-kepala-keluarga/createKepalaKeluarga", {
        method: "POST",
        data: form,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kepala Keluarga berhasil ditambahkan!",
      });
      router.push("/kepala-keluarga");
    } catch (err: any) {
      console.log("Error Details:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan Kepala Keluarga: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm">
            <div className="flex h-20 items-center justify-between px-6 md:px-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-blue-900 hover:bg-blue-100 transition-colors p-2 rounded-md" />
                <div>
                  <h1 className="text-2xl font-semibold text-blue-900">
                    Tambah Kepala Keluarga
                  </h1>
                  <p className="text-sm text-gray-600">
                    Tambah data Kepala Keluarga baru
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-blue-900 border-blue-200 hover:bg-blue-100"
                onClick={() => router.push("/data-kepala-keluarga")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Form Tambah Kepala Keluarga
                </CardTitle>
                <CardDescription>Masukkan data Kepala Keluarga</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="kkId">Nomor Kartu Keluarga</Label>
                      <Select
                        value={formData.kkId}
                        onValueChange={(value) => handleSelectChange("kkId", value)}
                        disabled={isLoading || kartuKeluargas.length === 0}
                      >
                        <SelectTrigger className={`border-gray-300 ${formErrors.kkId ? "border-red-500" : ""}`}>
                          <SelectValue placeholder={kartuKeluargas.length === 0 ? "Tidak ada KK tersedia" : "Pilih Nomor KK"} />
                        </SelectTrigger>
                        <SelectContent>
                          {kartuKeluargas.map((kk) => (
                            <SelectItem key={kk.id} value={kk.id}>
                              {kk.no_kk}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.kkId && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.kkId}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nik">NIK</Label>
                      <Input
                        id="nik"
                        name="nik"
                        type="number"
                        pattern="\d*"
                        value={formData.nik}
                        onChange={handleInputChange}
                        className={formErrors.nik ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.nik && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.nik}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nama">Nama</Label>
                      <Input
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        className={formErrors.nama ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.nama && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.nama}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="no_akta_kelahiran">No. Akta Kelahiran</Label>
                      <Input
                        id="no_akta_kelahiran"
                        name="no_akta_kelahiran"
                        type="number"
                        pattern="\d*"
                        value={formData.no_akta_kelahiran}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                      <Select
                        value={formData.jenis_kelamin}
                        onValueChange={(value) => handleSelectChange("jenis_kelamin", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className={`border-gray-300 ${formErrors.jenis_kelamin ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.jenis_kelamin && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.jenis_kelamin}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                      <Input
                        id="tempat_lahir"
                        name="tempat_lahir"
                        value={formData.tempat_lahir}
                        onChange={handleInputChange}
                        className={formErrors.tempat_lahir ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.tempat_lahir && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.tempat_lahir}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                      <Input
                        id="tanggal_lahir"
                        name="tanggal_lahir"
                        type="date"
                        value={formData.tanggal_lahir}
                        onChange={handleInputChange}
                        className={formErrors.tanggal_lahir ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.tanggal_lahir && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.tanggal_lahir}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="golongan_darah">Golongan Darah</Label>
                      <Select
                        value={formData.golongan_darah}
                        onValueChange={(value) => handleSelectChange("golongan_darah", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Pilih Golongan Darah" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                          <SelectItem value="O">O</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="agama">Agama</Label>
                      <Select
                        value={formData.agama}
                        onValueChange={(value) => handleSelectChange("agama", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className={`border-gray-300 ${formErrors.agama ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Pilih Agama" />
                        </SelectTrigger>
                        <SelectContent>
                          {agamaOptions.map((agama) => (
                            <SelectItem key={agama} value={agama}>
                              {agama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.agama && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.agama}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="status_perkawinan">Status Perkawinan</Label>
                      <Select
                        value={formData.status_perkawinan}
                        onValueChange={(value) => handleSelectChange("status_perkawinan", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className={`border-gray-300 ${formErrors.status_perkawinan ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                          <SelectItem value="Kawin">Kawin</SelectItem>
                          <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                          <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.status_perkawinan && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.status_perkawinan}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="pendidikan_akhir">Pendidikan Terakhir</Label>
                      <Select
                        value={formData.pendidikan_akhir}
                        onValueChange={(value) => handleSelectChange("pendidikan_akhir", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className={`border-gray-300 ${formErrors.pendidikan_akhir ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                        </SelectTrigger>
                        <SelectContent>
                          {pendidikanOptions.map((pendidikan) => (
                            <SelectItem key={pendidikan} value={pendidikan}>
                              {pendidikan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.pendidikan_akhir && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.pendidikan_akhir}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="pekerjaan">Pekerjaan</Label>
                      <Input
                        id="pekerjaan"
                        name="pekerjaan"
                        value={formData.pekerjaan}
                        onChange={handleInputChange}
                        className={formErrors.pekerjaan ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.pekerjaan && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.pekerjaan}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nama_ayah">Nama Ayah</Label>
                      <Input
                        id="nama_ayah"
                        name="nama_ayah"
                        value={formData.nama_ayah}
                        onChange={handleInputChange}
                        className={formErrors.nama_ayah ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.nama_ayah && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.nama_ayah}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nama_ibu">Nama Ibu</Label>
                      <Input
                        id="nama_ibu"
                        name="nama_ibu"
                        value={formData.nama_ibu}
                        onChange={handleInputChange}
                        className={formErrors.nama_ibu ? "border-red-500" : ""}
                        required
                      />
                      {formErrors.nama_ibu && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.nama_ibu}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="scan_ktp">Scan KTP</Label>
                      <Input
                        id="scan_ktp"
                        name="scan_ktp"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scan_kk">Scan KK</Label>
                      <Input
                        id="scan_kk"
                        name="scan_kk"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scan_akta_lahir">Scan Akta Lahir</Label>
                      <Input
                        id="scan_akta_lahir"
                        name="scan_akta_lahir"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scan_buku_nikah">Scan Buku Nikah</Label>
                      <Input
                        id="scan_buku_nikah"
                        name="scan_buku_nikah"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white mt-4"
                    disabled={isLoading || kartuKeluargas.length === 0}
                  >
                    {isLoading ? "Menyimpan..." : "Simpan"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}