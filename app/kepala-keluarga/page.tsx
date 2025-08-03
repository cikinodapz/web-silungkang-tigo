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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, User } from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface KepalaKeluarga {
  id: string;
  KK: string;
  nik: string;
  nama: string;
  no_akta_kelahiran: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  golongan_darah: string;
  agama: string;
  status_perkawinan: string;
  pendidikan_akhir: string;
  pekerjaan: string;
  nama_ayah: string;
  nama_ibu: string;
  scan_ktp?: string;
  scan_kk?: string;
  scan_akta_lahir?: string;
  scan_buku_nikah?: string;
}

interface FamilyCard {
  id: string;
  no_kk: string;
}

export default function KepalaKeluargaPage() {
  const [kepalaKeluargas, setKepalaKeluargas] = useState<KepalaKeluarga[]>([]);
  const [familyCards, setFamilyCards] = useState<FamilyCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Fetch kepala keluarga and KK without kepala on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [kepalaResponse, kkResponse] = await Promise.all([
          fetchData("/kelola-kepala-keluarga/getAllKepalaKeluarga"),
          fetchData("/kelola-kk/getKKWithoutKepalaKeluarga"),
        ]);
        setKepalaKeluargas(
          Array.isArray(kepalaResponse) ? kepalaResponse : kepalaResponse.data || []
        );
        setFamilyCards(
          Array.isArray(kkResponse) ? kkResponse : kkResponse.data || []
        );
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle delete kepala keluarga
  const handleDeleteKepala = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus Kepala Keluarga ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/kelola-kepala-keluarga/deleteKepalaKeluarga/${id}`, {
        method: "DELETE",
      });
      setKepalaKeluargas(kepalaKeluargas.filter((kepala) => kepala.id !== id));
      if (
        kepalaKeluargas.length - 1 <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kepala Keluarga berhasil dihapus!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menghapus Kepala Keluarga: ${
          err.message || "Terjadi kesalahan"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter kepala keluarga based on search query
  const filteredKepalaKeluargas = kepalaKeluargas.filter(
    (kepala) =>
      kepala.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kepala.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kepala.KK.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKepalaKeluargas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredKepalaKeluargas.length / itemsPerPage);

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
                    Data Kepala Keluarga
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola data Kepala Keluarga desa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari NIK, nama, atau No. KK..."
                    className="pl-10 w-64 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => router.push("/kepala-keluarga/tambah-kepala")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Kepala Keluarga
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
            {!isLoading && filteredKepalaKeluargas.length === 0 && !error && (
              <div className="text-center text-gray-600">
                Tidak ada data Kepala Keluarga.
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 bg-white/80 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Kepala Keluarga
                  </CardTitle>
                  <User className="h-5 w-5 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">
                    {kepalaKeluargas.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Kepala Keluarga terdaftar
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/80 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    KK Tanpa Kepala
                  </CardTitle>
                  <User className="h-5 w-5 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">
                    {familyCards.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Kartu Keluarga tanpa kepala
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Daftar Kepala Keluarga
                </CardTitle>
                <CardDescription>Kelola data Kepala Keluarga</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold">NIK</th>
                        <th className="px-4 py-3 font-semibold">Nama</th>
                        {/* <th className="px-4 py-3 font-semibold">No. KK</th> */}
                        <th className="px-4 py-3 font-semibold">Jenis Kelamin</th>
                        <th className="px-4 py-3 font-semibold">Tanggal Lahir</th>
                        <th className="px-4 py-3 font-semibold">Agama</th>
                        <th className="px-4 py-3 font-semibold">Pekerjaan</th>
                        <th className="px-4 py-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((kepala) => (
                        <tr
                          key={kepala.id}
                          className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                        >
                          <td className="px-4 py-3">{kepala.nik}</td>
                          <td className="px-4 py-3">{kepala.nama}</td>
                          {/* <td className="px-4 py-3">{kepala.KK}</td> */}
                          <td className="px-4 py-3">{kepala.jenis_kelamin}</td>
                          <td className="px-4 py-3">
                            {new Date(kepala.tanggal_lahir).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">{kepala.agama}</td>
                          <td className="px-4 py-3">{kepala.pekerjaan}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() =>
                                  router.push(`/kepala-keluarga/edit-kepala/${kepala.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteKepala(kepala.id)}
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