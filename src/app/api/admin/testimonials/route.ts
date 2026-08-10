import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  image?: {
    src: string;
    alt: string;
  };
  initials: string;
}

const TESTIMONIALS_JSON_PATH = path.join(process.cwd(), "src", "data", "testimonials.json");

export async function GET() {
  try {
    const data = await fs.readFile(TESTIMONIALS_JSON_PATH, "utf-8");
    const testimonials = JSON.parse(data) as Testimonial[];
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quote, name, role, initials, image } = body;

    if (!quote || !name || !role || !initials) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const testimonials = JSON.parse(await fs.readFile(TESTIMONIALS_JSON_PATH, "utf-8")) as Testimonial[];
    const newTestimonial: Testimonial = {
      id: `patient-${Date.now()}`,
      quote,
      name,
      role,
      initials,
      image: image || undefined,
    };
    testimonials.push(newTestimonial);
    await fs.writeFile(TESTIMONIALS_JSON_PATH, JSON.stringify(testimonials, null, 2));

    await updateTestimonialsTsFile();

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to add testimonial" }, { status: 500 });
  }
}

async function updateTestimonialsTsFile() {
  try {
    const testimonialsTsPath = path.join(process.cwd(), "src", "data", "testimonials.ts");

    const newContent = `export type Testimonial = {
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

export const testimonials: readonly Testimonial[] = testimonialsJson;
`;

    await fs.writeFile(testimonialsTsPath, newContent, "utf-8");
  } catch {
    console.error("Failed to update testimonials.ts");
  }
}
