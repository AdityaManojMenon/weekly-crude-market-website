"use client";
import dynamic from "next/dynamic";

const ArbRouteChart = dynamic(() => import("./ArbRouteChart"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 300, background: "#080808", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#222", fontSize: 10, fontFamily: "monospace",
    }}>
      loading route chart…
    </div>
  ),
});

export default function ArbRouteChartWrapper() {
  return <ArbRouteChart />;
}
