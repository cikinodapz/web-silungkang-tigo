"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

export default function AddKKPage() {
  const [formData, setFormData] = useState({
    no_kk: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    dusun: "",
    rw: "",
    rt: "",
    kode_pos: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetchData("/kelola-kk/createKK", {
        method: "POST",
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kartu Keluarga berhasil ditambahkan!",
      });
      router.push("/data-penduduk");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambah Kartu Keluarga: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                  Tambah Kartu Keluarga
                </h1>
                <p className="text-sm text-slate-600">Masukkan data Kartu Keluarga baru</p>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-[#073046]">Form Tambah Kartu Keluarga</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="no_kk">Nomor KK</Label>
                    <Input
                      id="no_kk"
                      name="no_kk"
                      placeholder="Masukkan nomor KK"
                      value={formData.no_kk}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provinsi">Provinsi</Label>
                    <Input
                      id="provinsi"
                      name="provinsi"
                      placeholder="Masukkan provinsi"
                      value={formData.provinsi}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kabupaten">Kabupaten</Label>
                    <Input
                      id="kabupaten"
                      name="kabupaten"
                      placeholder="Masukkan kabupaten"
                      value={formData.kabupaten}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kecamatan">Kecamatan</Label>
                    <Input
                      id="kecamatan"
                      name="kecamatan"
                      placeholder="Masukkan kecamatan"
                      value={formData.kecamatan}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kelurahan">Kelurahan</Label>
                    <Input
                      id="kelurahan"
                      name="kelurahan"
                      placeholder="Masukkan kelurahan"
                      value={formData.kelurahan}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dusun">Dusun</Label>
                    <Input
                      id="dusun"
                      name="dusun"
                      placeholder="Masukkan dusun"
                      value={formData.dusun}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rw">RW</Label>
                      <Input
                        id="rw"
                        name="rw"
                        placeholder="Masukkan RW"
                        value={formData.rw}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:ring-[#073046]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rt">RT</Label>
                      <Input
                        id="rt"
                        name="rt"
                        placeholder="Masukkan RT"
                        value={formData.rt}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:ring-[#073046]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kode_pos">Kode Pos</Label>
                    <Input
                      id="kode_pos"
                      name="kode_pos"
                      placeholder="Masukkan kode pos"
                      value={formData.kode_pos}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-[#073046]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/data-penduduk")}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Kartu Keluarga"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}