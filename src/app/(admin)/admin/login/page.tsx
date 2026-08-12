"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertIcon, EyeIcon, EyeOffIcon, LogoIcon } from "../_components/icons";
import { inputClass, labelClass } from "../_components/ui";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin/gallery");
        router.refresh();
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-navy lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-primary) 35%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-primary-dark) 45%, transparent), transparent 55%)",
          }}
        />
        <div className="relative flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
            <LogoIcon className="h-6 w-6" />
          </span>
          <span className="font-display text-lg font-semibold text-white">RAC Nepal</span>
        </div>

        <div className="relative max-w-[28rem]">
          <h1 className="font-display text-3xl font-semibold leading-tight text-white">
            Manage your content, all in one place.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Update the gallery, videos, patient experiences, and blog posts shown on the
            Rheumatology &amp; Arthritis Care Nepal website.
          </p>
        </div>

        <p className="relative text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Rheumatology &amp; Arthritis Care Nepal
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2">
        <div className="w-full max-w-[24rem]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <LogoIcon className="h-6 w-6" />
            </span>
            <span className="font-display text-lg font-semibold text-navy">RAC Nepal</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-navy">Welcome back</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Sign in with your admin credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-navy shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-navy"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
                <AlertIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Restricted access &middot; Authorized administrators only
          </p>
        </div>
      </div>
    </div>
  );
}
