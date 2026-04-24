"use client";

import dynamic from "next/dynamic";

const ForecastStorageCharts = dynamic(() => import("./ForecastStorageCharts"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 360, background: "#080808", border: "1px solid var(--border)",
      borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ color: "#333", fontFamily: "monospace", fontSize: 11 }}>Loading storage charts…</span>
    </div>
  ),
});

export default function ForecastStorageWrapper() {
  return <ForecastStorageCharts />;
}
