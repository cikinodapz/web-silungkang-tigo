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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

export default function TambahPotensiDesa() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!nama || !kategori) {
      setError("Nama dan kategori harus diisi");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("kategori", kategori);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await fetchData("/potensi-desa/createPotensiDesa", {
        method: "POST",
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Potensi desa berhasil ditambahkan!",
      });
      router.push("/potensi-desa");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan potensi desa: ${err.message || "Terjadi kesalahan"}`,
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
                    Tambah Potensi Desa
                  </h1>
                  <p className="text-sm text-gray-600">Tambah data potensi desa baru</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-white/80 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-blue-900">Form Tambah Potensi Desa</CardTitle>
                <CardDescription>Masukkan detail potensi desa</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="nama" className="text-gray-600">Nama</Label>
                    <Input
                      id="nama"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukkan nama potensi desa"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deskripsi" className="text-gray-600">Deskripsi</Label>
                    <Textarea
                      id="deskripsi"
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      placeholder="Masukkan deskripsi potensi desa"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="kategori" className="text-gray-600">Kategori</Label>
                    <Select value={kategori} onValueChange={setKategori}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kesenian dan Kerajinan">Kesenian dan Kerajinan</SelectItem>
                        <SelectItem value="Kuliner">Kuliner</SelectItem>
                        <SelectItem value="Sarana Prasarana">Sarana Prasarana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="foto" className="text-gray-600">Foto</Label>
                    <Input
                      id="foto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFoto(e.target.files?.[0] || null)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/potensi-desa")}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white"
                      disabled={isLoading}
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