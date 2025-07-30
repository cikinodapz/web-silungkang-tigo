"use client"

import type * as React from "react"
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
} from "lucide-react"

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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Menu data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Kelola Akun Admin",
          url: "/admin",
          icon: Settings,
        },
      ],
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
          url: "/data-penduduk",
          icon: UserCheck,
        },
        {
          title: "Anggota Keluarga",
          url: "/data-penduduk",
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
          url: "/mutasi-penduduk",
          icon: UserPlus,
        },
        {
          title: "Meninggal",
          url: "/mutasi-penduduk",
          icon: UserMinus,
        },
        {
          title: "Pindah/Keluar",
          url: "/mutasi-penduduk",
          icon: ArrowUpDown,
        },
      ],
    },
    {
      title: "Pengelolaan APBDes",
      url: "/apbdes",
      icon: DollarSign,
    },
    {
      title: "Pengelolaan Berita",
      url: "/berita",
      icon: Newspaper,
    },
    {
      title: "Pengelolaan Potensi",
      url: "/potensi",
      icon: Zap,
    },
    {
      title: "Pengelolaan Lapak Desa",
      url: "/lapak-desa",
      icon: Store,
    },
    {
      title: "Produk Hukum",
      url: "/produk-hukum",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-r-0">
      <SidebarHeader className="border-b border-slate-200/60 bg-gradient-to-r from-[#073046] to-[#0a4a66] text-white">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">Desa Digital</span>
            <span className="text-xs text-blue-100">Sistem Terpadu</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-white to-slate-50/50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#073046] font-semibold">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="hover:bg-[#073046]/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#073046]/20 data-[active=true]:to-[#0a4a66]/10 data-[active=true]:text-[#073046] data-[active=true]:font-semibold"
                          isActive={item.isActive}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild className="hover:bg-[#073046]/5 hover:text-[#073046] pl-8">
                                <a href={subItem.url} className="flex items-center gap-2">
                                  <subItem.icon className="h-3 w-3" />
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild className="hover:bg-[#073046]/10 hover:text-[#073046]">
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/30">
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[#073046]/5 to-[#0a4a66]/5 border border-[#073046]/10">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#073046] to-[#0a4a66] flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#073046] truncate">Admin Desa</p>
              <p className="text-xs text-slate-500 truncate">admin@desa.id</p>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
