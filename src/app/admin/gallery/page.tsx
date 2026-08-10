"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminLayout from "../admin-layout";
import "@/styles/admin.css";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        if (mounted) {
          setImages(data);
        }
      } catch {
        if (mounted) {
          setError("Failed to load images");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("alt", file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "));

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const galleryRes = await fetch("/api/admin/gallery");
        const galleryData = await galleryRes.json();
        setImages(galleryData);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        const galleryRes = await fetch("/api/admin/gallery");
        const galleryData = await galleryRes.json();
        setImages(galleryData);
      } else {
        setError(data.message || "Delete failed");
      }
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-navy sm:text-2xl">Gallery Management</h1>
            <p className="mt-1 text-xs text-slate-600 sm:text-small">
              Upload, manage, and delete gallery images
            </p>
          </div>

          <label className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50">
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-small text-slate-600">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-body text-slate-600">No images yet</p>
            <p className="mt-1 text-small text-slate-600">Upload your first image to get started</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {images.map((image) => (
              <li key={image.id} className="group relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                <div className="mt-2 flex items-start justify-between gap-2">
                  <p className="flex-1 truncate text-xs text-navy" title={image.alt}>
                    {image.alt}
                  </p>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${image.alt}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
