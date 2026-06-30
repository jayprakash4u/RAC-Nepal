import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A5.5 5.5 0 1111.5 18 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.8 6.7a1.2 1.2 0 11-1.2 1.2 1.2 1.2 0 011.2-1.2z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16.5 3h3.1c.2 1.4.8 2.7 1.7 3.7 1 1.1 2.3 1.8 3.7 2.1v3.2c-1.4-.1-2.8-.5-4-1.2v6.8a6.8 6.8 0 11-6.8-6.8c.3 0 .7 0 1 .1v3.4a3.4 3.4 0 103.4 3.4V3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5-5.7 6.5H1.5l7.5-8.6L1 3h6.6l4.5 5.9L17.5 3zm-1.1 16h1.8L7.9 4.9H6l10.4 14.1z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8c2 .4 7.8.4 7.8.4s5.8 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.5v-7l6.5 3.5L10 15.5z" />
    </svg>
  );
}

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  twitter: TwitterIcon,
  youtube: YouTubeIcon,
} as const;

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  const { social } = siteConfig.topBar;

  return (
    <div className={cn("flex items-center gap-xs", className)}>
      {(Object.entries(social) as [keyof typeof socialIcons, string][]).map(
        ([key, href]) => {
          const Icon = socialIcons[key];

          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-colors duration-normal hover:bg-white/10 hover:text-primary",
                linkClassName,
              )}
            >
              <Icon />
            </a>
          );
        },
      )}
    </div>
  );
}
