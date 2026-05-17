type HeroVideoProps = {
  src: string;
  ariaLabel: string;
};

// Extracts a YouTube video ID from common URL shapes (watch, youtu.be, embed).
function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

// Extracts a numeric Vimeo video ID.
function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

export function HeroVideo({ src, ariaLabel }: HeroVideoProps) {
  if (!src) return null;

  const yt = youtubeId(src);
  if (yt) {
    // Autoplay starts muted (browser policy); controls let visitors unmute.
    // playlist=ID makes loop work on YouTube.
    const embedUrl =
      `https://www.youtube.com/embed/${yt}` +
      `?autoplay=1&mute=1&loop=1&playlist=${yt}&modestbranding=1&rel=0&playsinline=1`;
    return (
      <iframe
        className="h-full w-full"
        src={embedUrl}
        title={ariaLabel}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  const vm = vimeoId(src);
  if (vm) {
    // background=0 to show Vimeo's controls; muted starts true for autoplay.
    const embedUrl =
      `https://player.vimeo.com/video/${vm}?autoplay=1&muted=1&loop=1`;
    return (
      <iframe
        className="h-full w-full"
        src={embedUrl}
        title={ariaLabel}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // Direct media file (.mp4, .webm, etc.) — controls let visitors unmute.
  return (
    <video
      className="h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={ariaLabel}
    />
  );
}
