"use client";

import { useState, useEffect } from "react";
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
  Eye,
  File,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface AnggotaKeluarga {
  id: string;
  nik: string;
  nama: string;
  no_akta_kelahiran: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  golongan_darah: string;
  agama: string;
  status_hubungan: string;
  status_perkawinan: string;
  pendidikan_akhir: string;
  pekerjaan: string;
  nama_ayah: string;
  nama_ibu: string;
  scan_ktp?: string;
  scan_kk?: string;
  scan_akta_lahir?: string;
  scan_buku_nikah?: string;
  kk: { no_kk: string };
}

export default function AnggotaKeluargaPage() {
  const [anggotaKeluargas, setAnggotaKeluargas] = useState<AnggotaKeluarga[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Function to construct file URL
  const getFileUrl = (type: string, filePath: string) => {
    const filename = filePath.split("/").pop();
    return `http://localhost:3000/uploads/${type}/${filename}`;
  };

  // Fetch all anggota keluarga on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/kelola-kepala-keluarga/getAllAnggotaKeluarga");
        const data = Array.isArray(response) ? response : response.data || [];
        setAnggotaKeluargas(data);
      } catch (err) {
        setError(`Gagal memuat data: ${err.message || "Terjadi kesalahan"}`);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle delete anggota keluarga
  const handleDeleteAnggota = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus Anggota Keluarga ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    try {
      await fetchData(`/kelola-kepala-keluarga/deleteAnggotaKeluarga/${id}`, {
        method: "DELETE",
      });
      setAnggotaKeluargas(anggotaKeluargas.filter((anggota) => anggota.id !== id));
      if (
        anggotaKeluargas.length - 1 <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Anggota Keluarga berhasil dihapus!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menghapus Anggota Keluarga: ${
          err.message || "Terjadi kesalahan"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle view anggota keluarga details
  const handleViewDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetchData(`/kelola-kepala-keluarga/getAnggotaKeluarga/${id}`);
      const anggotaKeluarga = response.anggotaKeluarga || response;

      await Swal.fire({
        title: "Detail Anggota Keluarga",
        html: `
          <div style="text-align: left; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: #2d3748;">
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #2b6cb0; margin-bottom: 15px; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Informasi Pribadi
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div style="color: #718096; font-weight: 500;">NIK</div>
                <div>${anggotaKeluarga.nik}</div>
                <div style="color: #718096; font-weight: 500;">Nama</div>
                <div>${anggotaKeluarga.nama}</div>
                <div style="color: #718096; font-weight: 500;">No. Akta Kelahiran</div>
                <div>${anggotaKeluarga.no_akta_kelahiran || 'Tidak ada'}</div>
                <div style="color: #718096; font-weight: 500;">Jenis Kelamin</div>
                <div>${anggotaKeluarga.jenis_kelamin}</div>
                <div style="color: #718096; font-weight: 500;">Tempat Lahir</div>
                <div>${anggotaKeluarga.tempat_lahir}</div>
                <div style="color: #718096; font-weight: 500;">Tanggal Lahir</div>
                <div>${new Date(anggotaKeluarga.tanggal_lahir).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                <div style="color: #718096; font-weight: 500;">Golongan Darah</div>
                <div>${anggotaKeluarga.golongan_darah}</div>
                <div style="color: #718096; font-weight: 500;">Agama</div>
                <div>${anggotaKeluarga.agama}</div>
                <div style="color: #718096; font-weight: 500;">Status Hubungan</div>
                <div>${anggotaKeluarga.status_hubungan}</div>
                <div style="color: #718096; font-weight: 500;">Status Perkawinan</div>
                <div>${anggotaKeluarga.status_perkawinan}</div>
                <div style="color: #718096; font-weight: 500;">Pendidikan Terakhir</div>
                <div>${anggotaKeluarga.pendidikan_akhir}</div>
                <div style="color: #718096; font-weight: 500;">Pekerjaan</div>
                <div>${anggotaKeluarga.pekerjaan}</div>
                <div style="color: #718096; font-weight: 500;">Nama Ayah</div>
                <div>${anggotaKeluarga.nama_ayah}</div>
                <div style="color: #718096; font-weight: 500;">Nama Ibu</div>
                <div>${anggotaKeluarga.nama_ibu}</div>
              </div>
              <h3 style="color: #2b6cb0; margin: 20px 0 15px; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Informasi Kartu Keluarga
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div style="color: #718096; font-weight: 500;">No. KK</div>
                <div>${anggotaKeluarga.kk?.no_kk || 'Tidak ada'}</div>
              </div>
              <h3 style="color: #2b6cb0; margin: 20px 0 15px; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Dokumen
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div style="color: #718096; font-weight: 500;">Scan KTP</div>
                <div>${
                  anggotaKeluarga.scan_ktp 
                    ? `<a href="#" onclick="window.handleViewScan('ktp', '${anggotaKeluarga.scan_ktp}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500; hover:text-blue-800;">Lihat KTP</a>` 
                    : 'Tidak ada'
                }</div>
                <div style="color: #718096; font-weight: 500;">Scan KK</div>
                <div>${
                  anggotaKeluarga.scan_kk 
                    ? `<a href="#" onclick="window.handleViewScan('kk', '${anggotaKeluarga.scan_kk}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500; hover:text-blue-800;">Lihat KK</a>` 
                    : 'Tidak ada'
                }</div>
                <div style="color: #718096; font-weight: 500;">Scan Akta Lahir</div>
                <div>${
                  anggotaKeluarga.scan_akta_lahir 
                    ? `<a href="#" onclick="window.handleViewScan('akta', '${anggotaKeluarga.scan_akta_lahir}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500; hover:text-blue-800;">Lihat Akta Lahir</a>` 
                    : 'Tidak ada'
                }</div>
                <div style="color: #718096; font-weight: 500;">Scan Buku Nikah</div>
                <div>${
                  anggotaKeluarga.scan_buku_nikah 
                    ? `<a href="#" onclick="window.handleViewScan('nikah', '${anggotaKeluarga.scan_buku_nikah}')" style="color: #2b6cb0; text-decoration: none; font-weight: 500; hover:text-blue-800;">Lihat Buku Nikah</a>` 
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
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          content: 'swal2-content-custom',
        },
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.backgroundColor = '#ffffff';
            popup.style.borderRadius = '12px';
            popup.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.15)';
            popup.style.maxHeight = '90vh';
            popup.style.overflowY = 'auto';
          }
          const title = Swal.getTitle();
          if (title) {
            title.style.fontSize = '1.75em';
            title.style.color = '#2b6cb0';
            title.style.fontWeight = '600';
            title.style.marginBottom = '1.5em';
            title.style.textAlign = 'center';
          }
          // Add hover effect for links
          const links = document.querySelectorAll('.swal2-content a');
          links.forEach(link => {
            link.addEventListener('mouseover', () => {
              (link as HTMLElement).style.textDecoration = 'underline';
              (link as HTMLElement).style.color = '#1a4971';
            });
            link.addEventListener('mouseout', () => {
              (link as HTMLElement).style.textDecoration = 'none';
              (link as HTMLElement).style.color = '#2b6cb0';
            });
          });
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memuat detail Anggota Keluarga: ${
          err.message || "Terjadi kesalahan"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter anggota keluarga based on search query
  const filteredAnggotaKeluargas = anggotaKeluargas.filter(
    (anggota) =>
      anggota.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anggota.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anggota.kk?.no_kk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAnggotaKeluargas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAnggotaKeluargas.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle view scan file in a popup
  const handleViewScan = (type: string, filename: string) => {
    const fileUrl = getFileUrl(type, filename);
    const fileExt = filename.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png'].includes(fileExt);
    const isPdf = fileExt === 'pdf';

    let htmlContent = '';
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
        popup: 'swal2-popup-custom',
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.backgroundColor = '#ffffff';
          popup.style.borderRadius = '12px';
          popup.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.15)';
        }
      },
    });
  };

  // Expose handleViewScan to window for SweetAlert links
  useEffect(() => {
    (window as any).handleViewScan = handleViewScan;
    return () => {
      delete (window as any).handleViewScan;
    };
  }, []);

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
                    Data Anggota Keluarga
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola data Anggota Keluarga desa
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
                  onClick={() => router.push("/anggota-keluarga/tambah")}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Anggota Keluarga
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
            {!isLoading && filteredAnggotaKeluargas.length === 0 && !error && (
              <div className="text-center text-gray-600">
                Tidak ada data Anggota Keluarga.
              </div>
            )}

            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Daftar Anggota Keluarga
                </CardTitle>
                <CardDescription>Kelola data Anggota Keluarga</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold">NIK</th>
                        <th className="px-4 py-3 font-semibold">Nama</th>
                        <th className="px-4 py-3 font-semibold">No. KK</th>
                        <th className="px-4 py-3 font-semibold">Jenis Kelamin</th>
                        <th className="px-4 py-3 font-semibold">Tanggal Lahir</th>
                        <th className="px-4 py-3 font-semibold">Status Hubungan</th>
                        <th className="px-4 py-3 font-semibold">Pekerjaan</th>
                        <th className="px-4 py-3 font-semibold">KTP</th>
                        <th className="px-4 py-3 font-semibold">KK</th>
                        <th className="px-4 py-3 font-semibold">Akta Lahir</th>
                        <th className="px-4 py-3 font-semibold">Buku Nikah</th>
                        <th className="px-4 py-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((anggota) => (
                        <tr
                          key={anggota.id}
                          className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                        >
                          <td className="px-4 py-3">{anggota.nik}</td>
                          <td className="px-4 py-3">{anggota.nama}</td>
                          <td className="px-4 py-3">{anggota.kk?.no_kk || '-'}</td>
                          <td className="px-4 py-3">{anggota.jenis_kelamin}</td>
                          <td className="px-4 py-3">
                            {new Date(anggota.tanggal_lahir).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">{anggota.status_hubungan}</td>
                          <td className="px-4 py-3">{anggota.pekerjaan}</td>
                          <td className="px-4 py-3">
                            {anggota.scan_ktp ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() => handleViewScan("ktp", anggota.scan_ktp!)}
                              >
                                <File className="h-4 w-4 mr-1" />
                                Lihat
                              </Button>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {anggota.scan_kk ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() => handleViewScan("kk", anggota.scan_kk!)}
                              >
                                <File className="h-4 w-4 mr-1" />
                                Lihat
                              </Button>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {anggota.scan_akta_lahir ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() => handleViewScan("akta", anggota.scan_akta_lahir!)}
                              >
                                <File className="h-4 w-4 mr-1" />
                                Lihat
                              </Button>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {anggota.scan_buku_nikah ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() => handleViewScan("nikah", anggota.scan_buku_nikah!)}
                              >
                                <File className="h-4 w-4 mr-1" />
                                Lihat
                              </Button>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() => handleViewDetails(anggota.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() =>
                                  router.push(`/anggota-keluarga/edit/${anggota.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteAnggota(anggota.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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