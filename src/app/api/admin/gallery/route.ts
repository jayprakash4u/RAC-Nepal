import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { siteConfig } from "@/config/site";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const GALLERY_JSON_PATH = path.join(process.cwd(), "src", "data", "gallery.json");
const GALLERY_IMAGES_DIR = path.join(process.cwd(), "public", "images", "Gallery");

export async function GET() {
  try {
    const data = await fs.readFile(GALLERY_JSON_PATH, "utf-8");
    const images = JSON.parse(data) as GalleryImage[];
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const alt = (formData.get("alt") as string) || "Gallery image";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const fileName = `${Date.now()}-${originalName}`;
    const filePath = path.join(GALLERY_IMAGES_DIR, fileName);

    await fs.writeFile(filePath, buffer);

    const images = JSON.parse(await fs.readFile(GALLERY_JSON_PATH, "utf-8")) as GalleryImage[];
    const newImage: GalleryImage = {
      id: String(Date.now()),
      src: `/images/Gallery/${fileName}`,
      alt,
    };
    images.push(newImage);
    await fs.writeFile(GALLERY_JSON_PATH, JSON.stringify(images, null, 2));

    await updateGalleryTsFile();

    return NextResponse.json({ success: true, image: newImage });
  } catch {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}

async function updateGalleryTsFile() {
  try {
    const galleryTsPath = path.join(process.cwd(), "src", "data", "gallery.ts");

    const newContent = `import { siteConfig } from "@/config/site";
import galleryJson from "./gallery.json";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export const galleryPage = {
  title: "A Glimpse Into",
  titleAccent: "RAC Nepal",
  description: \`Moments from ${siteConfig.shortName} — our facilities, team, and the compassionate rheumatology care we provide every day in Kathmandu.\`,
} as const;

export const galleryImages: readonly GalleryImage[] = galleryJson;
`;

    await fs.writeFile(galleryTsPath, newContent, "utf-8");
  } catch {
    console.error("Failed to update gallery.ts");
  }
}
