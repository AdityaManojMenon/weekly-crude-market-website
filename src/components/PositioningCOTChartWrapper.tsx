"use client";

import dynamic from "next/dynamic";
import { CotDataPoint } from "@/data/briefs";

const Chart = dynamic(() => import("./PositioningCOTChart"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100%", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#3a3a3a", fontSize: 11, fontFamily: "monospace" }}>Loading…</span>
    </div>
  ),
});

interface Props {
  data: CotDataPoint[];
  p25: number;
  p75: number;
  signal: string;
  wowChange: number;
  netLength: number;
  percentile: number;
}

export default function PositioningCOTChartWrapper(props: Props) {
  return <Chart {...props} />;
}
