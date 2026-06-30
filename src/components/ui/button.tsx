import { cn } from "@/lib/cn";
import Link from "next/link";

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  secondary:
    "bg-navy text-white hover:bg-primary-dark focus-visible:ring-navy",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-surface focus-visible:ring-primary",
  outlineOnDark:
    "border border-primary bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary focus-visible:ring-offset-hero",
  ghost:
    "bg-transparent text-primary hover:bg-surface focus-visible:ring-primary",
} as const;

const sizeStyles = {
  sm: "h-9 gap-xs px-md text-small",
  md: "h-11 gap-sm px-lg text-body",
  lg: "h-12 gap-sm px-xl text-body",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseStyles =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-button font-medium transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

function getButtonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonBaseProps) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export function Button(props: ButtonProps) {
  const { variant, size, className, href, ...rest } = props;
  const classes = getButtonClassName({ variant, size, className });

  if (href) {
    const linkProps = rest as Omit<
      ButtonAsLinkProps,
      "href" | "variant" | "size" | "className"
    >;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  const buttonProps = rest as Omit<
    ButtonAsButtonProps,
    "href" | "variant" | "size" | "className"
  >;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    />
  );
}
