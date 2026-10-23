import React from 'react';

export const EcosystemRibbon: React.FC = () => {
  const partners = [
    {
      name: 'Gnosis Chain',
      category: 'Settlement Layer',
      url: 'https://gnosis.io',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Kleros Court',
      category: 'Dispute Arbitration',
      url: 'https://kleros.io',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4a2 2 0 110 4 2 2 0 010-4zm4 11H8v-1.5c0-1.66 2.67-2.5 4-2.5s4 .84 4 2.5V17z" />
        </svg>
      )
    },
    {
      name: 'Reality.eth',
      category: 'Optimistic Oracle',
      url: 'https://reality.eth.link',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Spark sDAI',
      category: 'Yield Engine (~5.2%)',
      url: 'https://spark.fi',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
        </svg>
      )
    },
    {
      name: 'CoW Swap',
      category: 'Batch Auction AMM',
      url: 'https://cow.fi',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <circle cx="8" cy="10" r="3" fill="currentColor" />
          <circle cx="16" cy="10" r="3" fill="currentColor" />
          <path d="M4 6c2 4 6 7 8 7s6-3 8-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="12" cy="15" rx="5" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: 'Safe (Zodiac)',
      category: 'Autonomous Execution',
      url: 'https://safe.global',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-ground/90 border-y border-subtle/70 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8 select-none relative z-20 transition-colors">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Refined Institutional Caption */}
        <div className="text-center">
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-text-muted uppercase">
            TRUSTED &amp; INTEGRATED WITH WEB3 SETTLEMENT INFRASTRUCTURE
          </span>
        </div>

        {/* Partners Ribbon: Subtle Monochrome with Electric Violet on Hover */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 pt-1">
          {partners.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-all transform hover:scale-105 group font-mono text-xs font-semibold cursor-pointer"
              title={`${p.name} • ${p.category}`}
            >
              <div className="shrink-0 text-text-muted group-hover:text-ef-violet transition-colors">
                {p.icon}
              </div>
              <span className="group-hover:text-text-primary transition-colors">
                {p.name}
              </span>
              <span className="hidden xl:inline text-[9px] text-text-muted/60 uppercase">
                ({p.category})
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};