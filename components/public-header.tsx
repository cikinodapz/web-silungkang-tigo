"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Users, Newspaper, Zap, Store, FileText, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Profil Desa", href: "/profile", icon: Users },
    { name: "Lembaga Desa", href: "/lembaga", icon: Users },
    { name: "Berita", href: "/berita-public", icon: Newspaper },
    { name: "Potensi Desa", href: "/potensi-public", icon: Zap },
    { name: "Lapak Desa", href: "/lapak-public", icon: Store },
    { name: "Produk Hukum", href: "/produk-hukum-public", icon: FileText },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#073046] to-[#0a4a66]">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#073046]">Desa Silungkang Tigo</span>
              <span className="text-xs text-slate-500">Kec. Silungkang, Kab. Sawahlunto</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#073046] hover:bg-slate-100 rounded-md transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <Link href="/login">
              <Button className="ml-4 bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046]">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-[#073046] hover:bg-slate-100"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur">
            <nav className="py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-[#073046] hover:bg-slate-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#073046] to-[#0a4a66] hover:from-[#0a4a66] hover:to-[#073046]">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login Admin
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
