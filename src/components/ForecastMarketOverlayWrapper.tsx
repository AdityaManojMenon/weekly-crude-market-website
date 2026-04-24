"use client";

import dynamic from "next/dynamic";

const ForecastMarketOverlayCharts = dynamic(() => import("./ForecastMarketOverlayCharts"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 420, background: "#080808", border: "1px solid var(--border)",
      borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ color: "#333", fontFamily: "monospace", fontSize: 11 }}>Loading market overlay charts…</span>
    </div>
  ),
});

export default function ForecastMarketOverlayWrapper() {
  return <ForecastMarketOverlayCharts />;
}
