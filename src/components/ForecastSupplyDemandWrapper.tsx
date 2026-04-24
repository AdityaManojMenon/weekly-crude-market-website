"use client";

import dynamic from "next/dynamic";

const ForecastSupplyDemandCharts = dynamic(() => import("./ForecastSupplyDemandCharts"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 480, background: "#080808", border: "1px solid var(--border)",
      borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ color: "#333", fontFamily: "monospace", fontSize: 11 }}>Loading supply & demand charts…</span>
    </div>
  ),
});

export default function ForecastSupplyDemandWrapper() {
  return <ForecastSupplyDemandCharts />;
}
