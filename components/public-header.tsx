"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Users, Newspaper, Zap, Store, FileText, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Profil Desa", href: "/profile", icon: Users },
    { name: "Lembaga Desa", href: "/lembaga", icon: Users },
    { name: "Berita", href: "/berita-public", icon: Newspaper },
    { name: "Potensi Desa", href: "/potensi-public", icon: Zap },
    { name: "Lapak Desa", href: "/lapak-public", icon: Store },
    { name: "Produk Hukum", href: "/produk-hukum-public", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#073046] to-[#0a4a66] shadow-inner">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#073046] tracking-tight">
                Desa Silungkang Tigo
              </span>
              <span className="text-xs text-gray-600 font-medium">
                Kec. Silungkang, Kab. Sawahlunto
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2.5 my-0.5 mx-1 rounded-lg text-sm font-medium text-gray-600 bg-transparent",
                    isActive
                      ? "bg-gradient-to-r from-blue-100/50 to-cyan-100/50 text-[#073046] font-semibold"
                      : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 hover:text-[#073046] hover:scale-[1.02]",
                    "transition-all duration-300 ease-in-out"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-[#073046]" : "text-gray-500 group-hover:text-[#073046] transition-colors duration-300 ease-in-out"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
            <Link href="/login">
              <Button
                className={cn(
                  "ml-4 bg-gradient-to-r from-[#0a4a66] to-[#073046] text-white",
                  "hover:bg-gradient-to-r hover:from-[#073046] hover:to-[#0a4a66] hover:scale-[1.02] transition-all duration-300 ease-in-out",
                  "px-4 py-2 rounded-lg shadow-sm"
                )}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg text-gray-600 bg-transparent",
              "hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 hover:text-[#073046] hover:scale-[1.02] transition-all duration-300 ease-in-out"
            )}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/80 backdrop-blur shadow-lg">
            <nav className="py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-medium text-gray-600 bg-transparent",
                      isActive
                        ? "bg-gradient-to-r from-blue-100/50 to-cyan-100/50 text-[#073046] font-semibold"
                        : "hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 hover:text-[#073046] hover:scale-[1.01]",
                      "transition-all duration-300 ease-in-out"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-[#073046]" : "text-gray-500 group-hover:text-[#073046] transition-colors duration-300 ease-in-out"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
              <div className="px-4 pt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    className={cn(
                      "w-full bg-gradient-to-r from-[#0a4a66] to-[#073046] text-white",
                      "hover:bg-gradient-to-r hover:from-[#073046] hover:to-[#0a4a66] hover:scale-[1.02] transition-all duration-300 ease-in-out",
                      "px-4 py-2 rounded-lg shadow-sm"
                    )}
                  >
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
  );
}