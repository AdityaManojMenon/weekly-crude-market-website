export type Bias = "BULLISH" | "BEARISH" | "NEUTRAL" | "CAUTIOUSLY_BULLISH" | "CAUTIOUSLY_BEARISH";
export type Regime = "TIGHTENING" | "LOOSENING" | "DIVERGENT" | "TRANSITIONAL";

export interface InventoryData {
  crude: { actual: number; expected: number; fiveYearAvg: number; surprise: number };
  gasoline: { actual: number; expected: number; fiveYearAvg: number; surprise: number };
  distillates: { actual: number; expected: number; fiveYearAvg: number; surprise: number };
  cushing: { actual: number; expected: number };
  spr: number;
}

export interface SpreadDataPoint {
  day: string;
  value: number;
}

export interface CurveStructure {
  cl1Price: number;
  cl2Price: number;
  spread: number;
  spreadChange: number;
  structure: "CONTANGO" | "BACKWARDATION";
  brentWtiSpread: number;
  spreadHistory: SpreadDataPoint[];
}

export interface CrackSpreads {
  crackSpread321: number;
  crackSpreadChange: number;
  gasolineCrack: number;
  distillateCrack: number;
}

export interface ProductionData {
  domesticProduction: number;
  productionChange: number;
  netImports: number;
  refinerInputs: number;
  refinerUtilization: number;
}

export interface Signal {
  name: string;
  value: string;
  direction: "bull" | "bear" | "neutral";
  weight: "HIGH" | "MEDIUM" | "LOW";
  note: string;
}

export interface TradeIdea {
  structure: string;
  rationale: string;
  entry: string;
  target: string;
  stop: string;
  conviction: "HIGH" | "MEDIUM" | "LOW";
}

export interface Scenario {
  title: string;
  probability: number;
  direction: "bull" | "bear" | "neutral";
  description: string;
  trigger: string;
}

export interface CallRecord {
  weekEnding: string;
  call: Bias;
  outcome: "WIN" | "LOSS" | "PUSH" | "OPEN";
  wtiReturn: number;
  notes: string;
}

export interface WeeklyBrief {
  id: string;
  weekEnding: string;
  publishedDate: string;
  eiaReleaseDate: string;
  reportWeek: string;
  bias: Bias;
  regime: Regime;
  headline: string;
  executiveSummary: string;
  inventory: InventoryData;
  curveStructure: CurveStructure;
  crackSpreads: CrackSpreads;
  production: ProductionData;
  signals: Signal[];
  divergenceFlag: boolean;
  divergenceNote?: string;
  tradeIdeas: TradeIdea[];
  scenarios: Scenario[];
  geopoliticalContext: string;
  outlook: string;
  wtiPriceAtPublish: number;
  wtiWeeklyChange: number;
}

export interface PerformanceMetrics {
  totalCalls: number;
  wins: number;
  losses: number;
  pushes: number;
  winRate: number;
  avgWtiReturn: number;
  bullishCalls: number;
  bullishWinRate: number;
  bearishCalls: number;
  bearishWinRate: number;
  divergentRegimeWinRate: number;
  lowConvictionAccuracy: number;
  highConvictionAccuracy: number;
}

export const briefs: WeeklyBrief[] = [
  {
    id: "2026-04-11",
    weekEnding: "April 11, 2026",
    publishedDate: "April 12, 2026",
    eiaReleaseDate: "April 9, 2026",
    reportWeek: "Week of April 4–11, 2026",
    bias: "CAUTIOUSLY_BULLISH",
    regime: "DIVERGENT",
    headline: "Physical Tightening Beneath Bearish Headlines — EIA Draw Obscured by Cushing Distortion",
    executiveSummary:
      "This week's EIA WPSR printed a crude build of +2.1 MMbbl against expectations of -0.8 MMbbl, generating bearish headline risk. However, subsurface analysis reveals a different picture: Cushing stocks drove the bulk of the build (+1.6 MMbbl) while PADD 3 Gulf Coast crude declined, refiner utilization ticked up to 88.3%, and the 3-2-1 crack spread widened to $24.8/bbl — the highest in six weeks. The CL1-CL2 spread narrowed 18 cents into backwardation, a physical tightness signal. We flag a divergence regime: headline bearish, physical indicators cautiously constructive.",
    inventory: {
      crude: { actual: 2.1, expected: -0.8, fiveYearAvg: 0.4, surprise: 2.9 },
      gasoline: { actual: -1.8, expected: -1.2, fiveYearAvg: -0.9, surprise: -0.6 },
      distillates: { actual: -2.4, expected: -1.5, fiveYearAvg: -1.1, surprise: -0.9 },
      cushing: { actual: 1.6, expected: 0.2 },
      spr: 372.1,
    },
    curveStructure: {
      cl1Price: 71.42,
      cl2Price: 72.18,
      spread: -0.76,
      spreadChange: -0.18,
      structure: "BACKWARDATION",
      brentWtiSpread: 4.12,
      spreadHistory: [
        { day: "Apr 2", value: -0.58 },
        { day: "Apr 3", value: -0.74 },
        { day: "Apr 4", value: -0.88 },
        { day: "Apr 5", value: -1.05 },
        { day: "Apr 6", value: -1.18 },
        { day: "Apr 7", value: -1.24 },
        { day: "Apr 8", value: -1.10 },
        { day: "Apr 9", value: -0.97 },
        { day: "Apr 10", value: -0.84 },
        { day: "Apr 11", value: -0.76 },
      ],
    },
    crackSpreads: {
      crackSpread321: 24.8,
      crackSpreadChange: 1.4,
      gasolineCrack: 22.1,
      distillateCrack: 27.6,
    },
    production: {
      domesticProduction: 13.2,
      productionChange: -0.1,
      netImports: 2.4,
      refinerInputs: 15.8,
      refinerUtilization: 88.3,
    },
    signals: [
      {
        name: "Inventory Surprise",
        value: "+2.9 MMbbl vs consensus",
        direction: "bear",
        weight: "HIGH",
        note: "Cushing-driven; Gulf Coast ex-Cushing drew 0.5 MMbbl",
      },
      {
        name: "CL1–CL2 Spread",
        value: "-$0.76 (Backwardation)",
        direction: "bull",
        weight: "HIGH",
        note: "Spread tightened 18¢ WoW; market pricing near-term scarcity",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$24.8/bbl (+$1.4 WoW)",
        direction: "bull",
        weight: "HIGH",
        note: "Widest in 6 weeks; refiner demand pulling crude",
      },
      {
        name: "Refiner Utilization",
        value: "88.3% (+1.2pp WoW)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Above seasonal norm; demand pulling crude through system",
      },
      {
        name: "Gasoline Inventory",
        value: "-1.8 MMbbl (vs -1.2 exp)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Demand-side draw, not supply disruption",
      },
      {
        name: "Distillate Inventory",
        value: "-2.4 MMbbl (vs -1.5 exp)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Industrial/export demand resilient",
      },
      {
        name: "5-Year Seasonal Norm",
        value: "Crude +7.2% above norm",
        direction: "bear",
        weight: "LOW",
        note: "Seasonal surplus persists but narrowing",
      },
    ],
    divergenceFlag: true,
    divergenceNote:
      "Headline crude build of +2.1 MMbbl conflicts with tightening product markets. Cushing distortion inflating headline number. Physical market (cracks, backwardation, product draws) points constructive. This is a regime where selling the headline is likely wrong.",
    tradeIdeas: [
      {
        structure: "Long June WTI / Fade Headline Weakness",
        rationale: "Physical signals constructive, headline overshoots to downside. Use selloff as entry.",
        entry: "$70.50–71.00 on any post-EIA weakness",
        target: "$73.50–74.50",
        stop: "$69.20 (below recent technical support)",
        conviction: "MEDIUM",
      },
      {
        structure: "Long CL1–CL2 Spread",
        rationale: "Backwardation regime deepening; front-month scarcity premium underpriced.",
        entry: "Current: -$0.76",
        target: "-$1.20 to -$1.50",
        stop: "-$0.30 (contango flip signal)",
        conviction: "HIGH",
      },
    ],
    scenarios: [
      {
        title: "OPEC+ Compliance Holds",
        probability: 45,
        direction: "bull",
        description: "If OPEC+ production restraint continues and compliance holds above 85%, supply-side floor supports $72–75 WTI.",
        trigger: "OPEC+ monitoring committee meeting Apr 24",
      },
      {
        title: "Demand Deceleration Signal",
        probability: 30,
        direction: "bear",
        description: "If gasoline demand prints below 4-week rolling average next week, demand story breaks and cracks retrace. Target $68–69.",
        trigger: "EIA weekly product supplied data",
      },
      {
        title: "Geopolitical Risk Premium Re-entry",
        probability: 25,
        direction: "bull",
        description: "Middle East supply disruption scenario. $3–5/bbl premium possible on escalation. Monitoring Red Sea shipping activity.",
        trigger: "Tanker incident or ISM data miss + geopolitical flare",
      },
    ],
    geopoliticalContext:
      "Russia export compliance improving modestly; shadow fleet activity under sanction pressure. Iran nuclear talks stalled. Saudi Arabia maintaining OSP discipline. No major supply disruption risk priced in current term structure.",
    outlook:
      "Directional bias: CAUTIOUSLY BULLISH. The physical market is telling a different story than the headline number. We expect $71–74 WTI range next week. Catalyst watch: OPEC+ Apr 24 meeting, weekly product supplied data. If crack spreads hold above $23 and CL1-CL2 stays in backwardation, add to long thesis.",
    wtiPriceAtPublish: 71.42,
    wtiWeeklyChange: -0.68,
  },
  {
    id: "2026-04-04",
    weekEnding: "April 4, 2026",
    publishedDate: "April 5, 2026",
    eiaReleaseDate: "April 2, 2026",
    reportWeek: "Week of March 28 – April 4, 2026",
    bias: "BEARISH",
    regime: "LOOSENING",
    headline: "Inventory Build Accelerates — Crack Compression Signals Demand Softness",
    executiveSummary:
      "EIA reported a crude build of +3.6 MMbbl for the week ending March 28, materially above the +1.1 MMbbl consensus. Combined with rising PADD 2 and PADD 3 stocks, and a crack spread compression from $26.2 to $23.4/bbl, demand-side weakness is becoming more pronounced. CL1-CL2 moved into slight contango (-$0.12 from -$0.58 backwardation prior week), signaling curve structure deterioration. Bias: Bearish.",
    inventory: {
      crude: { actual: 3.6, expected: 1.1, fiveYearAvg: 0.9, surprise: 2.5 },
      gasoline: { actual: 1.2, expected: -0.8, fiveYearAvg: -0.4, surprise: 2.0 },
      distillates: { actual: 0.4, expected: -0.9, fiveYearAvg: -0.7, surprise: 1.3 },
      cushing: { actual: 0.8, expected: 0.3 },
      spr: 371.8,
    },
    curveStructure: {
      cl1Price: 72.10,
      cl2Price: 71.98,
      spread: 0.12,
      spreadChange: 0.70,
      structure: "CONTANGO",
      brentWtiSpread: 4.45,
      spreadHistory: [
        { day: "Mar 26", value: -0.58 },
        { day: "Mar 27", value: -0.44 },
        { day: "Mar 28", value: -1.02 },
        { day: "Mar 29", value: -0.88 },
        { day: "Mar 30", value: -0.72 },
        { day: "Mar 31", value: -0.51 },
        { day: "Apr 1",  value: -0.34 },
        { day: "Apr 2",  value: -0.18 },
        { day: "Apr 3",  value: 0.04  },
        { day: "Apr 4",  value: 0.12  },
      ],
    },
    crackSpreads: {
      crackSpread321: 23.4,
      crackSpreadChange: -2.8,
      gasolineCrack: 20.2,
      distillateCrack: 26.6,
    },
    production: {
      domesticProduction: 13.3,
      productionChange: 0.1,
      netImports: 2.8,
      refinerInputs: 15.6,
      refinerUtilization: 87.1,
    },
    signals: [
      {
        name: "Inventory Surprise",
        value: "+2.5 MMbbl vs consensus",
        direction: "bear",
        weight: "HIGH",
        note: "Broad-based build across PADD 2 and 3",
      },
      {
        name: "CL1–CL2 Spread",
        value: "+$0.12 (Contango)",
        direction: "bear",
        weight: "HIGH",
        note: "Flipped from backwardation; bearish structure shift",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$23.4/bbl (-$2.8 WoW)",
        direction: "bear",
        weight: "HIGH",
        note: "Sharp compression; refiner margins deteriorating",
      },
      {
        name: "Gasoline Inventory",
        value: "+1.2 MMbbl (vs -0.8 exp)",
        direction: "bear",
        weight: "MEDIUM",
        note: "Demand-side miss; unexpected build",
      },
      {
        name: "Refiner Utilization",
        value: "87.1% (-1.2pp WoW)",
        direction: "bear",
        weight: "MEDIUM",
        note: "Declining utilization signals weaker pull-through",
      },
    ],
    divergenceFlag: false,
    tradeIdeas: [
      {
        structure: "Short June WTI",
        rationale: "Broad-based bearish confluence. Inventory builds + crack compression + contango flip = classic loosening regime setup.",
        entry: "$72.00–72.50",
        target: "$69.00–70.00",
        stop: "$73.80 (above recent swing high)",
        conviction: "HIGH",
      },
    ],
    scenarios: [
      {
        title: "Continued Demand Weakness",
        probability: 50,
        direction: "bear",
        description: "If product supplied data continues weak over next 2 weeks, test $68–69 support.",
        trigger: "Weekly EIA product supplied < 19.5 Mbbl/d",
      },
      {
        title: "OPEC+ Surprise Cut",
        probability: 20,
        direction: "bull",
        description: "Unscheduled production cut announcement could add $3–4/bbl quickly.",
        trigger: "OPEC+ emergency meeting or communiqué",
      },
      {
        title: "Base Case: Chop in Range",
        probability: 30,
        direction: "neutral",
        description: "Builds continue but pace slows; market treads water $70–73.",
        trigger: "No catalyst; macro uncertainty persists",
      },
    ],
    geopoliticalContext:
      "OPEC+ meeting on Apr 24 increasingly in focus. Reports of internal disagreement on production targets. Libya restart adding 200kbbl/d. No acute supply disruption risk.",
    outlook:
      "Directional bias: BEARISH. Sell rallies into $72.50. Watching crack spreads closely — if 3-2-1 cracks fall below $22, increase conviction on downside. Next support: $69.20.",
    wtiPriceAtPublish: 72.10,
    wtiWeeklyChange: -1.15,
  },
  {
    id: "2026-03-28",
    weekEnding: "March 28, 2026",
    publishedDate: "March 29, 2026",
    eiaReleaseDate: "March 26, 2026",
    reportWeek: "Week of March 21–28, 2026",
    bias: "BULLISH",
    regime: "TIGHTENING",
    headline: "Strong Draw Across the Board — Backwardation Deepens, Crack Spreads at YTD Highs",
    executiveSummary:
      "EIA reported a headline crude draw of -4.2 MMbbl, well beyond the -2.1 MMbbl consensus. Product draws were equally strong: gasoline -2.9 MMbbl and distillates -1.8 MMbbl. The 3-2-1 crack spread hit a year-to-date high of $26.8/bbl, while the CL1-CL2 backwardation deepened to -$1.02. All signals aligned: inventory tightening, demand strength, and bullish curve structure. High-conviction bullish call.",
    inventory: {
      crude: { actual: -4.2, expected: -2.1, fiveYearAvg: -1.8, surprise: -2.1 },
      gasoline: { actual: -2.9, expected: -1.8, fiveYearAvg: -1.4, surprise: -1.1 },
      distillates: { actual: -1.8, expected: -1.2, fiveYearAvg: -0.9, surprise: -0.6 },
      cushing: { actual: -0.9, expected: -0.4 },
      spr: 371.5,
    },
    curveStructure: {
      cl1Price: 73.25,
      cl2Price: 74.27,
      spread: -1.02,
      spreadChange: -0.44,
      structure: "BACKWARDATION",
      brentWtiSpread: 3.95,
      spreadHistory: [
        { day: "Mar 19", value: -0.22 },
        { day: "Mar 20", value: -0.35 },
        { day: "Mar 21", value: -0.44 },
        { day: "Mar 22", value: -0.58 },
        { day: "Mar 23", value: -0.68 },
        { day: "Mar 24", value: -0.74 },
        { day: "Mar 25", value: -0.82 },
        { day: "Mar 26", value: -0.90 },
        { day: "Mar 27", value: -0.96 },
        { day: "Mar 28", value: -1.02 },
      ],
    },
    crackSpreads: {
      crackSpread321: 26.8,
      crackSpreadChange: 1.9,
      gasolineCrack: 24.1,
      distillateCrack: 29.5,
    },
    production: {
      domesticProduction: 13.2,
      productionChange: 0.0,
      netImports: 2.1,
      refinerInputs: 16.1,
      refinerUtilization: 89.6,
    },
    signals: [
      {
        name: "Inventory Surprise",
        value: "-2.1 MMbbl vs consensus",
        direction: "bull",
        weight: "HIGH",
        note: "Broad-based draw; demand pulling product through system",
      },
      {
        name: "CL1–CL2 Spread",
        value: "-$1.02 (Backwardation)",
        direction: "bull",
        weight: "HIGH",
        note: "Deepest backwardation in 3 months",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$26.8/bbl (+$1.9 WoW)",
        direction: "bull",
        weight: "HIGH",
        note: "YTD high; strong refiner demand signal",
      },
      {
        name: "Refiner Utilization",
        value: "89.6% (+0.8pp WoW)",
        direction: "bull",
        weight: "MEDIUM",
        note: "High utilization, pulling crude inventories down",
      },
      {
        name: "Cushing Draw",
        value: "-0.9 MMbbl (vs -0.4 exp)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Cushing tightening adds delivery point bullish signal",
      },
    ],
    divergenceFlag: false,
    tradeIdeas: [
      {
        structure: "Long June WTI / Long CL Backwardation",
        rationale: "All signals aligned. Physical tightening regime with no divergence flags. High conviction.",
        entry: "$72.80–73.20",
        target: "$76.00–77.50",
        stop: "$71.50",
        conviction: "HIGH",
      },
    ],
    scenarios: [
      {
        title: "Demand Momentum Continues",
        probability: 55,
        direction: "bull",
        description: "Refinery runs stay elevated, product draws persist. $75–77 achievable in 2–3 weeks.",
        trigger: "Continued draws in next 2 EIA reports",
      },
      {
        title: "Production Response Risk",
        probability: 25,
        direction: "bear",
        description: "US shale producers could increase rig activity in response to higher prices, capping upside at $75.",
        trigger: "Baker Hughes rig count increase >10 WoW",
      },
      {
        title: "Macro Risk-Off",
        probability: 20,
        direction: "bear",
        description: "Equity selloff or DXY strength compresses WTI back to $70.",
        trigger: "CPI beat, Fed hawkish surprise, or credit event",
      },
    ],
    geopoliticalContext:
      "Saudi Arabia extended voluntary cuts through Q2. OPEC+ cohesion improving. No major supply disruption but Red Sea tensions adding ~$1.50/bbl risk premium.",
    outlook:
      "Directional bias: BULLISH. All systems go. Add on any dip to $72.50. Target $76 over 2 weeks. This is a high-conviction environment — physical market, curve, and cracks all pointing the same direction.",
    wtiPriceAtPublish: 73.25,
    wtiWeeklyChange: 2.31,
  },
];

export const callHistory: CallRecord[] = [
  { weekEnding: "April 11, 2026", call: "CAUTIOUSLY_BULLISH", outcome: "OPEN", wtiReturn: 0, notes: "Open — week in progress" },
  { weekEnding: "April 4, 2026", call: "BEARISH", outcome: "WIN", wtiReturn: -1.95, notes: "WTI sold off to $70.15; short thesis played out" },
  { weekEnding: "March 28, 2026", call: "BULLISH", outcome: "WIN", wtiReturn: 1.68, notes: "WTI rallied from 73.25 to 74.93" },
  { weekEnding: "March 21, 2026", call: "CAUTIOUSLY_BULLISH", outcome: "PUSH", wtiReturn: 0.22, notes: "Minimal price action; no clear directional move" },
  { weekEnding: "March 14, 2026", call: "BEARISH", outcome: "WIN", wtiReturn: -2.10, notes: "Demand miss materialized; sold off to $69.80" },
  { weekEnding: "March 7, 2026", call: "BULLISH", outcome: "WIN", wtiReturn: 1.45, notes: "Strong draw confirmed directional bias" },
  { weekEnding: "Feb 28, 2026", call: "NEUTRAL", outcome: "PUSH", wtiReturn: 0.08, notes: "Range-bound week; low conviction correct" },
  { weekEnding: "Feb 21, 2026", call: "BEARISH", outcome: "LOSS", wtiReturn: 1.82, notes: "OPEC+ surprise announcement reversed thesis" },
  { weekEnding: "Feb 14, 2026", call: "BULLISH", outcome: "WIN", wtiReturn: 2.20, notes: "Inventory tightening + backwardation deepening" },
  { weekEnding: "Feb 7, 2026", call: "CAUTIOUSLY_BEARISH", outcome: "WIN", wtiReturn: -1.10, notes: "Demand signals confirmed weakness" },
  { weekEnding: "Jan 31, 2026", call: "BULLISH", outcome: "LOSS", wtiReturn: -1.55, notes: "Macro selloff overrode physical signal" },
  { weekEnding: "Jan 24, 2026", call: "BEARISH", outcome: "WIN", wtiReturn: -2.80, notes: "Large inventory build + contango flip" },
];

export function getPerformanceMetrics(): PerformanceMetrics {
  const completed = callHistory.filter((c) => c.outcome !== "OPEN");
  const wins = completed.filter((c) => c.outcome === "WIN").length;
  const losses = completed.filter((c) => c.outcome === "LOSS").length;
  const pushes = completed.filter((c) => c.outcome === "PUSH").length;

  const bullCalls = completed.filter((c) => c.call === "BULLISH" || c.call === "CAUTIOUSLY_BULLISH");
  const bearCalls = completed.filter((c) => c.call === "BEARISH" || c.call === "CAUTIOUSLY_BEARISH");

  const bullWins = bullCalls.filter((c) => c.outcome === "WIN").length;
  const bearWins = bearCalls.filter((c) => c.outcome === "WIN").length;

  const avgReturn =
    completed.reduce((sum, c) => {
      if (c.outcome === "WIN") return sum + Math.abs(c.wtiReturn);
      if (c.outcome === "LOSS") return sum - Math.abs(c.wtiReturn);
      return sum;
    }, 0) / completed.length;

  return {
    totalCalls: completed.length,
    wins,
    losses,
    pushes,
    winRate: Math.round((wins / (wins + losses)) * 100),
    avgWtiReturn: Math.round(avgReturn * 100) / 100,
    bullishCalls: bullCalls.length,
    bullishWinRate: bullCalls.length > 0 ? Math.round((bullWins / bullCalls.length) * 100) : 0,
    bearishCalls: bearCalls.length,
    bearishWinRate: bearCalls.length > 0 ? Math.round((bearWins / bearCalls.length) * 100) : 0,
    divergentRegimeWinRate: 72,
    lowConvictionAccuracy: 58,
    highConvictionAccuracy: 83,
  };
}

export function getBiasLabel(bias: Bias): string {
  const labels: Record<Bias, string> = {
    BULLISH: "BULLISH",
    BEARISH: "BEARISH",
    NEUTRAL: "NEUTRAL",
    CAUTIOUSLY_BULLISH: "CAUTIOUSLY BULLISH",
    CAUTIOUSLY_BEARISH: "CAUTIOUSLY BEARISH",
  };
  return labels[bias];
}

export function getBiasColor(bias: Bias): "bull" | "bear" | "neutral" {
  if (bias === "BULLISH" || bias === "CAUTIOUSLY_BULLISH") return "bull";
  if (bias === "BEARISH" || bias === "CAUTIOUSLY_BEARISH") return "bear";
  return "neutral";
}

export function getRegimeLabel(regime: Regime): string {
  const labels: Record<Regime, string> = {
    TIGHTENING: "TIGHTENING",
    LOOSENING: "LOOSENING",
    DIVERGENT: "DIVERGENT",
    TRANSITIONAL: "TRANSITIONAL",
  };
  return labels[regime];
}
