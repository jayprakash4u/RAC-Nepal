"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { AlertIcon, CheckCircleIcon, SearchIcon, TrashIcon } from "./icons";

/* ------------------------------------------------------------------ layout */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-xl font-semibold tracking-tight text-navy sm:text-[1.75rem]">
          {title}
        </h1>
        {description && <p className="mt-1.5 text-sm text-slate-500">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}

/** Standard white surface every admin panel section sits on. */
export function Panel({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm shadow-navy/[0.03]",
        padded && "p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FormSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Panel>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-navy">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </Panel>
  );
}

/* ------------------------------------------------------------------- stats */

export function StatCard({
  label,
  value,
  icon,
  hint,
  loading = false,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  hint?: string;
  loading?: boolean;
}) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-navy/[0.03] transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft/20 text-primary-dark transition-colors group-hover:bg-primary group-hover:text-white">
          {icon}
        </span>
      </div>
      {loading ? (
        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-slate-100" />
      ) : (
        <p className="mt-3 font-display text-3xl font-semibold leading-none tracking-tight text-navy">
          {value}
        </p>
      )}
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ inputs */

const focusRing =
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const inputClass = cn(
  "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy shadow-sm transition-colors",
  "placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
  focusRing,
);

export const labelClass = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export const selectClass = cn(
  "rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-navy shadow-sm",
  "disabled:opacity-50",
  focusRing,
);

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-navy shadow-sm transition-colors",
          "placeholder:text-slate-400",
          focusRing,
        )}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- buttons */

const buttonVariants = {
  primary:
    "bg-primary text-white shadow-sm hover:bg-primary-dark focus-visible:ring-primary/30",
  secondary:
    "border border-slate-200 bg-white text-navy shadow-sm hover:bg-slate-50 focus-visible:ring-primary/20",
  danger: "bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus-visible:ring-rose-300",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-navy focus-visible:ring-primary/20",
} as const;

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function IconButton({
  label,
  tone = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50",
        tone === "danger"
          ? "text-rose-600 hover:bg-rose-50"
          : "text-slate-500 hover:bg-slate-100 hover:text-navy",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ badges */

const badgeTones = {
  teal: "bg-primary-soft/20 text-primary-dark ring-primary/20",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  rose: "bg-rose-50 text-rose-600 ring-rose-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
} as const;

export function Badge({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof badgeTones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Alert({
  tone = "error",
  children,
}: {
  tone?: "error" | "success";
  children: React.ReactNode;
}) {
  const isError = tone === "error";
  return (
    <div
      className={cn(
        "mb-6 flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm",
        isError
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      )}
      role="status"
    >
      {isError ? (
        <AlertIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
      ) : (
        <CheckCircleIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
      )}
      <span>{children}</span>
    </div>
  );
}

/* --------------------------------------------------------------- feedback */

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>
      <p className="mt-4 text-sm font-semibold text-navy">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-[22rem] text-xs leading-relaxed text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-4">
      <div className="aspect-4/3 w-full rounded-lg bg-slate-100" />
      <div className="mt-3 h-3 w-3/4 rounded bg-slate-100" />
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-lg border border-slate-100 p-3">
      <div className="h-12 w-16 shrink-0 rounded-md bg-slate-100" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-2/3 rounded bg-slate-100" />
        <div className="h-2.5 w-1/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ dialog */

/**
 * Accessible modal: labelled, focus-trapped, Escape-closable, and it restores
 * focus to whatever opened it. The previous version had none of that — screen
 * readers never saw a dialog and Tab wandered into the page behind the overlay.
 */
export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Stop the page behind the overlay from scrolling with the dialog open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("button, input, a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="relative w-full max-w-[26rem] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl motion-safe:animate-[admin-modal-in_160ms_ease-out]"
      >
        <h2 id={titleId} className="text-base font-semibold text-navy">
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}
        {children}
        {footer && <div className="mt-6 flex gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" className="flex-1" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting..." : confirmLabel}
          </Button>
        </>
      }
    >
      <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <TrashIcon className="h-5 w-5" />
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------- table */

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto sm:-mx-6">
      <div className="inline-block min-w-full align-middle px-5 sm:px-6">
        <table className="min-w-full border-separate border-spacing-0 text-sm">{children}</table>
      </div>
    </div>
  );
}

export function Th({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={cn(
        "whitespace-nowrap border-b border-slate-200 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("border-b border-slate-100 px-3 py-3 align-middle text-slate-600", className)}>
      {children}
    </td>
  );
}

export function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="transition-colors hover:bg-slate-50/70">{children}</tr>;
}
