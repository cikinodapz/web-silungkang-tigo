"use client"

import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Calendar, TrendingUp, DollarSign, Phone, Mail, Clock, ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const title = "Selamat Datang di Desa Silungkang Tigo"
  const images = ["/desa-silungkang-2.jpg", "/desa-silungkang-3.jpg"]

  const stats = [
    { label: "Total Penduduk", value: "2,847", icon: Users, color: "bg-blue-500" },
    { label: "Kepala Keluarga", value: "892", icon: Users, color: "bg-green-500" },
    { label: "Laki-laki", value: "1,456", icon: Users, color: "bg-purple-500" },
    { label: "Perempuan", value: "1,391", icon: Users, color: "bg-pink-500" },
  ]

  const news = [
    {
      id: 1,
      title: "Pembangunan Jalan Desa Tahap II Dimulai",
      excerpt: "Proyek pembangunan infrastruktur jalan desa senilai 2.5 miliar rupiah telah dimulai...",
      date: "2024-01-15",
      category: "Pembangunan",
      views: 245,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Festival Budaya Desa Silungkang Tigo 2024",
      excerpt: "Acara tahunan yang menampilkan kesenian tradisional dan kuliner khas daerah...",
      date: "2024-01-12",
      category: "Budaya",
      views: 189,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Program Bantuan UMKM untuk Warga Desa",
      excerpt: "Pemerintah desa meluncurkan program bantuan modal usaha untuk UMKM lokal...",
      date: "2024-01-10",
      category: "Ekonomi",
      views: 156,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const apbdesData = [
    { category: "Pendapatan", amount: "1.2 Miliar", percentage: 100, color: "bg-green-500" },
    { category: "Belanja Operasional", amount: "450 Juta", percentage: 37.5, color: "bg-blue-500" },
    { category: "Belanja Modal", amount: "600 Juta", percentage: 50, color: "bg-purple-500" },
    { category: "Sisa Anggaran", amount: "150 Juta", percentage: 12.5, color: "bg-orange-500" },
  ]

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

      {/* Rest of your content remains the same */}
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

        {/* News Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <Card
                key={article.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-[#073046]">{article.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[#073046] mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString("id-ID")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location & APBDes Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Location */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#073046] mb-2">Alamat Lengkap</h4>
                  <p className="text-slate-600">
                    Desa Silungkang Tigo, Kecamatan Silungkang
                    <br />
                    Kabupaten Sawahlunto, Sumatera Barat
                    <br />
                    Kode Pos: 27454
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#073046] mb-2">Koordinat</h4>
                  <p className="text-slate-600">
                    Latitude: -0.6833°
                    <br />
                    Longitude: 100.7833°
                  </p>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66]">
                    <MapPin className="mr-2 h-4 w-4" />
                    Lihat di Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* APBDes */}
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
                <div className="pt-4">
                  <Link href="/apbdes">
                    <Button className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66]">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Detail APBDes
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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