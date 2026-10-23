import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProtocolStats } from '../components/home/ProtocolStats';
import { ArchitectureMap } from '../components/home/ArchitectureMap';
import { FeaturedMarkets } from '../components/home/FeaturedMarkets';
import { AutopilotVaults } from '../components/home/AutopilotVaults';
import { DeveloperSection } from '../components/home/DeveloperSection';
import { Market, PageRoute } from '../types';

interface HomePageProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
  onQuickTrade: (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
  onNavigate: (page: PageRoute) => void;
  onOpenRationale: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  markets,
  onSelectMarket,
  onQuickTrade,
  onNavigate,
  onOpenRationale
}) => {
  return (
    <div className="space-y-6">
      <HeroSection onNavigate={onNavigate} onOpenRationale={onOpenRationale} />
      <ProtocolStats />
      <ArchitectureMap onNavigate={onNavigate} />
      <FeaturedMarkets
        markets={markets}
        onSelectMarket={onSelectMarket}
        onQuickTrade={onQuickTrade}
        onNavigate={onNavigate}
      />
      <AutopilotVaults />
      <DeveloperSection />
    </div>
  );
};

