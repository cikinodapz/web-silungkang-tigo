"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, TrendingUp, Filter, ArrowLeft } from "lucide-react";
import { fetchData } from "@/lib/api";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicFooter } from "@/components/public-footer";

interface Berita {
  id: string;
  judul: string;
  berita: string;
  kategoriId: string;
  kategori: {
    id: string;
    kategori: string;
  };
  sampul?: string;
  createdAt: string;
  updatedAt: string;
}

interface Kategori {
  id: string;
  kategori: string;
  jumlah_berita: number;
}

export default function BeritaDetailPage() {
  const [berita, setBerita] = useState<Berita | null>(null);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const beritaId = params.id;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch specific news detail
        const beritaResponse = await fetchData(`/public/getBerita/${beritaId}`);
        setBerita(beritaResponse.berita);

        // Fetch all news for popular news and archives
        const allBeritaResponse = await fetchData("/public/getAllBerita");
        const beritaData = Array.isArray(allBeritaResponse.data)
          ? allBeritaResponse.data
          : [];
        setBeritaList(beritaData);

        // Fetch categories data
        const kategoriResponse = await fetchData(
          "/public/getAllKategoriBerita"
        );
        const kategoriData = Array.isArray(kategoriResponse.data)
          ? kategoriResponse.data
          : [];
        setKategoriList(kategoriData);
      } catch (err: any) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (beritaId) {
      loadData();
    }
  }, [beritaId]);

  // Get image URL
  function getSampulUrl(sampul?: string) {
    if (!sampul) return "/placeholder.svg";
    const filename = sampul.split("/").pop();
    return `http://localhost:3000/public/getSampul/berita/${filename}`;
  }

  // Get popular news
  const popularNews = beritaList
    .map((news) => ({
      id: news.id,
      title: news.judul,
      views: Math.floor(Math.random() * 800) + 200,
      image: news.sampul ? getSampulUrl(news.sampul) : "/placeholder.svg",
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Generate archives
  function generateArchives(news: Berita[]) {
    const archiveMap = new Map<string, number>();
    news.forEach((item) => {
      const date = new Date(item.createdAt);
      const monthYear = date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
      archiveMap.set(monthYear, (archiveMap.get(monthYear) || 0) + 1);
    });
    return Array.from(archiveMap.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([month, count]) => ({ month, count }))
      .slice(0, 5);
  }

  const archives = generateArchives(beritaList);

  // Get categories
  const categories = ["Semua", ...kategoriList.map((k) => k.kategori)];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <Card className="border-0 shadow-lg">
                <Skeleton className="aspect-video w-full rounded-t-lg" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-t-lg" />
                  <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !berita) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <motion.div
          className="container mx-auto px-4 py-12 text-center text-red-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error || "Berita tidak ditemukan"}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <motion.img
                    src={getSampulUrl(berita.sampul)}
                    alt={berita.judul}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* <Badge className="bg-[#073046] hover:bg-[#0a4a66] transition-colors">
                      {berita.kategori.kategori}
                    </Badge> */}
                  </motion.div>
                </div>
                <CardContent className="p-6">
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-[#073046] mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {berita.judul}
                  </motion.h1>
                  <motion.div
                    className="flex items-center gap-4 text-sm text-slate-500 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(berita.createdAt).toLocaleDateString("id-ID")}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Admin Desa
                    </div>
                  </motion.div>
                  <motion.div
                    className="prose prose-slate max-w-none text-justify"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    dangerouslySetInnerHTML={{
                      __html: berita.berita.replace(/\n/g, "<br />"),
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-6"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full md:w-auto border-blue-800 text-blue-800 hover:bg-blue-800/10 transition-colors"
                      onClick={() => router.push("/berita-public")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Berita Lainnya
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Berita Terpopuler
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {popularNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors items-center"
                        onClick={() =>
                          router.push(`/berita-public/detail/${news.id}`)
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <div className="flex-1 min-w-0 self-start">
                          <h4 className="font-semibold text-base text-[#073046] line-clamp-2 mb-1 hover:text-[#0a4a66] transition-colors">
                            {news.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Kategori
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => {
                        setSelectedCategory("Semua");
                        router.push("/berita-public");
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === "Semua"
                          ? "bg-[#073046] text-white"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium">Semua</span>
                      <motion.div>
                        <Badge
                          variant={
                            selectedCategory === "Semua"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {beritaList.length}
                        </Badge>
                      </motion.div>
                    </motion.button>
                    {kategoriList.map((kategori) => (
                      <motion.button
                        key={kategori.id}
                        onClick={() => {
                          setSelectedCategory(kategori.kategori);
                          router.push("/berita-public");
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          selectedCategory === kategori.kategori
                            ? "bg-[#073046] text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium">{kategori.kategori}</span>
                        <motion.div>
                          <Badge
                            variant={
                              selectedCategory === kategori.kategori
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {kategori.jumlah_berita}
                          </Badge>
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Arsip
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {archives.map((archive, index) => (
                      <motion.button
                        key={index}
                        className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-slate-100 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-medium text-slate-700">
                          {archive.month}
                        </span>
                        <motion.div>
                          <Badge variant="outline">{archive.count}</Badge>
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}