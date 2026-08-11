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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const testimonials = JSON.parse(await fs.readFile(TESTIMONIALS_JSON_PATH, "utf-8")) as Testimonial[];
    const filtered = testimonials.filter((t) => t.id !== id);

    if (filtered.length === testimonials.length) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }

    await fs.writeFile(TESTIMONIALS_JSON_PATH, JSON.stringify(filtered, null, 2));
    await updateTestimonialsTsFile();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quote, name, role, initials, image } = body;

    const testimonials = JSON.parse(await fs.readFile(TESTIMONIALS_JSON_PATH, "utf-8")) as Testimonial[];
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }

    testimonials[index] = {
      ...testimonials[index],
      quote: quote || testimonials[index].quote,
      name: name || testimonials[index].name,
      role: role || testimonials[index].role,
      initials: initials || testimonials[index].initials,
      image: image || testimonials[index].image,
    };

    await fs.writeFile(TESTIMONIALS_JSON_PATH, JSON.stringify(testimonials, null, 2));
    await updateTestimonialsTsFile();

    return NextResponse.json({ success: true, testimonial: testimonials[index] });
  } catch {
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
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
