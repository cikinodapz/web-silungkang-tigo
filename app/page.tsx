"use client";

import { PublicHeader } from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchData } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { PublicFooter } from "@/components/public-footer";
import { htmlToText } from "html-to-text";

interface PopulationStats {
  totalPenduduk: number;
  totalKepalaKeluarga: number;
  totalLakiLaki: number;
  totalPerempuan: number;
}

interface NewsItem {
  id: string;
  sampul: string | null;
  judul: string;
  berita: string;
  kategoriId: string;
  createdAt: string;
  updatedAt: string;
  kategori: {
    id: string;
    kategori: string;
  };
}

interface APBDesItem {
  id: string;
  pendanaan: string;
  jumlah_dana: number;
  jenis_apbd: string;
  tahun: number;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
}

interface VisitorStats {
  id: string;
  ip_address: string;
  user_agent: string;
  visits: number;
  first_visit: string;
  last_visit: string;
}

const cleanContent = (html: string, maxLength: number) => {
  const text = htmlToText(html, {
    wordwrap: false,
    preserveNewlines: true,
    tags: { p: { after: " " }, br: { after: " " } },
  });
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const getSampulUrl = (sampul: any) => {
  if (!sampul) return "/placeholder.svg?height=200&width=300";
  let first: string | null = null;
  if (Array.isArray(sampul)) first = sampul[0] || null;
  else if (typeof sampul === "string") first = sampul;
  if (!first) return "/placeholder.svg?height=200&width=300";
  const filename = first.split("/").pop();
  return `http://localhost:3000/berita/getSampul/berita/${filename}`;
};

const formatCurrency = (amount: number) => {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Miliar`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} Juta`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)} Ribu`;
  return amount.toString();
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

const jenisBadgeClass = (jenis: string) => {
  switch (jenis) {
    case "Pendapatan":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Belanja":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Pembiayaan":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const jenisProgressClass = (jenis: string) => {
  switch (jenis) {
    case "Pendapatan":
      return "bg-green-500";
    case "Belanja":
      return "bg-blue-500";
    case "Pembiayaan":
      return "bg-purple-500";
    default:
      return "bg-orange-500";
  }
};

// ===== Helper: bangun background conic-gradient untuk donut
function buildConicGradient(slices: { color: string; percentage: number }[]) {
  // Map tailwind color -> hex
  const colorHex = (tw: string) => {
    switch (tw) {
      case "bg-green-500":
        return "#10b981";
      case "bg-blue-500":
        return "#3b82f6";
      case "bg-purple-500":
        return "#8b5cf6";
      case "bg-orange-500":
        return "#f97316";
      default:
        return "#6b7280";
    }
  };

  let start = 0;
  const stops: string[] = [];
  slices.forEach((s) => {
    const end = Math.min(100, Math.max(0, start + (s.percentage || 0)));
    if (s.percentage > 0) {
      stops.push(`${colorHex(s.color)} ${start}% ${end}%`);
      start = end;
    }
  });

  // sisa (jika sum < 100) isi dengan abu-abu
  if (start < 100) {
    stops.push(`#e2e8f0 ${start}% 100%`);
  }

  return `conic-gradient(${stops.join(", ")})`;
}

// ====== Hook: jumlah card berita per slide responsif
function useResponsiveSlides() {
  const [slides, setSlides] = useState(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setSlides(1); // mobile
      else if (w < 1024) setSlides(2); // tablet
      else setSlides(3); // desktop
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return slides;
}

export default function HomePage() {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsPage, setNewsPage] = useState(0);
  const [newsDirection, setNewsDirection] = useState<1 | -1>(1);
  const itemsPerSlide = useResponsiveSlides();

  const [stats, setStats] = useState([
    { label: "Total Penduduk", value: "0", icon: Users, color: "bg-blue-500" },
    { label: "Kepala Keluarga", value: "0", icon: Users, color: "bg-green-500" },
    { label: "Laki-laki", value: "0", icon: Users, color: "bg-purple-500" },
    { label: "Perempuan", value: "0", icon: Users, color: "bg-pink-500" },
  ]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [apbdesData, setApbdesData] = useState<
    { category: string; amount: string; percentage: number; color: string }[]
  >([
    { category: "Pendapatan", amount: "0", percentage: 0, color: "bg-green-500" },
    { category: "Belanja", amount: "0", percentage: 0, color: "bg-blue-500" },
    { category: "Pembiayaan", amount: "0", percentage: 0, color: "bg-purple-500" },
    { category: "Lainnya", amount: "0", percentage: 0, color: "bg-orange-500" },
  ]);
  const [totalApbdes, setTotalApbdes] = useState(0);
  const [apbdesItems, setApbdesItems] = useState<APBDesItem[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const title = "Selamat Datang di Desa Silungkang Tigo";
  const images = ["/landing1.jpg", "/landing2.jpg", "/landing3.jpg"];
  const CATEGORY_ORDER = ["Pendapatan", "Belanja", "Pembiayaan"] as const;

  const totalNewsPages = useMemo(
    () => Math.max(1, Math.ceil(news.length / itemsPerSlide)),
    [news.length, itemsPerSlide]
  );

  // jaga-jaga: ketika itemsPerSlide berubah, clamp halaman agar tidak out-of-range
  useEffect(() => {
    setNewsPage((p) => Math.min(p, totalNewsPages - 1));
  }, [totalNewsPages]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [] as number[];
    for (let year = 2000; year <= currentYear; year++) years.push(year);
    return years.reverse();
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const populationResponse = await fetchData("/public/getPopulationStats");
        const populationData: PopulationStats = populationResponse.data || {};
        setStats([
          { label: "Total Penduduk", value: populationData.totalPenduduk?.toString() || "0", icon: Users, color: "bg-blue-500" },
          { label: "Kepala Keluarga", value: populationData.totalKepalaKeluarga?.toString() || "0", icon: Users, color: "bg-green-500" },
          { label: "Laki-laki", value: populationData.totalLakiLaki?.toString() || "0", icon: Users, color: "bg-purple-500" },
          { label: "Perempuan", value: populationData.totalPerempuan?.toString() || "0", icon: Users, color: "bg-pink-500" },
        ]);

        const newsResponse = await fetchData("/public/getAllBerita");
        setNews(Array.isArray(newsResponse.data) ? newsResponse.data : []);

        const apbdesResponse = await fetchData("/public/getAllAPBDes");
        const apbdesFetched: APBDesItem[] = Array.isArray(apbdesResponse.data) ? apbdesResponse.data : [];
        setApbdesItems(apbdesFetched);

        const visitorResponse = await fetchData("/kelola-kk/track");
        setVisitorStats(visitorResponse.data || null);
      } catch (err: any) {
        console.error("Error loading data:", err);
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const filteredItems = apbdesItems.filter((item) => item.tahun === selectedYear);
    if (filteredItems.length > 0) {
      const totalDana = filteredItems.reduce((sum, item) => sum + item.jumlah_dana, 0);
      setTotalApbdes(totalDana);

      const groupedData = filteredItems.reduce((acc, item) => {
        const jenis = item.jenis_apbd;
        if (!acc[jenis]) acc[jenis] = 0;
        acc[jenis] += item.jumlah_dana;
        return acc;
      }, {} as Record<string, number>);

      const categories = [
        { category: "Pendapatan", jenis: "Pendapatan", color: "bg-green-500" },
        { category: "Belanja", jenis: "Belanja", color: "bg-blue-500" },
        { category: "Pembiayaan", jenis: "Pembiayaan", color: "bg-purple-500" },
      ];

      const updatedApbdesData = categories.map((cat) => {
        const amount = groupedData[cat.jenis] || 0;
        const percentage = totalDana > 0 ? Math.round((amount / totalDana) * 100) : 0;
        return { category: cat.category, amount: formatCurrency(amount), percentage, color: cat.color };
      });

      const mainCategories = categories.map((c) => c.jenis);
      const otherAmount = Object.entries(groupedData)
        .filter(([jenis]) => !mainCategories.includes(jenis))
        .reduce((sum, [, amount]) => sum + amount, 0);

      if (otherAmount > 0) {
        const otherPercentage = totalDana > 0 ? Math.round((otherAmount / totalDana) * 100) : 0;
        updatedApbdesData.push({
          category: "Lainnya",
          amount: formatCurrency(otherAmount),
          percentage: otherPercentage,
          color: "bg-orange-500",
        });
      }

      setApbdesData(updatedApbdesData);
    } else {
      setApbdesData([
        { category: "Tidak ada data", amount: "0", percentage: 100, color: "bg-gray-400" },
      ]);
      setTotalApbdes(0);
    }
  }, [apbdesItems, selectedYear]);

  useEffect(() => {
    if (currentIndex < title.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedTitle((prev) => prev + title[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(typingTimeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedTitle("");
        setCurrentIndex(0);
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, title]);

  useEffect(() => {
    const slideshowTimeout = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearTimeout(slideshowTimeout);
  }, [currentImageIndex, images.length]);

  const handleNextNews = () => {
    if (newsPage < totalNewsPages - 1) {
      setNewsDirection(1);
      setNewsPage((p) => p + 1);
    }
  };
  const handlePrevNews = () => {
    if (newsPage > 0) {
      setNewsDirection(-1);
      setNewsPage((p) => p - 1);
    }
  };

  const startIdx = newsPage * itemsPerSlide;
  const visibleNews = news.slice(startIdx, startIdx + itemsPerSlide);

  const newsVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  } as const;

  const filteredApbdes = apbdesItems
    .filter((it) => it.tahun === selectedYear)
    .sort((a, b) => {
      const safeJenisA = a.jenis_apbd ?? "";
      const safeJenisB = b.jenis_apbd ?? "";

      const rank = (jenis: string) => {
        const i = (CATEGORY_ORDER as readonly string[]).indexOf(jenis);
        return i === -1 ? CATEGORY_ORDER.length : i; // "lainnya" di belakang
      };

      const ra = rank(safeJenisA);
      const rb = rank(safeJenisB);

      if (ra !== rb) return ra - rb; // 1) kelompok kategori dulu

      if (ra === CATEGORY_ORDER.length) { // 2) sama-sama "lainnya" -> nama A–Z
        const byName = safeJenisA.localeCompare(safeJenisB);
        if (byName !== 0) return byName;
      }

      return b.jumlah_dana - a.jumlah_dana; // 3) nominal terbesar dulu
    });

  const donutGradient = buildConicGradient(
    apbdesData.map(({ color, percentage }) => ({ color, percentage }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* HERO */}
      <section className="relative h-screen py-28 md:py-40 px-4 text-white overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: `url(${images[currentImageIndex]})`, opacity: 1 }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="hyperspeed-lines" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-center mx-auto">
              {displayedTitle}
              <span className="typewriter-cursor">|</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 font-medium drop-shadow-md animate-slide-up animation-delay-200">
              Desa Modern dengan Teknologi Digital Terdepan
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {isLoading && <div className="text-center text-gray-600 animate-pulse py-12">Memuat...</div>}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in mx-auto max-w-2xl my-8">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="container mx-auto px-4 py-12">
          {/* DATA PENDUDUK */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#073046] mb-4">Data Penduduk</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Informasi terkini mengenai jumlah penduduk dan demografi Desa Silungkang Tigo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-[#073046]">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* BERITA */}
          <section className="mb-16 px-2 sm:px-4 md:px-0">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#073046] mb-2 sm:mb-3 tracking-tight">
                    Berita Terkini
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg">Informasi dan kegiatan terbaru dari desa</p>
                </div>
                <Link href="/berita-public">
                  <Button
                    variant="outline"
                    className="border-2 border-[#073046] text-[#073046] font-semibold px-4 sm:px-6 py-2 rounded-full hover:bg-[#073046] hover:text-white transition-all duration-300"
                  >
                    Lihat Semua
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
              </div>

              <div className="relative max-w-7xl mx-auto">
                {/* NAV BUTTONS: desktop/tablet (di tengah kiri/kanan) */}
                <Button
                  aria-label="Sebelumnya"
                  variant="outline"
                  size="icon"
                  onClick={handlePrevNews}
                  disabled={newsPage === 0}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-lg border-2 border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-40"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                {/* LIST */}
                <div className="relative overflow-hidden min-h-[380px] sm:min-h-[440px] md:min-h-[500px]">
                  <AnimatePresence custom={newsDirection} initial={false}>
                    <motion.div
                      key={newsPage}
                      custom={newsDirection}
                      variants={newsVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ x: { type: "spring", stiffness: 400, damping: 35 }, opacity: { duration: 0.25 } }}
                      className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4"
                    >
                      {visibleNews.length === 0 ? (
                        <div className="col-span-full flex items-center justify-center text-slate-500">Belum ada berita.</div>
                      ) : (
                        visibleNews.map((article) => (
                          <motion.div
                            key={article.id}
                            whileHover={{ scale: 1.03, y: -4 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          >
                            <Link href={`/berita-public/detail/${article.id}`}>
                              <Card className="border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full overflow-hidden">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                  <img
                                    src={getSampulUrl(article.sampul as any)}
                                    alt={article.judul}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg?height=200&width=300";
                                    }}
                                  />
                                </div>
                                <CardContent className="p-4 sm:p-5">
                                  <h3 className="font-semibold text-lg sm:text-xl text-[#073046] mb-2 sm:mb-3 line-clamp-2 leading-tight">
                                    {article.judul}
                                  </h3>
                                  <p className="text-slate-600 text-sm mb-3 sm:mb-4 line-clamp-3">
                                    {cleanContent(article.berita, 100)}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* NAV BUTTONS: desktop/tablet (kanan) */}
                <Button
                  aria-label="Berikutnya"
                  variant="outline"
                  size="icon"
                  onClick={handleNextNews}
                  disabled={newsPage >= totalNewsPages - 1}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-lg border-2 border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-40"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* NAV BUTTONS: mobile (di bawah list) */}
                <div className="sm:hidden flex items-center justify-center gap-3 mt-4">
                  <Button
                    aria-label="Sebelumnya"
                    variant="outline"
                    size="icon"
                    onClick={handlePrevNews}
                    disabled={newsPage === 0}
                    className="bg-white/90 border-2 border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    aria-label="Berikutnya"
                    variant="outline"
                    size="icon"
                    onClick={handleNextNews}
                    disabled={newsPage >= totalNewsPages - 1}
                    className="bg-white/90 border-2 border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* DOTS / INDICATOR */}
                <div className="mt-3 sm:mt-4 flex justify-center gap-2">
                  {Array.from({ length: totalNewsPages }).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Halaman ${i + 1}`}
                      onClick={() => {
                        if (i === newsPage) return;
                        setNewsDirection(i > newsPage ? 1 : -1);
                        setNewsPage(i);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === newsPage ? "w-6 bg-[#073046]" : "w-2 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* LOKASI */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-2">Lokasi Desa</h2>
              <p className="text-slate-600">Peta wilayah Desa Silungkang Tigo</p>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 h-[500px]">
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-500 mb-4">Memuat peta lokasi Desa Silungkang Tigo...</p>
                  <Button asChild>
                    <Link
                      href="https://maps.app.goo.gl/k2XWCFF4u5PMwZ8k9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#073046] hover:bg-[#0a4a66]"
                    >
                      Buka di Google Maps
                    </Link>
                  </Button>
                </div>
              </div>

              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.563623576321!2d100.781125!3d-0.6833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDEnNTkuOSJTIDEwMMKwNDcnMDEuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid`}
                loading="lazy"
                allowFullScreen
                title="Peta Lokasi Desa Silungkang Tigo"
              />
              {/* <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md border border-slate-200">
                <h3 className="font-bold text-2xl text-[#073046] mb-2">Desa Silungkang Tigo</h3>
                <p className="text-md text-slate-600 mb-3">Kecamatan Silungkang, Kabupaten Sawahlunto, Sumatera Barat</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span>Koordinat: -0.6833°, 100.7833°</span>
                </div>
                <div className="mt-4">
                  <Button asChild size="sm" className="bg-[#073046] hover:bg-[#0a4a66]">
                    <Link href="https://maps.app.goo.gl/k2XWCFF4u5PMwZ8k9" target="_blank" rel="noopener noreferrer">
                      Dapatkan Petunjuk Arah
                    </Link>
                  </Button>
                </div>
              </div> */}
            </div>
          </section>

          {/* APBDES */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-2">APBDes {selectedYear}</h2>
              <p className="text-slate-600">Anggaran Pendapatan dan Belanja Desa</p>
              <div className="mt-4">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border border-slate-300 rounded-md p-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#073046]"
                >
                  {generateYearOptions().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ringkasan & Progress per kategori */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    APBDes {selectedYear}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {apbdesData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">{item.category}</span>
                          <span className="text-sm font-bold text-[#073046]">Rp {item.amount}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                            style={{ width: `${Math.min(100, Math.max(0, item.percentage))}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-500 text-right">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Total Anggaran:</span>
                      <span className="font-bold text-lg text-[#073046]">Rp {formatCurrency(totalApbdes)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donut (conic-gradient, anti "kosong") */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Visualisasi APBDes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center">
                    {totalApbdes > 0 ? (
                      <>
                        <div
                          className="relative w-56 h-56 rounded-full shadow-inner donut-mask"
                          style={{ background: donutGradient }}
                          aria-label="Donut chart komposisi APBDes"
                          role="img"
                        >
                          {/* pusat nilai */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xs text-slate-500">Total Anggaran</div>
                              <div className="font-bold text-[#073046] text-base">Rp {formatCurrency(totalApbdes)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                          {apbdesData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className={`inline-block w-3 h-3 rounded-full ${item.color}`} />
                              <span className="text-sm text-slate-700">
                                {item.category} • {item.percentage}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-slate-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada data APBDes untuk tahun {selectedYear}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ===== RINCIAN PER ITEM ===== */}
            <div className="mt-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span>Rincian APBDes per Item</span>
                    <span className="text-sm opacity-90">
                      Tahun {selectedYear} • {filteredApbdes.length} item
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredApbdes.length === 0 ? (
                    <div className="p-6 text-slate-600">Belum ada rincian APBDes untuk tahun {selectedYear}.</div>
                  ) : (
                    <ul className="divide-y divide-slate-200">
                      {filteredApbdes.map((item) => {
                        const share = totalApbdes > 0 ? Math.round((item.jumlah_dana / totalApbdes) * 100) : 0;
                        return (
                          <li key={item.id} className="p-4 md:p-5 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-semibold text-[#073046] text-base md:text-lg truncate">{item.pendanaan || "-"}</p>
                                  <Badge variant="outline" className={`border ${jenisBadgeClass(item.jenis_apbd)}`}>
                                    {item.jenis_apbd || "Lainnya"}
                                  </Badge>
                                </div>
                                {item.keterangan ? (
                                  <p className="text-xs md:text-sm text-slate-600 mt-1 line-clamp-2">{item.keterangan}</p>
                                ) : null}
                                <div className="mt-2">
                                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${jenisProgressClass(item.jenis_apbd)}`}
                                      style={{ width: `${share}%` }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                                    <span>{share}%</span>
                                    <span className="font-medium"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-bold text-[#073046]">Rp {formatCurrency(item.jumlah_dana)}</p>
                                {/* <p className="text-[11px] text-slate-500">Update: {formatDate(item.updatedAt)}</p> */}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )}
      <PublicFooter />

      <style jsx global>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { opacity: 0; animation: slideUp 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .typewriter-cursor { display: inline-block; margin-left: 2px; animation: blink 1s step-end infinite; }
        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }

        .hyperspeed-lines {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.03) 45%, rgba(59,130,246,0.08) 50%, rgba(59,130,246,0.03) 55%, transparent 100%);
          background-size: 200px 100%;
          animation: hyperspeed 3s linear infinite;
        }
        .hyperspeed-lines::before {
          content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(255,255,255,0.02) 100px, rgba(255,255,255,0.02) 102px);
          animation: hyperspeed-lines 2s linear infinite;
        }
        @keyframes hyperspeed { 0% { transform: translateX(-200px); } 100% { transform: translateX(100vw); } }
        @keyframes hyperspeed-lines { 0% { transform: translateX(-100px); } 100% { transform: translateX(100vw); } }

        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

        /* Donut hole (mask) — dukung chromium dan webkit */
        .donut-mask {
          -webkit-mask: radial-gradient(circle at center, transparent 56%, black 57%);
                  mask: radial-gradient(circle at center, transparent 56%, black 57%);
        }
      `}</style>
    </div>
  );
}
