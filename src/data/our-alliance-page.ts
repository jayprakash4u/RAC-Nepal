import { siteConfig } from "@/config/site";
import type { PageHeroContent } from "@/types/page-hero-content";

const heroIcons = "/images/aboutpage";
const ourAllianceAssets = "/images/Our allience";

export const ourAlliancePageHero = {
  eyebrow: "Partnerships",
  title: "Our Alliance for",
  titleAccent: "Better Rheumatology Care",
  description:
    "We collaborate with trusted healthcare partners to expand access, improve outcomes, and deliver seamless care for patients with arthritis and autoimmune conditions.",
  stats: [
    {
      value: "Trusted",
      label: "Healthcare Network",
      icon: {
        src: `${heroIcons}/5.png`,
        alt: "Trusted healthcare network",
      },
    },
    {
      value: "Coordinated",
      label: "Referral Pathways",
      icon: {
        src: `${heroIcons}/3.png`,
        alt: "Coordinated referral pathways",
      },
    },
    {
      value: "Improved",
      label: "Patient Outcomes",
      icon: {
        src: `${heroIcons}/4.png`,
        alt: "Improved patient outcomes",
      },
    },
  ],
  image: {
    src: `${ourAllianceAssets}/ouraliance hero section.jpg`,
    alt: "Healthcare professionals collaborating in support of rheumatology patients",
  },
  primaryCta: {
    label: "Become a Partner",
    href: siteConfig.links.appointment,
    icon: {
      src: `${heroIcons}/1.png`,
      alt: "",
    },
  },
  secondaryCta: {
    label: "Contact Our Team",
    href: "/contact",
    icon: {
      src: `${heroIcons}/2.png`,
      alt: "",
    },
  },
} satisfies PageHeroContent;

export const ourAlliancePage = {
  meta: {
    title: "Our Alliance",
    description: `Learn how ${siteConfig.name} partners with hospitals, laboratories, and healthcare organizations to deliver coordinated rheumatology care across Nepal.`,
  },
  hero: ourAlliancePageHero,
  trustedBy: {
    eyebrow: "Trusted By",
    title: {
      prefix: "Our",
      highlight: "Partner Network",
    },
    description:
      "We collaborate with hospitals, laboratories, diagnostic centers, and insurance partners to deliver reliable rheumatology care across Nepal.",
    items: [
      { name: "Kathmandu City Hospital", type: "Hospital" },
      { name: "Everest Specialty Clinic", type: "Hospital" },
      { name: "Himalaya Diagnostic Lab", type: "Laboratory" },
      { name: "National Arthritis Lab", type: "Laboratory" },
      { name: "Central Imaging Center", type: "Diagnostic Center" },
      { name: "Valley Diagnostic Hub", type: "Diagnostic Center" },
      { name: "NepaCare Insurance", type: "Insurance Partner" },
      { name: "HealthSure Nepal", type: "Insurance Partner" },
      { name: "Metro Referral Hospital", type: "Hospital" },
      { name: "Prime Rheuma Diagnostics", type: "Diagnostic Center" },
      { name: "LifeLine Lab Services", type: "Laboratory" },
      { name: "Guardian Health Cover", type: "Insurance Partner" },
    ],
  },
  keyPartners: {
    eyebrow: "Key Partners",
    title: {
      prefix: "Highlighted",
      highlight: "Collaborators",
    },
    description:
      "These strategic partners help us deliver coordinated rheumatology services with stronger referral pathways, diagnostics, and long-term patient support.",
    items: [
      {
        logoText: "KCH",
        name: "Kathmandu City Hospital",
        description:
          "Supports specialist referrals and joint clinical pathways for complex rheumatology cases.",
        href: "/contact",
      },
      {
        logoText: "HDL",
        name: "Himalaya Diagnostic Lab",
        description:
          "Provides timely lab testing and reporting to accelerate diagnosis and treatment decisions.",
        href: "/services/arthritis-management",
      },
      {
        logoText: "CIC",
        name: "Central Imaging Center",
        description:
          "Improves access to imaging services for earlier detection and better disease monitoring.",
        href: "/services/rheumatology-consultation",
      },
      {
        logoText: "NCI",
        name: "NepaCare Insurance",
        description:
          "Works with our team to streamline coverage guidance and continuity of patient care.",
        href: "/contact",
      },
    ],
  },
  allianceTypes: {
    eyebrow: "Alliance Categories",
    title: {
      prefix: "Types of",
      highlight: "Alliances",
    },
    description:
      "We build partnerships across the full care journey — from specialist treatment to diagnostics, medication, and coverage support.",
    items: [
      {
        icon: "hospital" as const,
        title: "Hospital Partnerships",
        description:
          "Referral collaborations with hospitals and clinics for specialist rheumatology and autoimmune care.",
      },
      {
        icon: "lab" as const,
        title: "Diagnostic & Lab Services",
        description:
          "Trusted laboratory and imaging partners for accurate, timely testing and disease monitoring.",
      },
      {
        icon: "pharmacy" as const,
        title: "Pharmacy Networks",
        description:
          "Pharmacy partners ensuring reliable access to medications and long-term treatment support.",
      },
      {
        icon: "insurance" as const,
        title: "Insurance Providers",
        description:
          "Insurance collaborations that simplify coverage guidance and continuity of patient care.",
      },
    ],
  },
  collaborationImpact: {
    eyebrow: "Collaboration Impact",
    title: {
      prefix: "Our Alliance in",
      highlight: "Numbers",
    },
    description:
      "Together with our partners, we are expanding access to expert rheumatology care and delivering measurable impact across Nepal.",
    stats: [
      { value: "10+", label: "Partner Hospitals" },
      { value: "25+", label: "Diagnostic Labs" },
      { value: "5000+", label: "Patients Served" },
    ],
  },
} as const;
