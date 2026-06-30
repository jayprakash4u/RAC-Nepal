"use client";

import { MobileAutoCarousel } from "@/components/ui/mobile-auto-carousel";
import type { BlogPost } from "@/data/blogs";
import type { ReactNode } from "react";

export function BlogMobileCarousel({
  posts,
  renderPost,
}: {
  posts: readonly BlogPost[];
  renderPost: (post: BlogPost) => ReactNode;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <MobileAutoCarousel
      className="mt-xl sm:hidden"
      trackClassName="mx-auto max-w-[22rem]"
      items={posts}
      getItemKey={(post) => post.id}
      ariaLabel="Blog posts"
      dotLabel={(post) => `Go to ${post.title}`}
      renderSlide={(post) => (
        <div className="flex h-full w-full">{renderPost(post)}</div>
      )}
    />
  );
}
