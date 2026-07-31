import { VIDEO_SOURCES } from "@/config/video-sources";

/**
 * Safely determines the initial video source based on screen size or pointers.
 * Should be called inside useEffect or a client-side only context.
 */
export function selectVideoSource(): string {
  if (typeof window === "undefined") {
    return VIDEO_SOURCES.desktop;
  }

  const isMobile =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  return isMobile ? VIDEO_SOURCES.mobile : VIDEO_SOURCES.desktop;
}
