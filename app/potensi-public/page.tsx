"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { htmlToText } from "html-to-text";
import { PublicFooter } from "@/components/public-footer";

interface PotensiDesa {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string;
  foto?: string | null;
  createdAt: string;
  updatedAt: string;
}

const cleanContent = (html: string, maxLength: number) => {
  const text = htmlToText(html, {
    wordwrap: false,
    preserveNewlines: true,
    tags: {
      p: { after: " " },
      br: { after: " " },
    },
  });
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const getFotoUrl = (foto: string | null) => {
  if (!foto) return "/placeholder.svg?height=400&width=600";
  const filename = foto.split("/").pop();
  return `http://localhost:3000/public/foto-potensi-desa/potensidesa/${filename}`;
};

export default function PotensiDesaPublicPage() {
  const [potensiDesaList, setPotensiDesaList] = useState<PotensiDesa[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const router = useRouter();

  useEffect(() => {
    const loadPotensiDesa = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/public/potensiDesa");
        const data = Array.isArray(response.data) ? response.data : [];
        setPotensiDesaList(data);
      } catch (err: any) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPotensiDesa();
  }, []);

  const categories = [
    "Semua",
    ...new Set(potensiDesaList.map((item) => item.kategori)),
  ];

  const filteredRecords = potensiDesaList.filter(
    (record) =>
      (record.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cleanContent(record.deskripsi, 1000)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "Semua" || record.kategori === selectedCategory)
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
          <Skeleton className="h-16 w-3/5 mx-auto mb-8 rounded-xl" />
          <Skeleton className="h-8 w-4/5 mx-auto mb-12 rounded-lg" />
          <div className="flex justify-between items-center mb-10">
            <Skeleton className="h-12 w-1/3 rounded-lg" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-md" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-80 w-full rounded-lg" />
                <Skeleton className="h-8 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-10">
            <Skeleton className="h-12 w-36 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-md" />
            <Skeleton className="h-12 w-36 rounded-md" />
          </div>
        </div>
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
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full md:w-2/4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cari potensi desa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#073046]/30 focus:border-[#073046] focus:ring-[#073046]/20 rounded-md shadow-sm transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-[#073046] hover:bg-[#0a4a66] shadow-md"
                        : "border-[#073046]/30 text-[#073046] hover:bg-[#073046]/10 hover:text-[#073046] hover:border-[#073046]/50"
                    }
                  >
                    {category} (
                    {category === "Semua"
                      ? potensiDesaList.length
                      : potensiDesaList.filter(
                          (item) => item.kategori === category
                        ).length}
                    )
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Potensi Desa List */}
        <section>
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key="potensi-list"
              >
                {currentItems.map((potensi, index) => (
                  <motion.div
                    key={potensi.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-lg overflow-hidden bg-white/90"
                      onClick={() =>
                        router.push(`/potensi-desa-public/detail/${potensi.id}`)
                      }
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                          <motion.img
                            src={getFotoUrl(potensi.foto)}
                            alt={potensi.nama}
                            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.svg?height=400&width=600";
                            }}
                          />
                          <motion.div
                            className="absolute top-3 left-3"
                            whileHover={{ scale: 1.05 }}
                          >
                            {/* <Badge className="bg-[#073046] hover:bg-[#0a4a66] text-white font-medium px-3 py-1 rounded-md transition-colors">
                              {potensi.kategori}
                            </Badge> */}
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <CardContent className="p-6 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <motion.h3
                              className="text-2xl font-bold text-[#073046] mb-3 tracking-tight group-hover:text-[#0a4a66] transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              {potensi.nama}
                            </motion.h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                              {cleanContent(potensi.deskripsi, 200)}
                            </p>
                            <div className="flex items-center text-xs text-slate-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(potensi.createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/potensi-public/detail/${potensi.id}`
                                );
                              }}
                            >
                              Baca Selengkapnya
                              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </motion.div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key="no-results"
              >
                <Card className="border-0 shadow-lg rounded-lg bg-white/90">
                  <CardContent className="p-16 text-center">
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
                      Tidak ada potensi desa ditemukan
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Coba ubah kata kunci pencarian atau kategori
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <motion.div
              className="flex justify-between items-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all rounded-md ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Sebelumnya
                </Button>
              </motion.div>
              <span className="text-sm font-medium text-[#073046]">
                Halaman {currentPage} dari {totalPages}
              </span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all rounded-md ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Berikutnya
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </section>
      </div>
      <PublicFooter/>
    </div>
  );
}