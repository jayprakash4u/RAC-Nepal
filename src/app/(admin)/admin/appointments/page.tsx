"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../admin-layout";
import { CalendarIcon, MailIcon, PhoneIcon, TrashIcon } from "../_components/icons";
import { Badge, ConfirmDialog, EmptyState, PageHeader, RowSkeleton, StatCard } from "../_components/ui";

type AppointmentStatus = "new" | "contacted" | "completed" | "cancelled";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  appointmentType: string;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  source: string | null;
  status: AppointmentStatus;
  emailSent: boolean;
  createdAt: string;
};

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  new: "New",
  contacted: "Contacted",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_TONES: Record<AppointmentStatus, "amber" | "teal" | "slate" | "rose"> = {
  new: "amber",
  contacted: "teal",
  completed: "slate",
  cancelled: "rose",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Appointment | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setAppointments(data);
    } catch {
      setError("Failed to load appointment requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/appointments");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (mounted) setAppointments(data);
      } catch {
        if (mounted) setError("Failed to load appointment requests");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    setUpdatingId(id);
    setAppointments((current) =>
      current.map((a) => (a.id === id ? { ...a, status } : a)),
    );

    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setError("Failed to update status");
      fetchAppointments();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAppointments((current) => current.filter((a) => a.id !== id));
      } else {
        setError("Failed to delete request");
      }
    } catch {
      setError("Failed to delete request");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  const newCount = appointments.filter((a) => a.status === "new").length;
  const todayCount = appointments.filter(
    (a) => new Date(a.createdAt).toDateString() === new Date().toDateString(),
  ).length;

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PageHeader
          title="Appointment Requests"
          description="Requests submitted through the website's booking form"
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Requests" value={loading ? "–" : appointments.length} icon={<CalendarIcon className="h-5 w-5" />} />
          <StatCard label="Needs Follow-up" value={loading ? "–" : newCount} icon={<CalendarIcon className="h-5 w-5" />} />
          <StatCard label="Received Today" value={loading ? "–" : todayCount} icon={<CalendarIcon className="h-5 w-5" />} />
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <RowSkeleton key={i} />
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon className="h-6 w-6" />}
              title="No appointment requests yet"
              description="Submissions from the website's booking form will show up here."
            />
          ) : (
            <ul className="space-y-3">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="rounded-xl border border-slate-100 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50/60"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-navy">{appointment.name}</p>
                        <Badge tone={STATUS_TONES[appointment.status]}>
                          {STATUS_LABELS[appointment.status]}
                        </Badge>
                        {!appointment.emailSent && (
                          <Badge tone="rose">Email not sent</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {appointment.appointmentType} &middot; Submitted {formatDateTime(appointment.createdAt)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment.id, e.target.value as AppointmentStatus)
                        }
                        disabled={updatingId === appointment.id}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-navy shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                      >
                        {(Object.keys(STATUS_LABELS) as AppointmentStatus[]).map((status) => (
                          <option key={status} value={status}>
                            {STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setPendingDelete(appointment)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-rose-600 transition-colors hover:bg-rose-50"
                        aria-label={`Delete request from ${appointment.name}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
                    <a href={`tel:${appointment.phone}`} className="flex items-center gap-1.5 hover:text-primary">
                      <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      {appointment.phone}
                    </a>
                    <a href={`mailto:${appointment.email}`} className="flex items-center gap-1.5 truncate hover:text-primary">
                      <MailIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{appointment.email}</span>
                    </a>
                    {appointment.preferredDate && (
                      <p className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        {formatDate(appointment.preferredDate)}
                        {appointment.preferredTime ? ` · ${appointment.preferredTime}` : ""}
                      </p>
                    )}
                    {appointment.source && (
                      <p className="truncate text-slate-400">Source: {appointment.source}</p>
                    )}
                  </div>

                  {appointment.message && (
                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                      {appointment.message}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this request?"
        description={pendingDelete ? `The appointment request from "${pendingDelete.name}" will be permanently removed.` : undefined}
        busy={!!deletingId}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && handleDelete(pendingDelete.id)}
      />
    </AdminLayout>
  );
}
