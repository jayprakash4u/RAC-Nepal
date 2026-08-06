"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const MIN_VISIBLE_MS = 3500;

  useEffect(() => {
    const minTimer = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);

    const onReady = () => {
      setVisible(false);
    };

    if (document.readyState !== "complete") {
      window.addEventListener("load", onReady);
    }

    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(minTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader">
      <div className="preloader__bg" aria-hidden="true" />
      <div className="preloader__vignette" aria-hidden="true" />

      <div className="preloader__content">
        <div className="preloader__logo-wrap">
          <div className="preloader__logo-glow" aria-hidden="true" />
          <svg
            className="preloader__ring"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="preloader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#1496a8" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
              <filter id="preloader-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              className="preloader__ring-track"
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="rgba(20, 150, 168, 0.15)"
              strokeWidth="1.5"
            />
            <circle
              className="preloader__ring-arc"
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="url(#preloader-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="140 400"
              filter="url(#preloader-glow)"
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
          <p className="preloader__title">RHEUMATOLOGY AND ARTHRITIS CENTER</p>
          <p className="preloader__subtitle">ENHANCING LIVES</p>
        </div>

        <div className="preloader__footer">
          <p className="preloader__tagline">CARING. HEALING. ENHANCING LIVES</p>
          <p className="preloader__wait">
            PLEASE WAIT
            <span className="preloader__dot" />
            <span className="preloader__dot" />
            <span className="preloader__dot" />
          </p>
        </div>
      </div>
    </div>
  );
}
