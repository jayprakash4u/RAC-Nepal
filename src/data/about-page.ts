import { siteConfig } from "@/config/site";
import type { PageHeroContent } from "@/types/page-hero-content";

const aboutPageAssets = "/images/aboutpage";

export const aboutPageHero = {
  eyebrow: "About Us",
  title: "Committed to Excellence in",
  titleAccent: "Rheumatology Care",
  description:
    "Providing expert diagnosis and personalized treatment for arthritis, joint disorders, and autoimmune conditions with a patient-first approach.",
  stats: [
    {
      value: "10+",
      label: "Years of Experience",
      icon: {
        src: `${aboutPageAssets}/3.png`,
        alt: "Years of experience",
      },
    },
    {
      value: "5000+",
      label: "Patients Treated",
      icon: {
        src: `${aboutPageAssets}/4.png`,
        alt: "Patients treated",
      },
    },
    {
      value: "Expert",
      label: "Rheumatology Care",
      icon: {
        src: `${aboutPageAssets}/5.png`,
        alt: "Expert rheumatology care",
      },
    },
  ],
  image: {
    src: `${aboutPageAssets}/right_image_clean.png`,
    alt: "Rheumatology specialist explaining knee joint anatomy to a patient at RAC Nepal",
    width: 900,
    height: 650,
  },
  primaryCta: {
    label: "Book Appointment",
    href: siteConfig.links.appointment,
    icon: {
      src: `${aboutPageAssets}/1.png`,
      alt: "",
    },
  },
  secondaryCta: {
    label: "Consult Specialist",
    href: "/services/rheumatology-consultation",
    icon: {
      src: `${aboutPageAssets}/2.png`,
      alt: "",
    },
  },
} satisfies PageHeroContent;
