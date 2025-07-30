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
  ChevronDown,
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
import { cn } from "@/lib/utils"

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
          url: "/kepala-keluarga",
          icon: UserCheck,
        },
        {
          title: "Anggota Keluarga",
          url: "/data-penduduk",
          icon: Users,
          items: [
            {
              title: "Tambah Anggota",
              url: "/data-penduduk/tambah",
              icon: UserPlus,
            },
            {
              title: "Edit Anggota",
              url: "/data-penduduk/edit",
              icon: UserMinus,
            },
          ],
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
    <Sidebar {...props} className="border-r border-gray-100 bg-white/80 shadow-lg">
      {/* Header with gradient matching buttons */}
      <SidebarHeader className="border-b border-gray-200/50 bg-gradient-to-r from-blue-900 to-cyan-700">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shadow-inner">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight">Desa Digital</span>
            <span className="text-xs text-white/80 font-medium">Sistem Informasi Terpadu</span>
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
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen={item.isActive}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "group hover:bg-blue-50/50 transition-colors",
                            "data-[active=true]:bg-blue-50 data-[active=true]:text-blue-900",
                            "px-4 py-2.5 my-0.5 mx-2 rounded-lg"
                          )}
                          isActive={item.isActive}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 text-gray-500 group-data-[active=true]:text-blue-900" />
                            <span className="text-sm font-medium text-gray-600 group-data-[active=true]:text-blue-900">{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="CollapsibleContent">
                        <SidebarMenuSub className="pl-2 py-1">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              {subItem.items ? (
                                <Collapsible>
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton
                                      className={cn(
                                        "hover:bg-blue-50/50 hover:text-blue-900",
                                        "px-3 py-2 rounded-md text-gray-600",
                                        "transition-colors duration-150"
                                      )}
                                    >
                                      <div className="flex items-center gap-2">
                                        <subItem.icon className="h-3.5 w-3.5 text-gray-500" />
                                        <span className="text-sm">{subItem.title}</span>
                                        <ChevronDown className="ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                      </div>
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub className="pl-4 py-1">
                                      {subItem.items.map((subSubItem) => (
                                        <SidebarMenuSubItem key={subSubItem.title}>
                                          <SidebarMenuSubButton
                                            asChild
                                            className={cn(
                                              "hover:bg-blue-50/50 hover:text-blue-900",
                                              "px-3 py-2 rounded-md text-gray-600",
                                              "transition-colors duration-150"
                                            )}
                                          >
                                            <a href={subSubItem.url} className="flex items-center gap-2">
                                              <subSubItem.icon className="h-3.5 w-3.5 text-gray-500" />
                                              <span className="text-sm">{subSubItem.title}</span>
                                            </a>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      ))}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </Collapsible>
                              ) : (
                                <SidebarMenuSubButton
                                  asChild
                                  className={cn(
                                    "hover:bg-blue-50/50 hover:text-blue-900",
                                    "px-3 py-2 rounded-md text-gray-600",
                                    "transition-colors duration-150"
                                  )}
                                >
                                  <a href={subItem.url} className="flex items-center gap-2">
                                    <subItem.icon className="h-3.5 w-3.5 text-gray-500" />
                                    <span className="text-sm">{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              )}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "group hover:bg-blue-50/50 transition-colors",
                        "data-[active=true]:bg-blue-50 data-[active=true]:text-blue-900",
                        "px-4 py-2.5 my-0.5 mx-2 rounded-lg"
                      )}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-gray-500 group-data-[active=true]:text-blue-900" />
                        <span className="text-sm font-medium text-gray-600 group-data-[active=true]:text-blue-900">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user profile card */}
      <SidebarFooter className="border-t border-gray-200/50 bg-white/80">
        <div className="p-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 border border-gray-200/50 transition-all hover:bg-blue-50/50 cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-900 to-cyan-700 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 truncate">Admin Desa</p>
              <p className="text-xs text-gray-600 truncate">admin@desa.id</p>
            </div>
            <div className="text-gray-400">
              <Settings className="h-4 w-4" />
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}