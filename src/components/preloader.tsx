"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

const MIN_VISIBLE_MS = 900;
const MAX_VISIBLE_MS = 5000;
const EXIT_DURATION_MS = 450;

type Phase = "visible" | "exiting" | "hidden";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const beginExit = () => {
      setPhase((current) => (current === "visible" ? "exiting" : current));
    };

    // Wait for BOTH the minimum display time and the real page load before
    // exiting, so a fast connection can't skip the floor and a slow one
    // can't hide the loader before the page is actually ready. The max
    // timer is just a safety net in case `load` never fires.
    let minTimeElapsed = false;
    let pageLoaded = document.readyState === "complete";

    const tryExit = () => {
      if (minTimeElapsed && pageLoaded) beginExit();
    };

    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryExit();
    }, MIN_VISIBLE_MS);

    const maxTimer = setTimeout(beginExit, MAX_VISIBLE_MS);

    const onLoad = () => {
      pageLoaded = true;
      tryExit();
    };

    if (!pageLoaded) {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "exiting") return;

    const timer = setTimeout(() => setPhase("hidden"), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "hidden") return null;

  const exiting = phase === "exiting";

  return (
    <div
      className={cn("preloader", exiting && "preloader--exiting")}
      role="status"
      aria-live="polite"
      aria-label="Loading Rheumatology and Arthritis Center"
    >
      <div className="preloader__bg" aria-hidden="true" />
      <div className="preloader__vignette" aria-hidden="true" />

      <div className="preloader__content">
        <div className="preloader__logo-wrap">
          <div className="preloader__logo-glow" aria-hidden="true" />
          <svg className="preloader__ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle
              className="preloader__ring-track"
              cx="100"
              cy="100"
              r="88"
            />
            <circle
              className="preloader__ring-arc"
              cx="100"
              cy="100"
              r="88"
            />
          </svg>
          <div className="preloader__logo">
            <Image
              src="/images/preloader.png"
              alt="Rheumatology and Arthritis Center"
              width={320}
              height={90}
              priority
              className="preloader__logo-img"
            />
          </div>
        </div>

        <div className="preloader__text">
          <p className="preloader__title">Rheumatology and Arthritis Center</p>
          <p className="preloader__subtitle">Enhancing Lives</p>
        </div>

        <div className="preloader__progress">
          <span className="preloader__progress-track">
            <span
              className={cn(
                "preloader__progress-fill",
                exiting && "preloader__progress-fill--complete",
              )}
            />
          </span>
          <p className="preloader__loading-label">Loading</p>
        </div>
      </div>
    </div>
  );
}
