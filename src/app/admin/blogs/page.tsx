"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AdminLayout from "../admin-layout";

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

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    slug: "",
    publishedAt: "",
    readTime: "5 min read",
    imageSrc: "",
    imageAlt: "",
  });
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
          setForm({ title: "", excerpt: "", category: "", slug: "", publishedAt: "", readTime: "5 min read", imageSrc: "", imageAlt: "" });
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
          setForm({ title: "", excerpt: "", category: "", slug: "", publishedAt: "", readTime: "5 min read", imageSrc: "", imageAlt: "" });
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
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch {
      console.error("Failed to delete post");
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
          setForm({ title: "", excerpt: "", category: "", slug: "", publishedAt: "", readTime: "5 min read", imageSrc: "", imageAlt: "" });
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
          setForm({ title: "", excerpt: "", category: "", slug: "", publishedAt: "", readTime: "5 min read", imageSrc: "", imageAlt: "" });
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
    setForm({ title: "", excerpt: "", category: "", slug: "", publishedAt: "", readTime: "5 min read", imageSrc: "", imageAlt: "" });
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
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-navy sm:text-2xl">Blog Posts</h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-small">
            Manage blog posts and article content for the home page
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-navy">
              {editingId ? "Edit Blog Post" : "Add New Blog Post"}
            </h2>
            <form onSubmit={editingId ? handleUpdate : handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Blog post title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="url-friendly-slug"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Short description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                    placeholder="e.g. Conditions"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy">Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Published Date</label>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Image</label>
                <div className="mt-1 flex flex-col gap-3">
                  <label className="cursor-pointer rounded-md border border-dashed border-slate-300 px-4 py-3 text-center text-sm text-slate-600 transition-colors hover:border-primary hover:text-primary">
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
                <label className="block text-sm font-medium text-navy">Image URL</label>
                <input
                  type="text"
                  value={form.imageSrc}
                  onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="/images/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy">Image Alt Text</label>
                <input
                  type="text"
                  value={form.imageAlt}
                  onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Image description"
                />
              </div>

              {editingId && (
                <div>
                  <label className="block text-sm font-medium text-navy">Article Content (JSON)</label>
                  <textarea
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-mono"
                    rows={12}
                    placeholder='[{"type": "paragraph", "text": "..."}]'
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Enter article sections as JSON array. Each item needs type: &quot;paragraph&quot;, &quot;heading&quot;, &quot;list&quot;, or &quot;callout&quot;.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update Post" : "Add Post"}
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
            <h2 className="text-lg font-medium text-navy">Existing Posts</h2>
            {loading ? (
              <p className="mt-4 text-sm text-slate-600">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No posts yet</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {posts.map((post) => (
                  <li key={post.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy truncate">{post.title}</p>
                      <p className="text-xs text-slate-500">{post.category} • {post.publishedAt}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleEdit(post)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary-soft/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
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
