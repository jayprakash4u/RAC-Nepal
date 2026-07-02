import { siteConfig } from "@/config/site";

const aboutPageAssets = "/images/aboutpage";

export type BioSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export type FounderStat = {
  value: string;
  label: string;
  icon: {
    src: string;
    alt: string;
  };
};

export const aboutFounderSection = {
  badge: "Our Founder",
  title: {
    prefix: "About",
    highlight: siteConfig.shortName,
  },
  founderName: "Dr. Arun Kumar Gupta",
  founderRole: "Founder & Lead Rheumatologist",
  intro:
    "Founded in January 2018, RAC Nepal delivers specialist rheumatology and arthritis care with a patient-first approach.",
  image: {
    src: "/images/aboutimage.png",
    alt: "Dr. Arun Kumar Gupta — Founder, Rheumatology and Arthritis Center",
    width: 520,
    height: 640,
  },
  stats: [
    {
      value: "2018",
      label: "Year Established",
      icon: {
        src: `${aboutPageAssets}/3.png`,
        alt: "Year established",
      },
    },
    {
      value: "NMC",
      label: "Board Certified",
      icon: {
        src: `${aboutPageAssets}/4.png`,
        alt: "Board certified rheumatology",
      },
    },
    {
      value: "NRA",
      label: "Association President",
      icon: {
        src: `${aboutPageAssets}/5.png`,
        alt: "Nepal Rheumatology Association",
      },
    },
  ],
  bio: [
    {
      type: "text",
      value:
        "Dr. Arun Kumar Gupta trained in Moscow, completed Internal Medicine at BSMMU Dhaka, and a Rheumatology fellowship at IPGMR Lucknow. He is Board Certified by the Nepal Medical Council (NMC) and a member of the ",
    },
    {
      type: "link",
      label: "American College of Rheumatology (ACR)",
      href: "https://www.rheumatology.org",
    },
    {
      type: "text",
      value: " and ",
    },
    {
      type: "link",
      label: "Indian College of Rheumatology",
      href: "https://www.indianrheumatology.org.in",
    },
    {
      type: "text",
      value:
        ". He currently serves as President of the Nepal Rheumatology Association.",
    },
  ] as const satisfies readonly BioSegment[],
} as const satisfies {
  badge: string;
  title: { prefix: string; highlight: string };
  founderName: string;
  founderRole: string;
  intro: string;
  image: { src: string; alt: string; width: number; height: number };
  stats: readonly FounderStat[];
  bio: readonly BioSegment[];
};
