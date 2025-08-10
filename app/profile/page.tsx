"use client";

import { useState } from "react";
import {
  motion,
  type Variants,
  easeOut, // <-- pakai easing function, bukan string
} from "framer-motion";
import Image from "next/image";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPin, Calendar, Target, Users } from "lucide-react";

// ===== Animations (typed) =====
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

// untuk efek hover kartu (bukan Variants, dipakai langsung di whileHover)
const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  transition: { duration: 0.3 },
};

// ===== Data Foto Aparatur =====
const staffFiles = [
  "NELLY EFFITA, S.Pd (KEPALA DESA SILUNGKANG TIGO) PERIODE 2023 - 2031.png",
  "GYOVANNI, S.AP - SEKRETARIS DESA.jpg",
  "FERINOF - KEPALA DUSUN STASIUN.jpg",
  "FERI HARYANTO - PETUGAS ADMINISTRASI.jpg",
  "RANNY FARHANI - PETUGAS ADMINISTRASI.jpg",
  "UBAIDILLAH - KEPALA DUSUN PASAR BARU.jpg",
  "UCOK SIMBRO - KEPALA DUSUN PASAR USANG.jpg",
  "ZUBER - KASI PEMERINTAHAN.jpg",
  "MUHAMMAD - KEPALA DUSUN LUBUAK NAN GODANG.jpg",
  "NARSI-PETUGAS ADMINISTRASI.png",
  "ELSA OKTAVIA - KASI PELAYANAN.jpg",
  "AGUNG PRAYETNO, S.Kom - KASI KESEJAHTERAAN.jpg",
  "BERLIANDO UTAMA - KAUR PERENCANAAN.jpg",
  "DEDE SAPUTRA, S.Kom - KAUR KEUANGAN.jpg",
  "EKA YESTI - PETUGAS ADMINISTRASI.jpg",
];

const staff = staffFiles.map((file) => ({
  file,
  src: `/${encodeURIComponent(file)}`, // aman utk spasi/koma
  name: file.replace(/\.[^/.]+$/, ""),
}));

// ===== Foto bagan struktur di /public =====
const STRUCTURE_IMAGE = "Struktur Desa.jpg";
const structureSrc = `/${encodeURIComponent(STRUCTURE_IMAGE)}`;

export default function ProfilePage() {
  const [open, setOpen] = useState(false); // lightbox bagan

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero */}
      <motion.section
        className="relative py-16 px-4 bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Desa Wisata Silungkang Tigo
            </h1>
            <p className="text-xl text-blue-100">
              Menyelami warisan budaya Minangkabau di tengah pesona alam Bukit Barisan
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="profil" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {["profil", "sejarah", "visi-misi", "aparatur"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="flex items-center gap-2" asChild>
                <motion.div whileHover={{ scale: 1.05, color: "#073046" }} transition={{ duration: 0.2 }}>
                  {tab === "profil" && <MapPin className="h-4 w-4" />}
                  {tab === "sejarah" && <Calendar className="h-4 w-4" />}
                  {tab === "visi-misi" && <Target className="h-4 w-4" />}
                  {tab === "aparatur" && <Users className="h-4 w-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ===== PROFIL ===== */}
          <TabsContent value="profil" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Profil Desa Silungkang Tigo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Gambaran Umum</h3>
                          <p className="text-slate-600 leading-relaxed">
                            Desa Silungkang Tigo terletak di Kecamatan Silungkang, Kota Sawahlunto, Sumatra Barat,
                            pada ketinggian 153 mdpl dengan luas 6,57 km². Berbatasan dengan Lembah Segar (utara),
                            IX Koto Sungai Lasi (selatan & barat), dan Kupitan (timur). Jarak 3 km ke kantor kecamatan,
                            10 km ke pusat kota, 82 km ke Padang.
                          </p>
                          <p className="text-slate-600 leading-relaxed">
                            Terdiri dari lima dusun: Stasiun, Bukik Kuniang, Pasar Baru, Pasar Usang, dan Lubuak Nan
                            Godang. Perkiraan penduduk 2.358 jiwa (2017), suhu 22–33°C, dilalui Sungai Batang Lasi.
                          </p>
                        </motion.div>
                      </div>

                      <motion.div className="space-y-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div whileHover={cardHover}>
                          <Card className="border border-slate-200">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-[#073046] mb-4">Data Geografis</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-slate-600">Luas Wilayah</span><span className="font-semibold">6,57 km²</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">Ketinggian</span><span className="font-semibold">153 mdpl</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">Suhu Udara</span><span className="font-semibold">22–33°C</span></div>
                                <div className="flex justify-between"><span className="text-slate-600">Penduduk</span><span className="font-semibold">±2.358 jiwa (2017)</span></div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== SEJARAH ===== */}
          <TabsContent value="sejarah" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Sejarah Desa Silungkang Tigo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Asal Usul Nama</h3>
                          <p className="text-slate-600 leading-relaxed">
                            “Silungkang” diduga dari kata “lungkang” (cekungan) dalam Minangkabau atau dari istilah
                            Sanskerta; hipotesis ini masih perlu kajian.
                          </p>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Warisan Sejarah</h3>
                          <p className="text-slate-600 leading-relaxed">
                            Terhubung dengan sejarah tambang Sawahlunto; Dusun Stasiun terkait jaringan kereta tua.
                          </p>
                        </motion.div>
                      </div>

                      <motion.div className="space-y-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.div whileHover={cardHover}>
                          <Card className="border border-slate-200">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-[#073046] mb-4">Tradisi Budaya</h4>
                              <div className="space-y-4">
                                <div className="flex gap-3">
                                  <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-sm">Wirid Pidato Adat</p>
                                    <p className="text-xs text-slate-600">Silungkang Rabona Tak Tum Bin</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== VISI-MISI ===== */}
          <TabsContent value="visi-misi" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Visi & Misi Desa Silungkang Tigo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Visi</h3>
                        <div className="rounded-xl border border-slate-200 p-5 bg-gradient-to-br from-white to-slate-50">
                          <p className="text-slate-700 leading-relaxed italic">
                            “Terwujudnya tata kelola pemerintahan desa yang baik dan bersih…”
                          </p>
                        </div>
                      </motion.div>
                    </div>
                    <div className="lg:col-span-2">
                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Misi</h3>
                        <ul className="space-y-3">
                          {[
                            "Pelayanan publik prima",
                            "Transparansi & kemandirian",
                            "Pembangunan merata & tepat guna",
                            "Lingkungan bersih, rapi, sehat",
                            "Perekonomian berbasis potensi desa",
                            "Kesejahteraan masyarakat meningkat",
                            "Peningkatan SDM & penggalian SDA",
                            "Lingkungan Islami & berakhlakul karimah",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Badge variant="secondary" className="mt-0.5">
                                {i + 1}
                              </Badge>
                              <span className="text-slate-700 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== APARATUR + BAGAN STRUKTUR ===== */}
          <TabsContent value="aparatur" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible" className="space-y-6">
              {/* Bagan Struktur */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Bagan Struktur Pemerintah Desa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <button
                    onClick={() => setOpen(true)}
                    className="block w-full text-left group"
                    title="Klik untuk perbesar"
                  >
                    <div className="relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                      <Image
                        src={structureSrc}
                        alt="Bagan Struktur Pemerintah Desa Silungkang Tigo"
                        width={1600}
                        height={820}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        priority
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">*Klik gambar untuk melihat ukuran penuh.</p>
                  </button>
                </CardContent>
              </Card>

              {/* Grid Aparatur */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Aparatur Desa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {staff.map(({ src, name }) => (
                      <motion.div
                        key={src}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      >
                        <Card className="overflow-hidden border-slate-200">
                          <div className="relative w-full h-72 bg-slate-100">
                            <Image
                              src={src}
                              alt={name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover"
                              priority={name.includes("KEPALA DESA")}
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                              <p className="text-white text-sm font-semibold line-clamp-2">{name}</p>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                              <span className="text-xs text-slate-600">Aktif</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0">
          <div className="relative w-full">
            <Image
              src={structureSrc}
              alt="Bagan Struktur Pemerintah Desa Silungkang Tigo - ukuran penuh"
              width={1920}
              height={980}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
