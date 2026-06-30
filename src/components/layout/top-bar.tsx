import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { SocialLinks } from "./social-links";

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267a11.042 11.042 0 005.516 5.516l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.732 0-14-6.268-14-14V4.5A1.5 1.5 0 012 3.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TopBarItem({
  href,
  icon,
  children,
  className,
}: {
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const itemClassName = cn(
    "inline-flex items-center gap-sm text-slate-100 transition-colors duration-normal hover:text-white",
    className,
  );

  const content = (
    <>
      {icon}
      <span className="truncate">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={itemClassName}>
        {content}
      </a>
    );
  }

  return <span className={itemClassName}>{content}</span>;
}

export function TopBar() {
  const { contact } = siteConfig;

  return (
    <div className="border-b border-white/10 bg-primary-dark text-slate-100">
      <Container
        size="wide"
        className="flex h-10 items-center justify-between gap-md text-small"
      >
        <div className="flex min-w-0 items-center gap-md md:gap-lg">
          <TopBarItem
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            icon={<PhoneIcon />}
          >
            {contact.phone}
          </TopBarItem>

          <TopBarItem
            href={`mailto:${contact.email}`}
            icon={<MailIcon />}
            className="hidden sm:inline-flex"
          >
            {contact.email}
          </TopBarItem>

          <TopBarItem icon={<ClockIcon />} className="hidden lg:inline-flex">
            {contact.hours}
          </TopBarItem>
        </div>

        <SocialLinks
          linkClassName="h-7 w-7 text-slate-100 hover:text-white"
        />
      </Container>
    </div>
  );
}
