"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, FileText, Download, Calendar, User, Scale, BookOpen, Eye, Filter } from "lucide-react"
import Link from "next/link"

export default function ProdukHukumPublicPage() {
  const dokumenHukum = [
    {
      id: 1,
      nomor: "001/PERDES/2024",
      judul: "Peraturan Desa tentang Anggaran Pendapatan dan Belanja Desa Tahun 2024",
      jenis: "perdes",
      tanggalTerbit: "2024-01-15",
      status: "berlaku",
      penerbit: "Kepala Desa",
      kategori: "Keuangan",
      ringkasan: "Mengatur tentang APBD Desa untuk tahun anggaran 2024 dengan total anggaran 1.35 miliar rupiah",
      downloads: 245,
      ukuranFile: "2.3 MB",
    },
    {
      id: 2,
      nomor: "002/PERDES/2024",
      judul: "Peraturan Desa tentang Pengelolaan Sampah",
      jenis: "perdes",
      tanggalTerbit: "2024-01-10",
      status: "berlaku",
      penerbit: "Kepala Desa",
      kategori: "Lingkungan",
      ringkasan: "Mengatur tata cara pengelolaan sampah di wilayah desa untuk menjaga kebersihan lingkungan",
      downloads: 189,
      ukuranFile: "1.8 MB",
    },
    {
      id: 3,
      nomor: "001/SK-KADES/2024",
      judul: "Surat Keputusan tentang Pembentukan Tim Pelaksana Program Desa",
      jenis: "sk",
      tanggalTerbit: "2024-01-05",
      status: "berlaku",
      penerbit: "Kepala Desa",
      kategori: "Organisasi",
      ringkasan: "Pembentukan tim pelaksana untuk berbagai program pembangunan desa tahun 2024",
      downloads: 156,
      ukuranFile: "1.2 MB",
    },
    {
      id: 4,
      nomor: "001/PERKADES/2023",
      judul: "Peraturan Kepala Desa tentang Tata Tertib Rapat Desa",
      jenis: "perkades",
      tanggalTerbit: "2023-12-20",
      status: "berlaku",
      penerbit: "Kepala Desa",
      kategori: "Pemerintahan",
      ringkasan: "Mengatur tata tertib pelaksanaan rapat desa dan musyawarah desa",
      downloads: 134,
      ukuranFile: "1.5 MB",
    },
    {
      id: 5,
      nomor: "003/PERDES/2023",
      judul: "Peraturan Desa tentang Retribusi Pasar Desa",
      jenis: "perdes",
      tanggalTerbit: "2023-11-15",
      status: "dicabut",
      penerbit: "Kepala Desa",
      kategori: "Keuangan",
      ringkasan: "Mengatur tarif retribusi pasar desa (sudah dicabut dan diganti dengan peraturan baru)",
      downloads: 89,
      ukuranFile: "1.1 MB",
    },
    {
      id: 6,
      nomor: "002/SK-KADES/2023",
      judul: "Surat Keputusan tentang Penetapan Batas Wilayah Desa",
      jenis: "sk",
      tanggalTerbit: "2023-10-10",
      status: "berlaku",
      penerbit: "Kepala Desa",
      kategori: "Wilayah",
      ringkasan: "Penetapan batas wilayah desa berdasarkan hasil survei dan pemetaan",
      downloads: 167,
      ukuranFile: "3.2 MB",
    },
  ]

  const kategoriList = ["Semua", "Keuangan", "Lingkungan", "Organisasi", "Pemerintahan", "Wilayah"]

  const getJenisColor = (jenis: string) => {
    switch (jenis) {
      case "perdes":
        return "bg-blue-100 text-blue-700"
      case "sk":
        return "bg-green-100 text-green-700"
      case "perkades":
        return "bg-purple-100 text-purple-700"
      case "keputusan":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "berlaku":
        return "bg-emerald-100 text-emerald-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      case "dicabut":
        return "bg-red-100 text-red-700"
      case "direvisi":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getJenisText = (jenis: string) => {
    switch (jenis) {
      case "perdes":
        return "Peraturan Desa"
      case "sk":
        return "Surat Keputusan"
      case "perkades":
        return "Peraturan Kepala Desa"
      case "keputusan":
        return "Keputusan"
      default:
        return jenis.toUpperCase()
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "berlaku":
        return "Berlaku"
      case "draft":
        return "Draft"
      case "dicabut":
        return "Dicabut"
      case "direvisi":
        return "Direvisi"
      default:
        return status
    }
  }

  const dokumenTerpopuler = dokumenHukum
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5)
    .map((doc, index) => ({ ...doc, rank: index + 1 }))

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
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-semibold text-[#073046]">Produk Hukum Desa Silungkang Tigo</span>
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
            Produk Hukum Desa
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Akses dokumen hukum dan peraturan desa secara transparan. Semua peraturan yang berlaku di Desa Silungkang
            Tigo dapat diunduh dan dipelajari oleh masyarakat.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Cari dokumen hukum..." className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {kategoriList.map((kategori) => (
              <Button key={kategori} variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                {kategori}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="semua" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="semua" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Semua
                </TabsTrigger>
                <TabsTrigger value="perdes" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <Scale className="h-4 w-4 mr-2" />
                  Perdes
                </TabsTrigger>
                <TabsTrigger value="sk" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <BookOpen className="h-4 w-4 mr-2" />
                  SK
                </TabsTrigger>
                <TabsTrigger
                  value="perkades"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Perkades
                </TabsTrigger>
              </TabsList>

              <TabsContent value="semua" className="space-y-4">
                {dokumenHukum.map((dokumen) => (
                  <Card
                    key={dokumen.id}
                    className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getJenisColor(dokumen.jenis)}>{getJenisText(dokumen.jenis)}</Badge>
                            <Badge className={getStatusColor(dokumen.status)}>{getStatusText(dokumen.status)}</Badge>
                            <span className="text-sm text-slate-500">#{dokumen.nomor}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-[#073046] mb-2 hover:text-[#0a4a66] transition-colors">
                            {dokumen.judul}
                          </h3>
                          <p className="text-slate-600 text-sm mb-3">{dokumen.ringkasan}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {dokumen.tanggalTerbit}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {dokumen.penerbit}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {dokumen.downloads} unduhan
                            </span>
                            <span>{dokumen.ukuranFile}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Unduh PDF
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Detail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="perdes" className="space-y-4">
                {dokumenHukum
                  .filter((d) => d.jenis === "perdes")
                  .map((dokumen) => (
                    <Card
                      key={dokumen.id}
                      className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getStatusColor(dokumen.status)}>{getStatusText(dokumen.status)}</Badge>
                              <span className="text-sm text-slate-500">#{dokumen.nomor}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-[#073046] mb-2">{dokumen.judul}</h3>
                            <p className="text-slate-600 text-sm mb-3">{dokumen.ringkasan}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {dokumen.tanggalTerbit}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                {dokumen.downloads} unduhan
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Unduh PDF
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="sk" className="space-y-4">
                {dokumenHukum
                  .filter((d) => d.jenis === "sk")
                  .map((dokumen) => (
                    <Card
                      key={dokumen.id}
                      className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getStatusColor(dokumen.status)}>{getStatusText(dokumen.status)}</Badge>
                              <span className="text-sm text-slate-500">#{dokumen.nomor}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-[#073046] mb-2">{dokumen.judul}</h3>
                            <p className="text-slate-600 text-sm mb-3">{dokumen.ringkasan}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {dokumen.tanggalTerbit}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                {dokumen.downloads} unduhan
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Unduh PDF
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="perkades" className="space-y-4">
                {dokumenHukum
                  .filter((d) => d.jenis === "perkades")
                  .map((dokumen) => (
                    <Card
                      key={dokumen.id}
                      className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getStatusColor(dokumen.status)}>{getStatusText(dokumen.status)}</Badge>
                              <span className="text-sm text-slate-500">#{dokumen.nomor}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-[#073046] mb-2">{dokumen.judul}</h3>
                            <p className="text-slate-600 text-sm mb-3">{dokumen.ringkasan}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {dokumen.tanggalTerbit}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                {dokumen.downloads} unduhan
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Unduh PDF
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046] flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Statistik Dokumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-slate-600">Total Dokumen</span>
                    <span className="font-bold text-[#073046]">{dokumenHukum.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-slate-600">Berlaku</span>
                    <span className="font-bold text-emerald-600">
                      {dokumenHukum.filter((d) => d.status === "berlaku").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-slate-600">Total Unduhan</span>
                    <span className="font-bold text-[#073046]">
                      {dokumenHukum.reduce((total, doc) => total + doc.downloads, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dokumen Terpopuler */}
            <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046] flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Paling Banyak Diunduh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dokumenTerpopuler.map((dokumen) => (
                    <div key={dokumen.id} className="flex gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white flex items-center justify-center text-xs font-bold">
                        {dokumen.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#073046] text-sm line-clamp-2 mb-1">{dokumen.judul}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {dokumen.downloads}
                          </span>
                          <Badge className={getJenisColor(dokumen.jenis)} variant="outline">
                            {getJenisText(dokumen.jenis)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Kategori */}
            <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046] flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Kategori Dokumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {kategoriList.slice(1).map((kategori) => {
                    const count = dokumenHukum.filter((doc) => doc.kategori === kategori).length
                    return (
                      <div
                        key={kategori}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
                      >
                        <span className="text-slate-700">{kategori}</span>
                        <Badge variant="outline" className="text-xs">
                          {count}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-[#073046] text-center">Tentang Produk Hukum Desa</CardTitle>
            <CardDescription className="text-center">
              Informasi penting mengenai akses dan penggunaan dokumen hukum desa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#073046] mb-3">Hak Akses Masyarakat</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                    <span>Semua dokumen dapat diakses dan diunduh secara gratis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                    <span>Tidak diperlukan registrasi untuk mengunduh dokumen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                    <span>Dokumen tersedia dalam format PDF yang mudah dibaca</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#073046] mb-3">Informasi Kontak</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                    <span>Untuk pertanyaan dokumen hubungi: +62 754 123456</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                    <span>Email: hukum@silungkangtigo.desa.id</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                    <span>Kunjungi kantor desa untuk konsultasi langsung</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
