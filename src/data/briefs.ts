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

export type CatalystType = "eia" | "opec" | "macro" | "geo" | "fed";

export interface CatalystEvent {
  date: string;
  label: string;
  detail: string;
  type: CatalystType;
  isLive?: boolean;
}

export interface CrossAssetSignal {
  label: string;
  value: string;
  direction: "bull" | "bear" | "neutral";
  readthrough: string;
}

export interface PositioningRead {
  momentum: "BULLISH" | "BEARISH" | "NEUTRAL" | "MIXED";
  fundamentals: "BULLISH" | "BEARISH" | "NEUTRAL" | "MIXED";
  volatility: "HIGH" | "MEDIUM" | "LOW";
  riskReward: "FAVORABLE" | "UNFAVORABLE" | "MIXED";
  interpretation: string;
}

export interface RiskDashboard {
  upsideRisks: string[];
  downsideRisks: string[];
  // 1 = full bullish, 5 = full bearish
  riskScore: 1 | 2 | 3 | 4 | 5;
  riskLabel: string;
  volatility: "HIGH" | "MEDIUM" | "LOW";
  conviction: "HIGH" | "MEDIUM" | "LOW";
  dominantDriver: string;
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
  biasNote?: string;
  crossAsset: CrossAssetSignal[];
  crossAssetNote: string;
  positioning: PositioningRead;
  tradeIdeas: TradeIdea[];
  keyLevels: { price: string; label: string; type: "resistance" | "support" | "pivot" }[];
  scenarios: Scenario[];
  catalysts: CatalystEvent[];
  riskDashboard: RiskDashboard;
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
    id: "2026-04-16",
    weekEnding: "April 16, 2026",
    publishedDate: "April 16, 2026",
    eiaReleaseDate: "April 16, 2026",
    reportWeek: "Week of April 9–16, 2026",
    bias: "BEARISH",
    biasNote: "Event-Driven",
    regime: "TRANSITIONAL",
    headline: "WTI Craters 8% as Ceasefire Holds — Strong Product Draws Can't Offset Risk Premium Collapse",
    executiveSummary:
      "WTI fell nearly 8% this week as the market continued to unwind the geopolitical risk premium that previously drove prices above $95. Product markets remain firm — gasoline drew 6.33 MMbbl, distillates fell 3.12 MMbbl, and crack spreads remain elevated at $50.16 — but physical strength is being overshadowed by event-driven repricing. Until the CL1–CL2 spread stabilizes, price action remains macro-led rather than fundamentally led.",
    inventory: {
      crude:      { actual: -0.91, expected: -1.61, fiveYearAvg: -0.80, surprise: 0.70 },
      gasoline:   { actual: -6.33, expected: -1.47, fiveYearAvg: -1.20, surprise: -4.86 },
      distillates:{ actual: -3.12, expected: -1.97, fiveYearAvg: -1.10, surprise: -1.15 },
      cushing:    { actual: -1.73, expected: -0.82 },
      spr: 373.1,
    },
    curveStructure: {
      cl1Price: 89.92,
      cl2Price: 86.49,
      spread: 3.43,
      spreadChange: -4.51,
      structure: "BACKWARDATION",
      brentWtiSpread: 8.37,
      spreadHistory: [
        { day: "Apr 5",  value: 8.50 },
        { day: "Apr 6",  value: 8.10 },
        { day: "Apr 7",  value: 7.94 },
        { day: "Apr 8",  value: 6.50 },
        { day: "Apr 9",  value: 5.20 },
        { day: "Apr 10", value: 4.50 },
        { day: "Apr 11", value: 3.80 },
        { day: "Apr 14", value: 3.16 },
        { day: "Apr 15", value: 3.20 },
        { day: "Apr 16", value: 3.43 },
      ],
    },
    crackSpreads: {
      crackSpread321: 50.16,
      crackSpreadChange: 8.89,
      gasolineCrack: 52.1,
      distillateCrack: 55.8,
    },
    production: {
      domesticProduction: 13.6,
      productionChange: 0.0,
      netImports: 2.4,
      refinerInputs: 15.9,
      refinerUtilization: 89.6,
    },
    signals: [
      {
        name: "Crude Inventory Surprise",
        value: "+0.70 MMbbl vs consensus",
        direction: "neutral",
        weight: "MEDIUM",
        note: "Crude came in above expectations but near seasonal avg — not a directional signal",
      },
      {
        name: "CL1–CL2 Spread",
        value: "+$3.43 (WoW -$4.51)",
        direction: "bear",
        weight: "HIGH",
        note: "Spread collapsed 58% WoW from $7.94 — geopolitical risk premium rapidly unwinding",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$50.16/bbl (WoW +$8.89)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Cracks surged WoW — strong downstream demand signal, refining margins elevated",
      },
      {
        name: "Gasoline Draw",
        value: "-6.33 MMbbl vs -1.47 expected",
        direction: "bull",
        weight: "HIGH",
        note: "Massive bullish product surprise — strongest gasoline draw in months",
      },
      {
        name: "Refinery Utilization",
        value: "89.6% (-2.4% WoW)",
        direction: "neutral",
        weight: "LOW",
        note: "Utilization pulling back — seasonal maintenance or demand response",
      },
    ],
    divergenceFlag: true,
    divergenceNote:
      "Classic divergence: products printing bullish (gasoline -6.33 MMbbl, distillates -3.12 MMbbl) while price craters 8%. The spread collapse from $7.94 → $3.30 is purely geopolitical — ceasefire removing the Hormuz risk premium that had inflated prompt prices. Physical demand did not cause this move. Geopolitics did. Until a new catalyst emerges, price leads fundamentals.",
    crossAsset: [
      { label: "DXY",           value: "-0.57%", direction: "bull",    readthrough: "Dollar weakness — tailwind for commodities" },
      { label: "S&P 500",       value: "+3.17%", direction: "bull",    readthrough: "Risk-on — yet crude diverging lower" },
      { label: "Brent Premium", value: "+$8.37", direction: "bear",    readthrough: "Widening spread — crude-specific selling pressure" },
      { label: "Nat Gas",       value: "-0.26%", direction: "neutral", readthrough: "Flat — no correlated energy signal" },
    ],
    crossAssetNote: "WTI is lagging supportive macro signals such as dollar weakness and stronger equities. The divergence suggests crude-specific repricing as geopolitical premium fades.",
    positioning: {
      momentum:      "BEARISH",
      fundamentals:  "MIXED",
      volatility:    "HIGH",
      riskReward:    "UNFAVORABLE",
      interpretation: "Negative momentum and elevated volatility lower conviction, while mixed fundamentals argue against aggressive shorts. Favor tactical positioning until signals align.",
    },
    tradeIdeas: [
      {
        structure: "Fade Prompt Rallies / Short on Strength",
        conviction: "LOW",
        rationale: "Spread compression confirms risk premium unwind. Rallies into prior support are sell opportunities unless a new geopolitical catalyst emerges or spread re-widens above $5.",
        entry: "$92.00–94.00",
        target: "$86.00–88.00",
        stop: "$96.00",
      },
      {
        structure: "Short CL1–CL2 Spread on Bounce",
        conviction: "MEDIUM",
        rationale: "Spread at $3.30 — still positive backwardation but trend is lower. A bounce to $4.00–4.50 without new geopolitical catalyst is a spread-short entry. Target compression toward contango.",
        entry: "$4.00–4.50",
        target: "$1.50–2.00",
        stop: "$5.50",
      },
    ],
    keyLevels: [
      { price: "$96.00", label: "Stop Level", type: "resistance" },
      { price: "$92.00–94.00", label: "Sell Rally Zone", type: "resistance" },
      { price: "$88.00–90.00", label: "Near-Term Target", type: "support" },
      { price: "$84.00–86.00", label: "Bear Scenario Target", type: "support" },
    ],
    scenarios: [
      {
        title: "Geopolitical Re-escalation",
        probability: 25,
        direction: "bull",
        description: "Ceasefire breaks down or new supply disruption emerges. Risk premium re-enters and spread re-widens rapidly. WTI recovers toward prior range. Target: WTI $96–100.",
        trigger: "Ceasefire collapse · Hormuz incident · OPEC+ emergency cut",
      },
      {
        title: "Continued De-risking",
        probability: 45,
        direction: "bear",
        description: "Ceasefire holds, spread compresses toward contango, macro headwinds accelerate price normalization. Fundamentals can't offset sentiment. Target: WTI $82–86.",
        trigger: "Spread below +$2.00 · Crack spreads fall below $38 · Calm geopolitical backdrop",
      },
      {
        title: "Range-Bound Transition",
        probability: 30,
        direction: "neutral",
        description: "Market consolidates between physical support (strong product draws) and geopolitical ceiling removal. Volatility high, direction unclear. Target: WTI $87–93.",
        trigger: "Spread holds $2.50–4.00 · Mixed EIA prints · No new catalyst",
      },
    ],
    catalysts: [
      { date: "Apr 23", label: "EIA WPSR", detail: "Next weekly inventory — will product draws confirm or fade?", type: "eia" },
      { date: "Apr 24", label: "OPEC+ Meeting", detail: "Production policy — any surprise cut could reverse price direction", type: "opec" },
      { date: "May 2",  label: "Non-Farm Payrolls", detail: "Macro demand proxy — key for demand outlook", type: "macro" },
      { date: "Live",   label: "Ceasefire Durability", detail: "Any breakdown re-injects geopolitical risk premium", type: "geo", isLive: true },
      { date: "May 7",  label: "Fed Meeting", detail: "Rate decision and DXY impact on crude", type: "fed" },
    ],
    riskDashboard: {
      upsideRisks: [
        "Ceasefire breakdown / Hormuz escalation",
        "OPEC+ unscheduled production cut",
        "Next EIA confirms strong product draws again",
        "Dollar weakens sharply (DXY < 97)",
      ],
      downsideRisks: [
        "Ceasefire fully normalized — risk premium to zero",
        "Spread compresses into contango",
        "Crack spreads fade below $38/bbl",
        "Macro slowdown accelerates demand destruction",
      ],
      riskScore: 4,
      riskLabel: "Bearish",
      volatility: "HIGH",
      conviction: "LOW",
      dominantDriver: "Geopolitics",
    },
    geopoliticalContext:
      "The ceasefire that triggered last week's initial selloff is holding, continuing to drain the Hormuz risk premium that had supported WTI above $95. OPEC+'s April 24 meeting is the next key catalyst — any signal of stronger supply discipline or an unexpected cut could reverse the current de-risking trend. Absent a new disruption, the geopolitical tailwind has shifted into a headwind.",
    outlook:
      "Directional bias: Tactically Bearish, Structurally Mixed. Physical demand remains resilient, but near-term price direction is still controlled by geopolitical de-risking and spread compression. Fade rallies while CL1–CL2 remains below recent highs. A hold above $3 with another strong product report would be the first signal that downside momentum is fading.",
    wtiPriceAtPublish: 89.92,
    wtiWeeklyChange: -7.95,
  },
  {
    id: "2026-04-09",
    weekEnding: "April 9, 2026",
    publishedDate: "April 9, 2026",
    eiaReleaseDate: "April 9, 2026",
    reportWeek: "Week of April 2–9, 2026",
    bias: "CAUTIOUSLY_BULLISH",
    regime: "DIVERGENT",
    headline: "Transition Regime: Tight Fundamentals vs Fading Risk Premium",
    executiveSummary:
      "A mid-week ceasefire announcement triggered a sharp unwind in crude’s geopolitical risk premium, pressuring front-month prices and amplifying the bearish impact of a +6.93 MMbbl crude build versus -0.80 MMbbl expected. However, the physical market remains more resilient than the headline suggests: refinery utilization is still strong at 92.9%, gasoline inventories drew -2.59 MMbbl, and crack spreads remain elevated near $41.27/bbl. Meanwhile, the CL1–CL2 spread compressed from the $14.72 peak to $7.94, signaling easing stress but continued near-term tightness. Bottom line: sentiment weakened faster than fundamentals.",
    inventory: {
      crude: { actual: 6.93, expected: -0.8, fiveYearAvg: 0.6, surprise: 7.73 },
      gasoline: { actual: -2.59, expected: -1.2, fiveYearAvg: -0.8, surprise: -1.39 },
      distillates: { actual: 3.03, expected: -1.5, fiveYearAvg: -0.9, surprise: 4.53 },
      cushing: { actual: 3.42, expected: 0.2 },
      spr: 372.4,
    },
    curveStructure: {
      cl1Price: 61.99,
      cl2Price: 54.05,
      spread: 7.94,
      spreadChange: -1.51,
      structure: "BACKWARDATION",
      brentWtiSpread: 3.85,
      spreadHistory: [
        { day: "Mar 31", value: 5.62 },
        { day: "Apr 1",  value: 7.18 },
        { day: "Apr 2",  value: 9.45 },
        { day: "Apr 3",  value: 11.20 },
        { day: "Apr 4",  value: 10.55 },
        { day: "Apr 5",  value: 12.30 },
        { day: "Apr 6",  value: 13.88 },
        { day: "Apr 7",  value: 14.72 },
        { day: "Apr 8",  value: 11.10 },
        { day: "Apr 9",  value: 7.94  },
      ],
    },
    crackSpreads: {
      crackSpread321: 41.27,
      crackSpreadChange: 2.88,
      gasolineCrack: 48.2,
      distillateCrack: 57.4,
    },
    production: {
      domesticProduction: 13.6,
      productionChange: 0.1,
      netImports: 2.6,
      refinerInputs: 16.4,
      refinerUtilization: 92.9,
    },
    signals: [
      {
        name: "Crude Inventory Surprise",
        value: "+7.73 MMbbl vs consensus",
        direction: "bear",
        weight: "HIGH",
        note: "Large bearish headline miss — storage artifact, not demand signal",
      },
      {
        name: "CL1–CL2 Spread",
        value: "+$7.94 (Strong Backwardation)",
        direction: "bull",
        weight: "HIGH",
        note: "Peaked at $14.72 (Apr 7 supply crunch), now compressing — down 46% from peak in 2 days",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$41.27/bbl (+$2.88 WoW)",
        direction: "bull",
        weight: "HIGH",
        note: "Historically elevated; refiners running hard — physical crude demand is real",
      },
      {
        name: "Refiner Utilization",
        value: "92.9%",
        direction: "bull",
        weight: "HIGH",
        note: "Very strong; high utilization confirms demand is pulling crude through system",
      },
      {
        name: "Gasoline Inventory",
        value: "-2.59 MMbbl (vs -1.2 exp)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Demand-driven draw; 1.39 MMbbl stronger than expected",
      },
      {
        name: "Distillate Inventory",
        value: "+3.03 MMbbl (vs -1.5 exp)",
        direction: "bear",
        weight: "MEDIUM",
        note: "Unexpected build; industrial/export demand softer than expected",
      },
      {
        name: "Cushing Stocks",
        value: "+3.42 MMbbl (vs +0.2 exp)",
        direction: "bear",
        weight: "MEDIUM",
        note: "Large Cushing build driving headline crude number — delivery point artifact",
      },
    ],
    divergenceFlag: true,
    divergenceNote:
      "The ceasefire-driven selloff and a +7.73 MMbbl inventory surprise handed bears a clean narrative — but the physical market isn't cooperating. Refiners are at 92.9% utilization. Gasoline drew -2.59 MMbbl. Crack spreads are $41.27/bbl. The CL1-CL2 spread peaked at $14.72 two days ago and is compressing to $7.94 — still deeply in backwardation, still pricing scarcity. Geopolitical risk premium unwound. Physical demand did not. Selling the headline here means confusing sentiment with fundamentals. Structure overrides inventory until the cracks say otherwise.",
    crossAsset: [
      { label: "DXY",           value: "-0.83%", direction: "bull",    readthrough: "Dollar softening — mild commodity tailwind" },
      { label: "S&P 500",       value: "-5.81%", direction: "bear",    readthrough: "Risk-off — macro pressure amplifying crude selloff" },
      { label: "Brent Premium", value: "+$3.85", direction: "neutral", readthrough: "Normal spread — no major supply dislocations" },
      { label: "Nat Gas",       value: "+1.05%", direction: "neutral", readthrough: "Slight uptick — no energy complex correlation" },
    ],
    crossAssetNote: "Broad risk-off macro backdrop amplified the bearish headline print. Crude weakness was multi-factor: large inventory build, equities selling off, and geopolitical premium unwinding simultaneously.",
    positioning: {
      momentum:      "BEARISH",
      fundamentals:  "MIXED",
      volatility:    "HIGH",
      riskReward:    "UNFAVORABLE",
      interpretation: "Broad risk-off environment compounds bearish headline inventory data. Physical signals diverge from price — regime: geopolitics + macro overriding fundamental tightness.",
    },
    tradeIdeas: [
      {
        structure: "Fade Prompt Tightness / Short Strength Rallies",
        rationale: "Curve remains backwardated, but the rapid collapse from ~$14 to ~$8 suggests prior scarcity pricing is being unwound. Strong structure remains, but momentum has shifted lower. Geopolitics — not fundamentals — are setting price direction right now.",
        entry: "$98.50–100.50",
        target: "$94.00–96.00",
        stop: "$102.00",
        conviction: "LOW",
      },
      {
        structure: "Long CL1–CL2 Spread on Stabilization Only",
        rationale: "Backwardation remains elevated (+$7.94) but has compressed sharply from the $14.72 peak. Do not chase current levels. Wait for stabilization and confirmation before re-entering curve tightness.",
        entry: "+$7.50–$8.00",
        target: "$9.00–$10.00",
        stop: "+$6.00",
        conviction: "MEDIUM",
      },
    ],
    keyLevels: [
      { price: "$102.00", label: "Stop Level", type: "resistance" },
      { price: "$98.50–100.50", label: "Sell Rally Zone", type: "resistance" },
      { price: "$94.00–96.00", label: "Target / Bull Support", type: "support" },
      { price: "$58.00", label: "Scenario Bear Target", type: "support" },
    ],
    scenarios: [
      {
        title: "Tightness Reasserts / Risk Returns",
        probability: 30,
        direction: "bull",
        description: "If geopolitical risk returns or next EIA confirms strong product demand with a crude draw, backwardation can re-expand and crude recover sharply. Target: WTI $103–106.",
        trigger: "Spread back above +$9 · Renewed geopolitical tensions · Crude draw + gasoline draw next report",
      },
      {
        title: "Rapid Normalization Continues",
        probability: 35,
        direction: "bear",
        description: "If the ceasefire holds and spread compresses further, the market continues repricing from crisis premium toward normal backwardation. The headline build narrative takes hold. Target: WTI $91–93.",
        trigger: "Spread below +$6 · Crack spreads fall below $38 · Calm geopolitical backdrop",
      },
      {
        title: "Transition / Range Trade",
        probability: 35,
        direction: "neutral",
        description: "Market remains caught between still-tight physicals and falling risk premium. Volatility stays high but directional conviction is low. Low edge environment. Target: WTI $94–98.",
        trigger: "Spread holds +$6 to +$8 · Mixed EIA prints · No new geopolitical catalyst",
      },
    ],
    geopoliticalContext:
      "The dominant catalyst this week was Middle East de-escalation, which reduced fears of a Strait of Hormuz disruption and triggered a sharp unwind in crude’s geopolitical risk premium. That repricing compressed the prompt spread and pressured front-month WTI despite still-supportive physical indicators. Attention now shifts to OPEC+’s April 24 meeting, where any signal of renewed supply discipline could help re-establish a downside floor near the mid-$60s.",
    outlook:
      "Directional bias: CAUTIOUSLY BEARISH. The physical market remains supportive, but price is currently being driven by the unwind of geopolitical risk premium rather than outright supply-demand tightening. Backwardation near +$7.94 and firm crack spreads around $41 suggest conditions are still constructive beneath the surface, yet the sharp compression from crisis highs signals momentum has turned lower. Patience and tactical positioning is key in this transition regime.",
    catalysts: [
      { date: "Apr 16", label: "EIA WPSR", detail: "Weekly crude & product inventory release", type: "eia" },
      { date: "Apr 24", label: "OPEC+ Meeting", detail: "Production policy decision — key for supply outlook", type: "opec" },
      { date: "May 2", label: "Non-Farm Payrolls", detail: "Demand proxy — strong print supportive for crude", type: "macro" },
      { date: "Live", label: "Middle East Headlines", detail: "Ceasefire durability & Hormuz risk premium", type: "geo", isLive: true },
      { date: "May 7", label: "Fed Meeting", detail: "Rate decision — DXY sensitivity & demand outlook", type: "fed" },
    ],
    riskDashboard: {
      upsideRisks: [
        "Hormuz disruption / shipping lane closure",
        "Surprise crude draw next EIA print",
        "OPEC+ unscheduled production cut",
        "Strong gasoline demand continuation",
      ],
      downsideRisks: [
        "Ceasefire holds, risk premium fully unwinds",
        "CL1–CL2 spread breaks below +$6.00",
        "Crack spreads weaken below $38/bbl",
        "Macro slowdown signals emerge",
      ],
      riskScore: 4,
      riskLabel: "Balanced → Bearish",
      volatility: "HIGH",
      conviction: "LOW",
      dominantDriver: "Geopolitics",
    },
    wtiPriceAtPublish: 97.87,
    wtiWeeklyChange: -2.25,
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
    crossAsset: [
      { label: "DXY",           value: "-0.38%", direction: "bull",    readthrough: "Slight dollar weakness — modest commodity support" },
      { label: "S&P 500",       value: "+0.35%", direction: "neutral", readthrough: "Flat equities — no macro directional signal" },
      { label: "Brent Premium", value: "+$3.44", direction: "neutral", readthrough: "Normal spread — no acute supply dislocations" },
      { label: "Nat Gas",       value: "+1.42%", direction: "neutral", readthrough: "Slight uptick — no correlated energy signal" },
    ],
    crossAssetNote: "Macro backdrop was effectively neutral this week. Crude selloff was fundamentally driven — inventory builds, crack compression, and contango all pointing the same direction without a macro catalyst needed.",
    positioning: {
      momentum:      "BEARISH",
      fundamentals:  "BEARISH",
      volatility:    "MEDIUM",
      riskReward:    "UNFAVORABLE",
      interpretation: "High-conviction bearish regime — inventory builds, crack compression, and contango all aligned. Macro backdrop neutral; crude weakness fundamentally driven.",
    },
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
    keyLevels: [
      { price: "$75.00", label: "Resistance / Near Target", type: "resistance" },
      { price: "$70.00", label: "Support / Add Level", type: "support" },
      { price: "$68.00–69.00", label: "Key Support Zone", type: "support" },
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
    catalysts: [
      { date: "Apr 9", label: "EIA WPSR", detail: "Crude build +2.7 MMbbl — confirmed bearish trajectory", type: "eia" },
      { date: "Apr 14", label: "OPEC Monthly Report", detail: "Demand & supply revisions", type: "opec" },
      { date: "Apr 17", label: "EIA WPSR", detail: "Next weekly inventory data point", type: "eia" },
      { date: "Live", label: "OPEC+ Compliance", detail: "Adherence to quota vs. cheating signals", type: "opec", isLive: true },
      { date: "May 2", label: "Non-Farm Payrolls", detail: "Macro demand signal", type: "macro" },
    ],
    riskDashboard: {
      upsideRisks: [
        "OPEC+ surprise cut announcement",
        "Gasoline demand rebound",
        "Refinery outage tightening supply",
      ],
      downsideRisks: [
        "Broad-based inventory builds continue",
        "Contango deepens further",
        "Macro risk-off / DXY strength",
        "Demand destruction signals",
      ],
      riskScore: 4,
      riskLabel: "Bearish",
      volatility: "MEDIUM",
      conviction: "HIGH",
      dominantDriver: "Inventory / Demand",
    },
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
    crossAsset: [
      { label: "DXY",           value: "-0.33%", direction: "bull",    readthrough: "Dollar easing — supportive for crude" },
      { label: "S&P 500",       value: "+0.85%", direction: "bull",    readthrough: "Risk-on — commodities benefit from broad strength" },
      { label: "Brent Premium", value: "+$3.20", direction: "neutral", readthrough: "Stable spread — no supply dislocation" },
      { label: "Nat Gas",       value: "+0.60%", direction: "neutral", readthrough: "Slight uptick — no divergence signal" },
    ],
    crossAssetNote: "Cross-asset backdrop was constructive and aligned with crude's bullish physical signals. Dollar weakness and risk-on equities reinforced rather than diverged from the fundamental thesis.",
    positioning: {
      momentum:      "BULLISH",
      fundamentals:  "BULLISH",
      volatility:    "LOW",
      riskReward:    "FAVORABLE",
      interpretation: "All systems aligned — physical tightening, curve structure bullish, macro supportive. High-conviction environment with clean risk/reward.",
    },
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
    keyLevels: [
      { price: "$77.00", label: "Bull Scenario Target", type: "resistance" },
      { price: "$75.00", label: "Breakout / Add Level", type: "resistance" },
      { price: "$72.00", label: "Stop Level", type: "support" },
      { price: "$70.00", label: "Bear Scenario Target", type: "support" },
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
    catalysts: [
      { date: "Mar 26", label: "EIA WPSR", detail: "Confirmed strong gasoline draw — bullish signal", type: "eia" },
      { date: "Apr 2", label: "OPEC+ Output Review", detail: "Compliance check — above 85%", type: "opec" },
      { date: "Apr 4", label: "Non-Farm Payrolls", detail: "Strong print — demand momentum intact", type: "macro" },
      { date: "Live", label: "Red Sea Situation", detail: "Shipping disruptions keeping risk premium elevated", type: "geo", isLive: true },
    ],
    riskDashboard: {
      upsideRisks: [
        "Demand momentum sustains draws",
        "OPEC+ compliance holds above 85%",
        "Red Sea shipping tensions escalate",
        "US shale discipline maintains",
      ],
      downsideRisks: [
        "Production response to higher prices",
        "Macro risk-off / equity selloff",
        "Backwardation compression if draws pause",
      ],
      riskScore: 2,
      riskLabel: "Bullish",
      volatility: "LOW",
      conviction: "HIGH",
      dominantDriver: "Physical Demand",
    },
    wtiPriceAtPublish: 73.25,
    wtiWeeklyChange: 2.31,
  },
];

export const callHistory: CallRecord[] = [
  { weekEnding: "April 16, 2026", call: "BEARISH",            outcome: "OPEN", wtiReturn: 0,     notes: "Open — week in progress" },
  { weekEnding: "April 9, 2026",  call: "CAUTIOUSLY_BULLISH", outcome: "LOSS", wtiReturn: -7.77, notes: "Ceasefire-driven selloff overwhelmed physical tightness thesis" },
  { weekEnding: "April 4, 2026",  call: "BEARISH",            outcome: "WIN",  wtiReturn: -1.95, notes: "WTI sold off to $70.15; short thesis played out" },
  { weekEnding: "March 28, 2026", call: "BULLISH",            outcome: "WIN",  wtiReturn: 1.68,   notes: "WTI rallied from 73.25 to 74.93" },
  { weekEnding: "March 21, 2026", call: "CAUTIOUSLY_BULLISH", outcome: "PUSH", wtiReturn: 0.22,   notes: "Minimal price action; no clear directional move" },
  { weekEnding: "March 14, 2026", call: "BEARISH",            outcome: "WIN",  wtiReturn: -2.10,  notes: "Demand miss materialized; sold off to $69.80" },
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
