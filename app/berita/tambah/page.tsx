"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

// Dynamically import EditorContent to ensure client-side rendering
const EditorContentDynamic = dynamic(() => import("@tiptap/react").then((mod) => mod.EditorContent), {
  ssr: false,
  loading: () => <p className="text-gray-600">Loading editor...</p>,
});

interface KategoriBerita {
  id: string;
  kategori: string;
}

export default function TambahBeritaPage() {
  const [formData, setFormData] = useState({
    judul: "",
    berita: "",
    kategoriId: "",
  });
  const [kategoriList, setKategoriList] = useState<KategoriBerita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Initialize Tiptap editor with immediatelyRender set to false
  const editor = useEditor({
    immediatelyRender: false, // Explicitly disable immediate rendering for SSR
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
    const loadKategoriBerita = async () => {
      try {
        const response = await fetchData("/berita/getAllKategoriBerita");
        const data = Array.isArray(response) ? response : response.data || [];
        setKategoriList(data);
      } catch (err) {
        setError(
          `Gagal memuat kategori: ${err instanceof Error ? err.message : "Terjadi kesalahan"}`
        );
      }
    };
    loadKategoriBerita();
  }, []);

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

      const fileInput = document.getElementById("sampul") as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        formDataToSend.append("sampul", fileInput.files[0]);
      }

      // Debug: Log FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await fetchData("/berita/createBerita", {
        method: "POST",
        data: formDataToSend,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berita berhasil ditambahkan!",
      });
      router.push("/berita");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Gagal menambahkan data: ${errorMessage}`,
      });
      console.error("Error details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toolbar component for Tiptap
  const Toolbar = () => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border border-gray-300 rounded-t-md">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          Bold
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          Italic
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          Underline
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          H1
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          H2
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          H3
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
        >
          Bullet List
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
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
          className={editor.isActive("link") ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
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
                    Tambah Berita
                  </h1>
                  <p className="text-sm text-gray-600">Tambahkan berita baru</p>
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
                <CardTitle className="text-blue-900">
                  Form Tambah Data
                </CardTitle>
                <CardDescription>Masukkan detail berita</CardDescription>
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
                      <EditorContentDynamic editor={editor} className="bg-white p-2 min-h-[200px]" />
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
                      Sampul (Gambar, Opsional)
                    </Label>
                    <Input
                      id="sampul"
                      name="sampul"
                      type="file"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
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
                      {isLoading ? "Menyimpan..." : "Simpan"}
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


//dah lumayan bagus sih ini ya!! 