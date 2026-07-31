import { ScrollChapter } from "@/config/scroll-experience";
import { clamp } from "./clamp";

export interface CalculatedChapterTime {
  startSeconds: number;
  endSeconds: number;
  durationSeconds: number;
}

/**
 * Calculates absolute start and end times in seconds for a given chapter and video duration.
 */
export function calculateChapterTimes(
  videoDuration: number,
  chapter: ScrollChapter
): CalculatedChapterTime {
  const safeDuration = Number.isFinite(videoDuration) && videoDuration > 0 ? videoDuration : 0;
  const startSeconds = clamp(chapter.videoStart * safeDuration, 0, safeDuration);
  const endSeconds = clamp(chapter.videoEnd * safeDuration, startSeconds, safeDuration);
  const durationSeconds = endSeconds - startSeconds;

  return {
    startSeconds,
    endSeconds,
    durationSeconds,
  };
}

/**
 * Safely updates the video currentTime only when the difference exceeds a small threshold.
 * Prevents redundant assignments and reduces CPU paint overhead during scrolling.
 */
export function safeSeekVideo(
  video: HTMLVideoElement | null,
  targetTime: number,
  threshold = 0.01
): void {
  if (!video || !Number.isFinite(targetTime) || !video.duration) return;

  const clampedTime = clamp(targetTime, 0, video.duration);
  
  if (Math.abs(video.currentTime - clampedTime) >= threshold) {
    try {
      video.currentTime = clampedTime;
    } catch {
      // Ignore rapid seek interruption warnings in browsers
    }
  }
}
