"use client";

import dynamic from "next/dynamic";
import type { MacroDataPoint } from "@/data/briefs";

const MacroDualAxisChart = dynamic(() => import("./MacroDualAxisChart"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 200,
        background: "#000",
        border: "1px solid #1a1a1a",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#333" }}>
        Loading chart…
      </span>
    </div>
  ),
});

interface MacroDualAxisChartWrapperProps {
  data: MacroDataPoint[];
  indicator: "realYield" | "breakeven";
  indicatorColor: string;
  indicatorDashed?: boolean;
  indicatorLabel: string;
  currentWti: number;
  currentIndicator: number;
  indicatorUnit: string;
  interpretation: string;
}

export default function MacroDualAxisChartWrapper(props: MacroDualAxisChartWrapperProps) {
  return <MacroDualAxisChart {...props} />;
}
