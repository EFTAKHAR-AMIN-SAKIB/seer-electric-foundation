import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Sparkles, Check, Globe } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface SatelliteMarketCardsProps {
  onQuickTrade: (title: string, outcome: string, price: number) => void;
}

export const SatelliteMarketCards: React.FC<SatelliteMarketCardsProps> = ({ onQuickTrade }) => {
  const { playChime } = useSound();

  const allCards = [
    {
      id: 'lepen',
      title: 'Le Pen RN Candidate',
      badge: 'LIVE',
      isYesNo: true,
      yesLabel: 'Yes 85.1% • 85¢',
      noLabel: 'No 14.9% • 15¢',
      tradeTitle: 'Le Pen RN Candidate',
      tradeOutcome: 'Yes',
      tradePrice: 85
    },
    {
      id: 'french-pres',
      title: 'French Pres. Election (RN)',
      icon: '🇫🇷',
      progress: 67.9,
      progressLabel: 'No 67.9% • 68¢',
      tradeTitle: 'French Pres. Election (RN)',
      tradeOutcome: 'No',
      tradePrice: 68
    },
    {
      id: 'french-assembly',
      title: 'French Assembly Winner',
      badge: 'LEAD',
      leadLabel: 'PROJECTED PLURALITY 36.9%',
      winnerLabel: 'Left 37¢',
      secondLabel: '2nd: Centre 34.0% • 34¢',
      tradeTitle: 'French Assembly Plurality',
      tradeOutcome: 'Left',
      tradePrice: 37
    },
    {
      id: 'knesset',
      title: 'Knesset 2026 Plurality',
      icon: '🏛️',
      badge: 'LEAD',
      leadLabel: 'LEADING SEAT SHARE 60.9%',
      winnerLabel: 'Yashar 61¢',
      secondLabel: '2nd: Likud 38.2% • 38¢',
      tradeTitle: 'Knesset 2026 Plurality',
      tradeOutcome: 'Yashar',
      tradePrice: 61
    },
    {
      id: 'polymarket-fees',
      title: 'Polymarket Position Fees',
      icon: '⚡',
      isYesNo: true,
      yesLabel: 'Yes 50% • 6.3¢',
      noLabel: 'No 50% • 6.3¢',
      tradeTitle: 'Polymarket Position Fees',
      tradeOutcome: 'Yes',
      tradePrice: 50
    },
    {
      id: 'zktls',
      title: 'ZK-TLS Evaluator Score',
      icon: '🛡️',
      progress: 81.4,
      scoreLabel: '8.14 / 10',
      tradeTitle: 'ZK-TLS Evaluator Score',
      tradeOutcome: 'Score',
      tradePrice: 81
    }
  ];

  return (
    <>
      {/* DESKTOP SATELLITE CARDS: Centered safe-zone container to guarantee ZERO clipping */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 relative">
          {/* CARD 1: Top Left - Le Pen RN Candidate */}
          <div className="absolute top-10 left-4 xl:left-8 w-60 xl:w-64 pointer-events-auto transform transition-all duration-300 hover:scale-105 hover:z-30">
            <div
              onClick={() => onQuickTrade('Le Pen RN Candidate', 'Yes', 85)}
              className="p-3.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-subtle/80 hover:border-ef-violet/60 shadow-xl cursor-pointer space-y-2 select-none group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                <span className="w-2 h-2 rounded-full bg-signal-yes animate-live-pulse" />
                <span className="truncate">Le Pen RN Candidate</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                <div className="p-2 rounded-xl bg-ef-violet text-white text-center font-bold shadow-sm">
                  <div className="text-[9px] opacity-80 uppercase tracking-wider">Yes</div>
                  <div className="text-xs mt-0.5">85.1% • 85¢</div>
                </div>

                <div className="p-2 rounded-xl bg-ground/80 border border-subtle text-center">
                  <div className="text-[9px] text-text-muted uppercase tracking-wider">No</div>
                  <div className="text-text-secondary font-bold text-xs mt-0.5">14.9% • 15¢</div>
                </div>
              </div>
            </div>

            {/* Dotted tracer line pointing inward */}
            <div className="hidden xl:block absolute -right-10 top-1/2 w-10 border-t border-dashed border-ef-violet/30 pointer-events-none" />
          </div>

          {/* CARD 2: Bottom Left - French Assembly Winner */}
          <div className="absolute bottom-12 left-4 xl:left-8 w-60 xl:w-64 pointer-events-auto transform transition-all duration-300 hover:scale-105 hover:z-30">
            <div
              onClick={() => onQuickTrade('French Assembly Plurality', 'Left', 37)}
              className="p-3.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-subtle/80 hover:border-ef-violet/60 shadow-xl cursor-pointer space-y-2 select-none group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary truncate">French Assembly Winn...</span>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-ef-violet text-white font-bold">
                  LEAD
                </span>
              </div>

              <div className="p-2 rounded-xl bg-ground/80 border border-subtle font-mono text-xs space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className="text-text-muted uppercase tracking-wider">PROJECTED PLURALITY</span>
                  <span className="text-ef-violet font-bold">36.9%</span>
                </div>
                <div className="flex justify-between font-bold text-text-primary text-xs">
                  <span>Left</span>
                  <span>37¢</span>
                </div>
                <div className="flex justify-between text-[10px] text-text-muted pt-1 border-t border-subtle">
                  <span>2nd: Centre</span>
                  <span>34.0% • 34¢</span>
                </div>
              </div>
            </div>

            <div className="hidden xl:block absolute -right-10 top-1/2 w-10 border-t border-dashed border-ef-violet/30 pointer-events-none" />
          </div>

          {/* CARD 3: Top Right - Knesset 2026 Plurality */}
          <div className="absolute top-10 right-4 xl:right-8 w-60 xl:w-64 pointer-events-auto transform transition-all duration-300 hover:scale-105 hover:z-30">
            <div
              onClick={() => onQuickTrade('Knesset 2026 Plurality', 'Yashar', 61)}
              className="p-3.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-subtle/80 hover:border-ef-violet/60 shadow-xl cursor-pointer space-y-2 select-none group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                  <span className="w-4 h-4 rounded-full bg-signal-cyan-soft text-signal-cyan flex items-center justify-center text-[9px]">
                    🏛️
                  </span>
                  <span className="truncate">Knesset 2026 Plurality</span>
                </div>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-ef-violet text-white font-bold">
                  LEAD
                </span>
              </div>

              <div className="p-2 rounded-xl bg-ground/80 border border-subtle font-mono text-xs space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className="text-text-muted uppercase tracking-wider">LEADING SEAT SHARE</span>
                  <span className="text-signal-cyan font-bold">60.9%</span>
                </div>
                <div className="flex justify-between font-bold text-text-primary text-xs">
                  <span>Yashar</span>
                  <span>61¢</span>
                </div>
                <div className="flex justify-between text-[10px] text-text-muted pt-1 border-t border-subtle">
                  <span>2nd: Likud</span>
                  <span>38.2% • 38¢</span>
                </div>
              </div>
            </div>

            <div className="hidden xl:block absolute -left-10 top-1/2 w-10 border-t border-dashed border-signal-cyan/30 pointer-events-none" />
          </div>

          {/* CARD 4: Bottom Right - ZK-TLS Evaluator Score */}
          <div className="absolute bottom-12 right-4 xl:right-8 w-60 xl:w-64 pointer-events-auto transform transition-all duration-300 hover:scale-105 hover:z-30">
            <div
              onClick={() => onQuickTrade('ZK-TLS Evaluator Score', 'Score', 81)}
              className="p-3.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-subtle/80 hover:border-ef-violet/60 shadow-xl cursor-pointer space-y-2 select-none group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                <span className="w-5 h-5 rounded-lg bg-signal-cyan-soft text-signal-cyan flex items-center justify-center text-[10px]">
                  🛡️
                </span>
                <span className="truncate">ZK-TLS Evaluator Score</span>
              </div>

              <div className="space-y-1 font-mono text-xs pt-0.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-muted text-[10px]">Score:</span>
                  <span className="font-bold text-signal-yes text-xs">8.14 / 10</span>
                </div>
                <div className="h-1.5 w-full bg-ground rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-ef-violet via-signal-cyan to-signal-yes rounded-full transition-all duration-500" style={{ width: '81.4%' }} />
                </div>
              </div>
            </div>

            <div className="hidden xl:block absolute -left-10 top-1/2 w-10 border-t border-dashed border-ef-violet/30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET VIEW: REFINED SWIPE TICKER (Guaranteed no overflow) */}
      <div className="lg:hidden w-full px-4 pt-3 pb-2 z-20 pointer-events-auto max-w-xl mx-auto">
        <div className="flex items-center justify-between text-[11px] font-mono text-text-muted mb-2 px-1">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-ef-violet">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-yes animate-live-pulse" />
            Live Forecast Signals (Swipe)
          </span>
          <span className="text-[10px] text-text-muted">6 Markets Active</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory scroll-smooth px-1" style={{ scrollbarWidth: 'none' }}>
          {allCards.map(c => (
            <div
              key={c.id}
              onClick={() => onQuickTrade(c.tradeTitle, c.tradeOutcome, c.tradePrice)}
              className="shrink-0 w-60 p-3.5 rounded-2xl bg-card/90 backdrop-blur-xl border border-subtle hover:border-ef-violet/60 shadow-lg cursor-pointer space-y-2 select-none snap-center transition-transform active:scale-95"
            >
              <div className="flex items-center justify-between text-xs font-bold text-text-primary">
                <div className="flex items-center gap-1.5 truncate">
                  {c.icon && <span className="text-[11px]">{c.icon}</span>}
                  <span className="truncate">{c.title}</span>
                </div>
                {c.badge && (
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-ef-violet text-white font-bold shrink-0">
                    {c.badge}
                  </span>
                )}
              </div>

              {c.isYesNo ? (
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                  <div className="p-1.5 rounded-lg bg-ef-violet text-white text-center font-bold">
                    {c.yesLabel}
                  </div>
                  <div className="p-1.5 rounded-lg bg-ground border border-subtle text-center text-text-secondary">
                    {c.noLabel}
                  </div>
                </div>
              ) : c.progress !== undefined ? (
                <div className="space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between text-text-secondary">
                    <span>{c.scoreLabel || 'Consensus'}</span>
                    <span className="font-bold text-text-primary">{c.progressLabel || `${c.progress}%`}</span>
                  </div>
                  <div className="h-1.5 w-full bg-ground rounded-full overflow-hidden">
                    <div className="h-full bg-ef-violet rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-ground border border-subtle font-mono text-[10px] space-y-0.5">
                  <div className="text-[9px] text-text-muted">{c.leadLabel}</div>
                  <div className="font-bold text-text-primary">{c.winnerLabel}</div>
                  <div className="text-[9px] text-text-muted pt-0.5 border-t border-subtle">{c.secondLabel}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};