"use client";

import { useState, useEffect } from "react";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
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
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowUpDown,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProdukHukum {
  id: string;
  nama_produk_hukum: string;
  file_pendukung: string;
  kategoriId: string;
  createdAt: string;
  updatedAt: string;
  kategori: {
    id: string;
    kategori: string;
  };
}

interface SortConfig {
  key: keyof ProdukHukum | "kategori.kategori";
  direction: "asc" | "desc";
}

const getFileUrl = (filePath: string) => {
  const filename = filePath.split("/").pop();
  return `http://localhost:3000/public/getFileProdukHukum/produkhukum/${filename}`;
};

export default function ProdukHukumPublicPage() {
  const [produkHukumList, setProdukHukumList] = useState<ProdukHukum[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });
  const itemsPerPage = 10;

  useEffect(() => {
    const loadProdukHukum = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/public/getAllProdukHukum");
        const data = Array.isArray(response.data) ? response.data : [];
        setProdukHukumList(data);
      } catch (err: any) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProdukHukum();
  }, []);

  const categories = [
    "Semua",
    ...new Set(produkHukumList.map((item) => item.kategori.kategori)),
  ];

  const handleSort = (key: keyof ProdukHukum | "kategori.kategori") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedRecords = [...produkHukumList].sort((a, b) => {
    const direction = sortConfig.direction === "asc" ? 1 : -1;
    if (sortConfig.key === "kategori.kategori") {
      const aValue = a.kategori.kategori || "";
      const bValue = b.kategori.kategori || "";
      return aValue.localeCompare(bValue) * direction;
    }
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    if (sortConfig.key === "createdAt") {
      return (
        (new Date(aValue).getTime() - new Date(bValue).getTime()) * direction
      );
    }
    return aValue.toString().localeCompare(bValue.toString()) * direction;
  });

  const filteredRecords = sortedRecords.filter(
    (record) =>
      record.nama_produk_hukum
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "Semua" ||
        record.kategori.kategori === selectedCategory)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-20 w-3/4 mx-auto mb-8 rounded-xl" />
          <Skeleton className="h-10 w-4/5 mx-auto mb-12 rounded-lg" />
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <Skeleton className="h-12 w-full md:w-1/3 rounded-lg" />
            <Skeleton className="h-12 w-full md:w-1/4 rounded-lg" />
          </div>
          <div className="rounded-xl border bg-white/95 shadow-sm">
            <Skeleton className="h-12 w-full" />
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex p-4 gap-4">
                  <Skeleton className="h-10 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-10 w-1/6" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-10">
            <Skeleton className="h-12 w-36 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-md" />
            <Skeleton className="h-12 w-36 rounded-md" />
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <motion.div
          className="container mx-auto px-4 py-16 text-center text-red-600 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />
      <div className="container mx-auto px-4 py-16">
        {/* Filter Section */}
        <section className="mb-12">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/80 p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full md:w-2/5">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Cari produk hukum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#073046]/20 focus:border-[#073046] focus:ring-[#073046]/30 rounded-lg shadow-sm transition-all duration-300 text-base"
                aria-label="Pencarian produk hukum"
              />
            </div>
            <div className="w-full md:w-1/4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger
                  className="border-[#073046]/20 focus:border-[#073046] focus:ring-[#073046]/30 rounded-lg shadow-sm transition-all duration-300"
                  aria-label="Filter berdasarkan kategori"
                >
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category} (
                      {category === "Semua"
                        ? produkHukumList.length
                        : produkHukumList.filter(
                            (item) => item.kategori.kategori === category
                          ).length}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </section>

        {/* Produk Hukum Table */}
        <section>
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              <motion.div
                className="rounded-xl border bg-white/95 shadow-sm overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key="produk-hukum-table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#073046]/5 hover:bg-[#073046]/10">
                      <TableHead className="w-2/5">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("nama_produk_hukum")}
                          className="flex items-center gap-2 text-[#073046] font-semibold"
                          aria-label="Urutkan berdasarkan nama produk hukum"
                        >
                          Nama Produk Hukum
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="w-1/4">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("kategori.kategori")}
                          className="flex items-center gap-2 text-[#073046] font-semibold"
                          aria-label="Urutkan berdasarkan kategori"
                        >
                          Kategori
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="w-1/4">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("createdAt")}
                          className="flex items-center gap-2 text-[#073046] font-semibold"
                          aria-label="Urutkan berdasarkan tanggal dibuat"
                        >
                          Tanggal Dibuat
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="w-1/6 text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((produk, index) => (
                      <motion.tr
                        key={produk.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="hover:bg-[#073046]/5"
                      >
                        <TableCell className="font-medium text-[#073046]">
                          {produk.nama_produk_hukum}
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 rounded-md text-sm text-[#073046] bg-[#073046]/10 border border-[#073046]/20">
                            {produk.kategori.kategori}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(produk.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                getFileUrl(produk.file_pendukung),
                                "_blank"
                              )
                            }
                            className="border-[#073046]/30 text-[#073046] hover:bg-[#073046] hover:text-white transition-all duration-300"
                            aria-label={`Lihat dokumen ${produk.nama_produk_hukum}`}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Lihat
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key="no-results"
              >
                <div className="rounded-xl border bg-white/95 shadow-sm p-16 text-center">
                  <motion.div
                    className="text-slate-400 mb-6"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Search className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#073046] mb-2">
                    Tidak ada produk hukum ditemukan
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Coba ubah kata kunci pencarian atau kategori
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <motion.div
              className="flex justify-between items-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Sebelumnya
                </Button>
              </motion.div>
              <span className="text-base font-medium text-[#073046]">
                Halaman {currentPage} dari {totalPages}
              </span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  aria-label="Halaman berikutnya"
                >
                  Berikutnya
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </section>
      </div>
      <PublicFooter />
    </div>
  );
}
