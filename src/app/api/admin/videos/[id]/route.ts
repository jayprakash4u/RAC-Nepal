import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: "education" | "patient-story" | "awareness";
  startSeconds?: number;
}

const VIDEOS_JSON_PATH = path.join(process.cwd(), "src", "data", "videos.json");

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const videos = JSON.parse(await fs.readFile(VIDEOS_JSON_PATH, "utf-8")) as VideoItem[];
    const filtered = videos.filter((v) => v.id !== id);

    if (filtered.length === videos.length) {
      return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 });
    }

    await fs.writeFile(VIDEOS_JSON_PATH, JSON.stringify(filtered, null, 2));
    await updateVideosTsFile();

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
    const { youtubeId, title, category, startSeconds = 0 } = body;

    const videos = JSON.parse(await fs.readFile(VIDEOS_JSON_PATH, "utf-8")) as VideoItem[];
    const index = videos.findIndex((v) => v.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 });
    }

    videos[index] = {
      ...videos[index],
      youtubeId: youtubeId || videos[index].youtubeId,
      title: title || videos[index].title,
      category: category || videos[index].category,
      startSeconds: Number(startSeconds) || 0,
    };

    await fs.writeFile(VIDEOS_JSON_PATH, JSON.stringify(videos, null, 2));
    await updateVideosTsFile();

    return NextResponse.json({ success: true, video: videos[index] });
  } catch {
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

async function updateVideosTsFile() {
  try {
    const videosTsPath = path.join(process.cwd(), "src", "data", "videos.ts");

    const newContent = `export type VideoCategory = "education" | "patient-story" | "awareness";

export type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
  category: VideoCategory;
  startSeconds?: number;
};

export const videoCategoryLabels: Record<VideoCategory, string> = {
  education: "Expert Talk",
  "patient-story": "Patient Story",
  awareness: "Awareness",
};

export const videosSection = {
  eyebrow: "Watch & Learn",
  title: {
    prefix: "Health Education",
    highlight: "Patient Stories",
    connector: "&",
  },
  featuredLimit: 3,
} as const;

import videosJson from "./videos.json";

export const videos: readonly VideoItem[] = videosJson;
export const featuredVideos = videos.slice(0, videosSection.featuredLimit);
`;

    await fs.writeFile(videosTsPath, newContent, "utf-8");
  } catch {
    console.error("Failed to update videos.ts");
  }
}
