import React, { createContext, useContext, useState } from 'react';
import { Market, MarketOutcome } from '../types';

interface TradeSlipState {
  isOpen: boolean;
  market: Market | null;
  outcome: MarketOutcome | null;
  direction: 'YES' | 'NO' | 'UP' | 'DOWN';
  amountUsd: number;
}

interface TradeSlipContextType {
  state: TradeSlipState;
  openTradeSlip: (market: Market, outcomeId?: string, direction?: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
  closeTradeSlip: () => void;
  setAmountUsd: (amount: number) => void;
  setOutcome: (outcomeId: string, direction?: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
  setDirection: (direction: 'YES' | 'NO' | 'UP' | 'DOWN') => void;
}

const TradeSlipContext = createContext<TradeSlipContextType | undefined>(undefined);

export const TradeSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TradeSlipState>({
    isOpen: false,
    market: null,
    outcome: null,
    direction: 'YES',
    amountUsd: 50
  });

  const openTradeSlip = (market: Market, outcomeId?: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN' = 'YES') => {
    let outcome = market.outcomes[0];
    if (outcomeId) {
      const found = market.outcomes.find(o => o.id === outcomeId);
      if (found) outcome = found;
    }
    setState({
      isOpen: true,
      market,
      outcome,
      direction,
      amountUsd: 50
    });
  };

  const closeTradeSlip = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const setAmountUsd = (amountUsd: number) => {
    setState(prev => ({ ...prev, amountUsd }));
  };

  const setOutcome = (outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN' = 'YES') => {
    setState(prev => {
      if (!prev.market) return prev;
      const found = prev.market.outcomes.find(o => o.id === outcomeId) || prev.outcome;
      return {
        ...prev,
        outcome: found,
        direction
      };
    });
  };

  const setDirection = (direction: 'YES' | 'NO' | 'UP' | 'DOWN') => {
    setState(prev => ({ ...prev, direction }));
  };

  return (
    <TradeSlipContext.Provider
      value={{
        state,
        openTradeSlip,
        closeTradeSlip,
        setAmountUsd,
        setOutcome,
        setDirection
      }}
    >
      {children}
    </TradeSlipContext.Provider>
  );
};

export const useTradeSlip = () => {
  const ctx = useContext(TradeSlipContext);
  if (!ctx) throw new Error('useTradeSlip must be used within TradeSlipProvider');
  return ctx;
};
