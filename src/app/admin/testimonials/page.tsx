"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../admin-layout";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image?: {
    src: string;
    alt: string;
  };
  initials: string;
};

type TestimonialPayload = Omit<Testimonial, "id"> & { image?: { src: string; alt: string } };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ quote: "", name: "", role: "", initials: "", imageSrc: "", imageAlt: "" });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch {
      console.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/testimonials");
        const data = await res.json();
        if (mounted) {
          setTestimonials(data);
        }
      } catch {
        console.error("Failed to load testimonials");
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
      const payload: TestimonialPayload = {
        quote: form.quote,
        name: form.name,
        role: form.role,
        initials: form.initials,
      };

      if (form.imageSrc) {
        payload.image = { src: form.imageSrc, alt: form.imageAlt || form.name };
      }

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setForm({ quote: "", name: "", role: "", initials: "", imageSrc: "", imageAlt: "" });
        fetchTestimonials();
      }
    } catch {
      console.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch {
      console.error("Failed to delete testimonial");
    }
  };

  const handleUpdate = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);
    if (!testimonial) return;

    setEditingId(id);
    setForm({
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      initials: testimonial.initials,
      imageSrc: testimonial.image?.src || "",
      imageAlt: testimonial.image?.alt || "",
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setSaving(true);
    try {
      const payload: TestimonialPayload = {
        quote: form.quote,
        name: form.name,
        role: form.role,
        initials: form.initials,
      };

      if (form.imageSrc) {
        payload.image = { src: form.imageSrc, alt: form.imageAlt || form.name };
      }

      const res = await fetch(`/api/admin/testimonials/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingId(null);
        setForm({ quote: "", name: "", role: "", initials: "", imageSrc: "", imageAlt: "" });
        fetchTestimonials();
      }
    } catch {
      console.error("Failed to update testimonial");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ quote: "", name: "", role: "", initials: "", imageSrc: "", imageAlt: "" });
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-navy sm:text-2xl">Patient Experiences</h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-small">
            Manage testimonials for the home page
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-navy">
              {editingId ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <form onSubmit={editingId ? handleUpdateSubmit : handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Patient name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Role / Condition</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="e.g. Rheumatoid Arthritis Patient, Kathmandu"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Initials</label>
                <input
                  type="text"
                  value={form.initials}
                  onChange={(e) => setForm({ ...form, initials: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="e.g. SS"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Quote</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  rows={4}
                  placeholder="Patient testimonial quote"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Image URL (optional)</label>
                <input
                  type="text"
                  value={form.imageSrc}
                  onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="/images/what our patient/1.jpg"
                />
              </div>

              {form.imageSrc && (
                <div>
                  <label className="block text-sm font-medium text-navy">Image Alt Text</label>
                  <input
                    type="text"
                    value={form.imageAlt}
                    onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Portrait of [Name], RAC Nepal patient"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
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
            <h2 className="text-lg font-medium text-navy">Existing Testimonials</h2>
            {loading ? (
              <p className="mt-4 text-sm text-slate-600">Loading...</p>
            ) : testimonials.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No testimonials yet</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy truncate">{testimonial.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">{testimonial.quote}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleUpdate(testimonial.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary-soft/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
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
