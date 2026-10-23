import React, { useState } from 'react';
import { PageRoute } from '../../types';
import {
  Compass,
  Cpu,
  Vote,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface ArchitectureMapProps {
  onNavigate: (page: PageRoute) => void;
}

export const ArchitectureMap: React.FC<ArchitectureMapProps> = ({ onNavigate }) => {
  const { playChime } = useSound();
  const [activeTab, setActiveTab] = useState<'all' | 'capital' | 'engine' | 'oracle' | 'apps'>('all');

  const interfaces = [
    {
      id: 'app' as PageRoute,
      title: '1. Seer App Terminal',
      path: '/app',
      desc: 'Universal Etherscan-grade market explorer & trading terminal with live order books.',
      icon: Compass,
      tag: 'Universal Markets',
      color: 'text-ef-violet',
      border: 'hover:border-ef-violet'
    },
    {
      id: 'deep' as PageRoute,
      title: '2. Deep Multi-Scalar DAG',
      path: '/deep',
      desc: 'Distilled Human Judgment: AI agents seed telemetry while human jurors calibrate grant weights.',
      icon: Cpu,
      tag: 'Distilled Judgment',
      color: 'text-signal-cyan',
      border: 'hover:border-signal-cyan'
    },
    {
      id: 'futarchy' as PageRoute,
      title: '3. Futarchy Governance',
      path: '/futarchy',
      desc: 'Conditional decision markets (IF PASS vs IF FAIL) with automatic Zodiac Safe execution.',
      icon: Vote,
      tag: 'Conditional DAO',
      color: 'text-signal-yes',
      border: 'hover:border-signal-yes'
    },
    {
      id: 'opportunity' as PageRoute,
      title: '4. Opportunity Markets',
      path: '/opportunity',
      desc: 'Selection forecasting: decentralized community odds triage the queue for accredited reviewers.',
      icon: Sparkles,
      tag: 'Reviewer Triage',
      color: 'text-signal-warn',
      border: 'hover:border-signal-warn'
    },
    {
      id: 'risk' as PageRoute,
      title: '5. Risk Pricing Matrix',
      path: '/risk',
      desc: 'Cross-protocol DeFi tail-risk pricing ladders (10%-90%) with net-yield positive sDAI hedging.',
      icon: ShieldAlert,
      tag: 'Tail-Risk Hedging',
      color: 'text-signal-no',
      border: 'hover:border-signal-no'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none space-y-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          Seer Protocol Ecosystem Architecture Map
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary">
          How yield-bearing collateral, conditional outcome math, and decentralized dispute backstops connect all six interfaces.
        </p>
      </div>

      {/* Protocol Architecture Stack Layers */}
      <div className="space-y-4">
        {/* Layer 1: Capital & Collateral Layer */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card border border-subtle space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-signal-yes shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                Layer 1: Capital &amp; Collateral Engine (No Idle Capital)
              </span>
            </div>
            <span className="text-[11px] font-mono text-signal-yes bg-signal-yes-soft px-2.5 py-0.5 rounded-full font-bold w-fit">
              ~5.20% APY Base Accrual
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Gnosis Chain: sDAI</div>
              <div className="text-[11px] text-text-muted mt-0.5">Maker / Spark DSR • Gas &lt;$0.01</div>
            </div>
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Ethereum Mainnet: sUSDS</div>
              <div className="text-[11px] text-text-muted mt-0.5">Sky Dollar Savings Rate • Deep L1 TVL</div>
            </div>
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Yield Routing Vaults</div>
              <div className="text-[11px] text-text-muted mt-0.5">Bettors &amp; LPs earn interest during escrow</div>
            </div>
          </div>
        </div>

        {/* Layer 2: Market Primitives (CTF ERC-1155) */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card border border-subtle space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-ef-violet shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                Layer 2: Conditional Tokens Framework (ERC-1155) &amp; AMMs
              </span>
            </div>
            <span className="text-[11px] font-mono text-ef-violet bg-ef-violet-soft px-2.5 py-0.5 rounded-full font-bold w-fit">
              Invariant: Σ P(Outcome) = 1.000
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Combinatorial Outcome Splits</div>
              <div className="text-[11px] text-text-muted mt-0.5">Binary, Multi-scalar, Categorical slots</div>
            </div>
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Wrapped ERC-20 Tokens</div>
              <div className="text-[11px] text-text-muted mt-0.5">AMM pool liquidity on Swapr &amp; Uniswap v3</div>
            </div>
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Counterfactual Invariants</div>
              <div className="text-[11px] text-text-muted mt-0.5">Automatic 1:1 refund on voided branches</div>
            </div>
          </div>
        </div>

        {/* Layer 3: Resolution & Dispute Arbitration */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card border border-subtle space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-signal-cyan shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                Layer 3: Decentralized Resolution Stack
              </span>
            </div>
            <span className="text-[11px] font-mono text-signal-cyan bg-signal-cyan-soft px-2.5 py-0.5 rounded-full font-bold w-fit">
              Reality.eth + Kleros Court Backstop
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Reality.eth v3.0 Optimistic</div>
              <div className="text-[11px] text-text-muted mt-0.5">Exponential 2x escalation bond ladder</div>
            </div>
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Kleros Court Arbitration</div>
              <div className="text-[11px] text-text-muted mt-0.5">Decentralized staked juror dispute ruling</div>
            </div>
            <div className="p-3 rounded-xl bg-ground border border-subtle">
              <div className="text-text-primary font-bold">Zodiac Safe Execution</div>
              <div className="text-[11px] text-text-muted mt-0.5">Autonomous on-chain calldata dispatch</div>
            </div>
          </div>
        </div>

        {/* Layer 4: The 5 Specialized Product Interfaces (Clickable) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
            <Zap className="w-4 h-4 text-ef-violet" />
            <span>Layer 4: Five Connected Application Verticals (Click to Open)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {interfaces.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  playChime('whoosh');
                  onNavigate(item.id);
                }}
                className={`p-4 rounded-3xl bg-card border border-subtle ${item.border} text-left transition-all duration-200 hover:scale-[1.02] shadow-sm flex flex-col justify-between group`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-[10px] font-mono text-text-muted bg-ground px-2 py-0.5 rounded border border-subtle">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-text-primary group-hover:text-ef-violet transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-text-secondary leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted group-hover:text-text-primary">
                  <span>{item.path}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
