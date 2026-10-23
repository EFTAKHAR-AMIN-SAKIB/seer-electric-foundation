import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Copy, Check, TrendingUp, Info } from 'lucide-react';
import { Market } from '../../types';
import { InteractivePriceChart } from '../charts/InteractivePriceChart';
import { OrderBookDepth } from '../charts/OrderBookDepth';
import { useWallet } from '../../context/WalletContext';

interface MarketDetailModalProps {
  market: Market | null;
  onClose: () => void;
  onTrade: (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
}

export const MarketDetailModal: React.FC<MarketDetailModalProps> = ({
  market,
  onClose,
  onTrade
}) => {
  const { wallet } = useWallet();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string>('');

  if (!market) return null;

  const activeOutcome = market.outcomes.find(o => o.id === selectedOutcomeId) || market.outcomes[0];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl h-[94vh] sm:h-auto sm:max-h-[90vh] bg-card border-t sm:border border-subtle rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)]">
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-subtle" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-subtle flex items-start justify-between bg-ground/50 sticky top-0 z-20 backdrop-blur-md shrink-0">
          <div className="space-y-1.5 max-w-3xl pr-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-elevated border border-subtle text-text-muted">
                {market.category}
              </span>
              <span className="text-[10px] font-mono text-signal-yes flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
                {market.networkName} • {market.collateralToken} 5.2% APY
              </span>
              <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
                Resolution: {new Date(market.resolutionDate).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-text-primary leading-snug">
              {market.title}
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 sm:line-clamp-none">
              {market.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-elevated transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Left 2 Cols: Interactive Charts & Order Book */}
          <div className="lg:col-span-2 space-y-6">
            {/* Outcome Selector Tabs */}
            {market.outcomes.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {market.outcomes.map(o => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOutcomeId(o.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-colors border ${
                      activeOutcome.id === o.id
                        ? 'bg-ef-violet-soft border-ef-violet text-ef-violet'
                        : 'bg-ground border-subtle text-text-secondary hover:bg-elevated'
                    }`}
                  >
                    {o.name}: {o.priceCents}¢ ({(o.probability * 100).toFixed(0)}%)
                  </button>
                ))}
              </div>
            )}

            {/* Interactive Price Chart with Timeframes */}
            <InteractivePriceChart
              baseProbability={activeOutcome.probability}
              marketTitle={market.title}
              outcomeName={activeOutcome.name}
            />

            {/* Order Book Depth */}
            <OrderBookDepth
              yesPriceCents={activeOutcome.priceCents}
              liquidityUsd={market.liquidityUsd}
            />

            {/* Smart Contract Telemetry (Etherscan-grade) */}
            <div className="p-5 bg-ground border border-subtle rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-text-muted pb-2 border-b border-subtle">
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  CTF Protocol Verification (ERC-1155)
                </span>
                <span className="text-[10px] text-signal-yes">Verified Bytecode</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Condition ID:</span>
                  <div className="flex items-center gap-1.5 text-text-primary">
                    <span className="truncate max-w-[180px] sm:max-w-[280px]">{market.conditionId}</span>
                    <button
                      onClick={() => copyToClipboard(market.conditionId, 'cond')}
                      className="text-text-muted hover:text-text-primary"
                    >
                      {copiedField === 'cond' ? <Check className="w-3.5 h-3.5 text-signal-yes" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Reality.eth Question:</span>
                  <div className="flex items-center gap-1.5 text-text-primary">
                    <span className="truncate max-w-[180px] sm:max-w-[280px]">{market.realityQuestionId}</span>
                    <button
                      onClick={() => copyToClipboard(market.realityQuestionId, 'q')}
                      className="text-text-muted hover:text-text-primary"
                    >
                      {copiedField === 'q' ? <Check className="w-3.5 h-3.5 text-signal-yes" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Arbitrator Backstop:</span>
                  <span className="text-ef-violet font-semibold">{market.arbitrator}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-muted">AMM Pool:</span>
                  <span className="text-text-primary">{market.ammPool}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Quick Trade Panel & Resolution Lifecycle */}
          <div className="space-y-6">
            {/* Quick Stake Ticket */}
            <div className="p-5 bg-ground border border-subtle rounded-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-text-muted">
                <span>Instant Trade Ticket</span>
                <span className="text-signal-yes font-bold">{market.collateralToken}</span>
              </div>

              <div className="p-3 bg-card border border-subtle rounded-xl space-y-1">
                <div className="text-xs font-semibold text-text-primary">{activeOutcome.name}</div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-text-muted">Current Implied Price:</span>
                  <span className="font-bold text-text-primary">{activeOutcome.priceCents}¢</span>
                </div>
              </div>

              {/* Action Buttons: YES / NO (Departure #1) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onTrade(market, activeOutcome.id, 'YES');
                  }}
                  className="py-3 px-3 rounded-xl bg-signal-yes hover:brightness-110 text-black font-mono font-bold text-xs flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <span>BUY YES</span>
                  <span className="text-[10px] font-normal opacity-90">{activeOutcome.priceCents}¢ ($0.{activeOutcome.priceCents.toString().padStart(2, '0')})</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onTrade(market, activeOutcome.id, 'NO');
                  }}
                  className="py-3 px-3 rounded-xl bg-signal-no hover:brightness-110 text-white font-mono font-bold text-xs flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm"
                >
                  <span>BUY NO</span>
                  <span className="text-[10px] font-normal opacity-90">{100 - activeOutcome.priceCents}¢ ($0.{(100 - activeOutcome.priceCents).toString().padStart(2, '0')})</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-ef-violet-soft border border-ef-violet/25 text-xs text-text-secondary leading-relaxed flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-ef-violet shrink-0 mt-0.5" />
                <span className="text-[11px]">
                  Collateral staked in this market continuously earns <strong>~5.20% APY in sDAI</strong> while held in escrow.
                </span>
              </div>
            </div>

            {/* Resolution Lifecycle Box */}
            <div className="p-5 bg-ground border border-subtle rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-text-primary font-bold">
                <ShieldCheck className="w-4 h-4 text-signal-yes" />
                <span>Reality.eth Escalation Ladder</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-subtle">
                  <span className="text-text-muted">Opening Bond:</span>
                  <span className="text-text-primary font-bold">${market.realityBond} sDAI</span>
                </div>

                <div className="flex justify-between py-1 border-b border-subtle">
                  <span className="text-text-muted">Escalation Timeout:</span>
                  <span className="text-text-primary">{market.escalationTimeoutHours} Hours per Step</span>
                </div>

                <div className="flex justify-between py-1 border-b border-subtle">
                  <span className="text-text-muted">Dispute Escalation:</span>
                  <span className="text-text-primary">Double Bond (2x Ladder)</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Final Backstop:</span>
                  <span className="text-signal-yes font-bold">Kleros Juror Court</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
