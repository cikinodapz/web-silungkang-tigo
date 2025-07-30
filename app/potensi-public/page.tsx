"use client"

import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Camera,
  Mountain,
  Music,
  Users,
  Building,
  GraduationCap,
  Heart,
  Car,
  Wifi,
} from "lucide-react"

export default function PotensiPublicPage() {
  const wisata = [
    {
      id: 1,
      name: "Air Terjun Sekumpul",
      description:
        "Air terjun spektakuler dengan ketinggian 80 meter yang dikelilingi hutan tropis. Tempat yang sempurna untuk menikmati keindahan alam dan udara segar pegunungan.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      location: "Dusun Sekumpul, 15 menit dari pusat desa",
      facilities: ["Parkir", "Toilet", "Warung", "Gazebo"],
      openHours: "06:00 - 18:00 WIB",
      ticketPrice: "Rp 10.000",
      contact: "0812-3456-7890",
      category: "Alam",
    },
    {
      id: 2,
      name: "Kebun Teh Panorama",
      description:
        "Perkebunan teh dengan pemandangan panorama pegunungan yang menakjubkan. Pengunjung dapat melihat proses pengolahan teh tradisional dan menikmati teh segar langsung dari kebun.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      location: "Bukit Hijau, 20 menit dari pusat desa",
      facilities: ["Parkir", "Cafe", "Toilet", "Spot Foto"],
      openHours: "07:00 - 17:00 WIB",
      ticketPrice: "Rp 15.000",
      contact: "0813-4567-8901",
      category: "Agro",
    },
    {
      id: 3,
      name: "Danau Cermin",
      description:
        "Danau kecil dengan air jernih seperti cermin yang memantulkan langit dan pepohonan di sekitarnya. Tempat yang tenang untuk relaksasi dan meditasi.",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      location: "Hutan Lindung, 25 menit dari pusat desa",
      facilities: ["Parkir", "Toilet", "Gazebo", "Jalur Trekking"],
      openHours: "06:00 - 18:00 WIB",
      ticketPrice: "Rp 8.000",
      contact: "0814-5678-9012",
      category: "Alam",
    },
  ]

  const budaya = [
    {
      id: 1,
      name: "Tari Piring",
      description:
        "Tarian tradisional Minangkabau yang menggunakan piring sebagai properti utama. Gerakan yang lincah dan dinamis menggambarkan kehidupan masyarakat Minang.",
      image: "/placeholder.svg?height=300&width=400",
      performer: "Sanggar Seni Minang Jaya",
      schedule: "Setiap Sabtu malam di Balai Desa",
      contact: "0815-6789-0123",
      category: "Tari",
    },
    {
      id: 2,
      name: "Randai",
      description:
        "Pertunjukan teater tradisional yang menggabungkan seni tari, musik, dan cerita rakyat. Biasanya menceritakan legenda dan nilai-nilai budaya Minangkabau.",
      image: "/placeholder.svg?height=300&width=400",
      performer: "Kelompok Randai Silungkang",
      schedule: "Acara khusus dan festival",
      contact: "0816-7890-1234",
      category: "Teater",
    },
    {
      id: 3,
      name: "Talempong",
      description:
        "Alat musik tradisional Minangkabau yang terbuat dari logam. Menghasilkan suara merdu yang sering digunakan dalam upacara adat dan pertunjukan seni.",
      image: "/placeholder.svg?height=300&width=400",
      performer: "Grup Musik Tradisional Desa",
      schedule: "Minggu pertama setiap bulan",
      contact: "0817-8901-2345",
      category: "Musik",
    },
  ]

  const saranaPrasarana = [
    {
      category: "Pendidikan",
      icon: GraduationCap,
      items: [
        { name: "SD Negeri 1 Silungkang Tigo", status: "Baik", capacity: "240 siswa" },
        { name: "SMP Negeri 1 Silungkang", status: "Baik", capacity: "180 siswa" },
        { name: "PAUD Tunas Bangsa", status: "Baik", capacity: "45 anak" },
        { name: "Perpustakaan Desa Digital", status: "Baru", capacity: "50 pengunjung" },
      ],
    },
    {
      category: "Kesehatan",
      icon: Heart,
      items: [
        { name: "Puskesmas Pembantu", status: "Baik", capacity: "100 pasien/hari" },
        { name: "Posyandu Melati", status: "Aktif", capacity: "50 balita" },
        { name: "Posyandu Mawar", status: "Aktif", capacity: "45 balita" },
        { name: "Apotek Desa", status: "Baik", capacity: "24 jam" },
      ],
    },
    {
      category: "Transportasi",
      icon: Car,
      items: [
        { name: "Jalan Desa Beraspal", status: "Baik", capacity: "5 km" },
        { name: "Jembatan Sungai Batang", status: "Baik", capacity: "10 ton" },
        { name: "Terminal Mini", status: "Baik", capacity: "20 kendaraan" },
        { name: "Parkir Umum", status: "Baik", capacity: "50 kendaraan" },
      ],
    },
    {
      category: "Komunikasi",
      icon: Wifi,
      items: [
        { name: "Tower BTS", status: "Baik", capacity: "4G LTE" },
        { name: "WiFi Desa Gratis", status: "Aktif", capacity: "100 Mbps" },
        { name: "Kantor Pos", status: "Baik", capacity: "Layanan lengkap" },
        { name: "Warnet Desa", status: "Baik", capacity: "10 komputer" },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Potensi Desa</h1>
            <p className="text-xl text-blue-100">Kekayaan alam, budaya, dan infrastruktur Desa Silungkang Tigo</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="pariwisata" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="pariwisata" className="flex items-center gap-2">
              <Mountain className="h-4 w-4" />
              Pariwisata
            </TabsTrigger>
            <TabsTrigger value="budaya" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Kesenian & Budaya
            </TabsTrigger>
            <TabsTrigger value="sarana" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Sarana Prasarana
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pariwisata" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-4">Destinasi Wisata</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Nikmati keindahan alam dan pengalaman wisata yang tak terlupakan di Desa Silungkang Tigo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wisata.map((destination) => (
                <Card
                  key={destination.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#073046]">{destination.category}</Badge>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-[#073046] mb-2">{destination.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{destination.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{destination.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{destination.openHours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{destination.contact}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-[#073046] mb-2">Fasilitas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-slate-500">Tiket Masuk</span>
                        <p className="font-bold text-[#073046]">{destination.ticketPrice}</p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046]">
                      <Camera className="mr-2 h-4 w-4" />
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budaya" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-4">Kesenian & Budaya</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Warisan budaya dan kesenian tradisional yang masih lestari di Desa Silungkang Tigo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budaya.map((art) => (
                <Card
                  key={art.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={art.image || "/placeholder.svg"}
                      alt={art.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#073046]">{art.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-[#073046] mb-2">{art.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{art.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{art.performer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{art.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{art.contact}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046]">
                      <Music className="mr-2 h-4 w-4" />
                      Info Pertunjukan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sarana" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#073046] mb-4">Sarana & Prasarana</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Infrastruktur dan fasilitas publik yang mendukung kehidupan masyarakat desa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {saranaPrasarana.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#073046] mb-1">{item.name}</h4>
                            <p className="text-sm text-slate-600">{item.capacity}</p>
                          </div>
                          <Badge
                            variant={
                              item.status === "Baik" || item.status === "Aktif" || item.status === "Baru"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              item.status === "Baik" || item.status === "Aktif"
                                ? "bg-green-500"
                                : item.status === "Baru"
                                  ? "bg-blue-500"
                                  : ""
                            }
                          >
                            {item.status}
                          </Badge>
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
