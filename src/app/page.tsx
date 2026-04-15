import { briefs, getBiasLabel, getBiasColor, getRegimeLabel } from "@/data/briefs";
import SignalBadge from "@/components/SignalBadge";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import SpreadMiniChart from "@/components/SpreadMiniChart";
import Link from "next/link";

export default function Home() {
  const brief = briefs[0];
  const biasDir = getBiasColor(brief.bias);

  const fmtChange = (v: number) => (v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1));
  const surpriseColor = (v: number) => (v < 0 ? "var(--bull)" : v > 0 ? "var(--bear)" : "var(--neutral)");
  const dirColor = (d: "bull" | "bear" | "neutral") =>
    d === "bull" ? "var(--bull)" : d === "bear" ? "var(--bear)" : "var(--neutral)";
  const weightBg = (w: string) =>
    w === "HIGH" ? "rgba(212,146,42,0.15)" : w === "MEDIUM" ? "rgba(148,163,184,0.08)" : "rgba(60,60,60,0.4)";
  const weightColor = (w: string) =>
    w === "HIGH" ? "var(--accent)" : w === "MEDIUM" ? "var(--neutral)" : "var(--muted)";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 fade-in">
      {/* Header Band */}
      <div
        className="rounded-lg p-5 mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono tracking-widest" style={{ color: "var(--muted)" }}>
              {brief.reportWeek.toUpperCase()}
            </span>
            <div className="h-3 w-px" style={{ background: "var(--border)" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "var(--muted)" }}>
              EIA RELEASE: {brief.eiaReleaseDate.toUpperCase()}
            </span>
            <div className="h-3 w-px" style={{ background: "var(--border)" }} />
            <span
              className="text-xs font-mono px-2 py-0.5 rounded tracking-wider"
              style={{ background: "rgba(212,146,42,0.12)", color: "var(--accent)", border: "1px solid rgba(212,146,42,0.2)" }}
            >
              CURRENT BRIEF
            </span>
          </div>
          <h1 className="text-xl font-semibold text-white leading-snug max-w-3xl">{brief.headline}</h1>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>DIRECTIONAL BIAS</span>
            <SignalBadge direction={biasDir} label={getBiasLabel(brief.bias)} />
          </div>
          <div className="h-10 w-px" style={{ background: "var(--border)" }} />
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>REGIME</span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded tracking-wider"
              style={{
                background: brief.regime === "DIVERGENT" ? "rgba(251,191,36,0.1)" : "rgba(148,163,184,0.08)",
                color: brief.regime === "DIVERGENT" ? "#fbbf24" : "var(--neutral)",
                border: `1px solid ${brief.regime === "DIVERGENT" ? "#fbbf2440" : "var(--border)"}`,
              }}
            >
              {getRegimeLabel(brief.regime)}
            </span>
          </div>
          <div className="h-10 w-px" style={{ background: "var(--border)" }} />
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>WTI SPOT</span>
            <span className="text-lg font-mono font-semibold tabular-nums text-white">
              ${brief.wtiPriceAtPublish.toFixed(2)}
            </span>
            <span
              className="text-xs font-mono tabular-nums"
              style={{ color: brief.wtiWeeklyChange >= 0 ? "var(--bull)" : "var(--bear)" }}
            >
              {brief.wtiWeeklyChange >= 0 ? "+" : ""}
              {brief.wtiWeeklyChange.toFixed(2)} WoW
            </span>
          </div>
        </div>
      </div>

      {/* Divergence Alert */}
      {brief.divergenceFlag && (
        <div
          className="rounded-lg p-4 mb-6 flex items-start gap-3"
          style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <span className="text-base mt-0.5">⚠</span>
          <div>
            <div className="text-xs font-mono font-semibold tracking-wider mb-1" style={{ color: "#fbbf24" }}>
              DIVERGENCE REGIME FLAGGED
            </div>
            <p className="text-sm" style={{ color: "#d1a85a" }}>{brief.divergenceNote}</p>
          </div>
        </div>
      )}

      {/* Executive Summary */}
      <div className="mb-6">
        <SectionHeader title="Executive Summary" accent />
        <div
          className="rounded-lg p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "#c8c8c8" }}>
            {brief.executiveSummary}
          </p>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="mb-6">
        <SectionHeader title="Key Metrics" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Crude Inventory Δ"
            value={`${fmtChange(brief.inventory.crude.actual)} MMbbl`}
            sub={`Surprise: ${fmtChange(brief.inventory.crude.surprise)} vs est.`}
            direction={brief.inventory.crude.actual < 0 ? "bull" : "bear"}
          />
          <StatCard
            label="CL1–CL2 Spread"
            value={`$${brief.curveStructure.spread.toFixed(2)}`}
            sub={`${brief.curveStructure.structure === "BACKWARDATION" && brief.curveStructure.spread >= 5 ? "Strong Backwardation" : brief.curveStructure.structure} · ${fmtChange(brief.curveStructure.spreadChange)} WoW`}
            direction={brief.curveStructure.structure === "BACKWARDATION" ? "bull" : "bear"}
          />
          <StatCard
            label="3-2-1 Crack Spread"
            value={`$${brief.crackSpreads.crackSpread321}/bbl`}
            sub={`${fmtChange(brief.crackSpreads.crackSpreadChange)} WoW`}
            direction={brief.crackSpreads.crackSpreadChange > 0 ? "bull" : "bear"}
          />
          <StatCard
            label="Refiner Utilization"
            value={`${brief.production.refinerUtilization}%`}
            sub={`Production: ${brief.production.domesticProduction} MMbbl/d`}
            direction="accent"
          />
        </div>
      </div>

      {/* Two Column Layout: [Inventory + Spread Chart] | [Signals] */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left col: Inventory Table + Spread Chart stacked */}
        <div className="flex flex-col gap-4">
          <div>
            <SectionHeader title="EIA Inventory Data" subtitle="Week-over-week change (MMbbl)" />
            <div
              className="rounded-lg overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["PRODUCT", "ACTUAL", "EXPECTED", "SURPRISE", "5YR NORM"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-mono tracking-wider"
                        style={{ color: "var(--muted)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "CRUDE OIL", data: brief.inventory.crude },
                    { label: "GASOLINE", data: brief.inventory.gasoline },
                    { label: "DISTILLATES", data: brief.inventory.distillates },
                  ].map(({ label, data }, i) => (
                    <tr
                      key={label}
                      style={{ borderBottom: i < 2 ? "1px solid var(--border-subtle)" : "none" }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-xs font-mono tracking-wider text-white">{label}</td>
                      <td
                        className="px-4 py-3 text-xs font-mono tabular-nums font-medium"
                        style={{ color: data.actual < 0 ? "var(--bull)" : "var(--bear)" }}
                      >
                        {fmtChange(data.actual)}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                        {fmtChange(data.expected)}
                      </td>
                      <td
                        className="px-4 py-3 text-xs font-mono tabular-nums font-semibold"
                        style={{ color: surpriseColor(data.surprise) }}
                      >
                        {fmtChange(data.surprise)}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                        {fmtChange(data.fiveYearAvg)}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-4 py-3 text-xs font-mono tracking-wider text-white">CUSHING</td>
                    <td
                      className="px-4 py-3 text-xs font-mono tabular-nums font-medium"
                      style={{ color: brief.inventory.cushing.actual < 0 ? "var(--bull)" : "var(--bear)" }}
                    >
                      {fmtChange(brief.inventory.cushing.actual)}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                      {fmtChange(brief.inventory.cushing.expected)}
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-mono tabular-nums font-semibold"
                      style={{ color: surpriseColor(brief.inventory.cushing.actual - brief.inventory.cushing.expected) }}
                    >
                      {fmtChange(brief.inventory.cushing.actual - brief.inventory.cushing.expected)}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Spread + Momentum Mini Chart — fills remaining space */}
          <div>
            <SectionHeader title="Spread + Momentum" subtitle="CL1–CL2 · 10-day" />
            <SpreadMiniChart
              data={brief.curveStructure.spreadHistory}
              currentSpread={brief.curveStructure.spread}
              structure={brief.curveStructure.structure}
              compact
            />
          </div>
        </div>

        {/* Right col: Signals */}
        <div>
          <SectionHeader title="Signal Framework" subtitle={`${brief.signals.filter(s => s.direction === "bull").length}B / ${brief.signals.filter(s => s.direction === "bear").length}B / ${brief.signals.filter(s => s.direction === "neutral").length}N`} />
          <div className="flex flex-col gap-2">
            {brief.signals.map((signal) => (
              <div
                key={signal.name}
                className="rounded-lg px-4 py-3 flex items-start justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-wider text-white">{signal.name}</span>
                    <span
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ background: weightBg(signal.weight), color: weightColor(signal.weight), fontSize: "10px" }}
                    >
                      {signal.weight}
                    </span>
                  </div>
                  <span className="text-xs font-mono tabular-nums font-medium" style={{ color: dirColor(signal.direction) }}>
                    {signal.value}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{signal.note}</span>
                </div>
                <SignalBadge direction={signal.direction} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trade Ideas + Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Trade Ideas */}
        <div>
          <SectionHeader title="Trade Ideas" accent />
          <div className="flex flex-col gap-3">
            {brief.tradeIdeas.map((idea, i) => (
              <div
                key={i}
                className="rounded-lg p-4"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-sm font-semibold text-white">{idea.structure}</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
                    style={{
                      background: idea.conviction === "HIGH" ? "rgba(212,146,42,0.15)" : "rgba(148,163,184,0.08)",
                      color: idea.conviction === "HIGH" ? "var(--accent)" : "var(--neutral)",
                      border: `1px solid ${idea.conviction === "HIGH" ? "rgba(212,146,42,0.3)" : "var(--border)"}`,
                    }}
                  >
                    {idea.conviction} CONVICTION
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: "#a0a0a0" }}>{idea.rationale}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "ENTRY", value: idea.entry, color: "var(--neutral)" },
                    { label: "TARGET", value: idea.target, color: "var(--bull)" },
                    { label: "STOP", value: idea.stop, color: "var(--bear)" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="rounded p-2" style={{ background: "#0d0d0d" }}>
                      <div className="text-xs font-mono tracking-wider mb-0.5" style={{ color: "var(--muted)" }}>{label}</div>
                      <div className="text-xs font-mono font-medium" style={{ color }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scenarios */}
        <div>
          <SectionHeader title="Scenario Analysis" />
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            {brief.scenarios.map((scenario, i) => {
              const icons: Record<string, string> = { bull: "▲", bear: "▼", neutral: "⚖" };
              const caseLabels: Record<string, string> = { bull: "Bullish Case", bear: "Bearish Case", neutral: "Base Case" };
              const borderColors: Record<string, string> = {
                bull: "rgba(34,197,94,0.15)",
                bear: "rgba(239,68,68,0.15)",
                neutral: "rgba(148,163,184,0.1)",
              };
              const iconColor = dirColor(scenario.direction);
              const isLast = i === brief.scenarios.length - 1;

              return (
                <div
                  key={i}
                  className="p-5"
                  style={{
                    borderBottom: isLast ? "none" : "1px solid var(--border)",
                    borderLeft: `3px solid ${borderColors[scenario.direction]}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono" style={{ color: iconColor }}>{icons[scenario.direction]}</span>
                    <span className="text-sm font-semibold" style={{ color: iconColor }}>
                      {caseLabels[scenario.direction]}
                    </span>
                    <span className="text-sm font-semibold text-white">— {scenario.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#a0a0a0" }}>
                    {scenario.description}
                  </p>
                  <div
                    className="flex items-start gap-2 pt-3"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                  >
                    <span className="text-xs font-mono font-semibold tracking-wider shrink-0 mt-0.5" style={{ color: "var(--muted)" }}>
                      TRIGGER:
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>
                      {scenario.trigger}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Geopolitical + Outlook */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <SectionHeader title="Geopolitical Context" />
          <div
            className="rounded-lg p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#a0a0a0" }}>{brief.geopoliticalContext}</p>
          </div>
        </div>
        <div>
          <SectionHeader title="Weekly Outlook" accent />
          <div
            className="rounded-lg p-4"
            style={{ background: "var(--card)", border: "1px solid rgba(212,146,42,0.2)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#c8c8c8" }}>{brief.outlook}</p>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          Published {brief.publishedDate} · EIA data {brief.eiaReleaseDate}
        </span>
        <Link
          href="/archive"
          className="text-xs font-mono tracking-wider hover:text-white transition-colors"
          style={{ color: "var(--accent)" }}
        >
          VIEW ALL BRIEFS →
        </Link>
      </div>
    </div>
  );
}
