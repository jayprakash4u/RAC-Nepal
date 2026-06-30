import { siteConfig } from "@/config/site";

const heroImage = "/images/home page image.png";

export const heroContent = {
  eyebrow: `${siteConfig.tagline} · Est. 2004`,
  title: "Advanced care for",
  titleAccent: "joints & autoimmune health",
  description:
    "Board-certified rheumatologists delivering precise diagnosis and compassionate treatment for arthritis, lupus, and complex autoimmune conditions.",
  stats: [
    { value: "20+", label: "Years of expertise" },
    { value: "8,500+", label: "Patients treated" },
    { value: "40+", label: "Conditions managed" },
  ],
  image: {
    src: heroImage,
    alt: "Rheumatology care illustration with joint pain highlights at RAC Nepal",
    width: 1200,
    height: 800,
  },
  primaryCta: {
    label: "Schedule a Consultation",
    href: siteConfig.links.appointment,
  },
  secondaryCta: {
    label: "Our Services",
    href: "/services",
  },
} as const;
