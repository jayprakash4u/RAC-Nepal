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

import testimonialsJson from "./testimonials.json";

export const testimonials: readonly Testimonial[] = testimonialsJson as Testimonial[];
