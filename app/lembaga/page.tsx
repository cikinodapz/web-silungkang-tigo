"use client"

import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Phone, Mail, MapPin, Calendar, Heart, Building, Scale } from "lucide-react"

export default function LembagaPage() {
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
  }

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
  }

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
  }

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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lembaga Desa</h1>
            <p className="text-xl text-blue-100">Organisasi kemasyarakatan yang aktif membangun desa bersama</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="karang-taruna" className="w-full">
          <TabsList className="w-full mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max md:grid md:grid-cols-4 md:gap-2 md:space-x-0">
              <TabsTrigger value="karang-taruna" className="flex items-center gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                Karang Taruna
              </TabsTrigger>
              <TabsTrigger value="lpm" className="flex items-center gap-2 whitespace-nowrap">
                <Building className="h-4 w-4" />
                LPM
              </TabsTrigger>
              <TabsTrigger value="pkk" className="flex items-center gap-2 whitespace-nowrap">
                <Heart className="h-4 w-4" />
                PKK
              </TabsTrigger>
              <TabsTrigger value="bpd" className="flex items-center gap-2 whitespace-nowrap">
                <Scale className="h-4 w-4" />
                BPD
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="karang-taruna" className="space-y-6">
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
                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang Karang Taruna</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Karang Taruna Silungkang Tigo adalah organisasi kepemudaan yang bergerak dalam bidang
                        kesejahteraan sosial, pemberdayaan pemuda, dan pengembangan masyarakat. Didirikan pada tahun
                        1985, organisasi ini telah menjadi wadah bagi pemuda desa untuk berkreasi dan berkontribusi
                        dalam pembangunan desa.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Struktur Kepengurusan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {karangTaruna.pengurus.map((pengurus, index) => (
                          <Card key={index} className="border border-slate-200">
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                <img
                                  src={pengurus.photo || "/placeholder.svg"}
                                  alt={pengurus.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#073046] truncate">{pengurus.name}</h4>
                                <p className="text-sm text-slate-600 mb-2">{pengurus.position}</p>
                                <div className="space-y-1 text-xs text-slate-500">
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {pengurus.contact.phone}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {pengurus.contact.email}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border border-slate-200">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#073046] mb-4">Kegiatan Rutin</h4>
                        <div className="space-y-3">
                          {karangTaruna.activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-slate-600">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

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
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#073046] mb-4">Program Unggulan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {karangTaruna.programs.map((program, index) => (
                      <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-[#073046] mb-2">{program.title}</h4>
                          <p className="text-sm text-slate-600 mb-3">{program.description}</p>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-1 text-slate-500">
                              <Calendar className="h-3 w-3" />
                              {program.schedule}
                            </div>
                            <div className="flex items-center gap-1 text-slate-500">
                              <Users className="h-3 w-3" />
                              {program.participants} peserta
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lpm" className="space-y-6">
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
                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang LPM</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Lembaga Pemberdayaan Masyarakat (LPM) adalah mitra kerja pemerintah desa dalam memberdayakan
                        masyarakat. LPM berperan sebagai fasilitator, motivator, dan dinamisator dalam proses
                        pembangunan partisipatif yang berkelanjutan.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Pengurus LPM</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {lpm.pengurus.map((pengurus, index) => (
                          <Card key={index} className="border border-slate-200 text-center">
                            <CardContent className="p-4">
                              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-3">
                                <img
                                  src={pengurus.photo || "/placeholder.svg"}
                                  alt={pengurus.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="font-bold text-[#073046] mb-1">{pengurus.name}</h4>
                              <p className="text-sm text-slate-600 mb-3">{pengurus.position}</p>
                              <div className="space-y-1 text-xs text-slate-500">
                                <div className="flex items-center justify-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {pengurus.contact.phone}
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {pengurus.contact.email}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Bidang Kerja</h3>
                      <div className="space-y-4">
                        {lpm.bidangKerja.map((bidang, index) => (
                          <Card key={index} className="border border-slate-200">
                            <CardContent className="p-4">
                              <h4 className="font-bold text-[#073046] mb-2">{bidang.name}</h4>
                              <p className="text-sm text-slate-600 mb-3">Koordinator: {bidang.coordinator}</p>
                              <div className="flex flex-wrap gap-2">
                                {bidang.programs.map((program, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {program}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border border-slate-200">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#073046] mb-4">Program Utama</h4>
                        <div className="space-y-4">
                          {lpm.programs.map((program, index) => (
                            <div key={index} className="border-l-4 border-[#073046] pl-4">
                              <h5 className="font-semibold text-sm text-[#073046]">{program.title}</h5>
                              <p className="text-xs text-slate-600 mb-2">{program.description}</p>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">Target: {program.target}</span>
                                <Badge variant={program.status === "Berjalan" ? "default" : "secondary"}>
                                  {program.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pkk" className="space-y-6">
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
                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang PKK</h3>
                      <p className="text-slate-600 leading-relaxed">
                        PKK Desa Silungkang Tigo adalah organisasi kemasyarakatan yang memberdayakan perempuan untuk
                        meningkatkan kesejahteraan keluarga dan masyarakat. PKK berperan aktif dalam bidang pendidikan,
                        kesehatan, ekonomi keluarga, dan kelestarian lingkungan.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Pengurus PKK</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {pkk.pengurus.map((pengurus, index) => (
                          <Card key={index} className="border border-slate-200 text-center">
                            <CardContent className="p-4">
                              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-3">
                                <img
                                  src={pengurus.photo || "/placeholder.svg"}
                                  alt={pengurus.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="font-bold text-[#073046] mb-1">{pengurus.name}</h4>
                              <p className="text-sm text-slate-600 mb-3">{pengurus.position}</p>
                              <div className="space-y-1 text-xs text-slate-500">
                                <div className="flex items-center justify-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {pengurus.contact.phone}
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {pengurus.contact.email}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Kelompok Kerja (Pokja)</h3>
                      <div className="space-y-4">
                        {pkk.pokja.map((pokja, index) => (
                          <Card key={index} className="border border-slate-200">
                            <CardContent className="p-4">
                              <h4 className="font-bold text-[#073046] mb-2">{pokja.name}</h4>
                              <p className="text-sm text-slate-600 mb-3">Koordinator: {pokja.coordinator}</p>
                              <div className="flex flex-wrap gap-2">
                                {pokja.activities.map((activity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {activity}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border border-slate-200">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#073046] mb-4">Program Unggulan</h4>
                        <div className="space-y-4">
                          {pkk.programs.map((program, index) => (
                            <div key={index} className="border-l-4 border-pink-500 pl-4">
                              <h5 className="font-semibold text-sm text-[#073046]">{program.title}</h5>
                              <p className="text-xs text-slate-600 mb-2">{program.description}</p>
                              <div className="space-y-1 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {program.participants} peserta
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {program.schedule}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bpd" className="space-y-6">
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
                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-3">Tentang BPD</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Badan Permusyawaratan Desa (BPD) adalah lembaga yang mewujudkan fungsi perwakilan masyarakat desa dalam menampung dan menyalurkan aspirasi masyarakat, melakukan pengawasan terhadap kinerja pemerintah desa, serta bersama-sama dengan pemerintah desa menyusun peraturan desa.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Pengurus BPD</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {bpd.pengurus.map((pengurus, index) => (
                          <Card key={index} className="border border-slate-200 text-center">
                            <CardContent className="p-4">
                              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-3">
                                <img
                                  src={pengurus.photo || "/placeholder.svg"}
                                  alt={pengurus.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="font-bold text-[#073046] mb-1">{pengurus.name}</h4>
                              <p className="text-sm text-slate-600 mb-3">{pengurus.position}</p>
                              <div className="space-y-1 text-xs text-slate-500">
                                <div className="flex items-center justify-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {pengurus.contact.phone}
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {pengurus.contact.email}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#073046] mb-4">Fungsi Utama</h3>
                      <div className="space-y-4">
                        {bpd.fungsi.map((fungsi, index) => (
                          <Card key={index} className="border border-slate-200">
                            <CardContent className="p-4">
                              <h4 className="font-bold text-[#073046] mb-2">{fungsi.name}</h4>
                              <p className="text-sm text-slate-600 mb-3">Koordinator: {fungsi.coordinator}</p>
                              <div className="flex flex-wrap gap-2">
                                {fungsi.activities.map((activity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {activity}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border border-slate-200">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-[#073046] mb-4">Program Unggulan</h4>
                        <div className="space-y-4">
                          {bpd.programs.map((program, index) => (
                            <div key={index} className="border-l-4 border-[#073046] pl-4">
                              <h5 className="font-semibold text-sm text-[#073046]">{program.title}</h5>
                              <p className="text-xs text-slate-600 mb-2">{program.description}</p>
                              <div className="space-y-1 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {program.schedule}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {program.participants} peserta
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}