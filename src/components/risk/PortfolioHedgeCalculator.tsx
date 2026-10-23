import React, { useState } from 'react';
import { RiskProtocol, RiskSeverityTier } from '../../types';
import { Calculator, TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import confetti from 'canvas-confetti';

interface PortfolioHedgeCalculatorProps {
  protocols: RiskProtocol[];
  selectedProtocol: RiskProtocol;
  selectedTier: RiskSeverityTier;
  onSelectProtocol: (p: RiskProtocol) => void;
  onSelectTier: (t: RiskSeverityTier) => void;
}

export const PortfolioHedgeCalculator: React.FC<PortfolioHedgeCalculatorProps> = ({
  protocols,
  selectedProtocol,
  selectedTier,
  onSelectProtocol,
  onSelectTier
}) => {
  const { wallet, showToast } = useWallet();
  const { playChime } = useSound();

  const [portfolioSize, setPortfolioSize] = useState<number>(50000);
  const [durationDays, setDurationDays] = useState<number>(180);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Financial calculations
  const annualPremiumRate = selectedTier.annualPremiumApy / 100;
  const durationFraction = durationDays / 365;
  const grossHedgeCost = portfolioSize * annualPremiumRate * durationFraction;

  // sDAI base yield offset (~5.2% APY)
  const sDaiYieldRate = 0.052;
  const sDaiYieldEarned = portfolioSize * sDaiYieldRate * durationFraction;

  // Net yield difference
  const netHedgeProfitOrCost = sDaiYieldEarned - grossHedgeCost;
  const netEffectiveApy = ((netHedgeProfitOrCost / portfolioSize) / durationFraction) * 100;
  const isNetPositive = netHedgeProfitOrCost >= 0;

  const handleExecuteHedge = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      confetti({
        particleCount: 95,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#00F59B', '#7D33FF', '#F59E0B']
      });
      playChime('success');
      showToast(
        'Portfolio Hedge Initialized!',
        `Hedged $${portfolioSize.toLocaleString()} of ${selectedProtocol.name} against ${selectedTier.severityLabel} for ${durationDays} days. Net effective yield: ${netEffectiveApy > 0 ? '+' : ''}${netEffectiveApy.toFixed(2)}% APY.`,
        'success'
      );
    }, 500);
  };

  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 select-none space-y-6 shadow-sm">
      <div className="flex items-center gap-3 border-b border-subtle pb-4">
        <div className="w-10 h-10 rounded-2xl bg-signal-yes-soft border border-signal-yes/30 flex items-center justify-center text-signal-yes">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary">
            Interactive Portfolio Net-Yield Hedge Calculator
          </h3>
          <p className="text-xs text-text-secondary font-mono">
            Simulate principal protection costs offset by continuous sDAI collateral yield (5.2% APY)
          </p>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Protocol Selector */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
            1. Target Asset / Protocol
          </label>
          <select
            value={selectedProtocol.id}
            onChange={e => {
              const p = protocols.find(x => x.id === e.target.value);
              if (p) {
                onSelectProtocol(p);
                onSelectTier(p.tiers[0]);
              }
            }}
            className="w-full px-3 py-2.5 bg-ground border border-subtle rounded-xl text-xs font-mono font-semibold text-text-primary focus:outline-none focus:border-ef-violet"
          >
            {protocols.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.asset})
              </option>
            ))}
          </select>
        </div>

        {/* Portfolio Amount */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
            2. Covered Portfolio Value ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-muted">$</span>
            <input
              type="number"
              min="5000"
              step="5000"
              value={portfolioSize}
              onChange={e => setPortfolioSize(Math.max(1000, parseInt(e.target.value) || 0))}
              className="w-full pl-6 pr-3 py-2 bg-ground border border-subtle rounded-xl text-xs font-mono font-bold text-text-primary focus:outline-none focus:border-ef-violet"
            />
          </div>
        </div>

        {/* Severity Cutoff Tier */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
            3. Loss Severity Cutoff Tier
          </label>
          <select
            value={selectedTier.severityLabel}
            onChange={e => {
              const t = selectedProtocol.tiers.find(x => x.severityLabel === e.target.value);
              if (t) onSelectTier(t);
            }}
            className="w-full px-3 py-2.5 bg-ground border border-subtle rounded-xl text-xs font-mono font-semibold text-text-primary focus:outline-none focus:border-ef-violet"
          >
            {selectedProtocol.tiers.map(t => (
              <option key={t.severityLabel} value={t.severityLabel}>
                {t.severityLabel} ({t.annualPremiumApy}% APY)
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
            4. Hedge Horizon
          </label>
          <select
            value={durationDays}
            onChange={e => setDurationDays(parseInt(e.target.value))}
            className="w-full px-3 py-2.5 bg-ground border border-subtle rounded-xl text-xs font-mono font-semibold text-text-primary focus:outline-none focus:border-ef-violet"
          >
            <option value="30">30 Days (1 Month)</option>
            <option value="90">90 Days (Quarterly)</option>
            <option value="180">180 Days (Half-Year)</option>
            <option value="365">365 Days (Annual)</option>
          </select>
        </div>
      </div>

      {/* Output Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-ground border border-subtle rounded-2xl font-mono">
        <div className="space-y-1">
          <div className="text-[11px] text-text-muted uppercase">Gross Hedge Premium</div>
          <div className="text-xl font-bold text-signal-no">
            -${grossHedgeCost.toFixed(2)}
          </div>
          <div className="text-[10px] text-text-muted">
            Rate: {selectedTier.annualPremiumApy}% APY for {durationDays}d
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] text-text-muted uppercase">sDAI Collateral Yield Offset</div>
          <div className="text-xl font-bold text-signal-yes">
            +${sDaiYieldEarned.toFixed(2)}
          </div>
          <div className="text-[10px] text-text-muted">
            Maker/Spark base rate: ~5.20% APY
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] text-text-muted uppercase">Net Effective PnL / Yield</div>
          <div className={`text-xl font-bold ${isNetPositive ? 'text-signal-yes' : 'text-signal-warn'}`}>
            {isNetPositive ? '+' : ''}${netHedgeProfitOrCost.toFixed(2)} ({isNetPositive ? '+' : ''}{netEffectiveApy.toFixed(2)}% APY)
          </div>
          <div className="text-[10px] text-text-muted">
            {isNetPositive ? 'Net-Yield Positive Protection!' : 'Modest carry cost for complete safety'}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <ShieldCheck className="w-4 h-4 text-signal-yes shrink-0" />
          <span>Settles automatically on-chain via Kleros Decentralized Tail-Risk Court</span>
        </div>

        <button
          onClick={handleExecuteHedge}
          disabled={isExecuting}
          className="w-full sm:w-auto py-3 px-6 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-ef-violet text-white hover:bg-ef-violet-hover shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isExecuting ? <span>Signing Hedge Order...</span> : <span>Execute Basket Hedge (${portfolioSize.toLocaleString()})</span>}
        </button>
      </div>
    </div>
  );
};
