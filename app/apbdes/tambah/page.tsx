"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

export default function TambahAPBDesPage() {
  const [formData, setFormData] = useState({
    pendanaan: "",
    jumlah_dana: "",
    jenis_apbd: "",
    tahun: "",
    keterangan: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const jenisApbdOptions = [
    "Pendapatan & Belanja",
    "Belanja",
    "Pembangunan Desa",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJenisApbdChange = (value: string) => {
    setFormData((prev) => ({ ...prev, jenis_apbd: value }));
  };

  const validateForm = () => {
    if (!formData.pendanaan.trim()) return "Pendanaan harus diisi.";
    if (!formData.jumlah_dana || isNaN(Number(formData.jumlah_dana)))
      return "Jumlah dana harus diisi dengan angka valid.";
    if (!formData.jenis_apbd) return "Jenis APBDes harus dipilih.";
    if (!formData.tahun || isNaN(Number(formData.tahun)))
      return "Tahun harus diisi dengan angka valid.";
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
      await fetchData("/apbdes/createAPBDes", {
        method: "POST",
        data: {
          ...formData,
          jumlah_dana: Number(formData.jumlah_dana),
          tahun: Number(formData.tahun),
        },
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data APBDes berhasil ditambahkan!",
      });
      router.push("/apbdes");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan data: ${err.message || "Terjadi kesalahan"}`,
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
                    Tambah Data APBDes
                  </h1>
                  <p className="text-sm text-gray-600">
                    Tambahkan data anggaran pendapatan dan belanja desa
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
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Form Tambah Data</CardTitle>
                <CardDescription>Masukkan detail data APBDes</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="pendanaan" className="text-gray-600">
                      Pendanaan
                    </Label>
                    <Input
                      id="pendanaan"
                      name="pendanaan"
                      value={formData.pendanaan}
                      onChange={handleChange}
                      placeholder="Masukkan sumber pendanaan"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jumlah_dana" className="text-gray-600">
                      Jumlah Dana (Rp)
                    </Label>
                    <Input
                      id="jumlah_dana"
                      name="jumlah_dana"
                      type="number"
                      value={formData.jumlah_dana}
                      onChange={handleChange}
                      placeholder="Masukkan jumlah dana"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jenis_apbd" className="text-gray-600">
                      Jenis APBDes
                    </Label>
                    <Select
                      onValueChange={handleJenisApbdChange}
                      value={formData.jenis_apbd}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Pilih jenis APBDes" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenisApbdOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tahun" className="text-gray-600">Tahun</Label>
                    <Input
                      id="tahun"
                      name="tahun"
                      type="number"
                      value={formData.tahun}
                      onChange={handleChange}
                      placeholder="Masukkan tahun (contoh: 2025)"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="keterangan" className="text-gray-600">
                      Keterangan
                    </Label>
                    <Input
                      id="keterangan"
                      name="keterangan"
                      value={formData.keterangan}
                      onChange={handleChange}
                      placeholder="Masukkan keterangan (opsional)"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/apbdes")}
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