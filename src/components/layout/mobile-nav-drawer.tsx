"use client";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { NavLinks } from "@/components/layout/nav-links";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={cn(
          "fixed inset-0 z-overlay bg-navy/45 backdrop-blur-[1px] transition-opacity duration-slow ease-default lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        onClick={onClose}
      />

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={open ? undefined : true}
        className={cn(
          "fixed top-0 left-0 z-modal flex h-dvh w-[min(88vw,20rem)] max-w-full flex-col overflow-hidden rounded-r-2xl bg-white shadow-[4px_0_24px_rgba(15,23,42,0.12)] transition-transform duration-slow ease-default lg:hidden",
          open ? "translate-x-0" : "pointer-events-none -translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 pt-[max(0.875rem,env(safe-area-inset-top))] pb-3.5">
          <Logo
            priority
            onNavigate={onClose}
            imageClassName="h-10"
            className="min-w-0"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-2 py-3">
          <NavLinks orientation="vertical" variant="drawer" onNavigate={onClose} />
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-slate-50/70 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button href={siteConfig.links.appointment} size="lg" className="w-full" onClick={onClose}>
            Book Appointment
          </Button>
          <p className="mt-3 text-center text-[0.8125rem] leading-relaxed text-pretty text-slate-500">
            Need help now?{" "}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="font-medium break-all text-primary transition-colors hover:text-primary-dark"
            >
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>
      </div>
    </>,
    document.body,
  );
}
