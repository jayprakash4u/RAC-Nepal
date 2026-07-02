import { cn } from "@/lib/cn";

function StatIcons({ type }: { type: "expertise" | "patients" | "conditions" }) {
  if (type === "expertise") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-current">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "patients") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-current">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 19c0-2.8 2.2-5 5-5M13 19c0-2.2 1.6-4 3.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-current">
      <path d="M12 3.5l7 3.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V7l7-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroStat({
  value,
  label,
  iconType,
  featured = false,
  onDark = false,
}: {
  value: string;
  label: string;
  iconType: "expertise" | "patients" | "conditions";
  featured?: boolean;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-1.5 py-2.5 text-center sm:px-2 sm:py-3.5",
        featured && "px-md py-lg sm:px-2 sm:py-3.5",
      )}
    >
      <div className={onDark ? "text-primary-soft" : "text-primary"}>
        <StatIcons type={iconType} />
      </div>
      <p
        className={cn(
          "mt-1 font-display leading-none font-semibold sm:mt-1.5",
          onDark ? "text-white" : "text-primary",
          featured ? "text-[1.75rem]" : "text-[1.2rem] sm:text-[1.5rem]",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 font-semibold tracking-[0.08em] uppercase",
          onDark ? "text-white/75" : "text-slate-600",
          featured
            ? "text-[0.6875rem] leading-snug sm:text-[0.625rem] sm:tracking-[0.1em]"
            : "text-[0.5625rem] leading-tight sm:text-[0.625rem] sm:tracking-[0.1em]",
        )}
      >
        {label}
      </p>
    </div>
  );
}
