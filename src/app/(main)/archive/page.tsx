import { briefs, callHistory, getBiasLabel, getBiasColor, getRegimeLabel } from "@/data/briefs";
import SignalBadge from "@/components/SignalBadge";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

export default function Archive() {
  const fmtChange = (v: number) => (v >= 0 ? `+${v.toFixed(2)}` : v.toFixed(2));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
          <h1 className="text-xl font-semibold text-white">Brief Archive</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Historical WTI Crude Market Intelligence Briefs — EIA WPSR weekly analysis
        </p>
      </div>

      {/* Brief Cards */}
      <div className="mb-10">
        <SectionHeader title="All Briefs" subtitle={`${briefs.length} reports`} />
        <div className="flex flex-col gap-3">
          {briefs.map((brief, i) => {
            const biasDir = getBiasColor(brief.bias);
            const isCurrent = i === 0;

            return (
              <Link
                key={brief.id}
                href={`/brief/${brief.id}`}
                className="block rounded-lg p-5 transition-all group"
                style={{
                  background: "var(--card)",
                  border: isCurrent ? "1px solid rgba(212,146,42,0.3)" : "1px solid var(--border)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Left: date + headline */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>
                        {brief.weekEnding.toUpperCase()}
                      </span>
                      {isCurrent && (
                        <span
                          className="text-xs font-mono px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(212,146,42,0.12)", color: "var(--accent)", fontSize: "10px" }}
                        >
                          CURRENT
                        </span>
                      )}
                      <span
                        className="text-xs font-mono px-1.5 py-0.5 rounded"
                        style={{
                          background: brief.regime === "DIVERGENT" ? "rgba(251,191,36,0.08)" : "rgba(148,163,184,0.06)",
                          color: brief.regime === "DIVERGENT" ? "#fbbf24" : "var(--muted)",
                          fontSize: "10px",
                        }}
                      >
                        {getRegimeLabel(brief.regime)}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium text-white group-hover:text-white leading-snug transition-colors line-clamp-2"
                      style={{ color: "#e0e0e0" }}
                    >
                      {brief.headline}
                    </p>
                  </div>

                  {/* Right: metrics */}
                  <div className="flex items-center gap-5 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>WTI</span>
                      <span className="text-sm font-mono font-semibold tabular-nums text-white">
                        ${brief.wtiPriceAtPublish.toFixed(2)}
                      </span>
                      <span
                        className="text-xs font-mono tabular-nums"
                        style={{ color: brief.wtiWeeklyChange >= 0 ? "var(--bull)" : "var(--bear)" }}
                      >
                        {fmtChange(brief.wtiWeeklyChange)} WoW
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono mb-1" style={{ color: "var(--muted)" }}>CRACK</span>
                      <span className="text-sm font-mono font-medium tabular-nums text-white">
                        ${brief.crackSpreads.crackSpread321}/bbl
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono mb-1" style={{ color: "var(--muted)" }}>BIAS</span>
                      <SignalBadge direction={biasDir} label={getBiasLabel(brief.bias)} size="sm" />
                    </div>
                    <div
                      className="text-xs font-mono tracking-wider transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      VIEW →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Call History Table */}
      <div>
        <SectionHeader title="Call History" subtitle="Directional accuracy record" />
        <div
          className="rounded-lg overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["WEEK ENDING", "CALL", "OUTCOME", "WTI Δ", "NOTES"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {callHistory.map((record, i) => {
                const isWin = record.outcome === "WIN";
                const isLoss = record.outcome === "LOSS";
                const isOpen = record.outcome === "OPEN";
                const outcomeColor = isWin ? "var(--bull)" : isLoss ? "var(--bear)" : isOpen ? "var(--accent)" : "var(--neutral)";
                const outcomeBg = isWin ? "rgba(34,197,94,0.1)" : isLoss ? "rgba(239,68,68,0.1)" : isOpen ? "rgba(212,146,42,0.1)" : "rgba(148,163,184,0.08)";
                const callDir = getBiasColor(record.call);

                return (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: i < callHistory.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                  >
                    <td className="px-4 py-3 text-xs font-mono text-white">{record.weekEnding}</td>
                    <td className="px-4 py-3">
                      <SignalBadge direction={callDir} label={getBiasLabel(record.call)} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded tracking-wider"
                        style={{ background: outcomeBg, color: outcomeColor, border: `1px solid ${outcomeColor}33` }}
                      >
                        {record.outcome}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-mono tabular-nums font-medium"
                      style={{ color: isOpen ? "var(--muted)" : record.wtiReturn >= 0 ? "var(--bull)" : "var(--bear)" }}
                    >
                      {isOpen ? "—" : `${fmtChange(record.wtiReturn)}/bbl`}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted)" }}>
                      {record.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
