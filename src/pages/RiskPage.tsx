import React, { useState } from 'react';
import { RiskOverview } from '../components/risk/RiskOverview';
import { RiskMatrixGrid } from '../components/risk/RiskMatrixGrid';
import { PortfolioHedgeCalculator } from '../components/risk/PortfolioHedgeCalculator';
import { StressTestSimulator } from '../components/risk/StressTestSimulator';
import { MOCK_RISK_PROTOCOLS } from '../data/mockRisk';
import { RiskProtocol, RiskSeverityTier } from '../types';

export const RiskPage: React.FC = () => {
  const [protocols] = useState<RiskProtocol[]>(MOCK_RISK_PROTOCOLS);
  const [selectedProtocol, setSelectedProtocol] = useState<RiskProtocol>(protocols[1]); // Ethena default
  const [selectedTier, setSelectedTier] = useState<RiskSeverityTier>(protocols[1].tiers[1]); // Tier 2 default

  const handleSelectHedge = (protocol: RiskProtocol, tier: RiskSeverityTier) => {
    setSelectedProtocol(protocol);
    setSelectedTier(tier);
    // Smooth scroll down to calculator
    const calcEl = document.getElementById('portfolio-calc');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8">
      {/* Intro Overview */}
      <RiskOverview />

      {/* 2D Tail-Risk Heatmap Matrix */}
      <RiskMatrixGrid
        protocols={protocols}
        onSelectHedge={handleSelectHedge}
      />

      {/* Interactive Portfolio Hedge Calculator */}
      <div id="portfolio-calc">
        <PortfolioHedgeCalculator
          protocols={protocols}
          selectedProtocol={selectedProtocol}
          selectedTier={selectedTier}
          onSelectProtocol={setSelectedProtocol}
          onSelectTier={setSelectedTier}
        />
      </div>

      {/* Real-Time Stress Test Simulator */}
      <StressTestSimulator />
    </div>
  );
};
