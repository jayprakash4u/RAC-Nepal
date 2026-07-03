"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { isLinkActive, isNavItemActive } from "@/lib/navigation";
import type { NavDropdown } from "@/types/navigation";
import { cn } from "@/lib/cn";

const CLOSE_DELAY_MS = 220;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn(
        "h-4 w-4 transition-transform duration-normal",
        open && "rotate-180",
      )}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DropdownMenuLink({
  href,
  label,
  isActive,
  onSelect,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onSelect}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block w-full whitespace-nowrap rounded-lg px-md py-2.5 text-left text-small font-normal leading-snug text-navy transition-colors duration-normal",
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "hover:bg-surface hover:text-primary focus-visible:bg-surface focus-visible:text-primary focus-visible:outline-none",
      )}
    >
      {label}
    </Link>
  );
}

type DesktopNavDropdownProps = {
  item: NavDropdown;
  pathname: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DesktopNavDropdown({
  item,
  pathname,
  isOpen,
  onOpenChange,
}: DesktopNavDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  const menuId = useId();
  const triggerId = `${menuId}-trigger`;
  const isActive = isNavItemActive(pathname, item);

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    onOpenChangeRef.current(true);
  }, [clearCloseTimer]);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    onOpenChangeRef.current(false);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      onOpenChangeRef.current(false);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    onOpenChangeRef.current(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || rootRef.current?.contains(target)) {
        return;
      }
      closeMenu();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const isConditions = item.label === "Conditions Treated";
  const panelWidth = isConditions
    ? "w-[30rem] max-w-[calc(100vw-2rem)]"
    : item.label === "Services"
      ? "w-[18rem]"
      : "w-52";

  return (
    <li className="relative">
      <div
        ref={rootRef}
        className="relative"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          id={triggerId}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() =>
            onOpenChangeRef.current(isOpen ? false : true)
          }
          className={cn(
            "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-small font-medium transition-colors duration-normal",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isActive || isOpen
              ? "bg-primary/10 text-primary"
              : "text-slate-600 hover:bg-slate-100/80 hover:text-navy",
          )}
        >
          {item.label}
          <ChevronIcon open={isOpen} />
        </button>

        {isOpen ? (
          <div
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            className={cn(
              "absolute top-full z-dropdown pt-2 motion-safe:animate-[fadeIn_0.18s_ease-out_both] motion-reduce:animate-none",
              isConditions ? "right-0" : "left-0",
              panelWidth,
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-xl border border-slate-200/80 border-t-2 border-t-primary bg-white p-1.5 shadow-xl shadow-slate-900/10",
                panelWidth,
              )}
            >
              <ul className="space-y-0.5">
                {item.href ? (
                  <li role="none">
                    <DropdownMenuLink
                      href={item.href}
                      label={`All ${item.label}`}
                      isActive={isLinkActive(pathname, item.href)}
                      onSelect={closeMenu}
                    />
                  </li>
                ) : null}
                {item.children.map((child) => (
                  <li key={child.href} role="none">
                    <DropdownMenuLink
                      href={child.href}
                      label={child.label}
                      isActive={isLinkActive(pathname, child.href)}
                      onSelect={closeMenu}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
