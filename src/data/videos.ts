export type VideoCategory = "education" | "patient-story" | "awareness";

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

export const videos: readonly VideoItem[] = videosJson as VideoItem[];
export const featuredVideos = videos.slice(0, videosSection.featuredLimit);
