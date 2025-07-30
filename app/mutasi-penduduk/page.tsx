"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, UserMinus, ArrowUpDown, Calendar, FileText, Plus } from "lucide-react"

export default function MutasiPendudukPage() {
  const mutasiData = [
    {
      id: 1,
      nama: "Andi Pratama",
      nik: "3201011234567893",
      jenis: "lahir",
      tanggal: "2024-01-15",
      keterangan: "Kelahiran anak pertama dari Budi Santoso",
      status: "disetujui",
    },
    {
      id: 2,
      nama: "Siti Aminah",
      nik: "3201011234567894",
      jenis: "masuk",
      tanggal: "2024-01-10",
      keterangan: "Pindah dari Desa Sukamaju",
      status: "pending",
    },
    {
      id: 3,
      nama: "Pak Hasan",
      nik: "3201011234567895",
      jenis: "meninggal",
      tanggal: "2024-01-05",
      keterangan: "Meninggal dunia karena sakit",
      status: "disetujui",
    },
    {
      id: 4,
      nama: "Keluarga Ahmad",
      nik: "3201011234567896",
      jenis: "pindah",
      tanggal: "2024-01-01",
      keterangan: "Pindah ke Jakarta karena pekerjaan",
      status: "disetujui",
    },
  ]

  const getJenisColor = (jenis: string) => {
    switch (jenis) {
      case "lahir":
        return "bg-emerald-100 text-emerald-700"
      case "masuk":
        return "bg-blue-100 text-blue-700"
      case "meninggal":
        return "bg-red-100 text-red-700"
      case "pindah":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getJenisIcon = (jenis: string) => {
    switch (jenis) {
      case "lahir":
        return <UserPlus className="h-4 w-4" />
      case "masuk":
        return <UserPlus className="h-4 w-4" />
      case "meninggal":
        return <UserMinus className="h-4 w-4" />
      case "pindah":
        return <ArrowUpDown className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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
                  Mutasi Penduduk
                </h1>
                <p className="text-sm text-slate-600">Kelola perpindahan dan perubahan status penduduk</p>
              </div>
              <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Mutasi
              </Button>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="semua" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="semua" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Semua Mutasi
                </TabsTrigger>
                <TabsTrigger
                  value="lahir-masuk"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Lahir/Masuk
                </TabsTrigger>
                <TabsTrigger
                  value="meninggal"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  Meninggal
                </TabsTrigger>
                <TabsTrigger value="pindah" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Pindah/Keluar
                </TabsTrigger>
              </TabsList>

              {/* Stats */}
              <div className="grid gap-6 md:grid-cols-4">
                <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Lahir/Masuk</CardTitle>
                    <UserPlus className="h-5 w-5 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">24</div>
                    <p className="text-xs text-emerald-600">Bulan ini</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-white to-red-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Meninggal</CardTitle>
                    <UserMinus className="h-5 w-5 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">3</div>
                    <p className="text-xs text-red-600">Bulan ini</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Pindah/Keluar</CardTitle>
                    <ArrowUpDown className="h-5 w-5 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">8</div>
                    <p className="text-xs text-orange-600">Bulan ini</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Pending</CardTitle>
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#073046]">5</div>
                    <p className="text-xs text-blue-600">Menunggu persetujuan</p>
                  </CardContent>
                </Card>
              </div>

              <TabsContent value="semua" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Riwayat Mutasi Penduduk</CardTitle>
                    <CardDescription>Semua perubahan data penduduk yang tercatat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mutasiData.map((mutasi) => (
                        <div
                          key={mutasi.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${getJenisColor(mutasi.jenis)}`}>
                              {getJenisIcon(mutasi.jenis)}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-[#073046]">{mutasi.nama}</h3>
                                <Badge
                                  variant={mutasi.status === "disetujui" ? "default" : "secondary"}
                                  className={
                                    mutasi.status === "disetujui"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }
                                >
                                  {mutasi.status === "disetujui" ? "Disetujui" : "Pending"}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600">NIK: {mutasi.nik}</p>
                              <p className="text-sm text-slate-600">{mutasi.keterangan}</p>
                              <p className="text-xs text-slate-500">Tanggal: {mutasi.tanggal}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                              Detail
                            </Button>
                            {mutasi.status === "pending" && (
                              <Button size="sm" className="bg-gradient-to-r from-[#073046] to-[#0a4a66]">
                                Setujui
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lahir-masuk" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Form Kelahiran/Penduduk Masuk</CardTitle>
                    <CardDescription>Daftarkan kelahiran baru atau penduduk yang pindah masuk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="jenis-mutasi">Jenis Mutasi</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="lahir">Kelahiran</option>
                          <option value="masuk">Pindah Masuk</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal">Tanggal</Label>
                        <Input id="tanggal" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input id="nama" placeholder="Masukkan nama lengkap" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nik">NIK</Label>
                        <Input id="nik" placeholder="Nomor Induk Kependudukan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tempat-lahir">Tempat Lahir</Label>
                        <Input id="tempat-lahir" placeholder="Kota/Kabupaten" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-lahir">Tanggal Lahir</Label>
                        <Input id="tanggal-lahir" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jenis-kelamin">Jenis Kelamin</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="agama">Agama</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="keterangan">Keterangan</Label>
                        <textarea
                          id="keterangan"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Keterangan tambahan..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Batal</Button>
                      <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                        Simpan Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meninggal" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Form Kematian</CardTitle>
                    <CardDescription>Catat data kematian penduduk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nik-meninggal">NIK yang Meninggal</Label>
                        <Input id="nik-meninggal" placeholder="Cari berdasarkan NIK" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-meninggal">Tanggal Meninggal</Label>
                        <Input id="tanggal-meninggal" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tempat-meninggal">Tempat Meninggal</Label>
                        <Input id="tempat-meninggal" placeholder="Rumah Sakit/Rumah/dll" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sebab-meninggal">Sebab Meninggal</Label>
                        <Input id="sebab-meninggal" placeholder="Penyakit/Kecelakaan/dll" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="keterangan-meninggal">Keterangan</Label>
                        <textarea
                          id="keterangan-meninggal"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Keterangan tambahan..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Batal</Button>
                      <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 to-red-800">
                        Simpan Data Kematian
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pindah" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Form Pindah/Keluar</CardTitle>
                    <CardDescription>Catat perpindahan penduduk keluar desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nik-pindah">NIK/KK yang Pindah</Label>
                        <Input id="nik-pindah" placeholder="Cari berdasarkan NIK atau No. KK" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-pindah">Tanggal Pindah</Label>
                        <Input id="tanggal-pindah" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alamat-tujuan">Alamat Tujuan</Label>
                        <Input id="alamat-tujuan" placeholder="Alamat lengkap tujuan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alasan-pindah">Alasan Pindah</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="pekerjaan">Pekerjaan</option>
                          <option value="pendidikan">Pendidikan</option>
                          <option value="keluarga">Ikut Keluarga</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="keterangan-pindah">Keterangan</Label>
                        <textarea
                          id="keterangan-pindah"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Keterangan tambahan..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Batal</Button>
                      <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 to-orange-800">
                        Simpan Data Pindah
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
