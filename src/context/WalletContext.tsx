import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserWallet, TradePosition, Market } from '../types';
import { MOCK_MARKETS } from '../data/mockMarkets';
import { useSound } from './SoundContext';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warn';
}

interface WalletContextType {
  wallet: UserWallet;
  markets: Market[];
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  showToast: (title: string, description: string, type?: 'success' | 'info' | 'warn') => void;
  connectWallet: (provider?: string) => void;
  disconnectWallet: () => void;
  switchNetwork: (net: 'Gnosis Chain' | 'Ethereum Mainnet') => void;
  claimFaucet: () => void;
  executeTrade: (params: {
    marketId: string;
    outcomeId: string;
    outcomeName: string;
    direction: 'YES' | 'NO' | 'UP' | 'DOWN';
    amountUsd: number;
    priceCents: number;
  }) => boolean;
  createMarket: (marketData: Partial<Market>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playChime } = useSound();
  const [markets, setMarkets] = useState<Market[]>(MOCK_MARKETS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [wallet, setWallet] = useState<UserWallet>(() => {
    return {
      address: '0x71C2B9a1845A93D01928471bFe92485720194857',
      isConnected: true,
      network: 'Gnosis Chain',
      chainId: 100,
      balances: {
        sDAI: 4250.00,
        sUSDS: 1850.00,
        xDAI: 14.80,
        SEER: 1250.00
      },
      positions: [
        {
          id: 'pos-1',
          marketId: 'm-1',
          marketTitle: 'US announces end of Iranian blockade by...?',
          outcomeName: 'August 15, 2026',
          direction: 'YES',
          shares: 500,
          avgPriceCents: 34,
          investedUsd: 170.00,
          currentValueUsd: 180.00,
          pnlUsd: 10.00,
          pnlPercent: 5.88,
          accruedYieldUsd: 1.42,
          collateralToken: 'sDAI',
          timestamp: Date.now() - 86400000 * 3
        },
        {
          id: 'pos-2',
          marketId: 'm-3',
          marketTitle: 'BTC Up or Down 5m',
          outcomeName: 'Up',
          direction: 'UP',
          shares: 200,
          avgPriceCents: 50,
          investedUsd: 100.00,
          currentValueUsd: 108.00,
          pnlUsd: 8.00,
          pnlPercent: 8.00,
          accruedYieldUsd: 0.12,
          collateralToken: 'sDAI',
          timestamp: Date.now() - 3600000
        }
      ]
    };
  });

  // Simulated background yield accrual for sDAI / sUSDS every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setWallet(prev => {
        // 5.2% APY per second simulation
        const yieldIncrement = (prev.balances.sDAI * 0.052) / (365 * 24 * 3600) * 4;
        return {
          ...prev,
          balances: {
            ...prev.balances,
            sDAI: +(prev.balances.sDAI + yieldIncrement).toFixed(4)
          },
          positions: prev.positions.map(p => ({
            ...p,
            accruedYieldUsd: +(p.accruedYieldUsd + (p.investedUsd * 0.052) / (365 * 24 * 3600) * 4).toFixed(4)
          }))
        };
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (title: string, description: string, type: 'success' | 'info' | 'warn' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev.slice(-3), { id, title, description, type }]);
    if (type === 'success') {
      playChime('success');
    } else if (type === 'warn') {
      playChime('warn');
    } else {
      playChime('click');
    }
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const connectWallet = (provider = 'MetaMask') => {
    const mockAddr = '0x71C2B9a1845A93D01928471bFe92485720194857';
    setWallet(prev => ({
      ...prev,
      isConnected: true,
      address: mockAddr
    }));
    showToast('Wallet Connected', `Connected via ${provider} to ${wallet.network}`, 'success');
  };

  const disconnectWallet = () => {
    setWallet(prev => ({
      ...prev,
      isConnected: false,
      address: null
    }));
    showToast('Wallet Disconnected', 'Session terminated', 'info');
  };

  const switchNetwork = (net: 'Gnosis Chain' | 'Ethereum Mainnet') => {
    setWallet(prev => ({
      ...prev,
      network: net,
      chainId: net === 'Gnosis Chain' ? 100 : 1
    }));
    showToast('Network Switched', `Active chain: ${net} (${net === 'Gnosis Chain' ? 'sDAI 5.2% APY' : 'sUSDS 4.8% APY'})`, 'info');
  };

  const claimFaucet = () => {
    setWallet(prev => ({
      ...prev,
      balances: {
        ...prev.balances,
        sDAI: prev.balances.sDAI + 1000,
        sUSDS: prev.balances.sUSDS + 1000,
        xDAI: prev.balances.xDAI + 5.00
      }
    }));
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#7D33FF', '#00F59B', '#06B6D4']
    });
    showToast('Faucet Claimed', '+1,000 sDAI & +1,000 sUSDS credited to your wallet for testing!', 'success');
  };

  const executeTrade = ({
    marketId,
    outcomeId,
    outcomeName,
    direction,
    amountUsd,
    priceCents
  }: {
    marketId: string;
    outcomeId: string;
    outcomeName: string;
    direction: 'YES' | 'NO' | 'UP' | 'DOWN';
    amountUsd: number;
    priceCents: number;
  }): boolean => {
    const collateralKey = wallet.network === 'Gnosis Chain' ? 'sDAI' : 'sUSDS';
    if (wallet.balances[collateralKey] < amountUsd) {
      showToast('Insufficient Collateral', `You need at least $${amountUsd} ${collateralKey}. Use the Faucet button to get free testnet collateral.`, 'warn');
      return false;
    }

    const shares = Math.floor(amountUsd / (priceCents / 100));
    const market = markets.find(m => m.id === marketId);
    const marketTitle = market ? market.title : 'Market Prediction';

    const newPosition: TradePosition = {
      id: `pos-${Date.now()}`,
      marketId,
      marketTitle,
      outcomeName,
      direction,
      shares,
      avgPriceCents: priceCents,
      investedUsd: amountUsd,
      currentValueUsd: amountUsd,
      pnlUsd: 0,
      pnlPercent: 0,
      accruedYieldUsd: 0,
      collateralToken: collateralKey,
      timestamp: Date.now()
    };

    setWallet(prev => ({
      ...prev,
      balances: {
        ...prev.balances,
        [collateralKey]: +(prev.balances[collateralKey] - amountUsd).toFixed(2)
      },
      positions: [newPosition, ...prev.positions]
    }));

    // Dynamically update the market price to show real-time market impact!
    setMarkets(prev =>
      prev.map(m => {
        if (m.id !== marketId) return m;
        // Bump the targeted outcome probability slightly and normalize
        const updatedOutcomes = m.outcomes.map(o => {
          if (o.id === outcomeId) {
            const bumpedProb = Math.min(0.99, +(o.probability + 0.02).toFixed(2));
            return {
              ...o,
              probability: bumpedProb,
              priceCents: Math.round(bumpedProb * 100),
              volumeUsd: o.volumeUsd + amountUsd
            };
          }
          return o;
        });

        // Strict probability normalization sum = 1.000
        const sumProb = updatedOutcomes.reduce((acc, o) => acc + o.probability, 0);
        const normalized = updatedOutcomes.map(o => {
          const norm = +(o.probability / sumProb).toFixed(2);
          return {
            ...o,
            probability: norm,
            priceCents: Math.round(norm * 100)
          };
        });

        return {
          ...m,
          outcomes: normalized,
          volumeUsd: m.volumeUsd + amountUsd
        };
      })
    );

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: direction === 'YES' || direction === 'UP' ? ['#00F59B', '#7D33FF'] : ['#FF4D6D', '#7D33FF']
    });

    showToast(
      'Trade Executed!',
      `Bought ${shares.toLocaleString()} shares of ${outcomeName} (${direction}) for $${amountUsd.toFixed(2)} ${collateralKey}. Accruing ~5.2% APY.`,
      'success'
    );
    return true;
  };

  const createMarket = (marketData: Partial<Market>) => {
    const newMarket: Market = {
      id: `m-custom-${Date.now()}`,
      slug: (marketData.title || 'custom-market').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: marketData.title || 'Untitled Market',
      description: marketData.description || 'Community created Seer prediction market.',
      category: marketData.category || 'Crypto',
      type: marketData.type || 'binary',
      outcomes: marketData.outcomes || [
        { id: 'o-c-1', name: 'Yes', probability: 0.50, priceCents: 50, volumeUsd: 1000, change24h: 0 },
        { id: 'o-c-2', name: 'No', probability: 0.50, priceCents: 50, volumeUsd: 1000, change24h: 0 }
      ],
      volumeUsd: 2000,
      liquidityUsd: 5000,
      collateralToken: wallet.network === 'Gnosis Chain' ? 'sDAI' : 'sUSDS',
      chainId: wallet.chainId,
      networkName: wallet.network,
      resolutionDate: marketData.resolutionDate || new Date(Date.now() + 86400000 * 30).toISOString(),
      realityQuestionId: `0x${Math.random().toString(16).substr(2, 40)}`,
      realityBond: marketData.realityBond || 200,
      escalationTimeoutHours: 24,
      arbitrator: 'Kleros General Court (0x988b...)',
      conditionId: `0x${Math.random().toString(16).substr(2, 40)}`,
      ammPool: 'Swapr CTF Pool',
      status: 'Open',
      sparkline: [50, 50, 50, 50, 50, 50]
    };

    setMarkets(prev => [newMarket, ...prev]);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#7D33FF', '#00F59B', '#06B6D4']
    });
    showToast('Market Initialized On-Chain', `"${newMarket.title}" is now open for conditional trading!`, 'success');
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        markets,
        toasts,
        dismissToast,
        showToast,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        claimFaucet,
        executeTrade,
        createMarket
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
};
