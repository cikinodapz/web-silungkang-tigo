"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Produk {
  id: string;
  nama_produk: string;
  deskripsi_produk: string;
  foto_produk: string | null;
  link_produk: string;
  umkmId: string;
  createdAt: string;
  updatedAt: string;
}

interface UMKM {
  id: string;
  nama_umkm: string;
  deskripsi_umkm: string;
  foto_umkm: string | null;
  kontak_wa: string;
  createdAt: string;
  updatedAt: string;
  produk: Produk[];
}

// Get image URL
const getFotoUrl = (foto: string | null, type: "umkm" | "produk") => {
  if (!foto) return "/placeholder.svg?height=400&width=600";
  const filename = foto.split("/").pop();
  return `${process.env.NEXT_PUBLIC_API_URL}/public/foto-${type}/${type}/${filename}`;
};

const cleanContent = (text: string, maxLength: number) => {
  if (!text) return "";
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length > maxLength
    ? trimmed.substring(0, maxLength) + "..."
    : trimmed;
};

const truncate = (text: string, max: number) =>
  text.length > max ? text.slice(0, max - 1) + "…" : text;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function UMKMPublicPage() {
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    const loadUMKM = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/public/umkm");
        const data = Array.isArray(response.data) ? response.data : [];
        setUmkmList(data);
      } catch (err: any) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUMKM();
  }, []);

  const filteredRecords = umkmList.filter(
    (record) =>
      record.nama_umkm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.deskripsi_umkm.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="flex justify-between items-center mb-10">
            <Skeleton className="h-12 w-1/3 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-8 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))}
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

      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Lapak Desa Silungkang Tigo
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dukung usaha mikro, kecil, dan menengah lokal dengan menjelajahi
              produk unggulan kami.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search */}
        <section className="mb-12">
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center gap-6 bg-white/80 p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full md:w-2/5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Cari UMKM atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#073046]/20 focus:border-[#073046] focus:ring-[#073046]/30 rounded-lg shadow-sm transition-all duration-300 text-base"
                aria-label="Pencarian UMKM"
              />
            </div>
          </motion.div>
        </section>

        {/* List UMKM */}
        <section>
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              <motion.div
                key="umkm-list"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentItems.map((umkm, index) => (
                  <motion.div
                    key={umkm.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <Card
                      className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl bg-white/95 overflow-hidden cursor-pointer h-full flex flex-col"
                      onClick={() =>
                        router.push(`/lapak-public/detail/${umkm.id}`)
                      }
                    >
                      {/* Gambar */}
                      <CardHeader className="p-0">
                        <div className="relative h-48">
                          <motion.img
                            src={getFotoUrl(umkm.foto_umkm, "umkm")}
                            alt={umkm.nama_umkm}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.svg?height=400&width=600";
                            }}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </CardHeader>

                      {/* Konten */}
                      <CardContent className="p-6 flex flex-col flex-1 min-h-[260px]">
                        {/* Judul: clamp + reserve height */}
                        <CardTitle className="text-xl font-semibold text-[#073046] mb-1 line-clamp-2">
                          {umkm.nama_umkm}
                        </CardTitle>
                        <p className="text-sm text-slate-600 mb-2 line-clamp-3">
                          {cleanContent(umkm.deskripsi_umkm, 220)}
                        </p>

                        {/* Tanggal */}
                        <div className="flex items-center text-sm text-slate-500 mb-3">
                          <Calendar className="h-4 w-4 mr-2 shrink-0" />
                          <span>{formatDate(umkm.createdAt)}</span>
                        </div>

                        {/* Produk chips: max 2 + truncate tiap chip, tinggi tetap */}
                        <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                          {(umkm.produk ?? []).slice(0, 2).map((produk) => (
                            <span
                              key={produk.id}
                              className="inline-block max-w-[9.5rem] bg-[#073046]/10 text-[#073046] px-2 py-1 rounded-md text-xs truncate"
                              title={produk.nama_produk}
                            >
                              {truncate(produk.nama_produk, 28)}
                            </span>
                          ))}
                          {(umkm.produk?.length ?? 0) > 2 && (
                            <span className="inline-block bg-[#073046]/10 text-[#073046] px-2 py-1 rounded-md text-xs">
                              +{(umkm.produk?.length ?? 0) - 2} lainnya
                            </span>
                          )}
                        </div>

                        {/* Tombol (tetap di bawah) */}
                        <div className="mt-auto flex gap-4">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1"
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-base"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/lapak-public/detail/${umkm.id}`);
                              }}
                              aria-label={`Lihat detail ${umkm.nama_umkm}`}
                            >
                              Detail UMKM
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1"
                          >
                            <Button
                              variant="outline"
                              className="w-full border-[#073046]/30 text-[#073046] hover:bg-[#073046] hover:text-white transition-all duration-300 rounded-lg text-base"
                              onClick={(e) => {
                                e.stopPropagation();
                                const number = (umkm.kontak_wa || "").replace(
                                  /\D/g,
                                  ""
                                );
                                window.open(
                                  `https://wa.me/${number}`,
                                  "_blank"
                                );
                              }}
                              aria-label={`Hubungi ${umkm.nama_umkm} via WhatsApp`}
                            >
                              <MessageCircle className="h-5 w-5 mr-2" />
                              WhatsApp
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rounded-xl border bg-white/95 shadow-sm p-16 text-center">
                  <motion.div
                    className="text-slate-400 mb-6"
                    animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Search className="h-16 w-16 mx-auto" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#073046] mb-2">
                    Tidak ada UMKM ditemukan
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Coba ubah kata kunci pencarian
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-between items-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
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
