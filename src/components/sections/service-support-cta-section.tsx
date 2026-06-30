import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import type { ServiceSupportCtaSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function DotGrid({
  className,
  colorClassName = "bg-slate-300/70",
}: {
  className?: string;
  colorClassName?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid grid-cols-4 gap-1.5", className)}
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className={cn("h-1.5 w-1.5 rounded-full", colorClassName)}
        />
      ))}
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white"
      fill="none"
    >
      <path
        d="M12 3 5 6v5.8c0 4.8 3.2 9.2 7 10.7 3.8-1.5 7-5.9 7-10.7V6l-7-3z"
        fill="currentColor"
      />
      <path
        d="M12 8v6M9 11h6"
        stroke="#1496a8"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <rect
        x="3"
        y="4"
        width="14"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3 8h14M7 2.5V5M13 2.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M5.5 3.5h2.2l1 3.8-1.6 1.1a9.2 9.2 0 0 0 4.4 4.4l1.1-1.6 3.8 1v2.2a1.5 1.5 0 0 1-1.5 1.5C8.2 16.9 3.1 11.8 3.1 5a1.5 1.5 0 0 1 1.4-1.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafAccent() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 40"
      className="h-9 w-11 text-primary"
      fill="currentColor"
    >
      <path d="M8 34c6-10 14-16 24-18-8 4-14 10-18 18H8z" opacity="0.35" />
      <path d="M18 30c4-8 10-12 18-14-6 3-10 7-13 14H18z" opacity="0.55" />
      <path d="M26 26c3-5 7-8 14-9-4 2-7 5-9 9H26z" />
    </svg>
  );
}

function ImageWaveDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 520"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute top-0 z-20 h-full w-[5.5rem] text-[#f3fafb] sm:w-[6.5rem] lg:w-[7.5rem]",
        className,
      )}
    >
      <path
        fill="currentColor"
        d="M120,0 C35,90 35,430 120,520 L120,0 Z"
      />
    </svg>
  );
}

export function ServiceSupportCtaSection({
  section,
}: {
  section: ServiceSupportCtaSectionData;
}) {
  const title = section.title;

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-primary/10",
            "bg-linear-to-br from-[#f3fafb] via-[#f7fcfd] to-[#eaf6f8]",
            "shadow-[0_18px_45px_-30px_rgba(15,23,42,0.22)]",
          )}
        >
          <DotGrid className="absolute top-5 left-5 hidden sm:grid" />

          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className={cn(
                "relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12",
                "motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none",
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-sm">
                <ShieldIcon />
              </div>

              <h2 className="font-display mt-5 max-w-[24rem] text-[1.625rem] font-semibold leading-tight tracking-tight text-pretty sm:mt-6 sm:text-[1.875rem] lg:text-[2rem]">
                <span className="text-navy">{title.prefix} </span>
                <span className="text-primary">{title.highlight}</span>
                {title.suffix ? (
                  <span className="text-navy"> {title.suffix}</span>
                ) : null}
              </h2>

              <p className="mt-4 max-w-[26rem] text-small leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                {section.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={section.primaryCta.href}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-navy px-5",
                    "text-[0.875rem] font-medium text-white transition-colors duration-300 hover:bg-primary-dark sm:px-6 sm:text-body",
                  )}
                >
                  <CalendarIcon />
                  {section.primaryCta.label}
                  <span aria-hidden="true" className="text-white/80">
                    →
                  </span>
                </Link>

                <Link
                  href={section.secondaryCta.href}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2.5 rounded-full border-2 border-primary bg-white px-5",
                    "text-[0.875rem] font-medium text-primary transition-colors duration-300 hover:bg-primary-soft/25 sm:px-6 sm:text-body",
                  )}
                >
                  <PhoneIcon />
                  {section.secondaryCta.label}
                  <span aria-hidden="true" className="text-primary/70">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div
              className={cn(
                "relative min-h-[15rem] sm:min-h-[18rem] lg:min-h-[22rem]",
                "motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none",
              )}
              style={{ animationDelay: "120ms" }}
            >
              <ImageWaveDivider className="left-0 hidden -translate-x-[42%] lg:block" />

              <svg
                aria-hidden="true"
                viewBox="0 0 120 520"
                preserveAspectRatio="none"
                className="pointer-events-none absolute top-0 left-0 z-20 h-8 w-full text-[#eaf6f8] lg:hidden"
              >
                <path fill="currentColor" d="M0,0 L120,0 C70,40 50,80 120,120 L0,120 Z" />
              </svg>

              <div className="absolute inset-0 bg-linear-to-l from-primary-soft/35 via-primary-soft/20 to-transparent" />

              <Image
                src={section.image.src}
                alt={section.image.alt}
                fill
                className="object-contain object-right-bottom p-4 sm:p-6 lg:p-8"
                sizes="(max-width: 1024px) 100vw, 42vw"
                unoptimized
              />

              <div className="pointer-events-none absolute right-5 bottom-5 hidden items-end gap-3 sm:flex">
                <LeafAccent />
                <DotGrid colorClassName="bg-primary/45" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
