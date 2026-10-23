import React from 'react';
import { Layers } from 'lucide-react';

interface OrderBookDepthProps {
  yesPriceCents: number;
  liquidityUsd?: number;
}

export const OrderBookDepth: React.FC<OrderBookDepthProps> = ({
  yesPriceCents = 50,
  liquidityUsd = 125000
}) => {
  const noPriceCents = 100 - yesPriceCents;

  const bids = [
    { price: yesPriceCents, shares: 14200, total: 14200 * (yesPriceCents / 100) },
    { price: Math.max(1, yesPriceCents - 1), shares: 28400, total: 28400 * ((yesPriceCents - 1) / 100) },
    { price: Math.max(1, yesPriceCents - 2), shares: 41000, total: 41000 * ((yesPriceCents - 2) / 100) },
    { price: Math.max(1, yesPriceCents - 3), shares: 62500, total: 62500 * ((yesPriceCents - 3) / 100) },
  ];

  const asks = [
    { price: Math.min(99, yesPriceCents + 1), shares: 12100, total: 12100 * ((yesPriceCents + 1) / 100) },
    { price: Math.min(99, yesPriceCents + 2), shares: 25800, total: 25800 * ((yesPriceCents + 2) / 100) },
    { price: Math.min(99, yesPriceCents + 3), shares: 39400, total: 39400 * ((yesPriceCents + 3) / 100) },
    { price: Math.min(99, yesPriceCents + 4), shares: 58000, total: 58000 * ((yesPriceCents + 4) / 100) },
  ];

  const maxTotal = 62500;

  return (
    <div className="bg-ground border border-subtle rounded-2xl p-4 select-none space-y-3">
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-text-muted">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-ef-violet" />
          <span>AMM Depth &amp; Limit Order Book</span>
        </div>
        <span>Pool Liq: ${(liquidityUsd / 1000).toFixed(0)}k sDAI</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        {/* Bids (YES Buyers - Green) */}
        <div className="space-y-1">
          <div className="text-[10px] text-signal-yes uppercase font-bold flex justify-between pb-1 border-b border-subtle">
            <span>Bid (YES)</span>
            <span>Size</span>
          </div>
          {bids.map((b, i) => (
            <div key={i} className="relative flex justify-between py-1 px-1.5 rounded overflow-hidden">
              <div
                className="absolute inset-y-0 right-0 bg-signal-yes-soft rounded"
                style={{ width: `${(b.shares / maxTotal) * 100}%` }}
              />
              <span className="relative z-10 font-bold text-signal-yes">{b.price}¢</span>
              <span className="relative z-10 text-text-secondary">{b.shares.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Asks (YES Sellers / NO - Red) */}
        <div className="space-y-1">
          <div className="text-[10px] text-signal-no uppercase font-bold flex justify-between pb-1 border-b border-subtle">
            <span>Ask (YES)</span>
            <span>Size</span>
          </div>
          {asks.map((a, i) => (
            <div key={i} className="relative flex justify-between py-1 px-1.5 rounded overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-signal-no-soft rounded"
                style={{ width: `${(a.shares / maxTotal) * 100}%` }}
              />
              <span className="relative z-10 font-bold text-signal-no">{a.price}¢</span>
              <span className="relative z-10 text-text-secondary">{a.shares.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-subtle flex items-center justify-between text-[10px] font-mono text-text-muted">
        <span>Spread: 1.0¢ (Uniswap v3 0.05% Tier)</span>
        <span>Constant Product Invariant: x · y = k</span>
      </div>
    </div>
  );
};
