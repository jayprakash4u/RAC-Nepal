"use client";

import { appointmentBookingContent } from "@/data/appointment-booking";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AppointmentBookingForm } from "./appointment-booking-form";
import { useAppointmentBooking } from "./appointment-booking-provider";

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
      className="h-5 w-5"
    >
      <rect x="3" y="4.25" width="14" height="12.5" rx="2" />
      <path d="M3 8.25h14M6.5 2.5v3M13.5 2.5v3" />
    </svg>
  );
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AppointmentBookingModal() {
  const { isOpen, closeBookingModal, options } = useAppointmentBooking();
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeBookingModal();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeBookingModal],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  if (!mounted) {
    return null;
  }

  const { title, description, hoursNote, footer } = appointmentBookingContent;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-modal transition-opacity duration-normal",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close appointment booking dialog"
        className={cn(
          "absolute inset-0 bg-navy/50 backdrop-blur-[2px] transition-opacity duration-normal",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeBookingModal}
        tabIndex={isOpen ? 0 : -1}
      />

      <div className="pointer-events-none relative flex h-full w-full items-end justify-center p-0 sm:items-center sm:p-md">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          inert={isOpen ? undefined : true}
          className={cn(
            "pointer-events-auto relative flex max-h-[min(92dvh,820px)] w-full max-w-[40rem] flex-col overflow-hidden",
            "rounded-t-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15 sm:rounded-2xl",
            "transition-transform duration-normal ease-default",
            isOpen ? "translate-y-0" : "translate-y-full sm:translate-y-4",
          )}
        >
          <div className="shrink-0 border-b border-slate-100 bg-linear-to-r from-primary-soft/40 to-white px-md py-lg sm:px-xl">
            <div className="flex items-start gap-md">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                <CalendarIcon />
              </div>

              <div className="min-w-0 flex-1 pr-2">
                <h2
                  id={titleId}
                  className="font-display text-[1.25rem] font-semibold leading-tight text-navy sm:text-h3"
                >
                  {title}
                </h2>
                <p
                  id={descriptionId}
                  className="mt-1 text-small leading-relaxed text-slate-600"
                >
                  {description}
                </p>
                <p className="mt-2 text-[0.8125rem] font-medium text-primary">
                  {hoursNote}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close"
                onClick={closeBookingModal}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-md py-lg sm:px-xl">
            <AppointmentBookingForm options={options} />
          </div>

          <div className="shrink-0 border-t border-slate-100 bg-slate-50/80 px-md py-md sm:px-xl">
            <p className="text-center text-[0.8125rem] leading-relaxed text-slate-600">
              {footer.prefix}{" "}
              <span className="font-medium text-navy">{footer.phoneLabel}</span>{" "}
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="font-medium text-primary transition-colors hover:text-primary-dark"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
