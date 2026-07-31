import { VIDEO_PERFORMANCE_CONFIG } from "@/config/video-sources";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);


export interface SeekState {
  inFlight: boolean;
  pending: boolean;
}

export class VideoSeekController {
  private video: HTMLVideoElement | null = null;
  private seekState: SeekState = { inFlight: false, pending: false };
  private targetTime = 0;
  private lastSeekedTime = 0;
  
  // Performance counters for diagnostics
  public totalSeeksRequested = 0;
  public totalSeeksCompleted = 0;

  constructor(video: HTMLVideoElement | null) {
    this.video = video;
    if (this.video) {
      this.video.addEventListener("seeked", this.handleSeeked);
    }
  }

  public updateTargetTime(time: number): void {
    this.targetTime = time;
  }

  public getTargetTime(): number {
    return this.targetTime;
  }

  public getSeekState(): SeekState {
    return this.seekState;
  }

  public applySeek(): void {
    const video = this.video;
    if (!video || !Number.isFinite(this.targetTime) || video.duration <= 0) return;
    if (video.readyState < 1) return; // HAVE_METADATA is 1

    const clampedTime = clamp(this.targetTime, 0, video.duration);
    const difference = Math.abs(video.currentTime - clampedTime);

    // Skip if difference is negligible
    if (difference < VIDEO_PERFORMANCE_CONFIG.minSeekDelta) {
      return;
    }

    // Coalesce seeks: if one is already processing, queue it and return
    if (this.seekState.inFlight || video.seeking) {
      this.seekState.pending = true;
      return;
    }

    this.seekState.inFlight = true;
    this.seekState.pending = false;
    this.totalSeeksRequested++;

    try {
      // Progressive enhancement: use fastSeek for very large jumps to save decoding cost
      if (
        difference > VIDEO_PERFORMANCE_CONFIG.largeJumpThreshold &&
        typeof video.fastSeek === "function"
      ) {
        video.fastSeek(clampedTime);
      } else {
        video.currentTime = clampedTime;
      }
      this.lastSeekedTime = clampedTime;
    } catch {
      this.seekState.inFlight = false;
    }
  }

  private handleSeeked = (): void => {
    this.seekState.inFlight = false;
    this.totalSeeksCompleted++;

    if (this.video) {
      const difference = Math.abs(this.video.currentTime - this.targetTime);
      if (this.seekState.pending || difference >= VIDEO_PERFORMANCE_CONFIG.minSeekDelta) {
        this.seekState.pending = false;
        // Schedule next seek
        requestAnimationFrame(() => this.applySeek());
      }
    }
  };

  public destroy(): void {
    if (this.video) {
      this.video.removeEventListener("seeked", this.handleSeeked);
      this.video = null;
    }
  }
}
