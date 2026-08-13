"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminLayout from "../admin-layout";
import { PencilIcon, PlusIcon, TestimonialIcon, TrashIcon } from "../_components/icons";
import { ConfirmDialog, EmptyState, FormSection, PageHeader, RowSkeleton, StatCard, inputClass, labelClass } from "../_components/ui";

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

const EMPTY_FORM = { quote: "", name: "", role: "", initials: "", imageSrc: "", imageAlt: "" };

function Avatar({ testimonial }: { testimonial: Pick<Testimonial, "image" | "initials" | "name"> }) {
  if (testimonial.image?.src) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
        <Image src={testimonial.image.src} alt={testimonial.image.alt} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft/15 text-sm font-semibold text-primary-dark">
      {testimonial.initials || testimonial.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Testimonial | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

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
        setForm(EMPTY_FORM);
        fetchTestimonials();
      }
    } catch {
      console.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch {
      console.error("Failed to delete testimonial");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
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
        setForm(EMPTY_FORM);
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
    setForm(EMPTY_FORM);
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PageHeader
          title="Patient Experiences"
          description="Manage testimonials shown on the home page"
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Testimonials" value={loading ? "–" : testimonials.length} icon={<TestimonialIcon className="h-5 w-5" />} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <FormSection title={editingId ? "Edit Testimonial" : "Add New Testimonial"}>
            <form onSubmit={editingId ? handleUpdateSubmit : handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Patient name"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Role / Condition</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Rheumatoid Arthritis Patient, Kathmandu"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Initials</label>
                <input
                  type="text"
                  value={form.initials}
                  onChange={(e) => setForm({ ...form, initials: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. SS"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Quote</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className={inputClass}
                  rows={4}
                  placeholder="Patient testimonial quote"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Image URL (optional)</label>
                <input
                  type="text"
                  value={form.imageSrc}
                  onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
                  className={inputClass}
                  placeholder="/images/what our patient/1.jpg"
                />
              </div>

              {form.imageSrc && (
                <div>
                  <label className={labelClass}>Image Alt Text</label>
                  <input
                    type="text"
                    value={form.imageAlt}
                    onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                    className={inputClass}
                    placeholder="Portrait of [Name], RAC Nepal patient"
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
                  {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
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
          <FormSection title="Existing Testimonials">
            {loading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <RowSkeleton key={i} />
                ))}
              </div>
            ) : testimonials.length === 0 ? (
              <div className="mt-4">
                <EmptyState icon={<TestimonialIcon className="h-6 w-6" />} title="No testimonials yet" description="Add your first patient story using the form." />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50/60">
                    <Avatar testimonial={testimonial} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy">{testimonial.name}</p>
                      <p className="truncate text-xs text-slate-500">{testimonial.role}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleUpdate(testimonial.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary-soft/15"
                        aria-label={`Edit ${testimonial.name}`}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(testimonial)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-rose-600 transition-colors hover:bg-rose-50"
                        aria-label={`Delete ${testimonial.name}`}
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
        title="Delete this testimonial?"
        description={pendingDelete ? `${pendingDelete.name}'s testimonial will be removed from the home page.` : undefined}
        busy={!!deletingId}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && handleDelete(pendingDelete.id)}
      />
    </AdminLayout>
  );
}
