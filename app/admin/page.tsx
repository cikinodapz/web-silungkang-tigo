"use client";

import { useState, useEffect, Fragment } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, Transition } from "@headlessui/react";
import {
  Settings,
  UserPlus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";

interface Admin {
  id: string;
  name: string;
  email: string;
  username: string;
}

export default function AdminPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 4;

  // Fetch admins on component mount
  useEffect(() => {
    const loadAdmins = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/kelola-user/getUser");
        const users = Array.isArray(response) ? response : response.data || [];
        setAdmins(users);
      } catch (err) {
        setError(
          `Gagal memuat data admin: ${err.message || "Terjadi kesalahan"}`
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadAdmins();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Handle adding a new admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password dan konfirmasi password tidak cocok",
      });
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchData("/kelola-user/createUser", {
        method: "POST",
        data: {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
      });
      const newAdmin = response.data || response;
      const formattedAdmin: Admin = {
        id: newAdmin.id,
        name: newAdmin.name || formData.name,
        email: newAdmin.email || formData.email,
        username: newAdmin.username || formData.username,
      };
      setAdmins((prevAdmins) => [...prevAdmins, formattedAdmin]);
      setIsAddModalOpen(false);
      resetForm();
      const newTotalPages = Math.ceil((admins.length + 1) / adminsPerPage);
      setCurrentPage(newTotalPages);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Admin berhasil ditambahkan!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambah admin: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing an admin
  const handleEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;
    if (formData.password && formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password dan konfirmasi password tidak cocok",
      });
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await fetchData(
        `/kelola-user/editUser/${selectedAdmin.id}`,
        {
          method: "PUT",
          data: {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            ...(formData.password && { password: formData.password }),
          },
        }
      );
      const updatedAdmin = {
        id: selectedAdmin.id,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        ...response.data,
      };
      setAdmins(
        admins.map((admin) =>
          admin.id === selectedAdmin.id ? updatedAdmin : admin
        )
      );
      setIsEditModalOpen(false);
      setSelectedAdmin(null);
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Admin berhasil diperbarui!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal mengedit admin: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting an admin
  const handleDeleteAdmin = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus admin ini?",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);
    setError("");
    try {
      await fetchData(`/kelola-user/deleteUser/${id}`, { method: "DELETE" });
      setAdmins(admins.filter((admin) => admin.id !== id));
      if (
        admins.length - 1 <= (currentPage - 1) * adminsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Admin berhasil dihapus!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menghapus admin: ${err.message || "Terjadi kesalahan"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal with admin data
  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      username: admin.username,
      password: "",
      confirmPassword: "",
    });
    setIsEditModalOpen(true);
  };

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm">
            <div className="flex h-20 items-center justify-between px-6 md:px-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-blue-900 hover:bg-blue-100 transition-colors p-2 rounded-md" />
                <div>
                  <h1 className="text-2xl font-semibold text-blue-900">
                    Kelola Admin
                  </h1>
                  <p className="text-sm text-gray-600">
                    Kelola akun admin dan hak akses mereka
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="flex items-center bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => {
                    resetForm();
                    setIsAddModalOpen(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Tambah Admin
                </Button>
              </div>
            </div>
          </header>
          <main className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in">
                {error}
              </div>
            )}
            {isLoading && (
              <div className="text-center text-gray-600 animate-pulse">
                Memuat...
              </div>
            )}
            {!isLoading && admins.length === 0 && !error && (
              <div className="text-center text-gray-600">
                Tidak ada data admin.
              </div>
            )}

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 bg-white/80 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Admin
                  </CardTitle>
                  <Settings className="h-5 w-5 text-blue-900" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">
                    {admins.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Jumlah pengguna terdaftar
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Admin List */}
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Daftar Admin</CardTitle>
                <CardDescription>
                  Kelola akun admin dan hak akses mereka
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 transition-all"
                    onClick={() => {
                      resetForm();
                      setIsAddModalOpen(true);
                    }}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Tambah Admin
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-blue-50 text-blue-900">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Nama</th>
                        <th className="px-4 py-3 font-semibold">Email</th>
                        <th className="px-4 py-3 font-semibold">Username</th>
                        <th className="px-4 py-3 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAdmins.map((admin) => (
                        <tr
                          key={String(admin.id)}
                          className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                        >
                          <td className="px-4 py-3">{admin.name}</td>
                          <td className="px-4 py-3">{admin.email}</td>
                          <td className="px-4 py-3">{admin.username}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-100 text-blue-900 border-blue-200"
                                onClick={() => openEditModal(admin)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 border-red-200"
                                onClick={() => handleDeleteAdmin(admin.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Sebelumnya
                    </Button>
                    <span className="text-sm text-gray-600">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                    >
                      Berikutnya
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>

          {/* Add Admin Modal */}
          <Transition appear show={isAddModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setIsAddModalOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                      <Dialog.Title className="text-lg font-semibold text-blue-900">
                        Tambah Admin Baru
                      </Dialog.Title>
                      <form
                        onSubmit={handleAddAdmin}
                        className="space-y-4 mt-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Masukkan nama lengkap"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@desa.id"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            placeholder="Masukkan username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Masukkan password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Konfirmasi Password
                          </Label>
                          <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Konfirmasi password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-gray-200 text-gray-600 hover:bg-gray-100"
                            onClick={() => {
                              setIsAddModalOpen(false);
                              resetForm();
                            }}
                          >
                            Batal
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600"
                            disabled={isLoading}
                          >
                            {isLoading ? "Menyimpan..." : "Simpan Admin"}
                          </Button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {/* Edit Admin Modal */}
          <Transition appear show={isEditModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setIsEditModalOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                      <Dialog.Title className="text-lg font-semibold text-blue-900">
                        Edit Admin
                      </Dialog.Title>
                      <form
                        onSubmit={handleEditAdmin}
                        className="space-y-4 mt-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Masukkan nama lengkap"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@desa.id"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            placeholder="Masukkan username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">
                            Password Baru (opsional)
                          </Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Masukkan password baru"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Konfirmasi Password Baru
                          </Label>
                          <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Konfirmasi password baru"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="border-gray-200 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                          <Button
                            type="button"
                            variant="outline"
                            className="border-gray-200 text-gray-600 hover:bg-gray-100"
                            onClick={() => {
                              setIsEditModalOpen(false);
                              setSelectedAdmin(null);
                              resetForm();
                            }}
                          >
                            Batal
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600"
                            disabled={isLoading}
                          >
                            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                          </Button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}