import React, { useState } from 'react';
import { Cpu, TrendingUp, ShieldCheck, ArrowRight, Zap, Check, Lock } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import confetti from 'canvas-confetti';

export const AutopilotVaults: React.FC = () => {
  const { wallet, showToast } = useWallet();
  const { playChime } = useSound();
  const [selectedVault, setSelectedVault] = useState<'sDAI' | 'ETH' | 'GNO'>('sDAI');
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);

  const vaults = [
    {
      id: 'sDAI' as const,
      name: 'sDAI Savings Autopool',
      asset: 'sDAI',
      network: 'Gnosis Chain',
      apy: '8.40%',
      baseYield: '5.20% Maker DSR',
      surplusYield: '+3.20% CTF Risk Underwriting',
      tvl: '$24.8M',
      strategy: 'Dynamically routes collateral across Seer tail-risk underwriting tranches and Spark liquidity venues based on live market-implied incident odds.',
      allocation: [
        { label: 'Maker/Spark Base DSR', pct: 60, color: 'bg-signal-yes' },
        { label: 'Risk Pricing Matrix Underwrite', pct: 25, color: 'bg-ef-violet' },
        { label: 'Swapr FPMM Concentrated Liq', pct: 15, color: 'bg-signal-cyan' }
      ]
    },
    {
      id: 'ETH' as const,
      name: 'ETH Yield Autopool',
      asset: 'wstETH',
      network: 'Ethereum Mainnet',
      apy: '6.85%',
      baseYield: '3.10% Staking',
      surplusYield: '+3.75% Prediction Arbitrage',
      tvl: '$31.2M',
      strategy: 'Autonomously rebalances LP positions across Swapr, Uniswap v3 and CowSwap batch auctions while remaining composable across DeFi.',
      allocation: [
        { label: 'Lido / RocketPool Validator', pct: 50, color: 'bg-signal-cyan' },
        { label: 'Conditional Tokens AMM LP', pct: 35, color: 'bg-ef-violet' },
        { label: 'CowSwap Batch Settlement', pct: 15, color: 'bg-signal-yes' }
      ]
    },
    {
      id: 'GNO' as const,
      name: 'GNO Futarchy Autopool',
      asset: 'GNO',
      network: 'Gnosis Chain',
      apy: '11.20%',
      baseYield: '7.80% Staking',
      surplusYield: '+3.40% Governance Spread',
      tvl: '$12.4M',
      strategy: 'Continuously optimizes validator staking and futarchy conditional governance liquidity across Gnosis Safe Zodiac modules.',
      allocation: [
        { label: 'Gnosis Validator Staking', pct: 65, color: 'bg-ef-violet' },
        { label: 'Futarchy Dual-Branch Vaults', pct: 25, color: 'bg-signal-yes' },
        { label: 'Reality.eth Escalation Bond Pool', pct: 10, color: 'bg-signal-warn' }
      ]
    }
  ];

  const active = vaults.find(v => v.id === selectedVault)!;

  const handleDeposit = () => {
    setIsDepositing(true);
    setTimeout(() => {
      setIsDepositing(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7D33FF', '#00F59B', '#38BDF8']
      });
      playChime('success');
      showToast(
        'Autopool Deposit Confirmed!',
        `Allocated $${depositAmount} into the ${active.name}. Earning ${active.apy} APY with zero unhedged principal risk.`,
        'success'
      );
    }, 450);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-ef-violet" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
              Seer Autopilot: Automated Yield &amp; Risk Vaults
            </h3>
          </div>
          <p className="text-xs text-text-secondary font-mono mt-0.5">
            Algorithmic collateral management routing capital between Maker DSR, conditional prediction AMMs, and futarchy pools
          </p>
        </div>

        {/* Vault Switcher Pills */}
        <div className="flex items-center justify-around sm:justify-start w-full sm:w-auto p-1 bg-card border border-subtle rounded-2xl font-mono text-xs">
          {vaults.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVault(v.id)}
              className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-xl transition-all font-semibold text-center cursor-pointer ${
                selectedVault === v.id
                  ? 'bg-ef-violet text-white shadow-md'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {v.id} ({v.apy})
            </button>
          ))}
        </div>
      </div>

      {/* Main Vault Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl seer-card bg-card">
        {/* Left 2 Cols: Telemetry & Allocation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-ef-violet-soft text-ef-violet border border-ef-violet/30">
                  {active.network}
                </span>
                <span className="text-xs font-mono text-signal-yes font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
                  Live Rebalancing Active
                </span>
              </div>
              <h4 className="text-xl font-extrabold text-text-primary mt-1.5">
                {active.name}
              </h4>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs text-text-muted uppercase">Target Net APY</div>
              <div className="text-3xl font-extrabold text-signal-yes">
                {active.apy}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {active.strategy}
          </p>

          {/* Yield Composition Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-text-muted">Dynamic Allocation Breakdown:</span>
              <span className="text-text-primary font-bold">Total TVL: {active.tvl}</span>
            </div>

            <div className="h-3 w-full bg-ground rounded-full overflow-hidden flex p-0.5 gap-1">
              {active.allocation.map((item, idx) => (
                <div
                  key={idx}
                  className={`h-full rounded-sm ${item.color} transition-all duration-300`}
                  style={{ width: `${item.pct}%` }}
                  title={`${item.label}: ${item.pct}%`}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono">
              {active.allocation.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-ground border border-subtle flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.color}`} />
                  <div className="min-w-0">
                    <div className="text-text-primary font-bold">{item.pct}%</div>
                    <div className="text-[10px] text-text-muted truncate">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-2 border-t border-subtle">
            <span>Base Yield: {active.baseYield}</span>
            <span>•</span>
            <span className="text-signal-yes font-bold">{active.surplusYield}</span>
            <span>•</span>
            <span>Zero Lockup • Hourly Compound</span>
          </div>
        </div>

        {/* Right Col: Instant Deposit Ticket */}
        <div className="p-5 rounded-2xl bg-ground border border-subtle flex flex-col justify-between space-y-4 font-mono text-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-text-muted uppercase">
              <span>Autopool Deposit</span>
              <span className="text-signal-yes font-bold">{active.asset}</span>
            </div>

            <div>
              <div className="text-[11px] text-text-muted mb-1 flex justify-between">
                <span>Deposit Amount:</span>
                <span>Avail: ${wallet.balances.sDAI.toFixed(2)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">$</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={depositAmount || ''}
                  onChange={e => setDepositAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-7 pr-16 py-2.5 bg-card border border-subtle rounded-xl text-base font-bold text-text-primary focus:outline-none focus:border-ef-violet"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted font-bold text-[11px]">
                  {active.asset}
                </span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 250, 500, 1000].map(val => (
                <button
                  key={val}
                  onClick={() => setDepositAmount(val)}
                  className={`py-1 rounded-lg border text-center transition-colors ${
                    depositAmount === val
                      ? 'bg-ef-violet text-white border-ef-violet font-bold'
                      : 'bg-card border-subtle text-text-secondary hover:bg-elevated'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Projected returns */}
            <div className="p-3 rounded-xl bg-card border border-subtle space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-text-muted">Estimated Annual Yield:</span>
                <span className="text-signal-yes font-bold">
                  +${((depositAmount * parseFloat(active.apy)) / 100).toFixed(2)} / yr
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Monthly Cashflow:</span>
                <span className="text-text-primary font-bold">
                  +${(((depositAmount * parseFloat(active.apy)) / 100) / 12).toFixed(2)} / mo
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDeposit}
            disabled={isDepositing || depositAmount <= 0}
            className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider bg-ef-violet text-white hover:bg-ef-violet-hover shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isDepositing ? (
              <span>Deploying into Vault...</span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>Deposit ${depositAmount} into {active.id} Pool</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
