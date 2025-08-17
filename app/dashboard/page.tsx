"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  UserCheck,
  Users,
  DollarSign,
  Newspaper,
  Store,
  FileText,
  Zap,
  TrendingUp,
  ArrowRight,
  Activity,
  MapPin,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  type ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

// Dynamically import chart components to avoid SSR issues
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);

type DashboardData = {
  penduduk: {
    totalKK: number;
    totalKepalaKeluarga: number;
    totalAnggotaKeluarga: number;
  };
  mutasiPenduduk: {
    totalLahirMasuk: number;
    totalMeninggal: number;
    totalPindahKeluar: number;
  };
  apbdes: {
    totalDana: number;
    totalRecords: number;
  };
  berita: {
    totalBerita: number;
    totalKategoriBerita: number;
    latestBerita: { id: number; judul: string; createdAt: string }[];
  };
  lapakDesa: {
    totalUMKM: number;
    totalProduk: number;
  };
  produkHukum: {
    totalProdukHukum: number;
    totalKategoriProdukHukum: number;
  };
  potensiDesa: {
    totalPotensiDesa: number;
  };
};

type VisitorStats = {
  totalVisitors: number;
  totalVisits: number;
};

// Corrected ChartOptions type using Chart.js types
const chartOptions: ChartOptions<"bar" | "doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 12,
          weight: "bold",
          family: "'Inter', sans-serif",
        },
        color: "#1e40af",
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(30, 64, 175, 0.9)",
      titleFont: {
        size: 14,
        weight: "bold",
        family: "'Inter', sans-serif",
      },
      bodyFont: {
        size: 12,
        family: "'Inter', sans-serif",
      },
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        color: "#6b7280",
        font: {
          size: 11,
          family: "'Inter', sans-serif",
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#6b7280",
        font: {
          size: 11,
          family: "'Inter', sans-serif",
        },
      },
    },
  },
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/kelola-kk/getDashboardSummary");
        if (response.data) {
          setDashboardData(response.data);
        } else {
          setError("Data dashboard tidak tersedia dari API");
        }
      } catch (err) {
        setError(
          `Gagal memuat data: ${
            err instanceof Error ? err.message : "Terjadi kesalahan"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    const loadVisitorStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/kelola-kk/stats`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setVisitorStats({
            totalVisitors: data.totalVisitors ?? 0,
            totalVisits: data.totalVisits ?? 0,
          });
        } else {
          console.error("Gagal memuat visitor stats:", data?.message || data);
        }
      } catch (e) {
        console.error("Error fetch visitor stats:", e);
      }
    };

    loadDashboardData();
    loadVisitorStats();
  }, []);

  // Fallback data to prevent chart errors
  const defaultDashboardData: DashboardData = {
    penduduk: { totalKK: 0, totalKepalaKeluarga: 0, totalAnggotaKeluarga: 0 },
    mutasiPenduduk: {
      totalLahirMasuk: 0,
      totalMeninggal: 0,
      totalPindahKeluar: 0,
    },
    apbdes: { totalDana: 0, totalRecords: 0 },
    berita: { totalBerita: 0, totalKategoriBerita: 0, latestBerita: [] },
    lapakDesa: { totalUMKM: 0, totalProduk: 0 },
    produkHukum: { totalProdukHukum: 0, totalKategoriProdukHukum: 0 },
    potensiDesa: { totalPotensiDesa: 0 },
  };

  const pendudukChartData = {
    labels: ["KK", "Kepala Keluarga", "Anggota Keluarga"],
    datasets: [
      {
        label: "Jumlah",
        data: [
          dashboardData?.penduduk?.totalKK ||
            defaultDashboardData.penduduk.totalKK,
          dashboardData?.penduduk?.totalKepalaKeluarga ||
            defaultDashboardData.penduduk.totalKepalaKeluarga,
          dashboardData?.penduduk?.totalAnggotaKeluarga ||
            defaultDashboardData.penduduk.totalAnggotaKeluarga,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const mutasiChartData = {
    labels: ["Lahir/Masuk", "Meninggal", "Pindah/Keluar"],
    datasets: [
      {
        label: "Jumlah",
        data: [
          dashboardData?.mutasiPenduduk?.totalLahirMasuk ||
            defaultDashboardData.mutasiPenduduk.totalLahirMasuk,
          dashboardData?.mutasiPenduduk?.totalMeninggal ||
            defaultDashboardData.mutasiPenduduk.totalMeninggal,
          dashboardData?.mutasiPenduduk?.totalPindahKeluar ||
            defaultDashboardData.mutasiPenduduk.totalPindahKeluar,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(249, 115, 22, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
          "rgb(249, 115, 22)",
        ],
        borderWidth: 2,
      },
    ],
  };

  interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ElementType;
    gradient: string;
    delay?: number;
    onMoreInfo?: () => void;
  }

  interface ActionCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    description?: string;
    icon: React.ElementType;
    gradient: string;
    buttonText?: string;
    onButtonClick?: () => void;
    delay?: number;
  }

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    gradient,
    delay = 0,
    onMoreInfo,
  }: StatCardProps) => (
    <Card
      className="group relative overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative pb-10">
        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:scale-105 transition-transform duration-300">
          {value}
        </div>
        <p className="text-xs text-gray-500">{subtitle}</p>
        {onMoreInfo && (
          <Button
            variant="outline"
            size="sm"
            className={`absolute bottom-3 right-3 text-xs font-medium border-gray-200 hover:border-gray-300 bg-white/80 hover:bg-white group-hover:bg-gradient-to-r ${gradient} group-hover:text-white group-hover:border-transparent transition-all`}
            onClick={onMoreInfo}
          >
            Selengkapnya
            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const ActionCard = ({
    title,
    value,
    subtitle,
    description,
    icon: Icon,
    gradient,
    buttonText,
    onButtonClick,
    delay = 0,
  }: ActionCardProps) => (
    <Card
      className="group relative overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
            {value}
          </div>
          <p className="text-xs text-gray-500">{subtitle}</p>
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </div>
        {buttonText && onButtonClick && (
          <Button
            className={`w-full bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 text-white group-hover:scale-105`}
            onClick={onButtonClick}
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-40 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
            <div className="flex h-20 items-center justify-between px-6 md:px-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-blue-900 hover:bg-blue-100/50 transition-colors p-2 rounded-xl hover:scale-105 duration-300" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-700 bg-clip-text text-transparent">
                    Dashboard Desa
                  </h1>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ringkasan Informasi & Statistik Desa
                  </p>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 hover:from-blue-800 hover:via-blue-600 hover:to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => router.push("/data-penduduk")}
              >
                <Activity className="h-4 w-4 mr-2" />
                Lihat Data Penduduk
              </Button>
            </div>
          </header>

          <main className="p-6 space-y-8">
            {/* Error & Loading States */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 text-sm p-6 rounded-xl text-center animate-in fade-in shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-medium">Terjadi Kesalahan</span>
                </div>
                {error}
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-blue-600">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-lg font-medium">
                    Memuat data dashboard...
                  </span>
                </div>
              </div>
            )}

            {!isLoading && !dashboardData && !error && (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-lg">Tidak ada data dashboard tersedia</p>
              </div>
            )}

            {dashboardData && (
              <div className="space-y-8 animate-in fade-in duration-700">
                {/* Main Stats Grid */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Statistik Utama
                    </h2>
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                      title="Total Kartu Keluarga"
                      value={(
                        dashboardData.penduduk.totalKK || 0
                      ).toLocaleString("id-ID")}
                      subtitle="KK terdaftar di sistem"
                      icon={Home}
                      gradient="from-blue-600 to-blue-700"
                      delay={0}
                      onMoreInfo={() => router.push("/data-penduduk")}
                    />
                    <StatCard
                      title="Kepala Keluarga"
                      value={(
                        dashboardData.penduduk.totalKepalaKeluarga || 0
                      ).toLocaleString("id-ID")}
                      subtitle="Kepala keluarga aktif"
                      icon={UserCheck}
                      gradient="from-emerald-600 to-emerald-700"
                      delay={100}
                      onMoreInfo={() => router.push("/kepala-keluarga")}
                    />
                    <StatCard
                      title="Total Anggota Keluarga"
                      value={(
                        dashboardData.penduduk.totalAnggotaKeluarga || 0
                      ).toLocaleString("id-ID")}
                      subtitle="Jiwa terdaftar"
                      icon={Users}
                      gradient="from-amber-600 to-orange-600"
                      delay={200}
                      onMoreInfo={() => router.push("/anggota-keluarga")}
                    />
                    <StatCard
                      title="Dana APBDes"
                      value={`Rp ${(
                        dashboardData.apbdes.totalDana || 0
                      ).toLocaleString("id-ID")}`}
                      subtitle={`${
                        dashboardData.apbdes.totalRecords || 0
                      } catatan anggaran`}
                      icon={DollarSign}
                      gradient="from-purple-600 to-purple-700"
                      delay={300}
                      onMoreInfo={() => router.push("/apbdes")}
                    />
                  </div>
                </div>

                {/* Charts Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Analisis Data
                    </h2>
                    <Activity className="h-6 w-6 text-violet-600" />
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardHeader className="relative">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          Demografi Penduduk
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Distribusi data kependudukan desa
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="h-80">
                          <Bar
                            data={pendudukChartData}
                            options={chartOptions}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardHeader className="relative">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          Mutasi Penduduk
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Pergerakan dan perubahan data penduduk
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="h-80">
                          <Doughnut
                            data={mutasiChartData}
                            options={{
                              ...chartOptions,
                              cutout: "60%",
                              plugins: {
                                ...chartOptions.plugins,
                                legend: {
                                  ...chartOptions.plugins?.legend,
                                  position: "right",
                                },
                              },
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Services & Information Grid */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Layanan & Informasi
                    </h2>
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3">
                    <ActionCard
                      title="Berita & Informasi"
                      value={(
                        dashboardData.berita.totalBerita || 0
                      ).toLocaleString("id-ID")}
                      subtitle={`${
                        dashboardData.berita.totalKategoriBerita || 0
                      } kategori berita`}
                      description={
                        dashboardData.berita.latestBerita.length > 0
                          ? `Berita Terkini : ${dashboardData.berita.latestBerita[0]?.judul.substring(
                              0,
                              50
                            )}...`
                          : "Belum ada berita terbaru"
                      }
                      icon={Newspaper}
                      gradient="from-cyan-600 to-blue-600"
                      buttonText="Lihat Semua Berita"
                      onButtonClick={() => router.push("/berita")}
                      delay={0}
                    />

                    <ActionCard
                      title="Lapak Desa (UMKM)"
                      value={(
                        dashboardData.lapakDesa.totalUMKM || 0
                      ).toLocaleString("id-ID")}
                      subtitle={`${
                        dashboardData.lapakDesa.totalProduk || 0
                      } produk tersedia`}
                      description="Platform digital untuk UMKM desa"
                      icon={Store}
                      gradient="from-rose-600 to-pink-600"
                      buttonText="Jelajahi UMKM"
                      onButtonClick={() => router.push("/lapak-desa/umkm")}
                      delay={100}
                    />

                    <ActionCard
                      title="Produk Hukum & Potensi"
                      value={(
                        dashboardData.produkHukum.totalProdukHukum || 0
                      ).toLocaleString("id-ID")}
                      subtitle={`${
                        dashboardData.produkHukum.totalKategoriProdukHukum || 0
                      } kategori hukum`}
                      description={`${
                        dashboardData.potensiDesa.totalPotensiDesa || 0
                      } potensi desa teridentifikasi`}
                      icon={FileText}
                      gradient="from-indigo-600 to-purple-600"
                      buttonText="Lihat Dokumen"
                      onButtonClick={() =>
                        router.push("/produk-hukum/produk-hukum")
                      }
                      delay={200}
                    />
                  </div>
                </div>

                {/* Enhanced Visitor Stats Card */}
                <Card className="group relative overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-in fade-in duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-red-50 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-pink-600 to-red-600 shadow-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          Statistik Pengunjung
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Data pengunjung unik & total kunjungan
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative p-6 rounded-xl bg-gradient-to-r from-pink-50 to-red-50 shadow-inner group/item hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-600 opacity-0 group-hover/item:opacity-5 transition-opacity duration-500" />
                      <p className="text-sm text-gray-600 mb-2 font-medium">
                        Pengunjung Unik
                      </p>
                      <p className="text-3xl font-bold text-pink-700 group-hover/item:scale-110 transition-transform duration-300">
                        {(visitorStats?.totalVisitors || 0).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                    <div className="relative p-6 rounded-xl bg-gradient-to-r from-teal-50 to-green-50 shadow-inner group/item hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-green-600 opacity-0 group-hover/item:opacity-5 transition-opacity duration-500" />
                      <p className="text-sm text-gray-600 mb-2 font-medium">
                        Total Kunjungan
                      </p>
                      <p className="text-3xl font-bold text-teal-700 group-hover/item:scale-110 transition-transform duration-300">
                        {(visitorStats?.totalVisits || 0).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
