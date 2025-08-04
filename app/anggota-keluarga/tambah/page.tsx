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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KK {
  id: string;
  no_kk: string;
}

export default function TambahAnggotaKeluarga() {
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
    status_hubungan: "",
    status_perkawinan: "",
    pendidikan_akhir: "",
    pekerjaan: "",
    nama_ayah: "",
    nama_ibu: "",
    kkId: "",
  });
  const [files, setFiles] = useState({
    scan_ktp: null,
    scan_kk: null,
    scan_akta_lahir: null,
    scan_buku_nikah: null,
  });
  const [kkList, setKKList] = useState<KK[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch KK list for dropdown
  useEffect(() => {
    const loadKK = async () => {
      try {
        const response = await fetchData("/kelola-kk/getAllKK");
        const data = Array.isArray(response) ? response : response.data || [];
        setKKList(data);
      } catch (err) {
        setError(`Gagal memuat daftar KK: ${err.message || "Terjadi kesalahan"}`);
      }
    };
    loadKK();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles ? selectedFiles[0] : null }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Client-side validation
    if (!formData.nik || !formData.nama || !formData.kkId) {
      setError("NIK, Nama, dan No. KK wajib diisi");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      await fetchData("/kelola-kepala-keluarga/createAnggotaKeluarga", {
        method: "POST",
        data: formDataToSend,
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Anggota Keluarga berhasil ditambahkan!",
        confirmButtonColor: "#1e3a8a",
      });
      router.push("/anggota-keluarga");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan Anggota Keluarga: ${
          err.message || "Terjadi kesalahan"
        }`,
        confirmButtonColor: "#1e3a8a",
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
                    Tambah Anggota Keluarga
                  </h1>
                  <p className="text-sm text-gray-600">
                    Isi data untuk menambahkan anggota keluarga baru
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/anggota-keluarga")}
                className="text-blue-900 border-blue-200 hover:bg-blue-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </div>
          </header>

          <main className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in">
                {error}
              </div>
            )}
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Formulir Anggota Keluarga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nik">NIK</Label>
                      <Input
                        id="nik"
                        name="nik"
                        value={formData.nik}
                        onChange={handleInputChange}
                        placeholder="Masukkan NIK"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nama">Nama</Label>
                      <Input
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nama"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="no_akta_kelahiran">No. Akta Kelahiran</Label>
                      <Input
                        id="no_akta_kelahiran"
                        name="no_akta_kelahiran"
                        value={formData.no_akta_kelahiran}
                        onChange={handleInputChange}
                        placeholder="Masukkan No. Akta Kelahiran"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                      <Select
                        name="jenis_kelamin"
                        value={formData.jenis_kelamin}
                        onValueChange={(value) => handleSelectChange("jenis_kelamin", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                      <Input
                        id="tempat_lahir"
                        name="tempat_lahir"
                        value={formData.tempat_lahir}
                        onChange={handleInputChange}
                        placeholder="Masukkan Tempat Lahir"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                      <Input
                        id="tanggal_lahir"
                        name="tanggal_lahir"
                        type="date"
                        value={formData.tanggal_lahir}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="golongan_darah">Golongan Darah</Label>
                      <Select
                        name="golongan_darah"
                        value={formData.golongan_darah}
                        onValueChange={(value) => handleSelectChange("golongan_darah", value)}
                      >
                        <SelectTrigger>
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
                        name="agama"
                        value={formData.agama}
                        onValueChange={(value) => handleSelectChange("agama", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Agama" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Islam">Islam</SelectItem>
                          <SelectItem value="Kristen">Kristen</SelectItem>
                          <SelectItem value="Katolik">Katolik</SelectItem>
                          <SelectItem value="Hindu">Hindu</SelectItem>
                          <SelectItem value="Buddha">Buddha</SelectItem>
                          <SelectItem value="Konghucu">Konghucu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status_hubungan">Status Hubungan</Label>
                      <Select
                        name="status_hubungan"
                        value={formData.status_hubungan}
                        onValueChange={(value) => handleSelectChange("status_hubungan", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Hubungan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Istri">Istri</SelectItem>
                          <SelectItem value="Anak">Anak</SelectItem>
                          <SelectItem value="Orang Tua">Orang Tua</SelectItem>
                          <SelectItem value="Mertua">Mertua</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status_perkawinan">Status Perkawinan</Label>
                      <Select
                        name="status_perkawinan"
                        value={formData.status_perkawinan}
                        onValueChange={(value) => handleSelectChange("status_perkawinan", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Perkawinan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                          <SelectItem value="Kawin">Kawin</SelectItem>
                          <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                          <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pendidikan_akhir">Pendidikan Terakhir</Label>
                      <Select
                        name="pendidikan_akhir"
                        value={formData.pendidikan_akhir}
                        onValueChange={(value) => handleSelectChange("pendidikan_akhir", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tidak Sekolah">Tidak Sekolah</SelectItem>
                          <SelectItem value="SD">SD</SelectItem>
                          <SelectItem value="SMP">SMP</SelectItem>
                          <SelectItem value="SMA">SMA</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="S1">S1</SelectItem>
                          <SelectItem value="S2">S2</SelectItem>
                          <SelectItem value="S3">S3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pekerjaan">Pekerjaan</Label>
                      <Input
                        id="pekerjaan"
                        name="pekerjaan"
                        value={formData.pekerjaan}
                        onChange={handleInputChange}
                        placeholder="Masukkan Pekerjaan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nama_ayah">Nama Ayah</Label>
                      <Input
                        id="nama_ayah"
                        name="nama_ayah"
                        value={formData.nama_ayah}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nama Ayah"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nama_ibu">Nama Ibu</Label>
                      <Input
                        id="nama_ibu"
                        name="nama_ibu"
                        value={formData.nama_ibu}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nama Ibu"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kkId">No. KK</Label>
                      <Select
                        name="kkId"
                        value={formData.kkId}
                        onValueChange={(value) => handleSelectChange("kkId", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih No. KK" />
                        </SelectTrigger>
                        <SelectContent>
                          {kkList.map((kk) => (
                            <SelectItem key={kk.id} value={kk.id}>
                              {kk.no_kk}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="scan_ktp">Scan KTP</Label>
                      <Input
                        id="scan_ktp"
                        name="scan_ktp"
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scan_kk">Scan KK</Label>
                      <Input
                        id="scan_kk"
                        name="scan_kk"
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scan_akta_lahir">Scan Akta Lahir</Label>
                      <Input
                        id="scan_akta_lahir"
                        name="scan_akta_lahir"
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scan_buku_nikah">Scan Buku Nikah</Label>
                      <Input
                        id="scan_buku_nikah"
                        name="scan_buku_nikah"
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/anggota-keluarga")}
                      className="text-blue-900 border-blue-200 hover:bg-blue-100"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white"
                    >
                      {isLoading ? "Menyimpan..." : "Simpan"}
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