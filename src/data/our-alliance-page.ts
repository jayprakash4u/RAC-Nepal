import { siteConfig } from "@/config/site";

export const ourAlliancePage = {
  meta: {
    title: "Our Alliance",
    description: `Learn how ${siteConfig.name} partners with hospitals, laboratories, and healthcare organizations to deliver coordinated rheumatology care across Nepal.`,
  },
  hero: {
    eyebrow: "Partnerships",
    title: "Our Alliance for",
    titleAccent: "Better Rheumatology Care",
    description:
      "We collaborate with trusted healthcare partners to expand access, improve outcomes, and deliver seamless care for patients with arthritis and autoimmune conditions.",
    primaryCta: {
      label: "Become a Partner",
      href: siteConfig.links.appointment,
    },
    secondaryCta: {
      label: "Contact Our Team",
      href: "/contact",
    },
  },
  whatIs: {
    eyebrow: "Collaborative Care",
    title: {
      prefix: "What is",
      highlight: "Our Alliance?",
    },
    paragraphs: [
      "Our Alliance is a network of hospitals, diagnostic centers, physiotherapy providers, pharmacies, and academic institutions working together with RAC Nepal to strengthen rheumatology care.",
      "Through shared expertise, referral pathways, and coordinated treatment planning, we ensure patients receive timely diagnosis, consistent follow-up, and comprehensive support at every stage of care.",
    ],
  },
  partners: {
    eyebrow: "Network Focus",
    title: {
      prefix: "Areas of",
      highlight: "Collaboration",
    },
    description:
      "Our partnerships span clinical, diagnostic, rehabilitative, and patient-support services to deliver complete rheumatology care.",
    items: [
      {
        label: "Hospital & Clinic Referrals",
        href: "/services/rheumatology-consultation",
      },
      {
        label: "Diagnostic Laboratory Services",
        href: "/services/arthritis-management",
      },
      {
        label: "Physiotherapy & Rehabilitation",
        href: "/services/physiotherapy-rehabilitation",
      },
      {
        label: "Pharmacy & Medication Support",
        href: "/services/pharmacy-services",
      },
      {
        label: "Home Care Coordination",
        href: "/services/home-care",
      },
      {
        label: "Research & Academics",
        href: "/contact",
      },
      {
        label: "Telehealth Network Access",
        href: "/telehealth-services",
      },
    ],
  },
  comparison: {
    eyebrow: "Shared Value",
    title: {
      prefix: "Alliance Benefits for",
      highlight: "Patients & Partners",
    },
    description:
      "Our alliance model is designed to support both patients seeking expert care and partner organizations delivering coordinated services.",
    forPatients: {
      title: "Benefits for patients",
      items: [
        "Faster access to rheumatology specialists",
        "Coordinated referrals and follow-up care",
        "Integrated diagnostics and treatment planning",
        "Continuity across clinic, lab, and rehab services",
        "Support for remote and home-based care",
      ],
    },
    forPartners: {
      title: "Benefits for partners",
      items: [
        "Trusted referral pathways for complex cases",
        "Shared clinical protocols and best practices",
        "Continuing medical education opportunities",
        "Collaborative patient management",
        "Stronger community rheumatology outreach",
      ],
    },
  },
  howItWorks: {
    eyebrow: "How We Collaborate",
    title: {
      prefix: "How Our Alliance",
      highlight: "Works",
    },
    steps: [
      {
        title: "Partnership agreement",
        description:
          "We establish collaboration with hospitals, labs, and care providers aligned with our clinical standards.",
      },
      {
        title: "Referral & coordination setup",
        description:
          "Clear pathways are created for patient referrals, report sharing, and follow-up communication.",
      },
      {
        title: "Joint care planning",
        description:
          "Specialists and partner teams align on diagnosis, treatment, and rehabilitation goals for each patient.",
      },
      {
        title: "Ongoing patient support",
        description:
          "Patients move smoothly between services — consultation, diagnostics, pharmacy, physio, and home care.",
      },
      {
        title: "Review & quality improvement",
        description:
          "Partnerships are reviewed regularly to improve access, outcomes, and patient experience.",
      },
    ],
  },
  benefits: {
    eyebrow: "Why It Matters",
    title: {
      prefix: "Benefits of",
      highlight: "Our Alliance",
    },
    items: [
      {
        title: "Expanded access to care",
        description:
          "Patients across Nepal can reach expert rheumatology services through our partner network.",
      },
      {
        title: "Coordinated treatment",
        description:
          "Care teams work together so nothing falls through the cracks between visits and services.",
      },
      {
        title: "Faster diagnostics",
        description:
          "Partner laboratories and imaging centers help speed up testing and treatment decisions.",
      },
      {
        title: "Holistic support",
        description:
          "Rehabilitation, pharmacy, and home care partners support long-term disease management.",
      },
      {
        title: "Trusted collaboration",
        description:
          "Partners share a commitment to evidence-based, compassionate rheumatology care.",
      },
    ],
  },
  partnership: {
    eyebrow: "Join Our Network",
    title: {
      prefix: "Partnership",
      highlight: "Opportunities",
    },
    description:
      "Hospitals, clinics, laboratories, and healthcare organizations interested in collaborating with RAC Nepal are welcome to reach out.",
    items: [
      {
        label: "Clinical partnerships",
        value:
          "Referral collaborations with hospitals and specialty clinics for rheumatology and autoimmune care.",
      },
      {
        label: "Diagnostic alliances",
        value:
          "Laboratory and imaging partnerships to support timely testing and monitoring.",
      },
      {
        label: "Academic collaboration",
        value:
          "Research, training, and continuing education initiatives with medical institutions.",
      },
    ],
    cta: {
      label: "Inquire About Partnership",
      href: "/contact",
    },
  },
} as const;
