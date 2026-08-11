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

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 3.5L10 8l-4 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        "group flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-lg px-md py-2.5 text-left text-[0.8125rem] font-normal leading-snug text-navy transition-colors duration-normal",
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "hover:bg-surface hover:text-primary focus-visible:bg-surface focus-visible:text-primary focus-visible:outline-none",
      )}
    >
      {label}
      <ChevronRightIcon
        className={cn(
          "h-3.5 w-3.5 shrink-0 -translate-x-1 text-slate-300 opacity-0 transition-all duration-normal",
          "group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100",
          isActive && "translate-x-0 text-primary opacity-100",
        )}
      />
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

  const isServices = item.label === "Services";
  const isConditions = item.label === "Conditions Treated";

  const panelWidth = isServices
    ? "w-[32rem] max-w-[calc(100vw-2rem)]"
    : isConditions
      ? "w-[34rem] max-w-[calc(100vw-2rem)]"
      : "w-56";

  const renderTableContent = () => {
    if (isServices || isConditions) {
      return (
        <div>
          <p className="px-2.5 pt-1 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            {item.label}
          </p>
          <ul className="grid grid-cols-2 gap-x-1 gap-y-0.5">
            {item.children.map((child) => (
              <li key={child.href} role="none">
                <Link
                  href={child.href}
                  onClick={closeMenu}
                  aria-current={
                    isLinkActive(pathname, child.href) ? "page" : undefined
                  }
                  className={cn(
                    "group flex items-center gap-1.5 rounded-lg px-3 py-2 text-left text-[0.8125rem] font-medium leading-snug break-words transition-colors duration-normal",
                    isLinkActive(pathname, child.href)
                      ? "bg-primary/10 text-primary"
                      : "text-navy hover:bg-surface hover:text-primary",
                  )}
                >
                  <span className="min-w-0">{child.label}</span>
                  <ChevronRightIcon
                    className={cn(
                      "h-3 w-3 shrink-0 -translate-x-1 text-slate-300 opacity-0 transition-all duration-normal",
                      "group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100",
                      isLinkActive(pathname, child.href) &&
                        "translate-x-0 text-primary opacity-100",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
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
    );
  };

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
                "overflow-hidden rounded-xl border border-slate-200/80 border-t-2 border-t-primary bg-white p-2 shadow-xl shadow-slate-900/10",
                panelWidth,
              )}
            >
              {renderTableContent()}
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
