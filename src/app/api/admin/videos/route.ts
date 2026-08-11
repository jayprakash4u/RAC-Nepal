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

export async function GET() {
  try {
    const data = await fs.readFile(VIDEOS_JSON_PATH, "utf-8");
    const videos = JSON.parse(data) as VideoItem[];
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { youtubeId, title, category, startSeconds = 0 } = body;

    if (!youtubeId || !title || !category) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const videos = JSON.parse(await fs.readFile(VIDEOS_JSON_PATH, "utf-8")) as VideoItem[];
    const newVideo: VideoItem = {
      id: `video-${Date.now()}`,
      youtubeId,
      title,
      category,
      startSeconds: Number(startSeconds) || 0,
    };
    videos.push(newVideo);
    await fs.writeFile(VIDEOS_JSON_PATH, JSON.stringify(videos, null, 2));

    await updateVideosTsFile();

    return NextResponse.json({ success: true, video: newVideo });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to add video" }, { status: 500 });
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
