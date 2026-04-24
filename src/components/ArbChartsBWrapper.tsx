"use client";
import dynamic from "next/dynamic";

const ArbChartsB = dynamic(() => import("./ArbChartsB"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 280, background: "#080808", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#222", fontSize: 10, fontFamily: "monospace" }}>
      loading charts…
    </div>
  ),
});

export default function ArbChartsBWrapper() {
  return <ArbChartsB />;
}
