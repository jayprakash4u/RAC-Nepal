import { siteConfig } from "@/config/site";

const heroBackgroundImage = "/images/homepageherosecbgimage.png";

export const heroContent = {
  eyebrow: `${siteConfig.tagline} · Est. 2004`,
  title: "Advanced care for",
  titleAccent: "joints & autoimmune health",
  description:
    "Board-certified rheumatologists delivering precise diagnosis and compassionate treatment for arthritis, lupus, and complex autoimmune conditions.",
  backgroundImage: {
    src: heroBackgroundImage,
    alt: "",
  },
  stats: [
    { value: "20+", label: "Years of expertise" },
    { value: "8,500+", label: "Patients treated" },
    { value: "40+", label: "Conditions managed" },
  ],
  images: [
    {
      src: "/images/homeherosectionimge/1.png",
      alt: "Rheumatology consultation and patient care at RAC Nepal",
    },
    {
      src: "/images/homeherosectionimge/222222.png",
      alt: "Advanced rheumatology treatment and joint care at RAC Nepal",
    },
    {
      src: "/images/homeherosectionimge/3333.png",
      alt: "Specialized rheumatology services in Kathmandu",
    },
    {
      src: "/images/homeherosectionimge/4444.png",
      alt: "Comprehensive autoimmune and joint care at RAC Nepal",
    },
  ],
  primaryCta: {
    label: "Schedule a Consultation",
    href: siteConfig.links.appointment,
  },
  secondaryCta: {
    label: "Our Services",
    href: "/#specialized-services",
  },
} as const;
