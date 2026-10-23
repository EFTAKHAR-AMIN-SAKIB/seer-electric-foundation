import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Filter, LayoutGrid, ListFilter, Check } from 'lucide-react';
import { MarketCategory } from '../../types';

interface CategoryRibbonProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  viewMode: 'grid' | 'table';
  onToggleViewMode: (mode: 'grid' | 'table') => void;
  selectedChain: 'All' | 100 | 1;
  onSelectChain: (chain: 'All' | 100 | 1) => void;
}

export const CategoryRibbon: React.FC<CategoryRibbonProps> = ({
  selectedCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
  selectedChain,
  onSelectChain
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const categories: MarketCategory[] = [
    'All',
    'Crypto',
    'Politics',
    'Sports',
    'Macro/Fed',
    'AI',
    'Business',
    'Science',
    'Pop Culture',
    'Elections',
    'DOGE',
    'Weather',
    'DeFi Risk'
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-2.5 select-none">
      {/* Mobile-Only Top Controls Bar */}
      <div className="flex sm:hidden items-center justify-between gap-2">
        {/* Chain Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-card border border-subtle text-text-secondary hover:text-text-primary hover:bg-elevated flex items-center gap-1.5 transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-ef-violet" />
            <span>
              {selectedChain === 'All' ? 'All Settlement Chains' : selectedChain === 100 ? 'Gnosis (sDAI 5.2%)' : 'Ethereum (sUSDS)'}
            </span>
          </button>

          {filterMenuOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-card border border-subtle shadow-2xl p-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2 py-1 text-[10px] font-mono text-text-muted uppercase tracking-wider">
                Filter by Settlement Chain
              </div>
              {[
                { label: 'All Chains', val: 'All' as const },
                { label: 'Gnosis Chain (sDAI 5.2% APY)', val: 100 as const },
                { label: 'Ethereum Mainnet (sUSDS)', val: 1 as const }
              ].map(opt => (
                <button
                  key={opt.label}
                  onClick={() => {
                    onSelectChain(opt.val);
                    setFilterMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between ${
                    selectedChain === opt.val ? 'bg-ef-violet-soft text-ef-violet font-semibold' : 'text-text-primary hover:bg-elevated'
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedChain === opt.val && <Check className="w-3.5 h-3.5 text-ef-violet" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile View Toggle */}
        <div className="flex items-center p-0.5 bg-card border border-subtle rounded-full shrink-0">
          <button
            onClick={() => onToggleViewMode('grid')}
            className={`p-1.5 rounded-full transition-colors ${
              viewMode === 'grid' ? 'bg-ef-violet text-white shadow-sm' : 'text-text-muted hover:text-text-primary'
            }`}
            title="Card Grid View"
            aria-label="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleViewMode('table')}
            className={`p-1.5 rounded-full transition-colors ${
              viewMode === 'table' ? 'bg-ef-violet text-white shadow-sm' : 'text-text-muted hover:text-text-primary'
            }`}
            title="Etherscan Table View"
            aria-label="Table View"
          >
            <ListFilter className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Left Scroll Chevrons & Category Pills - Full Width on mobile */}
        <div className="relative flex-1 flex items-center min-w-0">
          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-full bg-card border border-subtle text-text-muted hover:text-text-primary hover:bg-elevated mr-1.5 shrink-0 transition-colors hidden sm:flex"
            aria-label="Scroll Categories Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-ef-violet text-white shadow-sm font-bold'
                      : 'bg-card text-text-secondary hover:text-text-primary hover:bg-elevated border border-subtle'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-full bg-card border border-subtle text-text-muted hover:text-text-primary hover:bg-elevated ml-1.5 shrink-0 transition-colors hidden sm:flex"
            aria-label="Scroll Categories Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Tools (Desktop Only): Filter Dropdown & Grid / Table Toggle */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* Chain Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-subtle text-text-secondary hover:text-text-primary hover:bg-elevated flex items-center gap-1.5 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-ef-violet" />
              <span className="hidden sm:inline">
                {selectedChain === 'All' ? 'All Chains' : selectedChain === 100 ? 'Gnosis (sDAI)' : 'Ethereum (sUSDS)'}
              </span>
              <span className="sm:hidden">Filter</span>
            </button>

            {filterMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-subtle shadow-xl p-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1 text-[10px] font-mono text-text-muted uppercase">
                  Filter by Settlement Chain
                </div>
                {[
                  { label: 'All Chains', val: 'All' as const },
                  { label: 'Gnosis Chain (sDAI 5.2%)', val: 100 as const },
                  { label: 'Ethereum Mainnet (sUSDS)', val: 1 as const }
                ].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      onSelectChain(opt.val);
                      setFilterMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                      selectedChain === opt.val ? 'bg-ef-violet-soft text-ef-violet font-semibold' : 'text-text-primary hover:bg-elevated'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedChain === opt.val && <Check className="w-3.5 h-3.5 text-ef-violet" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid vs Table View Toggle (Departure #4: Etherscan-Grade Terminal) */}
          <div className="flex items-center p-0.5 bg-card border border-subtle rounded-full">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-ef-violet text-white shadow-sm' : 'text-text-muted hover:text-text-primary'
              }`}
              title="Consumer Card Grid View (Figma Layout)"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewMode('table')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'table' ? 'bg-ef-violet text-white shadow-sm' : 'text-text-muted hover:text-text-primary'
              }`}
              title="Institutional Etherscan-Grade Pro Table (Departure #4)"
              aria-label="Table View"
            >
              <ListFilter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
