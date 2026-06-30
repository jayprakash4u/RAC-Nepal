import { getDropdownByLabel } from "@/lib/navigation";
import { siteConfig } from "@/config/site";
import { mainNavigation } from "@/config/navigation";
import { isNavDropdown, type NavLink } from "@/types/navigation";
import { Container } from "@/components/ui";
import Link from "next/link";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { cn } from "@/lib/cn";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-sm text-xs font-semibold tracking-wider text-primary uppercase">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-small text-slate-300 transition-colors duration-normal hover:text-white"
    >
      {children}
    </Link>
  );
}

function FooterLinkList({ links }: { links: readonly NavLink[] }) {
  return (
    <ul className="flex flex-col gap-xs">
      {links.map((item) => (
        <li key={item.href}>
          <FooterLink href={item.href}>{item.label}</FooterLink>
        </li>
      ))}
    </ul>
  );
}

function FooterCollapsibleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-white/10 py-sm last:border-b-0 md:hidden">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between",
          "text-xs font-semibold tracking-wider text-primary uppercase",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        {title}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-normal group-open:rotate-180"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="mt-sm pb-sm">{children}</div>
    </details>
  );
}

function ContactItem({
  icon,
  href,
  children,
  compact = false,
}: {
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  const content = (
    <>
      <span className={cn("shrink-0 text-primary", !compact && "mt-0.5")}>
        {icon}
      </span>
      <span>{children}</span>
    </>
  );

  const className = cn(
    "flex items-start gap-sm text-slate-300 transition-colors duration-normal hover:text-white",
    compact ? "text-xs leading-snug" : "text-small leading-snug",
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267a11.042 11.042 0 005.516 5.516l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.732 0-14-6.268-14-14V4.5A1.5 1.5 0 012 3.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  const currentYear = new Date().getFullYear();
  const conditionsNav = getDropdownByLabel("Conditions Treated");
  const otherNav = getDropdownByLabel("Other");
  const quickLinks = mainNavigation.filter(
    (item): item is NavLink => !isNavDropdown(item),
  );

  const resourceLinks = [
    ...(conditionsNav?.href
      ? [{ label: conditionsNav.label, href: conditionsNav.href }]
      : []),
    ...(otherNav?.children ?? []),
  ];

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <Container className="py-xl md:py-3xl">
        {/* Mobile layout */}
        <div className="flex flex-col gap-md md:hidden">
          <div className="flex items-center justify-between gap-md">
            <Logo imageClassName="h-9" />
            <SocialLinks />
          </div>

          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-md gap-y-sm">
              <li>
                <ContactItem
                  icon={<PhoneIcon />}
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  compact
                >
                  {contact.phone}
                </ContactItem>
              </li>
              <li>
                <ContactItem
                  icon={<MailIcon />}
                  href={`mailto:${contact.email}`}
                  compact
                >
                  {contact.email}
                </ContactItem>
              </li>
              <li>
                <ContactItem icon={<LocationIcon />} compact>
                  {contact.address}
                </ContactItem>
              </li>
              <li>
                <ContactItem icon={<ClockIcon />} compact>
                  {contact.hours}
                </ContactItem>
              </li>
            </ul>
          </div>

          <FooterCollapsibleSection title="Quick Links">
            <ul className="grid grid-cols-2 gap-x-md gap-y-xs">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterCollapsibleSection>

          <FooterCollapsibleSection title="Resources">
            <ul className="grid grid-cols-2 gap-x-md gap-y-xs">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterCollapsibleSection>
        </div>

        {/* Desktop layout */}
        <div className="hidden gap-xl md:grid sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-sm sm:col-span-2 lg:col-span-1">
            <Logo imageClassName="h-11" />
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase">
              {siteConfig.tagline}
            </p>
            <SocialLinks className="mt-xs" />
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList links={quickLinks} />
          </div>

          <div>
            <FooterHeading>Resources</FooterHeading>
            <FooterLinkList links={resourceLinks} />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="flex flex-col gap-sm">
              <li>
                <ContactItem
                  icon={<PhoneIcon />}
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                >
                  {contact.phone}
                </ContactItem>
              </li>
              <li>
                <ContactItem icon={<MailIcon />} href={`mailto:${contact.email}`}>
                  {contact.email}
                </ContactItem>
              </li>
              <li>
                <ContactItem icon={<LocationIcon />}>{contact.address}</ContactItem>
              </li>
              <li>
                <ContactItem icon={<ClockIcon />}>{contact.hours}</ContactItem>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-sm text-center text-xs text-slate-400 md:flex md:flex-row md:items-center md:justify-between md:py-md md:text-left">
          <p>
            &copy; {currentYear} {siteConfig.shortName}. All rights reserved.
          </p>
          <p className="mt-xs hidden text-slate-400 md:mt-0 md:block">
            {siteConfig.name}
          </p>
        </Container>
      </div>
    </footer>
  );
}
