import { cn } from "@/lib/cn";

export type PageHeroProps = {
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function PageHero({
  title,
  titleAccent,
  description,
  align = "center",
  className,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        align === "center" && "section-intro text-center",
        align === "left" && "w-full text-left",
        className,
      )}
    >
      <h1 className="text-h2 w-full text-pretty font-bold text-navy lg:text-h1">
        {title}
        {titleAccent ? (
          <>
            {" "}
            <span className="text-primary">{titleAccent}</span>
          </>
        ) : null}
      </h1>

      {description ? (
        <p className="text-body mt-md w-full text-pretty text-slate-600">
          {description}
        </p>
      ) : null}
    </header>
  );
}
