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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KategoriProdukHukum {
  id: string;
  kategori: string;
}

interface ProdukHukum {
  id: string;
  nama_produk_hukum: string;
  file_pendukung: string | null;
  kategori: KategoriProdukHukum;
}

export default function ProdukHukumListPage() {
  const [produkHukumList, setProdukHukumList] = useState<ProdukHukum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const itemsPerPage = 5;
  const router = useRouter();

  // Base URL for the API

  // Fetch Produk Hukum data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/produk-hukum/getAllProdukHukum");
        const data = Array.isArray(response) ? response : response.data || [];
        // Fix the file_pendukung URL by removing /uploads if present
        const updatedData = data.map((item: ProdukHukum) => ({
          ...item,
          file_pendukung: item.file_pendukung
            ? `${process.env.NEXT_PUBLIC_API_URL}/produk-hukum/getFileProdukHukum${item.file_pendukung.replace(
                /^\/uploads/,
                ""
              )}`
            : null,
        }));
        setProdukHukumList(updatedData);
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle Delete Produk Hukum
  const handleDeleteProdukHukum = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus produk hukum ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/produk-hukum/deleteProdukHukum/${id}`, {
        method: "DELETE",
      });
      setProdukHukumList(produkHukumList.filter((record) => record.id !== id));
      if (
        produkHukumList.length - 1 <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk hukum berhasil dihapus!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menghapus data: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening the modal with the PDF
  const handleOpenModal = async (fileUrl: string) => {
    setPdfLoading(true);
    setPdfError(null);
    setSelectedFile(fileUrl);
    setIsModalOpen(true);

    try {
      const response = await fetch(fileUrl, { method: "HEAD" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      setPdfError(
        `Gagal memuat file PDF: ${err.message}. URL: ${fileUrl}. Coba buka di tab baru.`
      );
    } finally {
      setPdfLoading(false);
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPdfError(null);
    setPdfLoading(false);
  };

  // Pagination and Search
  const filteredRecords = produkHukumList.filter((record) =>
    record.nama_produk_hukum.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
                    Data Produk Hukum
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola produk hukum desa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari produk hukum..."
                    className="pl-10 w-64 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => router.push("/produk-hukum/produk-hukum/tambah")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Data
                </Button>
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
            {!isLoading && filteredRecords.length === 0 && !error && (
              <div className="text-center text-gray-600">
                Tidak ada data produk hukum.
              </div>
            )}

            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Daftar Produk Hukum
                </CardTitle>
                <CardDescription>Kelola produk hukum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold">
                          Nama Produk Hukum
                        </th>
                        <th className="px-4 py-3 font-semibold">Kategori</th>
                        <th className="px-4 py-3 font-semibold">
                          File Pendukung
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((record) => (
                        <tr
                          key={record.id}
                          className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                        >
                          <td className="px-4 py-3">
                            {record.nama_produk_hukum}
                          </td>
                          <td className="px-4 py-3">
                            {record.kategori.kategori}
                          </td>
                          <td className="px-4 py-3">
                            {record.file_pendukung ? (
                              <button
                                onClick={() => {
                                  if (record.file_pendukung) {
                                    handleOpenModal(record.file_pendukung);
                                  }
                                }}
                                className="text-blue-600 hover:underline"
                              >
                                Lihat File
                              </button>
                            ) : (
                              "Tidak ada file"
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() =>
                                  router.push(
                                    `/produk-hukum/produk-hukum/edit/${record.id}`
                                  )
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteProdukHukum(record.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Sebelumnya
                    </Button>
                    <span className="text-sm text-gray-600">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      Berikutnya
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Modal for displaying PDF */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Pratinjau File Pendukung</DialogTitle>
                  <DialogClose onClick={handleCloseModal} />
                </DialogHeader>
                {pdfLoading && (
                  <div className="flex justify-center items-center h-[70vh]">
                    <div className="text-gray-600 animate-pulse">
                      Memuat PDF...
                    </div>
                  </div>
                )}
                {pdfError && (
                  <div className="flex justify-center items-center h-[70vh]">
                    <div className="text-red-600 text-center">
                      {pdfError}
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
                {!pdfLoading && !pdfError && selectedFile && (
                  <div className="w-full h-[70vh]">
                    <iframe
                      src={selectedFile}
                      className="w-full h-full border-0"
                      title="PDF Preview"
                      onError={() =>
                        setPdfError(
                          `Gagal memuat PDF: File tidak ditemukan. URL: ${selectedFile}`
                        )
                      }
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}