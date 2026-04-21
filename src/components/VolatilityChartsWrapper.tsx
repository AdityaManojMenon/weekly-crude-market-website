"use client";
import dynamic from "next/dynamic";
import { OvxDataPoint } from "@/data/briefs";

const VolatilityCharts = dynamic(() => import("./VolatilityCharts"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 400, background: "#080808", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#222", fontSize: 10, fontFamily: "monospace" }}>
      loading volatility charts…
    </div>
  ),
});

export default function VolatilityChartsWrapper(props: {
  data: OvxDataPoint[];
  ovxLevel: number;
  realizedVol: number;
  vrp: number;
}) {
  return <VolatilityCharts {...props} />;
}
