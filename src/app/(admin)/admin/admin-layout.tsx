"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BlogIcon, CalendarIcon, CloseIcon, ExternalLinkIcon, GalleryIcon, LogoIcon, LogoutIcon, MenuIcon, TestimonialIcon, VideoIcon } from "./_components/icons";

const NAV_ITEMS = [
  { href: "/admin/appointments", label: "Appointments", icon: CalendarIcon },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryIcon },
  { href: "/admin/videos", label: "Watch & Learn", icon: VideoIcon },
  { href: "/admin/testimonials", label: "Patient Experiences", icon: TestimonialIcon },
  { href: "/admin/blogs", label: "Blogs", icon: BlogIcon },
] as const;

// Auto-logout after this long with no mouse/keyboard/touch activity on the
// admin panel. Adjust freely — it's the only place this needs to change.
const IDLE_TIMEOUT_MS = 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activeItem = NAV_ITEMS.find((item) => pathname?.startsWith(item.href));

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } finally {
      router.push("/admin/login");
    }
  }, [router]);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(handleLogout, IDLE_TIMEOUT_MS);
    };

    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetIdleTimer));
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, [handleLogout]);

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-navy text-slate-200 transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-2 px-5 py-5">
            <Link href="/admin/gallery" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                <LogoIcon className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-sm font-semibold text-white">RAC Nepal</span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Admin Panel</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Manage Content
            </p>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/10 p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLinkIcon className="h-4 w-4 shrink-0 text-slate-400" />
              View Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogoutIcon className="h-4 w-4 shrink-0 text-slate-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Right side - Header + Body */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-slate-500 hover:text-navy lg:hidden"
                aria-label="Open sidebar"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
              <p className="text-sm text-slate-400">
                Admin
                {activeItem && (
                  <>
                    <span className="mx-1.5 text-slate-300">/</span>
                    <span className="font-medium text-navy">{activeItem.label}</span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                target="_blank"
                className="hidden items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-primary sm:flex"
              >
                View Site
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </Link>
              <div className="h-6 w-px bg-slate-200 sm:block hidden" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft/20 text-xs font-semibold text-primary-dark ring-1 ring-primary/20">
                A
              </div>
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
