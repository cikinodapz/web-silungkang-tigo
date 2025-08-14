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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Produk {
  id: string;
  nama_produk: string;
  deskripsi_produk: string;
  foto_produk?: string;
  link_produk?: string;
  umkmId: string;
  umkm: { nama_umkm: string };
  createdAt?: string;
}

interface UMKM {
  id: string;
  nama_umkm: string;
}

export default function ProdukListPage() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [selectedUmkmId, setSelectedUmkmId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch UMKM list
        const umkmResponse = await fetchData("/lapak-desa/umkm");
        const umkmData = Array.isArray(umkmResponse)
          ? umkmResponse
          : umkmResponse.data || [];
        setUmkmList(umkmData);

        // Fetch products
        const produkResponse = await fetchData("/lapak-desa/produk");
        const produkData = Array.isArray(produkResponse)
          ? produkResponse
          : produkResponse.data || [];
        console.log("Fetched produk:", produkData);
        setProdukList(produkData);
      } catch (err: any) {
        const errorMessage = err.message || "Terjadi kesalahan";
        setError(`Gagal memuat data: ${errorMessage}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDeleteProduk = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus produk ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/lapak-desa/produk/${id}`, { method: "DELETE" });
      setProdukList(produkList.filter((p) => p.id !== id));
      if (
        produkList.length - 1 <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk berhasil dihapus!",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menghapus data: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProduk = produkList.filter((p) => {
    const matchesSearch =
      p.nama_produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deskripsi_produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.umkm?.nama_umkm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUmkm = selectedUmkmId === "all" || p.umkmId === selectedUmkmId;
    return matchesSearch && matchesUmkm;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProduk.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProduk.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
                    Data Produk
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola produk UMKM desa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari nama produk, deskripsi, atau UMKM..."
                    className="pl-10 w-64 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedUmkmId}
                  onValueChange={(value) => {
                    setSelectedUmkmId(value);
                    setCurrentPage(1); // Reset to page 1 on filter change
                  }}
                >
                  <SelectTrigger className="w-48 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Filter UMKM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua UMKM</SelectItem>
                    {umkmList.map((umkm) => (
                      <SelectItem key={umkm.id} value={umkm.id}>
                        {umkm.nama_umkm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => router.push("/lapak-desa/produk/tambah")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Produk
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
            {!isLoading && filteredProduk.length === 0 && !error && (
              <div className="text-center text-gray-600">
                Tidak ada data produk.
              </div>
            )}

            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Daftar Produk</CardTitle>
                <CardDescription>Kelola produk dari UMKM desa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600 table-auto">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Nama Produk</th>
                        <th className="px-6 py-4 font-semibold">Deskripsi</th>
                        <th className="px-6 py-4 font-semibold">UMKM</th>
                        <th className="px-6 py-4 font-semibold">Foto</th>
                        <th className="px-6 py-4 font-semibold">Link Produk</th>
                        <th className="px-6 py-4 font-semibold text-right">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((produk) => (
                        <tr
                          key={produk.id}
                          className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                        >
                          <td className="px-6 py-4 font-medium">
                            {produk.nama_produk}
                          </td>
                          <td className="px-6 py-4">
                            {produk.deskripsi_produk}
                          </td>
                          <td className="px-6 py-4">
                            {produk.umkm?.nama_umkm}
                          </td>
                          <td className="px-6 py-4">
                            {produk.foto_produk ? (
                              <img
                                src={getFotoUrl(produk.foto_produk)}
                                alt={produk.nama_produk}
                                className="w-16 h-16 object-cover rounded-md"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-image.jpg";
                                }}
                              />
                            ) : (
                              <span className="text-gray-400">
                                Tidak ada foto
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {produk.link_produk ? (
                              <a
                                href={produk.link_produk}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Lihat Produk
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() =>
                                  router.push(
                                    `/lapak-desa/produk/edit/${produk.id}`
                                  )
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteProduk(produk.id)}
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
