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
import { ArrowLeft } from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

export default function EditKategoriProdukHukumPage() {
  const [kategori, setKategori] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const loadKategoriProdukHukum = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(`/produk-hukum/getKategoriProdukHukum/${id}`);
        setKategori(response.kategoriProdukHukum.kategori);
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: `Gagal memuat data: ${err.message || "Terjadi kesalahan"}`,
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadKategoriProdukHukum();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await fetchData(`/produk-hukum/updateKategoriProdukHukum/${id}`, {
        method: "PUT",
        data: JSON.stringify({ kategori }),
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kategori produk hukum berhasil diperbarui!",
      });
      router.push("/produk-hukum/kategori");
    } catch (err) {
      setError(`Gagal memperbarui kategori: ${err.message || "Terjadi kesalahan"}`);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui kategori: ${err.message || "Terjadi kesalahan"}`,
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
                    Edit Kategori Produk Hukum
                  </h1>
                  <p className="text-sm text-gray-600">
                    Edit kategori produk hukum desa
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/produk-hukum/kategori")}
                className="text-blue-900 border-blue-200 hover:bg-blue-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-white/80 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Form Edit Kategori
                </CardTitle>
                <CardDescription>Perbarui detail kategori produk hukum</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Kategori
                    </label>
                    <Input
                      type="text"
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      placeholder="Masukkan nama kategori"
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/produk-hukum/kategori")}
                      className="text-gray-600 border-gray-200 hover:bg-gray-100"
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