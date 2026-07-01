"use client";

import Image from "next/image";
import { useState } from "react";
import { Container, Section, SectionHeader } from "@/components/ui";
import { VideosMobileCarousel } from "@/components/sections/videos-mobile-carousel";
import {
  featuredVideos,
  videoCategoryLabels,
  videosSection,
  type VideoItem,
} from "@/data/videos";
import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  getYoutubeWatchUrl,
} from "@/lib/youtube";
import { cn } from "@/lib/cn";

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8c2 .4 7.8.4 7.8.4s5.8 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.5v-7l6.5 3.5L10 15.5z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="ml-0.5 h-6 w-6 text-navy"
    >
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.04-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M11 3h6v6M17 3 8 12M7 5H4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoPlayer({ video }: { video: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full bg-navy">
        <iframe
          src={getYoutubeEmbedUrl(
            video.youtubeId,
            video.startSeconds,
            true,
          )}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className={cn(
        "group relative block aspect-video w-full overflow-hidden bg-navy",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
      aria-label={`Play video: ${video.title}`}
    >
      <Image
        src={getYoutubeThumbnailUrl(video.youtubeId)}
        alt=""
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/20 to-navy/10 transition-colors duration-normal group-hover:via-navy/30"
      />

      <span
        aria-hidden="true"
        className={cn(
          "absolute top-md left-md rounded-full px-sm py-1",
          "bg-white/95 text-eyebrow font-semibold tracking-wide text-navy uppercase shadow-sm",
        )}
      >
        {videoCategoryLabels[video.category]}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2",
          "items-center justify-center rounded-full bg-white/95 shadow-lg",
          "transition-all duration-normal group-hover:scale-110 group-hover:bg-white",
        )}
      >
        <PlayIcon />
      </span>
    </button>
  );
}

function VideoCard({ video }: { video: VideoItem }) {
  const watchUrl = getYoutubeWatchUrl(video.youtubeId, video.startSeconds);

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl",
        "border border-slate-200/90 bg-background shadow-sm",
        "transition-shadow duration-normal hover:shadow-md",
      )}
    >
      <VideoPlayer video={video} />

      <div className="flex flex-1 flex-col gap-sm px-lg py-lg">
        <h3 className="line-clamp-2 text-body font-semibold text-pretty text-navy">
          {video.title}
        </h3>

        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-auto inline-flex items-center gap-xs text-small font-medium text-slate-600",
            "transition-colors duration-normal hover:text-primary",
          )}
        >
          <YouTubeIcon className="h-4 w-4 shrink-0 text-[#ff0000]" />
          Open on YouTube
          <ExternalLinkIcon />
        </a>
      </div>
    </article>
  );
}

export function Videos() {
  return (
    <Section background="surface" spacing="default">
      <Container size="wide">
        <SectionHeader
          eyebrow={videosSection.eyebrow}
          title={videosSection.title}
          align="center"
          decoratedEyebrow
        />

        <VideosMobileCarousel items={featuredVideos} />

        <ul className="section-content hidden grid-cols-1 gap-lg sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-xl">
          {featuredVideos.map((video) => (
            <li key={video.id} className="flex">
              <VideoCard video={video} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
