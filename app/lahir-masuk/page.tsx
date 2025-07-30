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

interface LahirMasuk {
  id: string;
  nama: string;
  nik: string;
  tanggal_lahir_masuk: string;
  alamat_sebelumnya: string | null;
  kkId: string;
  kk: {
    no_kk: string;
    kepalaKeluarga: {
      nama: string;
    } | null;
  } | null;
}

export default function LahirMasukPage() {
  const [lahirMasukRecords, setLahirMasukRecords] = useState<LahirMasuk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Fetch Lahir Masuk records on component mount
  useEffect(() => {
    const loadLahirMasuk = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/mutasi/getAllLahirMasuk");
        setLahirMasukRecords(
          Array.isArray(response) ? response : response.data || []
        );
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadLahirMasuk();
  }, []);

  // Handle delete Lahir Masuk record
  const handleDeleteLahirMasuk = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus data Lahir/Masuk ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/mutasi/deleteLahirMasuk/${id}`, { method: "DELETE" });
      setLahirMasukRecords(lahirMasukRecords.filter((record) => record.id !== id));
      if (
        lahirMasukRecords.length - 1 <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data Lahir/Masuk berhasil dihapus!",
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

  // Filter records based on search query
  const filteredRecords = lahirMasukRecords.filter(
    (record) =>
      record.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.kk?.no_kk || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
                    Data Lahir/Masuk
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola data kelahiran dan pendatang desa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari nama, NIK, atau No. KK..."
                    className="pl-10 w-64 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => router.push("/lahir-masuk/tambah-lahir-masuk")}
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
                Tidak ada data Lahir/Masuk.
              </div>
            )}

            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Daftar Lahir/Masuk
                </CardTitle>
                <CardDescription>Kelola data kelahiran dan pendatang</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Nama</th>
                        <th className="px-4 py-3 font-semibold">NIK</th>
                        <th className="px-4 py-3 font-semibold">Tanggal Lahir/Masuk</th>
                        <th className="px-4 py-3 font-semibold">Alamat Sebelumnya</th>
                        <th className="px-4 py-3 font-semibold">No. KK</th>
                        <th className="px-4 py-3 font-semibold">Kepala Keluarga</th>
                        <th className="px-4 py-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((record) => (
                        <tr
                          key={record.id}
                          className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                        >
                          <td className="px-4 py-3">{record.nama}</td>
                          <td className="px-4 py-3">{record.nik}</td>
                          <td className="px-4 py-3">
                            {new Date(record.tanggal_lahir_masuk).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">{record.alamat_sebelumnya || "-"}</td>
                          <td className="px-4 py-3">{record.kk?.no_kk || "-"}</td>
                          <td className="px-4 py-3">
                            {record.kk?.kepalaKeluarga?.nama || "Belum ditentukan"}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() =>
                                  router.push(`/lahir-masuk/edit-lahir-masuk/${record.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteLahirMasuk(record.id)}
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