import React, { useState } from 'react';
import {
  Compass,
  TrendingUp,
  Cpu,
  Vote,
  Grid,
  Sparkles,
  ShieldAlert,
  BookOpen,
  Plus,
  Moon,
  Sun,
  Wallet,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { PageRoute } from '../../types';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';

interface MobileBottomBarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenCreateMarket: () => void;
  onOpenWalletModal: () => void;
  onOpenRationaleDrawer: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPage,
  onNavigate,
  onOpenCreateMarket,
  onOpenWalletModal,
  onOpenRationaleDrawer
}) => {
  const { playChime, soundEnabled, toggleSound } = useSound();
  const { theme, toggleTheme } = useTheme();
  const { wallet, claimFaucet } = useWallet();
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);

  const isLight = theme === 'light';

  const handleTabClick = (page: PageRoute) => {
    playChime('click');
    onNavigate(page);
    setMoreSheetOpen(false);
  };

  const allApps = [
    { id: 'home' as PageRoute, title: 'Home Architecture', desc: 'Protocol map & telemetry', icon: Compass, color: 'text-ef-violet' },
    { id: 'app' as PageRoute, title: 'Seer Terminal', desc: 'Universal prediction explorer', icon: TrendingUp, color: 'text-signal-yes' },
    { id: 'deep' as PageRoute, title: 'Deep DAG', desc: 'Distilled Human Judgment', icon: Cpu, color: 'text-signal-cyan' },
    { id: 'futarchy' as PageRoute, title: 'Futarchy DAO', desc: 'Conditional decision signals', icon: Vote, color: 'text-signal-yes' },
    { id: 'opportunity' as PageRoute, title: 'Opportunity', desc: 'Selection triage queue', icon: Sparkles, color: 'text-signal-warn' },
    { id: 'risk' as PageRoute, title: 'Risk Pricing', desc: 'Tail-risk loss matrix', icon: ShieldAlert, color: 'text-signal-no' },
    { id: 'rationale' as PageRoute, title: '7 Departures', desc: 'Architectural token dossier', icon: BookOpen, color: 'text-ef-violet' }
  ];

  return (
    <>
      {/* Floating Bottom Navigation Bar (md:hidden) */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 dark:bg-card/90 backdrop-blur-xl border-t border-subtle shadow-2xl transition-all pb-[env(safe-area-inset-bottom)] select-none"
      >
        <div className="flex items-center justify-around h-15 px-2 max-w-md mx-auto">
          {/* 1. Home */}
          <button
            onClick={() => handleTabClick('home')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 cursor-pointer ${
              currentPage === 'home'
                ? 'text-ef-violet font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Compass className={`w-5 h-5 transition-transform ${currentPage === 'home' ? 'scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Home</span>
            {currentPage === 'home' && (
              <span className="w-1 h-1 rounded-full bg-ef-violet mt-0.5 shadow-sm shadow-ef-violet" />
            )}
          </button>

          {/* 2. Markets */}
          <button
            onClick={() => handleTabClick('app')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 cursor-pointer ${
              currentPage === 'app'
                ? 'text-ef-violet font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <TrendingUp className={`w-5 h-5 transition-transform ${currentPage === 'app' ? 'scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Markets</span>
            {currentPage === 'app' && (
              <span className="w-1 h-1 rounded-full bg-ef-violet mt-0.5 shadow-sm shadow-ef-violet" />
            )}
          </button>

          {/* 3. Deep */}
          <button
            onClick={() => handleTabClick('deep')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 cursor-pointer ${
              currentPage === 'deep'
                ? 'text-signal-cyan font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Cpu className={`w-5 h-5 transition-transform ${currentPage === 'deep' ? 'scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Deep</span>
            {currentPage === 'deep' && (
              <span className="w-1 h-1 rounded-full bg-signal-cyan mt-0.5 shadow-sm shadow-signal-cyan" />
            )}
          </button>

          {/* 4. Futarchy */}
          <button
            onClick={() => handleTabClick('futarchy')}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 cursor-pointer ${
              currentPage === 'futarchy'
                ? 'text-signal-yes font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Vote className={`w-5 h-5 transition-transform ${currentPage === 'futarchy' ? 'scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">Futarchy</span>
            {currentPage === 'futarchy' && (
              <span className="w-1 h-1 rounded-full bg-signal-yes mt-0.5 shadow-sm shadow-signal-yes" />
            )}
          </button>

          {/* 5. More / Menu */}
          <button
            onClick={() => {
              playChime('click');
              setMoreSheetOpen(!moreSheetOpen);
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 cursor-pointer ${
              moreSheetOpen || ['opportunity', 'risk', 'rationale'].includes(currentPage)
                ? 'text-ef-violet font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
            aria-label="More ecosystem apps and actions"
          >
            <Grid className={`w-5 h-5 transition-transform ${moreSheetOpen ? 'rotate-90 scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">More</span>
            {['opportunity', 'risk', 'rationale'].includes(currentPage) && (
              <span className="w-1 h-1 rounded-full bg-ef-violet mt-0.5" />
            )}
          </button>
        </div>
      </nav>

      {/* Slide-Up Mobile Quick Sheet Modal */}
      {moreSheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 select-none"
          onClick={e => {
            if (e.target === e.currentTarget) setMoreSheetOpen(false);
          }}
        >
          <div className="relative w-full max-h-[85vh] bg-card border-t border-subtle rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250 pb-[env(safe-area-inset-bottom)]">
            {/* Grab Handle */}
            <div className="pt-3 pb-1 flex justify-center shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-subtle" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-subtle flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary">Seer Ecosystem &amp; Tools</h3>
                <p className="text-[11px] text-text-muted font-mono">6 Connected Interfaces &amp; Controls</p>
              </div>
              <button
                onClick={() => setMoreSheetOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-elevated transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              {/* Quick Actions Row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMoreSheetOpen(false);
                    onOpenCreateMarket();
                  }}
                  className="p-3 rounded-xl bg-ef-violet hover:bg-ef-violet-hover text-white flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 shadow-md shadow-ef-violet/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Market</span>
                </button>

                <button
                  onClick={() => {
                    claimFaucet();
                    playChime('chime');
                  }}
                  className="p-3 rounded-xl bg-elevated hover:bg-ground border border-subtle text-signal-yes flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all active:scale-95"
                >
                  <span>Claim 1k sDAI</span>
                </button>
              </div>

              {/* All 6 Apps */}
              <div className="space-y-1.5">
                <div className="px-1 text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  Select Application
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {allApps.map(app => {
                    const isActive = currentPage === app.id;
                    return (
                      <button
                        key={app.id}
                        onClick={() => handleTabClick(app.id)}
                        className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors border ${
                          isActive
                            ? 'bg-ef-violet-soft border-ef-violet/40 text-text-primary'
                            : 'bg-ground/70 border-subtle hover:bg-elevated text-text-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <app.icon className={`w-4 h-4 shrink-0 ${app.color}`} />
                          <div>
                            <div className="text-xs font-bold text-text-primary">{app.title}</div>
                            <div className="text-[10px] text-text-muted">{app.desc}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferences Row */}
              <div className="p-3 rounded-xl bg-ground border border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playChime('click');
                      toggleTheme();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-subtle text-xs font-medium text-text-primary"
                  >
                    {isLight ? <Moon className="w-3.5 h-3.5 text-ef-violet" /> : <Sun className="w-3.5 h-3.5 text-signal-warn" />}
                    <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>

                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-subtle text-xs font-medium text-text-primary"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-signal-yes" /> : <VolumeX className="w-3.5 h-3.5 text-text-muted" />}
                    <span>Sound: {soundEnabled ? 'On' : 'Off'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setMoreSheetOpen(false);
                    onOpenRationaleDrawer();
                  }}
                  className="text-xs font-mono text-ef-violet hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Dossier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
