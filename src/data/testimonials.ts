export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image?: {
    src: string;
    alt: string;
  };
  initials: string;
};

const patientImageDir = "/images/what our patient";

export const testimonialsSection = {
  eyebrow: "Patient Experiences",
  title: {
    prefix: "What Our Patients",
    highlight: "Say",
  },
} as const;

export const testimonials: readonly Testimonial[] = [
  {
    id: "patient-1",
    quote:
      "After years of joint pain, the rheumatologists at RAC Nepal finally gave me a clear diagnosis and treatment plan. The staff are compassionate and truly listen.",
    name: "Sunita Sharma",
    role: "Rheumatoid Arthritis Patient, Kathmandu",
    initials: "SS",
    image: {
      src: `${patientImageDir}/1.jpg`,
      alt: "Portrait of Sunita Sharma, RAC Nepal patient",
    },
  },
  {
    id: "patient-2",
    quote:
      "From OPD consultations to laboratory tests and pharmacy — everything is under one roof. It made managing my lupus treatment so much easier for our family.",
    name: "Rajesh K.C.",
    role: "SLE Patient, Lalitpur",
    initials: "RK",
    image: {
      src: `${patientImageDir}/2.jpg`,
      alt: "Portrait of Rajesh K.C., RAC Nepal patient",
    },
  },
  {
    id: "patient-3",
    quote:
      "The doctors explained every step of my gout treatment in simple terms. I feel more confident about my health and my daily routine has improved greatly.",
    name: "Anita Gurung",
    role: "Gout Patient, Bhaktapur",
    initials: "AG",
    image: {
      src: `${patientImageDir}/3.jpg`,
      alt: "Portrait of Anita Gurung, RAC Nepal patient",
    },
  },
  {
    id: "patient-4",
    quote:
      "We travelled from outside the valley for specialist arthritis care. RAC Nepal exceeded our expectations with expert guidance and warm, professional support.",
    name: "Prem Thapa",
    role: "Ankylosing Spondylitis Patient, Pokhara",
    initials: "PT",
    image: {
      src: `${patientImageDir}/4.jpg`,
      alt: "Portrait of Prem Thapa, RAC Nepal patient",
    },
  },
] as const;
