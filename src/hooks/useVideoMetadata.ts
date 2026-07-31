"use client";

import { useEffect, useState, RefObject } from "react";

export interface VideoMetadataState {
  isLoaded: boolean;
  duration: number;
  hasError: boolean;
  errorMessage: string | null;
}

export function useVideoMetadata(
  videoRef: RefObject<HTMLVideoElement | null>
): VideoMetadataState {
  const [state, setState] = useState<VideoMetadataState>({
    isLoaded: false,
    duration: 0,
    hasError: false,
    errorMessage: null,
  });

  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode) return;

    const handleLoadedMetadata = () => {
      if (videoNode.duration && Number.isFinite(videoNode.duration)) {
        setState({
          isLoaded: true,
          duration: videoNode.duration,
          hasError: false,
          errorMessage: null,
        });
      }
    };

    const handleError = (e: Event) => {
      const error = (e.target as HTMLVideoElement)?.error;
      console.warn("Video failed to load or play:", error);
      setState((prev) => ({
        ...prev,
        hasError: true,
        errorMessage: error?.message || "Failed to load video source.",
      }));
    };

    // If metadata is already ready
    if (videoNode.readyState >= 1 && videoNode.duration) {
      handleLoadedMetadata();
    } else {
      videoNode.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoNode.addEventListener("loadeddata", handleLoadedMetadata);
      videoNode.addEventListener("error", handleError);
    }

    return () => {
      videoNode.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoNode.removeEventListener("loadeddata", handleLoadedMetadata);
      videoNode.removeEventListener("error", handleError);
    };
  }, [videoRef]);

  return state;
}
