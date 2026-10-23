import React, { useState } from 'react';
import { X, Check, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { OpportunitySubmission } from '../../types';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import confetti from 'canvas-confetti';

interface ScoutStakeWidgetProps {
  submission: OpportunitySubmission | null;
  onClose: () => void;
}

export const ScoutStakeWidget: React.FC<ScoutStakeWidgetProps> = ({
  submission,
  onClose
}) => {
  const { wallet, showToast } = useWallet();
  const { playChime } = useSound();
  const [stakeAmount, setStakeAmount] = useState<number>(50);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!submission) return null;

  const priceCents = submission.marketProbability;
  const odds = priceCents / 100;
  const shares = Math.floor(stakeAmount / odds);
  const potentialPayout = shares * 1.0;
  const potentialProfit = Math.max(0, potentialPayout - stakeAmount);

  const handleExecute = () => {
    if (wallet.balances.sDAI < stakeAmount) {
      showToast('Insufficient sDAI', 'Use the Faucet in header to claim 1,000 sDAI.', 'warn');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      confetti({
        particleCount: 85,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00F59B', '#7D33FF']
      });
      playChime('success');
      showToast(
        'Scout Stake Placed!',
        `Bought ${shares.toLocaleString()} shares of "${submission.title}" for $${stakeAmount} sDAI. Accruing 5.2% APY.`,
        'success'
      );
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card border border-subtle rounded-3xl p-6 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-ef-violet-soft text-ef-violet font-bold">
              {submission.track}
            </span>
            <span className="text-xs font-mono text-signal-yes font-bold">
              Current Odds: {submission.marketProbability}%
            </span>
          </div>
          <h3 className="text-base font-bold text-text-primary">
            Place Scout Stake on Candidate
          </h3>
          <p className="text-xs text-text-secondary line-clamp-1">{submission.title}</p>
        </div>

        {/* Stake Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Stake Amount (sDAI)</span>
            <span className="font-mono">Avail: ${wallet.balances.sDAI.toFixed(2)}</span>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">$</span>
            <input
              type="number"
              min="10"
              step="25"
              value={stakeAmount || ''}
              onChange={e => setStakeAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full pl-8 pr-16 py-3 bg-ground border border-subtle rounded-xl text-lg font-mono font-bold text-text-primary focus:outline-none focus:border-ef-violet"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-text-muted font-bold">
              sDAI
            </span>
          </div>
        </div>

        {/* Calculations */}
        <div className="p-4 bg-ground border border-subtle rounded-2xl space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-text-muted">Token Price:</span>
            <span className="font-bold text-text-primary">{priceCents}¢ ($0.{priceCents.toString().padStart(2, '0')})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Shares Received:</span>
            <span className="text-text-primary">{shares.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-subtle">
            <span className="text-text-muted">Resolution Payout (If Selected):</span>
            <span className="font-bold text-sm text-text-primary">${potentialPayout.toFixed(2)} sDAI</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Potential Scout Profit:</span>
            <span className="font-bold text-signal-yes">
              +${potentialProfit.toFixed(2)} (+{((potentialProfit / (stakeAmount || 1)) * 100).toFixed(0)}%)
            </span>
          </div>
        </div>

        {/* Accrual notice */}
        <div className="p-3 rounded-xl bg-ef-violet-soft/70 border border-ef-violet/30 flex items-start gap-2 text-xs text-text-secondary leading-snug">
          <TrendingUp className="w-4 h-4 text-ef-violet shrink-0 mt-0.5" />
          <span>
            Scout capital earns <strong>~5.20% APY in sDAI</strong> while awaiting committee evaluation results.
          </span>
        </div>

        <button
          onClick={handleExecute}
          disabled={isSubmitting || stakeAmount <= 0 || stakeAmount > wallet.balances.sDAI}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-signal-yes text-black hover:brightness-110 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <span>Confirming Stake...</span> : <span>Confirm ${stakeAmount.toFixed(2)} Scout Stake</span>}
        </button>
      </div>
    </div>
  );
};
