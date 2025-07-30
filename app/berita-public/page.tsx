"use client"

import { useState } from "react"
import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Eye, User, ArrowRight, Filter, TrendingUp } from "lucide-react"

export default function BeritaPublicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  const categories = ["Semua", "Pembangunan", "Budaya", "Ekonomi", "Kesehatan", "Pendidikan", "Sosial"]

  const featuredNews = {
    id: 1,
    title: "Pembangunan Jalan Desa Tahap II Dimulai dengan Anggaran 2.5 Miliar",
    excerpt:
      "Proyek pembangunan infrastruktur jalan desa senilai 2.5 miliar rupiah telah dimulai pada hari Senin kemarin. Proyek ini diharapkan dapat meningkatkan akses transportasi dan perekonomian masyarakat desa.",
    content:
      "Pembangunan jalan desa tahap II telah resmi dimulai dengan upacara peletakan batu pertama yang dipimpin langsung oleh Kepala Desa Silungkang Tigo, Budi Santoso. Proyek yang menghabiskan anggaran sebesar 2.5 miliar rupiah ini akan menghubungkan 3 dusun utama dengan jalan beraspal sepanjang 5 kilometer...",
    date: "2024-01-15",
    author: "Admin Desa",
    category: "Pembangunan",
    views: 1245,
    image: "/placeholder.svg?height=400&width=800",
  }

  const allNews = [
    {
      id: 2,
      title: "Festival Budaya Desa Silungkang Tigo 2024 Sukses Digelar",
      excerpt:
        "Acara tahunan yang menampilkan kesenian tradisional dan kuliner khas daerah berhasil menarik ribuan pengunjung dari berbagai daerah.",
      date: "2024-01-12",
      author: "Tim Humas",
      category: "Budaya",
      views: 892,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Program Bantuan UMKM untuk Warga Desa Diluncurkan",
      excerpt:
        "Pemerintah desa meluncurkan program bantuan modal usaha untuk UMKM lokal dengan total dana 500 juta rupiah.",
      date: "2024-01-10",
      author: "Kaur Ekonomi",
      category: "Ekonomi",
      views: 756,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Posyandu Balita Raih Penghargaan Terbaik Tingkat Kabupaten",
      excerpt:
        "Posyandu Melati Desa Silungkang Tigo meraih penghargaan posyandu terbaik tingkat kabupaten berkat pelayanan prima.",
      date: "2024-01-08",
      author: "PKK Desa",
      category: "Kesehatan",
      views: 634,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Perpustakaan Desa Digital Resmi Beroperasi",
      excerpt:
        "Perpustakaan desa dengan koleksi digital dan akses internet gratis kini telah beroperasi untuk meningkatkan literasi masyarakat.",
      date: "2024-01-05",
      author: "Kaur Pendidikan",
      category: "Pendidikan",
      views: 523,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Gotong Royong Pembersihan Sungai Libatkan Seluruh RT",
      excerpt:
        "Kegiatan gotong royong pembersihan sungai melibatkan seluruh RT dengan partisipasi lebih dari 200 warga.",
      date: "2024-01-03",
      author: "LPM Desa",
      category: "Sosial",
      views: 445,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Pelatihan Komputer Gratis untuk Pemuda Desa",
      excerpt:
        "Karang Taruna mengadakan pelatihan komputer dan internet gratis untuk pemuda desa guna meningkatkan skill digital.",
      date: "2024-01-01",
      author: "Karang Taruna",
      category: "Pendidikan",
      views: 387,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Panen Raya Padi Organik Hasil Kerjasama dengan Universitas",
      excerpt:
        "Panen raya padi organik hasil program kerjasama dengan universitas menghasilkan 15 ton beras berkualitas tinggi.",
      date: "2023-12-28",
      author: "Kelompok Tani",
      category: "Ekonomi",
      views: 612,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const popularNews = [
    { id: 1, title: "Pembangunan Jalan Desa Tahap II Dimulai", views: 1245 },
    { id: 2, title: "Festival Budaya Desa 2024 Sukses Digelar", views: 892 },
    { id: 3, title: "Program Bantuan UMKM Diluncurkan", views: 756 },
    { id: 4, title: "Posyandu Raih Penghargaan Terbaik", views: 634 },
    { id: 8, title: "Panen Raya Padi Organik", views: 612 },
  ]

  const archives = [
    { month: "Januari 2024", count: 8 },
    { month: "Desember 2023", count: 12 },
    { month: "November 2023", count: 15 },
    { month: "Oktober 2023", count: 10 },
    { month: "September 2023", count: 14 },
  ]

  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Desa</h1>
            <p className="text-xl text-blue-100">Informasi terkini dan kegiatan terbaru dari Desa Silungkang Tigo</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured News */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-[#073046]">{featuredNews.category}</Badge>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{featuredNews.title}</h2>
                  <p className="text-blue-100 mb-4 line-clamp-2">{featuredNews.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-blue-200">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredNews.date).toLocaleDateString("id-ID")}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredNews.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredNews.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Search and Filter */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Cari berita..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-[#073046] hover:bg-[#0a4a66]"
                            : "border-[#073046] text-[#073046] hover:bg-[#073046] hover:text-white"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All News */}
            <div>
              <h2 className="text-2xl font-bold text-[#073046] mb-6">Semua Berita</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((news) => (
                  <Card
                    key={news.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-[#073046]">{news.category}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-[#073046] mb-2 line-clamp-2 hover:text-[#0a4a66] cursor-pointer">
                        {news.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(news.date).toLocaleDateString("id-ID")}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {news.author}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {news.views}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046]">
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="text-slate-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada berita ditemukan</h3>
                    <p className="text-slate-500">Coba ubah kata kunci pencarian atau kategori</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular News */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Berita Terpopuler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {popularNews.map((news, index) => (
                    <div
                      key={news.id}
                      className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[#073046] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-[#073046] line-clamp-2 mb-1">{news.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Eye className="h-3 w-3" />
                          {news.views.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Kategori
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {categories.slice(1).map((category) => {
                    const count = allNews.filter((news) => news.category === category).length
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          selectedCategory === category
                            ? "bg-[#073046] text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <span className="font-medium">{category}</span>
                        <Badge variant={selectedCategory === category ? "secondary" : "outline"}>{count}</Badge>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Archives */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Arsip
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {archives.map((archive, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-slate-100 transition-colors"
                    >
                      <span className="font-medium text-slate-700">{archive.month}</span>
                      <Badge variant="outline">{archive.count}</Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
