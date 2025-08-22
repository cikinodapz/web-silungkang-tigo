"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, ExternalLink } from "lucide-react";
import { fetchData } from "@/lib/api";
import { motion } from "framer-motion";
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
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function UMKMDetailPublicPage() {
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const loadUMKMDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(`/public/umkm/${id}`);
        setUmkm(response.umkm);
      } catch (err: any) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      loadUMKMDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-20 w-3/4 mx-auto mb-8 rounded-xl" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
            <div className="md:w-2/3 space-y-4">
              <Skeleton className="h-12 w-2/3 rounded-lg" />
              <Skeleton className="h-6 w-1/2 rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-12 w-1/3 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-16 w-1/2 mx-auto mt-12 mb-8 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-8 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  if (error || !umkm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <motion.div
          className="container mx-auto px-4 py-16 text-center text-red-600 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error || "Data UMKM tidak ditemukan"}
        </motion.div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />
      <div className="container mx-auto px-4 py-16">
        <motion.section
          className="flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* UMKM Image */}
          <div className="md:w-1/3">
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={getFotoUrl(umkm.foto_umkm, "umkm")}
                alt={umkm.nama_umkm}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=400&width=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </motion.div>
          </div>

          {/* UMKM Details */}
          <div className="md:w-2/3">
            <Card className="border-0 shadow-md rounded-xl bg-white/95">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-[#073046] mb-4">
                  Tentang {umkm.nama_umkm}
                </h2>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {umkm.deskripsi_umkm}
                </p>
                <div className="flex items-center text-sm text-slate-500 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  Dibuat pada:{" "}
                  {new Date(umkm.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full md:w-auto bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-base"
                    onClick={() => window.open(`https://wa.me/${umkm.kontak_wa}`, "_blank")}
                    aria-label={`Hubungi ${umkm.nama_umkm} via WhatsApp`}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Hubungi via WhatsApp
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Produk List */}
        <section className="mt-12">
          <motion.h2
            className="text-3xl font-semibold text-[#073046] text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Produk Unggulan
          </motion.h2>
          {umkm.produk.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {umkm.produk.map((produk, index) => (
                <motion.div
                  key={produk.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-white/95 overflow-hidden h-80">
                    <div className="relative h-full w-full">
                      <img
                        src={getFotoUrl(produk.foto_produk, "produk")}
                        alt={produk.nama_produk}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=400&width=600";
                        }}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <CardTitle className="text-lg font-semibold text-white mb-2">
                          {produk.nama_produk}
                        </CardTitle>
                        <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                          {cleanContent(produk.deskripsi_produk, 100)}
                        </p>

                        {produk.link_produk && produk.link_produk.trim() !== "" ? (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#073046] transition-all duration-300 rounded-lg text-base"
                              onClick={() => window.open(produk.link_produk, "_blank")}
                              aria-label={`Kunjungi link produk ${produk.nama_produk}`}
                            >
                              <ExternalLink className="h-5 w-5 mr-2" />
                              Lihat Produk
                            </Button>
                          </motion.div>
                        ) : (
                          <p className="text-sm text-red-300 font-medium">
                            Link produk belum tersedia
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="rounded-xl border bg-white/95 shadow-sm p-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-[#073046] mb-2">
                Tidak ada produk ditemukan
              </h3>
              <p className="text-slate-500 text-sm">
                UMKM ini belum memiliki produk yang terdaftar.
              </p>
            </motion.div>
          )}
        </section>
      </div>
      <PublicFooter />
    </div>
  );
}
