"use client";

import dynamic from "next/dynamic";

const ForecastCharts = dynamic(() => import("./ForecastCharts"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 640,
      background: "#080808",
      border: "1px solid var(--border)",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <span style={{ color: "#333", fontFamily: "monospace", fontSize: 11 }}>Loading charts…</span>
    </div>
  ),
});

export default function ForecastChartsWrapper() {
  return <ForecastCharts />;
}
