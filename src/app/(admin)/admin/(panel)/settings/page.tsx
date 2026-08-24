"use client";

import { useEffect, useState } from "react";
import { ShareIcon } from "../../_components/icons";
import { Alert, FormSection, PageHeader, inputClass, labelClass } from "../../_components/ui";

const PLATFORMS = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourpage" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourpage" },
  { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/yourpage" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
] as const;

type FormState = Record<(typeof PLATFORMS)[number]["key"], string>;

const EMPTY_FORM: FormState = { facebook: "", instagram: "", tiktok: "", twitter: "", youtube: "" };

export default function AdminSettingsPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/social-links");
        const data = await res.json();
        if (mounted) {
          setForm({ ...EMPTY_FORM, ...data });
        }
      } catch {
        if (mounted) setError("Failed to load social links");
      } finally {
        if (mounted) setLoading(false);
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
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/social-links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to save social links");
      }
    } catch {
      setError("Failed to save social links");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Site Settings"
        description="Social media links shown in the header and footer across the site"
      />

      {error && <Alert tone="error">{error}</Alert>}
      {success && <Alert tone="success">Social links updated.</Alert>}

      <FormSection title="Social Media Links">
        {loading ? (
          <div className="mt-4 space-y-4">
            {PLATFORMS.map((p) => (
              <div key={p.key} className="h-14 animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {PLATFORMS.map((platform) => (
              <div key={platform.key}>
                <label className={labelClass}>{platform.label}</label>
                <input
                  type="url"
                  value={form[platform.key]}
                  onChange={(e) => setForm({ ...form, [platform.key]: e.target.value })}
                  className={inputClass}
                  placeholder={platform.placeholder}
                />
              </div>
            ))}

            <p className="text-xs text-slate-400">Leave a field blank to hide that icon on the site.</p>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              <ShareIcon className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </FormSection>
    </>
  );
}
