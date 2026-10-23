import { DeepProjectNode, DeepAIAgent } from '../types';

export const MOCK_DEEP_NODES: DeepProjectNode[] = [
  {
    id: 'deep-eth-core',
    name: 'Ethereum Execution & Consensus Specs',
    symbol: 'ETH-SPEC',
    tag: 'Core Protocol Layer',
    description: 'Foundational state machine specifications, EIP consensus definitions, and execution clients (Geth, Nethermind, Besu, Reth).',
    originalityScore: 0.98,
    weight: 0.320,
    confidence: 96,
    delta24h: +0.015,
    upstreamDependencies: [],
    aiScore: 0.94,
    humanScore: 0.98,
    aiSummary: 'Top centrality in all EVM call-graphs. Pure mathematical upstream dependency. AI telemetry detected zero redundant external wrappers.',
    jurorStakePoolUsd: 1420000,
    activeJurors: 142,
    repoUrl: 'https://github.com/ethereum/consensus-specs'
  },
  {
    id: 'deep-solidity',
    name: 'Solidity Compiler & Yul IR Engine',
    symbol: 'SOLIDITY',
    tag: 'Compiler Infrastructure',
    description: 'High-level language compiler targetting EVM bytecode with intermediate representation optimization.',
    originalityScore: 0.91,
    weight: 0.210,
    confidence: 93,
    delta24h: +0.008,
    upstreamDependencies: [
      { targetId: 'deep-eth-core', weight: 0.65 },
    ],
    aiScore: 0.88,
    humanScore: 0.91,
    aiSummary: 'Direct compiler pipeline for >88% of locked TVL in smart contracts. High maintenance burden.',
    jurorStakePoolUsd: 890000,
    activeJurors: 98,
    repoUrl: 'https://github.com/ethereum/solidity'
  },
  {
    id: 'deep-openzeppelin',
    name: 'OpenZeppelin Secure Contracts Library',
    symbol: 'OZ-SEC',
    tag: 'Security & Token Standards',
    description: 'Industry-standard battle-tested implementations of ERC-20, ERC-721, ERC-1155, AccessControl, and Upgradeability.',
    originalityScore: 0.84,
    weight: 0.165,
    confidence: 95,
    delta24h: -0.005,
    upstreamDependencies: [
      { targetId: 'deep-solidity', weight: 0.45 },
      { targetId: 'deep-eth-core', weight: 0.55 },
    ],
    aiScore: 0.79,
    humanScore: 0.84,
    aiSummary: 'Ubiquitous dependency. AI agent flagged low novelty in recent minor patches, but human jurors staked UP due to paramount security trust.',
    jurorStakePoolUsd: 740000,
    activeJurors: 114,
    repoUrl: 'https://github.com/OpenZeppelin/openzeppelin-contracts'
  },
  {
    id: 'deep-foundry',
    name: 'Foundry / Forge Development Toolchain',
    symbol: 'FOUNDRY',
    tag: 'Developer Tooling',
    description: 'Blazing-fast, portable and modular toolkit for Ethereum application development written in Rust (forge, cast, anvil, chisel).',
    originalityScore: 0.94,
    weight: 0.140,
    confidence: 91,
    delta24h: +0.022,
    upstreamDependencies: [
      { targetId: 'deep-eth-core', weight: 0.70 },
      { targetId: 'deep-solidity', weight: 0.30 },
    ],
    aiScore: 0.96,
    humanScore: 0.94,
    aiSummary: 'Displaced legacy JS test runners. AI telemetry logs 4.2x velocity increase in fuzz test coverage across public repos.',
    jurorStakePoolUsd: 610000,
    activeJurors: 86,
    repoUrl: 'https://github.com/foundry-rs/foundry'
  },
  {
    id: 'deep-seer-core',
    name: 'Seer CTF Oracle & Reality Gateway',
    symbol: 'SEER-ORACLE',
    tag: 'Decision Primitives',
    description: 'Conditional Tokens Framework adapter routing optimistic Reality.eth escalation into Kleros Court decentralized arbitration.',
    originalityScore: 0.89,
    weight: 0.095,
    confidence: 89,
    delta24h: +0.035,
    upstreamDependencies: [
      { targetId: 'deep-openzeppelin', weight: 0.40 },
      { targetId: 'deep-solidity', weight: 0.30 },
      { targetId: 'deep-eth-core', weight: 0.30 },
    ],
    aiScore: 0.82,
    humanScore: 0.89,
    aiSummary: 'Novel multi-escalation bonding curve with zero centralized veto powers. Human curators prize the dispute resolution hedge.',
    jurorStakePoolUsd: 520000,
    activeJurors: 92,
    repoUrl: 'https://github.com/seer-pm/contracts'
  },
  {
    id: 'deep-viem',
    name: 'Viem & Wagmi Modern Web3 Primitives',
    symbol: 'VIEM',
    tag: 'Frontend Protocols',
    description: 'Lightweight, composable, type-safe modules for interacting with Ethereum clients with ultra-low bundle footprint.',
    originalityScore: 0.86,
    weight: 0.070,
    confidence: 88,
    delta24h: -0.002,
    upstreamDependencies: [
      { targetId: 'deep-eth-core', weight: 0.85 },
      { targetId: 'deep-openzeppelin', weight: 0.15 },
    ],
    aiScore: 0.89,
    humanScore: 0.86,
    aiSummary: 'High TS adoption rate (>74% of new dApps). Rapid release cadence and complete tree-shaking support.',
    jurorStakePoolUsd: 380000,
    activeJurors: 64,
    repoUrl: 'https://github.com/wevm/viem'
  }
];

export const MOCK_DEEP_AGENTS: DeepAIAgent[] = [
  {
    id: 'agent-claude',
    name: 'Claude-Code-Agent-v3',
    model: 'Anthropic Claude 3.7 Sonnet (Reasoning)',
    brierScore: 0.082,
    totalEvaluations: 412,
    stakedBondUsd: 85000,
    status: 'Active'
  },
  {
    id: 'agent-deepseek',
    name: 'DeepSeek-Gov-v2',
    model: 'DeepSeek R1 Distill 70B',
    brierScore: 0.094,
    totalEvaluations: 380,
    stakedBondUsd: 62000,
    status: 'Active'
  },
  {
    id: 'agent-vitalik-bot',
    name: 'Vitalik-Bot-Alpha',
    model: 'Fine-tuned EIP Consensus Agent',
    brierScore: 0.076,
    totalEvaluations: 519,
    stakedBondUsd: 120000,
    status: 'Active'
  }
];
