"use client";

import dynamic from "next/dynamic";
import { RadarScores } from "@/data/briefs";

const Chart = dynamic(() => import("./PositioningRadarChart"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100%", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#1f2937", fontSize: 11, fontFamily: "monospace" }}>Loading…</span>
    </div>
  ),
});

export default function PositioningRadarChartWrapper({ scores }: { scores: RadarScores }) {
  return <Chart scores={scores} />;
}
