"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminLayout from "../admin-layout";
import { GalleryIcon, ImagePlaceholderIcon, TrashIcon, UploadIcon } from "../_components/icons";
import { Alert, CardSkeleton, ConfirmDialog, EmptyState, PageHeader, StatCard } from "../_components/ui";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<GalleryImage | null>(null);
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
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);

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
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PageHeader
          title="Gallery Management"
          description="Upload, manage, and delete images shown in the site gallery"
          action={
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-50">
              <UploadIcon className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          }
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Images" value={loading ? "–" : images.length} icon={<GalleryIcon className="h-5 w-5" />} />
        </div>

        {error && <Alert tone="error">{error}</Alert>}

        {loading ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <li key={i}>
                <CardSkeleton />
              </li>
            ))}
          </ul>
        ) : images.length === 0 ? (
          <EmptyState
            icon={<ImagePlaceholderIcon className="h-6 w-6" />}
            title="No images yet"
            description="Upload your first image to get started building the gallery."
          />
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {images.map((image) => (
              <li key={image.id} className="group relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-navy/60 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      onClick={() => setPendingDelete(image)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-rose-600 shadow-sm transition-colors hover:bg-white"
                      aria-label={`Delete ${image.alt}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="mt-2 truncate text-xs text-slate-600" title={image.alt}>
                  {image.alt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this image?"
        description={pendingDelete ? `"${pendingDelete.alt}" will be permanently removed from the gallery.` : undefined}
        busy={!!deletingId}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && handleDelete(pendingDelete.id)}
      />
    </AdminLayout>
  );
}
