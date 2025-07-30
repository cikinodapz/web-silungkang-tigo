"use client"

import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Target, Eye, Phone, Mail } from "lucide-react"

export default function ProfilePage() {
  const officials = [
    {
      name: "Budi Santoso, S.Sos",
      position: "Kepala Desa",
      period: "2019-2025",
      photo: "/placeholder.svg?height=150&width=150",
      contact: {
        phone: "0812-3456-7890",
        email: "kades@silungkangtigo.desa.id",
      },
    },
    {
      name: "Siti Aminah, S.Pd",
      position: "Sekretaris Desa",
      period: "2020-2026",
      photo: "/placeholder.svg?height=150&width=150",
      contact: {
        phone: "0813-4567-8901",
        email: "sekdes@silungkangtigo.desa.id",
      },
    },
    {
      name: "Ahmad Rizki, S.E",
      position: "Bendahara Desa",
      period: "2020-2026",
      photo: "/placeholder.svg?height=150&width=150",
      contact: {
        phone: "0814-5678-9012",
        email: "bendahara@silungkangtigo.desa.id",
      },
    },
    {
      name: "Dewi Sartika, S.Kom",
      position: "Kaur Pemerintahan",
      period: "2021-2027",
      photo: "/placeholder.svg?height=150&width=150",
      contact: {
        phone: "0815-6789-0123",
        email: "pemerintahan@silungkangtigo.desa.id",
      },
    },
    {
      name: "Hendra Wijaya, S.T",
      position: "Kaur Pembangunan",
      period: "2021-2027",
      photo: "/placeholder.svg?height=150&width=150",
      contact: {
        phone: "0816-7890-1234",
        email: "pembangunan@silungkangtigo.desa.id",
      },
    },
    {
      name: "Rina Marlina, S.Sos",
      position: "Kaur Kesejahteraan",
      period: "2021-2027",
      photo: "/placeholder.svg?height=150&width=150",
      contact: {
        phone: "0817-8901-2345",
        email: "kesejahteraan@silungkangtigo.desa.id",
      },
    },
  ]

  const demographics = [
    {
      category: "Berdasarkan Usia",
      data: [
        { label: "0-17 tahun", value: 856, percentage: 30.1 },
        { label: "18-35 tahun", value: 1142, percentage: 40.1 },
        { label: "36-55 tahun", value: 623, percentage: 21.9 },
        { label: "56+ tahun", value: 226, percentage: 7.9 },
      ],
    },
    {
      category: "Berdasarkan Pendidikan",
      data: [
        { label: "SD/Sederajat", value: 1138, percentage: 40.0 },
        { label: "SMP/Sederajat", value: 854, percentage: 30.0 },
        { label: "SMA/Sederajat", value: 569, percentage: 20.0 },
        { label: "Diploma/Sarjana", value: 286, percentage: 10.0 },
      ],
    },
    {
      category: "Berdasarkan Pekerjaan",
      data: [
        { label: "Petani", value: 1138, percentage: 40.0 },
        { label: "Pedagang", value: 569, percentage: 20.0 },
        { label: "PNS/TNI/Polri", value: 285, percentage: 10.0 },
        { label: "Swasta", value: 427, percentage: 15.0 },
        { label: "Lainnya", value: 428, percentage: 15.0 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil Desa Silungkang Tigo</h1>
            <p className="text-xl text-blue-100">
              Mengenal lebih dekat sejarah, visi misi, dan struktur pemerintahan desa
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="sejarah" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="sejarah" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Sejarah
            </TabsTrigger>
            <TabsTrigger value="pejabat" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pejabat
            </TabsTrigger>
            <TabsTrigger value="visi-misi" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Visi & Misi
            </TabsTrigger>
            <TabsTrigger value="demografi" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Demografi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sejarah" className="space-y-6">
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
                      <div>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Asal Usul Nama</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Nama "Silungkang Tigo" berasal dari bahasa Minangkabau yang memiliki makna mendalam.
                          "Silungkang" merujuk pada sebuah tempat yang strategis dan subur, sedangkan "Tigo" berarti
                          tiga, yang melambangkan tiga bukit yang mengelilingi desa ini.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Sejarah Pembentukan</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          Desa Silungkang Tigo didirikan pada tahun 1952 sebagai hasil pemekaran dari desa induk
                          Silungkang. Pembentukan desa ini dilatarbelakangi oleh pertumbuhan penduduk yang pesat dan
                          kebutuhan akan pelayanan pemerintahan yang lebih dekat dengan masyarakat.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          Pada awal pembentukannya, desa ini memiliki luas wilayah sekitar 15 km² dengan jumlah penduduk
                          sekitar 800 jiwa. Mata pencaharian utama masyarakat pada masa itu adalah bertani dan berkebun,
                          memanfaatkan tanah yang subur di kaki bukit.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#073046] mb-3">Perkembangan Modern</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Memasuki era digital, Desa Silungkang Tigo menjadi salah satu desa pelopor dalam penerapan
                          teknologi informasi untuk pelayanan publik. Pada tahun 2020, desa ini meluncurkan sistem
                          informasi desa digital yang terintegrasi, memudahkan masyarakat dalam mengakses berbagai
                          layanan administrasi.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <Card className="border border-slate-200">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-[#073046] mb-4">Timeline Penting</h4>
                          <div className="space-y-4">
                            <div className="flex gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-sm">1952</p>
                                <p className="text-xs text-slate-600">Pembentukan Desa</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-sm">1975</p>
                                <p className="text-xs text-slate-600">Pembangunan Kantor Desa</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-sm">1998</p>
                                <p className="text-xs text-slate-600">Elektrifikasi Desa</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-sm">2010</p>
                                <p className="text-xs text-slate-600">Akses Internet</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#073046] mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-sm">2020</p>
                                <p className="text-xs text-slate-600">Sistem Digital</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-[#073046] mb-4">Data Geografis</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Luas Wilayah:</span>
                              <span className="font-semibold">15.2 km²</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Ketinggian:</span>
                              <span className="font-semibold">450-650 mdpl</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Iklim:</span>
                              <span className="font-semibold">Tropis</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Curah Hujan:</span>
                              <span className="font-semibold">2.500 mm/tahun</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pejabat" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Struktur Pemerintahan Desa
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {officials.map((official, index) => (
                    <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-slate-100">
                          <img
                            src={official.photo || "/placeholder.svg"}
                            alt={official.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-[#073046] mb-1">{official.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{official.position}</p>
                        <Badge variant="outline" className="mb-4">
                          {official.period}
                        </Badge>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-center gap-1 text-slate-500">
                            <Phone className="h-3 w-3" />
                            {official.contact.phone}
                          </div>
                          <div className="flex items-center justify-center gap-1 text-slate-500">
                            <Mail className="h-3 w-3" />
                            {official.contact.email}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visi-misi" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Visi Desa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <blockquote className="text-lg font-medium text-[#073046] italic leading-relaxed">
                    "Mewujudkan Desa Silungkang Tigo sebagai desa mandiri, sejahtera, dan berbudaya dengan memanfaatkan
                    teknologi digital untuk pelayanan prima kepada masyarakat"
                  </blockquote>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Misi Desa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ol className="space-y-3 text-slate-600">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#073046] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </span>
                      <span>Meningkatkan kualitas pelayanan publik melalui digitalisasi administrasi desa</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#073046] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </span>
                      <span>Mengembangkan potensi ekonomi lokal dan UMKM berbasis teknologi</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#073046] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </span>
                      <span>Melestarikan budaya dan tradisi lokal sambil mengadopsi inovasi modern</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#073046] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </span>
                      <span>Membangun infrastruktur yang mendukung kesejahteraan masyarakat</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#073046] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        5
                      </span>
                      <span>Menciptakan tata kelola pemerintahan yang transparan dan akuntabel</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demografi" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {demographics.map((demo, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                    <CardTitle className="text-lg">{demo.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {demo.data.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-[#073046]">{item.value.toLocaleString()}</span>
                              <span className="text-xs text-slate-500 ml-1">({item.percentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-[#073046] to-[#0a4a66] transition-all duration-500"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
