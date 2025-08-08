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
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

const getSampulUrl = (sampul: string[]) => {
  if (!sampul || sampul.length === 0)
    return "/placeholder.svg?height=200&width=300";
  const filename = sampul[0].split("/").pop();
  return `http://localhost:3000/berita/getSampul/berita/${filename}`;
};

const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Miliar`;
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} Juta`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)} Ribu`;
  }
  return amount.toString();
};

export default function HomePage() {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [stats, setStats] = useState([
    { label: "Total Penduduk", value: "0", icon: Users, color: "bg-blue-500" },
    {
      label: "Kepala Keluarga",
      value: "0",
      icon: Users,
      color: "bg-green-500",
    },
    { label: "Laki-laki", value: "0", icon: Users, color: "bg-purple-500" },
    { label: "Perempuan", value: "0", icon: Users, color: "bg-pink-500" },
  ]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [apbdesData, setApbdesData] = useState([
    {
      category: "Pendapatan",
      amount: "0",
      percentage: 0,
      color: "bg-green-500",
    },
    { category: "Belanja", amount: "0", percentage: 0, color: "bg-blue-500" },
    {
      category: "Pembiayaan",
      amount: "0",
      percentage: 0,
      color: "bg-purple-500",
    },
    { category: "Lainnya", amount: "0", percentage: 0, color: "bg-orange-500" },
  ]);
  const [totalApbdes, setTotalApbdes] = useState(0);
  const [apbdesItems, setApbdesItems] = useState<APBDesItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const title = "Selamat Datang di Desa Silungkang Tigo";
  const images = ["/desa-silungkang-2.jpg", "/desa-silungkang-3.jpg"];
  const itemsPerSlide = 3;

  const mapCenter = { lat: -0.6833, lng: 100.7833 };
  const mapZoom = 14;

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++) {
      years.push(year);
    }
    return years.reverse();
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const populationResponse = await fetchData(
          "/public/getPopulationStats"
        );
        const populationData: PopulationStats = populationResponse.data || {};
        setStats([
          {
            label: "Total Penduduk",
            value: populationData.totalPenduduk?.toString() || "0",
            icon: Users,
            color: "bg-blue-500",
          },
          {
            label: "Kepala Keluarga",
            value: populationData.totalKepalaKeluarga?.toString() || "0",
            icon: Users,
            color: "bg-green-500",
          },
          {
            label: "Laki-laki",
            value: populationData.totalLakiLaki?.toString() || "0",
            icon: Users,
            color: "bg-purple-500",
          },
          {
            label: "Perempuan",
            value: populationData.totalPerempuan?.toString() || "0",
            icon: Users,
            color: "bg-pink-500",
          },
        ]);

        const newsResponse = await fetchData("/public/getAllBerita");
        setNews(Array.isArray(newsResponse.data) ? newsResponse.data : []);

        const apbdesResponse = await fetchData("/public/getAllAPBDes");
        const apbdesItems: APBDesItem[] = Array.isArray(apbdesResponse.data)
          ? apbdesResponse.data
          : [];
        setApbdesItems(apbdesItems);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const filteredItems = apbdesItems.filter(
      (item) => item.tahun === selectedYear
    );

    if (filteredItems.length > 0) {
      const totalDana = filteredItems.reduce(
        (sum, item) => sum + item.jumlah_dana,
        0
      );
      setTotalApbdes(totalDana);

      const groupedData = filteredItems.reduce((acc, item) => {
        const jenis = item.jenis_apbd;
        if (!acc[jenis]) {
          acc[jenis] = 0;
        }
        acc[jenis] += item.jumlah_dana;
        return acc;
      }, {} as Record<string, number>);

      const categories = [
        {
          category: "Pendapatan",
          jenis: "Pendapatan",
          color: "bg-green-500",
        },
        { category: "Belanja", jenis: "Belanja", color: "bg-blue-500" },
        {
          category: "Pembiayaan",
          jenis: "Pembiayaan",
          color: "bg-purple-500",
        },
      ];

      const updatedApbdesData = categories.map((cat) => {
        const amount = groupedData[cat.jenis] || 0;
        const percentage =
          totalDana > 0 ? Math.round((amount / totalDana) * 100) : 0;
        return {
          category: cat.category,
          amount: formatCurrency(amount),
          percentage: percentage,
          color: cat.color,
        };
      });

      const mainCategories = categories.map((cat) => cat.jenis);
      const otherAmount = Object.entries(groupedData)
        .filter(([jenis]) => !mainCategories.includes(jenis))
        .reduce((sum, [, amount]) => sum + amount, 0);

      if (otherAmount > 0) {
        const otherPercentage =
          totalDana > 0 ? Math.round((otherAmount / totalDana) * 100) : 0;
        updatedApbdesData.push({
          category: "Lainnya",
          amount: formatCurrency(otherAmount),
          percentage: otherPercentage,
          color: "bg-orange-500",
        });
      }

      setApbdesData(updatedApbdesData.filter((item) => item.percentage > 0));
    } else {
      setApbdesData([
        {
          category: "Tidak ada data",
          amount: "0",
          percentage: 100,
          color: "bg-gray-400",
        },
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
    if (currentNewsIndex < news.length - itemsPerSlide) {
      setCurrentNewsIndex((prev) => prev + 1);
    }
  };

  const handlePrevNews = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex((prev) => prev - 1);
    }
  };

  const visibleNews = news.slice(
    currentNewsIndex,
    currentNewsIndex + itemsPerSlide
  );

  const newsVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      <section className="relative h-screen py-28 md:py-40 px-4 text-white overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            opacity: 1,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="hyperspeed-lines"></div>
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
        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {isLoading && (
        <div className="text-center text-gray-600 animate-pulse py-12">
          Memuat...
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in mx-auto max-w-2xl my-8">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#073046] mb-4">
                Data Penduduk
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Informasi terkini mengenai jumlah penduduk dan demografi Desa
                Silungkang Tigo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-bold text-[#073046]">
                          {stat.value}
                        </p>
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

          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#073046] mb-2">
                  Berita Terkini
                </h2>
                <p className="text-slate-600">
                  Informasi dan kegiatan terbaru dari desa
                </p>
              </div>
              <Link href="/berita-public">
                <Button
                  variant="outline"
                  className="border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white bg-transparent"
                >
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevNews}
                disabled={currentNewsIndex === 0}
                className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white/80 disabled:hover:text-[#073046]"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="relative overflow-hidden h-[400px]">
                <AnimatePresence custom={currentNewsIndex} initial={false}>
                  <motion.div
                    key={currentNewsIndex}
                    custom={currentNewsIndex}
                    variants={newsVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {visibleNews.map((article) => (
                      <motion.div
                        key={article.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Link href={`/berita-public/detail/${article.id}`}>
                          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                            <div className="aspect-video relative overflow-hidden">
                              <img
                                src={getSampulUrl(article.sampul)}
                                alt={article.judul}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder.svg?height=200&width=300";
                                }}
                              />
                              {/* {article.sampul.length > 1 && (
                                <Badge className="absolute top-2 right-2 bg-[#073046]">
                                  {article.sampul.length} Gambar
                                </Badge>
                              )} */}
                            </div>
                            <CardContent className="p-6">
                              <h3 className="font-bold text-lg text-[#073046] mb-2 line-clamp-2">
                                {article.judul}
                              </h3>
                              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                {cleanContent(article.berita, 100)}
                              </p>
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(
                                    article.createdAt
                                  ).toLocaleDateString("id-ID")}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNextNews}
                disabled={currentNewsIndex >= news.length - itemsPerSlide}
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white/80 disabled:hover:text-[#073046]"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-2">
                Lokasi Desa
              </h2>
              <p className="text-slate-600">
                Peta wilayah Desa Silungkang Tigo
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 h-[500px]">
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-500 mb-4">
                    Memuat peta lokasi Desa Silungkang Tigo...
                  </p>
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
              ></iframe>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md border border-slate-200">
                <h3 className="font-bold text-2xl text-[#073046] mb-2">
                  Desa Silungkang Tigo
                </h3>
                <p className="text-md text-slate-600 mb-3">
                  Kecamatan Silungkang, Kabupaten Sawahlunto, Sumatera Barat
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span>Koordinat: -0.6833°, 100.7833°</span>
                </div>
                <div className="mt-4">
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#073046] hover:bg-[#0a4a66]"
                  >
                    <Link
                      href="https://maps.app.goo.gl/k2XWCFF4u5PMwZ8k9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dapatkan Petunjuk Arah
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-2">
                APBDes {selectedYear}
              </h2>
              <p className="text-slate-600">
                Anggaran Pendapatan dan Belanja Desa
              </p>
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
                          <span className="text-sm font-medium text-slate-700">
                            {item.category}
                          </span>
                          <span className="text-sm font-bold text-[#073046]">
                            Rp {item.amount}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">
                          {item.percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">
                        Total Anggaran:
                      </span>
                      <span className="font-bold text-lg text-[#073046]">
                        Rp {formatCurrency(totalApbdes)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Visualisasi APBDes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-full">
                  <div className="h-64 flex items-center justify-center">
                    {totalApbdes > 0 ? (
                      <div className="relative w-48 h-48">
                        <div className="relative w-full h-full">
                          <svg
                            viewBox="0 0 42 42"
                            className="w-full h-full transform -rotate-90"
                          >
                            <circle
                              cx="21"
                              cy="21"
                              r="15.91549430918953"
                              fill="transparent"
                              stroke="#e2e8f0"
                              strokeWidth="3"
                            />
                            {apbdesData.map((item, index) => {
                              const circumference =
                                2 * Math.PI * 15.91549430918953;
                              const strokeDasharray = `${
                                (item.percentage / 100) * circumference
                              } ${circumference}`;
                              const previousPercentage = apbdesData
                                .slice(0, index)
                                .reduce(
                                  (sum, prevItem) => sum + prevItem.percentage,
                                  0
                                );
                              const strokeDashoffset = -(
                                (previousPercentage / 100) *
                                circumference
                              );

                              return (
                                <circle
                                  key={index}
                                  cx="21"
                                  cy="21"
                                  r="15.91549430918953"
                                  fill="transparent"
                                  stroke={
                                    item.color === "bg-green-500"
                                      ? "#10b981"
                                      : item.color === "bg-blue-500"
                                      ? "#3b82f6"
                                      : item.color === "bg-purple-500"
                                      ? "#8b5cf6"
                                      : item.color === "bg-orange-500"
                                      ? "#f97316"
                                      : "#6b7280"
                                  }
                                  strokeWidth="3"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-500"
                                />
                              );
                            })}
                          </svg>
                        </div>
                        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-inner">
                          <div className="text-center">
                            <div className="text-xs text-slate-500">
                              Total Anggaran
                            </div>
                            <div className="font-bold text-[#073046] text-sm">
                              Rp {formatCurrency(totalApbdes)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-slate-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Belum ada data APBDes untuk tahun {selectedYear}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {apbdesData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${item.color} mr-2`}
                        ></div>
                        <span className="text-xs text-slate-600">
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )}
      <PublicFooter />

      <style jsx global>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .typewriter-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .hyperspeed-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(59, 130, 246, 0.03) 45%,
            rgba(59, 130, 246, 0.08) 50%,
            rgba(59, 130, 246, 0.03) 55%,
            transparent 100%
          );
          background-size: 200px 100%;
          animation: hyperspeed 3s linear infinite;
        }

        .hyperspeed-lines::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 98px,
            rgba(255, 255, 255, 0.02) 100px,
            rgba(255, 255, 255, 0.02) 102px
          );
          animation: hyperspeed-lines 2s linear infinite;
        }

        @keyframes hyperspeed {
          0% {
            transform: translateX(-200px);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes hyperspeed-lines {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}