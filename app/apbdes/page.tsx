"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3, FileText, Plus } from "lucide-react"

export default function APBDesPage() {
  const anggaranData = [
    {
      kategori: "Pendapatan Asli Desa",
      anggaran: 150000000,
      realisasi: 120000000,
      persentase: 80,
      status: "on-track",
    },
    {
      kategori: "Dana Desa",
      anggaran: 800000000,
      realisasi: 800000000,
      persentase: 100,
      status: "completed",
    },
    {
      kategori: "Alokasi Dana Desa",
      anggaran: 300000000,
      realisasi: 250000000,
      persentase: 83,
      status: "on-track",
    },
    {
      kategori: "Bantuan Keuangan Provinsi",
      anggaran: 100000000,
      realisasi: 75000000,
      persentase: 75,
      status: "warning",
    },
  ]

  const belanja = [
    {
      kategori: "Belanja Pegawai",
      anggaran: 400000000,
      realisasi: 320000000,
      persentase: 80,
    },
    {
      kategori: "Belanja Barang dan Jasa",
      anggaran: 300000000,
      realisasi: 180000000,
      persentase: 60,
    },
    {
      kategori: "Belanja Modal",
      anggaran: 500000000,
      realisasi: 350000000,
      persentase: 70,
    },
    {
      kategori: "Belanja Tak Terduga",
      anggaran: 50000000,
      realisasi: 25000000,
      persentase: 50,
    },
  ]

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700"
      case "on-track":
        return "bg-blue-100 text-blue-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      case "danger":
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
                  Pengelolaan APBDes
                </h1>
                <p className="text-sm text-slate-600">Anggaran Pendapatan dan Belanja Desa</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="hover:bg-[#073046]/10 bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Laporan
                </Button>
                <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Item
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="pendapatan"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Pendapatan
                </TabsTrigger>
                <TabsTrigger
                  value="belanja"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Belanja
                </TabsTrigger>
                <TabsTrigger
                  value="laporan"
                  className="data-[state=active]:bg-[#073046] data-[state=active]:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Laporan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-6 md:grid-cols-4">
                  <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total Pendapatan</CardTitle>
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">1.35M</div>
                      <p className="text-xs text-emerald-600">Target: 1.35M (100%)</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total Belanja</CardTitle>
                      <TrendingDown className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">875K</div>
                      <p className="text-xs text-blue-600">Target: 1.25M (70%)</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Sisa Anggaran</CardTitle>
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">475K</div>
                      <p className="text-xs text-purple-600">Tersisa 35%</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Realisasi</CardTitle>
                      <BarChart3 className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#073046]">78%</div>
                      <p className="text-xs text-orange-600">Dari target tahunan</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Pendapatan Overview */}
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Realisasi Pendapatan</CardTitle>
                    <CardDescription>Progress pendapatan berdasarkan sumber</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {anggaranData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-[#073046]">{item.kategori}</h4>
                              <Badge className={getStatusColor(item.status)}>{item.persentase}%</Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-[#073046]">{formatRupiah(item.realisasi)}</p>
                              <p className="text-xs text-slate-500">dari {formatRupiah(item.anggaran)}</p>
                            </div>
                          </div>
                          <Progress value={item.persentase} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pendapatan" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Detail Pendapatan Desa</CardTitle>
                    <CardDescription>Rincian sumber pendapatan dan realisasinya</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {anggaranData.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-[#073046]">{item.kategori}</h3>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status === "completed"
                                ? "Selesai"
                                : item.status === "on-track"
                                  ? "On Track"
                                  : item.status === "warning"
                                    ? "Perhatian"
                                    : "Bahaya"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600">Target Anggaran</p>
                              <p className="font-semibold text-[#073046]">{formatRupiah(item.anggaran)}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">Realisasi</p>
                              <p className="font-semibold text-emerald-600">{formatRupiah(item.realisasi)}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">Persentase</p>
                              <p className="font-semibold text-[#073046]">{item.persentase}%</p>
                            </div>
                          </div>
                          <Progress value={item.persentase} className="h-2 mt-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="belanja" className="space-y-6">
                <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#073046]">Detail Belanja Desa</CardTitle>
                    <CardDescription>Rincian pengeluaran dan realisasinya</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {belanja.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-[#073046]">{item.kategori}</h3>
                            <Badge variant="outline" className="text-[#073046]">
                              {item.persentase}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600">Anggaran</p>
                              <p className="font-semibold text-[#073046]">{formatRupiah(item.anggaran)}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">Terpakai</p>
                              <p className="font-semibold text-red-600">{formatRupiah(item.realisasi)}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">Sisa</p>
                              <p className="font-semibold text-emerald-600">
                                {formatRupiah(item.anggaran - item.realisasi)}
                              </p>
                            </div>
                          </div>
                          <Progress value={item.persentase} className="h-2 mt-3" />
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
                      <CardTitle className="text-[#073046]">Laporan Bulanan</CardTitle>
                      <CardDescription>Ringkasan keuangan per bulan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">Januari 2024</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">Februari 2024</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">Maret 2024</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#073046]">Laporan Tahunan</CardTitle>
                      <CardDescription>Laporan komprehensif per tahun</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">APBDes 2024</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">APBDes 2023</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                          <span className="font-medium">APBDes 2022</span>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
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
