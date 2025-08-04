"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

interface AnggotaKeluarga {
  id: string;
  nik: string;
  nama: string;
  no_akta_kelahiran: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  golongan_darah: string;
  agama: string;
  status_hubungan: string;
  status_perkawinan: string;
  pendidikan_akhir: string;
  pekerjaan: string;
  nama_ayah: string;
  nama_ibu: string;
  scan_ktp?: string;
  scan_kk?: string;
  scan_akta_lahir?: string;
  scan_buku_nikah?: string;
  kkId: string;
}

export default function EditAnggotaKeluarga() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [formData, setFormData] = useState<AnggotaKeluarga>({
    id: "",
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
  const [existingFiles, setExistingFiles] = useState({
    scan_ktp: "",
    scan_kk: "",
    scan_akta_lahir: "",
    scan_buku_nikah: "",
  });
  const [kkList, setKKList] = useState<KK[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Normalisasi data dari API
  const normalizeData = (data: any): AnggotaKeluarga => {
    return {
      id: data.id || "",
      nik: data.nik || "",
      nama: data.nama || "",
      no_akta_kelahiran: data.no_akta_kelahiran || "",
      jenis_kelamin: data.jenis_kelamin === "Laki Laki" ? "Laki-laki" : data.jenis_kelamin === "Perempuan" ? "Perempuan" : "",
      tempat_lahir: data.tempat_lahir || "",
      tanggal_lahir: data.tanggal_lahir ? new Date(data.tanggal_lahir).toISOString().split("T")[0] : "",
      golongan_darah: data.golongan_darah || "",
      agama: data.agama ? data.agama.charAt(0).toUpperCase() + data.agama.slice(1).toLowerCase() : "",
      status_hubungan: data.status_hubungan || "",
      status_perkawinan: data.status_perkawinan || "",
      pendidikan_akhir: data.pendidikan_akhir || "",
      pekerjaan: data.pekerjaan || "",
      nama_ayah: data.nama_ayah || "",
      nama_ibu: data.nama_ibu || "",
      kkId: data.kk?.id || data.kkId || "",
    };
  };

  // Fetch KK list and anggota keluarga data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [kkResponse, anggotaResponse] = await Promise.all([
          fetchData("/kelola-kk/getAllKK"),
          fetchData(`/kelola-kepala-keluarga/getAnggotaKeluarga/${id}`),
        ]);
        const kkData = Array.isArray(kkResponse) ? kkResponse : kkResponse.data || [];
        setKKList(kkData);

        const anggota = anggotaResponse.anggotaKeluarga || anggotaResponse;
        const normalizedData = normalizeData(anggota);
        setFormData(normalizedData);
        setExistingFiles({
          scan_ktp: anggota.scan_ktp || "",
          scan_kk: anggota.scan_kk || "",
          scan_akta_lahir: anggota.scan_akta_lahir || "",
          scan_buku_nikah: anggota.scan_buku_nikah || "",
        });

        // Debugging
        console.log("API Response:", anggota);
        console.log("Normalized FormData:", normalizedData);
        console.log("Existing Files:", {
          scan_ktp: anggota.scan_ktp || "",
          scan_kk: anggota.scan_kk || "",
          scan_akta_lahir: anggota.scan_akta_lahir || "",
          scan_buku_nikah: anggota.scan_buku_nikah || "",
        });
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

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
        if (key !== "id") formDataToSend.append(key, value);
      });
      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      await fetchData(`/kelola-kepala-keluarga/editAnggotaKeluarga/${id}`, {
        method: "PUT",
        data: formDataToSend,
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Anggota Keluarga berhasil diperbarui!",
        confirmButtonColor: "#1e3a8a",
      });
      router.push("/anggota-keluarga");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui Anggota Keluarga: ${
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
                    Edit Anggota Keluarga
                  </h1>
                  <p className="text-sm text-gray-600">
                    Ubah data anggota keluarga
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
            {isLoading && (
              <div className="text-center text-gray-600 animate-pulse">
                Memuat...
              </div>
            )}
            {!isLoading && (
              <Card className="border-0 bg-white/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    Formulir Edit Anggota Keluarga
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
                            <SelectItem value="Anak Bawang">Anak Bawang</SelectItem>
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
                        {existingFiles.scan_ktp && (
                          <p className="text-sm text-gray-600 mt-1">
                            File saat ini: {existingFiles.scan_ktp.split("/").pop()}
                          </p>
                        )}
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
                        {existingFiles.scan_kk && (
                          <p className="text-sm text-gray-600 mt-1">
                            File saat ini: {existingFiles.scan_kk.split("/").pop()}
                          </p>
                        )}
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
                        {existingFiles.scan_akta_lahir && (
                          <p className="text-sm text-gray-600 mt-1">
                            File saat ini: {existingFiles.scan_akta_lahir.split("/").pop()}
                          </p>
                        )}
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
                        {existingFiles.scan_buku_nikah && (
                          <p className="text-sm text-gray-600 mt-1">
                            File saat ini: {existingFiles.scan_buku_nikah.split("/").pop()}
                          </p>
                        )}
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
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}