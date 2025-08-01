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
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

export default function TambahUMKM() {
  const [nama_umkm, setNamaUmkm] = useState("");
  const [deskripsi_umkm, setDeskripsiUmkm] = useState("");
  const [kontak_wa, setKontakWa] = useState("");
  const [foto_umkm, setFotoUmkm] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!nama_umkm || !kontak_wa) {
      setError("Nama UMKM dan kontak WA harus diisi");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama_umkm", nama_umkm);
    formData.append("deskripsi_umkm", deskripsi_umkm);
    formData.append("kontak_wa", kontak_wa);
    if (foto_umkm) {
      formData.append("foto_umkm", foto_umkm);
    }

    try {
      await fetchData("/lapak-desa/createUMKM", {
        method: "POST",
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "UMKM berhasil ditambahkan!",
      });
      router.push("/lapak-desa/umkm");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan UMKM: ${err.message || "Terjadi kesalahan"}`,
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
                    Tambah UMKM
                  </h1>
                  <p className="text-sm text-gray-600">Tambah data UMKM baru</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-white/80 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-blue-900">Form Tambah UMKM</CardTitle>
                <CardDescription>Masukkan detail UMKM</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="nama_umkm" className="text-gray-600">Nama UMKM</Label>
                    <Input
                      id="nama_umkm"
                      value={nama_umkm}
                      onChange={(e) => setNamaUmkm(e.target.value)}
                      placeholder="Masukkan nama UMKM"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deskripsi_umkm" className="text-gray-600">Deskripsi</Label>
                    <Textarea
                      id="deskripsi_umkm"
                      value={deskripsi_umkm}
                      onChange={(e) => setDeskripsiUmkm(e.target.value)}
                      placeholder="Masukkan deskripsi UMKM"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="kontak_wa" className="text-gray-600">Kontak WA</Label>
                    <Input
                      id="kontak_wa"
                      value={kontak_wa}
                      onChange={(e) => setKontakWa(e.target.value)}
                      placeholder="Masukkan nomor WhatsApp"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="foto_umkm" className="text-gray-600">Foto UMKM</Label>
                    <Input
                      id="foto_umkm"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFotoUmkm(e.target.files?.[0] || null)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/lapak-desa")}
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