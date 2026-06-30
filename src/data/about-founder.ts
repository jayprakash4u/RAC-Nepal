import { siteConfig } from "@/config/site";

export type BioSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export const aboutFounderSection = {
  badge: `About ${siteConfig.shortName}`,
  title: {
    prefix: "About",
    highlight: "Us",
  },
  founded:
    "Founded on 15th January 2018 by Dr. Arun Kumar Gupta.",
  image: {
    src: "/images/aboutimage.png",
    alt: "Dr. Arun Kumar Gupta — Founder, Rheumatology and Arthritis Center",
    width: 520,
    height: 640,
  },
  bio: [
    {
      type: "text",
      value:
        "Dr. Arun Kumar Gupta, founder of Rheumatology and Arthritis Center (RAC), is a highly experienced and renowned rheumatologist, graduated from the University of Petrishlumba Moscow. He completed his Internal Medicine residency at BSMMU, Dhaka, Bangladesh, specializing in the diagnosis and treatment of musculoskeletal and autoimmune diseases. He completed his Rheumatology (Clinical Immunology) fellowship at IPGMR Lucknow, India. Dr. Gupta is Board Certified in Rheumatology from Nepal Medical Council (NMC), Kathmandu. He is a member of the ",
    },
    {
      type: "link",
      label: "American College of Rheumatology (ACR)",
      href: "https://www.rheumatology.org",
    },
    {
      type: "text",
      value: ", ",
    },
    {
      type: "link",
      label: "Indian College of Rheumatology",
      href: "https://www.indianrheumatology.org.in",
    },
    {
      type: "text",
      value:
        ", and Life member of the Bangladesh Rheumatology Society. He is a life member of Bangladesh Physician Society and Nepal Internal Medicine Society. He is currently the President of Nepal Rheumatology Association.",
    },
  ] as const satisfies readonly BioSegment[],
} as const;
