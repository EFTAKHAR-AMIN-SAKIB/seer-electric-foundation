import React, { useState, useMemo } from 'react';
import { Market, MarketCategory, PageRoute } from '../types';
import { CategoryRibbon } from '../components/app/CategoryRibbon';
import { MarketCard } from '../components/app/MarketCard';
import { MarketTable } from '../components/app/MarketTable';
import { Compass, Sparkles, Filter, AlertCircle } from 'lucide-react';

interface AppPageProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
  onQuickTrade: (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
  searchQuery: string;
}

export const AppPage: React.FC<AppPageProps> = ({
  markets,
  onSelectMarket,
  onQuickTrade,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('All');
  const [selectedChain, setSelectedChain] = useState<'All' | 100 | 1>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter logic
  const filteredMarkets = useMemo(() => {
    return markets.filter(m => {
      // Category filter
      if (selectedCategory !== 'All' && m.category !== selectedCategory) {
        return false;
      }
      // Chain filter
      if (selectedChain !== 'All' && m.chainId !== selectedChain) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchCategory = m.category.toLowerCase().includes(q);
        const matchOutcome = m.outcomes.some(o => o.name.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCategory && !matchOutcome) {
          return false;
        }
      }
      return true;
    });
  }, [markets, selectedCategory, selectedChain, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-6">
      {/* Top Banner / Filter Navigation */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-ef-violet" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
                Seer Markets Terminal
              </h1>
            </div>
            <p className="text-xs text-text-secondary font-mono mt-0.5">
              Universal prediction markets backed by yield-bearing sDAI &amp; sUSDS collateral
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-signal-yes-soft text-signal-yes border border-signal-yes/30 font-bold">
              sDAI APY: ~5.20%
            </span>
            <span className="px-3 py-1 rounded-full bg-card border border-subtle text-text-muted">
              {filteredMarkets.length} Markets Found
            </span>
          </div>
        </div>

        {/* Category Ribbon (matches Figma horizontal pills + View Toggle) */}
        <CategoryRibbon
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          selectedChain={selectedChain}
          onSelectChain={setSelectedChain}
        />
      </div>

      {/* Markets Display */}
      {filteredMarkets.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-card border border-subtle space-y-3">
          <AlertCircle className="w-8 h-8 text-text-muted mx-auto" />
          <h4 className="text-sm font-bold text-text-primary">No Markets Match Your Filter</h4>
          <p className="text-xs text-text-secondary">
            Try adjusting your search query, selecting "All" categories, or switching chains.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMarkets.map(market => (
            <MarketCard
              key={market.id}
              market={market}
              onSelectMarket={onSelectMarket}
              onQuickTrade={onQuickTrade}
            />
          ))}
        </div>
      ) : (
        <MarketTable
          markets={filteredMarkets}
          onSelectMarket={onSelectMarket}
          onQuickTrade={onQuickTrade}
        />
      )}
    </div>
  );
};
