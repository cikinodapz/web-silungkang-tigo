"use client";

import { useState, useEffect } from "react";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Filter,
  TrendingUp,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicFooter } from "@/components/public-footer";
import { htmlToText } from "html-to-text";

// Define interfaces
interface Berita {
  id: string;
  judul: string;
  berita: string;
  kategoriId: string;
  kategori: {
    id: string;
    kategori: string;
  };
  sampul: string[]; // Updated to string array
  createdAt: string;
  updatedAt: string;
}

interface Kategori {
  id: string;
  kategori: string;
  jumlah_berita: number;
}

export default function BeritaPublicPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const beritaResponse = await fetchData("/public/getAllBerita");
        const beritaData = Array.isArray(beritaResponse.data)
          ? beritaResponse.data
          : [];
        setBeritaList(beritaData);

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
    loadData();
  }, []);

  // Function to clean HTML tags from content
  const cleanContent = (html: string, maxLength: number) => {
    const text = htmlToText(html, {
      wordwrap: false,
      preserveNewlines: true,
      tags: {
        p: { after: " " },
        br: { after: " " },
      },
    });
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Get unique categories from the news data
  const categories = ["Semua", ...kategoriList.map((k) => k.kategori)];

  // Get image URL
  function getSampulUrl(sampul: string[]) {
    if (!sampul || sampul.length === 0) return "/placeholder.svg";
    const filename = sampul[0].split("/").pop();
    return `http://localhost:3000/public/getSampul/berita/${filename}`;
  }

  // Get featured news (most recent)
  const featuredNews =
    beritaList.length > 0
      ? {
          id: beritaList[0].id,
          title: beritaList[0].judul,
          excerpt: cleanContent(beritaList[0].berita, 150),
          content: beritaList[0].berita,
          date: beritaList[0].createdAt,
          author: "Admin Desa",
          category: beritaList[0].kategori.kategori,
          views: Math.floor(Math.random() * 1000) + 500,
          image: getSampulUrl(beritaList[0].sampul),
          imageCount: beritaList[0].sampul.length, // Added to track number of images
        }
      : null;

  // Get all news (excluding featured)
  const allNews = beritaList.slice(1).map((news) => ({
    id: news.id,
    title: news.judul,
    excerpt: cleanContent(news.berita, 100),
    date: news.createdAt,
    author: "Admin Desa",
    category: news.kategori.kategori,
    views: Math.floor(Math.random() * 800) + 200,
    image: getSampulUrl(news.sampul),
    imageCount: news.sampul.length, // Added to track number of images
  }));

  // Get popular news (sorted by views)
  const popularNews = [...allNews]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((news) => ({
      id: news.id,
      title: news.title,
      views: news.views,
      image: news.image,
      imageCount: news.imageCount, // Added to track number of images
    }));

  // Generate archives based on creation dates
  const archives = generateArchives(beritaList);

  // Filter news based on search and category
  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Generate archives data
  function generateArchives(news: Berita[]) {
    const archiveMap = new Map<string, number>();

    news.forEach((item) => {
      const date = new Date(item.createdAt);
      const monthYear = date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });

      if (archiveMap.has(monthYear)) {
        archiveMap.set(monthYear, archiveMap.get(monthYear)! + 1);
      } else {
        archiveMap.set(monthYear, 1);
      }
    });

    return Array.from(archiveMap.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .map(([month, count]) => ({ month, count }))
      .slice(0, 5);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                ))}
              </div>
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <PublicHeader />
        <motion.div
          className="container mx-auto px-4 py-12 text-center text-red-600"
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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence>
              {featuredNews && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card
                    className="border-0 shadow-lg overflow-hidden cursor-pointer group relative"
                    onClick={() =>
                      router.push(`/berita-public/detail/${featuredNews.id}`)
                    }
                  >
                    <div className="aspect-video relative">
                      <motion.img
                        src={featuredNews.image}
                        alt={featuredNews.title}
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
                          {featuredNews.category}
                        </Badge> */}
                      </motion.div>
                      {featuredNews.imageCount > 1 && (
                        <motion.div
                          className="absolute top-4 right-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge className="bg-[#073046] hover:bg-[#0a4a66] transition-colors">
                            {featuredNews.imageCount} Gambar
                          </Badge>
                        </motion.div>
                      )}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <motion.h2
                          className="text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-blue-200 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {featuredNews.title}
                        </motion.h2>
                        <p className="text-blue-100/90 mb-4 line-clamp-2">
                          {featuredNews.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-blue-200/90">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(featuredNews.date).toLocaleDateString(
                              "id-ID"
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {featuredNews.author}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Cari berita..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-[#073046]/30 focus:border-[#073046] focus:ring-[#073046]/20"
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
                            variant={
                              selectedCategory === category
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={
                              selectedCategory === category
                                ? "bg-[#073046] hover:bg-[#0a4a66] shadow-md"
                                : "border-[#073046]/30 text-[#073046] hover:bg-[#073046]/10 hover:text-[#073046] hover:border-[#073046]/50"
                            }
                          >
                            {category}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div>
              <motion.h2
                className="text-2xl font-bold text-[#073046] mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Semua Berita
              </motion.h2>

              <AnimatePresence mode="wait">
                {filteredNews.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    key="news-grid"
                  >
                    {filteredNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card
                          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                          onClick={() =>
                            router.push(`/berita-public/detail/${news.id}`)
                          }
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <motion.img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8 }}
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                            <motion.div
                              className="absolute top-3 left-3"
                              whileHover={{ scale: 1.05 }}
                            >
                              {/* <Badge className="bg-[#073046] hover:bg-[#0a4a66] transition-colors">
                                {news.category}
                              </Badge> */}
                            </motion.div>
                            {news.imageCount > 1 && (
                              <motion.div
                                className="absolute top-3 right-3"
                                whileHover={{ scale: 1.05 }}
                              >
                                {/* <Badge className="bg-[#073046] hover:bg-[#0a4a66] transition-colors">
                                  {news.imageCount} Gambar
                                </Badge> */}
                              </motion.div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <CardContent className="p-6">
                            <motion.h3
                              className="font-bold text-lg text-[#073046] mb-2 line-clamp-2 group-hover:text-[#0a4a66] transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              {news.title}
                            </motion.h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                              {news.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(news.date).toLocaleDateString(
                                    "id-ID"
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {news.author}
                                </div>
                              </div>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046] shadow-md hover:shadow-lg transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(
                                    `/berita-public/detail/${news.id}`
                                  );
                                }}
                              >
                                Baca Selengkapnya
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </motion.div>
                          </CardContent>
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
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-12 text-center">
                        <motion.div
                          className="text-slate-400 mb-4"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            y: [0, -5, 0],
                          }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Search className="h-12 w-12 mx-auto" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">
                          Tidak ada berita ditemukan
                        </h3>
                        <p className="text-slate-500">
                          Coba ubah kata kunci pencarian atau kategori
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                          {/* {news.imageCount > 1 && (
                            <Badge className="bg-[#073046] hover:bg-[#0a4a66] transition-colors">
                              {news.imageCount} Gambar
                            </Badge>
                          )} */}
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
                      onClick={() => setSelectedCategory("Semua")}
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
                        onClick={() => setSelectedCategory(kategori.kategori)}
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