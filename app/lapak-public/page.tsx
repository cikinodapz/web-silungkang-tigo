"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Globe,
  User,
  Store,
  ShoppingBag,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function LapakPublicPage() {
  const lapakData = [
    {
      id: 1,
      nama: "Kopi Arabika Silungkang",
      pemilik: "Kelompok Tani Kopi Sejahtera",
      kategori: "Minuman",
      deskripsi:
        "Kopi arabika premium dari kebun desa dengan cita rasa yang khas. Diproses secara tradisional dan berkualitas tinggi. Tersedia dalam bentuk biji dan bubuk.",
      harga: "Rp 85.000/kg",
      rating: 4.8,
      terjual: 125,
      lokasi: "Dusun Kopi Manis",
      whatsapp: "6281234567890",
      website: "www.kopisilungkang.com",
      gambar: "/placeholder.svg?height=300&width=300&text=Kopi+Arabika",
      produk: ["Kopi Biji", "Kopi Bubuk", "Kopi Sachet"],
      jam: "08:00 - 17:00 WIB",
      pengiriman: ["COD", "JNE", "J&T"],
    },
    {
      id: 2,
      nama: "Kerajinan Bambu Kreatif",
      pemilik: "UKM Bambu Kreatif",
      kategori: "Kerajinan",
      deskripsi:
        "Berbagai produk kerajinan bambu berkualitas tinggi seperti furniture, hiasan dinding, dan souvenir. Dibuat dengan teknik tradisional yang dipadukan dengan desain modern.",
      harga: "Rp 50.000 - 500.000",
      rating: 4.6,
      terjual: 89,
      lokasi: "Dusun Bambu Indah",
      whatsapp: "6281345678901",
      website: "-",
      gambar: "/placeholder.svg?height=300&width=300&text=Kerajinan+Bambu",
      produk: ["Furniture", "Hiasan Dinding", "Souvenir", "Tas Bambu"],
      jam: "09:00 - 16:00 WIB",
      pengiriman: ["COD", "Cargo"],
    },
    {
      id: 3,
      nama: "Madu Hutan Asli",
      pemilik: "Kelompok Peternak Lebah",
      kategori: "Makanan",
      deskripsi:
        "Madu murni dari hutan desa tanpa campuran bahan kimia. Dipanen langsung dari sarang lebah liar dengan kualitas terjamin dan rasa yang manis alami.",
      harga: "Rp 120.000/botol",
      rating: 4.9,
      terjual: 67,
      lokasi: "Dusun Hutan Lebah",
      whatsapp: "6281456789012",
      website: "www.maduhutan.id",
      gambar: "/placeholder.svg?height=300&width=300&text=Madu+Hutan",
      produk: ["Madu Botol 500ml", "Madu Botol 250ml", "Madu Sachet"],
      jam: "07:00 - 19:00 WIB",
      pengiriman: ["COD", "JNE", "J&T", "SiCepat"],
    },
    {
      id: 4,
      nama: "Batik Tulis Silungkang",
      pemilik: "Sanggar Batik Nusantara",
      kategori: "Fashion",
      deskripsi:
        "Batik tulis dengan motif khas desa yang dibuat secara tradisional. Menggunakan pewarna alami dan teknik tulis tangan yang menghasilkan karya seni berkualitas tinggi.",
      harga: "Rp 250.000 - 750.000",
      rating: 4.7,
      terjual: 34,
      lokasi: "Dusun Seni Budaya",
      whatsapp: "6281567890123",
      website: "www.batiksilungkang.com",
      gambar: "/placeholder.svg?height=300&width=300&text=Batik+Tulis",
      produk: ["Kemeja Batik", "Dress Batik", "Kain Batik", "Selendang"],
      jam: "08:00 - 16:00 WIB",
      pengiriman: ["COD", "JNE", "J&T"],
    },
    {
      id: 5,
      nama: "Dodol Durian Silungkang",
      pemilik: "Ibu Sari Manis",
      kategori: "Makanan",
      deskripsi:
        "Dodol durian dengan rasa yang legit dan manis. Dibuat dari durian pilihan dengan resep turun temurun. Cocok sebagai oleh-oleh khas desa.",
      harga: "Rp 25.000/kotak",
      rating: 4.5,
      terjual: 156,
      lokasi: "Dusun Durian Manis",
      whatsapp: "6281678901234",
      website: "-",
      gambar: "/placeholder.svg?height=300&width=300&text=Dodol+Durian",
      produk: ["Dodol Durian Original", "Dodol Durian Mini", "Paket Oleh-oleh"],
      jam: "06:00 - 18:00 WIB",
      pengiriman: ["COD", "JNE"],
    },
    {
      id: 6,
      nama: "Sayuran Organik Segar",
      pemilik: "Kelompok Tani Organik",
      kategori: "Pertanian",
      deskripsi:
        "Sayuran organik segar tanpa pestisida yang ditanam dengan metode pertanian berkelanjutan. Tersedia berbagai jenis sayuran sesuai musim.",
      harga: "Rp 5.000 - 15.000/ikat",
      rating: 4.4,
      terjual: 234,
      lokasi: "Dusun Hijau Organik",
      whatsapp: "6281789012345",
      website: "-",
      gambar: "/placeholder.svg?height=300&width=300&text=Sayuran+Organik",
      produk: ["Kangkung", "Bayam", "Sawi", "Tomat", "Cabai"],
      jam: "05:00 - 10:00 WIB",
      pengiriman: ["COD"],
    },
  ]

  const kategoriList = ["Semua", "Makanan", "Minuman", "Kerajinan", "Fashion", "Pertanian"]

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case "Makanan":
        return "bg-green-100 text-green-700"
      case "Minuman":
        return "bg-blue-100 text-blue-700"
      case "Kerajinan":
        return "bg-purple-100 text-purple-700"
      case "Fashion":
        return "bg-pink-100 text-pink-700"
      case "Pertanian":
        return "bg-emerald-100 text-emerald-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const handleWhatsAppClick = (whatsapp: string, namaLapak: string) => {
    const message = `Halo, saya tertarik dengan produk ${namaLapak}. Bisa minta informasi lebih lanjut?`
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <Button variant="ghost" asChild className="text-slate-600 hover:text-[#073046]">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                <Store className="h-4 w-4" />
              </div>
              <span className="font-semibold text-[#073046]">Lapak Desa Silungkang Tigo</span>
            </div>

            <Button asChild className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                Login Admin
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#073046] to-[#0a4a66] bg-clip-text text-transparent mb-4">
            Lapak Desa Silungkang Tigo
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Temukan produk-produk berkualitas dari UMKM lokal Desa Silungkang Tigo. Dukung ekonomi desa dengan
            berbelanja langsung dari produsen.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Cari produk UMKM..." className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {kategoriList.map((kategori) => (
              <Button key={kategori} variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                {kategori}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                <Store className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-[#073046]">{lapakData.length}</div>
              <p className="text-sm text-slate-600">UMKM Terdaftar</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-[#073046]">
                {lapakData.reduce((total, lapak) => total + lapak.terjual, 0)}
              </div>
              <p className="text-sm text-slate-600">Produk Terjual</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-[#073046]">
                {(lapakData.reduce((total, lapak) => total + lapak.rating, 0) / lapakData.length).toFixed(1)}
              </div>
              <p className="text-sm text-slate-600">Rating Rata-rata</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center mx-auto mb-4">
                <Filter className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-[#073046]">{kategoriList.length - 1}</div>
              <p className="text-sm text-slate-600">Kategori Produk</p>
            </CardContent>
          </Card>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lapakData.map((lapak) => (
            <Card
              key={lapak.id}
              className="border-0 bg-gradient-to-br from-white to-slate-50/50 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={lapak.gambar || "/placeholder.svg"}
                  alt={lapak.nama}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getKategoriColor(lapak.kategori)}>{lapak.kategori}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-[#073046] flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {lapak.rating}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-[#073046] text-lg mb-1 group-hover:text-[#0a4a66] transition-colors">
                    {lapak.nama}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">oleh {lapak.pemilik}</p>
                  <p className="text-slate-600 text-sm line-clamp-2">{lapak.deskripsi}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#073046] text-lg">{lapak.harga}</span>
                    <span className="text-sm text-slate-500">{lapak.terjual} terjual</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-3 w-3" />
                    <span>{lapak.lokasi}</span>
                  </div>

                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Jam Buka:</span> {lapak.jam}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-[#073046] mb-2">Produk Tersedia:</p>
                  <div className="flex flex-wrap gap-1">
                    {lapak.produk.slice(0, 3).map((produk, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {produk}
                      </Badge>
                    ))}
                    {lapak.produk.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{lapak.produk.length - 3} lainnya
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Button
                    onClick={() => handleWhatsAppClick(lapak.whatsapp, lapak.nama)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 to-green-700 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat WhatsApp
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 hover:bg-[#073046]/10 bg-transparent">
                      <Phone className="h-4 w-4 mr-1" />
                      Telepon
                    </Button>
                    {lapak.website !== "-" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-[#073046]/10 bg-transparent"
                        onClick={() => window.open(`https://${lapak.website}`, "_blank")}
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg mt-12">
          <CardHeader>
            <CardTitle className="text-[#073046] text-center">Cara Berbelanja di Lapak Desa</CardTitle>
            <CardDescription className="text-center">Panduan mudah untuk berbelanja produk UMKM lokal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-[#073046]">1. Pilih Produk</h3>
                <p className="text-sm text-slate-600">Cari dan pilih produk yang Anda inginkan dari berbagai UMKM</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-[#073046]">2. Chat WhatsApp</h3>
                <p className="text-sm text-slate-600">Hubungi penjual melalui WhatsApp untuk konfirmasi pesanan</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-[#073046]">3. Pesan & Bayar</h3>
                <p className="text-sm text-slate-600">Lakukan pemesanan dan pembayaran sesuai kesepakatan</p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-[#073046]">4. Terima & Review</h3>
                <p className="text-sm text-slate-600">Terima produk dan berikan review untuk membantu UMKM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
