"use client";

import { siteConfig } from "@/config/site";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { NavLinks } from "@/components/layout/nav-links";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useCallback, useState } from "react";

function MenuIcon() {
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
      <path d="M5 7h14" />
      <path d="M5 12h14" />
      <path d="M5 17h14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <rect x="3" y="4.25" width="14" height="12.5" rx="2" />
      <path d="M3 8.25h14M6.5 2.5v3M13.5 2.5v3" />
    </svg>
  );
}

export function HeaderNav() {
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="flex min-w-0 flex-1 items-center justify-start gap-md lg:gap-lg">
        <div className="hidden items-center justify-start gap-md overflow-visible lg:flex lg:gap-lg">
          <NavLinks className="overflow-visible" />
          <span className="h-6 w-px shrink-0 bg-slate-200" aria-hidden="true" />
          <Button
            href={siteConfig.links.appointment}
            size="sm"
            className="shrink-0 gap-xs shadow-sm hover:shadow-md"
          >
            <CalendarIcon />
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-navy transition-[opacity,visibility] duration-normal hover:bg-slate-100 lg:hidden",
            open && "pointer-events-none invisible",
          )}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <MobileNavDrawer open={open} onClose={closeMenu} />
    </>
  );
}
