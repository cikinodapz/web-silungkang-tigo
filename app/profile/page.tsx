"use client"

import { motion } from "framer-motion"
import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Target, Eye, Phone, Mail, Users } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const cardHover = {
  hover: { scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", transition: { duration: 0.3 } }
}

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Desa Wisata Silungkang Tigo</h1>
            <p className="text-xl text-blue-100">
              Menyelami warisan budaya Minangkabau di tengah pesona alam Bukit Barisan
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="profil" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {["profil", "sejarah", "wisata", "kontak"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex items-center gap-2"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.05, color: "#073046" }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === "profil" && <MapPin className="h-4 w-4" />}
                  {tab === "sejarah" && <Calendar className="h-4 w-4" />}
                  {tab === "wisata" && <Eye className="h-4 w-4" />}
                  {tab === "kontak" && <Phone className="h-4 w-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.div>
              </TabsTrigger>
            ))}
          </TabsList>

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
                            Desa Silungkang Tigo terletak di Kecamatan Silungkang, Kota Sawahlunto, Sumatra Barat, pada ketinggian 153 meter di atas permukaan laut. Desa ini berada di cekungan sempit Bukit Barisan dengan luas wilayah sekitar 6,57 km². Berbatasan dengan Kecamatan Lembah Segar di utara, Kecamatan IX Koto Sungai Lasi di selatan dan barat, serta Kecamatan Kupitan di timur, desa ini hanya berjarak 3 km dari kantor kecamatan, 10 km dari pusat Kota Sawahlunto, dan 82 km dari Padang.
                          </p>
                          <p className="text-slate-600 leading-relaxed">
                            Desa ini terdiri dari lima dusun: Stasiun, Bukik Kuniang, Pasar Baru, Pasar Usang, dan Lubuak Nan Godang. Dengan penduduk sekitar 2.358 jiwa (2017), desa ini memiliki suhu udara 22–33°C dan dialiri Sungai Batang Lasi yang menambah pesona alamnya.
                          </p>
                        </motion.div>
                      </div>

                      <motion.div
                        className="space-y-6"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.div whileHover={cardHover}>
                          <Card className="border border-slate-200">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-[#073046] mb-4">Data Geografis</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Luas Wilayah:</span>
                                  <span className="font-semibold">6,57 km²</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Ketinggian:</span>
                                  <span className="font-semibold">153 mdpl</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Suhu Udara:</span>
                                  <span className="font-semibold">22–33°C</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Jumlah Penduduk:</span>
                                  <span className="font-semibold">2.358 jiwa (2017)</span>
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
                            Nama "Silungkang" masih menyimpan misteri. Beberapa menyebutnya berasal dari kata "lungkang" (lurah atau selokan) dalam bahasa Minangkabau, merujuk pada letak geografis desa di cekungan. Ada pula dugaan bahwa nama ini berasal dari bahasa Sanskerta yang berarti "lowongan batu yang tinggi," meskipun hal ini masih memerlukan penelitian lebih lanjut.
                          </p>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Warisan Sejarah</h3>
                          <p className="text-slate-600 leading-relaxed">
                            Desa ini merupakan bagian dari Nagari Silungkang yang membentang sepanjang 9 km. Sejarahnya terkait erat dengan perkembangan Kota Sawahlunto sebagai pusat tambang batu bara pada masa kolonial Belanda, meninggalkan jejak seperti dusun Stasiun yang kemungkinan terkait dengan jalur kereta api tua.
                          </p>
                        </motion.div>
                      </div>
                      <motion.div
                        className="space-y-6"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.div whileHover={cardHover}>
                          <Card className="border border-slate-200">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-[#073046] mb-4">Tradisi Budaya</h4>
                              <div className="space-y-4">
                                <div className="flex gap-3">
                                  <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
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

          <TabsContent value="wisata" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Desa Wisata Silungkang Tigo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Daya Tarik Wisata</h3>
                          <p className="text-slate-600 leading-relaxed">
                            Desa Wisata Silungkang Tigo menawarkan pengalaman budaya Minangkabau yang autentik. Pengunjung dapat menikmati tradisi seperti wirid pidato adat Silungkang Rabona Tak Tum Bin, serta menjelajahi keindahan alam Sungai Batang Lasi.
                          </p>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Fasilitas Wisata</h3>
                          <ul className="text-slate-600 leading-relaxed list-disc pl-5">
                            <li>Areal parkir</li>
                            <li>Balai pertemuan</li>
                            <li>Kios suvenir (tas dan jam dinding dari limbah songket, Rp2.000–Rp20.000)</li>
                            <li>Tempat makan</li>
                            <li>Musholla</li>
                            <li>Homestay</li>
                            <li>Paket wisata budaya (Rp50.000–Rp1.000.000)</li>
                          </ul>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                          <h3 className="text-xl font-bold text-[#073046] mb-3">Pustaka Desa</h3>
                          <p className="text-slate-600 leading-relaxed">
                            Pustaka Desa Silungkang Tigo, berlokasi di bekas Kantor Kerapatan Adat Nagari, masuk nominasi perpustakaan terbaik nasional 2025. Pustaka ini menjadi pusat literasi dan kreativitas, menghasilkan suvenir inovatif dari limbah songket.
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="kontak" className="space-y-6">
            <motion.div variants={tabContentVariants} initial="hidden" animate="visible">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Kontak dan Informasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <motion.div
                        className="flex items-center gap-2 text-slate-600"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <MapPin className="h-5 w-5" />
                        <span>Kantor Desa Silungkang Tigo, Dusun Stasiun, Kecamatan Silungkang, Kota Sawahlunto</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-slate-600"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Phone className="h-5 w-5" />
                        <span>081310285188 / 08126140770</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-slate-600"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Mail className="h-5 w-5" />
                        <span>pokdarwissilungkangtigo@gmail.com</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-slate-600"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <span className="font-semibold">Website:</span>
                        <a href="https://silungkangtigo.web.id/" className="text-blue-600 hover:underline">silungkangtigo.web.id</a>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2 text-slate-600"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <span className="font-semibold">Media Sosial:</span>
                        <a href="https://www.instagram.com/pokdarwissilungkangtigo" className="text-blue-600 hover:underline">@pokdarwissilungkangtigo</a>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}