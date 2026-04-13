import { getPerformanceMetrics, callHistory, getBiasLabel, getBiasColor } from "@/data/briefs";
import SectionHeader from "@/components/SectionHeader";
import SignalBadge from "@/components/SignalBadge";
import PerformanceCharts from "@/components/PerformanceCharts";

export default function Performance() {
  const metrics = getPerformanceMetrics();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 rounded-full" style={{ background: "var(--accent)" }} />
          <h1 className="text-xl font-semibold text-white">Performance Attribution</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Directional accuracy, win rate, and regime-based signal consistency
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "WIN RATE", value: `${metrics.winRate}%`, sub: `${metrics.wins}W / ${metrics.losses}L / ${metrics.pushes}P`, color: "var(--bull)" },
          { label: "TOTAL CALLS", value: `${metrics.totalCalls}`, sub: "Completed (excl. open)", color: "#f0f0f0" },
          { label: "AVG RETURN/CALL", value: `$${metrics.avgWtiReturn.toFixed(2)}/bbl`, sub: "Risk-adj directional P&L", color: "var(--accent)" },
          { label: "HIGH CONV. ACC.", value: `${metrics.highConvictionAccuracy}%`, sub: `vs ${metrics.lowConvictionAccuracy}% low conv.`, color: "var(--accent)" },
        ].map(({ label, value, sub, color }) => (
          <div
            key={label}
            className="rounded-lg p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
              {label}
            </div>
            <div className="text-2xl font-mono font-semibold tabular-nums mb-1" style={{ color }}>
              {value}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8">
        <SectionHeader title="Visual Analytics" />
        <PerformanceCharts metrics={metrics} callHistory={callHistory} />
      </div>

      {/* Regime & Direction Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="text-xs font-mono tracking-wider mb-3" style={{ color: "var(--muted)" }}>BULLISH CALLS</div>
          <div className="text-3xl font-mono font-bold tabular-nums mb-1" style={{ color: "var(--bull)" }}>
            {metrics.bullishWinRate}%
          </div>
          <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>{metrics.bullishCalls} calls tracked</div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full" style={{ width: `${metrics.bullishWinRate}%`, background: "var(--bull)" }} />
          </div>
        </div>
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="text-xs font-mono tracking-wider mb-3" style={{ color: "var(--muted)" }}>BEARISH CALLS</div>
          <div className="text-3xl font-mono font-bold tabular-nums mb-1" style={{ color: "var(--bear)" }}>
            {metrics.bearishWinRate}%
          </div>
          <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>{metrics.bearishCalls} calls tracked</div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full" style={{ width: `${metrics.bearishWinRate}%`, background: "var(--bear)" }} />
          </div>
        </div>
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--card)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <div className="text-xs font-mono tracking-wider mb-3" style={{ color: "var(--muted)" }}>DIVERGENT REGIME</div>
          <div className="text-3xl font-mono font-bold tabular-nums mb-1" style={{ color: "#fbbf24" }}>
            {metrics.divergentRegimeWinRate}%
          </div>
          <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>Flagged divergence weeks</div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full" style={{ width: `${metrics.divergentRegimeWinRate}%`, background: "#fbbf24" }} />
          </div>
        </div>
      </div>

      {/* Call Log Detail */}
      <div>
        <SectionHeader title="Detailed Call Log" subtitle="All completed calls" />
        <div
          className="rounded-lg overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["#", "WEEK", "CALL", "OUTCOME", "WTI Δ", "RUNNING WIN RATE", "NOTES"].map((h) => (
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
                const completed = callHistory.slice(i).filter((c) => c.outcome !== "OPEN");
                const wins = completed.filter((c) => c.outcome === "WIN").length;
                const losses = completed.filter((c) => c.outcome === "LOSS").length;
                const runningWinRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : null;

                const isWin = record.outcome === "WIN";
                const isLoss = record.outcome === "LOSS";
                const isOpen = record.outcome === "OPEN";
                const outcomeColor = isWin ? "var(--bull)" : isLoss ? "var(--bear)" : isOpen ? "var(--accent)" : "var(--neutral)";
                const outcomeBg = isWin ? "rgba(34,197,94,0.1)" : isLoss ? "rgba(239,68,68,0.1)" : isOpen ? "rgba(212,146,42,0.1)" : "rgba(148,163,184,0.08)";

                return (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: i < callHistory.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                  >
                    <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                      {callHistory.length - i}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-white">{record.weekEnding}</td>
                    <td className="px-4 py-3">
                      <SignalBadge direction={getBiasColor(record.call)} label={getBiasLabel(record.call)} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: outcomeBg, color: outcomeColor, border: `1px solid ${outcomeColor}33` }}
                      >
                        {record.outcome}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-mono tabular-nums font-medium"
                      style={{ color: isOpen ? "var(--muted)" : record.wtiReturn >= 0 ? "var(--bull)" : "var(--bear)" }}
                    >
                      {isOpen ? "—" : `${record.wtiReturn >= 0 ? "+" : ""}${record.wtiReturn.toFixed(2)}/bbl`}
                    </td>
                    <td className="px-4 py-3">
                      {runningWinRate !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${runningWinRate}%`,
                                background: runningWinRate >= 60 ? "var(--bull)" : runningWinRate >= 40 ? "var(--accent)" : "var(--bear)",
                              }}
                            />
                          </div>
                          <span className="text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                            {runningWinRate}%
                          </span>
                        </div>
                      ) : (
                        <span style={{ color: "var(--muted)" }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted)" }}>{record.notes}</td>
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
