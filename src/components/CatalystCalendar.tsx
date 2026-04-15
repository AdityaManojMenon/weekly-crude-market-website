"use client";

import { CatalystEvent, CatalystType } from "@/data/briefs";

interface Props {
  events: CatalystEvent[];
}

const TYPE_CONFIG: Record<CatalystType, { color: string; bg: string; label: string }> = {
  eia:   { color: "#d97706", bg: "rgba(217,119,6,0.12)",  label: "EIA"   },
  opec:  { color: "#dc2626", bg: "rgba(220,38,38,0.12)",  label: "OPEC"  },
  macro: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", label: "MACRO" },
  geo:   { color: "#dc2626", bg: "rgba(220,38,38,0.15)",  label: "GEO"   },
  fed:   { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", label: "FED"   },
};

export default function CatalystCalendar({ events }: Props) {
  return (
    <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      {/* Timeline track */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="absolute top-5 left-0 right-0 h-px"
          style={{ background: "var(--border)", zIndex: 0 }}
        />

        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${events.length}, 1fr)` }}>
          {events.map((event, i) => {
            const cfg = TYPE_CONFIG[event.type];
            return (
              <div key={i} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
                {/* Node dot */}
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: cfg.bg,
                    border: `2px solid ${cfg.color}`,
                    boxShadow: event.isLive ? `0 0 10px ${cfg.color}66` : "none",
                    position: "relative",
                  }}
                >
                  {event.isLive && (
                    <span
                      className="absolute"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cfg.color,
                        animation: "pulse-dot 1.5s ease-in-out infinite",
                      }}
                    />
                  )}
                  {!event.isLive && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cfg.color,
                        display: "block",
                      }}
                    />
                  )}
                </div>

                {/* Date badge */}
                <span
                  className="text-[10px] font-mono font-bold tracking-wider mb-1.5 px-2 py-0.5 rounded"
                  style={{
                    color: event.isLive ? cfg.color : "var(--text-secondary)",
                    background: event.isLive ? cfg.bg : "transparent",
                    border: event.isLive ? `1px solid ${cfg.color}44` : "none",
                    letterSpacing: "0.08em",
                  }}
                >
                  {event.isLive ? "● LIVE" : event.date}
                </span>

                {/* Type tag */}
                <span
                  className="text-[9px] font-mono font-bold tracking-widest mb-1"
                  style={{ color: cfg.color, letterSpacing: "0.1em" }}
                >
                  {cfg.label}
                </span>

                {/* Event name */}
                <span
                  className="text-xs font-semibold text-center leading-tight mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {event.label}
                </span>

                {/* Detail */}
                <span
                  className="text-[10px] text-center leading-snug"
                  style={{ color: "var(--muted)" }}
                >
                  {event.detail}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 mt-5 pt-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {(Object.entries(TYPE_CONFIG) as [CatalystType, typeof TYPE_CONFIG[CatalystType]][]).map(
          ([key, cfg]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: cfg.color }}
              />
              <span
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                {cfg.label}
              </span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
