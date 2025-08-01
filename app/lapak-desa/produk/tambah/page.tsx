"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface UMKM {
  id: string;
  nama_umkm: string;
}

export default function TambahProdukPage() {
  const [umkms, setUmkms] = useState<UMKM[]>([]);
  const [formData, setFormData] = useState({
    nama_produk: "",
    deskripsi_produk: "",
    link_produk: "",
    umkmId: "",
  });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUmkms = async () => {
      try {
        const data = await fetchData("/lapak-desa/umkm");
        setUmkms(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError("Gagal memuat daftar UMKM");
      }
    };
    fetchUmkms();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, umkmId: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_produk || !formData.umkmId) {
      Swal.fire("Error", "Nama produk dan UMKM wajib diisi!", "error");
      return;
    }

    setIsLoading(true);
    const payload = new FormData();
    payload.append("nama_produk", formData.nama_produk);
    if (formData.deskripsi_produk) payload.append("deskripsi_produk", formData.deskripsi_produk);
    if (formData.link_produk) payload.append("link_produk", formData.link_produk);
    payload.append("umkmId", formData.umkmId);
    if (fotoFile) payload.append("foto_produk", fotoFile);

    try {
      const response = await fetchData("/lapak-desa/createProduk", {
        method: "POST",
        data: payload,
        // Jangan set 'Content-Type' — biarkan browser set otomatis dengan boundary
      });
      Swal.fire("Berhasil", "Produk berhasil ditambahkan!", "success");
      router.push("/lapak-desa/produk");
    } catch (err: any) {
      Swal.fire("Gagal", err.message || "Terjadi kesalahan saat menyimpan", "error");
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
            <div className="flex h-20 items-center px-6 md:px-10">
              <SidebarTrigger className="text-blue-900 hover:bg-blue-100 transition-colors p-2 rounded-md" />
              <div className="ml-4">
                <h1 className="text-2xl font-semibold text-blue-900">Tambah Produk</h1>
                <p className="text-sm text-gray-600">Isi data produk baru</p>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="max-w-3xl mx-auto border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Form Tambah Produk</CardTitle>
              </CardHeader>
              <CardContent>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Produk *
                    </label>
                    <Input
                      name="nama_produk"
                      value={formData.nama_produk}
                      onChange={handleChange}
                      placeholder="Masukkan nama produk"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi Produk
                    </label>
                    <Textarea
                      name="deskripsi_produk"
                      value={formData.deskripsi_produk}
                      onChange={handleChange}
                      placeholder="Jelaskan produk ini..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Produk
                    </label>
                    <Input
                      name="link_produk"
                      type="url"
                      value={formData.link_produk}
                      onChange={handleChange}
                      placeholder="https://shopee.co.id/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UMKM Pemilik *
                    </label>
                    <Select onValueChange={handleSelectChange} value={formData.umkmId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih UMKM" />
                      </SelectTrigger>
                      <SelectContent>
                        {umkms.map((umkm) => (
                          <SelectItem key={umkm.id} value={umkm.id}>
                            {umkm.nama_umkm}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foto Produk
                    </label>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, maks 2MB</p>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isLoading}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Produk"}
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