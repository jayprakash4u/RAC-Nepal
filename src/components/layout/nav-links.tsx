"use client";

import { mainNavigation } from "@/config/navigation";
import { isLinkActive, isNavItemActive } from "@/lib/navigation";
import { isNavDropdown, type NavItem } from "@/types/navigation";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  orientation?: "horizontal" | "vertical";
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
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block w-full px-md py-2.5 text-left text-small font-normal leading-snug text-navy transition-colors duration-normal",
        isActive
          ? "bg-surface text-primary"
          : "hover:bg-surface hover:text-primary",
      )}
    >
      {label}
    </Link>
  );
}

function DropdownPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-slate-200 border-t-4 border-t-primary bg-white shadow-md",
        className,
      )}
    >
      {children}
    </div>
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

function DesktopNavDropdown({
  item,
  pathname,
}: {
  item: Extract<NavItem, { children: readonly unknown[] }>;
  pathname: string;
}) {
  const isActive = isNavItemActive(pathname, item);

  return (
    <li className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap py-1 text-small font-medium transition-colors duration-normal",
          isActive
            ? "text-primary"
            : "text-slate-600 hover:text-primary",
        )}
      >
        {item.label}
        <ChevronIcon />
      </button>

      <div className="invisible absolute top-full left-0 z-dropdown pt-3 opacity-0 transition-all duration-normal group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <DropdownPanel
          className={cn(
            item.label === "Conditions Treated" || item.label === "Services"
              ? "w-[18rem]"
              : "w-52",
          )}
        >
          <ul className="divide-y divide-slate-100">
            {item.href ? (
              <li>
                <DropdownMenuLink
                  href={item.href}
                  label={`All ${item.label}`}
                  isActive={isLinkActive(pathname, item.href)}
                />
              </li>
            ) : null}
            {item.children.map((child) => (
              <li key={child.href}>
                <DropdownMenuLink
                  href={child.href}
                  label={child.label}
                  isActive={isLinkActive(pathname, child.href)}
                />
              </li>
            ))}
          </ul>
        </DropdownPanel>
      </div>
    </li>
  );
}

function MobileNavDropdown({
  item,
  pathname,
  onNavigate,
}: {
  item: Extract<NavItem, { children: readonly unknown[] }>;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = isNavItemActive(pathname, item);

  return (
    <li className="border-b border-slate-200 pb-md last:border-b-0 last:pb-0">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between py-2 text-left text-small font-semibold transition-colors duration-normal",
          isActive ? "text-primary" : "text-navy",
        )}
      >
        {item.label}
        <ChevronIcon open={expanded} />
      </button>

      {expanded ? (
        <div className="mt-sm">
          <DropdownPanel>
            <ul className="divide-y divide-slate-100">
              {item.href ? (
                <li>
                  <DropdownMenuLink
                    href={item.href}
                    label={`All ${item.label}`}
                    isActive={isLinkActive(pathname, item.href)}
                    onNavigate={onNavigate}
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
                  />
                </li>
              ))}
            </ul>
          </DropdownPanel>
        </div>
      ) : null}
    </li>
  );
}

function MobileNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: Extract<NavItem, { href: string }>;
  pathname: string;
  onNavigate?: () => void;
}) {
  const isActive = isLinkActive(pathname, item.href);

  return (
    <li className="border-b border-slate-200 pb-md last:border-b-0 last:pb-0">
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "block py-2 text-small font-semibold transition-colors duration-normal",
          isActive ? "text-primary" : "text-navy hover:text-primary",
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}

export function NavLinks({
  className,
  orientation = "horizontal",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className={className}>
      <ul
        className={cn(
          orientation === "horizontal"
            ? "flex flex-wrap items-center justify-start gap-md lg:gap-lg"
            : "flex flex-col gap-md",
        )}
      >
        {mainNavigation.map((item) =>
          orientation === "horizontal" ? (
            isNavDropdown(item) ? (
              <DesktopNavDropdown
                key={item.label}
                item={item}
                pathname={pathname}
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
            />
          ) : (
            <MobileNavLink
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ),
        )}
      </ul>
    </nav>
  );
}
