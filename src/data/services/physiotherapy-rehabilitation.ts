import { siteConfig } from "@/config/site";
import type { ServicePageData } from "@/types/service-content";

const serviceScrollbarImageDir = "/images/servicesscrollbar image";
const physiotherapyIntroImageDir = `${serviceScrollbarImageDir}/physiotherapy-rehabilitation/intros`;
const physiotherapyConditionsImageDir = `${serviceScrollbarImageDir}/physiotherapy-rehabilitation/condition we treat`;
const physiotherapyRecoveryImageDir = `${serviceScrollbarImageDir}/physiotherapy-rehabilitation/recoverys`;
const physiotherapyStepByStepImageDir = `${serviceScrollbarImageDir}/physiotherapy-rehabilitation/step by step`;
const physiotherapyBenefitImageDir = `${serviceScrollbarImageDir}/physiotherapy-rehabilitation/benefit`;

const physiotherapyRecoveryIconFiles = [
  "icon1.png",
  "icon2.png",
  "icons3.png",
  "icons4.png",
  "icnons5.png",
  "icons6.png",
  "icnos7.png",
  "icons8.png",
] as const;

function physiotherapyRecoveryIcon(index: number) {
  return `${physiotherapyRecoveryImageDir}/${physiotherapyRecoveryIconFiles[index - 1]}`;
}

function physiotherapyRecoveryPhoto(index: number) {
  return `${physiotherapyRecoveryImageDir}/img_${index}.png`;
}

function physiotherapyStepIcon(index: number) {
  return `${physiotherapyStepByStepImageDir}/icons${index}.png`;
}

function physiotherapyBenefitIcon(index: number) {
  return `${physiotherapyBenefitImageDir}/icons${index}.png`;
}

function physiotherapyIntroIcon(index: number) {
  return `${physiotherapyIntroImageDir}/${index}.png`;
}

function physiotherapyConditionIcon(index: number) {
  return `${physiotherapyConditionsImageDir}/${index}.png`;
}

export const physiotherapyRehabilitationService: ServicePageData = {
  slug: "physiotherapy-rehabilitation",
  title: "Physiotherapy & Rehabilitation",
  image: {
    src: `${serviceScrollbarImageDir}/Physiotherapy & Rehabilitation.jpg`,
    alt: "Physiotherapy and rehabilitation at RAC Nepal",
  },
  meta: {
    title: "Physiotherapy & Rehabilitation",
    description: `Physiotherapy and rehabilitation at ${siteConfig.name} — guided recovery for arthritis, joint pain, and mobility problems in Nepal.`,
  },
  paragraphs: [
    [
      {
        type: "text",
        value:
          "Physiotherapy and rehabilitation support safe recovery from joint pain, arthritis flares, injury, and surgery.",
      },
    ],
  ],
  overviewSection: {
    headerStyle: "accent-line",
    title: {
      prefix: "What is",
      highlight: "Physiotherapy?",
    },
    description:
      "Physiotherapy is a specialized healthcare practice that helps restore movement, improve function, and reduce pain through targeted exercises, manual therapy, and rehabilitation techniques.",
    secondaryDescription: `Our goal is to restore mobility, reduce pain, and help patients return to daily activities with confidence through personalized physiotherapy care at ${siteConfig.shortName}.`,
    features: [
      {
        title: "Pain Reduction",
        description: "Alleviate pain and inflammation.",
        image: {
          src: physiotherapyIntroIcon(1),
          alt: "Pain reduction icon",
        },
      },
      {
        title: "Joint Mobility",
        description: "Improve flexibility and range of motion.",
        image: {
          src: physiotherapyIntroIcon(2),
          alt: "Joint mobility icon",
        },
      },
      {
        title: "Muscle Strength",
        description: "Build strength and endurance safely.",
        image: {
          src: physiotherapyIntroIcon(3),
          alt: "Muscle strength icon",
        },
      },
      {
        title: "Balance Improvement",
        description: "Enhance stability and prevent falls.",
        image: {
          src: physiotherapyIntroIcon(4),
          alt: "Balance improvement icon",
        },
      },
      {
        title: "Posture Correction",
        description: "Improve alignment and movement patterns.",
        image: {
          src: physiotherapyIntroIcon(5),
          alt: "Posture correction icon",
        },
      },
    ],
    sideImage: {
      src: `${physiotherapyIntroImageDir}/side image.png`,
      alt: "Physiotherapist guiding a patient through rehabilitation exercises",
    },
    imagePosition: "left",
    featureListStyle: "divided",
    background: "default",
    layout: "editorial",
  },
  conditionsWeTreatSection: {
    eyebrow: "Conditions We Treat",
    title: {
      prefix: "We Help You Move Better,",
      highlight: "Live Better.",
    },
    items: [
      {
        title: "Rheumatoid Arthritis",
        description: "Pain management and mobility improvement.",
        image: {
          src: physiotherapyConditionIcon(1),
          alt: "Rheumatoid arthritis icon",
        },
      },
      {
        title: "Osteoarthritis",
        description: "Reduce stiffness and improve movement.",
        image: {
          src: physiotherapyConditionIcon(2),
          alt: "Osteoarthritis icon",
        },
      },
      {
        title: "Ankylosing Spondylitis",
        description: "Improve spinal flexibility.",
        image: {
          src: physiotherapyConditionIcon(3),
          alt: "Ankylosing spondylitis icon",
        },
      },
      {
        title: "Lupus Rehabilitation",
        description: "Strength and fatigue management.",
        image: {
          src: physiotherapyConditionIcon(4),
          alt: "Lupus rehabilitation icon",
        },
      },
      {
        title: "Frozen Shoulder",
        description: "Restore shoulder movement.",
        image: {
          src: physiotherapyConditionIcon(5),
          alt: "Frozen shoulder icon",
        },
      },
      {
        title: "Sports & Joint Injuries",
        description: "Recover safely and regain function.",
        image: {
          src: physiotherapyConditionIcon(6),
          alt: "Sports and joint injuries icon",
        },
      },
      {
        title: "Knee Pain",
        description: "Strengthen muscles around the knee.",
        image: {
          src: physiotherapyConditionIcon(7),
          alt: "Knee pain icon",
        },
      },
      {
        title: "Chronic Back Pain",
        description: "Improve posture and core stability.",
        image: {
          src: physiotherapyConditionIcon(8),
          alt: "Chronic back pain icon",
        },
      },
    ],
    sideImage: {
      src: `${physiotherapyConditionsImageDir}/side image.png`,
      alt: "Physiotherapist guiding a patient through rehabilitation exercises",
    },
  },
  rehabilitationProgramsSection: {
    eyebrow: "Our Rehabilitation Programs",
    title: "Personalized Programs for Your Recovery",
    description:
      "Evidence-based rehabilitation programs designed to reduce pain, restore function, and improve your quality of life.",
    items: [
      {
        title: "Manual Therapy",
        description: "Hands-on joint and soft tissue techniques.",
        photo: {
          src: physiotherapyRecoveryPhoto(1),
          alt: "Physiotherapist performing manual therapy on a patient",
        },
        icon: {
          src: physiotherapyRecoveryIcon(1),
          alt: "Manual therapy icon",
        },
      },
      {
        title: "Therapeutic Exercises",
        description: "Personalized strengthening exercises.",
        photo: {
          src: physiotherapyRecoveryPhoto(2),
          alt: "Physiotherapist guiding therapeutic exercises",
        },
        icon: {
          src: physiotherapyRecoveryIcon(2),
          alt: "Therapeutic exercises icon",
        },
      },
      {
        title: "Balance Training",
        description: "Improve stability and prevent falls.",
        photo: {
          src: physiotherapyRecoveryPhoto(3),
          alt: "Patient performing balance training with a physiotherapist",
        },
        icon: {
          src: physiotherapyRecoveryIcon(3),
          alt: "Balance training icon",
        },
      },
      {
        title: "Gait Training",
        description: "Correct walking patterns.",
        photo: {
          src: physiotherapyRecoveryPhoto(4),
          alt: "Patient practicing gait training between parallel bars",
        },
        icon: {
          src: physiotherapyRecoveryIcon(4),
          alt: "Gait training icon",
        },
      },
      {
        title: "Posture Correction",
        description: "Reduce strain on joints.",
        photo: {
          src: physiotherapyRecoveryPhoto(5),
          alt: "Physiotherapist assessing patient posture",
        },
        icon: {
          src: physiotherapyRecoveryIcon(5),
          alt: "Posture correction icon",
        },
      },
      {
        title: "Pain Relief Therapy",
        description: "Non-invasive pain management.",
        photo: {
          src: physiotherapyRecoveryPhoto(6),
          alt: "Physiotherapist providing pain relief therapy",
        },
        icon: {
          src: physiotherapyRecoveryIcon(6),
          alt: "Pain relief therapy icon",
        },
      },
      {
        title: "Mobility Training",
        description: "Increase flexibility and joint movement.",
        photo: {
          src: physiotherapyRecoveryPhoto(7),
          alt: "Physiotherapist assisting with mobility training",
        },
        icon: {
          src: physiotherapyRecoveryIcon(7),
          alt: "Mobility training icon",
        },
      },
      {
        title: "Strength Rehabilitation",
        description: "Restore muscle power and endurance.",
        photo: {
          src: physiotherapyRecoveryPhoto(8),
          alt: "Patient performing strength rehabilitation with resistance bands",
        },
        icon: {
          src: physiotherapyRecoveryIcon(8),
          alt: "Strength rehabilitation icon",
        },
      },
    ],
  },
  stepByStepSection: {
    eyebrow: "Our Rehabilitation Process",
    title: "Step-by-Step Care for Lasting Results",
    items: [
      {
        title: "Assessment",
        description:
          "We evaluate your condition, medical history, and movement to understand your needs.",
        icon: {
          src: physiotherapyStepIcon(1),
          alt: "Assessment icon",
        },
      },
      {
        title: "Diagnosis",
        description:
          "Our specialists identify the root cause of pain and movement limitations.",
        icon: {
          src: physiotherapyStepIcon(2),
          alt: "Diagnosis icon",
        },
      },
      {
        title: "Personalized Exercise Plan",
        description:
          "We create a customized exercise plan tailored to your goals and physical condition.",
        icon: {
          src: physiotherapyStepIcon(3),
          alt: "Personalized exercise plan icon",
        },
      },
      {
        title: "Hands-on Therapy",
        description:
          "Hands-on techniques help reduce pain, improve mobility, and restore function.",
        icon: {
          src: physiotherapyStepIcon(4),
          alt: "Hands-on therapy icon",
        },
      },
      {
        title: "Progress Monitoring",
        description:
          "We track your progress regularly and adjust treatment to ensure continuous improvement.",
        icon: {
          src: physiotherapyStepIcon(5),
          alt: "Progress monitoring icon",
        },
      },
      {
        title: "Recovery & Maintenance",
        description:
          "We help you maintain your progress and prevent future injuries for long-term wellness.",
        icon: {
          src: physiotherapyStepIcon(6),
          alt: "Recovery and maintenance icon",
        },
      },
    ],
  },
  benefitsSection: {
    title: {
      prefix: "Benefits of",
      highlight: "Physiotherapy",
    },
    items: [
      {
        title: "Pain Relief",
        description: "Reduces pain and discomfort effectively.",
        icon: {
          src: physiotherapyBenefitIcon(1),
          alt: "Pain relief icon",
        },
      },
      {
        title: "Improved Mobility",
        description: "Enhances movement and overall physical function.",
        icon: {
          src: physiotherapyBenefitIcon(2),
          alt: "Improved mobility icon",
        },
      },
      {
        title: "Better Flexibility",
        description: "Increases range of motion and flexibility.",
        icon: {
          src: physiotherapyBenefitIcon(3),
          alt: "Better flexibility icon",
        },
      },
      {
        title: "Muscle Strength",
        description: "Strengthens muscles and improves endurance.",
        icon: {
          src: physiotherapyBenefitIcon(4),
          alt: "Muscle strength icon",
        },
      },
      {
        title: "Balance Improvement",
        description: "Improves stability and prevents falls.",
        icon: {
          src: physiotherapyBenefitIcon(5),
          alt: "Balance improvement icon",
        },
      },
      {
        title: "Reduced Inflammation",
        description: "Helps reduce swelling and promotes healing.",
        icon: {
          src: physiotherapyBenefitIcon(6),
          alt: "Reduced inflammation icon",
        },
      },
      {
        title: "Improved Daily Activities",
        description: "Makes everyday tasks easier and more comfortable.",
        icon: {
          src: physiotherapyBenefitIcon(7),
          alt: "Improved daily activities icon",
        },
      },
      {
        title: "Prevent Future Injury",
        description: "Strengthens the body and reduces risk of re-injury.",
        icon: {
          src: physiotherapyBenefitIcon(8),
          alt: "Prevent future injury icon",
        },
      },
    ],
  },
};
