import type { NavLink } from "@/types/navigation";

const homePageServiceImageDir = "/images/home page services";

function homePageServiceImage(filename: string) {
  return `${homePageServiceImageDir}/${filename}`;
}

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
};

export const servicesSection = {
  eyebrow: "Comprehensive Rheumatology Care",
  title: {
    prefix: "Our Specialized",
    highlight: "Services",
  },
  cta: {
    label: "All Services",
    href: "/contact",
  },
  items: [
    {
      id: "rheumatology-consultation",
      title: "Rheumatology Consultation",
      description: "Expert assessment and personalized plans for joint and autoimmune conditions.",
      href: "/services/rheumatology-consultation",
      image: {
        src: homePageServiceImage("Rheumatology_Consultation.png"),
        alt: "Rheumatology consultation service at RAC Nepal",
      },
    },
    {
      id: "arthritis-management",
      title: "Arthritis Management",
      description: "Clinical evaluation, imaging, and long-term arthritis care.",
      href: "/services/arthritis-management",
      image: {
        src: homePageServiceImage("Arthritis_Management.png"),
        alt: "Arthritis management service at RAC Nepal",
      },
    },
    {
      id: "joint-pain-treatment",
      title: "Joint Pain Treatment",
      description: "Therapies to ease inflammation and restore comfortable movement.",
      href: "/services/joint-pain-treatment",
      image: {
        src: homePageServiceImage("Joint_Pain_Treatment.png"),
        alt: "Joint pain treatment service at RAC Nepal",
      },
    },
    {
      id: "autoimmune-care",
      title: "Autoimmune Care",
      description: "Diagnostics and tailored treatment for autoimmune rheumatic disease.",
      href: "/services/autoimmune-care",
      image: {
        src: homePageServiceImage("Autoimmune_Care.png"),
        alt: "Autoimmune care service at RAC Nepal",
      },
    },
    {
      id: "physiotherapy-rehabilitation",
      title: "Physiotherapy & Rehabilitation",
      description: "Rehabilitation to rebuild strength, mobility, and confidence.",
      href: "/services/physiotherapy-rehabilitation",
      image: {
        src: homePageServiceImage("Physiotherapy_Rehabilitation.png"),
        alt: "Physiotherapy and rehabilitation service at RAC Nepal",
      },
    },
    {
      id: "home-care-services",
      title: "Home Care Services",
      description: "Rheumatology support at home for eligible patients.",
      href: "/services/home-care",
      image: {
        src: homePageServiceImage("Home_Care_Services.png"),
        alt: "Home care services at RAC Nepal",
      },
    },
    {
      id: "osteoporosis-care",
      title: "Osteoporosis Care",
      description: "Bone health assessment and fracture risk management.",
      href: "/services/osteoporosis-care",
      image: {
        src: homePageServiceImage("Osteoporosis_Care.png"),
        alt: "Osteoporosis care service at RAC Nepal",
      },
    },
    {
      id: "gout-management",
      title: "Gout Management",
      description: "Uric acid control and flare prevention for gout patients.",
      href: "/services/gout-management",
      image: {
        src: homePageServiceImage("Gout_Management.png"),
        alt: "Gout management service at RAC Nepal",
      },
    },
    {
      id: "joint-injection-therapy",
      title: "Joint Injection Therapy",
      description: "Targeted injections to relieve joint pain and inflammation.",
      href: "/services/joint-injection-therapy",
      image: {
        src: homePageServiceImage("Joint_Injection_Therapy.png"),
        alt: "Joint injection therapy service at RAC Nepal",
      },
    },
    {
      id: "pharmacy-services",
      title: "Pharmacy Services",
      description: "DMARDs, biologics, and prescription support on-site.",
      href: "/services/pharmacy",
      image: {
        src: homePageServiceImage("Pharmacy_Services.png"),
        alt: "Pharmacy services at RAC Nepal",
      },
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: { prefix: string; highlight: string };
  cta: { label: string; href: string };
  items: readonly ServiceItem[];
};

export const serviceNavLinks: readonly NavLink[] = servicesSection.items.map(
  (item) => ({
    label: item.title,
    href: item.href,
  }),
);
