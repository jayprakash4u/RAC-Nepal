import { cn } from "@/lib/cn";

function JointLetter({
  char,
  className,
}: {
  char: string;
  className?: string;
}) {
  const lower = char.toLowerCase();

  if (lower === "i") {
    return (
      <span className={cn("joint-accent-i", className)}>
        {char}
      </span>
    );
  }

  if (lower === "s") {
    return (
      <span className={cn("joint-accent-s", className)}>
        {char}
      </span>
    );
  }

  return <span className={className}>{char}</span>;
}

export function JointStyledText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <JointLetter key={`${char}-${index}`} char={char} />
      ))}
    </span>
  );
}
