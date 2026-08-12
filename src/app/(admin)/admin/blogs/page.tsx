"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AdminLayout from "../admin-layout";
import { BlogIcon, PencilIcon, PlusIcon, TrashIcon, UploadIcon } from "../_components/icons";
import { Badge, ConfirmDialog, EmptyState, FormSection, PageHeader, RowSkeleton, StatCard, inputClass, labelClass } from "../_components/ui";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
  };
};

type BlogArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "callout"; text: string };

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  category: "",
  slug: "",
  publishedAt: "",
  readTime: "5 min read",
  imageSrc: "",
  imageAlt: "",
};

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [articleContent, setArticleContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setPosts(data);
    } catch {
      console.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/blogs");
        const data = await res.json();
        if (mounted) {
          setPosts(data);
        }
      } catch {
        console.error("Failed to load posts");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("excerpt", form.excerpt);
        formData.append("category", form.category);
        formData.append("slug", form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
        formData.append("publishedAt", form.publishedAt || new Date().toISOString().split("T")[0]);
        formData.append("readTime", form.readTime);
        formData.append("imageAlt", form.imageAlt || form.title);
        formData.append("image", imageFile);

        const res = await fetch("/api/admin/blogs", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          setForm(EMPTY_FORM);
          setImageFile(null);
          setImagePreview(null);
          setArticleContent("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          fetchPosts();
        }
      } else {
        const payload = {
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          publishedAt: form.publishedAt || new Date().toISOString().split("T")[0],
          readTime: form.readTime,
          imageSrc: form.imageSrc,
          imageAlt: form.imageAlt || form.title,
        };

        const res = await fetch("/api/admin/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setForm(EMPTY_FORM);
          setImageFile(null);
          setImagePreview(null);
          setArticleContent("");
          fetchPosts();
        }
      }
    } catch {
      console.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch {
      console.error("Failed to delete post");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  const handleEdit = async (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      slug: post.slug,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      imageSrc: post.image.src,
      imageAlt: post.image.alt,
    });
    setImageFile(null);
    setImagePreview(post.image.src);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const res = await fetch(`/api/admin/blogs/${post.id}/article`);
      const data = await res.json();
      if (data.article) {
        setArticleContent(JSON.stringify(data.article.sections, null, 2));
      }
    } catch {
      setArticleContent("[]");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setSaving(true);
    try {
      let sections: BlogArticleBlock[] = [];
      try {
        sections = JSON.parse(articleContent);
      } catch {
        // ignore parse error
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("excerpt", form.excerpt);
        formData.append("category", form.category);
        formData.append("slug", form.slug);
        formData.append("publishedAt", form.publishedAt);
        formData.append("readTime", form.readTime);
        formData.append("imageAlt", form.imageAlt);
        formData.append("sections", JSON.stringify(sections));
        formData.append("image", imageFile);

        const res = await fetch(`/api/admin/blogs/${editingId}`, {
          method: "PUT",
          body: formData,
        });

        if (res.ok) {
          setEditingId(null);
          setForm(EMPTY_FORM);
          setImageFile(null);
          setImagePreview(null);
          setArticleContent("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          fetchPosts();
        }
      } else {
        const payload = {
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          slug: form.slug,
          publishedAt: form.publishedAt,
          readTime: form.readTime,
          imageSrc: form.imageSrc,
          imageAlt: form.imageAlt,
          sections,
        };

        const res = await fetch(`/api/admin/blogs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setEditingId(null);
          setForm(EMPTY_FORM);
          setImageFile(null);
          setImagePreview(null);
          setArticleContent("");
          fetchPosts();
        }
      }
    } catch {
      console.error("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setArticleContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PageHeader
          title="Blog Posts"
          description="Manage blog posts and article content shown on the home page"
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Posts" value={loading ? "–" : posts.length} icon={<BlogIcon className="h-5 w-5" />} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <FormSection title={editingId ? "Edit Blog Post" : "Add New Blog Post"}>
            <form onSubmit={editingId ? handleUpdate : handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                  placeholder="Blog post title"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputClass}
                  placeholder="url-friendly-slug"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className={inputClass}
                  rows={3}
                  placeholder="Short description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. Conditions"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className={inputClass}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Published Date</label>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Image</label>
                <div className="mt-1 flex flex-col gap-3">
                  <label className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-5 text-center text-sm text-slate-600 transition-colors hover:border-primary hover:bg-primary-soft/5 hover:text-primary">
                    <UploadIcon className="h-5 w-5" />
                    {imageFile ? imageFile.name : "Click to upload image"}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {(imagePreview || form.imageSrc) && (
                    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <Image
                        src={imagePreview || form.imageSrc}
                        alt={form.imageAlt || "Preview"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Upload an image or enter a URL below
                </p>
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  type="text"
                  value={form.imageSrc}
                  onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
                  className={inputClass}
                  placeholder="/images/..."
                />
              </div>

              <div>
                <label className={labelClass}>Image Alt Text</label>
                <input
                  type="text"
                  value={form.imageAlt}
                  onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                  className={inputClass}
                  placeholder="Image description"
                />
              </div>

              {editingId && (
                <div>
                  <label className={labelClass}>Article Content (JSON)</label>
                  <textarea
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    className={`${inputClass} font-mono`}
                    rows={12}
                    placeholder='[{"type": "paragraph", "text": "..."}]'
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Enter article sections as JSON array. Each item needs type: &quot;paragraph&quot;, &quot;heading&quot;, &quot;list&quot;, or &quot;callout&quot;.
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-50"
                >
                  {!editingId && <PlusIcon className="h-4 w-4" />}
                  {saving ? "Saving..." : editingId ? "Update Post" : "Add Post"}
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
          <FormSection title="Existing Posts">
            {loading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <RowSkeleton key={i} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="mt-4">
                <EmptyState icon={<BlogIcon className="h-6 w-6" />} title="No posts yet" description="Publish your first article using the form." />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {posts.map((post) => (
                  <li key={post.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50/60">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                      <Image src={post.image.src} alt={post.image.alt} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy">{post.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <Badge tone="teal">{post.category}</Badge>
                        <span className="text-xs text-slate-400">{post.publishedAt}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleEdit(post)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary-soft/15"
                        aria-label={`Edit ${post.title}`}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(post)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-rose-600 transition-colors hover:bg-rose-50"
                        aria-label={`Delete ${post.title}`}
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
        title="Delete this post?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : undefined}
        busy={!!deletingId}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && handleDelete(pendingDelete.id)}
      />
    </AdminLayout>
  );
}
