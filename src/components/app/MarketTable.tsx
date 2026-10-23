import React from 'react';
import { Market } from '../../types';
import { ArrowUpRight, ShieldCheck, TrendingUp, Layers, ChevronRight } from 'lucide-react';
import { Sparkline } from '../charts/Sparkline';

interface MarketTableProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
  onQuickTrade: (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
}

export const MarketTable: React.FC<MarketTableProps> = ({
  markets,
  onSelectMarket,
  onQuickTrade
}) => {
  const formatVol = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  return (
    <div className="w-full bg-card border border-subtle rounded-2xl overflow-hidden shadow-sm select-none">
      {/* Mobile Scroll Indicator */}
      <div className="sm:hidden px-4 py-2 bg-ground text-[10px] font-mono text-text-muted flex items-center justify-between border-b border-subtle">
        <span>← Swipe horizontally to inspect CTF contracts →</span>
        <span className="text-ef-violet font-bold">Tap row for terminal</span>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-subtle bg-ground/80 text-[11px] font-mono uppercase text-text-muted">
              <th className="py-3 px-4 font-semibold">Status / Category</th>
              <th className="py-3 px-4 font-semibold min-w-[280px]">Market Title &amp; Oracle Target</th>
              <th className="py-3 px-4 font-semibold min-w-[200px]">Implied Probability &amp; Prices</th>
              <th className="py-3 px-4 font-semibold">24h Vol</th>
              <th className="py-3 px-4 font-semibold">Liquidity</th>
              <th className="py-3 px-4 font-semibold">Collateral</th>
              <th className="py-3 px-4 font-semibold">Reality Bond</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle font-mono">
            {markets.map(market => {
              const topOutcome = market.outcomes[0];
              const secondOutcome = market.outcomes[1] || null;

              return (
                <tr
                  key={market.id}
                  onClick={() => onSelectMarket(market)}
                  className="hover:bg-elevated/70 transition-colors cursor-pointer group"
                >
                  {/* Status / Category */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${market.live ? 'bg-signal-no animate-live-pulse' : 'bg-signal-yes'}`} />
                      <span className="font-semibold text-text-primary">{market.category}</span>
                    </div>
                    <div className="text-[10px] text-text-muted mt-0.5">
                      {market.status}
                    </div>
                  </td>

                  {/* Title & Oracle */}
                  <td className="py-3 px-4">
                    <div className="font-sans font-bold text-text-primary group-hover:text-ef-violet transition-colors line-clamp-1">
                      {market.title}
                    </div>
                    <div className="text-[10px] text-text-muted font-mono mt-0.5 flex items-center gap-1.5">
                      <span className="truncate max-w-[200px]">Q: {market.realityQuestionId.substring(0, 16)}...</span>
                      <span>•</span>
                      <span>Kleros Court</span>
                    </div>
                  </td>

                  {/* Probability Bar */}
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-signal-yes font-bold">
                          {topOutcome.name}: {topOutcome.priceCents}¢ ({(topOutcome.probability * 100).toFixed(0)}%)
                        </span>
                        {secondOutcome && (
                          <span className="text-signal-no font-bold">
                            {secondOutcome.name}: {secondOutcome.priceCents}¢
                          </span>
                        )}
                      </div>

                      {/* Stacked Probability Bar */}
                      <div className="h-1.5 w-full bg-ground rounded-full overflow-hidden flex">
                        <div
                          className="bg-signal-yes h-full transition-all"
                          style={{ width: `${topOutcome.probability * 100}%` }}
                        />
                        {secondOutcome && (
                          <div
                            className="bg-signal-no h-full transition-all"
                            style={{ width: `${secondOutcome.probability * 100}%` }}
                          />
                        )}
                      </div>
                    </div>
                  </td>

                  {/* 24h Volume */}
                  <td className="py-3 px-4 font-bold text-text-primary whitespace-nowrap">
                    {formatVol(market.volumeUsd)}
                  </td>

                  {/* Liquidity */}
                  <td className="py-3 px-4 text-text-secondary whitespace-nowrap">
                    {formatVol(market.liquidityUsd)}
                  </td>

                  {/* Collateral & Yield */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-signal-yes font-bold">
                      <span>{market.collateralToken}</span>
                    </div>
                    <div className="text-[10px] text-text-muted font-mono">
                      ~5.20% APY
                    </div>
                  </td>

                  {/* Reality.eth Bond */}
                  <td className="py-3 px-4 whitespace-nowrap text-text-secondary">
                    ${market.realityBond} sDAI
                    <div className="text-[10px] text-text-muted">
                      {market.escalationTimeoutHours}h window
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => onQuickTrade(market, topOutcome.id, 'YES')}
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-signal-yes text-black hover:brightness-110 transition-transform active:scale-95"
                      >
                        YES {topOutcome.priceCents}¢
                      </button>
                      <button
                        onClick={() => onQuickTrade(market, topOutcome.id, 'NO')}
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-signal-no text-white hover:brightness-110 transition-transform active:scale-95"
                      >
                        NO {100 - topOutcome.priceCents}¢
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
