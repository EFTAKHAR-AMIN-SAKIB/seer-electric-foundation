import { RiskProtocol } from '../types';

export const MOCK_RISK_PROTOCOLS: RiskProtocol[] = [
  {
    id: 'risk-usds',
    name: 'MakerDAO / Sky USDS',
    asset: 'sUSDS',
    category: 'CDP/Stablecoin',
    tvlUsd: 6800000000,
    baseYieldApy: 4.8,
    tiers: [
      {
        severityLabel: '>10% Depeg ($0.90)',
        lossCutoff: '10% Principal Loss',
        haircutPercent: 10,
        impliedProb30d: 0.12,
        impliedProb90d: 0.35,
        impliedProb180d: 0.72,
        impliedProb365d: 1.25,
        annualPremiumApy: 1.25,
        capacityUsd: 45000000
      },
      {
        severityLabel: '>25% Haircut ($0.75)',
        lossCutoff: '25% Principal Loss',
        haircutPercent: 25,
        impliedProb30d: 0.05,
        impliedProb90d: 0.18,
        impliedProb180d: 0.38,
        impliedProb365d: 0.65,
        annualPremiumApy: 0.65,
        capacityUsd: 38000000
      },
      {
        severityLabel: '>50% Insolvency ($0.50)',
        lossCutoff: '50% Principal Loss',
        haircutPercent: 50,
        impliedProb30d: 0.02,
        impliedProb90d: 0.08,
        impliedProb180d: 0.19,
        impliedProb365d: 0.32,
        annualPremiumApy: 0.32,
        capacityUsd: 25000000
      },
      {
        severityLabel: '>90% Total Loss ($0.10)',
        lossCutoff: '90% Principal Loss',
        haircutPercent: 90,
        impliedProb30d: 0.01,
        impliedProb90d: 0.03,
        impliedProb180d: 0.08,
        impliedProb365d: 0.14,
        annualPremiumApy: 0.14,
        capacityUsd: 18000000
      }
    ]
  },
  {
    id: 'risk-ethena',
    name: 'Ethena USDe Synthetic Dollar',
    asset: 'USDe',
    category: 'Synthetic Dollar',
    tvlUsd: 3200000000,
    baseYieldApy: 11.2,
    tiers: [
      {
        severityLabel: '>10% Depeg ($0.90)',
        lossCutoff: '10% Principal Loss',
        haircutPercent: 10,
        impliedProb30d: 0.48,
        impliedProb90d: 1.45,
        impliedProb180d: 2.80,
        impliedProb365d: 4.80,
        annualPremiumApy: 4.80,
        capacityUsd: 22000000
      },
      {
        severityLabel: '>25% Haircut ($0.75)',
        lossCutoff: '25% Principal Loss',
        haircutPercent: 25,
        impliedProb30d: 0.22,
        impliedProb90d: 0.75,
        impliedProb180d: 1.45,
        impliedProb365d: 2.50,
        annualPremiumApy: 2.50,
        capacityUsd: 18000000
      },
      {
        severityLabel: '>50% Insolvency ($0.50)',
        lossCutoff: '50% Principal Loss',
        haircutPercent: 50,
        impliedProb30d: 0.11,
        impliedProb90d: 0.38,
        impliedProb180d: 0.82,
        impliedProb365d: 1.40,
        annualPremiumApy: 1.40,
        capacityUsd: 14000000
      },
      {
        severityLabel: '>90% Total Loss ($0.10)',
        lossCutoff: '90% Principal Loss',
        haircutPercent: 90,
        impliedProb30d: 0.04,
        impliedProb90d: 0.16,
        impliedProb180d: 0.35,
        impliedProb365d: 0.62,
        annualPremiumApy: 0.62,
        capacityUsd: 9000000
      }
    ]
  },
  {
    id: 'risk-eigenlayer',
    name: 'EigenLayer LRT Restaking (eETH)',
    asset: 'eETH / ezETH',
    category: 'LST/LRT',
    tvlUsd: 11400000000,
    baseYieldApy: 3.9,
    tiers: [
      {
        severityLabel: '>10% Slashing / Depeg',
        lossCutoff: '10% Principal Loss',
        haircutPercent: 10,
        impliedProb30d: 0.28,
        impliedProb90d: 0.85,
        impliedProb180d: 1.70,
        impliedProb365d: 2.95,
        annualPremiumApy: 2.95,
        capacityUsd: 35000000
      },
      {
        severityLabel: '>25% Cascading Slashing',
        lossCutoff: '25% Principal Loss',
        haircutPercent: 25,
        impliedProb30d: 0.12,
        impliedProb90d: 0.40,
        impliedProb180d: 0.82,
        impliedProb365d: 1.45,
        annualPremiumApy: 1.45,
        capacityUsd: 28000000
      },
      {
        severityLabel: '>50% Protocol Freeze',
        lossCutoff: '50% Principal Loss',
        haircutPercent: 50,
        impliedProb30d: 0.05,
        impliedProb90d: 0.19,
        impliedProb180d: 0.42,
        impliedProb365d: 0.75,
        annualPremiumApy: 0.75,
        capacityUsd: 19000000
      },
      {
        severityLabel: '>90% Total Loss',
        lossCutoff: '90% Principal Loss',
        haircutPercent: 90,
        impliedProb30d: 0.02,
        impliedProb90d: 0.07,
        impliedProb180d: 0.18,
        impliedProb365d: 0.30,
        annualPremiumApy: 0.30,
        capacityUsd: 12000000
      }
    ]
  },
  {
    id: 'risk-aave',
    name: 'Aave v3 Core Lending Pool',
    asset: 'aToken Basket',
    category: 'Lending Market',
    tvlUsd: 14800000000,
    baseYieldApy: 4.1,
    tiers: [
      {
        severityLabel: '>10% Bad Debt Event',
        lossCutoff: '10% Principal Loss',
        haircutPercent: 10,
        impliedProb30d: 0.08,
        impliedProb90d: 0.24,
        impliedProb180d: 0.48,
        impliedProb365d: 0.85,
        annualPremiumApy: 0.85,
        capacityUsd: 65000000
      },
      {
        severityLabel: '>25% Bad Debt Event',
        lossCutoff: '25% Principal Loss',
        haircutPercent: 25,
        impliedProb30d: 0.03,
        impliedProb90d: 0.11,
        impliedProb180d: 0.22,
        impliedProb365d: 0.40,
        annualPremiumApy: 0.40,
        capacityUsd: 50000000
      },
      {
        severityLabel: '>50% Reserve Deficit',
        lossCutoff: '50% Principal Loss',
        haircutPercent: 50,
        impliedProb30d: 0.01,
        impliedProb90d: 0.05,
        impliedProb180d: 0.11,
        impliedProb365d: 0.20,
        annualPremiumApy: 0.20,
        capacityUsd: 35000000
      },
      {
        severityLabel: '>90% Critical Exploit',
        lossCutoff: '90% Principal Loss',
        haircutPercent: 90,
        impliedProb30d: 0.005,
        impliedProb90d: 0.02,
        impliedProb180d: 0.05,
        impliedProb365d: 0.09,
        annualPremiumApy: 0.09,
        capacityUsd: 25000000
      }
    ]
  },
  {
    id: 'risk-gnosis-bridge',
    name: 'Gnosis OmniBridge / Arbitrary Message Bridge',
    asset: 'xDAI / Bridged Tokens',
    category: 'Cross-Chain Bridge',
    tvlUsd: 380000000,
    baseYieldApy: 5.2,
    tiers: [
      {
        severityLabel: '>10% Relay Pause / Haircut',
        lossCutoff: '10% Principal Loss',
        haircutPercent: 10,
        impliedProb30d: 0.15,
        impliedProb90d: 0.45,
        impliedProb180d: 0.90,
        impliedProb365d: 1.55,
        annualPremiumApy: 1.55,
        capacityUsd: 15000000
      },
      {
        severityLabel: '>25% Validator Compromise',
        lossCutoff: '25% Principal Loss',
        haircutPercent: 25,
        impliedProb30d: 0.06,
        impliedProb90d: 0.20,
        impliedProb180d: 0.42,
        impliedProb365d: 0.72,
        annualPremiumApy: 0.72,
        capacityUsd: 12000000
      },
      {
        severityLabel: '>50% Bridge Drain',
        lossCutoff: '50% Principal Loss',
        haircutPercent: 50,
        impliedProb30d: 0.03,
        impliedProb90d: 0.09,
        impliedProb180d: 0.20,
        impliedProb365d: 0.35,
        annualPremiumApy: 0.35,
        capacityUsd: 8000000
      },
      {
        severityLabel: '>90% Total Vault Drain',
        lossCutoff: '90% Principal Loss',
        haircutPercent: 90,
        impliedProb30d: 0.01,
        impliedProb90d: 0.04,
        impliedProb180d: 0.09,
        impliedProb365d: 0.16,
        annualPremiumApy: 0.16,
        capacityUsd: 6000000
      }
    ]
  }
];
