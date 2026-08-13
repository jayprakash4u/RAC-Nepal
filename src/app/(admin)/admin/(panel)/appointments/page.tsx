"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarIcon, ClockIcon, InboxIcon, MailIcon, PhoneIcon, TrashIcon } from "../../_components/icons";
import {
  Badge,
  ConfirmDialog,
  EmptyState,
  IconButton,
  PageHeader,
  Panel,
  RowSkeleton,
  SearchInput,
  StatCard,
  selectClass,
} from "../../_components/ui";
import { useToast } from "../../_components/toast";

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
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Appointment | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/admin/appointments");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (mounted) setAppointments(data);
      } catch {
        if (mounted) toast("Failed to load appointment requests", "error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [toast]);

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    setUpdatingId(id);
    const previous = appointments;
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
      toast(`Marked as ${STATUS_LABELS[status].toLowerCase()}`, "success");
    } catch {
      // Roll the optimistic update back rather than refetching — a refetch
      // races with any other row the user changed while this was in flight.
      setAppointments(previous);
      toast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setAppointments((current) => current.filter((a) => a.id !== id));
      toast("Request deleted", "success");
    } catch {
      toast("Failed to delete request", "error");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  const newCount = appointments.filter((a) => a.status === "new").length;
  const todayCount = appointments.filter(
    (a) => new Date(a.createdAt).toDateString() === new Date().toDateString(),
  ).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appointments.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.appointmentType.toLowerCase().includes(q)
      );
    });
  }, [appointments, query, statusFilter]);

  return (
    <>
      <PageHeader
        title="Appointment Requests"
        description="Requests submitted through the website's booking form"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total requests" value={appointments.length} loading={loading} icon={<CalendarIcon className="h-4.5 w-4.5" />} />
        <StatCard label="Needs follow-up" value={newCount} loading={loading} icon={<InboxIcon className="h-4.5 w-4.5" />} />
        <StatCard label="Received today" value={todayCount} loading={loading} icon={<ClockIcon className="h-4.5 w-4.5" />} />
      </div>

      <Panel>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name, email, phone or type"
            className="sm:max-w-xs"
          />
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-xs font-medium text-slate-500">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | "all")}
              className={selectClass}
            >
              <option value="all">All ({appointments.length})</option>
              {(Object.keys(STATUS_LABELS) as AppointmentStatus[]).map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

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
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<CalendarIcon className="h-6 w-6" />}
            title="No matching requests"
            description="Try a different search term or clear the status filter."
          />
        ) : (
          <ul className="space-y-3">
            {visible.map((appointment) => (
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
                      aria-label={`Status for ${appointment.name}`}
                      className={selectClass}
                    >
                      {(Object.keys(STATUS_LABELS) as AppointmentStatus[]).map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                    <IconButton
                      tone="danger"
                      onClick={() => setPendingDelete(appointment)}
                      label={`Delete request from ${appointment.name}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
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
      </Panel>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this request?"
        description={pendingDelete ? `The appointment request from "${pendingDelete.name}" will be permanently removed.` : undefined}
        busy={!!deletingId}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && handleDelete(pendingDelete.id)}
      />
    </>
  );
}
