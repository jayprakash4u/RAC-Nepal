"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { NavLinks } from "./nav-links";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function HeaderNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <div className="flex min-w-0 flex-1 items-center justify-start gap-md lg:gap-lg">
        <div className="hidden items-center justify-start gap-md overflow-visible lg:flex lg:gap-lg">
          <NavLinks className="overflow-visible" />
          <Button
            href={siteConfig.links.appointment}
            size="sm"
            className="shrink-0"
          >
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-button text-navy transition-colors duration-normal hover:bg-surface lg:hidden",
            open && "bg-surface text-primary",
          )}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "fixed inset-x-0 top-[var(--site-header-offset)] z-overlay max-h-[calc(100vh-var(--site-header-offset))] overflow-y-auto border-b border-slate-200 bg-white shadow-lg transition-all duration-normal lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0",
        )}
      >
        <div className="container-content flex flex-col gap-lg py-lg">
          <NavLinks orientation="vertical" onNavigate={() => setOpen(false)} />
          <Button
            href={siteConfig.links.appointment}
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Book Appointment
          </Button>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 top-[var(--site-header-offset)] z-sticky bg-navy/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
