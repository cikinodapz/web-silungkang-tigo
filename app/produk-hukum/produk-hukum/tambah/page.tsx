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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KategoriProdukHukum {
  id: string;
  kategori: string;
}

export default function TambahProdukHukumPage() {
  const [namaProdukHukum, setNamaProdukHukum] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [filePendukung, setFilePendukung] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [kategoriList, setKategoriList] = useState<KategoriProdukHukum[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadKategori = async () => {
      try {
        const response = await fetchData("/produk-hukum/getAllKategoriProdukHukum");
        const data = Array.isArray(response) ? response : response.data || [];
        setKategoriList(data);
      } catch (err) {
        setError(`Gagal memuat kategori: ${err.message || "Terjadi kesalahan"}`);
      }
    };
    loadKategori();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("nama_produk_hukum", namaProdukHukum);
      formData.append("kategoriId", kategoriId);
      if (filePendukung) {
        formData.append("file_pendukung", filePendukung);
      }

      await fetchData("/produk-hukum/createProdukHukum", {
        method: "POST",
        data: formData,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk hukum berhasil ditambahkan!",
      });
      router.push("/produk-hukum/produk-hukum");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan produk hukum: ${err.message || "Terjadi kesalahan"}`,
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
                    Tambah Produk Hukum
                  </h1>
                  <p className="text-sm text-gray-600">
                    Tambah produk hukum baru
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-white/80 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Form Tambah Produk Hukum
                </CardTitle>
                <CardDescription>Masukkan detail produk hukum</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="nama_produk_hukum" className="text-gray-600">
                      Nama Produk Hukum
                    </Label>
                    <Input
                      id="nama_produk_hukum"
                      value={namaProdukHukum}
                      onChange={(e) => setNamaProdukHukum(e.target.value)}
                      placeholder="Masukkan nama produk hukum"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="kategoriId" className="text-gray-600">
                      Kategori
                    </Label>
                    <Select value={kategoriId} onValueChange={setKategoriId}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {kategoriList.map((kategori) => (
                          <SelectItem key={kategori.id} value={kategori.id}>
                            {kategori.kategori}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="file_pendukung" className="text-gray-600">
                      File Pendukung
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="file_pendukung"
                        type="file"
                        onChange={(e) =>
                          setFilePendukung(e.target.files?.[0] || null)
                        }
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Upload className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/produk-hukum")}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
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