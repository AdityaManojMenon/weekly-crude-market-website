"use client";

import dynamic from "next/dynamic";
import { SpreadDataPoint } from "@/data/briefs";

const BrentWtiChart = dynamic(() => import("./BrentWtiChart"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 120,
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
}

export default function BrentWtiChartWrapper({ data, currentSpread }: Props) {
  return <BrentWtiChart data={data} currentSpread={currentSpread} />;
}
