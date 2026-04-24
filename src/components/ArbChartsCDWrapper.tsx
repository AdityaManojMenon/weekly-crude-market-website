"use client";
import dynamic from "next/dynamic";

const ArbChartsCD = dynamic(() => import("./ArbChartsCD"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 480, background: "#080808", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#222", fontSize: 10, fontFamily: "monospace" }}>
      loading charts…
    </div>
  ),
});

export default function ArbChartsCDWrapper() {
  return <ArbChartsCD />;
}
