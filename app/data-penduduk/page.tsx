"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Home, UserCheck, Search, Plus, Eye, Edit, Trash2 } from "lucide-react"

export default function DataPendudukPage() {
  const kartuKeluarga = [
    {
      id: "3201012345678901",
      kepalaKeluarga: "Budi Santoso",
      alamat: "Jl. Merdeka No. 123",
      rt: "001",
      rw: "002",
      jumlahAnggota: 4,
      status: "aktif",
    },
    {
      id: "3201012345678902",
      kepalaKeluarga: "Siti Rahayu",
      alamat: "Jl. Sudirman No. 456",
      rt: "002",
      rw: "003",
      jumlahAnggota: 3,
      status: "aktif",
    },
    {
      id: "3201012345678903",
      kepalaKeluarga: "Ahmad Wijaya",
      alamat: "Jl. Diponegoro No. 789",
      rt: "003",
      rw: "001",
      jumlahAnggota: 5,
      status: "pindah",
    },
  ]

  const penduduk = [
    {
      id: "3201011234567890",
      nama: "Budi Santoso",
      nik: "3201011234567890",
      jenisKelamin: "L",
      tempatLahir: "Jakarta",
      tanggalLahir: "15/08/1980",
      agama: "Islam",
      pekerjaan: "Wiraswasta",
      status: "Kepala Keluarga",
    },
    {
      id: "3201011234567891",
      nama: "Sari Santoso",
      nik: "3201011234567891",
      jenisKelamin: "P",
      tempatLahir: "Bandung",
      tanggalLahir: "20/03/1985",
      agama: "Islam",
      pekerjaan: "Ibu Rumah Tangga",
      status: "Istri",
    },
    {
      id: "3201011234567892",
      nama: "Andi Santoso",
      nik: "3201011234567892",
      jenisKelamin: "L",
      tempatLahir: "Jakarta",
      tanggalLahir: "10/05/2010",
      agama: "Islam",
      pekerjaan: "Pelajar",
      status: "Anak",
    },
  ]

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
                  Data Penduduk
                </h1>
                <p className="text-sm text-slate-600">Kelola data Kartu Keluarga dan penduduk desa</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input placeholder="Cari penduduk..." className="pl-10 w-64" />
                </div>
                <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Data
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="kk" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="kk" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <Home className="h-4 w-4 mr-2" />
                  Kartu Keluarga
                </TabsTrigger>
                <TabsTrigger value="kepala" className="data-[state=active]:bg-[#073046] data-[state=active]:text-white">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Kepala Keluarga
                </TabsTrigger>
                <TabsTrigger
                  value="anggota"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Anggota Keluarga
                </TabsTrigger>
              </TabsList>

              <TabsContent value="kk" className="space-y-6">
                {/* Stats KK */}
                <div className="grid gap-6 md:grid-cols-4">
                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total KK</CardTitle>
                      <Home className="h-5 w-5 text-[#073046]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">892</div>
                      <p className="text-xs text-slate-500">Kartu Keluarga terdaftar</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">KK Aktif</CardTitle>
                      <UserCheck className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">875</div>
                      <p className="text-xs text-emerald-600">Masih berdomisili</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">KK Pindah</CardTitle>
                      <Users className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">17</div>
                      <p className="text-xs text-orange-600">Pindah domisili</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Rata-rata Anggota</CardTitle>
                      <Users className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">3.2</div>
                      <p className="text-xs text-purple-600">Per Kartu Keluarga</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Daftar KK */}
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Kartu Keluarga</CardTitle>
                    <CardDescription>Data Kartu Keluarga yang terdaftar di desa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {kartuKeluarga.map((kk) => (
                        <div
                          key={kk.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-[#073046]">No. KK: {kk.id}</h3>
                              <Badge
                                variant={kk.status === "aktif" ? "default" : "secondary"}
                                className={
                                  kk.status === "aktif"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-orange-100 text-orange-700"
                                }
                              >
                                {kk.status === "aktif" ? "Aktif" : "Pindah"}
                              </Badge>
                            </div>
                            <div className="text-sm text-slate-600">
                              <p>
                                <strong>Kepala Keluarga:</strong> {kk.kepalaKeluarga}
                              </p>
                              <p>
                                <strong>Alamat:</strong> {kk.alamat}, RT {kk.rt}/RW {kk.rw}
                              </p>
                              <p>
                                <strong>Jumlah Anggota:</strong> {kk.jumlahAnggota} orang
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
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
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kepala" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Kepala Keluarga</CardTitle>
                    <CardDescription>Data kepala keluarga yang terdaftar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {penduduk
                        .filter((p) => p.status === "Kepala Keluarga")
                        .map((kepala) => (
                          <div
                            key={kepala.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                          >
                            <div className="space-y-2">
                              <h3 className="font-semibold text-[#073046]">{kepala.nama}</h3>
                              <div className="text-sm text-slate-600 grid grid-cols-2 gap-4">
                                <p>
                                  <strong>NIK:</strong> {kepala.nik}
                                </p>
                                <p>
                                  <strong>Jenis Kelamin:</strong>{" "}
                                  {kepala.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                                </p>
                                <p>
                                  <strong>Tempat/Tgl Lahir:</strong> {kepala.tempatLahir}, {kepala.tanggalLahir}
                                </p>
                                <p>
                                  <strong>Pekerjaan:</strong> {kepala.pekerjaan}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="anggota" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Daftar Anggota Keluarga</CardTitle>
                    <CardDescription>Semua anggota keluarga yang terdaftar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {penduduk.map((anggota) => (
                        <div
                          key={anggota.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-[#073046]">{anggota.nama}</h3>
                              <Badge variant="outline" className="text-xs">
                                {anggota.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-slate-600 grid grid-cols-3 gap-4">
                              <p>
                                <strong>NIK:</strong> {anggota.nik}
                              </p>
                              <p>
                                <strong>Jenis Kelamin:</strong>{" "}
                                {anggota.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                              </p>
                              <p>
                                <strong>Tempat/Tgl Lahir:</strong> {anggota.tempatLahir}, {anggota.tanggalLahir}
                              </p>
                              <p>
                                <strong>Agama:</strong> {anggota.agama}
                              </p>
                              <p>
                                <strong>Pekerjaan:</strong> {anggota.pekerjaan}
                              </p>
                              <p>
                                <strong>Status dalam KK:</strong> {anggota.status}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
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
