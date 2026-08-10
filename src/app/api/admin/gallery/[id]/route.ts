import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const images = JSON.parse(await fs.readFile(GALLERY_JSON_PATH, "utf-8")) as GalleryImage[];
    const image = images.find((img) => img.id === id);

    if (!image) {
      return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
    }

    const fileName = path.basename(image.src);
    const filePath = path.join(GALLERY_IMAGES_DIR, fileName);

    try {
      await fs.unlink(filePath);
    } catch {
      console.error("Failed to delete image file:", filePath);
    }

    const updatedImages = images.filter((img) => img.id !== id);
    await fs.writeFile(GALLERY_JSON_PATH, JSON.stringify(updatedImages, null, 2));

    await updateGalleryTsFile();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
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
