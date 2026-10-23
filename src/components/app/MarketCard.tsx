import React from 'react';
import { Market } from '../../types';
import { Sparkline } from '../charts/Sparkline';
import { Bookmark, Gift, TrendingUp, Radio, ArrowUpRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface MarketCardProps {
  market: Market;
  onSelectMarket: (market: Market) => void;
  onQuickTrade: (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  onSelectMarket,
  onQuickTrade
}) => {
  const { playChime } = useSound();
  const [bookmarked, setBookmarked] = React.useState(false);

  const formatVol = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(0)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    playChime('click');
    onSelectMarket(market);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-card border border-subtle hover:border-ef-violet/50 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg flex flex-col justify-between cursor-pointer select-none"
    >
      {/* Top Header: Category, Live Badge & Yield Marker */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {market.live ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-signal-no uppercase bg-signal-no-soft px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-no animate-live-pulse" />
                LIVE
              </span>
            ) : (
              <span className="text-[10px] font-mono uppercase text-text-muted px-1.5 py-0.5 rounded bg-elevated border border-subtle">
                {market.category}
              </span>
            )}
            <span className="text-[10px] font-mono text-signal-yes flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-yes" />
              {market.collateralToken} ~5.2%
            </span>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className="text-text-muted hover:text-text-primary p-1 rounded-md hover:bg-elevated transition-colors cursor-pointer"
            title="Bookmark Market"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-ef-violet text-ef-violet' : ''}`} />
          </button>
        </div>

        {/* Market Title */}
        <h3 className="text-sm font-bold text-text-primary group-hover:text-ef-violet transition-colors line-clamp-2 leading-snug mb-3.5">
          {market.title}
        </h3>

        {/* OUTCOME REPRESENTATIONS (Honors Figma mock types + Departure #1 Emerald/Coral) */}
        {/* Archetype A: Fast Binary (e.g. BTC Up or Down 5m) */}
        {market.type === 'fast-binary' && (
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onQuickTrade(market, market.outcomes[0].id, 'UP')}
                className="h-12 px-3 rounded-xl bg-signal-yes hover:brightness-110 text-black font-mono font-bold text-xs flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span>UP</span>
                <span className="text-[10px] font-normal opacity-90">{market.outcomes[0].priceCents}¢ ({(market.outcomes[0].probability * 100).toFixed(0)}%)</span>
              </button>

              <button
                onClick={() => onQuickTrade(market, market.outcomes[1].id, 'DOWN')}
                className="h-12 px-3 rounded-xl bg-signal-no hover:brightness-110 text-white font-mono font-bold text-xs flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span>DOWN</span>
                <span className="text-[10px] font-normal opacity-90">{market.outcomes[1].priceCents}¢ ({(market.outcomes[1].probability * 100).toFixed(0)}%)</span>
              </button>
            </div>
          </div>
        )}

        {/* Archetype B: Binary Single Question (e.g. Strait of Hormuz) */}
        {market.type === 'binary' && (
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onQuickTrade(market, market.outcomes[0].id, 'YES')}
                className="h-12 px-3 rounded-xl bg-signal-yes hover:brightness-110 text-black font-mono font-bold text-xs flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span>YES</span>
                <span className="text-[10px] font-normal opacity-90">{market.outcomes[0].priceCents}¢</span>
              </button>

              <button
                onClick={() => onQuickTrade(market, market.outcomes[1].id, 'NO')}
                className="h-12 px-3 rounded-xl bg-signal-no hover:brightness-110 text-white font-mono font-bold text-xs flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span>NO</span>
                <span className="text-[10px] font-normal opacity-90">{market.outcomes[1].priceCents}¢</span>
              </button>
            </div>
          </div>
        )}

        {/* Archetype C: Multi-Outcome Binary Rows (e.g. Iranian Blockade dates / Golden Boot) */}
        {market.type === 'multi-categorical' && market.outcomes.length > 2 && (
          <div className="space-y-2 mb-4">
            {market.outcomes.slice(0, 3).map(outcome => (
              <div
                key={outcome.id}
                className="p-2.5 bg-ground/80 border border-subtle rounded-xl flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0 pr-1">
                  <div className="text-xs font-semibold text-text-primary truncate">
                    {outcome.name}
                  </div>
                  <div className="text-[11px] font-mono text-text-muted">
                    {(outcome.probability * 100).toFixed(0)}%
                  </div>
                </div>

                {/* Departure #1: Clear Semantic Colors for Yes / No */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onQuickTrade(market, outcome.id, 'YES')}
                    className="h-7 px-3 rounded-lg text-xs font-mono font-bold bg-signal-yes text-black hover:brightness-110 transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
                    title={`Buy YES for ${outcome.name}`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => onQuickTrade(market, outcome.id, 'NO')}
                    className="h-7 px-3 rounded-lg text-xs font-mono font-bold bg-signal-no text-white hover:brightness-110 transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
                    title={`Buy NO for ${outcome.name}`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Archetype D: Head-to-Head / Esports / 3-Way Matchup */}
        {market.type === 'head-to-head' && (
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-2 gap-2">
              {market.outcomes.slice(0, 2).map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => onQuickTrade(market, opt.id, i === 0 ? 'YES' : 'NO')}
                  className={`h-12 px-2 rounded-xl text-xs font-mono font-bold text-center border transition-all active:scale-95 cursor-pointer flex flex-col items-center justify-center ${
                    i === 0
                      ? 'bg-signal-yes text-black border-signal-yes hover:brightness-110'
                      : 'bg-signal-no text-white border-signal-no hover:brightness-110'
                  }`}
                >
                  <div className="truncate max-w-[110px]">{opt.name}</div>
                  <div className="text-[10px] font-normal opacity-90">{opt.priceCents}¢ ({(opt.probability * 100).toFixed(0)}%)</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Volume, Match Info, Mini-Sparkline */}
      <div className="pt-3 border-t border-subtle flex items-center justify-between text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-text-primary">
            {formatVol(market.volumeUsd)} Vol.
          </span>
          {market.matchInfo && (
            <span className="text-[11px] truncate max-w-[110px]">
              • {market.matchInfo}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Sparkline data={market.sparkline} width={45} height={18} />
          <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-ef-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};