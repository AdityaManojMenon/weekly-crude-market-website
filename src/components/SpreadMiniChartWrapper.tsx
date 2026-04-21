"use client";

import dynamic from "next/dynamic";
import { SpreadDataPoint } from "@/data/briefs";

const SpreadMiniChart = dynamic(() => import("./SpreadMiniChart"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: 220,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.02)",
        borderRadius: 6,
      }}
    >
      <span style={{ color: "#3a3a3a", fontSize: 11, fontFamily: "monospace" }}>
        Loading chart…
      </span>
    </div>
  ),
});

interface Props {
  data: SpreadDataPoint[];
  currentSpread: number;
  structure: "CONTANGO" | "BACKWARDATION";
  compact?: boolean;
}

export default function SpreadMiniChartWrapper(props: Props) {
  return <SpreadMiniChart {...props} />;
}
