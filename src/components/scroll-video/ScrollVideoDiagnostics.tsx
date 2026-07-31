"use client";

import React, { useEffect, useState } from "react";
import { VideoDiagnosticsData } from "@/lib/video/video-diagnostics";

interface ScrollVideoDiagnosticsProps {
  getDiagnosticsData: () => VideoDiagnosticsData;
}

export const ScrollVideoDiagnostics: React.FC<ScrollVideoDiagnosticsProps> = ({
  getDiagnosticsData,
}) => {
  const [data, setData] = useState<VideoDiagnosticsData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getDiagnosticsData());
    }, 150);

    return () => clearInterval(interval);
  }, [getDiagnosticsData]);

  if (!data) return null;

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-black/80 border border-[#f5f3ef]/10 text-[#f5f3ef] font-mono text-[10px] rounded-lg shadow-2xl backdrop-blur-md pointer-events-none select-none w-64 space-y-1">
      <div className="text-accent uppercase tracking-wider font-bold mb-1 border-b border-[#f5f3ef]/10 pb-1">
        Diagnóstico de Performance
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">FPS Estimado:</span>
        <span className={`font-bold ${data.fps >= 50 ? "text-green-400" : data.fps >= 30 ? "text-yellow-400" : "text-red-400"}`}>
          {data.fps} FPS
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Tempo Atual:</span>
        <span>{data.currentTime}s</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Tempo Alvo:</span>
        <span>{data.targetTime}s</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Duração:</span>
        <span>{data.duration}s</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Resolução:</span>
        <span>{data.resolution}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Ready State:</span>
        <span>{data.readyState} / 4</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Seeking:</span>
        <span className={data.seeking ? "text-accent animate-pulse" : "text-green-400"}>
          {data.seeking ? "TRUE" : "FALSE"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Seeks Solicitados:</span>
        <span>{data.seeksRequested}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#f5f3ef]/60">Seeks Concluídos:</span>
        <span>{data.seeksCompleted}</span>
      </div>
    </div>
  );
};
