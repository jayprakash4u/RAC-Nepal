import { siteConfig } from "@/config/site";

export const telehealthPage = {
  meta: {
    title: "Telehealth Services",
    description: `Consult with ${siteConfig.shortName} rheumatologists from home via secure video or phone. Follow-ups, medication reviews, and expert care — wherever you are in Nepal.`,
  },
  hero: {
    eyebrow: "Virtual Care",
    title: "Telehealth Rheumatology Care",
    titleAccent: "Consult from Home",
    description:
      "Get expert rheumatology care without visiting the clinic. Secure, convenient, and accessible from anywhere.",
    primaryCta: {
      label: "Book Teleconsultation",
      href: siteConfig.links.appointment,
    },
    secondaryCta: {
      label: "Schedule Online Visit",
      href: siteConfig.links.appointment,
    },
  },
  whatIs: {
    eyebrow: "Understanding Virtual Care",
    title: {
      prefix: "What is",
      highlight: "Telehealth?",
    },
    paragraphs: [
      "Telehealth allows you to consult your rheumatologist via secure video or phone — from the comfort of your home or office.",
      "It is ideal for follow-up visits, medication reviews, symptom discussions, lab report reviews, and second opinions when an in-person physical examination is not immediately required.",
    ],
  },
  conditions: {
    eyebrow: "Rheumatology Focus",
    title: {
      prefix: "Conditions We Can",
      highlight: "Manage Online",
    },
    description:
      "Many rheumatology conditions can be monitored and managed effectively through telehealth when symptoms are stable or mild to moderate.",
    items: [
      {
        label: "Rheumatoid Arthritis",
        href: "/conditions/rheumatoid-arthritis",
      },
      {
        label: "Osteoarthritis",
        href: "/conditions/osteoarthritis",
      },
      {
        label: "Systemic Lupus (SLE)",
        href: "/conditions/systemic-lupus-erythematosus",
      },
      { label: "Gout", href: "/conditions/gout" },
      {
        label: "Ankylosing Spondylitis",
        href: "/conditions/ankylosing-spondylitis",
      },
      {
        label: "Chronic Joint Pain",
        href: "/conditions/chronic-back-pain-joint-pain",
      },
      {
        label: "Autoimmune Conditions",
        href: "/conditions/connective-tissue-diseases",
      },
    ],
  },
  comparison: {
    eyebrow: "Choose the Right Visit",
    title: {
      prefix: "Telehealth vs",
      highlight: "In-Person Care",
    },
    description:
      "We help you choose the most appropriate visit type so you receive safe, effective care every time.",
    telehealth: {
      title: "Telehealth is suitable for",
      items: [
        "Follow-up visits",
        "Reviewing test reports",
        "Medication adjustments",
        "Mild to moderate symptoms",
        "Care planning and education",
      ],
    },
    inPerson: {
      title: "In-person visit needed for",
      items: [
        "Severe pain or swelling",
        "Joint injections or procedures",
        "Physical examination required",
        "New or rapidly worsening symptoms",
        "Initial complex diagnostic workup",
      ],
    },
  },
  howItWorks: {
    eyebrow: "Simple Process",
    title: {
      prefix: "How It",
      highlight: "Works",
    },
    steps: [
      {
        title: "Book your appointment",
        description: "Schedule online or call our clinic to request a teleconsultation slot.",
      },
      {
        title: "Receive confirmation & link",
        description: "We send appointment details and a secure video link before your visit.",
      },
      {
        title: "Join at your scheduled time",
        description: "Connect via phone or video from a quiet place with a stable internet connection.",
      },
      {
        title: "Consult with your doctor",
        description: "Discuss symptoms, reports, and treatment with your rheumatology specialist.",
      },
      {
        title: "Receive prescription & advice",
        description: "Get updated prescriptions, lifestyle guidance, and follow-up instructions.",
      },
    ],
  },
  benefits: {
    eyebrow: "Why Choose Virtual Care",
    title: {
      prefix: "Benefits of",
      highlight: "Telehealth",
    },
    items: [
      {
        title: "No travel required",
        description: "Save time and consult from home, work, or anywhere with connectivity.",
      },
      {
        title: "Saves time",
        description: "Shorter wait times and no commute for routine follow-up appointments.",
      },
      {
        title: "Access from remote areas",
        description: "Expert rheumatology care across Nepal without traveling to Kathmandu.",
      },
      {
        title: "Reduced infection exposure",
        description: "Limit contact in waiting areas when you are immunocompromised or unwell.",
      },
      {
        title: "Easy follow-ups",
        description: "Stay on track with treatment plans through convenient check-in visits.",
      },
    ],
  },
  pricing: {
    eyebrow: "Fees & Payment",
    title: {
      prefix: "Pricing &",
      highlight: "Insurance",
    },
    description:
      "Transparent consultation fees and flexible payment options. Contact us for the latest rates and insurance guidance.",
    items: [
      {
        label: "Teleconsultation fee",
        value: "Please contact the clinic for current consultation charges.",
      },
      {
        label: "Payment methods",
        value: "Cash, bank transfer, and online payment options available.",
      },
      {
        label: "Insurance coverage",
        value: "Coverage varies by provider. Our team can help verify eligibility before your visit.",
      },
    ],
    cta: {
      label: "Ask About Fees",
      href: siteConfig.links.appointment,
    },
  },
} as const;
