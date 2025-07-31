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

interface KategoriBerita {
  id: string;
  kategori: string;
}

interface Berita {
  id: string;
  judul: string;
  berita: string;
  kategoriId: string;
  sampul?: string;
}

export default function EditBeritaPage() {
  const [formData, setFormData] = useState({
    judul: "",
    berita: "",
    kategoriId: "",
  });
  const [kategoriList, setKategoriList] = useState<KategoriBerita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingSampul, setExistingSampul] = useState<string | undefined>("");
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all categories
        const kategoriResponse = await fetchData(
          "/berita/getAllKategoriBerita"
        );
        const kategoriData = Array.isArray(kategoriResponse)
          ? kategoriResponse
          : kategoriResponse.data || [];
        setKategoriList(kategoriData);

        // Fetch the specific news item
        const beritaResponse = await fetchData(`/berita/getBerita/${id}`);
        const beritaData: Berita = beritaResponse.berita;

        if (!beritaData) {
          throw new Error("Berita tidak ditemukan");
        }

        setFormData({
          judul: beritaData.judul || "",
          berita: beritaData.berita || "",
          kategoriId: beritaData.kategoriId || "",
        });
        setExistingSampul(beritaData.sampul || "");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(`Gagal memuat data: ${errorMessage}`);
        console.error("Load data error:", err);
      }
    };
    if (id) {
      loadData();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKategoriChange = (value: string) => {
    setFormData((prev) => ({ ...prev, kategoriId: value }));
  };

  const validateForm = () => {
    if (!formData.judul.trim()) return "Judul harus diisi.";
    if (!formData.berita.trim()) return "Berita harus diisi.";
    if (!formData.kategoriId) return "Kategori harus dipilih.";
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
      const formDataToSend = new FormData();
      formDataToSend.append("judul", formData.judul);
      formDataToSend.append("berita", formData.berita);
      formDataToSend.append("kategoriId", formData.kategoriId);

      const fileInput = document.getElementById("sampul") as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        formDataToSend.append("sampul", fileInput.files[0]);
      } else if (existingSampul) {
        // Preserve existing sampul if no new file is uploaded
        formDataToSend.append("existingSampul", existingSampul);
      }

      // Debug: Log FormData entries
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetchData(`/berita/updateBerita/${id}`, {
        method: "PUT",
        data: formDataToSend,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berita berhasil diperbarui!",
      });
      router.push("/berita");
    } catch (err: any) {
      // Improved error handling
      const errorMessage =
        err instanceof Error
          ? err.message
          : err.response?.data?.message || "Terjadi kesalahan";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui data: ${errorMessage}`,
      });
      console.error("Update error:", {
        message: errorMessage,
        details: err.response?.data || err,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSampulUrl = (sampul: string | undefined) => {
    if (!sampul) return "/placeholder-image.jpg";
    const filename = sampul.split("/").pop();
    return `http://localhost:3000/berita/getSampul/berita/${filename}`;
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
                    Edit Berita
                  </h1>
                  <p className="text-sm text-gray-600">
                    Perbarui detail berita
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
                <CardTitle className="text-blue-900">Form Edit Data</CardTitle>
                <CardDescription>Perbarui detail berita</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="judul" className="text-gray-600">
                      Judul
                    </Label>
                    <Input
                      id="judul"
                      name="judul"
                      value={formData.judul}
                      onChange={handleChange}
                      placeholder="Masukkan judul berita"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="berita" className="text-gray-600">
                      Berita
                    </Label>
                    <Input
                      id="berita"
                      name="berita"
                      value={formData.berita}
                      onChange={handleChange}
                      placeholder="Masukkan isi berita"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="kategoriId" className="text-gray-600">
                      Kategori
                    </Label>
                    <Select
                      onValueChange={handleKategoriChange}
                      value={formData.kategoriId}
                      required
                    >
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
                    <Label htmlFor="sampul" className="text-gray-600">
                      Sampul (Gambar, Opsional)
                    </Label>
                    {existingSampul && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          Sampul Saat Ini:
                        </p>
                        <img
                          src={getSampulUrl(existingSampul)}
                          alt="Sampul Berita"
                          className="w-24 h-24 object-cover rounded-md mt-1"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    )}
                    <Input
                      id="sampul"
                      name="sampul"
                      type="file"
                      accept="image/*"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Pilih file baru untuk mengganti sampul (kosongkan jika
                      tidak ingin mengubah).
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/berita")}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white"
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
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
