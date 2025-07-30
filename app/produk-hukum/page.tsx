"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Scale, BookOpen, Download, Plus, Edit, Eye, Trash2, Calendar, User, Search } from "lucide-react"

export default function ProdukHukumPage() {
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
      file: "perdes-001-2024.pdf",
      ringkasan: "Mengatur tentang APBD Desa untuk tahun anggaran 2024 dengan total anggaran 1.35 miliar rupiah",
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
      file: "perdes-002-2024.pdf",
      ringkasan: "Mengatur tata cara pengelolaan sampah di wilayah desa untuk menjaga kebersihan lingkungan",
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
      file: "sk-001-2024.pdf",
      ringkasan: "Pembentukan tim pelaksana untuk berbagai program pembangunan desa tahun 2024",
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
      file: "perkades-001-2023.pdf",
      ringkasan: "Mengatur tata tertib pelaksanaan rapat desa dan musyawarah desa",
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
      file: "perdes-003-2023.pdf",
      ringkasan: "Mengatur tarif retribusi pasar desa (sudah dicabut dan diganti dengan peraturan baru)",
    },
  ]

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
                  Produk Hukum Desa
                </h1>
                <p className="text-sm text-slate-600">Kelola dokumen legal dan peraturan desa</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Cari dokumen..." className="pl-10 w-64" />
                </div>
                <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Dokumen
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="semua" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
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
                <TabsTrigger value="arsip" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Arsip
                </TabsTrigger>
              </TabsList>

              {/* Stats */}
              <div className="grid gap-6 md:grid-cols-4">
                <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Dokumen</CardTitle>
                    <FileText className="h-5 w-5 text-[#073046]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">45</div>
                    <p className="text-xs text-slate-500">Dokumen hukum</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Berlaku</CardTitle>
                    <Scale className="h-5 w-5 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">38</div>
                    <p className="text-xs text-emerald-600">Masih berlaku</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-white to-yellow-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Draft</CardTitle>
                    <BookOpen className="h-5 w-5 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">5</div>
                    <p className="text-xs text-yellow-600">Dalam proses</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-white to-red-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Dicabut</CardTitle>
                    <Download className="h-5 w-5 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">2</div>
                    <p className="text-xs text-red-600">Tidak berlaku</p>
                  </CardContent>
                </Card>
              </div>

              <TabsContent value="semua" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Produk Hukum</CardTitle>
                    <CardDescription>Semua dokumen hukum dan peraturan desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dokumenHukum.map((dokumen) => (
                        <div
                          key={dokumen.id}
                          className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-[#073046] text-lg">{dokumen.judul}</h3>
                                <Badge className={getJenisColor(dokumen.jenis)}>{getJenisText(dokumen.jenis)}</Badge>
                                <Badge className={getStatusColor(dokumen.status)}>
                                  {getStatusText(dokumen.status)}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm">{dokumen.ringkasan}</p>
                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Nomor:</p>
                                  <p className="font-medium text-[#073046]">{dokumen.nomor}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Tanggal Terbit:</p>
                                  <p className="font-medium text-[#073046]">{dokumen.tanggalTerbit}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Penerbit:</p>
                                  <p className="font-medium text-[#073046]">{dokumen.penerbit}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Kategori:</p>
                                  <p className="font-medium text-[#073046]">{dokumen.kategori}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                <Download className="h-4 w-4" />
                              </Button>
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

              <TabsContent value="perdes" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Peraturan Desa</CardTitle>
                    <CardDescription>Daftar Peraturan Desa yang berlaku</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dokumenHukum
                        .filter((d) => d.jenis === "perdes")
                        .map((perdes) => (
                          <div
                            key={perdes.id}
                            className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-[#073046]">{perdes.nomor}</h3>
                                  <Badge className={getStatusColor(perdes.status)}>
                                    {getStatusText(perdes.status)}
                                  </Badge>
                                </div>
                                <p className="text-slate-600 text-sm font-medium">{perdes.judul}</p>
                                <p className="text-slate-500 text-xs">{perdes.ringkasan}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {perdes.tanggalTerbit}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {perdes.penerbit}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sk" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Surat Keputusan</CardTitle>
                    <CardDescription>Daftar Surat Keputusan Kepala Desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dokumenHukum
                        .filter((d) => d.jenis === "sk")
                        .map((sk) => (
                          <div
                            key={sk.id}
                            className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-[#073046]">{sk.nomor}</h3>
                                  <Badge className={getStatusColor(sk.status)}>{getStatusText(sk.status)}</Badge>
                                </div>
                                <p className="text-slate-600 text-sm font-medium">{sk.judul}</p>
                                <p className="text-slate-500 text-xs">{sk.ringkasan}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="perkades" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Peraturan Kepala Desa</CardTitle>
                    <CardDescription>Daftar Peraturan Kepala Desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dokumenHukum
                        .filter((d) => d.jenis === "perkades")
                        .map((perkades) => (
                          <div
                            key={perkades.id}
                            className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-[#073046]">{perkades.nomor}</h3>
                                  <Badge className={getStatusColor(perkades.status)}>
                                    {getStatusText(perkades.status)}
                                  </Badge>
                                </div>
                                <p className="text-slate-600 text-sm font-medium">{perkades.judul}</p>
                                <p className="text-slate-500 text-xs">{perkades.ringkasan}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="arsip" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Tambah Dokumen Hukum</CardTitle>
                    <CardDescription>Upload dokumen hukum baru</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="jenis-dokumen">Jenis Dokumen</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="perdes">Peraturan Desa</option>
                          <option value="sk">Surat Keputusan</option>
                          <option value="perkades">Peraturan Kepala Desa</option>
                          <option value="keputusan">Keputusan</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nomor-dokumen">Nomor Dokumen</Label>
                        <Input id="nomor-dokumen" placeholder="001/PERDES/2024" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="judul-dokumen">Judul Dokumen</Label>
                        <Input id="judul-dokumen" placeholder="Masukkan judul lengkap dokumen" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-terbit">Tanggal Terbit</Label>
                        <Input id="tanggal-terbit" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kategori-dokumen">Kategori</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="keuangan">Keuangan</option>
                          <option value="pemerintahan">Pemerintahan</option>
                          <option value="lingkungan">Lingkungan</option>
                          <option value="organisasi">Organisasi</option>
                          <option value="pembangunan">Pembangunan</option>
                          <option value="sosial">Sosial</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="penerbit">Penerbit</Label>
                        <Input id="penerbit" placeholder="Kepala Desa" defaultValue="Kepala Desa" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status-dokumen">Status</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="draft">Draft</option>
                          <option value="berlaku">Berlaku</option>
                          <option value="direvisi">Direvisi</option>
                          <option value="dicabut">Dicabut</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ringkasan">Ringkasan</Label>
                        <textarea
                          id="ringkasan"
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Ringkasan isi dokumen..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="file-dokumen">Upload File</Label>
                        <Input id="file-dokumen" type="file" accept=".pdf,.doc,.docx" />
                        <p className="text-xs text-slate-500">Format yang didukung: PDF, DOC, DOCX (Max: 10MB)</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Batal</Button>
                      <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                        Simpan Dokumen
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
