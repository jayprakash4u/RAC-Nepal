import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const homeCareIntroImageDir = `${serviceScrollbarImageDir}/HomeCareServices/intro`;
const homeCareServicesImageDir = `${serviceScrollbarImageDir}/HomeCareServices/Service we Provide`;
const homeCareConditionsImageDir = `${serviceScrollbarImageDir}/HomeCareServices/condition we care`;
const homeCareProgramsImageDir = `${serviceScrollbarImageDir}/HomeCareServices/homecareprogram`;
const homeCareTeamImageDir = `${serviceScrollbarImageDir}/HomeCareServices/HomeCareTeams`;

function homeCareIntroIcon(index: number) {
  return `${homeCareIntroImageDir}/icons${index}.png`;
}

function homeCareServiceIcon(index: number) {
  return `${homeCareServicesImageDir}/icons${index}.png`;
}

function homeCareConditionIcon(index: number) {
  return `${homeCareConditionsImageDir}/icons${index}.png`;
}

function homeCareProgramIcon(index: number) {
  return `${homeCareProgramsImageDir}/icons${index}.png`;
}

export const homeCareService: ServicePageData = {
  slug: "home-care",
  title: "Home Care Services",
  image: {
    src: `${serviceScrollbarImageDir}/Home Care.jpg`,
    alt: "Home care services at RAC Nepal",
  },
  meta: {
    title: "Home Care Services",
    description: `Home care services at ${siteConfig.name} — professional rheumatology care, physiotherapy, nursing support, and rehabilitation delivered at home in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Receive professional rheumatology care, physiotherapy, nursing support, medication management, and rehabilitation—all delivered safely in the comfort of your home.",
      },
    ],
  ],
  introHeroSection: {
    eyebrow: "Home Care Services",
    eyebrowIcon: {
      src: homeCareIntroIcon(1),
      alt: "Home care services icon",
    },
    title: {
      prefix: "Expert Medical Care,",
      highlight: "Comfort at Home.",
    },
    description:
      "Receive professional rheumatology care, physiotherapy, nursing support, medication management, and rehabilitation—all delivered safely in the comfort of your home.",
    primaryCta: {
      label: "Book Home Visit",
      href: siteConfig.links.appointment,
    },
    secondaryCta: {
      label: "Speak to Our Care Coordinator",
      href: "/contact",
    },
    sideImage: {
      src: `${homeCareIntroImageDir}/side image.png`,
      alt: "Nurse providing home care to a patient in a comfortable home setting",
    },
    stats: [
      {
        value: "10+",
        label: "Years of Home Care Experience",
        icon: {
          src: homeCareIntroIcon(2),
          alt: "Years of experience icon",
        },
      },
      {
        value: "5000+",
        label: "Successful Home Visits",
        icon: {
          src: homeCareIntroIcon(3),
          alt: "Successful home visits icon",
        },
      },
      {
        value: "98%",
        label: "Patient Satisfaction",
        icon: {
          src: homeCareIntroIcon(4),
          alt: "Patient satisfaction icon",
        },
      },
      {
        value: "24/7",
        label: "Home Care Support",
        icon: {
          src: homeCareIntroIcon(5),
          alt: "24/7 home care support icon",
        },
      },
    ],
  },
  servicesWeProvideSection: {
    title: {
      prefix: "Home Care Services",
      highlight: "We Provide",
    },
    items: [
      {
        title: "Home Physiotherapy",
        description: "Personalized rehabilitation exercises.",
        icon: {
          src: homeCareServiceIcon(1),
          alt: "Home physiotherapy icon",
        },
      },
      {
        title: "Nursing Care",
        description: "Professional wound care and medication support.",
        icon: {
          src: homeCareServiceIcon(2),
          alt: "Nursing care icon",
        },
      },
      {
        title: "Doctor Home Visit",
        description: "Consultation and ongoing treatment.",
        icon: {
          src: homeCareServiceIcon(3),
          alt: "Doctor home visit icon",
        },
      },
      {
        title: "Injection & IV Therapy",
        description: "Safe administration at home.",
        icon: {
          src: homeCareServiceIcon(4),
          alt: "Injection and IV therapy icon",
        },
      },
      {
        title: "Arthritis Care",
        description: "Joint pain management.",
        icon: {
          src: homeCareServiceIcon(5),
          alt: "Arthritis care icon",
        },
      },
      {
        title: "Elderly Care",
        description: "Daily assistance and mobility support.",
        icon: {
          src: homeCareServiceIcon(6),
          alt: "Elderly care icon",
        },
      },
      {
        title: "Medication Management",
        description: "Ensure timely medications.",
        icon: {
          src: homeCareServiceIcon(7),
          alt: "Medication management icon",
        },
      },
      {
        title: "Post-Surgery Rehabilitation",
        description: "Recovery after orthopedic procedures.",
        icon: {
          src: homeCareServiceIcon(8),
          alt: "Post-surgery rehabilitation icon",
        },
      },
    ],
  },
  conditionsWeTreatSection: {
    title: {
      prefix: "Conditions",
      highlight: "We Care For",
    },
    stackedTitle: true,
    items: [
      {
        title: "Rheumatoid Arthritis",
        image: {
          src: homeCareConditionIcon(1),
          alt: "Rheumatoid arthritis icon",
        },
      },
      {
        title: "Osteoarthritis",
        image: {
          src: homeCareConditionIcon(2),
          alt: "Osteoarthritis icon",
        },
      },
      {
        title: "Ankylosing Spondylitis",
        image: {
          src: homeCareConditionIcon(3),
          alt: "Ankylosing spondylitis icon",
        },
      },
      {
        title: "Lupus",
        image: {
          src: homeCareConditionIcon(4),
          alt: "Lupus icon",
        },
      },
      {
        title: "Gout",
        image: {
          src: homeCareConditionIcon(5),
          alt: "Gout icon",
        },
      },
      {
        title: "Osteoporosis",
        image: {
          src: homeCareConditionIcon(6),
          alt: "Osteoporosis icon",
        },
      },
      {
        title: "Chronic Back Pain",
        image: {
          src: homeCareConditionIcon(7),
          alt: "Chronic back pain icon",
        },
      },
      {
        title: "Joint Injuries",
        image: {
          src: homeCareConditionIcon(8),
          alt: "Joint injuries icon",
        },
      },
    ],
    sideImage: {
      src: `${homeCareConditionsImageDir}/right side image.png`,
      alt: "Doctor examining an elderly patient's wrist during a home care visit",
    },
  },
  homeCareProgramsSection: {
    title: {
      prefix: "Our",
      highlight: "Home Care Programs",
    },
    items: [
      {
        title: "Home Physiotherapy",
        description: "Exercises for mobility and pain relief.",
        icon: {
          src: homeCareProgramIcon(1),
          alt: "Home physiotherapy icon",
        },
      },
      {
        title: "Home Nursing",
        description: "Professional nursing support.",
        icon: {
          src: homeCareProgramIcon(2),
          alt: "Home nursing icon",
        },
      },
      {
        title: "IV Therapy",
        description: "Medication and hydration.",
        icon: {
          src: homeCareProgramIcon(3),
          alt: "IV therapy icon",
        },
      },
      {
        title: "Joint Injection Assistance",
        description: "Specialized injection support.",
        icon: {
          src: homeCareProgramIcon(4),
          alt: "Joint injection assistance icon",
        },
      },
      {
        title: "Elderly Assistance",
        description: "Daily living support.",
        icon: {
          src: homeCareProgramIcon(5),
          alt: "Elderly assistance icon",
        },
      },
      {
        title: "Mobility Training",
        description: "Improve balance and walking.",
        icon: {
          src: homeCareProgramIcon(6),
          alt: "Mobility training icon",
        },
      },
      {
        title: "Pain Management",
        description: "Reduce inflammation naturally.",
        icon: {
          src: homeCareProgramIcon(7),
          alt: "Pain management icon",
        },
      },
      {
        title: "Chronic Disease Monitoring",
        description: "Regular health tracking.",
        icon: {
          src: homeCareProgramIcon(8),
          alt: "Chronic disease monitoring icon",
        },
      },
    ],
  },
  homeCareTeamSection: {
    title: {
      prefix: "Meet Our",
      highlight: "Home Care Team",
    },
    items: [
      {
        title: "Doctor",
        subtitle: "Rheumatologist",
        image: {
          src: `${homeCareTeamImageDir}/doctor.png`,
          alt: "Doctor icon",
        },
      },
      {
        title: "Physiotherapist",
        subtitle: "Home Rehabilitation",
        image: {
          src: `${homeCareTeamImageDir}/physiotherapist.png`,
          alt: "Physiotherapist icon",
        },
      },
      {
        title: "Nurse",
        subtitle: "Certified Home Care",
        image: {
          src: `${homeCareTeamImageDir}/Nurse.png`,
          alt: "Nurse icon",
        },
      },
      {
        title: "Care Coordinator",
        subtitle: "Appointment Management",
        image: {
          src: `${homeCareTeamImageDir}/care_coordinator.png`,
          alt: "Care coordinator icon",
        },
      },
    ],
  },
};
