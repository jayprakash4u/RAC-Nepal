"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button, Modal } from "./ui";
import {
  BlogIcon,
  CalendarIcon,
  ChevronRightIcon,
  CloseIcon,
  DashboardIcon,
  ExternalLinkIcon,
  GalleryIcon,
  LogoIcon,
  LogoutIcon,
  MenuIcon,
  TestimonialIcon,
  VideoIcon,
} from "./icons";

type NavItem = {
  href: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  /** Only `/admin` should match exactly — everything else matches its subtree. */
  exact?: boolean;
};

const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true }],
  },
  {
    heading: "Patients",
    items: [{ href: "/admin/appointments", label: "Appointments", icon: CalendarIcon }],
  },
  {
    heading: "Content",
    items: [
      { href: "/admin/gallery", label: "Gallery", icon: GalleryIcon },
      { href: "/admin/videos", label: "Watch & Learn", icon: VideoIcon },
      { href: "/admin/testimonials", label: "Patient Experiences", icon: TestimonialIcon },
      { href: "/admin/blogs", label: "Blogs", icon: BlogIcon },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

// Auto-logout after this long with no mouse/keyboard/touch activity, with a
// countdown warning first so nobody loses a half-written blog post to it.
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const IDLE_WARNING_MS = 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;

function isActive(pathname: string | null, item: NavItem) {
  if (!pathname) return false;
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [idleWarning, setIdleWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(IDLE_WARNING_MS / 1000);
  const router = useRouter();
  const pathname = usePathname();

  const activeItem = useMemo(
    () => ALL_ITEMS.find((item) => isActive(pathname, item)),
    [pathname],
  );

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } finally {
      router.push("/admin/login");
    }
  }, [router]);

  /* --------------------------------------------------------- idle timeout */
  const warnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Arms both timers. Deliberately sets no state, so it is safe to call from an effect body. */
  const armIdleTimers = useCallback(() => {
    if (warnTimer.current) clearTimeout(warnTimer.current);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    warnTimer.current = setTimeout(() => {
      setSecondsLeft(IDLE_WARNING_MS / 1000);
      setIdleWarning(true);
    }, IDLE_TIMEOUT_MS - IDLE_WARNING_MS);
    logoutTimer.current = setTimeout(handleLogout, IDLE_TIMEOUT_MS);
  }, [handleLogout]);

  const staySignedIn = useCallback(() => {
    setIdleWarning(false);
    armIdleTimers();
  }, [armIdleTimers]);

  useEffect(() => {
    // While the warning is up we deliberately stop listening for activity —
    // otherwise the mousemove toward the "Stay signed in" button would
    // silently dismiss it and the click would land on nothing.
    if (idleWarning) return;

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, armIdleTimers, { passive: true }),
    );
    armIdleTimers();

    return () => {
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, armIdleTimers));
    };
  }, [idleWarning, armIdleTimers]);

  useEffect(() => {
    return () => {
      if (warnTimer.current) clearTimeout(warnTimer.current);
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!idleWarning) return;
    const tick = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(tick);
  }, [idleWarning]);

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ------------------------------------------------------- sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[16.5rem] transform flex-col bg-navy text-slate-300 transition-transform duration-200",
          "lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Admin navigation"
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/5 px-5 py-4">
          <Link href="/admin" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <LogoIcon className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold text-white">RAC Nepal</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Admin Panel
              </span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-slate-400 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.heading} className="mb-5 last:mb-0">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                {group.heading}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(pathname, item);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                          active
                            ? "bg-white/10 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {active && (
                          <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                        )}
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            active ? "text-primary" : "text-slate-500 group-hover:text-primary",
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/5 p-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ExternalLinkIcon className="h-4 w-4 shrink-0 text-slate-500" />
            View live site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogoutIcon className="h-4 w-4 shrink-0 text-slate-500" />
            Sign out
          </button>
        </div>
      </aside>

      {/* -------------------------------------------------- content column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy lg:hidden"
                aria-label="Open navigation"
              >
                <MenuIcon className="h-5 w-5" />
              </button>

              <nav aria-label="Breadcrumb" className="min-w-0">
                <ol className="flex items-center gap-1 text-sm">
                  <li>
                    <Link href="/admin" className="text-slate-400 transition-colors hover:text-primary">
                      Admin
                    </Link>
                  </li>
                  {activeItem && !activeItem.exact && (
                    <>
                      <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />
                      <li className="truncate font-medium text-navy" aria-current="page">
                        {activeItem.label}
                      </li>
                    </>
                  )}
                </ol>
              </nav>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-primary sm:flex"
              >
                View site
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </Link>
              <div className="hidden h-6 w-px bg-slate-200 sm:block" />
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft/25 text-xs font-semibold text-primary-dark ring-1 ring-primary/20"
                title="Signed in as administrator"
              >
                A
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</div>
        </main>
      </div>

      <Modal
        open={idleWarning}
        title="Still there?"
        description={`You'll be signed out in ${secondsLeft} second${secondsLeft === 1 ? "" : "s"} because of inactivity.`}
        onClose={staySignedIn}
        footer={
          <>
            <Button variant="secondary" className="flex-1" onClick={handleLogout}>
              Sign out now
            </Button>
            <Button className="flex-1" onClick={staySignedIn}>
              Stay signed in
            </Button>
          </>
        }
      />
    </div>
  );
}
