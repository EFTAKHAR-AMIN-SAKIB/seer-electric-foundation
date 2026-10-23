import React from 'react';
import { Market, PageRoute } from '../../types';
import { MarketCard } from '../app/MarketCard';
import { Compass, ArrowRight } from 'lucide-react';

interface FeaturedMarketsProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
  onQuickTrade: (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
  onNavigate: (page: PageRoute) => void;
}

export const FeaturedMarkets: React.FC<FeaturedMarketsProps> = ({
  markets,
  onSelectMarket,
  onQuickTrade,
  onNavigate
}) => {
  const featured = markets.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-ef-violet" />
            <h3 className="text-xl font-extrabold text-text-primary">
              Featured Prediction Markets
            </h3>
          </div>
          <p className="text-xs text-text-secondary font-mono mt-0.5">
            Strict probability conservation: P(Yes) + P(No) = 100.0¢ ($1.00) • Real sDAI Collateral
          </p>
        </div>

        <button
          onClick={() => onNavigate('app')}
          className="text-xs font-mono font-bold text-ef-violet hover:underline flex items-center gap-1.5"
        >
          <span>View All 12+ Markets in Terminal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map(market => (
          <MarketCard
            key={market.id}
            market={market}
            onSelectMarket={onSelectMarket}
            onQuickTrade={onQuickTrade}
          />
        ))}
      </div>
    </div>
  );
};
