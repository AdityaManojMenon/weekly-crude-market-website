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
  brentWtiHistory?: SpreadDataPoint[];
}

export interface OvxDataPoint {
  date: string;   // "YYYY-MM-DD"
  ovx: number;
  rv: number;     // 20-day realized vol
  wti: number;    // WTI front-month price
}

export type VolRegime = "CALM" | "ELEVATED" | "STRESSED" | "PANIC" | "PANIC_REVERSING";

export interface VolatilityData {
  ovxLevel: number;
  wowChange: number;            // OVX WoW delta (negative = fear fading)
  oneYearPercentile: number;
  realizedVol20D: number;
  vrp: number;                  // OVX − RV  (negative = options cheap)
  regime: VolRegime;
  history: OvxDataPoint[];
}

export type CotSignal = "LONG_LIQUIDATION" | "SHORT_BUILD" | "LONG_BUILD" | "SHORT_COVERING";

export interface CotDataPoint {
  week: string;
  netLength: number;
}

export interface CotPositioning {
  managedMoneyNetLength: number;
  wowChange: number;
  oneYearPercentile: number;
  signal: CotSignal;
  interpretation: string;
  chartData: CotDataPoint[];
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
  probabilityNote?: string;
}

export interface CallRecord {
  weekEnding: string;
  call: Bias;
  outcome: "WIN" | "LOSS" | "PUSH" | "OPEN";
  wtiReturn: number;
  rValue: number;
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
  cotPositioning?: CotPositioning;
  volatility?: VolatilityData;
}

export interface PerformanceMetrics {
  totalCalls: number;
  totalTrades: number;
  wins: number;
  losses: number;
  pushes: number;
  openTrades: number;
  winRate: number;
  sinceInceptionR: number;
  avgRPerTrade: number;
  avgWtiReturn: number;
  bullishCalls: number;
  bullishWinRate: number;
  bearishCalls: number;
  bearishWinRate: number;
  divergentRegimeWinRate: number;
  lowConvictionAccuracy: number;
  highConvictionAccuracy: number;
  bestStrategy: string;
  avgWinR: number;
  avgLossR: number;
  largestWinR: number;
  largestLossR: number;
}

export interface StrategyBreakdown {
  strategy: string;
  trades: number;
  winRate: number;
  avgR: number;
}

export interface ConvictionStat {
  conviction: "HIGH" | "MEDIUM" | "LOW";
  trades: number;
  winRate: number;
}

export interface OpenTrade {
  id: string;
  title: string;
  conviction: "HIGH" | "MEDIUM" | "LOW";
  sizeR: number;
  entry: string;
  current: string;
  unrealizedR?: number;
  premiumDecay?: number;
  target: string;
  stop: string;
  daysOpen: number;
  openedDate: string;
  notes?: string;
}

export interface ClosedTrade {
  id: string;
  title: string;
  conviction: "HIGH" | "MEDIUM" | "LOW";
  sizeR: number;
  entry: string;
  exit: string;
  realizedR: number;
  openedDate: string;
  closedDate: string;
  outcome: "WIN" | "LOSS" | "PUSH";
  notes?: string;
}

export const briefs: WeeklyBrief[] = [
  {
    id: "2026-04-30",
    weekEnding: "April 30, 2026",
    publishedDate: "April 30, 2026",
    eiaReleaseDate: "April 30, 2026",
    reportWeek: "Week of April 24–30, 2026",
    bias: "CAUTIOUSLY_BULLISH",
    biasNote: "Escalation Regime — Re-escalation",
    regime: "TRANSITIONAL",
    headline: "WTI Surges 8.9% on Historic Inventory Sweep as Brent-WTI Spread Collapses $5.47 — Ceasefire Normalization Now Caps Upside",
    executiveSummary:
      "WTI has transitioned from a post-spike digestion phase into an active escalation regime, where geopolitical risk has reasserted itself as the dominant pricing driver. While strong physical fundamentals — including significant inventory draws and tight product markets — initially supported the rally, the latest move to ~$112 is now primarily a function of risk premium expansion rather than incremental fundamental improvement. The market is no longer in a stable consolidation phase; instead, it is characterized by high volatility, asymmetric upside risk, and headline-driven repricing. In this environment, traditional directional frameworks are less reliable, and price action is increasingly dictated by the evolution of geopolitical events rather than supply-demand data alone. Trading strategy should shift from fade-based positioning to volatility-aware execution, prioritizing trades that benefit from large moves or selectively engaging on pullbacks rather than chasing momentum. Risk management is critical, as rapid repricing remains likely in both directions depending on geopolitical developments.",
    inventory: {
      crude:       { actual: -6.234, expected: -1.605, fiveYearAvg: -0.5,  surprise: -4.628 },
      gasoline:    { actual: -6.075, expected: -1.581, fiveYearAvg: -1.5,  surprise: -4.494 },
      distillates: { actual: -4.494, expected: -1.787, fiveYearAvg: -1.0,  surprise: -2.707 },
      cushing:     { actual: -0.796, expected:  0.525 },
      spr: 373.0,
    },
    curveStructure: {
      cl1Price: 104.39,
      cl2Price: 98.51,
      spread: 5.88,
      spreadChange: 0.85,
      structure: "BACKWARDATION",
      brentWtiSpread: 5.46,
      spreadHistory: [
        { day: "Apr 24", value: 5.20 },
        { day: "Apr 25", value: 5.35 },
        { day: "Apr 28", value: 5.55 },
        { day: "Apr 29", value: 5.72 },
        { day: "Apr 30", value: 5.88 },
      ],
      brentWtiHistory: [
        { day: "Jan 25", value:  4.81 },
        { day: "Feb 1",  value:  5.48 },
        { day: "Feb 8",  value:  4.50 },
        { day: "Feb 15", value:  4.86 },
        { day: "Feb 22", value:  5.37 },
        { day: "Mar 1",  value:  5.46 },
        { day: "Mar 8",  value:  1.79 },
        { day: "Mar 15", value:  4.43 },
        { day: "Mar 22", value: 13.87 },
        { day: "Mar 29", value: 12.93 },
        { day: "Apr 5",  value: -2.51 },
        { day: "Apr 12", value: -1.37 },
        { day: "Apr 19", value:  6.53 },
        { day: "Apr 26", value: 10.93 },
        { day: "Apr 30", value:  5.46 },
      ],
    },
    crackSpreads: {
      crackSpread321: 53.42,
      crackSpreadChange: -3.50,
      gasolineCrack: 57.1,
      distillateCrack: 54.8,
    },
    production: {
      domesticProduction: 13.600,
      productionChange: 0.001,
      netImports: 2.2,
      refinerInputs: 16.1,
      refinerUtilization: 89.6,
    },
    signals: [
      {
        name: "Crude Inventory Draw",
        value: "-6.23 MMbbl vs -1.61 expected",
        direction: "bull",
        weight: "HIGH",
        note: "Massive bullish surprise of -4.63 MMbbl vs consensus. Total crude inventories at 459.5 MMbbl, drawing down toward seasonal norms. Strongest crude draw since February.",
      },
      {
        name: "Gasoline Draw",
        value: "-6.07 MMbbl vs -1.58 expected",
        direction: "bull",
        weight: "HIGH",
        note: "Gasoline printed a -4.49 MMbbl bullish surprise vs expectations. Consumer demand signal remains exceptionally firm. Two consecutive large gasoline draws signal robust driving demand.",
      },
      {
        name: "Distillate Draw",
        value: "-4.49 MMbbl vs -1.79 expected",
        direction: "bull",
        weight: "HIGH",
        note: "Distillates posted a -2.71 MMbbl bullish surprise, confirming broad demand strength across product categories. Industrial/freight demand showing no signs of weakness.",
      },
      {
        name: "Cushing Draw",
        value: "-0.80 MMbbl vs +0.52 expected",
        direction: "bull",
        weight: "MEDIUM",
        note: "Cushing drew when a build was expected (-1.32 MMbbl surprise). Delivery point tightening supports the front of the WTI curve and reinforces backwardation.",
      },
      {
        name: "CL1–CL2 Spread",
        value: "$5.88 (WoW +$0.85)",
        direction: "bull",
        weight: "HIGH",
        note: "Front-end spread widened to $5.88, deepening backwardation. Physical market signals tightness — consistent with the inventory draw data and supportive of the WTI bull case.",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$53.42 (WoW -$3.50)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Crack spreads eased modestly WoW but remain historically elevated. Refining margins are strong and refinery utilization rose to 89.6% (+0.5%). Downstream demand is robust.",
      },
      {
        name: "Ceasefire Event Override",
        value: "Geopolitical De-escalation Active",
        direction: "bear",
        weight: "HIGH",
        note: "CEASEFIRE event override is the dominant driver. Rapid Brent-WTI spread compression ($10.93 → $5.46) confirms geopolitical risk premium unwind is dominating price action despite bullish inventory prints.",
      },
    ],
    divergenceFlag: true,
    divergenceNote:
      "Unusual divergence: all four inventory categories delivered bullish surprises (crude -4.63, gasoline -4.49, distillates -2.71, Cushing -1.32 vs consensus), yet the model signals BEARISH via Event Override. The CEASEFIRE and rapid Brent-WTI spread compression ($10.93 → $5.46 in one week) confirm that geopolitical normalization is dominating price discovery over physical fundamentals. WTI at $104.39 has already priced in the bullish draw data — the next marginal driver is whether ceasefire holds and risk premium continues to decay.",
    crossAsset: [
      { label: "DXY",           value: "-0.65%",   direction: "bull",    readthrough: "Dollar softness is a mild tailwind for commodity prices, but insufficient to override ceasefire headwind" },
      { label: "S&P 500",       value: "+0.90%",   direction: "bull",    readthrough: "Mild risk-on tone — equities stable, no macro demand destruction signal" },
      { label: "Brent Premium", value: "$5.46",    direction: "neutral", readthrough: "Spread back in normal range after $5.47 WoW compression — geopolitical premium substantially normalized" },
      { label: "Nat Gas",       value: "+3.79%",   direction: "bull",    readthrough: "Broad energy complex bid — supports WTI, but WTI has already outperformed this week" },
      { label: "RBOB",          value: "+3.54%",   direction: "bull",    readthrough: "Gasoline futures higher — aligns with the -6.07 MMbbl gasoline draw. Downstream demand signal confirmed" },
      { label: "Heating Oil",   value: "+2.56%",   direction: "bull",    readthrough: "Distillate products firm — supports the -4.49 MMbbl distillate draw signal" },
    ],
    crossAssetNote: "Cross-asset backdrop is constructive: dollar soft (-0.65%), equities mildly risk-on, and product markets (RBOB +3.54%, Heating Oil +2.56%, Nat Gas +3.79%) reflect real demand. The Brent-WTI spread normalization to $5.46 is the cleanest read-through — geopolitical premium has largely expired. The market is now trading physical fundamentals vs ceasefire de-escalation rather than a war premium. Product strength is a positive input but WTI at $104 has likely priced in the bullish draw data for now.",
    positioning: {
      momentum:       "BULLISH",
      fundamentals:   "BULLISH",
      volatility:     "HIGH",
      riskReward:     "MIXED",
      interpretation: "Fundamentals are unambiguously bullish this week — all four inventory categories drew more than expected, backwardation deepened, crack spreads remain elevated. However, the WTI rally of +$8.54 has already captured much of the upside. With the ceasefire event override active and Brent-WTI spread back in normal range, the incremental bullish case is now weaker. Risk/reward for new longs is challenged at $104; the dominant forward driver is whether ceasefire holds or breaks down.",
    },
    tradeIdeas: [
      {
        structure: "WTI Long Strangle",
        conviction: "HIGH",
        rationale: "Iran has issued direct threats of retaliation against the US and Gulf allies — specifically the UAE — following escalating pressure on its nuclear program. The UAE, home to the Fujairah oil terminal and a critical Hormuz transshipment hub, is a high-value target whose disruption would send WTI sharply higher. Conversely, a surprise ceasefire or diplomatic breakthrough would rapidly collapse the embedded risk premium toward the $96–100 fundamental anchor. In either scenario the move is large and decisive — direction is the uncertainty, not magnitude. A long strangle is structurally optimal: OVX remains elevated with event risk still building, so IV has not yet peaked. The 110–112 calls exploit the breakout zone; the 98–100 puts sit at the OPEC+ physical support floor. Max loss is defined at premium paid.",
        entry: "Enter now · Buy Call 110–112 + Buy Put 98–100 · Expiry: 30–45 DTE · Size: 1R (max loss = premium paid)",
        target: "+50% to +120% of premium paid · Scale out in two tranches: 60% at +50%, runner to +120% if directional move accelerates",
        stop: "Exit full position if: WTI stalls in tight range ($101–107) for 5+ sessions with no catalyst · OR OVX collapses below ~65 (vol crush kills strangle value)",
      },
      {
        structure: "Buy WTI on Panic Pullback",
        conviction: "MEDIUM",
        rationale: "Physical fundamentals remain tight regardless of geopolitical swings — inventory draws are running well above seasonal norms and OPEC+ has consistently defended the $95–100 floor. A ceasefire headline could spark a sharp 'sell the peace' selloff, but the underlying supply risk doesn't disappear: Iranian nuclear tension, Gulf infrastructure vulnerability, and US-Iran posturing stay structurally unresolved. The $98–100 zone is where dip buyers, OPEC+ verbal intervention risk, and physical tightness converge. This is a reactive, opportunistic trade sized at 0.75R — not a core position — entered only if the market gifts the level.",
        entry: "ONLY on pullback to $98–100 zone · Do not chase above $103 · Instrument: MCL or CL depending on account size",
        target: "T1: $108 (primary target — 60% of position) · T2: $115 (runner if escalation resumes — 40%)",
        stop: "Daily close below $94 · Invalidates physical support thesis",
      },
    ],
    keyLevels: [
      { price: "~$112",         label: "WTI — Current Level / Escalation Spike",                     type: "pivot" },
      { price: "$115.00",       label: "T2 · Panic Pullback Long — Runner Target (40%) / Upside Breakout", type: "resistance" },
      { price: "$110–112",      label: "T1 · Long Strangle — Call Strike Zone / Current Consolidation",    type: "resistance" },
      { price: "$108.00",       label: "T2 · Panic Pullback Long — Primary Target (60% exit)",        type: "resistance" },
      { price: "$98–100",       label: "T1 · Long Strangle — Put Strike / T2 Pullback Entry Zone",    type: "support" },
      { price: "$94.00",        label: "T2 · Panic Pullback Long — Hard Stop (daily close below)",    type: "support" },
      { price: "> $8.00",       label: "Brent-WTI — Re-escalation Confirmation Level",               type: "resistance" },
      { price: "$5.88",         label: "CL1–CL2 — Strong Backwardation (Physical Tightness Signal)", type: "pivot" },
      { price: "$53.42",        label: "3-2-1 Crack Spread — Elevated (Demand Support Floor)",       type: "pivot" },
      { price: "459.5 MMbbl",   label: "Crude Inventory — Drawing Lower (Bullish Physical)",         type: "pivot" },
      { price: "OVX ~75",       label: "Vol — Elevated / Escalation Regime · Strangle Stop if OVX < 65", type: "pivot" },
    ],
    scenarios: [
      {
        title: "Bullish Case — Escalation Accelerates / Hormuz Disruption",
        probability: 40,
        direction: "bull",
        description: "Iran follows through on retaliation threats against US assets or Gulf infrastructure — a strike on Fujairah, UAE oil facilities, or a Hormuz transit disruption triggers an immediate supply shock. Brent-WTI spread re-widens toward $10–12, OVX spikes above 90, and WTI breaks decisively above $115 toward $120+. Strong physical fundamentals amplify the move — there is no inventory buffer to absorb a supply event at current draw rates.",
        trigger: "Iranian retaliation strike · Hormuz transit disruption · UAE infrastructure attack · OPEC+ emergency cut · US military escalation in Gulf",
        probabilityNote: "WTI > $115 / Active supply disruption",
      },
      {
        title: "Bearish Case — Surprise De-escalation / Diplomatic Breakthrough",
        probability: 25,
        direction: "bear",
        description: "Backchannel US-Iran negotiations produce a surprise ceasefire or de-escalation signal before any retaliation materializes. The risk premium embedded in current prices collapses rapidly — WTI fades from ~$112 toward $96–100 as the geopolitical bid expires. OVX drops sharply below 65, strangle value collapses, and physical fundamentals alone cannot sustain prices above $100.",
        trigger: "US-Iran diplomatic agreement · Public de-escalation signals from Iranian leadership · Hormuz tensions ease · OVX breaks below 65",
        probabilityNote: "WTI $96–100 / Risk premium collapse",
      },
      {
        title: "Base Case — Volatile Range $106–112",
        probability: 35,
        direction: "neutral",
        description: "Escalation rhetoric remains elevated but no major kinetic event materializes, keeping WTI in a high-volatility consolidation range. Price is headline-driven and unstable, with sharp intraday swings in both directions but no sustained directional trend. OVX stays elevated in the 70–80 range. Physical tightness provides a floor; lack of a major supply disruption caps aggressive upside. Strangle positioning performs well in this environment.",
        trigger: "No major escalation event · Continued Iran threats without follow-through · EIA draws sustain physical floor · OVX holds 70–80",
        probabilityNote: "WTI $106–112 / High-volatility range",
      },
    ],
    catalysts: [
      { date: "Live",   label: "Iran Retaliation Watch",   detail: "Direct Iranian threats against US and Gulf allies — any kinetic event triggers immediate supply shock and WTI spike above $115", type: "geo", isLive: true },
      { date: "Live",   label: "Hormuz Transit Risk",      detail: "Strait of Hormuz disruption would remove ~20% of global seaborne oil — highest-impact tail risk currently active",              type: "geo", isLive: true },
      { date: "May 7",  label: "EIA WPSR",                 detail: "Third consecutive bullish draw would reinforce physical tightness narrative and support $112+ if geopolitical premium holds",   type: "eia" },
      { date: "May 7",  label: "FOMC Rate Decision",       detail: "Fed rate decision — DXY reaction impacts commodity complex; rate cut or dovish pivot = additional tailwind for crude",          type: "fed" },
      { date: "May",    label: "OPEC+ Production Policy",  detail: "Any surprise cut or compliance tightening in response to escalation would amplify the supply shock narrative",                  type: "opec" },
    ],
    riskDashboard: {
      upsideRisks: [
        "Iranian retaliation strike on UAE infrastructure or Hormuz transit",
        "Escalation spreads — US military engagement in Gulf triggers supply shock",
        "OPEC+ emergency production cut in solidarity with Gulf allies",
        "Third consecutive EIA bullish draw removes any inventory buffer",
        "Dollar weakens further (DXY below 96) amplifying commodity move",
      ],
      downsideRisks: [
        "Surprise US-Iran diplomatic breakthrough collapses risk premium toward $96–100",
        "No retaliation materializes — Iran threats perceived as posturing, bid fades",
        "OVX collapses below 65, crushing strangle value before move occurs",
        "Macro demand destruction from sustained high prices weighs on outlook",
        "OPEC+ compliance loosens / production ramps into elevated prices",
      ],
      riskScore: 4,
      riskLabel: "Elevated / Escalation Regime",
      volatility: "HIGH",
      conviction: "MEDIUM",
      dominantDriver: "Ceasefire Event Override / Inventory Draw Sweep",
    },
    geopoliticalContext:
      "The oil market entered a highly volatile transition phase as tentative ceasefire signals collided with escalating structural disruptions. While the UAE's exit from OPEC introduced expectations of future oversupply, the immediate impact was overwhelmed by the ongoing Iranian blockade of the Strait of Hormuz, which has severely constrained seaborne flows and driven aggressive inventory draws. Brent spiked above $126 as the market repriced prolonged disruption following the breakdown of US–Iran negotiations, while the Brent–WTI spread compressed to ~$5.5 as war premiums normalized and U.S. balances remained relatively softer. With Iran approaching a storage constraint and exports effectively curtailed, the market is now caught between near-term physical tightness and an evolving geopolitical normalization narrative.",
    outlook:
      "Neutral–Bullish (Escalation Regime). WTI is structurally supported by escalating geopolitical risk, with supply disruption concerns around the Strait of Hormuz driving a renewed expansion in risk premium. This creates a clear upside skew, where further escalation can drive sharp price spikes. However, recent price action has already reflected a significant repricing, and the market remains highly headline-driven and unstable, with the potential for rapid reversals on any de-escalation signals. As a result, the environment is better characterized as volatile rather than trending, limiting the reliability of pure directional positioning. Trading should therefore prioritize tactical execution and volatility-aware strategies, rather than outright trend-following, while maintaining a bias toward scenarios where upside risk dominates.",
    wtiPriceAtPublish: 104.39,
    wtiWeeklyChange: 8.54,
    cotPositioning: {
      managedMoneyNetLength: 100,
      wowChange: 2,
      oneYearPercentile: 76.9,
      signal: "LONG_BUILD",
      interpretation:
        "Most recent CFTC data (Apr 21): Managed money net longs at +99,887 contracts (+1,519 WoW), at the 76.9th percentile of the 52-week range (P25: 13k / P75: 98k). Gross longs at 200,831; gross shorts at 100,944. Positioning broadly unchanged WoW — no strong directional signal. At the 77th percentile, spec length is elevated but not yet in crowded territory. The moderate WoW increase (+1,519) suggests bulls are adding incrementally rather than aggressively. Watch for long liquidation risk if ceasefire durability is confirmed and prices fade from $104.",
      chartData: [
        { week: "Dec 30", netLength:  16 },
        { week: "Jan 6",  netLength:  25 },
        { week: "Jan 13", netLength:  48 },
        { week: "Jan 20", netLength:  48 },
        { week: "Jan 27", netLength:  59 },
        { week: "Feb 3",  netLength:  77 },
        { week: "Feb 10", netLength:  79 },
        { week: "Feb 17", netLength:  64 },
        { week: "Feb 24", netLength:  68 },
        { week: "Mar 3",  netLength:  68 },
        { week: "Mar 10", netLength:  92 },
        { week: "Mar 17", netLength:  96 },
        { week: "Mar 24", netLength:  94 },
        { week: "Mar 31", netLength:  73 },
        { week: "Apr 7",  netLength:  79 },
        { week: "Apr 14", netLength:  98 },
        { week: "Apr 21", netLength: 100 },
      ],
    },
    volatility: {
      ovxLevel: 74.9,
      wowChange: -3.8,
      oneYearPercentile: 86.1,
      realizedVol20D: 104.4,
      vrp: -29.5,
      regime: "PANIC_REVERSING",
      history: [
        { date: "2026-01-02", ovx:  28.4, rv:  23.2, wti:  57.32 },
        { date: "2026-01-05", ovx:  29.4, rv:  23.7, wti:  58.32 },
        { date: "2026-01-06", ovx:  30.1, rv:  24.4, wti:  57.13 },
        { date: "2026-01-07", ovx:  33.0, rv:  24.4, wti:  55.99 },
        { date: "2026-01-08", ovx:  35.8, rv:  26.9, wti:  57.76 },
        { date: "2026-01-09", ovx:  36.8, rv:  28.2, wti:  59.12 },
        { date: "2026-01-12", ovx:  38.9, rv:  27.7, wti:  59.50 },
        { date: "2026-01-13", ovx:  40.4, rv:  29.1, wti:  61.15 },
        { date: "2026-01-14", ovx:  44.2, rv:  28.8, wti:  62.02 },
        { date: "2026-01-15", ovx:  42.1, rv:  32.2, wti:  59.19 },
        { date: "2026-01-16", ovx:  43.2, rv:  32.1, wti:  59.44 },
        { date: "2026-01-20", ovx:  42.8, rv:  32.4, wti:  60.34 },
        { date: "2026-01-21", ovx:  45.5, rv:  32.3, wti:  60.62 },
        { date: "2026-01-22", ovx:  44.7, rv:  32.5, wti:  59.36 },
        { date: "2026-01-23", ovx:  47.6, rv:  33.9, wti:  61.07 },
        { date: "2026-01-26", ovx:  47.8, rv:  34.0, wti:  60.63 },
        { date: "2026-01-27", ovx:  49.6, rv:  33.3, wti:  62.39 },
        { date: "2026-01-28", ovx:  50.4, rv:  32.8, wti:  63.21 },
        { date: "2026-01-29", ovx:  55.4, rv:  34.4, wti:  65.42 },
        { date: "2026-01-30", ovx:  55.9, rv:  34.1, wti:  65.21 },
        { date: "2026-02-02", ovx:  48.7, rv:  39.1, wti:  62.14 },
        { date: "2026-02-03", ovx:  52.3, rv:  39.1, wti:  63.21 },
        { date: "2026-02-04", ovx:  55.1, rv:  39.0, wti:  65.14 },
        { date: "2026-02-05", ovx:  55.0, rv:  39.9, wti:  63.29 },
        { date: "2026-02-06", ovx:  53.2, rv:  38.8, wti:  63.55 },
        { date: "2026-02-09", ovx:  50.8, rv:  38.3, wti:  64.36 },
        { date: "2026-02-10", ovx:  48.0, rv:  38.5, wti:  63.96 },
        { date: "2026-02-11", ovx:  44.3, rv:  37.6, wti:  64.63 },
        { date: "2026-02-12", ovx:  42.0, rv:  38.9, wti:  62.84 },
        { date: "2026-02-13", ovx:  42.2, rv:  34.6, wti:  62.89 },
        { date: "2026-02-17", ovx:  42.5, rv:  34.9, wti:  62.33 },
        { date: "2026-02-18", ovx:  51.5, rv:  37.8, wti:  65.19 },
        { date: "2026-02-19", ovx:  56.7, rv:  38.2, wti:  66.43 },
        { date: "2026-02-20", ovx:  56.1, rv:  37.0, wti:  66.39 },
        { date: "2026-02-23", ovx:  59.1, rv:  36.1, wti:  66.31 },
        { date: "2026-02-24", ovx:  58.8, rv:  36.2, wti:  65.63 },
        { date: "2026-02-25", ovx:  59.0, rv:  35.1, wti:  65.42 },
        { date: "2026-02-26", ovx:  59.8, rv:  34.9, wti:  65.21 },
        { date: "2026-02-27", ovx:  64.7, rv:  34.1, wti:  67.02 },
        { date: "2026-03-02", ovx:  68.9, rv:  40.1, wti:  71.23 },
        { date: "2026-03-03", ovx:  74.0, rv:  37.5, wti:  74.56 },
        { date: "2026-03-04", ovx:  75.2, rv:  37.5, wti:  74.66 },
        { date: "2026-03-05", ovx:  83.8, rv:  45.1, wti:  81.01 },
        { date: "2026-03-06", ovx: 103.6, rv:  56.0, wti:  90.90 },
        { date: "2026-03-09", ovx: 100.5, rv:  56.3, wti:  94.77 },
        { date: "2026-03-10", ovx: 108.2, rv:  76.9, wti:  83.45 },
        { date: "2026-03-11", ovx: 120.9, rv:  77.3, wti:  87.25 },
        { date: "2026-03-12", ovx: 120.2, rv:  82.0, wti:  95.73 },
        { date: "2026-03-13", ovx: 119.0, rv:  80.0, wti:  98.71 },
        { date: "2026-03-16", ovx: 102.0, rv:  84.3, wti:  93.50 },
        { date: "2026-03-17", ovx:  95.9, rv:  83.7, wti:  96.21 },
        { date: "2026-03-18", ovx:  97.3, rv:  83.5, wti:  96.32 },
        { date: "2026-03-19", ovx:  92.7, rv:  83.8, wti:  96.14 },
        { date: "2026-03-20", ovx:  91.9, rv:  83.5, wti:  98.32 },
        { date: "2026-03-23", ovx:  89.8, rv:  95.1, wti:  88.13 },
        { date: "2026-03-24", ovx:  89.3, rv:  95.3, wti:  92.35 },
        { date: "2026-03-25", ovx:  90.2, rv:  96.1, wti:  90.32 },
        { date: "2026-03-26", ovx:  92.4, rv:  96.4, wti:  94.48 },
        { date: "2026-03-27", ovx:  96.6, rv:  97.1, wti:  99.64 },
        { date: "2026-03-30", ovx:  95.8, rv:  96.0, wti: 102.88 },
        { date: "2026-03-31", ovx:  89.4, rv:  96.1, wti: 101.38 },
        { date: "2026-04-01", ovx:  91.8, rv:  96.5, wti: 100.12 },
        { date: "2026-04-02", ovx:  93.1, rv:  99.4, wti: 111.54 },
        { date: "2026-04-06", ovx:  96.1, rv:  92.2, wti: 112.41 },
        { date: "2026-04-07", ovx:  98.8, rv:  91.5, wti: 112.95 },
        { date: "2026-04-08", ovx:  83.9, rv: 102.9, wti:  94.41 },
        { date: "2026-04-09", ovx:  81.7, rv: 102.5, wti:  97.87 },
        { date: "2026-04-10", ovx:  78.0, rv:  97.4, wti:  96.57 },
        { date: "2026-04-13", ovx:  80.6, rv:  97.2, wti:  99.08 },
        { date: "2026-04-14", ovx:  75.4, rv:  99.7, wti:  91.28 },
        { date: "2026-04-15", ovx:  72.2, rv:  99.1, wti:  91.29 },
        { date: "2026-04-16", ovx:  73.0, rv: 100.1, wti:  94.69 },
        { date: "2026-04-17", ovx:  69.0, rv: 108.9, wti:  83.85 },
        { date: "2026-04-20", ovx:  73.8, rv: 111.5, wti:  89.61 },
        { date: "2026-04-21", ovx:  85.6, rv: 104.9, wti:  92.13 },
        { date: "2026-04-22", ovx:  76.8, rv: 103.6, wti:  92.96 },
        { date: "2026-04-23", ovx:  79.4, rv: 104.0, wti:  96.44 },
        { date: "2026-04-24", ovx:  75.8, rv: 102.7, wti:  94.40 },
        { date: "2026-04-27", ovx:  73.1, rv: 101.1, wti:  96.37 },
        { date: "2026-04-28", ovx:  70.5, rv: 101.3, wti:  99.93 },
        { date: "2026-04-29", ovx:  76.0, rv: 104.0, wti: 106.88 },
        { date: "2026-04-30", ovx:  74.9, rv: 104.4, wti: 104.18 },
      ],
    },
  },
  {
    id: "2026-04-23",
    weekEnding: "April 23, 2026",
    publishedDate: "April 23, 2026",
    eiaReleaseDate: "April 23, 2026",
    reportWeek: "Week of April 17–23, 2026",
    bias: "BEARISH",
    biasNote: "Event-Driven",
    regime: "TRANSITIONAL",
    headline: "Crude Build Overwhelms Product Strength as Brent Premium Jumps to $9, OVX Stays in PANIC",
    executiveSummary:
      "WTI closed +$1.72 WoW at $96.41, but the market signal remains decisively BEARISH. The EIA report delivered a crude surprise build of +3.34 MMbbl above consensus — a significant bearish shock — while product markets stayed firm: gasoline drew -4.57 MMbbl (vs -2.26 expected) and distillates drew -3.43 MMbbl (vs -1.59 expected). The dominant driver is ongoing geopolitical de-escalation: the Brent-WTI spread surged to $9.03/bbl (+$2.50 WoW), now $3.46 above its 3-month average, signaling WTI-specific pricing weakness versus seaborne crude. OVX remains in PANIC territory at 79.4 (+6.4 WoW), at the 89th percentile, with 20D realized vol at 104% outpacing implied by 24.6 pts. The CL1–CL2 spread (5.10, +0.91 WoW) bounced modestly but the structural trend of risk-premium compression persists. Fade rallies. Avoid fresh longs.",
    inventory: {
      crude:       { actual: 1.925,  expected: -1.412, fiveYearAvg: -1.4,  surprise:  3.337 },
      gasoline:    { actual: -4.570, expected: -2.261, fiveYearAvg: -1.5,  surprise: -2.308 },
      distillates: { actual: -3.427, expected: -1.589, fiveYearAvg: -1.0,  surprise: -1.838 },
      cushing:     { actual: 0.806,  expected: 0.400 },
      spr: 373.0,
    },
    curveStructure: {
      cl1Price: 96.41,
      cl2Price: 91.31,
      spread: 5.10,
      spreadChange: 0.91,
      structure: "BACKWARDATION",
      brentWtiSpread: 9.03,
      spreadHistory: [
        { day: "Apr 14", value: 3.16 },
        { day: "Apr 15", value: 3.20 },
        { day: "Apr 16", value: 4.19 },
        { day: "Apr 17", value: 3.40 },
        { day: "Apr 20", value: 4.05 },
        { day: "Apr 21", value: 4.55 },
        { day: "Apr 22", value: 4.85 },
        { day: "Apr 23", value: 5.10 },
      ],
      brentWtiHistory: [
        { day: "Jan 25", value:  4.81 },
        { day: "Feb 1",  value:  5.48 },
        { day: "Feb 8",  value:  4.50 },
        { day: "Feb 15", value:  4.86 },
        { day: "Feb 22", value:  5.37 },
        { day: "Mar 1",  value:  5.46 },
        { day: "Mar 8",  value:  1.79 },
        { day: "Mar 15", value:  4.43 },
        { day: "Mar 22", value: 13.87 },
        { day: "Mar 29", value: 12.93 },
        { day: "Apr 5",  value: -2.51 },
        { day: "Apr 12", value: -1.37 },
        { day: "Apr 19", value:  6.53 },
        { day: "Apr 23", value:  9.03 },
      ],
    },
    crackSpreads: {
      crackSpread321: 56.92,
      crackSpreadChange: 9.4,
      gasolineCrack: 56.5,
      distillateCrack: 58.2,
    },
    production: {
      domesticProduction: 13.585,
      productionChange: -0.011,
      netImports: 2.4,
      refinerInputs: 15.8,
      refinerUtilization: 89.1,
    },
    signals: [
      {
        name: "Crude Inventory Surprise",
        value: "+3.34 MMbbl above consensus",
        direction: "bear",
        weight: "HIGH",
        note: "Crude printed +1.93 MMbbl actual vs -1.41 expected — a 3.34 MMbbl bearish surprise. Total inventories at 465.7 MMbbl, well above seasonal norms.",
      },
      {
        name: "CL1–CL2 Spread",
        value: "+$5.10 (WoW +$0.91)",
        direction: "bull",
        weight: "HIGH",
        note: "Spread bounced $0.91 to $5.10 — strong backwardation structurally supportive, but still far below the March peak of $14.72. Geopolitical de-escalation continues to compress the risk premium on a macro basis.",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$51.98/bbl (WoW +$4.43)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Crack spreads at elevated levels — refining margins strong. Product demand is robust: gasoline and distillate draws both printed well above consensus.",
      },
      {
        name: "Gasoline Draw",
        value: "-4.57 MMbbl vs -2.26 expected",
        direction: "bull",
        weight: "HIGH",
        note: "Bullish product surprise — gasoline drew 2.31 MMbbl more than expected. Consumer demand signal remains firm.",
      },
      {
        name: "Distillate Draw",
        value: "-3.43 MMbbl vs -1.59 expected",
        direction: "bull",
        weight: "MEDIUM",
        note: "Distillates printed a strong bullish surprise (-1.84 MMbbl vs expectations), confirming broad product demand strength.",
      },
      {
        name: "Brent-WTI Spread",
        value: "$9.03 (+$2.50 WoW)",
        direction: "bear",
        weight: "HIGH",
        note: "Premium now $3.46 above the 3M average of $5.57. Signals Brent-side geopolitical bid or Cushing delivery-point stress. Above $6 → structurally favor Brent over WTI.",
      },
      {
        name: "OVX / Volatility Regime",
        value: "79.4 (+6.4 WoW, 89th pctile)",
        direction: "bear",
        weight: "MEDIUM",
        note: "Vol regime: PANIC. 20D realized vol (104%) is outpacing OVX — options are cheap relative to realized moves. Risk of implied vol catch-up remains elevated.",
      },
    ],
    divergenceFlag: true,
    divergenceNote:
      "Classic divergence: product markets remain structurally firm (gasoline -4.57 MMbbl, distillates -3.43 MMbbl, crack spreads $51.98) while crude itself printed a surprise build of +3.34 MMbbl vs consensus. Simultaneously, the Brent-WTI spread has surged to $9.03 — signaling WTI-specific pricing weakness relative to seaborne crude. The market is trading geopolitical macro narrative and event-driven de-escalation over physical fundamentals.",
    crossAsset: [
      { label: "DXY",           value: "+0.60%", direction: "bear",    readthrough: "Dollar slightly stronger — mild headwind for dollar-denominated commodities" },
      { label: "S&P 500",       value: "+0.93%", direction: "bull",    readthrough: "Mild risk-on — modest equity tailwind not translating to WTI" },
      { label: "Brent Premium", value: "+$9.03", direction: "bear",    readthrough: "Extreme Brent-WTI divergence — WTI-specific pricing weakness persists" },
      { label: "Nat Gas",       value: "+3.82%", direction: "bull",    readthrough: "Gas rally signals broader energy bid, but WTI underperforming" },
      { label: "RBOB",          value: "+5.97%", direction: "bull",    readthrough: "Gasoline futures surging — strong downstream demand signal confirmed" },
    ],
    crossAssetNote: "Cross-asset signals are mixed: equities mildly risk-on and energy products (RBOB +5.97%, Nat Gas +3.82%) reflect demand, but WTI is dramatically underperforming Brent ($9.03 spread). Dollar strength is a mild headwind. The divergence between product strength and WTI's relative weakness vs Brent argues for continued caution on outright longs.",
    positioning: {
      momentum:       "BEARISH",
      fundamentals:   "MIXED",
      volatility:     "HIGH",
      riskReward:     "UNFAVORABLE",
      interpretation: "Crude inventory bearish surprise overwhelms bullish product draws. Brent-WTI spread at extreme levels signals WTI-specific weakness. Vol regime remains in PANIC with realized vol outpacing implied — tail risk remains elevated. Risk-reward for new longs is unfavorable at current levels.",
    },
    tradeIdeas: [
      {
        structure: "Short Brent / Long WTI Relative Value",
        conviction: "HIGH",
        rationale: "The Brent–WTI spread widened to ~$9–11 (vs ~$5.5 avg), driven by a geopolitical premium in Brent and temporary WTI weakness from a crude build. However, this dislocation was inconsistent with physical signals: strong product demand, elevated crack spreads (~$50+), and a tight front-end curve (CL1–CL2 ~5) supported WTI. Meanwhile, Brent was pricing hypothetical geopolitical risk without confirmed disruption. With no escalation, the premium looked overstretched, creating asymmetry toward compression and WTI outperformance.",
        entry: "0.5R at $9 spread + 0.5R at $10.75 spread (total 1.0R) → Long WTI / Short Brent",
        target: "$5.00–6.00 (center: $5.50)",
        stop: "Spread $12.00–13.00 ($12.50 daily close)",
      },
      {
        structure: 'The "Hormuz Deadlock" Iron Condor',
        conviction: "MEDIUM",
        rationale: "OVX at 79.4 (89th percentile) remains elevated, but WTI price action is beginning to stabilize within a broad $92–100 range. The market appears to be adapting to the current blockade / ceasefire regime, creating an opportunity to sell expensive panic premium through a defined-risk Iron Condor. The trade benefits from time decay, range-bound price action, and implied volatility compression. Structure: Sell $105 Call / Buy $110 Call · Sell $87 Put / Buy $82 Put (May/June monthly expiry).",
        entry: "Current setup active while OVX > 75 and WTI holds below $100 / above $90",
        target: "50% of max credit received, or OVX 60–65",
        stop: "WTI daily close > $100 or < $90 · OVX > 90 · confirmed geopolitical escalation headline",
      },
    ],
    keyLevels: [
      { price: "$9.03",          label: "T1 · Brent-WTI Spread — Original Entry",         type: "pivot" },
      { price: "$11.32",         label: "T1 · Brent-WTI Spread — Current Level (hold)",   type: "pivot" },
      { price: "Pullbacks",      label: "T1 · Brent-WTI Spread — Add Selectively Here",   type: "pivot" },
      { price: "$15.00",         label: "T1 · Brent-WTI Spread — Base Case Target",       type: "support" },
      { price: "$20.00",         label: "T1 · Brent-WTI Spread — Escalation Target",      type: "support" },
      { price: "< $8.50",        label: "T1 · Brent-WTI Spread — Stop (raised, daily close)", type: "resistance" },
      { price: "WTI $100",       label: "T2 · Iron Condor — Upper Profit Boundary / Stop",type: "resistance" },
      { price: "WTI $105 / $110",label: "T2 · Short Call / Long Call Strikes",            type: "resistance" },
      { price: "WTI $90–$100",   label: "T2 · Iron Condor — Max Profit Zone",             type: "pivot" },
      { price: "WTI $87 / $82",  label: "T2 · Short Put / Long Put Strikes",              type: "support" },
      { price: "WTI $90",        label: "T2 · Iron Condor — Lower Profit Boundary / Stop",type: "support" },
      { price: "OVX 75 → 60–65", label: "T2 · Volatility — Entry → Target",              type: "pivot" },
      { price: "OVX > 90",       label: "T2 · Volatility — Stop",                        type: "resistance" },
    ],
    scenarios: [
      {
        title: "Bullish Case — Geopolitical Re-escalation",
        probability: 25,
        direction: "bull",
        description: "Ceasefire breakdown or new supply disruption re-injects risk premium across crude. WTI rallies toward $100–105. Brent may outperform initially, pushing the spread wider, but if U.S. fundamentals tighten, WTI can later catch up and compress the spread.",
        trigger: "Ceasefire collapse · Hormuz incident · OPEC+ emergency cut",
        probabilityNote: "WTI > $100 / Supply shock or infrastructure strike",
      },
      {
        title: "Bearish Case — Continued De-risking / Normalization",
        probability: 25,
        direction: "bear",
        description: "Geopolitical premium fades, crude builds continue, and outright prices soften toward $88–92. If Brent risk premium unwinds faster than WTI weakness persists, spread compresses toward $2–4. OVX retreats from PANIC as realized vol normalizes.",
        trigger: "Sustained ceasefire · Consecutive crude builds · Spread below $3.50 · OVX drops below 65",
        probabilityNote: "WTI < $92 / Islamabad Talks resume",
      },
      {
        title: "Base Case — Range-Bound / Two-Way Trade",
        probability: 50,
        direction: "neutral",
        description: "Product strength, healthy crack spreads, and firm backwardation should support dips toward $92–94, while crude builds, elevated positioning, and fading geopolitical premium cap rallies near $99–100. WTI remains volatile but broadly range-bound in a $92–99 band, with short-term moves driven more by headlines than durable fundamental repricing. Expect mean-reverting price action rather than a sustained trend.",
        trigger: "Mixed EIA reports · Brent-WTI spread stabilizes at $4–6 · OVX trends lower but stays elevated · No major geopolitical catalyst",
        probabilityNote: "WTI $94–99 / No major catalyst",
      },
    ],
    catalysts: [
      { date: "Apr 30", label: "EIA WPSR",             detail: "Next weekly inventory — will crude builds persist or reverse into draws?", type: "eia" },
      { date: "May 2",  label: "Non-Farm Payrolls",    detail: "Macro demand proxy — key for demand outlook",                            type: "macro" },
      { date: "Live",   label: "Ceasefire Durability", detail: "Any breakdown re-injects geopolitical risk premium rapidly",             type: "geo", isLive: true },
      { date: "May 7",  label: "Fed Meeting",          detail: "Rate decision and DXY impact on crude",                                  type: "fed" },
      { date: "May",    label: "OPEC+ Production",     detail: "Ongoing production policy — compliance and quota adjustment watch",      type: "opec" },
    ],
    riskDashboard: {
      upsideRisks: [
        "Ceasefire breakdown / Hormuz re-escalation",
        "OPEC+ unscheduled emergency production cut",
        "Gasoline and distillate draws continue for another week",
        "Dollar weakens sharply (DXY < 96)",
      ],
      downsideRisks: [
        "Crude builds persist for 2+ consecutive weeks",
        "CL1–CL2 spread compresses toward $2 or flips contango",
        "Brent-WTI spread normalizes — WTI loses relative support",
        "Macro slowdown accelerates demand destruction",
        "OVX elevated — tail-risk events can cause sharp repricing lower",
      ],
      riskScore: 4,
      riskLabel: "Bearish",
      volatility: "HIGH",
      conviction: "HIGH",
      dominantDriver: "Geopolitics / Inventory Surprise",
    },
    geopoliticalContext:
      "The fragile two-week ceasefire holds, yet the Brent-WTI spread at $9.03 (+$2.50 WoW) signals a pivot from direct combat to maritime friction. While the Strait of Hormuz is technically open, the U.S. blockade of Iranian-linked tankers and the seizure of the Majestic X on April 23 sustain a high seaborne premium. Locally, a 1.9M bbl crude build at Cushing (ending April 17) adds downward pressure to WTI. OPEC+ discipline remains the wildcard; however, with Iranian refining capacity down 23%, any failure to finalize HEU removal terms by the truce's end could rapidly re-escalate the \"war premium.\"",
    outlook:
      "Directional Bias: Bearish (High Conviction). The +3.34 MMbbl crude surprise build vs consensus remains the clearest signal, weakening the bullish case for outright crude. Product demand is firm gasoline and distillate draws plus elevated crack spreads confirm healthy downstream consumption but those positives are outweighed by softer crude balances and crowded speculative length. The Brent-WTI spread at $9.03 signals persistent relative weakness in WTI, while elevated volatility keeps upside fragile. Unless a fresh supply disruption emerges, rallies are more likely to be sold, with price action driven by headlines. ",
    wtiPriceAtPublish: 96.41,
    wtiWeeklyChange: 1.72,
    cotPositioning: {
      managedMoneyNetLength: 98,
      wowChange: 20,
      oneYearPercentile: 75,
      signal: "LONG_BUILD",
      interpretation:
        "Most recent CFTC data (Apr 14): Managed money net longs at +98,368 contracts (+19,668 WoW), at the 75th percentile of the 52-week range (P25: 13k / P75: 98k). Gross longs at 200k, gross shorts at 102k — bulls are adding new exposure rather than simply covering shorts. Positioning is approaching crowded territory at the 75th percentile, which compresses further upside from spec buying alone. The growing divergence between rising spec length and our bearish model signal represents a key unwind risk if crude inventory builds continue.",
      chartData: [
        { week: "Dec 30", netLength:  16 },
        { week: "Jan 6",  netLength:  25 },
        { week: "Jan 13", netLength:  48 },
        { week: "Jan 20", netLength:  48 },
        { week: "Jan 27", netLength:  59 },
        { week: "Feb 3",  netLength:  77 },
        { week: "Feb 10", netLength:  79 },
        { week: "Feb 17", netLength:  64 },
        { week: "Feb 24", netLength:  68 },
        { week: "Mar 3",  netLength:  68 },
        { week: "Mar 10", netLength:  92 },
        { week: "Mar 17", netLength:  96 },
        { week: "Mar 24", netLength:  94 },
        { week: "Mar 31", netLength:  73 },
        { week: "Apr 7",  netLength:  79 },
        { week: "Apr 14", netLength:  98 },
      ],
    },
    volatility: {
      ovxLevel: 79.4,
      wowChange: 6.4,
      oneYearPercentile: 88.9,
      realizedVol20D: 104.0,
      vrp: -24.6,
      regime: "PANIC",
      history: [
        { date: "2026-01-02", ovx:  28.4, rv:  23.2, wti:  57.32 },
        { date: "2026-01-05", ovx:  29.4, rv:  23.7, wti:  58.32 },
        { date: "2026-01-06", ovx:  30.1, rv:  24.4, wti:  57.13 },
        { date: "2026-01-07", ovx:  33.0, rv:  24.4, wti:  55.99 },
        { date: "2026-01-08", ovx:  35.8, rv:  26.9, wti:  57.76 },
        { date: "2026-01-09", ovx:  36.8, rv:  28.2, wti:  59.12 },
        { date: "2026-01-12", ovx:  38.9, rv:  27.7, wti:  59.50 },
        { date: "2026-01-13", ovx:  40.4, rv:  29.1, wti:  61.15 },
        { date: "2026-01-14", ovx:  44.2, rv:  28.8, wti:  62.02 },
        { date: "2026-01-15", ovx:  42.1, rv:  32.2, wti:  59.19 },
        { date: "2026-01-16", ovx:  43.2, rv:  32.1, wti:  59.44 },
        { date: "2026-01-20", ovx:  42.8, rv:  32.4, wti:  60.34 },
        { date: "2026-01-21", ovx:  45.5, rv:  32.3, wti:  60.62 },
        { date: "2026-01-22", ovx:  44.7, rv:  32.5, wti:  59.36 },
        { date: "2026-01-23", ovx:  47.6, rv:  33.9, wti:  61.07 },
        { date: "2026-01-26", ovx:  47.8, rv:  34.0, wti:  60.63 },
        { date: "2026-01-27", ovx:  49.6, rv:  33.3, wti:  62.39 },
        { date: "2026-01-28", ovx:  50.4, rv:  32.8, wti:  63.21 },
        { date: "2026-01-29", ovx:  55.4, rv:  34.4, wti:  65.42 },
        { date: "2026-01-30", ovx:  55.9, rv:  34.1, wti:  65.21 },
        { date: "2026-02-02", ovx:  48.7, rv:  39.1, wti:  62.14 },
        { date: "2026-02-03", ovx:  52.3, rv:  39.1, wti:  63.21 },
        { date: "2026-02-04", ovx:  55.1, rv:  39.0, wti:  65.14 },
        { date: "2026-02-05", ovx:  55.0, rv:  39.9, wti:  63.29 },
        { date: "2026-02-06", ovx:  53.2, rv:  38.8, wti:  63.55 },
        { date: "2026-02-09", ovx:  50.8, rv:  38.3, wti:  64.36 },
        { date: "2026-02-10", ovx:  48.0, rv:  38.5, wti:  63.96 },
        { date: "2026-02-11", ovx:  44.3, rv:  37.6, wti:  64.63 },
        { date: "2026-02-12", ovx:  42.0, rv:  38.9, wti:  62.84 },
        { date: "2026-02-13", ovx:  42.2, rv:  34.6, wti:  62.89 },
        { date: "2026-02-17", ovx:  42.5, rv:  34.9, wti:  62.33 },
        { date: "2026-02-18", ovx:  51.5, rv:  37.8, wti:  65.19 },
        { date: "2026-02-19", ovx:  56.7, rv:  38.2, wti:  66.43 },
        { date: "2026-02-20", ovx:  56.1, rv:  37.0, wti:  66.39 },
        { date: "2026-02-23", ovx:  59.1, rv:  36.1, wti:  66.31 },
        { date: "2026-02-24", ovx:  58.8, rv:  36.2, wti:  65.63 },
        { date: "2026-02-25", ovx:  59.0, rv:  35.1, wti:  65.42 },
        { date: "2026-02-26", ovx:  59.8, rv:  34.9, wti:  65.21 },
        { date: "2026-02-27", ovx:  64.7, rv:  34.1, wti:  67.02 },
        { date: "2026-03-02", ovx:  68.9, rv:  40.1, wti:  71.23 },
        { date: "2026-03-03", ovx:  74.0, rv:  37.5, wti:  74.56 },
        { date: "2026-03-04", ovx:  75.2, rv:  37.5, wti:  74.66 },
        { date: "2026-03-05", ovx:  83.8, rv:  45.1, wti:  81.01 },
        { date: "2026-03-06", ovx: 103.6, rv:  56.0, wti:  90.90 },
        { date: "2026-03-09", ovx: 100.5, rv:  56.3, wti:  94.77 },
        { date: "2026-03-10", ovx: 108.2, rv:  76.9, wti:  83.45 },
        { date: "2026-03-11", ovx: 120.9, rv:  77.3, wti:  87.25 },
        { date: "2026-03-12", ovx: 120.2, rv:  82.0, wti:  95.73 },
        { date: "2026-03-13", ovx: 119.0, rv:  80.0, wti:  98.71 },
        { date: "2026-03-16", ovx: 102.0, rv:  84.3, wti:  93.50 },
        { date: "2026-03-17", ovx:  95.9, rv:  83.7, wti:  96.21 },
        { date: "2026-03-18", ovx:  97.3, rv:  83.5, wti:  96.32 },
        { date: "2026-03-19", ovx:  92.7, rv:  83.8, wti:  96.14 },
        { date: "2026-03-20", ovx:  91.9, rv:  83.5, wti:  98.32 },
        { date: "2026-03-23", ovx:  89.8, rv:  95.1, wti:  88.13 },
        { date: "2026-03-24", ovx:  89.3, rv:  95.3, wti:  92.35 },
        { date: "2026-03-25", ovx:  90.2, rv:  96.1, wti:  90.32 },
        { date: "2026-03-26", ovx:  92.4, rv:  96.4, wti:  94.48 },
        { date: "2026-03-27", ovx:  96.6, rv:  97.1, wti:  99.64 },
        { date: "2026-03-30", ovx:  95.8, rv:  96.0, wti: 102.88 },
        { date: "2026-03-31", ovx:  89.4, rv:  96.1, wti: 101.38 },
        { date: "2026-04-01", ovx:  91.8, rv:  96.5, wti: 100.12 },
        { date: "2026-04-02", ovx:  93.1, rv:  99.4, wti: 111.54 },
        { date: "2026-04-06", ovx:  96.1, rv:  92.2, wti: 112.41 },
        { date: "2026-04-07", ovx:  98.8, rv:  91.5, wti: 112.95 },
        { date: "2026-04-08", ovx:  83.9, rv: 102.9, wti:  94.41 },
        { date: "2026-04-09", ovx:  81.7, rv: 102.5, wti:  97.87 },
        { date: "2026-04-10", ovx:  78.0, rv:  97.4, wti:  96.57 },
        { date: "2026-04-13", ovx:  80.6, rv:  97.2, wti:  99.08 },
        { date: "2026-04-14", ovx:  75.4, rv:  99.7, wti:  91.28 },
        { date: "2026-04-15", ovx:  72.2, rv:  99.1, wti:  91.29 },
        { date: "2026-04-16", ovx:  73.0, rv: 100.1, wti:  94.69 },
        { date: "2026-04-17", ovx:  69.0, rv: 108.9, wti:  83.85 },
        { date: "2026-04-20", ovx:  73.8, rv: 111.5, wti:  89.61 },
        { date: "2026-04-21", ovx:  85.6, rv: 104.9, wti:  92.13 },
        { date: "2026-04-22", ovx:  76.8, rv: 103.6, wti:  92.96 },
        { date: "2026-04-23", ovx:  79.4, rv: 104.0, wti:  96.44 },
      ],
    },
  },
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
      "WTI fell nearly 8% this week as the market continued to unwind the geopolitical risk premium that previously drove prices above $95. Product markets remain firm — gasoline drew 6.33 MMbbl, distillates fell 3.12 MMbbl, and crack spreads remain elevated at $47.55 — but physical strength is being overshadowed by event-driven repricing. Until the CL1–CL2 spread stabilizes, price action remains macro-led rather than fundamentally led.",
    inventory: {
      crude:      { actual: -0.91, expected: -1.61, fiveYearAvg: -0.80, surprise: 0.70 },
      gasoline:   { actual: -6.33, expected: -1.47, fiveYearAvg: -1.20, surprise: -4.86 },
      distillates:{ actual: -3.12, expected: -1.97, fiveYearAvg: -1.10, surprise: -1.15 },
      cushing:    { actual: -1.73, expected: -0.82 },
      spr: 373.1,
    },
    curveStructure: {
      cl1Price: 94.69,
      cl2Price: 90.50,
      spread: 4.19,
      spreadChange: -1.01,
      structure: "BACKWARDATION",
      brentWtiSpread: 4.70,
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
        { day: "Apr 16", value: 4.19 },
      ],
      brentWtiHistory: [
        { day: "Jan 18", value:  4.69 },
        { day: "Jan 25", value:  4.81 },
        { day: "Feb 1",  value:  5.48 },
        { day: "Feb 8",  value:  4.50 },
        { day: "Feb 15", value:  4.86 },
        { day: "Feb 22", value:  5.37 },
        { day: "Mar 1",  value:  5.46 },
        { day: "Mar 8",  value:  1.79 },
        { day: "Mar 15", value:  4.43 },
        { day: "Mar 22", value: 13.87 },
        { day: "Mar 29", value: 12.93 },
        { day: "Apr 5",  value: -2.51 },
        { day: "Apr 12", value: -1.37 },
        { day: "Apr 19", value:  4.70 },
      ],
    },
    crackSpreads: {
      crackSpread321: 47.55,
      crackSpreadChange: 6.29,
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
        value: "+$4.19 (WoW -$1.01)",
        direction: "bear",
        weight: "HIGH",
        note: "Spread compressing -$1.01 WoW (5.20 → 4.19) — moderate backwardation, geopolitical risk premium continuing to unwind",
      },
      {
        name: "3-2-1 Crack Spread",
        value: "$47.55/bbl (WoW +$6.29)",
        direction: "bull",
        weight: "MEDIUM",
        note: "Cracks rose WoW — strong downstream demand signal, refining margins remain elevated",
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
      "Classic divergence: products printing bullish (gasoline -6.33 MMbbl, distillates -3.12 MMbbl) while price craters 8%. The CL1–CL2 spread has compressed from a peak of $7.94 to $4.19 — a sustained unwind of the geopolitical risk premium as the ceasefire removes the Hormuz risk bid. Physical demand did not cause this move. Geopolitics did. Until a new catalyst emerges, price leads fundamentals.",
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
        rationale: "Spread at $4.19 — moderate backwardation but trend is lower. A bounce to $5.00–5.50 without new geopolitical catalyst is a spread-short entry. Target compression toward contango.",
        entry: "$5.00–5.50",
        target: "$1.50–2.00",
        stop: "$6.50",
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
    wtiPriceAtPublish: 94.69,
    wtiWeeklyChange: -7.95,
    cotPositioning: {
      managedMoneyNetLength: 98,
      wowChange: 20,
      oneYearPercentile: 75,
      signal: "LONG_BUILD",
      interpretation:
        "Managed money added 20k contracts WoW, lifting net longs to +98k — now at the 75th percentile of the 52-week range (P25: 13k / P75: 98k). This marks a decisive rebuild from the Sep–Oct 2025 washout lows (nadir −38k). Gross longs rose to 200k while gross shorts remain elevated at 102k, suggesting bulls are adding new exposure rather than simply covering shorts. Positioning is now in the top quartile of the 1-year range, which compresses the marginal upside from further spec-buying but confirms the structural long bias returning to WTI after months of aggressive de-risking.",
      chartData: [
        { week: "Dec 30", netLength:  16 },
        { week: "Jan 6",  netLength:  25 },
        { week: "Jan 13", netLength:  48 },
        { week: "Jan 20", netLength:  48 },
        { week: "Jan 27", netLength:  59 },
        { week: "Feb 3",  netLength:  77 },
        { week: "Feb 10", netLength:  79 },
        { week: "Feb 17", netLength:  64 },
        { week: "Feb 24", netLength:  68 },
        { week: "Mar 3",  netLength:  68 },
        { week: "Mar 10", netLength:  92 },
        { week: "Mar 17", netLength:  96 },
        { week: "Mar 24", netLength:  94 },
        { week: "Mar 31", netLength:  73 },
        { week: "Apr 7",  netLength:  79 },
        { week: "Apr 14", netLength:  98 },
      ],
    },
    volatility: {
      ovxLevel: 73.0,
      wowChange: -8.7,
      oneYearPercentile: 74.6,
      realizedVol20D: 100.1,
      vrp: -27.1,
      regime: "PANIC_REVERSING",
      history: [
        { date: "2026-01-02", ovx:  28.4, rv:  23.2, wti:  57.32 },
        { date: "2026-01-05", ovx:  29.4, rv:  23.7, wti:  58.32 },
        { date: "2026-01-06", ovx:  30.1, rv:  24.4, wti:  57.13 },
        { date: "2026-01-07", ovx:  33.0, rv:  24.4, wti:  55.99 },
        { date: "2026-01-08", ovx:  35.8, rv:  26.9, wti:  57.76 },
        { date: "2026-01-09", ovx:  36.8, rv:  28.2, wti:  59.12 },
        { date: "2026-01-12", ovx:  38.9, rv:  27.7, wti:  59.50 },
        { date: "2026-01-13", ovx:  40.4, rv:  29.1, wti:  61.15 },
        { date: "2026-01-14", ovx:  44.2, rv:  28.8, wti:  62.02 },
        { date: "2026-01-15", ovx:  42.1, rv:  32.2, wti:  59.19 },
        { date: "2026-01-16", ovx:  43.2, rv:  32.1, wti:  59.44 },
        { date: "2026-01-20", ovx:  42.8, rv:  32.4, wti:  60.34 },
        { date: "2026-01-21", ovx:  45.5, rv:  32.3, wti:  60.62 },
        { date: "2026-01-22", ovx:  44.7, rv:  32.5, wti:  59.36 },
        { date: "2026-01-23", ovx:  47.6, rv:  33.9, wti:  61.07 },
        { date: "2026-01-26", ovx:  47.8, rv:  34.0, wti:  60.63 },
        { date: "2026-01-27", ovx:  49.6, rv:  33.3, wti:  62.39 },
        { date: "2026-01-28", ovx:  50.4, rv:  32.8, wti:  63.21 },
        { date: "2026-01-29", ovx:  55.4, rv:  34.4, wti:  65.42 },
        { date: "2026-01-30", ovx:  55.9, rv:  34.1, wti:  65.21 },
        { date: "2026-02-02", ovx:  48.7, rv:  39.1, wti:  62.14 },
        { date: "2026-02-03", ovx:  52.3, rv:  39.1, wti:  63.21 },
        { date: "2026-02-04", ovx:  55.1, rv:  39.0, wti:  65.14 },
        { date: "2026-02-05", ovx:  55.0, rv:  39.9, wti:  63.29 },
        { date: "2026-02-06", ovx:  53.2, rv:  38.8, wti:  63.55 },
        { date: "2026-02-09", ovx:  50.8, rv:  38.3, wti:  64.36 },
        { date: "2026-02-10", ovx:  48.0, rv:  38.5, wti:  63.96 },
        { date: "2026-02-11", ovx:  44.3, rv:  37.6, wti:  64.63 },
        { date: "2026-02-12", ovx:  42.0, rv:  38.9, wti:  62.84 },
        { date: "2026-02-13", ovx:  42.2, rv:  34.6, wti:  62.89 },
        { date: "2026-02-17", ovx:  42.5, rv:  34.9, wti:  62.33 },
        { date: "2026-02-18", ovx:  51.5, rv:  37.8, wti:  65.19 },
        { date: "2026-02-19", ovx:  56.7, rv:  38.2, wti:  66.43 },
        { date: "2026-02-20", ovx:  56.1, rv:  37.0, wti:  66.39 },
        { date: "2026-02-23", ovx:  59.1, rv:  36.1, wti:  66.31 },
        { date: "2026-02-24", ovx:  58.8, rv:  36.2, wti:  65.63 },
        { date: "2026-02-25", ovx:  59.0, rv:  35.1, wti:  65.42 },
        { date: "2026-02-26", ovx:  59.8, rv:  34.9, wti:  65.21 },
        { date: "2026-02-27", ovx:  64.7, rv:  34.1, wti:  67.02 },
        { date: "2026-03-02", ovx:  68.9, rv:  40.1, wti:  71.23 },
        { date: "2026-03-03", ovx:  74.0, rv:  37.5, wti:  74.56 },
        { date: "2026-03-04", ovx:  75.2, rv:  37.5, wti:  74.66 },
        { date: "2026-03-05", ovx:  83.8, rv:  45.1, wti:  81.01 },
        { date: "2026-03-06", ovx: 103.6, rv:  56.0, wti:  90.90 },
        { date: "2026-03-09", ovx: 100.5, rv:  56.3, wti:  94.77 },
        { date: "2026-03-10", ovx: 108.2, rv:  76.9, wti:  83.45 },
        { date: "2026-03-11", ovx: 120.9, rv:  77.3, wti:  87.25 },
        { date: "2026-03-12", ovx: 120.2, rv:  82.0, wti:  95.73 },
        { date: "2026-03-13", ovx: 119.0, rv:  80.0, wti:  98.71 },
        { date: "2026-03-16", ovx: 102.0, rv:  84.3, wti:  93.50 },
        { date: "2026-03-17", ovx:  95.9, rv:  83.7, wti:  96.21 },
        { date: "2026-03-18", ovx:  97.3, rv:  83.5, wti:  96.32 },
        { date: "2026-03-19", ovx:  92.7, rv:  83.8, wti:  96.14 },
        { date: "2026-03-20", ovx:  91.9, rv:  83.5, wti:  98.32 },
        { date: "2026-03-23", ovx:  89.8, rv:  95.1, wti:  88.13 },
        { date: "2026-03-24", ovx:  89.3, rv:  95.3, wti:  92.35 },
        { date: "2026-03-25", ovx:  90.2, rv:  96.1, wti:  90.32 },
        { date: "2026-03-26", ovx:  92.4, rv:  96.4, wti:  94.48 },
        { date: "2026-03-27", ovx:  96.6, rv:  97.1, wti:  99.64 },
        { date: "2026-03-30", ovx:  95.8, rv:  96.0, wti: 102.88 },
        { date: "2026-03-31", ovx:  89.4, rv:  96.1, wti: 101.38 },
        { date: "2026-04-01", ovx:  91.8, rv:  96.5, wti: 100.12 },
        { date: "2026-04-02", ovx:  93.1, rv:  99.4, wti: 111.54 },
        { date: "2026-04-06", ovx:  96.1, rv:  92.2, wti: 112.41 },
        { date: "2026-04-07", ovx:  98.8, rv:  91.5, wti: 112.95 },
        { date: "2026-04-08", ovx:  83.9, rv: 102.9, wti:  94.41 },
        { date: "2026-04-09", ovx:  81.7, rv: 102.5, wti:  97.87 },
        { date: "2026-04-10", ovx:  78.0, rv:  97.4, wti:  96.57 },
        { date: "2026-04-13", ovx:  80.6, rv:  97.2, wti:  99.08 },
        { date: "2026-04-14", ovx:  75.4, rv:  99.7, wti:  91.28 },
        { date: "2026-04-15", ovx:  72.2, rv:  99.1, wti:  91.29 },
        { date: "2026-04-16", ovx:  73.0, rv: 100.1, wti:  94.69 },
      ],
    },
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
      brentWtiHistory: [
        { day: "Jan 9",  value: 4.10 },
        { day: "Jan 16", value: 4.25 },
        { day: "Jan 23", value: 4.40 },
        { day: "Jan 30", value: 4.20 },
        { day: "Feb 6",  value: 3.95 },
        { day: "Feb 13", value: 4.05 },
        { day: "Feb 20", value: 4.35 },
        { day: "Feb 27", value: 4.60 },
        { day: "Mar 6",  value: 5.10 },
        { day: "Mar 13", value: 5.80 },
        { day: "Mar 20", value: 6.50 },
        { day: "Mar 27", value: 7.20 },
        { day: "Apr 3",  value: 7.90 },
        { day: "Apr 9",  value: 3.85 },
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
    cotPositioning: {
      managedMoneyNetLength: 79,
      wowChange: 5,
      oneYearPercentile: 55,
      signal: "LONG_BUILD",
      interpretation:
        "Managed money added 5k contracts WoW to +79k net long as of Apr 7 — 55th percentile of the 52-week range. The gradual rebuild from late-2025 lows (−38k in Oct) is continuing, but the pace is measured rather than aggressive. Gross longs at 187k and gross shorts at 108k suggest a cautious long-side tone, consistent with a market that sees value but lacks a fresh catalyst to accelerate positioning.",
      chartData: [
        { week: "Dec 30", netLength:  16 },
        { week: "Jan 6",  netLength:  25 },
        { week: "Jan 13", netLength:  48 },
        { week: "Jan 20", netLength:  48 },
        { week: "Jan 27", netLength:  59 },
        { week: "Feb 3",  netLength:  77 },
        { week: "Feb 10", netLength:  79 },
        { week: "Feb 17", netLength:  64 },
        { week: "Feb 24", netLength:  68 },
        { week: "Mar 3",  netLength:  68 },
        { week: "Mar 10", netLength:  92 },
        { week: "Mar 17", netLength:  96 },
        { week: "Mar 24", netLength:  94 },
        { week: "Mar 31", netLength:  73 },
        { week: "Apr 7",  netLength:  79 },
      ],
    },
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
      brentWtiHistory: [
        { day: "Jan 9",  value: 3.50 },
        { day: "Jan 16", value: 3.65 },
        { day: "Jan 23", value: 3.75 },
        { day: "Jan 30", value: 3.60 },
        { day: "Feb 6",  value: 3.45 },
        { day: "Feb 13", value: 3.70 },
        { day: "Feb 20", value: 3.85 },
        { day: "Feb 27", value: 3.90 },
        { day: "Mar 6",  value: 4.00 },
        { day: "Mar 13", value: 3.80 },
        { day: "Mar 20", value: 3.70 },
        { day: "Mar 28", value: 3.95 },
        { day: "Apr 4",  value: 4.45 },
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
      brentWtiHistory: [
        { day: "Dec 26", value: 3.20 },
        { day: "Jan 2",  value: 3.35 },
        { day: "Jan 9",  value: 3.50 },
        { day: "Jan 16", value: 3.65 },
        { day: "Jan 23", value: 3.75 },
        { day: "Jan 30", value: 3.60 },
        { day: "Feb 6",  value: 3.45 },
        { day: "Feb 13", value: 3.70 },
        { day: "Feb 20", value: 3.85 },
        { day: "Feb 27", value: 3.90 },
        { day: "Mar 6",  value: 4.00 },
        { day: "Mar 13", value: 3.80 },
        { day: "Mar 20", value: 3.70 },
        { day: "Mar 28", value: 3.95 },
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
  { weekEnding: "April 30, 2026", call: "BEARISH", outcome: "WIN",  wtiReturn:  4.10, rValue:  1.70, notes: "Short Brent / Long WTI — spread compressed $9.03 → $5.50. Target met. +1.7R · Portfolio: +1.7%" },
  { weekEnding: "April 28, 2026", call: "BEARISH", outcome: "LOSS", wtiReturn:  0.04, rValue: -0.08, notes: 'Iron Condor ("Hormuz Deadlock") — closed at $2.70 vs $2.50 credit. –8% premium. –0.08R · Portfolio: –0.04%' },
];

export function getPerformanceMetrics(): PerformanceMetrics {
  const completed = callHistory.filter((c) => c.outcome !== "OPEN");
  const wins = completed.filter((c) => c.outcome === "WIN").length;
  const losses = completed.filter((c) => c.outcome === "LOSS").length;
  const pushes = completed.filter((c) => c.outcome === "PUSH").length;
  const openTrades = callHistory.filter((c) => c.outcome === "OPEN").length;

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

  const sinceInceptionR = parseFloat(completed.reduce((sum, c) => sum + c.rValue, 0).toFixed(2));
  const avgRPerTrade = completed.length > 0 ? parseFloat((sinceInceptionR / completed.length).toFixed(2)) : 0;

  const bullishWinRate = bullCalls.length > 0 ? Math.round((bullWins / bullCalls.length) * 100) : 0;
  const bearishWinRate = bearCalls.length > 0 ? Math.round((bearWins / bearCalls.length) * 100) : 0;
  const bestStrategy = "Short Brent / Long WTI";

  const winTrades = completed.filter((c) => c.outcome === "WIN");
  const lossTrades = completed.filter((c) => c.outcome === "LOSS");
  const avgWinR = winTrades.length > 0
    ? parseFloat((winTrades.reduce((sum, c) => sum + c.rValue, 0) / winTrades.length).toFixed(2))
    : 0;
  const avgLossR = lossTrades.length > 0
    ? parseFloat((lossTrades.reduce((sum, c) => sum + c.rValue, 0) / lossTrades.length).toFixed(2))
    : 0;
  const largestWinR = winTrades.length > 0 ? Math.max(...winTrades.map((c) => c.rValue)) : 0;
  const largestLossR = lossTrades.length > 0 ? Math.min(...lossTrades.map((c) => c.rValue)) : 0;

  return {
    totalCalls: completed.length,
    totalTrades: callHistory.length,
    wins,
    losses,
    pushes,
    openTrades,
    winRate: wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0,
    sinceInceptionR,
    avgRPerTrade,
    avgWtiReturn: Math.round(avgReturn * 100) / 100,
    bullishCalls: bullCalls.length,
    bullishWinRate,
    bearishCalls: bearCalls.length,
    bearishWinRate,
    divergentRegimeWinRate: 72,
    lowConvictionAccuracy: 58,
    highConvictionAccuracy: 83,
    bestStrategy,
    avgWinR,
    avgLossR,
    largestWinR,
    largestLossR,
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

export const openTrades: OpenTrade[] = [];

export const closedTrades: ClosedTrade[] = [
  {
    id: "CT-001",
    title: "Short Brent / Long WTI",
    conviction: "HIGH",
    sizeR: 1.0,
    entry: "$9.00 (0.5R) + $10.75 (0.5R)",
    exit: "$5.50",
    realizedR: 1.7,
    openedDate: "Apr 24, 2026",
    closedDate: "Apr 30, 2026",
    outcome: "WIN",
    notes: "Target met at $5.50 spread. Return: +4.1% · Portfolio impact: +1.7%",
  },
  {
    id: "CT-002",
    title: 'Iron Condor ("Hormuz Deadlock")',
    conviction: "MEDIUM",
    sizeR: 0.5,
    entry: "$2.50 credit",
    exit: "$2.70",
    realizedR: -0.08,
    openedDate: "Apr 24, 2026",
    closedDate: "Apr 28, 2026",
    outcome: "LOSS",
    notes: "Closed at $2.70 vs $2.50 entry credit. PnL: –$0.20 (–8% of premium). Portfolio impact: –0.04%",
  },
];

export const strategyBreakdown: StrategyBreakdown[] = [
  { strategy: "Spread",  trades: 1, winRate: 100, avgR:  1.70 },
  { strategy: "Options", trades: 1, winRate:   0, avgR: -0.08 },
];

export const convictionStats: ConvictionStat[] = [
  { conviction: "HIGH",   trades: 1, winRate: 100 },
  { conviction: "MEDIUM", trades: 1, winRate:   0 },
];
