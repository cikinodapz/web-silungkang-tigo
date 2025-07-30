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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface FamilyCard {
  id: string;
  no_kk: string;
  kepalaKeluarga: { nama: string } | null;
}

interface Resident {
  nama: string;
  nik: string;
}

interface Meninggal {
  id: string;
  nama: string;
  nik: string;
  tanggal_meninggal: string;
  alamat_meninggal: string | null;
  kkId: string;
}

export default function EditMeninggalPage() {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tanggal_meninggal: "",
    alamat_meninggal: "",
    kkId: "",
  });
  const [familyCards, setFamilyCards] = useState<FamilyCard[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load family cards
        const kkResponse = await fetchData("/kelola-kk/getAllKK");
        setFamilyCards(
          Array.isArray(kkResponse) ? kkResponse : kkResponse.data || []
        );

        // Load residents
        const residentsResponse = await fetchData("/mutasi/getResidents");
        setResidents(
          Array.isArray(residentsResponse.residents)
            ? residentsResponse.residents
            : []
        );

        // Load existing Meninggal data
        const response = await fetchData(`/mutasi/getMeninggal/${id}`);
        const data = response.meninggal || response;
        setFormData({
          nama: data.nama || "",
          nik: data.nik || "",
          tanggal_meninggal: data.tanggal_meninggal
            ? new Date(data.tanggal_meninggal).toISOString().split("T")[0]
            : "",
          alamat_meninggal: data.alamat_meninggal || "",
          kkId: data.kkId || "",
        });
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResidentChange = (value: string) => {
    const selectedResident = residents.find((resident) => resident.nik === value);
    if (selectedResident) {
      setFormData((prev) => ({
        ...prev,
        nama: selectedResident.nama,
        nik: selectedResident.nik,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.nama.trim()) return "Nama harus diisi.";
    if (!formData.nik.trim()) return "NIK harus diisi.";
    if (!formData.tanggal_meninggal) return "Tanggal Meninggal harus diisi.";
    if (!formData.kkId) return "No. KK harus dipilih.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting data:", formData);
      await fetchData(`/mutasi/updateMeninggal/${id}`, {
        method: "PUT",
        data: {
          ...formData,
          tanggal_meninggal: formData.tanggal_meninggal + "T00:00:00.000Z",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data meninggal berhasil diperbarui!",
      });
      router.push("/meninggal");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui data: ${err.message || "Terjadi kesalahan"}`,
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
                    Edit Data Meninggal
                  </h1>
                  <p className="text-sm text-gray-600">
                    Perbarui data kematian
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
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
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Form Edit Data</CardTitle>
                <CardDescription>Perbarui detail data meninggal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="resident" className="text-gray-600">
                      Pilih Penduduk
                    </Label>
                    <Select onValueChange={handleResidentChange} defaultValue={formData.nik} required>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Pilih penduduk" />
                      </SelectTrigger>
                      <SelectContent>
                        {residents.map((resident) => (
                          <SelectItem key={resident.nik} value={resident.nik}>
                            {resident.nama} - {resident.nik}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nama" className="text-gray-600">Nama</Label>
                    <Input
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      readOnly
                      className="border-gray-300 bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nik" className="text-gray-600">NIK</Label>
                    <Input
                      id="nik"
                      name="nik"
                      value={formData.nik}
                      readOnly
                      className="border-gray-300 bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tanggal_meninggal" className="text-gray-600">
                      Tanggal Meninggal
                    </Label>
                    <Input
                      id="tanggal_meninggal"
                      name="tanggal_meninggal"
                      type="date"
                      value={formData.tanggal_meninggal}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="alamat_meninggal" className="text-gray-600">
                      Alamat Meninggal
                    </Label>
                    <Input
                      id="alamat_meninggal"
                      name="alamat_meninggal"
                      value={formData.alamat_meninggal}
                      onChange={handleChange}
                      placeholder="Masukkan alamat meninggal (opsional)"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kkId" className="text-gray-600">No. KK</Label>
                    <select
                      id="kkId"
                      name="kkId"
                      value={formData.kkId}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pilih Kartu Keluarga</option>
                      {familyCards.map((kk) => (
                        <option key={kk.id} value={kk.id}>
                          {kk.no_kk} {kk.kepalaKeluarga?.nama ? `- ${kk.kepalaKeluarga.nama}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/meninggal")}
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