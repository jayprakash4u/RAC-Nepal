"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";

function LogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M7 17H3a1 1 0 01-1-1V4a1 1 0 011-1h4M14 14l4-4-4-4M18 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 lg:justify-start lg:gap-2">
            <Link href="/admin/gallery" className="flex items-center gap-2">
              <LogoIcon />
              <span className="font-display text-lg font-semibold text-navy">Admin Panel</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/gallery"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M2 4h4l2-2h8v14H2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 10h8M6 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/videos"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M7 3v12a2 2 0 002 2h6M7 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Watch & Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/testimonials"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M10 2a5 5 0 100 10 5 5 0 000-10zM2 18c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Patient Experiences
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/blogs"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-slate-50 hover:text-primary"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M4 4h12v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-slate-200 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Right side - Header + Body */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              aria-label="Open sidebar"
            >
              <MenuIcon />
            </button>

            <div className="ml-auto flex items-center gap-3">
              <Link
                href="/"
                className="text-sm text-slate-600 transition-colors hover:text-navy"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
