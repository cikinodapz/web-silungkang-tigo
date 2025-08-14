"use client";

import { motion, type Variants, easeOut } from "framer-motion";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Building,
  Scale,
} from "lucide-react";

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

// Hover effect utk Card
const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  transition: { duration: 0.3 },
};

// ====== DATA DUMMY ======
const karangTaruna = {
  pengurus: [
    {
      name: "Rizki Pratama",
      position: "Ketua",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0812-1111-2222", email: "ketua.kt@silungkangtigo.desa.id" },
    },
    {
      name: "Sari Indah",
      position: "Wakil Ketua",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0813-2222-3333", email: "wakil.kt@silungkangtigo.desa.id" },
    },
    {
      name: "Andi Wijaya",
      position: "Sekretaris",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0814-3333-4444", email: "sekretaris.kt@silungkangtigo.desa.id" },
    },
    {
      name: "Maya Sari",
      position: "Bendahara",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0815-4444-5555", email: "bendahara.kt@silungkangtigo.desa.id" },
    },
  ],
  programs: [
    {
      title: "Pelatihan Keterampilan Digital",
      description: "Program pelatihan komputer dan media sosial untuk pemuda desa",
      schedule: "Setiap Sabtu, 14:00-16:00 WIB",
      participants: 45,
    },
    {
      title: "Gotong Royong Lingkungan",
      description: "Kegiatan bersih-bersih lingkungan dan penanaman pohon",
      schedule: "Minggu pertama setiap bulan",
      participants: 60,
    },
    {
      title: "Festival Pemuda Desa",
      description: "Event tahunan menampilkan kreativitas dan bakat pemuda",
      schedule: "Agustus 2024",
      participants: 150,
    },
  ],
  activities: [
    "Olahraga rutin setiap Minggu pagi",
    "Pelatihan wirausaha untuk pemuda",
    "Bakti sosial ke panti asuhan",
    "Lomba kreativitas antar RT",
  ],
} as const;

const lpm = {
  pengurus: [
    {
      name: "H. Syafruddin, S.Pd",
      position: "Ketua LPM",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0812-5555-6666", email: "ketua.lpm@silungkangtigo.desa.id" },
    },
    {
      name: "Hj. Ratna Sari",
      position: "Wakil Ketua",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0813-6666-7777", email: "wakil.lpm@silungkangtigo.desa.id" },
    },
    {
      name: "Drs. Bambang",
      position: "Sekretaris",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0814-7777-8888", email: "sekretaris.lpm@silungkangtigo.desa.id" },
    },
  ],
  bidangKerja: [
    {
      name: "Bidang Pendidikan",
      coordinator: "Ibu Siti Nurhaliza, S.Pd",
      programs: ["Bimbingan belajar gratis", "Perpustakaan desa", "Beasiswa anak kurang mampu"],
    },
    {
      name: "Bidang Kesehatan",
      coordinator: "Bapak Dr. Hendra",
      programs: ["Posyandu balita", "Senam lansia", "Penyuluhan kesehatan"],
    },
    {
      name: "Bidang Ekonomi",
      coordinator: "Ibu Dewi Fortuna, S.E",
      programs: ["Pelatihan UMKM", "Koperasi desa", "Pasar tani mingguan"],
    },
    {
      name: "Bidang Lingkungan",
      coordinator: "Bapak Agus Salim",
      programs: ["Bank sampah", "Penghijauan", "Konservasi air"],
    },
  ],
  programs: [
    {
      title: "Pemberdayaan Ekonomi Masyarakat",
      description: "Program peningkatan ekonomi keluarga melalui UMKM dan koperasi",
      target: "200 keluarga",
      status: "Berjalan",
    },
    {
      title: "Desa Sehat",
      description: "Program peningkatan kesehatan masyarakat dan lingkungan",
      target: "Seluruh warga",
      status: "Berjalan",
    },
    {
      title: "Desa Cerdas",
      description: "Program peningkatan pendidikan dan literasi digital",
      target: "Anak usia sekolah",
      status: "Perencanaan",
    },
  ],
} as const;

const pkk = {
  pengurus: [
    {
      name: "Hj. Aminah Budi",
      position: "Ketua PKK",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0812-8888-9999", email: "ketua.pkk@silungkangtigo.desa.id" },
    },
    {
      name: "Ibu Sari Dewi",
      position: "Wakil Ketua",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0813-9999-0000", email: "wakil.pkk@silungkangtigo.desa.id" },
    },
    {
      name: "Ibu Rina Marlina",
      position: "Sekretaris",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0814-0000-1111", email: "sekretaris.pkk@silungkangtigo.desa.id" },
    },
  ],
  pokja: [
    {
      name: "Pokja I - Penghayatan dan Pengamalan Pancasila",
      coordinator: "Ibu Fatimah",
      activities: ["Gotong royong", "Kerja bakti", "Peringatan hari besar nasional"],
    },
    {
      name: "Pokja II - Gotong Royong",
      coordinator: "Ibu Mariam",
      activities: ["Arisan RT", "Simpan pinjam", "Kegiatan sosial"],
    },
    {
      name: "Pokja III - Pangan, Sandang, Papan",
      coordinator: "Ibu Siti",
      activities: ["Warung hidup", "Pelatihan memasak", "Kerajinan tangan"],
    },
    {
      name: "Pokja IV - Pendidikan dan Keterampilan",
      coordinator: "Ibu Dewi",
      activities: ["PAUD", "Keaksaraan", "Kursus menjahit"],
    },
  ],
  programs: [
    {
      title: "PAUD Terpadu",
      description: "Pendidikan anak usia dini dengan kurikulum terpadu",
      participants: 35,
      schedule: "Senin-Jumat, 08:00-11:00",
    },
    {
      title: "Posyandu Balita",
      description: "Pelayanan kesehatan ibu dan anak",
      participants: 120,
      schedule: "Setiap tanggal 15",
    },
    {
      title: "Kelas Keterampilan",
      description: "Pelatihan menjahit, memasak, dan kerajinan",
      participants: 50,
      schedule: "Rabu & Jumat, 14:00-16:00",
    },
  ],
} as const;

const bpd = {
  pengurus: [
    {
      name: "H. Ahmad Yani",
      position: "Ketua BPD",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0812-2222-3333", email: "ketua.bpd@silungkangtigo.desa.id" },
    },
    {
      name: "Hj. Siti Aisyah",
      position: "Wakil Ketua",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0813-3333-4444", email: "wakil.bpd@silungkangtigo.desa.id" },
    },
    {
      name: "Bapak Joko Santoso",
      position: "Sekretaris",
      photo: "/placeholder.svg?height=120&width=120",
      contact: { phone: "0814-4444-5555", email: "sekretaris.bpd@silungkangtigo.desa.id" },
    },
  ],
  fungsi: [
    {
      name: "Fungsi Permusyawaratan",
      coordinator: "Bapak Ahmad Yani",
      activities: ["Musyawarah desa", "Pembahasan rencana pembangunan", "Pengambilan keputusan bersama"],
    },
    {
      name: "Fungsi Pengawasan",
      coordinator: "Hj. Siti Aisyah",
      activities: ["Pengawasan pelaksanaan perdes", "Pengelolaan keuangan desa", "Kinerja kepala desa"],
    },
    {
      name: "Fungsi Legislasi",
      coordinator: "Bapak Joko Santoso",
      activities: ["Pembentukan perdes", "Pembahasan anggaran desa", "Pengesahan rencana pembangunan"],
    },
  ],
  programs: [
    {
      title: "Musyawarah Desa Berkala",
      description: "Pertemuan rutin untuk membahas isu-isu desa",
      schedule: "Setiap 3 bulan sekali",
      participants: 100,
    },
    {
      title: "Pengawasan Proyek Desa",
      description: "Monitoring pelaksanaan proyek pembangunan desa",
      schedule: "Sepanjang tahun",
      participants: 20,
    },
    {
      title: "Pembentukan Peraturan Desa",
      description: "Penyusunan dan pengesahan perdes baru",
      schedule: "Sesuai kebutuhan",
      participants: 50,
    },
  ],
} as const;

export default function LembagaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero (match) */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lembaga Desa</h1>
            <p className="text-xl text-blue-100">
              Organisasi kemasyarakatan yang aktif membangun desa bersama
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="karang-taruna" className="w-full">
          {/* ===== TabsList (match gaya ProfilPage) ===== */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { key: "karang-taruna", label: "Karang Taruna", icon: Users },
              { key: "lpm", label: "LPM", icon: Building },
              { key: "pkk", label: "PKK", icon: Heart },
              { key: "bpd", label: "BPD", icon: Scale },
            ].map(({ key, label, icon: Icon }) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2" asChild>
                <motion.div whileHover={{ scale: 1.05, color: "#073046" }} transition={{ duration: 0.2 }}>
                  <Icon className="h-4 w-4" />
                  {label}
                </motion.div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ===== Karang Taruna ===== */}
          <TabsContent value="karang-taruna" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Karang Taruna Silungkang Tigo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang Karang Taruna</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Karang Taruna Silungkang Tigo adalah organisasi kepemudaan yang bergerak dalam bidang
                          kesejahteraan sosial, pemberdayaan pemuda, dan pengembangan masyarakat. Didirikan pada tahun
                          1985, organisasi ini menjadi wadah pemuda untuk berkreasi dan berkontribusi dalam pembangunan desa.
                        </p>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Struktur Kepengurusan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {karangTaruna.pengurus.map((p, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200">
                                <CardContent className="p-4 flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-[#073046] truncate">{p.name}</h4>
                                    <p className="text-sm text-slate-600 mb-2">{p.position}</p>
                                    <div className="space-y-1 text-xs text-slate-500">
                                      <div className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {p.contact.phone}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {p.contact.email}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div className="space-y-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Kegiatan Rutin</h4>
                            <div className="space-y-3">
                              {karangTaruna.activities.map((a, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0" />
                                  <span className="text-sm text-slate-600">{a}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Kontak</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">Balai Desa Silungkang Tigo</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">0812-1111-2222</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">karangtaruna@silungkangtigo.desa.id</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8">
                    <h3 className="text-xl font-bold text-[#073046] mb-4">Program Unggulan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {karangTaruna.programs.map((pr, i) => (
                        <motion.div key={i} whileHover={cardHover}>
                          <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-[#073046] mb-2">{pr.title}</h4>
                              <p className="text-sm text-slate-600 mb-3">{pr.description}</p>
                              <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-1 text-slate-500">
                                  <Calendar className="h-3 w-3" />
                                  {pr.schedule}
                                </div>
                                <div className="flex items-center gap-1 text-slate-500">
                                  <Users className="h-3 w-3" />
                                  {pr.participants} peserta
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== LPM ===== */}
          <TabsContent value="lpm" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Lembaga Pemberdayaan Masyarakat (LPM)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang LPM</h3>
                        <p className="text-slate-600 leading-relaxed">
                          LPM adalah mitra kerja pemerintah desa dalam memberdayakan masyarakat. Berperan sebagai
                          fasilitator, motivator, dan dinamisator dalam pembangunan partisipatif berkelanjutan.
                        </p>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Pengurus LPM</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {lpm.pengurus.map((p, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200 text-center">
                                <CardContent className="p-4">
                                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-3">
                                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                                  </div>
                                  <h4 className="font-bold text-[#073046] mb-1">{p.name}</h4>
                                  <p className="text-sm text-slate-600 mb-3">{p.position}</p>
                                  <div className="space-y-1 text-xs text-slate-500">
                                    <div className="flex items-center justify-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {p.contact.phone}
                                    </div>
                                    <div className="flex items-center justify-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {p.contact.email}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Bidang Kerja</h3>
                        <div className="space-y-4">
                          {lpm.bidangKerja.map((b, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200">
                                <CardContent className="p-4">
                                  <h4 className="font-bold text-[#073046] mb-2">{b.name}</h4>
                                  <p className="text-sm text-slate-600 mb-3">Koordinator: {b.coordinator}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {b.programs.map((pg, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {pg}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div className="space-y-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Program Utama</h4>
                            <div className="space-y-4">
                              {lpm.programs.map((pg, i) => (
                                <div key={i} className="border-l-4 border-[#073046] pl-4">
                                  <h5 className="font-semibold text-sm text-[#073046]">{pg.title}</h5>
                                  <p className="text-xs text-slate-600 mb-2">{pg.description}</p>
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Target: {pg.target}</span>
                                    <Badge variant={pg.status === "Berjalan" ? "default" : "secondary"}>
                                      {pg.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Kontak LPM</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">Kantor Desa Silungkang Tigo</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">0812-5555-6666</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">lpm@silungkangtigo.desa.id</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== PKK ===== */}
          <TabsContent value="pkk" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Pemberdayaan Kesejahteraan Keluarga (PKK)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang PKK</h3>
                        <p className="text-slate-600 leading-relaxed">
                          PKK memberdayakan perempuan untuk meningkatkan kesejahteraan keluarga dan masyarakat:
                          pendidikan, kesehatan, ekonomi keluarga, dan lingkungan.
                        </p>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Pengurus PKK</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {pkk.pengurus.map((p, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200 text-center">
                                <CardContent className="p-4">
                                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-3">
                                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                                  </div>
                                  <h4 className="font-bold text-[#073046] mb-1">{p.name}</h4>
                                  <p className="text-sm text-slate-600 mb-3">{p.position}</p>
                                  <div className="space-y-1 text-xs text-slate-500">
                                    <div className="flex items-center justify-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {p.contact.phone}
                                    </div>
                                    <div className="flex items-center justify-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {p.contact.email}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Kelompok Kerja (Pokja)</h3>
                        <div className="space-y-4">
                          {pkk.pokja.map((k, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200">
                                <CardContent className="p-4">
                                  <h4 className="font-bold text-[#073046] mb-2">{k.name}</h4>
                                  <p className="text-sm text-slate-600 mb-3">Koordinator: {k.coordinator}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {k.activities.map((ac, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {ac}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div className="space-y-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Program Unggulan</h4>
                            <div className="space-y-4">
                              {pkk.programs.map((pg, i) => (
                                <div key={i} className="border-l-4 border-pink-500 pl-4">
                                  <h5 className="font-semibold text-sm text-[#073046]">{pg.title}</h5>
                                  <p className="text-xs text-slate-600 mb-2">{pg.description}</p>
                                  <div className="space-y-1 text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {pg.participants} peserta
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {pg.schedule}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Kontak PKK</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">Balai PKK Desa</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">0812-8888-9999</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">pkk@silungkangtigo.desa.id</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ===== BPD ===== */}
          <TabsContent value="bpd" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Badan Permusyawaratan Desa (BPD)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang BPD</h3>
                        <p className="text-slate-600 leading-relaxed">
                          BPD mewujudkan fungsi perwakilan masyarakat desa: menampung aspirasi, mengawasi kinerja
                          pemerintah desa, dan menyusun peraturan desa bersama pemerintah desa.
                        </p>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Pengurus BPD</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {bpd.pengurus.map((p, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200 text-center">
                                <CardContent className="p-4">
                                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-3">
                                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                                  </div>
                                  <h4 className="font-bold text-[#073046] mb-1">{p.name}</h4>
                                  <p className="text-sm text-slate-600 mb-3">{p.position}</p>
                                  <div className="space-y-1 text-xs text-slate-500">
                                    <div className="flex items-center justify-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {p.contact.phone}
                                    </div>
                                    <div className="flex items-center justify-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {p.contact.email}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h3 className="text-xl font-bold text-[#073046] mb-4">Fungsi Utama</h3>
                        <div className="space-y-4">
                          {bpd.fungsi.map((f, i) => (
                            <motion.div key={i} whileHover={cardHover}>
                              <Card className="border border-slate-200">
                                <CardContent className="p-4">
                                  <h4 className="font-bold text-[#073046] mb-2">{f.name}</h4>
                                  <p className="text-sm text-slate-600 mb-3">Koordinator: {f.coordinator}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {f.activities.map((ac, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {ac}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div className="space-y-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Program Unggulan</h4>
                            <div className="space-y-4">
                              {bpd.programs.map((pg, i) => (
                                <div key={i} className="border-l-4 border-[#073046] pl-4">
                                  <h5 className="font-semibold text-sm text-[#073046]">{pg.title}</h5>
                                  <p className="text-xs text-slate-600 mb-2">{pg.description}</p>
                                  <div className="space-y-1 text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {pg.schedule}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {pg.participants} peserta
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div whileHover={cardHover}>
                        <Card className="border border-slate-200">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-[#073046] mb-4">Kontak BPD</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">Kantor BPD Desa Silungkang Tigo</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">0812-2222-3333</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <span className="text-slate-600">bpd@silungkangtigo.desa.id</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
