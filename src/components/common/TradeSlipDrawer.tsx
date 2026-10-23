import React, { useState } from 'react';
import { X, ArrowRight, TrendingUp, ShieldCheck, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useTradeSlip } from '../../context/TradeSlipContext';
import { useWallet } from '../../context/WalletContext';

export const TradeSlipDrawer: React.FC = () => {
  const { state, closeTradeSlip, setAmountUsd, setDirection } = useTradeSlip();
  const { wallet, executeTrade } = useWallet();
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!state.isOpen || !state.market || !state.outcome) return null;

  const { market, outcome, direction, amountUsd } = state;
  const isYesOrUp = direction === 'YES' || direction === 'UP';

  // Strict probability conservation check:
  // If YES/UP, price is outcome.priceCents; if NO/DOWN, price is 100 - outcome.priceCents!
  const effectivePriceCents = isYesOrUp ? outcome.priceCents : Math.max(1, 100 - outcome.priceCents);
  const effectiveProbability = effectivePriceCents / 100;

  const shares = amountUsd > 0 && effectiveProbability > 0 ? Math.floor(amountUsd / effectiveProbability) : 0;
  const potentialPayout = shares * 1.0; // Each winning conditional token redeems for $1.00 collateral
  const potentialProfit = Math.max(0, potentialPayout - amountUsd);
  const potentialRoi = amountUsd > 0 ? ((potentialProfit / amountUsd) * 100).toFixed(1) : '0';

  // Projected 30-day sDAI yield on this position (at ~5.2% APY)
  const projected30dYield = ((amountUsd * 0.052) / 12).toFixed(2);

  const collateralSymbol = wallet.network === 'Gnosis Chain' ? 'sDAI' : 'sUSDS';
  const availableBalance = wallet.balances[collateralSymbol];

  const handleQuickAmount = (val: number) => {
    setAmountUsd(Math.min(val, availableBalance));
  };

  const handleMax = () => {
    setAmountUsd(Math.floor(availableBalance));
  };

  const handleSubmit = () => {
    if (amountUsd <= 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const ok = executeTrade({
        marketId: market.id,
        outcomeId: outcome.id,
        outcomeName: outcome.name,
        direction,
        amountUsd,
        priceCents: effectivePriceCents
      });
      setIsSubmitting(false);
      if (ok) {
        closeTradeSlip();
      }
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none"
      onClick={e => {
        if (e.target === e.currentTarget) closeTradeSlip();
      }}
    >
      <div className="relative w-full sm:max-w-md max-h-[92vh] sm:max-h-full sm:h-full bg-card border-t sm:border-t-0 sm:border-l border-subtle rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-250 pb-[env(safe-area-inset-bottom)]">
        {/* Mobile Drag Bar Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-subtle" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-subtle flex items-start justify-between bg-ground/50 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-elevated border border-subtle text-text-muted">
                {market.category}
              </span>
              <span className="text-[10px] font-mono text-signal-yes flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
                {collateralSymbol} ~5.2% APY
              </span>
            </div>
            <h3 className="text-sm font-bold text-text-primary line-clamp-2 leading-snug">
              {market.title}
            </h3>
          </div>
          <button
            onClick={closeTradeSlip}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content - Scrollable on mobile */}
        <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 flex-1 overflow-y-auto">
          {/* Outcome & Direction Toggle */}
          <div>
            <div className="text-xs font-mono uppercase text-text-muted mb-2">
              Selected Target &amp; Direction:
            </div>
            <div className="p-3 bg-ground border border-subtle rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-text-primary">{outcome.name}</div>
                <div className="text-[11px] text-text-muted font-mono mt-0.5">
                  Base Probability: {(outcome.probability * 100).toFixed(0)}%
                </div>
              </div>

              {/* Semantic Signal Direction Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-elevated rounded-lg border border-subtle">
                <button
                  onClick={() => setDirection('YES')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-all ${
                    isYesOrUp
                      ? 'bg-signal-yes text-black shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  YES ({outcome.priceCents}¢)
                </button>
                <button
                  onClick={() => setDirection('NO')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-all ${
                    !isYesOrUp
                      ? 'bg-signal-no text-white shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  NO ({100 - outcome.priceCents}¢)
                </button>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
              <span>Stake Amount ({collateralSymbol})</span>
              <span className="font-mono">
                Avail: ${availableBalance.toFixed(2)}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">
                $
              </span>
              <input
                type="number"
                min="1"
                step="5"
                value={amountUsd || ''}
                onChange={e => setAmountUsd(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full pl-8 pr-16 py-3 bg-ground border border-subtle rounded-xl text-lg font-mono font-bold text-text-primary focus:outline-none focus:border-ef-violet focus:ring-1 focus:ring-ef-violet transition-colors"
                placeholder="50"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-text-muted font-semibold">
                {collateralSymbol}
              </span>
            </div>

            {/* Quick Pill Buttons (Matching Figma Order Card from User Upload) */}
            <div className="grid grid-cols-5 gap-1.5 mt-2">
              {[1, 5, 20, 100].map(val => (
                <button
                  key={val}
                  onClick={() => setAmountUsd(Math.min(availableBalance, amountUsd + val))}
                  className="py-1 rounded-lg text-xs font-mono font-semibold bg-ground border border-subtle text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
                >
                  +{val}
                </button>
              ))}
              <button
                onClick={handleMax}
                className="py-1 rounded-lg text-xs font-mono font-bold bg-ground border border-subtle text-text-primary hover:bg-elevated"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Payoff & Return Calculations */}
          <div className="p-4 bg-ground border border-subtle rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Price per Outcome Token:</span>
              <span className="font-mono font-bold text-text-primary">
                {effectivePriceCents}¢ ($0.{effectivePriceCents.toString().padStart(2, '0')})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Shares Received:</span>
              <span className="font-mono font-bold text-text-primary">
                {shares.toLocaleString()} ERC-20 Tokens
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-subtle">
              <span className="text-text-muted">Potential Resolution Payout:</span>
              <span className="font-mono font-bold text-base text-text-primary">
                ${potentialPayout.toFixed(2)} {collateralSymbol}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Potential Net Profit:</span>
              <span className={`font-mono font-bold ${isYesOrUp ? 'text-signal-yes' : 'text-signal-no'}`}>
                +${potentialProfit.toFixed(2)} (+{potentialRoi}%)
              </span>
            </div>

            {/* Yield-Bearing Collateral Accrual Box (Departure #3 Highlight) */}
            <div className="p-2.5 rounded-lg bg-ef-violet-soft border border-ef-violet/25 flex items-start gap-2 text-xs">
              <TrendingUp className="w-4 h-4 text-ef-violet shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-text-primary">
                  No Idle Capital (Seer Yield Engine)
                </div>
                <div className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                  While awaiting resolution, this stake accrues ~5.20% APY in Maker/Spark vaults (+${projected30dYield} projected 30D yield).
                </div>
              </div>
            </div>
          </div>

          {/* Slippage Settings */}
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Max Slippage Tolerance:</span>
            <div className="flex items-center gap-1 font-mono">
              {[0.1, 0.5, 1.0].map(val => (
                <button
                  key={val}
                  onClick={() => setSlippage(val)}
                  className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                    slippage === val
                      ? 'bg-elevated border-subtle text-text-primary font-bold'
                      : 'border-transparent text-text-muted hover:text-text-primary'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-subtle bg-ground/80 shrink-0 space-y-2.5">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || amountUsd <= 0 || amountUsd > availableBalance}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
              amountUsd > availableBalance
                ? 'bg-elevated text-text-muted cursor-not-allowed border border-subtle'
                : isYesOrUp
                ? 'bg-signal-yes text-black hover:opacity-90 active:scale-98'
                : 'bg-signal-no text-white hover:opacity-90 active:scale-98'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Signing CTF Trade...
              </span>
            ) : amountUsd > availableBalance ? (
              'Insufficient Collateral'
            ) : (
              <span>
                Buy {direction} for ${amountUsd.toFixed(2)} {collateralSymbol}
              </span>
            )}
          </button>

          <div className="text-center">
            <span className="text-[10px] text-text-muted font-mono flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-signal-yes" />
              Reality.eth Bond Escrow • Kleros Arbitration Backstop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
