"use client";

import dynamic from "next/dynamic";
import { CotDataPoint } from "@/data/briefs";

const CotNetLengthChart = dynamic(() => import("./CotNetLengthChart"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 160,
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
  data: CotDataPoint[];
  currentNetLength: number;
  oneYearPercentile: number;
}

export default function CotNetLengthChartWrapper(props: Props) {
  return <CotNetLengthChart {...props} />;
}
