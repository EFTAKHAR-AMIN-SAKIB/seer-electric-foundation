import React, { useState } from 'react';
import { X, Plus, Trash2, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { MarketCategory, MarketType } from '../../types';

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateMarketModal: React.FC<CreateMarketModalProps> = ({ isOpen, onClose }) => {
  const { createMarket, wallet } = useWallet();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MarketCategory>('Crypto');
  const [type, setType] = useState<MarketType>('binary');
  const [outcomes, setOutcomes] = useState<string[]>(['Yes', 'No']);
  const [realityBond, setRealityBond] = useState<number>(200);
  const [resolutionDate, setResolutionDate] = useState('2026-11-15T00:00:00Z');
  const [initialLiquidity, setInitialLiquidity] = useState<number>(500);

  if (!isOpen) return null;

  const categories: MarketCategory[] = [
    'Crypto',
    'Politics',
    'Business',
    'Science',
    'Sports',
    'AI',
    'Macro/Fed',
    'DeFi Risk'
  ];

  const handleAddOutcome = () => {
    if (outcomes.length < 6) {
      setOutcomes([...outcomes, `Candidate ${outcomes.length + 1}`]);
    }
  };

  const handleRemoveOutcome = (idx: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== idx));
    }
  };

  const handleOutcomeChange = (idx: number, val: string) => {
    const updated = [...outcomes];
    updated[idx] = val;
    setOutcomes(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Strict probability distribution evenly distributed to sum to 1.000
    const count = outcomes.length;
    const baseProb = +(1 / count).toFixed(2);
    const formattedOutcomes = outcomes.map((name, i) => ({
      id: `o-cust-${Date.now()}-${i}`,
      name,
      probability: i === count - 1 ? +(1 - baseProb * (count - 1)).toFixed(2) : baseProb,
      priceCents: Math.round(baseProb * 100),
      volumeUsd: 0,
      change24h: 0
    }));

    createMarket({
      title,
      description,
      category,
      type,
      outcomes: formattedOutcomes,
      realityBond,
      resolutionDate,
      liquidityUsd: initialLiquidity,
      collateralToken: wallet.network === 'Gnosis Chain' ? 'sDAI' : 'sUSDS'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-card border border-subtle rounded-2xl shadow-2xl overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-ef-violet text-white flex items-center justify-center font-bold">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">Create New Prediction Market</h3>
            <p className="text-xs text-text-secondary">
              Deploy a Conditional Tokens Framework market on Gnosis Chain (sDAI) or Ethereum (sUSDS)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Market Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
              Market Title / Question *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Will Ethereum achieve sub-second finality before Q4 2026?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ground border border-subtle rounded-xl text-xs text-text-primary focus:outline-none focus:border-ef-violet"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
              Resolution Criteria &amp; Rules
            </label>
            <textarea
              rows={2}
              placeholder="Specify the unambiguous criteria, official sources, and resolution triggers for Reality.eth..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-ground border border-subtle rounded-xl text-xs text-text-primary focus:outline-none focus:border-ef-violet"
            />
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as MarketCategory)}
                className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-xs text-text-primary focus:outline-none focus:border-ef-violet"
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                Structure
              </label>
              <select
                value={type}
                onChange={e => {
                  const t = e.target.value as MarketType;
                  setType(t);
                  if (t === 'binary') setOutcomes(['Yes', 'No']);
                  else if (outcomes.length < 3) setOutcomes(['Option A', 'Option B', 'Option C']);
                }}
                className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-xs text-text-primary focus:outline-none focus:border-ef-violet"
              >
                <option value="binary">Binary (YES / NO)</option>
                <option value="multi-categorical">Multi-Categorical (3+ Options)</option>
                <option value="head-to-head">Head-to-Head Matchup</option>
              </select>
            </div>
          </div>

          {/* Outcome Slots */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Outcome Slots (ERC-1155 Token IDs)
              </label>
              {type !== 'binary' && outcomes.length < 6 && (
                <button
                  type="button"
                  onClick={handleAddOutcome}
                  className="text-xs text-ef-violet hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Outcome
                </button>
              )}
            </div>

            <div className="space-y-2">
              {outcomes.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 text-center text-xs font-mono text-text-muted">
                    #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleOutcomeChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-ground border border-subtle rounded-lg text-xs text-text-primary focus:outline-none focus:border-ef-violet"
                  />
                  {type !== 'binary' && outcomes.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOutcome(idx)}
                      className="p-1.5 text-text-muted hover:text-signal-no"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reality.eth Bond & Liquidity */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                Reality.eth Opening Bond
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={realityBond}
                  onChange={e => setRealityBond(parseInt(e.target.value) || 100)}
                  className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-xs font-mono text-text-primary focus:outline-none focus:border-ef-violet"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-muted">
                  sDAI
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                Initial AMM Seed Liquidity
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={initialLiquidity}
                  onChange={e => setInitialLiquidity(parseInt(e.target.value) || 200)}
                  className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-xs font-mono text-text-primary focus:outline-none focus:border-ef-violet"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-muted">
                  sDAI
                </span>
              </div>
            </div>
          </div>

          {/* Protocol Info Note */}
          <div className="p-3 bg-ground border border-subtle rounded-xl flex items-start gap-2.5 text-xs text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-signal-yes shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              Markets use the <strong>Conditional Tokens Framework (ERC-1155)</strong> with wrapped ERC-20 AMM pools. Yield on initial liquidity accrues to the creator pool at ~5.2% APY until resolution.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-ef-violet text-white hover:bg-ef-violet-hover shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Deploy Market</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
