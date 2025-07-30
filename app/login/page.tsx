"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain, User, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, validate credentials
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-[#073046]">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-[#073046] to-[#0a4a66] flex items-center justify-center text-white">
              <Mountain className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#073046] to-[#0a4a66] bg-clip-text text-transparent">
                Login Admin
              </CardTitle>
              <CardDescription className="text-slate-600 mt-2">
                Masuk ke Dashboard Admin Desa Silungkang Tigo
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    className="pl-10 border-slate-200 focus:border-[#073046] focus:ring-[#073046]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    className="pl-10 border-slate-200 focus:border-[#073046] focus:ring-[#073046]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Ingat saya
                </label>
                <Link href="#" className="text-[#073046] hover:text-[#0a4a66] transition-colors">
                  Lupa password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] to-[#0d5a7a] text-white py-3"
              >
                Masuk ke Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <p>Belum punya akses? Hubungi administrator desa</p>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center">
          <Card className="border-0 bg-blue-50/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <p className="text-sm text-slate-600">
                <strong>Demo Login:</strong>
                <br />
                Username: admin | Password: admin123
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
