export const VIDEO_SOURCES = {
  original: "/videos/original/scroll-video-original.MOV",
  desktop: "/videos/optimized/scroll-video-desktop.MOV",
  mobile: "/videos/optimized/scroll-video-mobile.MOV",
  poster: "/videos/optimized/scroll-video-poster.webp",
} as const;

export const VIDEO_PERFORMANCE_CONFIG = {
  minSeekDelta: 1 / 30, // Minimum difference in seconds to trigger seek (roughly 1 frame at 30fps)
  largeJumpThreshold: 0.75, // Time difference in seconds above which we consider it a large jump
  desktopScrub: 0.25,
  mobileScrub: 0.12,
  desktopScrollMultiplier: 6.0,
  mobileScrollMultiplier: 4.5,
  debug: false,
} as const;
