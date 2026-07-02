import { siteConfig } from "@/config/site";
import type { PageHeroContent } from "@/types/page-hero-content";

const telehealthAssets = "/images/Telehealthservices";
const heroIcons = "/images/aboutpage";

export const telehealthPageHero = {
  eyebrow: "Virtual Care",
  title: "Telehealth Rheumatology",
  titleAccent: "Services",
  description:
    "Consult specialists from the comfort of your home. Secure, convenient rheumatology care — wherever you are in Nepal.",
  stats: [
    {
      value: "Secure",
      label: "Private Consults",
      icon: {
        src: `${heroIcons}/5.png`,
        alt: "Secure consultations",
      },
    },
    {
      value: "Save",
      label: "Travel Time",
      icon: {
        src: `${heroIcons}/3.png`,
        alt: "Save travel time",
      },
    },
    {
      value: "Expert",
      label: "Rheumatology Care",
      icon: {
        src: `${heroIcons}/4.png`,
        alt: "Expert rheumatology care",
      },
    },
  ],
  image: {
    src: `${telehealthAssets}/herosectiontelehealth.jpg`,
    alt: "Patient consulting a rheumatologist via secure video call from home",
  },
  primaryCta: {
    label: "Book Virtual Appointment",
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

const telehealthConditionIconDir =
  "/images/Telehealthservices/condition we treate";

function telehealthConditionIcon(filename: string) {
  return encodeURI(`${telehealthConditionIconDir}/${filename}`);
}

export const telehealthPage = {
  meta: {
    title: "Telehealth Services",
    description: `Consult with ${siteConfig.shortName} rheumatologists from home via secure video or phone. Follow-ups, medication reviews, and expert care — wherever you are in Nepal.`,
  },
  hero: telehealthPageHero,
  servicesOffer: {
    eyebrow: "Our Services",
    title: "Telehealth Services We Offer",
    description:
      "High-quality rheumatology care delivered to you, wherever you are.",
    cta: {
      label: "Book Virtual Appointment",
      href: siteConfig.links.appointment,
    },
    items: [
      {
        title: "Arthritis Consultation",
        description:
          "Expert evaluation and diagnosis for all types of arthritis and autoimmune conditions.",
        image: {
          src: "/images/Telehealthservices/teleheath services/image1.jpg",
          alt: "Doctor consulting with a patient about arthritis",
        },
        icon: "arthritis" as const,
      },
      {
        title: "Follow-up Visits",
        description:
          "Convenient follow-up appointments to monitor your progress and adjust treatment as needed.",
        image: {
          src: "/images/Telehealthservices/teleheath services/image2.jpg",
          alt: "Patient on a video follow-up visit with their doctor",
        },
        icon: "followUp" as const,
      },
      {
        title: "Medication Review",
        description:
          "Review of your current medications to ensure safety, effectiveness, and proper management.",
        image: {
          src: "/images/Telehealthservices/teleheath services/image3..jpg",
          alt: "Medication bottles for rheumatology treatment review",
        },
        icon: "medication" as const,
      },
      {
        title: "Lab Result Discussion",
        description:
          "Detailed discussion of your lab results and what they mean for your condition and treatment.",
        image: {
          src: "/images/Telehealthservices/teleheath services/image4.jpg",
          alt: "Doctor reviewing laboratory test results with a patient",
        },
        icon: "lab" as const,
      },
      {
        title: "Chronic Pain Management",
        description:
          "Personalized strategies and treatment plans to help manage chronic pain and improve quality of life.",
        image: {
          src: "/images/Telehealthservices/teleheath services/image5.jpg",
          alt: "Patient receiving guidance for chronic pain management",
        },
        icon: "pain" as const,
      },
    ],
  },
  whatIs: {
    eyebrow: "Understanding Virtual Care",
    title: {
      prefix: "What is",
      highlight: "Telehealth?",
    },
    description:
      "Telehealth allows you to consult your rheumatologist via secure video or phone — from the comfort of your home or office, anywhere in Nepal. It brings specialist rheumatology care to you without the time, travel, or expense of visiting the clinic in person. It is ideal for follow-up visits, medication reviews, symptom discussions, lab report reviews, and second opinions when an in-person physical examination is not immediately required. Your consultation takes place over a private, encrypted connection with the same clinicians who care for you in person. For many stable or mild-to-moderate conditions, virtual visits are a safe and effective way to stay on track with your treatment.",
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
        id: "rheumatoid-arthritis",
        title: "Rheumatoid Arthritis",
        description: "Chronic autoimmune joint inflammation.",
        href: "/conditions/rheumatoid-arthritis",
        icon: {
          src: telehealthConditionIcon("icons1.png"),
          alt: "Rheumatoid arthritis icon",
        },
      },
      {
        id: "osteoarthritis",
        title: "Osteoarthritis",
        description: "Degenerative joint pain and stiffness.",
        href: "/conditions/osteoarthritis",
        icon: {
          src: telehealthConditionIcon("icons2.png"),
          alt: "Osteoarthritis icon",
        },
      },
      {
        id: "systemic-lupus",
        title: "Systemic Lupus (SLE)",
        description: "Autoimmune disease affecting multiple organs.",
        href: "/conditions/systemic-lupus-erythematosus",
        icon: {
          src: telehealthConditionIcon("icons3.png"),
          alt: "Systemic lupus icon",
        },
      },
      {
        id: "gout",
        title: "Gout",
        description: "Sudden joint pain due to uric acid buildup.",
        href: "/conditions/gout",
        icon: {
          src: telehealthConditionIcon("icons4.png"),
          alt: "Gout icon",
        },
      },
      {
        id: "ankylosing-spondylitis",
        title: "Ankylosing Spondylitis",
        description: "Inflammation affecting spine and mobility.",
        href: "/conditions/ankylosing-spondylitis",
        icon: {
          src: telehealthConditionIcon("icons5.png"),
          alt: "Ankylosing spondylitis icon",
        },
      },
      {
        id: "chronic-joint-pain",
        title: "Chronic Joint Pain",
        description: "Persistent pain from injury or inflammation.",
        href: "/conditions/chronic-back-pain-joint-pain",
        icon: {
          src: telehealthConditionIcon("icons6.png"),
          alt: "Chronic joint pain icon",
        },
      },
      {
        id: "autoimmune-conditions",
        title: "Autoimmune Conditions",
        description: "Disorders where the immune system attacks the body.",
        href: "/conditions/connective-tissue-diseases",
        icon: {
          src: telehealthConditionIcon("icons7.png"),
          alt: "Autoimmune conditions icon",
        },
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
      title: "Telehealth",
      image: {
        src: encodeURI(`${telehealthAssets}/inpersoncare/Telehealth.jpg`),
        alt: "Patient on a telehealth video consultation with a doctor",
      },
      items: [
        "For stable or mild to moderate symptoms",
        "Follow-ups and treatment adjustments",
        "Lab or imaging review",
        "Convenient and secure from home",
      ],
    },
    inPerson: {
      title: "In-Person Care",
      image: {
        src: encodeURI(`${telehealthAssets}/inpersoncare/in-person care.jpg`),
        alt: "Doctor performing an in-person physical examination",
      },
      items: [
        "New or complex symptoms",
        "Physical examination or procedures",
        "Urgent or severe flare-ups",
        "Personalized hands-on evaluation",
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
} as const;
