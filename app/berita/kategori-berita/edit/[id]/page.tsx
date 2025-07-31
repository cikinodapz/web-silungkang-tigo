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
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KategoriBerita {
  id: string;
  kategori: string;
  jumlah_berita?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function EditKategoriBeritaPage() {
  const [formData, setFormData] = useState({
    kategori: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const loadKategoriBerita = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(`/berita/getDetailKategoriBerita/${id}`);
        const data = response.data; // Access the 'data' property from the response
        console.log("Fetched data:", data); // Debug log to inspect data
        setFormData({
          kategori: data.kategori || "",
        });
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadKategoriBerita();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.kategori.trim()) return "Kategori harus diisi.";
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
      await fetchData(`/berita/updateKategoriBerita/${id}`, {
        method: "PUT",
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kategori berita berhasil diperbarui!",
      });
      router.push("/berita/kategori-berita");
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
                    Edit Kategori Berita
                  </h1>
                  <p className="text-sm text-gray-600">
                    Perbarui kategori berita
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
                <CardDescription>Perbarui detail kategori berita</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="kategori" className="text-gray-600">
                      Kategori
                    </Label>
                    <Input
                      id="kategori"
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                      placeholder="Masukkan nama kategori"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/berita/kategori-berita")}
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