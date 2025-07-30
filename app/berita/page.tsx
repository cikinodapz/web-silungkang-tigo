"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Plus, Search, Eye, Edit, Trash2, Calendar, User } from "lucide-react"

export default function BeritaPage() {
  const beritaData = [
    {
      id: 1,
      judul: "Pembangunan Jalan Desa Tahap 2 Dimulai",
      konten:
        "Pembangunan jalan desa tahap 2 sepanjang 2 km telah dimulai hari ini. Proyek ini diharapkan selesai dalam 3 bulan ke depan...",
      penulis: "Admin Desa",
      tanggal: "2024-01-20",
      status: "published",
      views: 245,
      kategori: "Pembangunan",
    },
    {
      id: 2,
      judul: "Sosialisasi Program Bantuan Sosial 2024",
      konten:
        "Pemerintah desa mengadakan sosialisasi program bantuan sosial untuk tahun 2024. Acara akan dilaksanakan di balai desa...",
      penulis: "Sekretaris Desa",
      tanggal: "2024-01-18",
      status: "published",
      views: 189,
      kategori: "Sosial",
    },
    {
      id: 3,
      judul: "Rapat Koordinasi RT/RW Bulan Januari",
      konten:
        "Rapat koordinasi bulanan RT/RW akan dilaksanakan pada tanggal 25 Januari 2024 di balai desa mulai pukul 19.00 WIB...",
      penulis: "Admin Desa",
      tanggal: "2024-01-15",
      status: "draft",
      views: 0,
      kategori: "Pemerintahan",
    },
    {
      id: 4,
      judul: "Festival Budaya Desa 2024",
      konten:
        "Dalam rangka memperingati HUT RI ke-79, desa akan mengadakan festival budaya yang menampilkan berbagai kesenian tradisional...",
      penulis: "Kaur Kesra",
      tanggal: "2024-01-12",
      status: "published",
      views: 567,
      kategori: "Budaya",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-100 text-emerald-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      case "archived":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Dipublikasi"
      case "draft":
        return "Draft"
      case "archived":
        return "Diarsipkan"
      default:
        return "Unknown"
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
                  Pengelolaan Berita
                </h1>
                <p className="text-sm text-slate-600">Kelola berita dan informasi desa</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Cari berita..." className="pl-10 w-64" />
                </div>
                <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Tulis Berita
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Berita</CardTitle>
                  <Newspaper className="h-5 w-5 text-[#073046]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">24</div>
                  <p className="text-xs text-slate-500">Semua berita</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Dipublikasi</CardTitle>
                  <Eye className="h-5 w-5 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">18</div>
                  <p className="text-xs text-emerald-600">Berita aktif</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-white to-yellow-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Draft</CardTitle>
                  <Edit className="h-5 w-5 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">6</div>
                  <p className="text-xs text-yellow-600">Belum dipublikasi</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Views</CardTitle>
                  <Eye className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">1.2K</div>
                  <p className="text-xs text-purple-600">Bulan ini</p>
                </CardContent>
              </Card>
            </div>

            {/* Berita List */}
            <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046]">Daftar Berita</CardTitle>
                <CardDescription>Kelola semua berita dan artikel desa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {beritaData.map((berita) => (
                    <div
                      key={berita.id}
                      className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-[#073046] text-lg">{berita.judul}</h3>
                            <Badge className={getStatusColor(berita.status)}>{getStatusText(berita.status)}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {berita.kategori}
                            </Badge>
                          </div>
                          <p className="text-slate-600 text-sm line-clamp-2">{berita.konten}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {berita.penulis}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {berita.tanggal}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {berita.views} views
                            </span>
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

            {/* Form Tulis Berita */}
            <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046]">Tulis Berita Baru</CardTitle>
                <CardDescription>Buat berita atau pengumuman untuk warga desa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="judul">Judul Berita</Label>
                      <Input id="judul" placeholder="Masukkan judul berita" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kategori">Kategori</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="pemerintahan">Pemerintahan</option>
                        <option value="pembangunan">Pembangunan</option>
                        <option value="sosial">Sosial</option>
                        <option value="budaya">Budaya</option>
                        <option value="ekonomi">Ekonomi</option>
                        <option value="kesehatan">Kesehatan</option>
                        <option value="pendidikan">Pendidikan</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="konten">Konten Berita</Label>
                    <textarea
                      id="konten"
                      className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Tulis konten berita di sini..."
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="penulis">Penulis</Label>
                      <Input id="penulis" placeholder="Nama penulis" defaultValue="Admin Desa" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tanggal-publish">Tanggal Publish</Label>
                      <Input id="tanggal-publish" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Simpan Draft</Button>
                    <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                      Publikasikan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
