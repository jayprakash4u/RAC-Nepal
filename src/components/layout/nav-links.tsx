"use client";

import { mainNavigation } from "@/config/navigation";
import { isLinkActive, isNavItemActive } from "@/lib/navigation";
import { isNavDropdown, type NavItem } from "@/types/navigation";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { DesktopNavDropdown } from "@/components/layout/desktop-nav-dropdown";

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "drawer";
  onNavigate?: () => void;
};

function ChevronIcon({ open }: { open?: boolean }) {
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
  onNavigate,
  nested = false,
  variant = "default",
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
  nested?: boolean;
  variant?: "default" | "drawer";
}) {
  const isDrawer = variant === "drawer";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block w-full text-left font-medium leading-snug transition-colors duration-normal",
        nested
          ? cn(
              "block w-full min-w-0 break-words",
              isDrawer
                ? "rounded-md px-3 py-2 text-[0.875rem] hover:bg-slate-100"
                : "rounded-md py-2 pr-2 pl-3 text-[0.9375rem]",
            )
          : "px-md py-2.5 text-small",
        isActive
          ? "font-medium text-primary"
          : "text-slate-600 hover:text-primary",
      )}
    >
      {label}
    </Link>
  );
}

function DesktopNavLink({
  item,
  pathname,
}: {
  item: Extract<NavItem, { href: string }>;
  pathname: string;
}) {
  const isActive = isLinkActive(pathname, item.href);

  return (
    <li>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative inline-block whitespace-nowrap py-1 text-small font-medium transition-colors duration-normal",
          isActive
            ? "text-primary"
            : "text-slate-600 hover:text-primary",
        )}
      >
        {item.label}
        {isActive ? (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
        ) : null}
      </Link>
    </li>
  );
}

function MobileNavDropdown({
  item,
  pathname,
  onNavigate,
  variant = "default",
}: {
  item: Extract<NavItem, { children: readonly unknown[] }>;
  pathname: string;
  onNavigate?: () => void;
  variant?: "default" | "drawer";
}) {
  const isActive = isNavItemActive(pathname, item);
  const [expanded, setExpanded] = useState(isActive);
  const isDrawer = variant === "drawer";

  return (
    <li className={cn(!isDrawer && "border-b border-slate-100 last:border-b-0")}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
        className={cn(
          "flex w-full min-w-0 items-center justify-between gap-3 text-left font-medium leading-snug transition-colors duration-normal",
          isDrawer
            ? "rounded-lg px-3 py-2.5 text-[0.9375rem] hover:bg-slate-100"
            : "py-3.5 text-[1.0625rem]",
          isActive ? "text-primary" : "text-navy",
        )}
      >
        <span
          className={cn(
            "relative min-w-0 flex-1 pr-2",
            !isDrawer && "pl-3.5",
            isDrawer && isActive && "font-semibold",
          )}
        >
          {!isDrawer && isActive ? (
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
            />
          ) : null}
          {item.label}
        </span>
        <ChevronIcon open={expanded} />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-normal ease-default",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-w-0 overflow-hidden">
          <ul className={cn("space-y-0.5", isDrawer ? "pb-1 pl-2" : "pb-3 pl-4")}>
            {item.href ? (
              <li>
                <DropdownMenuLink
                  href={item.href}
                  label={`All ${item.label}`}
                  isActive={isLinkActive(pathname, item.href)}
                  onNavigate={onNavigate}
                  nested
                  variant={variant}
                />
              </li>
            ) : null}
            {item.children.map((child) => (
              <li key={child.href}>
                <DropdownMenuLink
                  href={child.href}
                  label={child.label}
                  isActive={isLinkActive(pathname, child.href)}
                  onNavigate={onNavigate}
                  nested
                  variant={variant}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MobileNavLink({
  item,
  pathname,
  onNavigate,
  variant = "default",
}: {
  item: Extract<NavItem, { href: string }>;
  pathname: string;
  onNavigate?: () => void;
  variant?: "default" | "drawer";
}) {
  const isActive = isLinkActive(pathname, item.href);
  const isDrawer = variant === "drawer";

  return (
    <li className={cn(!isDrawer && "border-b border-slate-100 last:border-b-0")}>
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative block w-full min-w-0 pr-2 font-medium leading-snug break-words transition-colors duration-normal",
          isDrawer
            ? "rounded-lg px-3 py-2.5 text-[0.9375rem] hover:bg-slate-100"
            : "py-3.5 pl-3.5 text-[1.0625rem]",
          isActive
            ? "font-semibold text-primary"
            : "text-navy hover:text-primary",
        )}
      >
        {!isDrawer && isActive ? (
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
          />
        ) : null}
        {item.label}
      </Link>
    </li>
  );
}

export function NavLinks({
  className,
  orientation = "horizontal",
  variant = "default",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();
  const [openDropdownLabel, setOpenDropdownLabel] = useState<string | null>(
    null,
  );

  const handleDropdownOpenChange = useCallback(
    (label: string, open: boolean) => {
      setOpenDropdownLabel(open ? label : null);
    },
    [],
  );

  return (
    <nav aria-label="Main navigation" className={cn("w-full min-w-0", className)}>
      <ul
        className={cn(
          orientation === "horizontal"
            ? "flex flex-wrap items-center justify-start gap-md overflow-visible lg:gap-lg"
            : cn(
                "flex w-full min-w-0 flex-col",
                variant === "drawer" && "gap-0.5",
              ),
        )}
      >
        {mainNavigation.map((item) =>
          orientation === "horizontal" ? (
            isNavDropdown(item) ? (
              <DesktopNavDropdown
                key={item.label}
                item={item}
                pathname={pathname}
                isOpen={openDropdownLabel === item.label}
                onOpenChange={(open) =>
                  handleDropdownOpenChange(item.label, open)
                }
              />
            ) : (
              <DesktopNavLink key={item.href} item={item} pathname={pathname} />
            )
          ) : isNavDropdown(item) ? (
            <MobileNavDropdown
              key={item.label}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
              variant={variant}
            />
          ) : (
            <MobileNavLink
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
              variant={variant}
            />
          ),
        )}
      </ul>
    </nav>
  );
}
