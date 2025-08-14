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
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface Produk {
  id: string;
  nama_produk: string;
  deskripsi_produk: string;
  link_produk?: string;
  foto_produk?: string;
  umkmId: string;
  umkm: { id: string; nama_umkm: string };
}

interface UMKM {
  id: string;
  nama_umkm: string;
}

export default function EditProdukPage() {
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [linkProduk, setLinkProduk] = useState("");
  const [umkmId, setUmkmId] = useState("");
  const [fotoProduk, setFotoProduk] = useState<File | null>(null);
  const [existingFoto, setExistingFoto] = useState<string | null>(null);
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load UMKM list
        const umkmResponse = await fetchData("/lapak-desa/umkm");
        const umkmData = Array.isArray(umkmResponse)
          ? umkmResponse
          : umkmResponse.data || [];
        setUmkmList(umkmData);

        // Load product data
        const produkResponse = await fetchData(`/lapak-desa/produk/${id}`);
        const produk: Produk = produkResponse.produk || produkResponse; // Handle nested 'produk' key
        setNamaProduk(produk.nama_produk || "");
        setDeskripsiProduk(produk.deskripsi_produk || "");
        setLinkProduk(produk.link_produk || "");
        setUmkmId(produk.umkmId || "");
        setExistingFoto(produk.foto_produk || null);
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      loadData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!namaProduk || !umkmId) {
      setError("Nama produk dan UMKM wajib diisi");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama_produk", namaProduk);
    formData.append("deskripsi_produk", deskripsiProduk);
    formData.append("link_produk", linkProduk);
    formData.append("umkmId", umkmId);
    if (fotoProduk) {
      formData.append("foto_produk", fotoProduk);
    }

    try {
      await fetchData(`/lapak-desa/produk/${id}`, {
        method: "PUT",
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk berhasil diperbarui!",
      });
      router.push("/lapak-desa/produk");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui produk: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFotoUrl = (foto: string) => {
    const filename = foto.split("/").pop();
    return `${process.env.NEXT_PUBLIC_API_URL}/lapak-desa/foto-produk/produk/${filename}`;
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
                    Edit Produk
                  </h1>
                  <p className="text-sm text-gray-600">
                    Perbarui detail produk
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            {isLoading ? (
              <div className="text-center text-gray-600 animate-pulse">
                Memuat...
              </div>
            ) : (
              <Card className="border-0 bg-white/80 shadow-lg max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-blue-900">
                    Form Edit Produk
                  </CardTitle>
                  <CardDescription>Perbarui detail produk</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div>
                      <Label htmlFor="nama_produk">Nama Produk</Label>
                      <Input
                        id="nama_produk"
                        value={namaProduk}
                        onChange={(e) => setNamaProduk(e.target.value)}
                        placeholder="Masukkan nama produk"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deskripsi_produk">Deskripsi Produk</Label>
                      <Textarea
                        id="deskripsi_produk"
                        value={deskripsiProduk}
                        onChange={(e) => setDeskripsiProduk(e.target.value)}
                        placeholder="Masukkan deskripsi produk"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="link_produk">
                        Link Produk (Opsional)
                      </Label>
                      <Input
                        id="link_produk"
                        value={linkProduk}
                        onChange={(e) => setLinkProduk(e.target.value)}
                        placeholder="Masukkan link produk"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="umkmId">UMKM</Label>
                      <Select onValueChange={setUmkmId} value={umkmId}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Pilih UMKM" />
                        </SelectTrigger>
                        <SelectContent>
                          {umkmList.map((umkm) => (
                            <SelectItem key={umkm.id} value={umkm.id}>
                              {umkm.nama_umkm}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="foto_produk">
                        Foto Produk (Opsional)
                      </Label>
                      {existingFoto && (
                        <div className="mb-2">
                          <img
                            src={getFotoUrl(existingFoto)}
                            alt="Foto produk"
                            className="w-24 h-24 object-cover rounded-md"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.jpg";
                            }}
                          />
                        </div>
                      )}
                      <Input
                        id="foto_produk"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFotoProduk(e.target.files?.[0] || null)
                        }
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/lapak-desa/produk")}
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
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
