"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchData } from "@/lib/api";
import Swal from "sweetalert2";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import dynamic from "next/dynamic";

const EditorContentDynamic = dynamic(
  () => import("@tiptap/react").then((mod) => mod.EditorContent),
  {
    ssr: false,
    loading: () => <p className="text-gray-600">Loading editor...</p>,
  }
);

interface KategoriBerita {
  id: string;
  kategori: string;
}

interface Berita {
  id: string;
  judul: string;
  berita: string;
  kategoriId: string;
  sampul: string[];
}

export default function EditBeritaPage() {
  const [formData, setFormData] = useState({
    judul: "",
    berita: "",
    kategoriId: "",
  });
  const [kategoriList, setKategoriList] = useState<KategoriBerita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingSampul, setExistingSampul] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: formData.berita,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, berita: editor.getHTML() }));
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const kategoriResponse = await fetchData("/berita/getAllKategoriBerita");
        const kategoriData = Array.isArray(kategoriResponse)
          ? kategoriResponse
          : kategoriResponse.data || [];
        setKategoriList(kategoriData);

        const beritaResponse = await fetchData(`/berita/getBerita/${id}`);
        const beritaData: Berita = beritaResponse.berita;

        if (!beritaData) {
          throw new Error("Berita tidak ditemukan");
        }

        setFormData({
          judul: beritaData.judul || "",
          berita: beritaData.berita || "",
          kategoriId: beritaData.kategoriId || "",
        });
        setExistingSampul(beritaData.sampul || []);
        setPreviews(beritaData.sampul.map((path) => getSampulUrl(path)) || []);

        if (editor) {
          editor.commands.setContent(beritaData.berita || "");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(`Gagal memuat data: ${errorMessage}`);
        console.error("Load data error:", err);
      }
    };
    if (id) {
      loadData();
    }
  }, [id, editor]);

  const getSampulUrl = (sampul: string) => {
    if (!sampul) return "/placeholder-image.jpg";
    const filename = sampul.split("/").pop();
    return `http://localhost:3000/berita/getSampul/berita/${filename}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(
        0,
        3 - (existingSampul.length - filesToRemove.length + selectedFiles.length)
      );
      if (
        newFiles.length +
          (existingSampul.length - filesToRemove.length) +
          selectedFiles.length >
        3
      ) {
        Swal.fire({
          icon: "warning",
          title: "Batas Gambar",
          text: "Maksimal 3 gambar dapat diunggah.",
        });
        return;
      }
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeExistingImage = (path: string) => {
    setFilesToRemove((prev) => [...prev, path]);
    // Update previews to exclude the removed image
    setPreviews((prev) => prev.filter((p) => p !== getSampulUrl(path)));
    // Update existingSampul to exclude the removed image
    setExistingSampul((prev) => prev.filter((p) => p !== path));
  };

  const removeNewFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[existingSampul.length + index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKategoriChange = (value: string) => {
    setFormData((prev) => ({ ...prev, kategoriId: value }));
  };

  const validateForm = () => {
    if (!formData.judul.trim()) return "Judul harus diisi.";
    if (!formData.berita.trim()) return "Berita harus diisi.";
    if (!formData.kategoriId) return "Kategori harus dipilih.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("judul", formData.judul);
      formDataToSend.append("berita", formData.berita);
      formDataToSend.append("kategoriId", formData.kategoriId);

      // Send existingSampul as an array of paths to keep
      formDataToSend.append(
        "existingSampul",
        JSON.stringify(existingSampul.filter((path) => !filesToRemove.includes(path)))
      );

      // Send filesToRemove as an array of paths to delete
      formDataToSend.append("filesToRemove", JSON.stringify(filesToRemove));

      // Append new files
      selectedFiles.forEach((file) => {
        formDataToSend.append("sampul", file);
      });

      // Debug: Log FormData entries
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetchData(`/berita/updateBerita/${id}`, {
        method: "PUT",
        data: formDataToSend,
      });

      // Clean up previews for new files
      previews.forEach((preview, index) => {
        if (index >= existingSampul.length - filesToRemove.length) {
          URL.revokeObjectURL(preview);
        }
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berita berhasil diperbarui!",
      });
      router.push("/berita");
    } catch (err: any) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : err.response?.data?.message || "Terjadi kesalahan";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal memperbarui data: ${errorMessage}`,
      });
      console.error("Update error:", {
        message: errorMessage,
        details: err.response?.data || err,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Toolbar = () => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border border-gray-300 rounded-t-md">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          Bold
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          Italic
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          Underline
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          H1
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          H2
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          H3
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          Bullet List
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          Numbered List
        </Button>
        <Button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={
            editor.isActive("link")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }
        >
          Link
        </Button>
        <Button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="bg-white text-gray-600"
        >
          Image
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="bg-white text-gray-600"
        >
          Undo
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="bg-white text-gray-600"
        >
          Redo
        </Button>
      </div>
    );
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
                    Edit Berita
                  </h1>
                  <p className="text-sm text-gray-600">
                    Perbarui detail berita
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg text-center animate-in fade-in">
                {error}
              </div>
            )}
            <Card className="border-0 bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">Form Edit Data</CardTitle>
                <CardDescription>Perbarui detail berita</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="judul" className="text-gray-600">
                      Judul
                    </Label>
                    <Input
                      id="judul"
                      name="judul"
                      value={formData.judul}
                      onChange={handleChange}
                      placeholder="Masukkan judul berita"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="berita" className="text-gray-600">
                      Berita
                    </Label>
                    <div className="border border-gray-300 rounded-md">
                      <Toolbar />
                      <EditorContentDynamic
                        editor={editor}
                        className="bg-white p-2 min-h-[200px]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="kategoriId" className="text-gray-600">
                      Kategori
                    </Label>
                    <Select
                      onValueChange={handleKategoriChange}
                      value={formData.kategoriId}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {kategoriList.map((kategori) => (
                          <SelectItem key={kategori.id} value={kategori.id}>
                            {kategori.kategori}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sampul" className="text-gray-600">
                      Sampul (Maksimal 5 Gambar, Opsional)
                    </Label>
                    {(existingSampul.length > 0 || previews.length > 0) && (
                      <div className="mt-2 mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Gambar Saat Ini:
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {existingSampul
                            .filter((path) => !filesToRemove.includes(path))
                            .map((path, index) => (
                              <div
                                key={`existing-${index}`}
                                className="relative w-24 h-24 rounded-md overflow-hidden"
                              >
                                <img
                                  src={getSampulUrl(path)}
                                  alt={`Existing Sampul ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/placeholder-image.jpg";
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                                  onClick={() => removeExistingImage(path)}
                                >
                                  &times;
                                </Button>
                              </div>
                            ))}
                          {previews
                            .slice(existingSampul.length - filesToRemove.length)
                            .map((preview, index) => (
                              <div
                                key={`new-${index}`}
                                className="relative w-24 h-24 rounded-md overflow-hidden"
                              >
                                <img
                                  src={preview}
                                  alt={`New Sampul ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                                  onClick={() => removeNewFile(index)}
                                >
                                  &times;
                                </Button>
                              </div>
                            ))}
                        </div>
                        {existingSampul.length - filesToRemove.length +
                          selectedFiles.length >
                          0 && (
                          <Badge className="mt-2 bg-blue-900 hover:bg-blue-800">
                            {existingSampul.length -
                              filesToRemove.length +
                              selectedFiles.length}{" "}
                            Gambar
                          </Badge>
                        )}
                      </div>
                    )}
                    <Input
                      id="sampul"
                      name="sampul"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Pilih file baru untuk menambahkan sampul (maksimal 5 gambar
                      total, termasuk gambar yang sudah ada).
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => router.push("/berita")}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-900 to-cyan-700 hover:from-blue-800 hover:to-cyan-600 text-white"
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}