"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminLayout from "../admin-layout";
import { PencilIcon, PlusIcon, TrashIcon, VideoIcon } from "../_components/icons";
import { Badge, ConfirmDialog, EmptyState, FormSection, PageHeader, RowSkeleton, StatCard, inputClass, labelClass } from "../_components/ui";

type Video = {
  id: string;
  youtubeId: string;
  title: string;
  category: "education" | "patient-story" | "awareness";
  startSeconds?: number;
};

const CATEGORY_LABELS: Record<Video["category"], string> = {
  education: "Expert Talk",
  "patient-story": "Patient Story",
  awareness: "Awareness",
};

const CATEGORY_TONES: Record<Video["category"], "teal" | "amber" | "slate"> = {
  education: "teal",
  "patient-story": "amber",
  awareness: "slate",
};

const EMPTY_FORM = { youtubeId: "", title: "", category: "education" as Video["category"], startSeconds: 0 };

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Video | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      setVideos(data);
    } catch {
      console.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/videos");
        const data = await res.json();
        if (mounted) {
          setVideos(data);
        }
      } catch {
        console.error("Failed to load videos");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm(EMPTY_FORM);
        fetchVideos();
      }
    } catch {
      console.error("Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVideos();
      }
    } catch {
      console.error("Failed to delete video");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  const handleUpdate = async (id: string) => {
    const video = videos.find((v) => v.id === id);
    if (!video) return;

    setEditingId(id);
    setForm({
      youtubeId: video.youtubeId,
      title: video.title,
      category: video.category,
      startSeconds: video.startSeconds || 0,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/videos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setEditingId(null);
        setForm(EMPTY_FORM);
        fetchVideos();
      }
    } catch {
      console.error("Failed to update video");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PageHeader
          title="Watch & Learn Videos"
          description="Manage video content shown on the home page"
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Videos" value={loading ? "–" : videos.length} icon={<VideoIcon className="h-5 w-5" />} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <FormSection title={editingId ? "Edit Video" : "Add New Video"}>
            <form onSubmit={editingId ? handleUpdateSubmit : handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className={labelClass}>YouTube ID</label>
                <input
                  type="text"
                  value={form.youtubeId}
                  onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. ppCdSEBjNNM"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                  placeholder="Video title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Video["category"] })}
                    className={inputClass}
                  >
                    <option value="education">Expert Talk</option>
                    <option value="patient-story">Patient Story</option>
                    <option value="awareness">Awareness</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Start Time (sec)</label>
                  <input
                    type="number"
                    value={form.startSeconds}
                    onChange={(e) => setForm({ ...form, startSeconds: Number(e.target.value) })}
                    className={inputClass}
                    placeholder="0"
                  />
                </div>
              </div>

              {form.youtubeId && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <Image
                    src={`https://img.youtube.com/vi/${form.youtubeId}/mqdefault.jpg`}
                    alt="Video thumbnail preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-50"
                >
                  {!editingId && <PlusIcon className="h-4 w-4" />}
                  {saving ? "Saving..." : editingId ? "Update Video" : "Add Video"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </FormSection>

          {/* List */}
          <FormSection title="Existing Videos">
            {loading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <RowSkeleton key={i} />
                ))}
              </div>
            ) : videos.length === 0 ? (
              <div className="mt-4">
                <EmptyState icon={<VideoIcon className="h-6 w-6" />} title="No videos yet" description="Add your first video using the form." />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {videos.map((video) => (
                  <li key={video.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50/60">
                    <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                      <Image
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy">{video.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge tone={CATEGORY_TONES[video.category]}>{CATEGORY_LABELS[video.category]}</Badge>
                        <span className="text-xs text-slate-400">{video.youtubeId}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleUpdate(video.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary-soft/15"
                        aria-label={`Edit ${video.title}`}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(video)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-rose-600 transition-colors hover:bg-rose-50"
                        aria-label={`Delete ${video.title}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </FormSection>
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this video?"
        description={pendingDelete ? `"${pendingDelete.title}" will be removed from Watch & Learn.` : undefined}
        busy={!!deletingId}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && handleDelete(pendingDelete.id)}
      />
    </AdminLayout>
  );
}
