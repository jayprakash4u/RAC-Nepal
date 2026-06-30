export function getYoutubeThumbnailUrl(
  youtubeId: string,
  quality: "hq" | "max" = "hq",
): string {
  const file = quality === "max" ? "maxresdefault.jpg" : "hqdefault.jpg";
  return `https://i.ytimg.com/vi/${youtubeId}/${file}`;
}

export function getYoutubeEmbedUrl(
  youtubeId: string,
  startSeconds?: number,
  autoplay = false,
): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });

  if (startSeconds) {
    params.set("start", String(startSeconds));
  }

  if (autoplay) {
    params.set("autoplay", "1");
  }

  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`;
}

export function getYoutubeWatchUrl(
  youtubeId: string,
  startSeconds?: number,
): string {
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;

  if (startSeconds) {
    return `${url}&t=${startSeconds}s`;
  }

  return url;
}
