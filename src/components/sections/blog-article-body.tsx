import type { BlogArticleBlock } from "@/types/blog-content";
import { cn } from "@/lib/cn";

function BlogParagraph({ text }: { text: string }) {
  return (
    <p className="text-body-loose text-pretty text-slate-600">{text}</p>
  );
}

function BlogHeading({ text }: { text: string }) {
  return (
    <h2 className="text-h3 mt-2xl font-bold text-navy first:mt-0">{text}</h2>
  );
}

function BlogList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-md flex flex-col gap-sm">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-sm text-body-loose text-slate-600 before:mt-[0.55rem] before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary"
        >
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlogCallout({ text }: { text: string }) {
  return (
    <div className="mt-xl rounded-2xl border border-primary/20 bg-primary/5 px-lg py-lg sm:px-xl">
      <p className="text-body font-medium text-pretty text-primary-dark">{text}</p>
    </div>
  );
}

export function BlogArticleBody({
  sections,
  className,
}: {
  sections: readonly BlogArticleBlock[];
  className?: string;
}) {
  return (
    <article className={cn("flex flex-col gap-md", className)}>
      {sections.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <BlogParagraph key={index} text={block.text} />;
          case "heading":
            return <BlogHeading key={index} text={block.text} />;
          case "list":
            return <BlogList key={index} items={block.items} />;
          case "callout":
            return <BlogCallout key={index} text={block.text} />;
          default:
            return null;
        }
      })}
    </article>
  );
}
