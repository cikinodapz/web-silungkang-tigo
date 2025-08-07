"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { fetchData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { htmlToText } from "html-to-text";
import Image from "next/image";

interface PotensiDesa {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: string;
  foto?: string | null;
  createdAt: string;
  updatedAt: string;
}

const cleanContent = (html: string) => {
  return htmlToText(html, {
    wordwrap: false,
    preserveNewlines: true,
    tags: {
      p: { after: "\n\n" },
      br: { after: "\n" },
    },
  });
};

const getFotoUrl = (foto: string | null) => {
  if (!foto) return "/placeholder.svg?height=600&width=800";
  const filename = foto.split("/").pop();
  return `${process.env.NEXT_PUBLIC_API_URL}/public/foto-potensi-desa/potensidesa/${filename}`;
};

const ErrorBoundary: React.FC<{ children: React.ReactNode; fallback: React.ReactNode }> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      setHasError(true);
      console.error("ErrorBoundary caught:", error);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  return hasError ? <>{fallback}</> : <>{children}</>;
};

export default function PotensiDesaDetailPage() {
  const [potensiDesa, setPotensiDesa] = useState<PotensiDesa | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const loadPotensiDesa = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData(`/public/getPotensiDesa/${id}`);
      if (response.potensiDesa) {
        setPotensiDesa(response.potensiDesa);
      } else {
        setError("Data potensi desa tidak ditemukan");
      }
    } catch (err: any) {
      setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadPotensiDesa();
    }
  }, [id, loadPotensiDesa]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: potensiDesa?.nama,
        text: cleanContent(potensiDesa?.deskripsi || "").slice(0, 100) + "...",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Skeleton className="h-12 w-36 mb-8 rounded-md" />
          <Card className="border-0 shadow-lg bg-white/90">
            <CardHeader>
              <Skeleton className="h-8 w-3/5 rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-6 w-1/4 rounded-md" />
              <Skeleton className="h-4 w-1/3 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !potensiDesa) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <motion.div
          className="container mx-auto px-4 py-16 text-center text-red-600 font-semibold max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error || "Data potensi desa tidak ditemukan"}
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
          <PublicHeader />
          <motion.div
            className="container mx-auto px-4 py-16 text-center text-red-600 font-semibold max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Terjadi kesalahan saat memuat konten
          </motion.div>
        </div>
      }
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/potensi-public")}
                  className="border-[#073046]/30 text-[#073046] hover:bg-[#073046]/10 hover:text-[#073046] hover:border-[#073046]/50"
                  aria-label="Kembali ke daftar potensi"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="border-[#073046]/30 text-[#073046] hover:bg-[#073046]/10 hover:text-[#073046] hover:border-[#073046]/50"
                  aria-label="Bagikan potensi desa"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
              </motion.div>
            </div>
            <Card className="border-0 shadow-lg bg-white/90">
              <CardHeader className="pb-4">
                <motion.div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-[#073046]">
                    {potensiDesa.nama}
                  </CardTitle>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className="bg-[#073046] hover:bg-[#0a4a66] text-white font-medium px-3 py-1 rounded-md transition-colors">
                      {potensiDesa.kategori}
                    </Badge>
                  </motion.div>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  className="relative aspect-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={getFotoUrl(potensiDesa.foto)}
                    alt={potensiDesa.nama}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    placeholder="blur"
                    blurDataURL="/placeholder.svg?height=600&width=800"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=600&width=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                  <span>
                    {new Date(potensiDesa.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <motion.div
                  className="text-slate-700 leading-relaxed prose max-w-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p>{cleanContent(potensiDesa.deskripsi)}</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
}