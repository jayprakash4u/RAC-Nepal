import { cn } from "@/lib/cn";

const sizeStyles = {
  content: "container-content",
  narrow: "container-narrow",
  wide: "container-wide",
} as const;

export type ContainerSize = keyof typeof sizeStyles;

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

export function Container({
  size = "content",
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(sizeStyles[size], className)} {...props} />
  );
}
