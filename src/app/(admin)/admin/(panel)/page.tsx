"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BlogIcon,
  CalendarIcon,
  ChevronRightIcon,
  GalleryIcon,
  InboxIcon,
  TestimonialIcon,
  VideoIcon,
} from "../_components/icons";
import { Badge, EmptyState, PageHeader, Panel, RowSkeleton, StatCard } from "../_components/ui";

type Appointment = {
  id: string;
  name: string;
  appointmentType: string;
  status: "new" | "contacted" | "completed" | "cancelled";
  createdAt: string;
};

type Counts = {
  appointments: Appointment[];
  gallery: number;
  videos: number;
  testimonials: number;
  blogs: number;
};

const STATUS_TONES = {
  new: "amber",
  contacted: "teal",
  completed: "slate",
  cancelled: "rose",
} as const;

/** Each card links to the section it summarises — a count with no way to act on it is decoration. */
const CONTENT_LINKS = [
  { href: "/admin/gallery", label: "Gallery images", key: "gallery", icon: GalleryIcon },
  { href: "/admin/videos", label: "Watch & Learn videos", key: "videos", icon: VideoIcon },
  { href: "/admin/testimonials", label: "Patient experiences", key: "testimonials", icon: TestimonialIcon },
  { href: "/admin/blogs", label: "Blog posts", key: "blogs", icon: BlogIcon },
] as const;

async function fetchCount(url: string): Promise<number> {
  try {
    const res = await fetch(url);
    if (!res.ok) return 0;
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  } catch {
    return 0;
  }
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [appointmentsRes, gallery, videos, testimonials, blogs] = await Promise.all([
          fetch("/api/admin/appointments"),
          fetchCount("/api/admin/gallery"),
          fetchCount("/api/admin/videos"),
          fetchCount("/api/admin/testimonials"),
          fetchCount("/api/admin/blogs"),
        ]);

        if (!appointmentsRes.ok) throw new Error("Failed to load");
        const appointments: Appointment[] = await appointmentsRes.json();

        if (mounted) setData({ appointments, gallery, videos, testimonials, blogs });
      } catch {
        if (mounted) setFailed(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const appointments = data?.appointments ?? [];
  const newCount = appointments.filter((a) => a.status === "new").length;
  const todayCount = appointments.filter(
    (a) => new Date(a.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  const recent = appointments.slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Everything happening across the RAC Nepal website at a glance."
      />

      {failed && (
        <Panel className="mb-6 border-rose-200 bg-rose-50/60">
          <p className="text-sm font-medium text-rose-800">Couldn&apos;t reach the database</p>
          <p className="mt-1 text-sm text-rose-700">
            The admin panel loaded, but the content APIs aren&apos;t responding. Check that the
            database connection details in <code className="font-mono text-xs">.env</code> are
            correct and the server is reachable.
          </p>
        </Panel>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total requests"
          value={appointments.length}
          loading={loading}
          icon={<CalendarIcon className="h-4.5 w-4.5" />}
          hint="All appointment requests received"
        />
        <StatCard
          label="Needs follow-up"
          value={newCount}
          loading={loading}
          icon={<InboxIcon className="h-4.5 w-4.5" />}
          hint="Still marked as new"
        />
        <StatCard
          label="Received today"
          value={todayCount}
          loading={loading}
          icon={<CalendarIcon className="h-4.5 w-4.5" />}
          hint="Submitted in the last 24 hours"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ------------------------------------------------ recent activity */}
        <Panel className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-navy">Recent requests</h2>
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
            >
              View all
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <RowSkeleton key={i} />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon className="h-6 w-6" />}
              title="No requests yet"
              description="Submissions from the website's booking form will appear here."
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {recent.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy">{a.name}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {a.appointmentType} &middot;{" "}
                      {new Date(a.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    </p>
                  </div>
                  <Badge tone={STATUS_TONES[a.status]}>{a.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* -------------------------------------------------- content stats */}
        <Panel>
          <h2 className="mb-4 text-base font-semibold text-navy">Content</h2>
          <ul className="space-y-1">
            {CONTENT_LINKS.map((item) => {
              const Icon = item.icon;
              const count = data?.[item.key] ?? 0;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-slate-50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-primary-soft/25 group-hover:text-primary-dark">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-slate-600 group-hover:text-navy">
                      {item.label}
                    </span>
                    <span className="shrink-0 font-display text-sm font-semibold text-navy">
                      {loading ? "–" : count}
                    </span>
                    <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-slate-300 group-hover:text-primary" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </>
  );
}
