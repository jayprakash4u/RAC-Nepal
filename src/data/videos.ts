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
  description:
    "Expert rheumatology insights, patient experiences, and awareness updates from RAC Nepal — in Nepali and English.",
  featuredLimit: 3,
} as const;

export const videos: readonly VideoItem[] = [
  {
    id: "intro-rac-nepal",
    youtubeId: "ppCdSEBjNNM",
    title: "Introduction to RAC Nepal and Arthritis",
    category: "education",
  },
  {
    id: "timely-treatment",
    youtubeId: "srhjVxafJRg",
    title: "बाथ रोगको उपचार समयमा गर्नु पर्छ ।।।",
    category: "awareness",
  },
  {
    id: "patient-life-butwal",
    youtubeId: "4rETghJfDlk",
    title:
      "बाथ रोगीका पिडा तथा औषधि उपचार पछि नयाँ जीवन प्रतिको अनुभुति । बुटवल",
    category: "patient-story",
    startSeconds: 147,
  },
  {
    id: "uric-acid-arthritis",
    youtubeId: "VapX4HeeBCg",
    title:
      "यूरिक ऐसिड सम्बन्धि बाथ रोग.. #डा. अरुण कुमार गुप्ता, बाथ रोग विशेषज्ञ",
    category: "education",
  },
];

export const featuredVideos = videos.slice(0, videosSection.featuredLimit);
