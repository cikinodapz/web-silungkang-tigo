"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Package, ShoppingCart, TrendingUp, Plus, Edit, Eye, Trash2, Star, Users } from "lucide-react"

export default function LapakDesaPage() {
  const produkData = [
    {
      id: 1,
      nama: "Kopi Arabika Premium",
      kategori: "minuman",
      harga: 85000,
      stok: 50,
      terjual: 125,
      rating: 4.8,
      penjual: "Kelompok Tani Kopi Sejahtera",
      gambar: "/placeholder.svg?height=200&width=200&text=Kopi",
      deskripsi: "Kopi arabika premium dari kebun desa dengan cita rasa yang khas",
      status: "aktif",
    },
    {
      id: 2,
      nama: "Kerajinan Bambu Set",
      kategori: "kerajinan",
      harga: 150000,
      stok: 25,
      terjual: 89,
      rating: 4.6,
      penjual: "UKM Bambu Kreatif",
      gambar: "/placeholder.svg?height=200&width=200&text=Bambu",
      deskripsi: "Set kerajinan bambu berisi tempat pensil, vas bunga, dan hiasan dinding",
      status: "aktif",
    },
    {
      id: 3,
      nama: "Madu Hutan Asli",
      kategori: "makanan",
      harga: 120000,
      stok: 30,
      terjual: 67,
      rating: 4.9,
      penjual: "Kelompok Peternak Lebah",
      gambar: "/placeholder.svg?height=200&width=200&text=Madu",
      deskripsi: "Madu murni dari hutan desa tanpa campuran bahan kimia",
      status: "aktif",
    },
    {
      id: 4,
      nama: "Batik Tulis Motif Desa",
      kategori: "fashion",
      harga: 250000,
      stok: 15,
      terjual: 34,
      rating: 4.7,
      penjual: "Sanggar Batik Nusantara",
      gambar: "/placeholder.svg?height=200&width=200&text=Batik",
      deskripsi: "Batik tulis dengan motif khas desa yang dibuat secara tradisional",
      status: "aktif",
    },
  ]

  const pesananData = [
    {
      id: "ORD001",
      pembeli: "Siti Rahayu",
      produk: "Kopi Arabika Premium",
      jumlah: 2,
      total: 170000,
      status: "pending",
      tanggal: "2024-01-20",
    },
    {
      id: "ORD002",
      pembeli: "Ahmad Wijaya",
      produk: "Kerajinan Bambu Set",
      jumlah: 1,
      total: 150000,
      status: "diproses",
      tanggal: "2024-01-19",
    },
    {
      id: "ORD003",
      pembeli: "Budi Santoso",
      produk: "Madu Hutan Asli",
      jumlah: 3,
      total: 360000,
      status: "selesai",
      tanggal: "2024-01-18",
    },
  ]

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case "makanan":
        return "bg-green-100 text-green-700"
      case "minuman":
        return "bg-blue-100 text-blue-700"
      case "kerajinan":
        return "bg-purple-100 text-purple-700"
      case "fashion":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktif":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "diproses":
        return "bg-blue-100 text-blue-700"
      case "selesai":
        return "bg-emerald-100 text-emerald-700"
      case "dibatalkan":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
          <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-[#073046] hover:bg-[#073046]/10" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#073046] to-[#0a4a66] bg-clip-text text-transparent">
                  Lapak Desa
                </h1>
                <p className="text-sm text-slate-600">E-commerce produk lokal desa</p>
              </div>
              <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </Button>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="produk" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="produk" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Produk
                </TabsTrigger>
                <TabsTrigger
                  value="pesanan"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Pesanan
                </TabsTrigger>
                <TabsTrigger
                  value="penjual"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Penjual
                </TabsTrigger>
                <TabsTrigger
                  value="laporan"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Laporan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="produk" className="space-y-6">
                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-4">
                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total Produk</CardTitle>
                      <Package className="h-5 w-5 text-[#073046]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">24</div>
                      <p className="text-xs text-slate-500">Produk terdaftar</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Produk Aktif</CardTitle>
                      <Store className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">18</div>
                      <p className="text-xs text-emerald-600">Siap dijual</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total Penjualan</CardTitle>
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">2.4M</div>
                      <p className="text-xs text-purple-600">Bulan ini</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Rating Rata-rata</CardTitle>
                      <Star className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">4.7</div>
                      <p className="text-xs text-orange-600">Dari 5 bintang</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Daftar Produk */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {produkData.map((produk) => (
                    <Card
                      key={produk.id}
                      className="border-0 bg-gradient-to-br from-white to-slate-50/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={produk.gambar || "/placeholder.svg"}
                            alt={produk.nama}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className={getStatusColor(produk.status)}>
                              {produk.status === "aktif" ? "Aktif" : "Non-Aktif"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-[#073046] text-lg">{produk.nama}</h3>
                            <Badge className={getKategoriColor(produk.kategori)} variant="outline">
                              {produk.kategori}
                            </Badge>
                          </div>
                          <p className="text-slate-600 text-sm line-clamp-2">{produk.deskripsi}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#073046]">{formatRupiah(produk.harga)}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{produk.rating}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-slate-500">Stok:</span>
                              <span className="font-medium text-[#073046] ml-1">{produk.stok}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Terjual:</span>
                              <span className="font-medium text-emerald-600 ml-1">{produk.terjual}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500">Penjual: {produk.penjual}</p>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 hover:bg-[#073046]/10 bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            Detail
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-red-50 hover:text-red-600 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pesanan" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Pesanan</CardTitle>
                    <CardDescription>Kelola pesanan dari pembeli</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pesananData.map((pesanan) => (
                        <div
                          key={pesanan.id}
                          className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-[#073046]">#{pesanan.id}</h3>
                                <Badge className={getStatusColor(pesanan.status)}>
                                  {pesanan.status === "pending"
                                    ? "Pending"
                                    : pesanan.status === "diproses"
                                      ? "Diproses"
                                      : "Selesai"}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Pembeli:</p>
                                  <p className="font-medium text-[#073046]">{pesanan.pembeli}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Produk:</p>
                                  <p className="font-medium text-[#073046]">{pesanan.produk}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Jumlah:</p>
                                  <p className="font-medium text-[#073046]">{pesanan.jumlah} pcs</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Total:</p>
                                  <p className="font-medium text-emerald-600">{formatRupiah(pesanan.total)}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-500">Tanggal: {pesanan.tanggal}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                Detail
                              </Button>
                              {pesanan.status === "pending" && (
                                <Button size="sm" className="bg-gradient-to-r from-[#073046] to-[#0a4a66]">
                                  Proses
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="penjual" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Penjual</CardTitle>
                    <CardDescription>Kelola penjual dan UMKM yang terdaftar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Kelompok Tani Kopi Sejahtera",
                        "UKM Bambu Kreatif",
                        "Kelompok Peternak Lebah",
                        "Sanggar Batik Nusantara",
                      ].map((penjual, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-[#073046]">{penjual}</h3>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Produk:</p>
                                  <p className="font-medium text-[#073046]">{Math.floor(Math.random() * 5) + 1}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Terjual:</p>
                                  <p className="font-medium text-emerald-600">{Math.floor(Math.random() * 100) + 50}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Rating:</p>
                                  <p className="font-medium text-[#073046]">{(4.5 + Math.random() * 0.4).toFixed(1)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                Detail
                              </Button>
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="laporan" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#073046]">Laporan Penjualan</CardTitle>
                      <CardDescription>Ringkasan penjualan per periode</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">Januari 2024</span>
                          <span className="font-bold text-emerald-600">{formatRupiah(2400000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">Februari 2024</span>
                          <span className="font-bold text-emerald-600">{formatRupiah(2800000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">Maret 2024</span>
                          <span className="font-bold text-emerald-600">{formatRupiah(3200000)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#073046]">Produk Terlaris</CardTitle>
                      <CardDescription>Produk dengan penjualan tertinggi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {produkData
                          .sort((a, b) => b.terjual - a.terjual)
                          .slice(0, 3)
                          .map((produk, index) => (
                            <div key={produk.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[#073046]">{produk.nama}</p>
                                <p className="text-sm text-slate-500">{produk.terjual} terjual</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
