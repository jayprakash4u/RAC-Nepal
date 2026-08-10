"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../admin-layout";

type Video = {
  id: string;
  youtubeId: string;
  title: string;
  category: "education" | "patient-story" | "awareness";
  startSeconds?: number;
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ youtubeId: "", title: "", category: "education" as Video["category"], startSeconds: 0 });

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
        setForm({ youtubeId: "", title: "", category: "education", startSeconds: 0 });
        fetchVideos();
      }
    } catch {
      console.error("Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVideos();
      }
    } catch {
      console.error("Failed to delete video");
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
        setForm({ youtubeId: "", title: "", category: "education", startSeconds: 0 });
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
    setForm({ youtubeId: "", title: "", category: "education", startSeconds: 0 });
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-navy sm:text-2xl">Watch & Learn Videos</h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-small">
            Manage video content for the home page
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-navy">
              {editingId ? "Edit Video" : "Add New Video"}
            </h2>
            <form onSubmit={editingId ? handleUpdateSubmit : handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy">YouTube ID</label>
                <input
                  type="text"
                  value={form.youtubeId}
                  onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="e.g. ppCdSEBjNNM"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Video title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Video["category"] })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="education">Expert Talk</option>
                  <option value="patient-story">Patient Story</option>
                  <option value="awareness">Awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Start Time (seconds)</label>
                <input
                  type="number"
                  value={form.startSeconds}
                  onChange={(e) => setForm({ ...form, startSeconds: Number(e.target.value) })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="0"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update Video" : "Add Video"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-navy hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-navy">Existing Videos</h2>
            {loading ? (
              <p className="mt-4 text-sm text-slate-600">Loading...</p>
            ) : videos.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No videos yet</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {videos.map((video) => (
                  <li key={video.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy truncate">{video.title}</p>
                      <p className="text-xs text-slate-500">ID: {video.youtubeId} | Category: {video.category}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleUpdate(video.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary-soft/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
