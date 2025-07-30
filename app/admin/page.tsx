"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, UserPlus, Edit, Trash2, Shield, Mail, Phone } from "lucide-react"

export default function AdminPage() {
  const admins = [
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@desa.id",
      role: "Super Admin",
      phone: "081234567890",
      status: "active",
      lastLogin: "2 jam yang lalu",
    },
    {
      id: 2,
      name: "Siti Rahayu",
      email: "siti@desa.id",
      role: "Admin",
      phone: "081234567891",
      status: "active",
      lastLogin: "1 hari yang lalu",
    },
    {
      id: 3,
      name: "Ahmad Wijaya",
      email: "ahmad@desa.id",
      role: "Operator",
      phone: "081234567892",
      status: "inactive",
      lastLogin: "1 minggu yang lalu",
    },
  ]

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
                  Kelola Akun Admin
                </h1>
                <p className="text-sm text-slate-600">Manajemen pengguna dan hak akses sistem</p>
              </div>
              <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                <UserPlus className="h-4 w-4 mr-2" />
                Tambah Admin
              </Button>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Admin</CardTitle>
                  <Settings className="h-5 w-5 text-[#073046]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">3</div>
                  <p className="text-xs text-slate-500">2 aktif, 1 tidak aktif</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Admin Aktif</CardTitle>
                  <Shield className="h-5 w-5 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">2</div>
                  <p className="text-xs text-emerald-600">Login hari ini</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Role Tersedia</CardTitle>
                  <UserPlus className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#073046]">3</div>
                  <p className="text-xs text-slate-500">Super Admin, Admin, Operator</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin List */}
            <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046]">Daftar Admin</CardTitle>
                <CardDescription>Kelola akun admin dan hak akses mereka</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {admins.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200/60 bg-white/50 hover:bg-white/80 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${admin.name.charAt(0)}`} />
                          <AvatarFallback className="bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
                            {admin.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[#073046]">{admin.name}</h3>
                            <Badge
                              variant={admin.status === "active" ? "default" : "secondary"}
                              className={
                                admin.status === "active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : ""
                              }
                            >
                              {admin.status === "active" ? "Aktif" : "Tidak Aktif"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {admin.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {admin.phone}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            Role: {admin.role} • Login terakhir: {admin.lastLogin}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-[#073046]/10 bg-transparent">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Admin Form */}
            <Card className="border-0 bg-gradient-to-r from-white to-slate-50/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#073046]">Tambah Admin Baru</CardTitle>
                <CardDescription>Buat akun admin baru dengan role yang sesuai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Masukkan nama lengkap" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@desa.id" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input id="phone" placeholder="081234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="operator">Operator</option>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Masukkan password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Konfirmasi password" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline">Batal</Button>
                  <Button className="bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a]">
                    Simpan Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
