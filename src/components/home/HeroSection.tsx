import React from 'react';
import { ArrowRight, Compass, Sparkles, BookOpen, Layers } from 'lucide-react';
import { PageRoute } from '../../types';
import { useSound } from '../../context/SoundContext';
import { ParticleGlobeCanvas } from './ParticleGlobeCanvas';
import { PixelSeerLogo } from './PixelSeerLogo';
import { SatelliteMarketCards } from './SatelliteMarketCards';
import { EcosystemRibbon } from './EcosystemRibbon';

interface HeroSectionProps {
  onNavigate: (page: PageRoute) => void;
  onOpenRationale: () => void;
  onQuickTradeDirect?: (title: string, outcome: string, price: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenRationale,
  onQuickTradeDirect
}) => {
  const { playChime } = useSound();

  const handleSatelliteTrade = (title: string, outcome: string, price: number) => {
    playChime('click');
    if (onQuickTradeDirect) {
      onQuickTradeDirect(title, outcome, price);
    } else {
      onNavigate('app');
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none bg-ground flex flex-col justify-between">
      {/* 3D PARTICLE PLANET VIEWPORT (Continents point cloud from real Earth geography) */}
      <div className="relative min-h-[640px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col items-center justify-center overflow-hidden py-10 lg:py-0">
        {/* Moving 3D Particle Planet in Background */}
        <ParticleGlobeCanvas />

        {/* Ambient Vignette for deep cosmic focus */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-ground/25 to-ground/85 pointer-events-none" />

        {/* Foreground Center Stage (Stationary in front of the moving planet) */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pointer-events-auto">
          {/* Seer Logo (Anchor stationary in front of the rotating 3D planet with dynamic hover motion effect) */}
          <div className="inline-block transform hover:scale-[1.02] transition-transform duration-300">
            <PixelSeerLogo />
          </div>

          {/* Main Headline */}
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.12]">
              Prediction Markets For
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-text-primary via-[#A78BFA] to-signal-cyan bg-clip-text text-transparent pb-1">
              Distilled Human Judgement
            </h2>
          </div>

          {/* Perfected CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => {
                playChime('whoosh');
                onNavigate('app');
              }}
              className="h-11 px-7 rounded-full text-xs sm:text-sm font-semibold bg-ef-violet hover:bg-ef-violet-hover text-white shadow-lg shadow-ef-violet/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Markets</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                playChime('click');
                onOpenRationale();
              }}
              className="h-11 px-6 rounded-full text-xs sm:text-sm font-semibold bg-card/85 hover:bg-elevated border border-subtle text-text-primary backdrop-blur-md transition-all hover:border-ef-violet/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* Floating Satellite Cards (Desktop safe-zone pinned + Mobile swipe ticker) */}
        <SatelliteMarketCards onQuickTrade={handleSatelliteTrade} />
      </div>

      {/* FULL-WIDTH ECOSYSTEM PARTNER STRIP (Refined Obsidian Glass, no harsh neon rectangle) */}
      <EcosystemRibbon />
    </div>
  );
};