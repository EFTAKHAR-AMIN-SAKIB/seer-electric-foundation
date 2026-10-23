export type ThemeMode = 'dark' | 'light';

export type PageRoute = 'home' | 'app' | 'deep' | 'futarchy' | 'opportunity' | 'risk' | 'rationale';

export type MarketCategory =
  | 'All'
  | 'Elections'
  | 'Politics'
  | 'Business'
  | 'Science'
  | 'Crypto'
  | 'Pop Culture'
  | 'Sports'
  | 'DOGE'
  | 'Weather'
  | 'AI'
  | 'Macro/Fed'
  | 'DeFi Risk';

export type MarketType = 'binary' | 'multi-categorical' | 'fast-binary' | 'head-to-head' | 'scalar';

export interface MarketOutcome {
  id: string;
  name: string;
  probability: number; // 0.00 to 1.00 (MUST strictly conserve sum = 1.00)
  priceCents: number;  // 0 to 100
  volumeUsd: number;
  change24h: number;
  color?: string;
}

export interface Market {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: MarketCategory;
  type: MarketType;
  outcomes: MarketOutcome[];
  volumeUsd: number;
  liquidityUsd: number;
  collateralToken: 'sDAI' | 'sUSDS';
  chainId: 100 | 1; // 100 = Gnosis Chain, 1 = Ethereum Mainnet
  networkName: 'Gnosis Chain' | 'Ethereum Mainnet';
  resolutionDate: string;
  realityQuestionId: string;
  realityBond: number; // in sDAI/sUSDS
  escalationTimeoutHours: number;
  arbitrator: string;
  conditionId: string;
  ammPool: string;
  status: 'Open' | 'In Escalation' | 'Resolving' | 'Disputed' | 'Finalized';
  featured?: boolean;
  live?: boolean;
  matchInfo?: string; // e.g. "9:00PM • World Cup" or "LoL • 7:10 PM"
  sparkline: number[];
}

export interface TradePosition {
  id: string;
  marketId: string;
  marketTitle: string;
  outcomeName: string;
  direction: 'YES' | 'NO' | 'UP' | 'DOWN';
  shares: number;
  avgPriceCents: number;
  investedUsd: number;
  currentValueUsd: number;
  pnlUsd: number;
  pnlPercent: number;
  accruedYieldUsd: number;
  collateralToken: 'sDAI' | 'sUSDS';
  timestamp: number;
}

export interface DeepProjectNode {
  id: string;
  name: string;
  symbol: string;
  tag: string;
  description: string;
  originalityScore: number; // 0.00 to 1.00
  weight: number; // 0.000 to 1.000 (edge weight in DAG)
  confidence: number; // 0% to 100%
  delta24h: number;
  upstreamDependencies: { targetId: string; weight: number }[];
  aiScore: number;
  humanScore: number;
  aiSummary: string;
  jurorStakePoolUsd: number;
  activeJurors: number;
  repoUrl: string;
}

export interface DeepAIAgent {
  id: string;
  name: string;
  model: string;
  brierScore: number; // lower is better (0.00 to 1.00)
  totalEvaluations: number;
  stakedBondUsd: number;
  status: 'Active' | 'Calibrating';
}

export interface FutarchyProposal {
  id: string;
  code: string; // e.g. "GIP-104"
  title: string;
  proposer: string;
  category: string;
  status: 'Active Voting' | 'Execution Pending' | 'Executed' | 'Rejected';
  metricName: string;
  metricSymbol: string;
  currentMetricValue: number;
  passForecast: number;
  failForecast: number;
  metricDeltaPercent: number; // (pass - fail) / fail * 100
  decisionThresholdPercent: number; // e.g. +3.0%
  passProbability: number;
  failProbability: number;
  volumeUsd: number;
  collateralRefundedOnReject: boolean; // invariant proof
  endDate: string;
  autoExecuteCalldata: string;
  targetContract: string;
  passHistory: number[];
  failHistory: number[];
  realityBondUsd: number;
}

export interface OpportunitySubmission {
  id: string;
  title: string;
  track: 'Infra' | 'DeFi' | 'AI & Agents' | 'Privacy' | 'Consumer';
  team: string;
  marketProbability: number; // 0 to 100%
  triagePriorityScore: number; // 0 to 100
  triageStatus: 'Awaiting Review' | 'In Committee Triage' | 'Interview Scheduled' | 'Selected' | 'Rejected';
  liquidityUsd: number;
  reviewerVelocity: number; // 1 to 10
  scoutVolumeUsd: number;
  summary: string;
  repoUrl: string;
  technicalScore?: number;
  feasibilityScore?: number;
  impactScore?: number;
}

export interface RiskSeverityTier {
  severityLabel: string;
  lossCutoff: string;
  haircutPercent: number;
  impliedProb30d: number;
  impliedProb90d: number;
  impliedProb180d: number;
  impliedProb365d: number;
  annualPremiumApy: number;
  capacityUsd: number;
}

export interface RiskProtocol {
  id: string;
  name: string;
  asset: string;
  category: 'LST/LRT' | 'Synthetic Dollar' | 'CDP/Stablecoin' | 'Lending Market' | 'Cross-Chain Bridge';
  tvlUsd: number;
  baseYieldApy: number;
  tiers: RiskSeverityTier[];
}

export interface UserWallet {
  address: string | null;
  isConnected: boolean;
  network: 'Gnosis Chain' | 'Ethereum Mainnet';
  chainId: 100 | 1;
  balances: {
    sDAI: number;
    sUSDS: number;
    xDAI: number;
    SEER: number;
  };
  positions: TradePosition[];
}
