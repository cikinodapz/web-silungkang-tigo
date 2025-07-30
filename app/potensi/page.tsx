"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, MapPin, Leaf, Factory, Users, TrendingUp, Plus, Edit, Eye, Trash2 } from "lucide-react"

export default function PotensiPage() {
  const potensiData = [
    {
      id: 1,
      nama: "Wisata Air Terjun Sekumpul",
      kategori: "wisata",
      lokasi: "Dusun Sekumpul",
      status: "aktif",
      potensiEkonomi: "Tinggi",
      deskripsi: "Air terjun dengan ketinggian 80 meter yang menjadi daya tarik wisata utama",
      pengelola: "Pokdarwis Sekumpul",
      pendapatan: 15000000,
    },
    {
      id: 2,
      nama: "Kebun Kopi Arabika",
      kategori: "pertanian",
      lokasi: "Dusun Kopi Manis",
      status: "berkembang",
      potensiEkonomi: "Sedang",
      deskripsi: "Perkebunan kopi arabika dengan luas 25 hektar",
      pengelola: "Kelompok Tani Kopi Sejahtera",
      pendapatan: 8500000,
    },
    {
      id: 3,
      nama: "Kerajinan Bambu",
      kategori: "umkm",
      lokasi: "Dusun Bambu Indah",
      status: "aktif",
      potensiEkonomi: "Sedang",
      deskripsi: "Industri kerajinan bambu dengan berbagai produk furniture dan souvenir",
      pengelola: "UKM Bambu Kreatif",
      pendapatan: 6200000,
    },
    {
      id: 4,
      nama: "Tambang Pasir",
      kategori: "tambang",
      lokasi: "Dusun Batu Karang",
      status: "non-aktif",
      potensiEkonomi: "Tinggi",
      deskripsi: "Potensi tambang pasir yang belum dimanfaatkan optimal",
      pengelola: "-",
      pendapatan: 0,
    },
  ]

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case "wisata":
        return "bg-blue-100 text-blue-700"
      case "pertanian":
        return "bg-green-100 text-green-700"
      case "umkm":
        return "bg-purple-100 text-purple-700"
      case "tambang":
        return "bg-orange-100 text-orange-700"
      case "perikanan":
        return "bg-cyan-100 text-cyan-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktif":
        return "bg-emerald-100 text-emerald-700"
      case "berkembang":
        return "bg-yellow-100 text-yellow-700"
      case "non-aktif":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getPotensiColor = (potensi: string) => {
    switch (potensi) {
      case "Tinggi":
        return "bg-emerald-100 text-emerald-700"
      case "Sedang":
        return "bg-yellow-100 text-yellow-700"
      case "Rendah":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
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
                  Pengelolaan Potensi Desa
                </h1>
                <p className="text-sm text-slate-600">Kelola aset dan potensi sumber daya desa</p>
              </div>
              <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Potensi
              </Button>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="wisata" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <MapPin className="h-4 w-4 mr-2" />
                  Wisata
                </TabsTrigger>
                <TabsTrigger
                  value="pertanian"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  Pertanian
                </TabsTrigger>
                <TabsTrigger value="umkm" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <Factory className="h-4 w-4 mr-2" />
                  UMKM
                </TabsTrigger>
                <TabsTrigger
                  value="lainnya"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Lainnya
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-4">
                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total Potensi</CardTitle>
                      <Zap className="h-5 w-5 text-[#073046]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">12</div>
                      <p className="text-xs text-slate-500">Potensi teridentifikasi</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Potensi Aktif</CardTitle>
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">8</div>
                      <p className="text-xs text-emerald-600">Sedang dimanfaatkan</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Pendapatan</CardTitle>
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">29.7M</div>
                      <p className="text-xs text-purple-600">Per bulan</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Potensi Tinggi</CardTitle>
                      <Zap className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">5</div>
                      <p className="text-xs text-orange-600">Prioritas pengembangan</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Daftar Potensi */}
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Potensi Desa</CardTitle>
                    <CardDescription>Inventarisasi semua potensi sumber daya desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {potensiData.map((potensi) => (
                        <div
                          key={potensi.id}
                          className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-[#073046] text-lg">{potensi.nama}</h3>
                                <Badge className={getKategoriColor(potensi.kategori)}>
                                  {potensi.kategori.toUpperCase()}
                                </Badge>
                                <Badge className={getStatusColor(potensi.status)}>
                                  {potensi.status === "aktif"
                                    ? "Aktif"
                                    : potensi.status === "berkembang"
                                      ? "Berkembang"
                                      : "Non-Aktif"}
                                </Badge>
                                <Badge className={getPotensiColor(potensi.potensiEkonomi)}>
                                  Potensi {potensi.potensiEkonomi}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm">{potensi.deskripsi}</p>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Lokasi:</p>
                                  <p className="font-medium text-[#073046]">{potensi.lokasi}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Pengelola:</p>
                                  <p className="font-medium text-[#073046]">{potensi.pengelola}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Pendapatan/Bulan:</p>
                                  <p className="font-medium text-emerald-600">{formatRupiah(potensi.pendapatan)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                <Eye className="h-4 w-4" />
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wisata" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Potensi Wisata</CardTitle>
                    <CardDescription>Kelola objek wisata dan daya tarik desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {potensiData
                        .filter((p) => p.kategori === "wisata")
                        .map((wisata) => (
                          <div
                            key={wisata.id}
                            className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-[#073046]">{wisata.nama}</h3>
                                <p className="text-slate-600 text-sm">{wisata.deskripsi}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span>📍 {wisata.lokasi}</span>
                                  <span>👥 {wisata.pengelola}</span>
                                  <span>💰 {formatRupiah(wisata.pendapatan)}/bulan</span>
                                </div>
                              </div>
                              <Badge className={getStatusColor(wisata.status)}>
                                {wisata.status === "aktif" ? "Aktif" : "Non-Aktif"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pertanian" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Potensi Pertanian</CardTitle>
                    <CardDescription>Kelola sektor pertanian dan perkebunan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {potensiData
                        .filter((p) => p.kategori === "pertanian")
                        .map((pertanian) => (
                          <div
                            key={pertanian.id}
                            className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-[#073046]">{pertanian.nama}</h3>
                                <p className="text-slate-600 text-sm">{pertanian.deskripsi}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span>🌱 {pertanian.lokasi}</span>
                                  <span>👨‍🌾 {pertanian.pengelola}</span>
                                  <span>💰 {formatRupiah(pertanian.pendapatan)}/bulan</span>
                                </div>
                              </div>
                              <Badge className={getStatusColor(pertanian.status)}>
                                {pertanian.status === "berkembang" ? "Berkembang" : "Aktif"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="umkm" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">UMKM dan Industri</CardTitle>
                    <CardDescription>Kelola usaha mikro kecil menengah desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {potensiData
                        .filter((p) => p.kategori === "umkm")
                        .map((umkm) => (
                          <div
                            key={umkm.id}
                            className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-[#073046]">{umkm.nama}</h3>
                                <p className="text-slate-600 text-sm">{umkm.deskripsi}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span>🏭 {umkm.lokasi}</span>
                                  <span>👥 {umkm.pengelola}</span>
                                  <span>💰 {formatRupiah(umkm.pendapatan)}/bulan</span>
                                </div>
                              </div>
                              <Badge className={getStatusColor(umkm.status)}>Aktif</Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lainnya" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Tambah Potensi Baru</CardTitle>
                    <CardDescription>Daftarkan potensi baru yang ditemukan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nama-potensi">Nama Potensi</Label>
                        <Input id="nama-potensi" placeholder="Masukkan nama potensi" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kategori-potensi">Kategori</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="wisata">Wisata</option>
                          <option value="pertanian">Pertanian</option>
                          <option value="umkm">UMKM</option>
                          <option value="tambang">Tambang</option>
                          <option value="perikanan">Perikanan</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lokasi-potensi">Lokasi</Label>
                        <Input id="lokasi-potensi" placeholder="Dusun/RT/RW" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pengelola-potensi">Pengelola</Label>
                        <Input id="pengelola-potensi" placeholder="Nama pengelola/kelompok" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="potensi-ekonomi">Potensi Ekonomi</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="tinggi">Tinggi</option>
                          <option value="sedang">Sedang</option>
                          <option value="rendah">Rendah</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pendapatan-estimasi">Estimasi Pendapatan (Rp/bulan)</Label>
                        <Input id="pendapatan-estimasi" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="deskripsi-potensi">Deskripsi</Label>
                        <textarea
                          id="deskripsi-potensi"
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Deskripsikan potensi ini..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Batal</Button>
                      <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                        Simpan Potensi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
