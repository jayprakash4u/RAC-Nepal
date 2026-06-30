export type PageHeroContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  stats: ReadonlyArray<{
    value: string;
    label: string;
    icon: { src: string; alt: string };
  }>;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  primaryCta: {
    label: string;
    href: string;
    icon: { src: string; alt: string };
  };
  secondaryCta: {
    label: string;
    href: string;
    icon: { src: string; alt: string };
  };
};
