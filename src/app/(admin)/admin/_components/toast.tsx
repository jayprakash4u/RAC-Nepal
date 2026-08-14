"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { AlertIcon, CheckCircleIcon, CloseIcon } from "./icons";

type ToastTone = "success" | "error" | "info";

type Toast = {
  id: number;
  tone: ToastTone;
  message: string;
};

type ToastContextValue = {
  toast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DISMISS_AFTER_MS = 4500;

/**
 * Replaces the per-page `error` state + inline <Alert> banner each admin page
 * used to own. Those banners were set on failure but never cleared, so a
 * transient error stayed pinned to the top of the page for the rest of the
 * session.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, tone: ToastTone = "info") => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, tone, message }]);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const toneStyles: Record<ToastTone, { wrap: string; icon: React.ReactNode }> = {
  success: {
    wrap: "border-emerald-200 bg-white text-emerald-800",
    icon: <CheckCircleIcon className="h-4 w-4 text-emerald-600" />,
  },
  error: {
    wrap: "border-rose-200 bg-white text-rose-800",
    icon: <AlertIcon className="h-4 w-4 text-rose-600" />,
  },
  info: {
    wrap: "border-slate-200 bg-white text-navy",
    icon: <CheckCircleIcon className="h-4 w-4 text-primary" />,
  },
};

function ToastCard({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), DISMISS_AFTER_MS);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const tone = toneStyles[toast.tone];

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-lg shadow-navy/5",
        "motion-safe:animate-[admin-toast-in_180ms_ease-out]",
        tone.wrap,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="mt-0.5 shrink-0">{tone.icon}</span>
      <p className="min-w-0 flex-1 leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="-mr-1 shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy"
        aria-label="Dismiss notification"
      >
        <CloseIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx.toast;
}
