"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Eye,
  File,
  ArrowUpDown,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

// ====== Types ======
interface KKRel {
  no_kk?: string;
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  kelurahan?: string;
  dusun?: string;
  rt?: string;
  rw?: string;
  kode_pos?: string;
}

interface KepalaKeluarga {
  id: string;
  KK: string;
  nik: string;
  nama: string;
  no_akta_kelahiran: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  golongan_darah: string;
  agama: string;
  status_perkawinan: string;
  pendidikan_akhir: string;
  pekerjaan: string;
  nama_ayah: string;
  nama_ibu: string;
  scan_ktp?: string;
  scan_kk?: string;
  scan_akta_lahir?: string;
  scan_buku_nikah?: string;
  // sebagian API mengembalikan relasi kk, kita buat optional
  kk?: KKRel[]; // kk[0]?.dusun
  // atau ada API yang sudah flatten dusun langsung:
  dusun?: string;
}

interface FamilyCard {
  id: string;
  no_kk: string;
}

// ====== Utils ======
const getFileUrl = (type: string, filePath: string) => {
  const filename = filePath.split("/").pop();
  return `http://localhost:3000/uploads/${type}/${filename}`;
};

const getDusun = (k: KepalaKeluarga) =>
  (k.dusun && k.dusun.trim()) ||
  (k.kk && k.kk[0] && (k.kk[0].dusun || "").trim()) ||
  "";

type SortKey =
  | "nik"
  | "nama"
  | "jenis_kelamin"
  | "tanggal_lahir"
  | "agama"
  | "pekerjaan"
  | "dusun";

type SortDirection = "asc" | "desc";

export default function KepalaKeluargaPage() {
  const [kepalaKeluargas, setKepalaKeluargas] = useState<KepalaKeluarga[]>([]);
  const [familyCards, setFamilyCards] = useState<FamilyCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDusun, setSelectedDusun] = useState<string>("ALL");

  // sorting state
  const [sortKey, setSortKey] = useState<SortKey>("nama");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Fetch kepala keluarga & kk tanpa kepala
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [kepalaResponse, kkResponse] = await Promise.all([
          fetchData("/kelola-kepala-keluarga/getAllKepalaKeluarga"),
          fetchData("/kelola-kk/getKKWithoutKepalaKeluarga"),
        ]);

        const kepalaData = Array.isArray(kepalaResponse)
          ? (kepalaResponse as KepalaKeluarga[])
          : (kepalaResponse.data as KepalaKeluarga[]) || [];

        setKepalaKeluargas(kepalaData);

        setFamilyCards(
          Array.isArray(kkResponse) ? kkResponse : kkResponse.data || []
        );
      } catch (err: any) {
        setError(`Gagal memuat data: ${err?.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Delete
  const handleDeleteKepala = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus Kepala Keluarga ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/kelola-kepala-keluarga/deleteKepalaKeluarga/${id}`, {
        method: "DELETE",
      });
      setKepalaKeluargas((prev) => prev.filter((k) => k.id !== id));

      // perbaiki halaman bila data habis di halaman saat ini
      setCurrentPage((prev) => {
        const remaining = kepalaKeluargas.length - 1;
        if (remaining <= (prev - 1) * itemsPerPage && prev > 1) {
          return prev - 1;
        }
        return prev;
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kepala Keluarga berhasil dihapus!",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menghapus Kepala Keluarga: ${
          err?.message || "Terjadi kesalahan"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Detail
  const handleViewDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetchData(
        `/kelola-kepala-keluarga/getDetailKepalaKeluarga/${id}`
      );
      const { kepalaKeluarga } = response;
      const kkData: KKRel = (kepalaKeluarga.kk && kepalaKeluarga.kk[0]) || {};

      await Swal.fire({
        title: "Detail Kepala Keluarga",
        html: `
          <div style="text-align: left; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: #2d3748;">
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #2b6cb0; margin-bottom: 15px; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Informasi Pribadi
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div style="color: #718096; font-weight: 500;">NIK</div>
                <div>${kepalaKeluarga.nik}</div>
                <div style="color: #718096; font-weight: 500;">Nama</div>
                <div>${kepalaKeluarga.nama}</div>
                <div style="color: #718096; font-weight: 500;">No. Akta Kelahiran</div>
                <div>${kepalaKeluarga.no_akta_kelahiran || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Jenis Kelamin</div>
                <div>${kepalaKeluarga.jenis_kelamin}</div>
                <div style="color: #718096; font-weight: 500;">Tempat Lahir</div>
                <div>${kepalaKeluarga.tempat_lahir}</div>
                <div style="color: #718096; font-weight: 500;">Tanggal Lahir</div>
                <div>${new Date(kepalaKeluarga.tanggal_lahir).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                <div style="color: #718096; font-weight: 500;">Golongan Darah</div>
                <div>${kepalaKeluarga.golongan_darah}</div>
                <div style="color: #718096; font-weight: 500;">Agama</div>
                <div>${kepalaKeluarga.agama}</div>
                <div style="color: #718096; font-weight: 500;">Status Perkawinan</div>
                <div>${kepalaKeluarga.status_perkawinan}</div>
                <div style="color: #718096; font-weight: 500;">Pendidikan Terakhir</div>
                <div>${kepalaKeluarga.pendidikan_akhir}</div>
                <div style="color: #718096; font-weight: 500;">Pekerjaan</div>
                <div>${kepalaKeluarga.pekerjaan}</div>
                <div style="color: #718096; font-weight: 500;">Nama Ayah</div>
                <div>${kepalaKeluarga.nama_ayah}</div>
                <div style="color: #718096; font-weight: 500;">Nama Ibu</div>
                <div>${kepalaKeluarga.nama_ibu}</div>
              </div>
              <h3 style="color: #2b6cb0; margin: 20px 0 15px; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Informasi Kartu Keluarga
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div style="color: #718096; font-weight: 500;">No. KK</div>
                <div>${kkData.no_kk || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Provinsi</div>
                <div>${kkData.provinsi || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Kabupaten</div>
                <div>${kkData.kabupaten || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Kecamatan</div>
                <div>${kkData.kecamatan || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Kelurahan</div>
                <div>${kkData.kelurahan || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Dusun</div>
                <div>${kkData.dusun || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">RT/RW</div>
                <div>${kkData.rt && kkData.rw ? `${kkData.rt}/${kkData.rw}` : 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Kode Pos</div>
                <div>${kkData.kode_pos || 'Tidak ada'}</div>
              </div>
              <h3 style="color: #2b6cb0; margin: 20px 0 15px; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Dokumen
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div style="color: #718096; font-weight: 500;">Scan KTP</div>
                <div>${
                  kepalaKeluarga.scan_ktp 
                    ? `<a href="#" onclick="window.handleViewScan('ktp', '${kepalaKeluarga.scan_ktp}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">Lihat KTP</a>` 
                    : 'Tidak ada'
                }</div>
                <div style="color: #718096; font-weight: 500;">Scan KK</div>
                <div>${
                  kepalaKeluarga.scan_kk 
                    ? `<a href="#" onclick="window.handleViewScan('kk', '${kepalaKeluarga.scan_kk}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">Lihat KK</a>` 
                    : 'Tidak ada'
                }</div>
                <div style="color: #718096; font-weight: 500;">Scan Akta Lahir</div>
                <div>${
                  kepalaKeluarga.scan_akta_lahir 
                    ? `<a href="#" onclick="window.handleViewScan('akta', '${kepalaKeluarga.scan_akta_lahir}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">Lihat Akta Lahir</a>` 
                    : 'Tidak ada'
                }</div>
                <div style="color: #718096; font-weight: 500;">Scan Buku Nikah</div>
                <div>${
                  kepalaKeluarga.scan_buku_nikah 
                    ? `<a href="#" onclick="window.handleViewScan('nikah', '${kepalaKeluarga.scan_buku_nikah}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">Lihat Buku Nikah</a>` 
                    : 'Tidak ada'
                }</div>
              </div>
            </div>
          </div>
        `,
        icon: "info",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#2b6cb0",
        width: "800px",
        padding: "2em",
        customClass: {
          popup: "swal2-popup-custom",
          title: "swal2-title-custom",
          content: "swal2-content-custom",
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.backgroundColor = "#ffffff";
            popup.style.borderRadius = "12px";
            popup.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.15)";
            popup.style.maxHeight = "90vh";
            popup.style.overflowY = "auto";
          }
          const title = Swal.getTitle();
          if (title) {
            title.style.fontSize = "1.75em";
            title.style.color = "#2b6cb0";
            title.style.fontWeight = "600";
            title.style.marginBottom = "1.5em";
            title.style.textAlign = "center";
          }
          const links = document.querySelectorAll(".swal2-content a");
          links.forEach((link) => {
            link.addEventListener("mouseover", () => {
              (link as HTMLElement).style.textDecoration = "underline";
              (link as HTMLElement).style.color = "#1a4971";
            });
            link.addEventListener("mouseout", () => {
              (link as HTMLElement).style.textDecoration = "none";
              (link as HTMLElement).style.color = "#2b6cb0";
            });
          });
        },
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memuat detail Kepala Keluarga: ${
          err?.message || "Terjadi kesalahan"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Preview Scan
  const handleViewScan = (type: string, filename: string) => {
    const fileUrl = getFileUrl(type, filename);
    const fileExt = filename.split(".").pop()?.toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "webp"].includes(fileExt || "");
    const isPdf = fileExt === "pdf";

    let htmlContent = "";
    if (isImage) {
      htmlContent = `<img src="${fileUrl}" alt="Document" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px;" />`;
    } else if (isPdf) {
      htmlContent = `<iframe src="${fileUrl}" style="width: 100%; height: 80vh; border: none; border-radius: 8px;"></iframe>`;
    } else {
      htmlContent = `<p>File tidak didukung untuk pratinjau. <a href="${fileUrl}" target="_blank" style="color: #2b6cb0; text-decoration: none; font-weight: 500;">Unduh file</a></p>`;
    }

    Swal.fire({
      title: `Pratinjau ${type.toUpperCase()}`,
      html: htmlContent,
      showConfirmButton: true,
      confirmButtonText: "Tutup",
      confirmButtonColor: "#2b6cb0",
      width: isImage ? "auto" : "80%",
      padding: "1.5em",
      customClass: {
        popup: "swal2-popup-custom",
      },
    });
  };

  // expose untuk link di SweetAlert
  useEffect(() => {
    (window as any).handleViewScan = handleViewScan;
    return () => {
      delete (window as any).handleViewScan;
    };
  }, []);

  // ====== Derived data: daftar dusun unik ======
  const dusunOptions = useMemo(() => {
    const set = new Set<string>();
    kepalaKeluargas.forEach((k) => {
      const d = getDusun(k);
      if (d) set.add(d);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "id"));
  }, [kepalaKeluargas]);

  // ====== Filter + Search + Sort + Paginate ======
  const processed = useMemo(() => {
    // search
    let out = kepalaKeluargas.filter((k) => {
      const q = searchQuery.toLowerCase();
      const inSearch =
        k.nik.toLowerCase().includes(q) ||
        k.nama.toLowerCase().includes(q) ||
        k.KK.toLowerCase().includes(q);
      const matchDusun =
        selectedDusun === "ALL" || getDusun(k) === selectedDusun;
      return inSearch && matchDusun;
    });

    // sort
    out.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const valA =
        sortKey === "dusun"
          ? getDusun(a)
          : (a[sortKey] as unknown as string) ?? "";
      const valB =
        sortKey === "dusun"
          ? getDusun(b)
          : (b[sortKey] as unknown as string) ?? "";

      if (sortKey === "tanggal_lahir") {
        const da = new Date(a.tanggal_lahir).getTime();
        const db = new Date(b.tanggal_lahir).getTime();
        return (da - db) * dir;
      }
      return valA.localeCompare(valB, "id") * dir;
    });

    return out;
  }, [kepalaKeluargas, searchQuery, selectedDusun, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processed.slice(indexOfFirstItem, indexOfLastItem);

  // reset ke halaman 1 saat filter/sort/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDusun, sortKey, sortDir]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const onHeaderClick = (key: SortKey) => {
    if (sortKey === key) {
      // toggle asc/desc
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortButton: React.FC<{ label: string; column: SortKey }> = ({
    label,
    column,
  }) => {
    const active = sortKey === column;
    return (
      <button
        type="button"
        className={`inline-flex items-center gap-1 select-none ${
          active ? "text-blue-900 font-semibold" : "text-blue-900/80"
        }`}
        onClick={() => onHeaderClick(column)}
        title="Urutkan"
      >
        {label}
        <ArrowUpDown
          className={`h-4 w-4 ${
            active ? (sortDir === "asc" ? "rotate-180" : "") : "opacity-60"
          } transition-transform`}
        />
      </button>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm">
            <div className="flex h-20 items-center justify-between px-6 md:px-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-blue-900 hover:bg-blue-100 transition-colors p-2 rounded-md" />
                <div>
                  <h1 className="text-2xl font-semibold text-blue-900">
                    Data Kepala Keluarga
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola data Kepala Keluarga desa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari NIK, nama, atau No. KK..."
                    className="pl-10 w-64 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => router.push("/kepala-keluarga/tambah-kepala")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Kepala Keluarga
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in">
                {error}
              </div>
            )}
            {isLoading && (
              <div className="text-center text-gray-600 animate-pulse">
                Memuat...
              </div>
            )}
            {!isLoading && processed.length === 0 && !error && (
              <div className="text-center text-gray-600">
                Tidak ada data Kepala Keluarga.
              </div>
            )}

            {/* Kartu ringkas */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 bg-white/80 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Kepala Keluarga
                  </CardTitle>
                  <User className="h-5 w-5 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">
                    {kepalaKeluargas.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Kepala Keluarga terdaftar
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/80 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    KK Tanpa Kepala
                  </CardTitle>
                  <User className="h-5 w-5 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">
                    {familyCards.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Kartu Keluarga tanpa kepala
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FILTER BAR di atas tabel */}
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-900">
                  Daftar Kepala Keluarga
                </CardTitle>
                <CardDescription>Kelola data Kepala Keluarga</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Filter Dusun</label>
                    <select
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedDusun}
                      onChange={(e) => setSelectedDusun(e.target.value)}
                    >
                      <option value="ALL">Semua Dusun</option>
                      {dusunOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {selectedDusun !== "ALL" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-1 border-gray-300"
                        onClick={() => setSelectedDusun("ALL")}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  {/* <div className="text-xs text-gray-500">
                    Klik judul kolom untuk mengurutkan (ASC/DESC)
                  </div> */}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="NIK" column="nik" />
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="Nama" column="nama" />
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="Jenis Kelamin" column="jenis_kelamin" />
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="Tanggal Lahir" column="tanggal_lahir" />
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="Agama" column="agama" />
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="Pekerjaan" column="pekerjaan" />
                        </th>
                        <th className="px-4 py-3 font-semibold">KTP</th>
                        <th className="px-4 py-3 font-semibold">KK</th>
                        <th className="px-4 py-3 font-semibold">Akta Lahir</th>
                        <th className="px-4 py-3 font-semibold">Buku Nikah</th>
                        <th className="px-4 py-3 font-semibold">
                          <SortButton label="Dusun" column="dusun" />
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((kepala) => {
                        const dusun = getDusun(kepala) || "-";
                        return (
                          <tr
                            key={kepala.id}
                            className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                          >
                            <td className="px-4 py-3">{kepala.nik}</td>
                            <td className="px-4 py-3">{kepala.nama}</td>
                            <td className="px-4 py-3">{kepala.jenis_kelamin}</td>
                            <td className="px-4 py-3">
                              {new Date(kepala.tanggal_lahir).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">{kepala.agama}</td>
                            <td className="px-4 py-3">{kepala.pekerjaan}</td>

                            <td className="px-4 py-3">
                              {kepala.scan_ktp ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                  onClick={() =>
                                    handleViewScan("ktp", kepala.scan_ktp!)
                                  }
                                >
                                  <File className="h-4 w-4 mr-1" />
                                  Lihat
                                </Button>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {kepala.scan_kk ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                  onClick={() =>
                                    handleViewScan("kk", kepala.scan_kk!)
                                  }
                                >
                                  <File className="h-4 w-4 mr-1" />
                                  Lihat
                                </Button>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {kepala.scan_akta_lahir ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                  onClick={() =>
                                    handleViewScan("akta", kepala.scan_akta_lahir!)
                                  }
                                >
                                  <File className="h-4 w-4 mr-1" />
                                  Lihat
                                </Button>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {kepala.scan_buku_nikah ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                  onClick={() =>
                                    handleViewScan(
                                      "nikah",
                                      kepala.scan_buku_nikah!
                                    )
                                  }
                                >
                                  <File className="h-4 w-4 mr-1" />
                                  Lihat
                                </Button>
                              ) : (
                                "-"
                              )}
                            </td>

                            {/* Kolom DUSUN baru */}
                            <td className="px-4 py-3">{dusun}</td>

                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                  onClick={() => handleViewDetails(kepala.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                  onClick={() =>
                                    router.push(
                                      `/kepala-keluarga/edit-kepala/${kepala.id}`
                                    )
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-red-100 text-red-600 border-red-200"
                                  onClick={() => handleDeleteKepala(kepala.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Sebelumnya
                    </Button>
                    <span className="text-sm text-gray-600">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      Berikutnya
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
