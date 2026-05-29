'use client';
import { useEffect, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  // Suppress video on viewports narrower than 1024 px
  enabledOnDesktopOnly?: boolean;
  // Suppress video when OS-level reduced-motion is set
  respectReducedMotion?: boolean;
}

/**
 * Full-bleed video background for the hero section.
 * Renders nothing on mobile (enabledOnDesktopOnly=true) or when the user
 * has requested reduced motion. Falls back gracefully to the poster image.
 * The component is client-only: SSR always renders null to avoid hydration mismatch.
 *
 * TODO: Drop your video at /public/media/bakery-hero.mp4
 * TODO: Drop a poster frame at /public/media/bakery-poster.jpg
 *
 * Encoding tips for best performance:
 *   ffmpeg -i source.mp4 -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow
 *          -profile:v baseline -movflags +faststart -an bakery-hero.mp4
 * Target: < 8 MB, 1920×1080, 24 fps, no audio.
 */
export default function VideoBackground({
  src,
  poster,
  className = '',
  overlayClassName = '',
  enabledOnDesktopOnly = true,
  respectReducedMotion = true,
}: VideoBackgroundProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isDesktop =
      !enabledOnDesktopOnly ||
      window.matchMedia('(min-width: 1024px)').matches;

    const wantsReduced =
      respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setActive(isDesktop && !wantsReduced);
  }, [enabledOnDesktopOnly, respectReducedMotion]);

  // SSR + mobile + reduced-motion → render nothing (static bg-hero-bg shows)
  if (!active) return null;

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/*
        Video fills the hero section as an atmospheric background layer.
        autoPlay + muted + playsInline are all required for cross-browser
        autoplay without user interaction.
        preload="metadata" avoids loading video data on initial page load.
      */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>

      {/*
        Overlay gradient: very opaque on the left (text column stays readable),
        gradually more transparent on the right (cookie + video atmosphere shows).
      */}
      <div
        className={`absolute inset-0 ${overlayClassName}`}
        style={{
          background:
            'linear-gradient(90deg, rgba(244,240,248,.94) 0%, rgba(244,240,248,.80) 42%, rgba(244,240,248,.54) 100%)',
        }}
      />

      {/* Extra warm blush bloom — softens any harsh video edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 72% 52%, rgba(247,196,216,0.22) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
