export interface UXDeparture {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  figmaFlaw: string;
  seerSolution: string;
  cognitiveRationale: string;
  protocolMath: string;
  tokensUsed: string[];
}

export const SEER_7_DEPARTURES: UXDeparture[] = [
  {
    id: 1,
    number: '01',
    title: 'Strict Semantic Signal Tokens vs Monochromatic Violet',
    subtitle: 'Directional Clarity in High-Velocity Trading',
    figmaFlaw: 'In the raw Electric Foundation Figma kit mock, outcome buttons for both YES and NO (or UP and DOWN) are rendered in uniform Electric Violet (#7D33FF). This creates severe visual ambiguity, forcing users to read micro-labels under high cognitive load.',
    seerSolution: 'We introduce strict semantic color separation: Electric Emerald (#00F59B in Dark, #059669 in Light) exclusively for YES / UP / PASS, and Electric Coral (#FF4D6D in Dark, #E11D48 in Light) for NO / DOWN / FAIL. Electric Violet (#7D33FF) is strictly reserved for brand hierarchy, protocol navigation, and primary system actions.',
    cognitiveRationale: 'Preattentive visual processing research shows human reaction times to color-coded polar signals are 180ms faster than monochrome button labels. In high-speed 5-minute binary markets or sudden breaking news, monochromatic buttons lead directly to catastrophic fat-finger trading errors.',
    protocolMath: 'Color Signal Separation: YES ∈ { #00F59B, #059669 } (Hue ~158°), NO ∈ { #FF4D6D, #E11D48 } (Hue ~347°). Delta E (CIELAB) >= 48.2, ensuring instant neuro-perceptual discrimination.',
    tokensUsed: ['--signal-yes', '--signal-yes-soft', '--signal-no', '--signal-no-soft', '--ef-violet']
  },
  {
    id: 2,
    number: '02',
    title: 'Strict Mathematical Probability Conservation ($1.00 Invariant)',
    subtitle: 'Eliminating the 106% Arbitrage Bug in Raw Figma Cards',
    figmaFlaw: 'In the raw Figma board (node 118-16652), a binary market card displays "Yes 69¢" and "No 37¢". Summing these prices yields 106¢ ($1.06), which mathematically violates the fundamental axiom of prediction markets (sum of disjoint probabilities cannot exceed 1.00).',
    seerSolution: 'We enforce absolute probability conservation across all six interfaces: for binary markets, P(Yes) + P(No) = 100.0¢ ($1.00). For multi-categorical markets (World Cup, Elections), outcome prices sum strictly to 100%. In Deep, seed weights W(T → S) sum to 1.000.',
    cognitiveRationale: 'Traders in Web3 instantly lose confidence in platforms exhibiting impossible odds arithmetic. Conservation builds institutional credibility and prevents confusion regarding payout rates.',
    protocolMath: '\\sum_{i=1}^{N} P(O_i) = 1.000 \\iff \\forall i, P(O_i) = \\frac{e^{s_i}}{\\sum_j e^{s_j}} \\quad \\text{and} \\quad \\text{Price}(\\text{YES}) + \\text{Price}(\\text{NO}) = \\$1.00',
    tokensUsed: ['--text-primary', '--border-focus', '--signal-yes', '--signal-no']
  },
  {
    id: 3,
    number: '03',
    title: 'Yield-Bearing Collateral Integration (sDAI & sUSDS)',
    subtitle: 'Zero Idle Capital During Long Resolution Windows',
    figmaFlaw: 'The raw Figma mock presents flat, static currency figures with no awareness of capital efficiency or underlying blockchain infrastructure.',
    seerSolution: 'We embed Seer\'s real protocol primitives directly into trade tickets, position drawers, and card badges: yield-bearing sDAI (Gnosis Chain, ~5.2% APY via Maker/Spark) and sUSDS (Ethereum Mainnet, ~4.8% APY). Bettors and underwriting liquidity providers accrue interest every second while awaiting market settlement.',
    cognitiveRationale: 'Traditional prediction markets trap capital in non-productive escrow for weeks or months. By surfacing continuous yield accrual, Seer transforms prediction markets into high-yield financial instruments.',
    protocolMath: 'R_{\\text{total}} = \\text{Payout}(\\text{Outcome}) + \\int_0^T C_0 \\cdot r_{\\text{sDAI}}(t) \\, dt, \\quad r_{\\text{sDAI}} \\approx 5.20\\% \\text{ APY}',
    tokensUsed: ['--bg-card', '--border-subtle', '--ef-violet', '--signal-cyan']
  },
  {
    id: 4,
    number: '04',
    title: 'High-Density "Etherscan-Grade" Terminal View',
    subtitle: 'Institutional Telemetry vs Superficial Gambling Cards',
    figmaFlaw: 'Raw Figma mocks only include consumer sports-betting card tiles, lacking essential cryptographic and smart contract verification tools necessary for high-volume traders and DAOs.',
    seerSolution: 'We engineered an instantaneous Grid / Table toggle. The Table view delivers high-density, Etherscan-grade telemetry: Reality.eth question IDs, condition IDs, AMM liquidity depth, 24h volume, bond escalation status, and arbitrator contract links.',
    cognitiveRationale: 'Professional market makers, DAO treasuries, and automated arbitrageurs require data density, sortable columns, and one-click copyable contract addresses to verify on-chain settlement security.',
    protocolMath: 'CTF Condition ID: C = \\text{keccak256}(\\text{Oracle}, \\text{QuestionId}, \\text{OutcomeSlotCount}). Wrapped ERC-20 token IDs mapped 1:1 with AMM reserves.',
    tokensUsed: ['--bg-elevated', '--border-subtle', '--text-muted', '--font-mono']
  },
  {
    id: 5,
    number: '05',
    title: 'Distilled Human Judgment (Deep AI-Agent + Human Juror Symbiosis)',
    subtitle: 'Solving High-Cardinality Multi-Scalar Evaluation',
    figmaFlaw: 'Standard prediction markets fail when cardinality exceeds 5-10 discrete outcomes. Evaluating 50 open-source repositories or retroactive grant recipients is impossible on binary AMMs.',
    seerSolution: 'We designed Seer Deep (/deep), where autonomous AI agents (Claude, DeepSeek, Vitalik-Bot) analyze code telemetry to seed Directed Acyclic Graph (DAG) weights, while human prediction market jurors stake on scalar UP/DOWN tokens to correct algorithmic hallucinations, yielding "Distilled Human Judgment".',
    cognitiveRationale: 'Pure AI evaluation is vulnerable to sybil commits and metric-gaming; pure human evaluation suffers from reviewer burnout and cognitive bias. Symbiotic co-evaluation achieves unprecedented scalability and objectivity.',
    protocolMath: 'W_j^* = (1 - \\alpha) W_{\\text{AI}, j} + \\alpha \\cdot \\frac{\\sum_k S_{k, j} \\cdot \\text{Rep}_k}{\\sum_k \\text{Rep}_k}, \\quad \\sum_{j=1}^M W_j = 1.000',
    tokensUsed: ['--signal-cyan', '--ef-violet', '--bg-abyss', '--signal-yes']
  },
  {
    id: 6,
    number: '06',
    title: 'Dual Counterfactual Governance Invariants (Futarchy)',
    subtitle: 'Capital Protection on Unchosen Branches',
    figmaFlaw: 'Figma mockups have no framework for conditional governance markets (IF PASS vs IF FAIL) or counterfactual outcome settlement.',
    seerSolution: 'We architected Seer Futarchy (/futarchy): DAOs vote on values and bet on beliefs. Markets predict metric performance IF PASS and IF FAIL. Critically, we enforce the Capital Protection Invariant: bets on the unselected branch are 100% refunded, so participants never lose capital on counterfactual branches that do not materialize.',
    cognitiveRationale: 'Fear of capital loss on unchosen branches prevents voters from betting honestly in conditional markets. Guaranteed conditional refund unlocks pure truth-telling incentives.',
    protocolMath: '\\text{If } \\mathbb{E}[M \\mid \\text{PASS}] - \\mathbb{E}[M \\mid \\text{FAIL}] > \\theta, \\text{ then Execute } \\mathcal{T}_{\\text{Zodiac}} \\text{ and Refund } \\text{FAIL branch 1:1}.',
    tokensUsed: ['--signal-yes', '--signal-no', '--ef-violet-deep', '--bg-card']
  },
  {
    id: 7,
    number: '07',
    title: 'Multi-Dimensional Tail-Risk Surface & Net-Yield Hedge Calculator',
    subtitle: 'Loss Severity Ladders x Time Horizons with sDAI Yield Offsets',
    figmaFlaw: 'Raw Figma mockups treat risk as a one-dimensional binary sports prop without severity tiers, duration axes, or portfolio integration.',
    seerSolution: 'We built the Risk Pricing Matrix (/risk): cross-protocol DeFi tail-risk priced across a 2D surface of loss severity tiers (>10% to >90%) and time horizons (30d to 365d). An interactive Portfolio Hedge Calculator demonstrates how sDAI collateral yield (5.2%) offsets gross hedge premiums, delivering Net-Yield Positive Hedging.',
    cognitiveRationale: 'DeFi protocols rarely fail binary; they suffer haircuts, depegs, and insolvencies of varying severity. Discrete severity ladders let treasuries hedge exactly the tail-risk tier they fear without overpaying.',
    protocolMath: '\\text{Net Hedge Cost} = \\sum_i P_i \\cdot \\text{Premium}_i - \\text{Collateral} \\cdot r_{\\text{sDAI}} \\implies \\text{Net Effective APY} > 0\\%',
    tokensUsed: ['--signal-warn', '--signal-no', '--signal-yes', '--bg-ground']
  }
];
