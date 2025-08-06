"use client"

import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Calendar, TrendingUp, DollarSign, Phone, Mail, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchData } from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"

interface PopulationStats {
  totalPenduduk: number
  totalKepalaKeluarga: number
  totalLakiLaki: number
  totalPerempuan: number
}

interface NewsItem {
  id: string
  sampul: string | null
  judul: string
  berita: string
  kategoriId: string
  createdAt: string
  updatedAt: string
  kategori: {
    id: string
    kategori: string
  }
}

interface APBDesItem {
  id: string
  pendanaan: string
  jumlah_dana: number
  jenis_apbd: string
  tahun: number
  keterangan: string
  createdAt: string
  updatedAt: string
}

const getSampulUrl = (sampul: string | null) => {
  if (!sampul) return "/placeholder.svg?height=200&width=300"
  const filename = sampul.split("/").pop()
  return `http://localhost:3000/berita/getSampul/berita/${filename}`
}

export default function HomePage() {
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [stats, setStats] = useState([
    { label: "Total Penduduk", value: "0", icon: Users, color: "bg-blue-500" },
    { label: "Kepala Keluarga", value: "0", icon: Users, color: "bg-green-500" },
    { label: "Laki-laki", value: "0", icon: Users, color: "bg-purple-500" },
    { label: "Perempuan", value: "0", icon: Users, color: "bg-pink-500" },
  ])
  const [news, setNews] = useState<NewsItem[]>([])
  const [apbdesData, setApbdesData] = useState([
    { category: "Pendapatan", amount: "0", percentage: 0,color: "bg-green-500" },
    { category: "Belanja Operasional", amount: "0", percentage: 0, color: "bg-blue-500" },
    { category: "Belanja Modal", amount: "0", percentage: 0, color: "bg-purple-500" },
    { category: "Sisa Anggaran", amount: "0", percentage: 0, color: "bg-orange-500" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const title = "Selamat Datang di Desa Silungkang Tigo"
  const images = ["/desa-silungkang-2.jpg", "/desa-silungkang-3.jpg"]
  const itemsPerSlide = 3

  // Coordinates for Desa Silungkang Tigo
  const mapCenter = { lat: -0.6833, lng: 100.7833 }
  const mapZoom = 14

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const populationResponse = await fetchData("/public/getPopulationStats")
        const populationData: PopulationStats = populationResponse.data || {}
        setStats([
          { label: "Total Penduduk", value: populationData.totalPenduduk.toString(), icon: Users, color: "bg-blue-500" },
          { label: "Kepala Keluarga", value: populationData.totalKepalaKeluarga.toString(), icon: Users, color: "bg-green-500" },
          { label: "Laki-laki", value: populationData.totalLakiLaki.toString(), icon: Users, color: "bg-purple-500" },
          { label: "Perempuan", value: populationData.totalPerempuan.toString(), icon: Users, color: "bg-pink-500" },
        ])

        const newsResponse = await fetchData("/public/getAllBerita")
        setNews(Array.isArray(newsResponse.data) ? newsResponse.data : [])

        const apbdesResponse = await fetchData("/public/getAllAPBDes")
        const apbdesItems: APBDesItem[] = Array.isArray(apbdesResponse.data) ? apbdesResponse.data : []
        const totalDana = apbdesItems.reduce((sum, item) => sum + item.jumlah_dana, 0)
        const categories = [
          { category: "Pendapatan", jenis: "Pendapatan" },
          { category: "Belanja Operasional", jenis: "Belanja Operasional" },
          { category: "Belanja Modal", jenis: "Belanja Modal" },
          { category: "Sisa Anggaran", jenis: "Sisa Anggaran" },
        ]
        const updatedApbdesData = categories.map((cat, index) => {
          const items = apbdesItems.filter(item => item.jenis_apbd === cat.jenis)
          const amount = items.reduce((sum, item) => sum + item.jumlah_dana, 0)
          const percentage = totalDana > 0 ? (amount / totalDana) * 100 : 0
          return {
            category: cat.category,
            amount: `${(amount / 1000000).toFixed(1)} Juta`,
            percentage: Math.round(percentage),
            color: ["bg-green-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"][index],
          }
        })
        setApbdesData(updatedApbdesData)
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Typewriter effect with repeating animation
  useEffect(() => {
    if (currentIndex < title.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedTitle(prev => prev + title[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      
      return () => clearTimeout(typingTimeout)
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedTitle("")
        setCurrentIndex(0)
      }, 2000)
      
      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, title])

  // Slideshow effect for background images
  useEffect(() => {
    const slideshowTimeout = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearTimeout(slideshowTimeout)
  }, [currentImageIndex, images.length])

  // Carousel navigation with animation
  const handleNextNews = () => {
    if (currentNewsIndex < news.length - itemsPerSlide) {
      setCurrentNewsIndex(prev => prev + 1)
    }
  }

  const handlePrevNews = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex(prev => prev - 1)
    }
  }

  const visibleNews = news.slice(currentNewsIndex, currentNewsIndex + itemsPerSlide)

  // Animation variants for news carousel
  const newsVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative h-screen py-28 md:py-40 px-4 text-white overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: `url(${images[currentImageIndex]})`, opacity: 1 }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hyperspeed Effect */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              <Link href="/profile">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#073046]/80 to-[#0a4a66]/80 backdrop-blur-md text-white hover:bg-gradient-to-r hover:from-[#0a4a66] hover:to-[#073046] transform hover:scale-105 transition-all duration-300 shadow-lg border border-white/20 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  Profil Desa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/lapak-public">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg border border-white/30 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  Lapak Desa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Loading and Error States */}
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
          {/* Statistics Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#073046] mb-4">Data Penduduk</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Informasi terkini mengenai jumlah penduduk dan demografi Desa Silungkang Tigo
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

          {/* News Section with Animated Carousel */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#073046] mb-2">Berita Terkini</h2>
                <p className="text-slate-600">Informasi dan kegiatan terbaru dari desa</p>
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
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {visibleNews.map((article) => (
                      <motion.div
                        key={article.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={getSampulUrl(article.sampul)}
                              alt={article.judul}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                            <Badge className="absolute top-3 left-3 bg-[#073046]">{article.kategori.kategori}</Badge>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg text-[#073046] mb-2 line-clamp-2">{article.judul}</h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.berita}</p>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.createdAt).toLocaleDateString("id-ID")}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
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

          {/* Enhanced Map Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-2">Lokasi Desa</h2>
              <p className="text-slate-600">Peta wilayah Desa Silungkang Tigo</p>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 h-[500px]"> {/* Increased height */}
              {/* Map Container with fallback */}
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
              
              {/* Embedded Google Maps Iframe - now larger */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.563623576321!2d100.781125!3d-0.6833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDAnNTkuOSJTIDEwMMKwNDcnMDEuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid`}
                loading="lazy"
                allowFullScreen
                title="Peta Lokasi Desa Silungkang Tigo"
              ></iframe>
              
              {/* Enhanced Map Overlay with Info */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md border border-slate-200">
                <h3 className="font-bold text-2xl text-[#073046] mb-2">Desa Silungkang Tigo</h3>
                <p className="text-md text-slate-600 mb-3">
                  Kecamatan Silungkang, Kabupaten Sawahlunto, Sumatera Barat
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span>Koordinat: -0.6833°, 100.7833°</span>
                </div>
                <div className="mt-4">
                  <Button asChild size="sm" className="bg-[#073046] hover:bg-[#0a4a66]">
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

          {/* APBDes Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-2">APBDes 2024</h2>
              <p className="text-slate-600">Anggaran Pendapatan dan Belanja Desa</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* APBDes Cards */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    APBDes 2024
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {apbdesData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">{item.category}</span>
                          <span className="text-sm font-bold text-[#073046]">{item.amount}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* APBDes Visualization */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Visualisasi APBDes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-full">
                  <div className="h-64 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      {apbdesData.map((item, index) => {
                        const startAngle = apbdesData.slice(0, index).reduce((sum, i) => sum + i.percentage, 0) * 3.6
                        const endAngle = startAngle + item.percentage * 3.6
                        return (
                          <div
                            key={index}
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(from ${startAngle}deg, ${item.color} 0deg, ${item.color} ${endAngle}deg, transparent ${endAngle}deg, transparent 360deg)`,
                            }}
                          ></div>
                        )
                      })}
                      <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-inner">
                        <div className="text-center">
                          <div className="text-xs text-slate-500">Total Anggaran</div>
                          <div className="font-bold text-[#073046]">
                            {apbdesData.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(1)} Juta
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {apbdesData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                        <span className="text-xs text-slate-600">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-6">
              <Link href="/apbdes">
                <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66]">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Lihat Detail APBDes
                </Button>
              </Link>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
                <p className="mb-6 text-blue-100">Untuk informasi lebih lanjut atau layanan administrasi</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#073046] bg-transparent"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    (0754) 123-456
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#073046] bg-transparent"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    admin@silungkangtigo.desa.id
                  </Button>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-100">
                  <Clock className="h-4 w-4" />
                  Jam Pelayanan: Senin - Jumat, 08:00 - 16:00 WIB
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      )}

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
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
        
        /* Hyperspeed Effect */
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
          content: '';
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
      `}</style>
    </div>
  )
}