export interface VideoDiagnosticsData {
  fps: number;
  targetTime: number;
  currentTime: number;
  seeking: boolean;
  readyState: number;
  seeksRequested: number;
  seeksCompleted: number;
  resolution: string;
  duration: number;
}

export class VideoDiagnostics {
  private lastTime = performance.now();
  private frames = 0;
  private currentFps = 0;

  public updateFps(): number {
    const now = performance.now();
    this.frames++;
    if (now >= this.lastTime + 1000) {
      this.currentFps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;
    }
    return this.currentFps;
  }

  public getDiagnostics(
    video: HTMLVideoElement | null,
    targetTime: number,
    seeksRequested: number,
    seeksCompleted: number
  ): VideoDiagnosticsData {
    if (!video) {
      return {
        fps: 0,
        targetTime: 0,
        currentTime: 0,
        seeking: false,
        readyState: 0,
        seeksRequested: 0,
        seeksCompleted: 0,
        resolution: "N/A",
        duration: 0,
      };
    }

    return {
      fps: this.currentFps,
      targetTime: Number(targetTime.toFixed(3)),
      currentTime: Number(video.currentTime.toFixed(3)),
      seeking: video.seeking,
      readyState: video.readyState,
      seeksRequested,
      seeksCompleted,
      resolution: `${video.videoWidth}x${video.videoHeight}`,
      duration: Number(video.duration.toFixed(2)),
    };
  }
}
