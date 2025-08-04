"use client";

import type * as React from "react";
import { usePathname } from "next/navigation"; // Ganti useRouter dengan usePathname
import {
  LayoutDashboard,
  Users,
  UserCheck,
  DollarSign,
  Newspaper,
  Zap,
  Store,
  FileText,
  Settings,
  ChevronRight,
  Home,
  UserPlus,
  UserMinus,
  ArrowUpDown,
  ChevronDown,
  Tags,
  Package,
  FolderOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// Menu data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Akun Admin",
      url: "/admin",
      icon: Settings,
    },
    {
      title: "Data Penduduk",
      url: "/data-penduduk",
      icon: Users,
      items: [
        {
          title: "Kartu Keluarga (KK)",
          url: "/data-penduduk",
          icon: Home,
        },
        {
          title: "Kepala Keluarga",
          url: "/kepala-keluarga",
          icon: UserCheck,
        },
        {
          title: "Anggota Keluarga",
          url: "/anggota-keluarga",
          icon: Users,
        },
      ],
    },
    {
      title: "Mutasi Penduduk",
      url: "/mutasi-penduduk",
      icon: ArrowUpDown,
      items: [
        {
          title: "Lahir/Masuk",
          url: "/lahir-masuk",
          icon: UserPlus,
        },
        {
          title: "Meninggal",
          url: "/meninggal",
          icon: UserMinus,
        },
        {
          title: "Pindah/Keluar",
          url: "/pindah-keluar",
          icon: ArrowUpDown,
        },
      ],
    },
    {
      title: "APBDes",
      url: "/apbdes",
      icon: DollarSign,
    },
    {
      title: "Berita",
      url: "/berita",
      icon: Newspaper,
      items: [
        {
          title: "Kategori Berita",
          url: "/berita/kategori-berita",
          icon: Tags,
        },
        {
          title: "Berita Desa",
          url: "/berita",
          icon: Newspaper,
        },
      ],
    },
    {
      title: "Potensi Desa",
      url: "/potensi-desa",
      icon: Zap,
    },
    {
      title: "Lapak Desa",
      url: "/lapak-desa",
      icon: Store,
      items: [
        {
          title: "UMKM",
          url: "/lapak-desa/umkm",
          icon: Users,
        },
        {
          title: "Produk",
          url: "/lapak-desa/produk",
          icon: Package,
        },
      ],
    },
    {
      title: "Produk Hukum",
      url: "/produk-hukum",
      icon: FileText,
      items: [
        {
          title: "Kategori",
          url: "/produk-hukum/kategori",
          icon: FolderOpen,
        },
        {
          title: "Produk Hukum",
          url: "/produk-hukum/produk-hukum",
          icon: FileText,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Gunakan usePathname untuk mendapatkan URL saat ini

  return (
    <Sidebar
      {...props}
      className="border-r border-gray-100 bg-white/80 shadow-lg"
    >
      {/* Header with gradient matching buttons */}
      <SidebarHeader className="border-b border-gray-200/50 bg-gradient-to-r from-blue-900 to-cyan-700">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shadow-inner">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight">
              Desa Digital
            </span>
            <span className="text-xs text-white/80 font-medium">
              Sistem Informasi Terpadu
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Content Area */}
      <SidebarContent className="bg-white/80">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-gray-600 px-4 pt-4 pb-2">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                // Periksa apakah item aktif, termasuk rute turunan (misalnya /apbdes/tambah, /apbdes/edit/[id])
                const isActive =
                  pathname === item.url ||
                  pathname.startsWith(item.url + "/") ||
                  (item.items &&
                    item.items.some(
                      (subItem) =>
                        pathname === subItem.url ||
                        pathname.startsWith(subItem.url + "/")
                    ));

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <Collapsible defaultOpen={isActive}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={cn(
                              "group hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 hover:scale-[1.02] transition-all duration-200",
                              isActive &&
                                "bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-900 font-semibold",
                              "px-4 py-2.5 my-0.5 mx-2 rounded-lg"
                            )}
                            isActive={isActive}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon
                                className={cn(
                                  "h-4 w-4 text-gray-500 group-hover:text-blue-900",
                                  isActive && "text-blue-900"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-sm font-medium text-gray-600 group-hover:text-blue-900",
                                  isActive && "text-blue-900"
                                )}
                              >
                                {item.title}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-blue-900",
                                  isActive && "text-blue-900",
                                  "group-data-[state=open]:rotate-180"
                                )}
                              />
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="CollapsibleContent">
                          <SidebarMenuSub className="pl-2 py-1">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={cn(
                                    "hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:scale-[1.01] hover:text-blue-900",
                                    (pathname === subItem.url ||
                                      pathname.startsWith(subItem.url + "/")) &&
                                      "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-900",
                                    "px-3 py-2 rounded-md text-gray-600",
                                    "transition-all duration-150"
                                  )}
                                >
                                  <a
                                    href={subItem.url}
                                    className="flex items-center gap-2"
                                  >
                                    <subItem.icon
                                      className={cn(
                                        "h-3.5 w-3.5 text-gray-500 group-hover:text-blue-900",
                                        (pathname === subItem.url ||
                                          pathname.startsWith(
                                            subItem.url + "/"
                                          )) &&
                                          "text-blue-900"
                                      )}
                                    />
                                    <span className="text-sm">
                                      {subItem.title}
                                    </span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "group hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 hover:scale-[1.02] transition-all duration-200",
                          (pathname === item.url ||
                            pathname.startsWith(item.url + "/")) &&
                            "bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-900 font-semibold",
                          "px-4 py-2.5 my-0.5 mx-2 rounded-lg"
                        )}
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon
                            className={cn(
                              "h-4 w-4 text-gray-500 group-hover:text-blue-900",
                              (pathname === item.url ||
                                pathname.startsWith(item.url + "/")) &&
                                "text-blue-900"
                            )}
                          />
                          <span
                            className={cn(
                              "text-sm font-medium text-gray-600 group-hover:text-blue-900",
                              (pathname === item.url ||
                                pathname.startsWith(item.url + "/")) &&
                                "text-blue-900"
                            )}
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user profile card */}
      <SidebarFooter className="border-t border-gray-200/50 bg-white/80">
        <div className="p-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 border border-gray-200/50 transition-all hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 hover:scale-[1.02] cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-900 to-cyan-700 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 truncate">
                Admin Desa
              </p>
              <p className="text-xs text-gray-600 truncate">admin@desa.id</p>
            </div>
            <div className="text-gray-400 group-hover:text-blue-900">
              <Settings className="h-4 w-4" />
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
