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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

interface Berita {
  id: string;
  judul: string;
  konten: string;
  kategoriId: string;
  kategori: { kategori: string };
  sampul: string[];
  createdAt?: string;
}

export default function BeritaListPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>(
    {}
  );
  const itemsPerPage = 4;
  const router = useRouter();

  useEffect(() => {
    const loadBerita = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/berita/getAllBerita");
        const data = Array.isArray(response) ? response : response.data || [];
        console.log("Fetched data:", data);
        setBeritaList(data);
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadBerita();
  }, []);

  const handleDeleteBerita = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus berita ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/berita/deleteBerita/${id}`, { method: "DELETE" });
      setBeritaList(beritaList.filter((record) => record.id !== id));
      if (
        beritaList.length - 1 <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berita berhasil dihapus!",
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

  const filteredRecords = beritaList.filter(
    (record) =>
      record.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.konten.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.kategori.kategori.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getSampulUrl = (sampul: string[], index: number) => {
    if (!sampul || sampul.length === 0 || index >= sampul.length)
      return "/placeholder-image.jpg";
    const filename = sampul[index].split("/").pop();
    return `${process.env.NEXT_PUBLIC_API_URL}/berita/getSampul/berita/${filename}`;
  };

  const handleNextImage = (id: string, totalImages: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, totalImages - 1),
    }));
  };

  const handlePrevImage = (id: string) => {
    setImageIndices((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
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
                    Data Berita
                  </h1>
                  <p className="text-sm text-gray-600">Kelola berita desa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari judul, konten, atau kategori..."
                    className="pl-10 w-64 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => router.push("/berita/tambah")}
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
                Tidak ada data berita.
              </div>
            )}

            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Daftar Berita</CardTitle>
                <CardDescription>Kelola berita desa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600 table-auto">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-6 py-4 font-semibold min-w-[150px]">
                          Sampul
                        </th>
                        <th className="px-6 py-4 font-semibold min-w-[250px]">
                          Judul
                        </th>
                        <th className="px-6 py-4 font-semibold min-w-[150px]">
                          Kategori
                        </th>
                        <th className="px-6 py-4 font-semibold min-w-[150px]">
                          Tanggal Dibuat
                        </th>
                        <th className="px-6 py-4 font-semibold text-right min-w-[120px]">
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
                          <td className="px-6 py-4">
                            <div className="relative w-24 h-24 rounded-md overflow-hidden group">
                              {record.sampul && record.sampul.length > 0 ? (
                                <>
                                  <img
                                    src={getSampulUrl(
                                      record.sampul,
                                      imageIndices[record.id] || 0
                                    )}
                                    alt={record.judul}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        "/placeholder-image.jpg";
                                    }}
                                  />
                                  <Badge className="absolute bottom-2 right-2 bg-blue-900/80 text-white text-xs font-semibold rounded-full px-2 py-1 shadow-md">
                                    {record.sampul.length} Gambar
                                  </Badge>
                                  {record.sampul.length > 1 && (
                                    <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white bg-black/50 hover:bg-black/70 p-1 rounded-full"
                                        onClick={() =>
                                          handlePrevImage(record.id)
                                        }
                                        disabled={
                                          (imageIndices[record.id] || 0) === 0
                                        }
                                      >
                                        <ChevronLeft className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white bg-black/50 hover:bg-black/70 p-1 rounded-full"
                                        onClick={() =>
                                          handleNextImage(
                                            record.id,
                                            record.sampul.length
                                          )
                                        }
                                        disabled={
                                          (imageIndices[record.id] || 0) ===
                                          record.sampul.length - 1
                                        }
                                      >
                                        <ChevronRight className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="text-gray-400">
                                  Tidak ada sampul
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">{record.judul}</td>
                          <td className="px-6 py-4">
                            {record.kategori.kategori}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(record.createdAt!).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() =>
                                  router.push(`/berita/edit/${record.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteBerita(record.id)}
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
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
