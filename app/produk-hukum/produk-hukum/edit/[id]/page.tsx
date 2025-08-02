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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KategoriProdukHukum {
  id: string;
  kategori: string;
}

export default function EditProdukHukumPage() {
  const [namaProdukHukum, setNamaProdukHukum] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [filePendukung, setFilePendukung] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [kategoriList, setKategoriList] = useState<KategoriProdukHukum[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Base URL for the API
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [produkHukumResponse, kategoriResponse] = await Promise.all([
          fetchData(`/produk-hukum/getDetailProdukHukum/${id}`),
          fetchData("/produk-hukum/getAllKategoriProdukHukum"),
        ]);
        const produkHukum = produkHukumResponse.produkHukum || {};
        const kategoriData = Array.isArray(kategoriResponse)
          ? kategoriResponse
          : kategoriResponse.data || [];
        setNamaProdukHukum(produkHukum.nama_produk_hukum || "");
        setKategoriId(produkHukum.kategori?.id || "");
        setExistingFile(
          produkHukum.file_pendukung
            ? `${API_BASE_URL}/produk-hukum/getFileProdukHukum${produkHukum.file_pendukung.replace(
                /^\/uploads/,
                ""
              )}`
            : null
        );
        setKategoriList(kategoriData);
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Handle opening the modal with the file
  const handleOpenModal = async (fileUrl: string) => {
    setFileLoading(true);
    setFileError(null);
    setSelectedFile(fileUrl);
    setIsModalOpen(true);

    try {
      const response = await fetch(fileUrl, { method: "HEAD" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      setFileError(
        `Gagal memuat file: ${err.message}. URL: ${fileUrl}. Coba buka di tab baru.`
      );
    } finally {
      setFileLoading(false);
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setFileError(null);
    setFileLoading(false);
  };

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

      await fetchData(`/produk-hukum/updateProdukHukum/${id}`, {
        method: "PUT",
        data: formData,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk hukum berhasil diperbarui!",
      });
      router.push("/produk-hukum/produk-hukum");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui produk hukum: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if the file is an image or PDF
  const isImageFile = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
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
                    Edit Produk Hukum
                  </h1>
                  <p className="text-sm text-gray-600">
                    Perbarui detail produk hukum
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-white/80 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Form Edit Produk Hukum
                </CardTitle>
                <CardDescription>Perbarui detail produk hukum</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center text-gray-600 animate-pulse">
                    Memuat...
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div>
                      <Label
                        htmlFor="nama_produk_hukum"
                        className="text-gray-600"
                      >
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
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            setFilePendukung(e.target.files?.[0] || null)
                          }
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Upload className="h-4 w-4 text-gray-400" />
                      </div>
                      {existingFile && (
                        <div className="mt-2 text-sm text-gray-600">
                          File saat ini:{" "}
                          <button
                            onClick={() => handleOpenModal(existingFile)}
                            className="text-blue-600 hover:underline"
                          >
                            Lihat File
                          </button>
                        </div>
                      )}
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
                )}
              </CardContent>
            </Card>
          </main>

          {/* Modal for displaying file (image or PDF) */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Pratinjau File Pendukung</DialogTitle>
                <DialogClose onClick={handleCloseModal} />
              </DialogHeader>
              {fileLoading && (
                <div className="flex justify-center items-center h-[70vh]">
                  <div className="text-gray-600 animate-pulse">
                    Memuat file...
                  </div>
                </div>
              )}
              {fileError && (
                <div className="flex justify-center items-center h-[70vh]">
                  <div className="text-red-600 text-center">
                    {fileError}
                    <br />
                    <a
                      href={selectedFile || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mt-2 inline-block"
                    >
                      Coba buka di tab baru
                    </a>
                  </div>
                </div>
              )}
              {!fileLoading && !fileError && selectedFile && (
                <div className="w-full h-[70vh]">
                  {isImageFile(selectedFile) ? (
                    <img
                      src={selectedFile}
                      alt="File Pendukung"
                      className="w-full h-full object-contain"
                      onError={() =>
                        setFileError(
                          `Gagal memuat gambar: File tidak ditemukan. URL: ${selectedFile}`
                        )
                      }
                    />
                  ) : (
                    <iframe
                      src={selectedFile}
                      className="w-full h-full border-0"
                      title="PDF Preview"
                      onError={() =>
                        setFileError(
                          `Gagal memuat PDF: File tidak ditemukan. URL: ${selectedFile}`
                        )
                      }
                    />
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}