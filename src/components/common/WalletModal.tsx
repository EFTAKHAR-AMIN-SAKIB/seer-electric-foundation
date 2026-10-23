import React from 'react';
import { X, Check, Copy, ExternalLink, RefreshCw, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { wallet, connectWallet, disconnectWallet, switchNetwork, claimFaucet } = useWallet();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const providers = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'Rabby', icon: '🐰' },
    { name: 'Gnosis Safe', icon: '🛡️' },
    { name: 'WalletConnect', icon: '⚡' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card border border-subtle rounded-2xl shadow-2xl overflow-hidden p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-ef-violet-soft border border-ef-violet/30 flex items-center justify-center text-ef-violet font-mono font-bold">
            0x
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">
              {wallet.isConnected ? 'Connected Web3 Wallet' : 'Connect Wallet'}
            </h3>
            <p className="text-xs text-text-secondary">
              {wallet.isConnected ? 'Yield-bearing sDAI & sUSDS prediction settlement' : 'Select your Web3 provider to trade and evaluate'}
            </p>
          </div>
        </div>

        {wallet.isConnected ? (
          <div className="space-y-5">
            {/* Address & Network Bar */}
            <div className="p-3 bg-ground border border-subtle rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-signal-yes animate-live-pulse" />
                <span className="font-mono text-xs font-semibold text-text-primary">
                  {wallet.address?.substring(0, 10)}...{wallet.address?.substring(wallet.address.length - 8)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyAddress}
                  className="p-1.5 rounded-md hover:bg-elevated text-text-muted hover:text-text-primary transition-colors text-xs flex items-center gap-1"
                  title="Copy Address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-signal-yes" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={`https://gnosisscan.io/address/${wallet.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-md hover:bg-elevated text-text-muted hover:text-text-primary transition-colors text-xs flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Balances Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Yield-Bearing Collateral
                </span>
                <span className="text-[11px] text-signal-yes font-mono flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Earning ~5.20% APY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-elevated border border-subtle rounded-xl">
                  <div className="text-[11px] text-text-muted flex items-center justify-between">
                    <span>sDAI (Gnosis)</span>
                    <span className="text-signal-yes font-mono text-[10px]">5.2% APY</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-text-primary mt-1">
                    ${wallet.balances.sDAI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="p-3 bg-elevated border border-subtle rounded-xl">
                  <div className="text-[11px] text-text-muted flex items-center justify-between">
                    <span>sUSDS (Sky/ETH)</span>
                    <span className="text-signal-cyan font-mono text-[10px]">4.8% APY</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-text-primary mt-1">
                    ${wallet.balances.sUSDS.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

            {/* Network Selector */}
            <div className="p-3 bg-ground border border-subtle rounded-xl">
              <div className="text-xs text-text-muted mb-2">Active Network Switcher:</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => switchNetwork('Gnosis Chain')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-all ${
                    wallet.network === 'Gnosis Chain'
                      ? 'bg-ef-violet-soft border-ef-violet text-ef-violet font-semibold'
                      : 'bg-card border-subtle text-text-secondary hover:bg-elevated'
                  }`}
                >
                  <div className="font-semibold">Gnosis Chain</div>
                  <div className="text-[10px] text-text-muted font-mono">sDAI Collateral (5.2%)</div>
                </button>

                <button
                  onClick={() => switchNetwork('Ethereum Mainnet')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-all ${
                    wallet.network === 'Ethereum Mainnet'
                      ? 'bg-ef-violet-soft border-ef-violet text-ef-violet font-semibold'
                      : 'bg-card border-subtle text-text-secondary hover:bg-elevated'
                  }`}
                >
                  <div className="font-semibold">Ethereum Mainnet</div>
                  <div className="text-[10px] text-text-muted font-mono">sUSDS Collateral (4.8%)</div>
                </button>
              </div>
            </div>

            {/* Faucet & Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={claimFaucet}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-signal-yes text-black hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm font-mono active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Claim Faucet (+1,000 sDAI / sUSDS)</span>
              </button>

              <button
                onClick={disconnectWallet}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-medium bg-ground border border-subtle hover:bg-elevated text-text-muted hover:text-signal-no transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2.5">
              {providers.map(p => (
                <button
                  key={p.name}
                  onClick={() => connectWallet(p.name)}
                  className="w-full p-3.5 bg-ground hover:bg-elevated border border-subtle rounded-xl flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-xs font-semibold text-text-primary group-hover:text-ef-violet transition-colors">
                      {p.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted group-hover:text-text-primary">
                    Connect →
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 text-center">
              <span className="text-[11px] text-text-muted flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-signal-yes" />
                Protected by Reality.eth and Kleros Court Decentralized Arbitration
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
