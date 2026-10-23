import React from 'react';
import { SeerLogo } from './SeerLogo';
import { ExternalLink, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../../types';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-subtle bg-card/40 backdrop-blur-sm mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Protocol Mission */}
          <div className="lg:col-span-2 space-y-4">
            <SeerLogo size="md" showBadge />
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              Seer is the universal prediction and conditional decision protocol built on Gnosis Chain and Ethereum. Powered by the Conditional Tokens Framework (ERC-1155) with yield-bearing sDAI &amp; sUSDS collateral, optimistic Reality.eth escalation, and Kleros Court decentralized arbitration.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-elevated border border-subtle text-signal-yes">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
                sDAI APY: ~5.20%
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-elevated border border-subtle text-signal-cyan">
                <ShieldCheck className="w-3 h-3 text-signal-cyan" />
                Kleros Backstop Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-elevated border border-subtle text-ef-violet">
                <Cpu className="w-3 h-3 text-ef-violet" />
                CTF ERC-1155
              </span>
            </div>
          </div>

          {/* Col 2: The Six Connected Interfaces */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
              The 6 Interfaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-text-secondary hover:text-ef-violet transition-colors flex items-center justify-between w-full"
                >
                  <span>1. Homepage (Architecture)</span>
                  <span className="font-mono text-[10px] text-text-muted">/</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('app')}
                  className="text-text-secondary hover:text-ef-violet transition-colors flex items-center justify-between w-full"
                >
                  <span>2. Seer App (Terminal)</span>
                  <span className="font-mono text-[10px] text-text-muted">/app</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('deep')}
                  className="text-text-secondary hover:text-ef-violet transition-colors flex items-center justify-between w-full"
                >
                  <span>3. Deep (AI + Juror DAG)</span>
                  <span className="font-mono text-[10px] text-text-muted">/deep</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('futarchy')}
                  className="text-text-secondary hover:text-ef-violet transition-colors flex items-center justify-between w-full"
                >
                  <span>4. Futarchy (Governance)</span>
                  <span className="font-mono text-[10px] text-text-muted">/futarchy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('opportunity')}
                  className="text-text-secondary hover:text-ef-violet transition-colors flex items-center justify-between w-full"
                >
                  <span>5. Opportunity Markets</span>
                  <span className="font-mono text-[10px] text-text-muted">/opportunity</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('risk')}
                  className="text-text-secondary hover:text-ef-violet transition-colors flex items-center justify-between w-full"
                >
                  <span>6. Risk Pricing Matrix</span>
                  <span className="font-mono text-[10px] text-text-muted">/risk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bounty Documentation & Rationale */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
              Contest Rationale
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('rationale')}
                  className="text-ef-violet font-semibold hover:underline flex items-center gap-1"
                >
                  <span>7 Deliberate UX Departures</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="text-text-secondary">Strict Semantic Color Separation</li>
              <li className="text-text-secondary">Mathematical Probability Invariant</li>
              <li className="text-text-secondary">Yield-Bearing sDAI/sUSDS Capital</li>
              <li className="text-text-secondary">Etherscan-Grade High Density</li>
              <li className="text-text-secondary">Distilled Human Judgment DAG</li>
              <li className="text-text-secondary">Futarchy Refund Protection</li>
              <li className="text-text-secondary">Cross-Protocol Tail-Risk Matrix</li>
            </ul>
          </div>

          {/* Col 4: Protocol & Infrastructure */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://gnosis.io"
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Gnosis Chain (100)</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://reality.eth.link"
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Reality.eth v3.0 Escalation</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://kleros.io"
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Kleros Court Arbitration</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gnosis/conditional-tokens-contracts"
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Conditional Tokens Framework</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://makerdao.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Sky / Maker sUSDS &amp; sDAI</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Invariants & Build Info */}
        <div className="pt-8 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-signal-yes" />
            <span>Seer Rebrand Contest Part II • Electric Foundation Design System</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Invariant: P(Yes) + P(No) = 1.000</span>
            <span className="text-subtle">•</span>
            <span>Zero Idle Capital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
