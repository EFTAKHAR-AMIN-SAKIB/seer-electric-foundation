import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Wallet,
  Sun,
  Moon,
  Compass,
  Cpu,
  Vote,
  Sparkles,
  ShieldAlert,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  Grid,
  ExternalLink,
  Volume2,
  VolumeX,
  ArrowRight
} from 'lucide-react';
import { SeerLogo } from './SeerLogo';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import { PageRoute } from '../../types';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenCreateMarket: () => void;
  onOpenWalletModal: () => void;
  onOpenRationaleDrawer: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenCreateMarket,
  onOpenWalletModal,
  onOpenRationaleDrawer,
  searchQuery,
  onSearchChange
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const { wallet, claimFaucet } = useWallet();
  const { playChime, soundEnabled, toggleSound } = useSound();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsMenuOpen, setAppsMenuOpen] = useState(false);

  // Tab Gliding Motion State
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [gliderStyle, setGliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const navTabs = [
    { id: 'home' as PageRoute, label: 'Home', path: '/' },
    { id: 'app' as PageRoute, label: 'App', path: '/app' },
    { id: 'deep' as PageRoute, label: 'Deep', path: '/deep' },
    { id: 'futarchy' as PageRoute, label: 'Futarchy', path: '/futarchy' },
    { id: 'opportunity' as PageRoute, label: 'Opportunity', path: '/opportunity' },
    { id: 'risk' as PageRoute, label: 'Risk Pricing', path: '/risk' },
  ];

  const appGrid = [
    { id: 'app' as PageRoute, title: 'Seer Terminal', desc: 'Universal prediction explorer', icon: Compass, color: 'text-ef-violet' },
    { id: 'deep' as PageRoute, title: 'Deep DAG', desc: 'Distilled Human Judgment', icon: Cpu, color: 'text-signal-cyan' },
    { id: 'futarchy' as PageRoute, title: 'Futarchy DAO', desc: 'Conditional decision signals', icon: Vote, color: 'text-signal-yes' },
    { id: 'opportunity' as PageRoute, title: 'Opportunity', desc: 'Selection triage queue', icon: Sparkles, color: 'text-signal-warn' },
    { id: 'risk' as PageRoute, title: 'Risk Pricing', desc: 'Tail-risk loss matrix', icon: ShieldAlert, color: 'text-signal-no' },
    { id: 'rationale' as PageRoute, title: '7 Departures', desc: 'Architectural token dossier', icon: BookOpen, color: 'text-ef-violet' }
  ];

  // Update Gliding Highlight Pill position with fluid physics
  useEffect(() => {
    const targetId = hoveredTab || currentPage;
    const el = tabRefs.current[targetId];
    if (el) {
      setGliderStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  }, [currentPage, hoveredTab]);

  const handleNav = (page: PageRoute) => {
    playChime('click');
    onNavigate(page);
    setMobileMenuOpen(false);
    setAppsMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-3 z-40 w-full px-3 sm:px-6 lg:px-8 select-none transition-all">
      {/* Floating Sculpted Capsule Navbar Island */}
      <div className="max-w-7xl mx-auto h-16 rounded-2xl sm:rounded-full bg-card/90 dark:bg-card/85 backdrop-blur-xl border border-subtle/80 shadow-lg shadow-black/5 dark:shadow-2xl px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 transition-all">
        {/* Left: Brand Logo (Pristine, no badge) */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ef-violet rounded-lg py-1 px-1 -ml-1 transition-transform active:scale-95 cursor-pointer"
            aria-label="Seer Protocol Home"
          >
            <SeerLogo size="md" />
          </button>
        </div>

        {/* Center: Unique Sculpted Capsule Navigation Bar with Gliding Motion */}
        <div
          onMouseLeave={() => setHoveredTab(null)}
          className="relative hidden md:flex items-center h-10 p-1 bg-ground/80 dark:bg-ground/90 rounded-full border border-subtle/90 shadow-inner"
        >
          {/* Fluid Gliding Active/Hover Pill */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-ef-violet shadow-md shadow-ef-violet/25 transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1)] pointer-events-none"
            style={{
              transform: `translateX(${gliderStyle.left}px)`,
              width: `${gliderStyle.width}px`,
              opacity: gliderStyle.opacity
            }}
          />

          {navTabs.map(tab => {
            const isTabActive = (hoveredTab ? hoveredTab === tab.id : currentPage === tab.id);
            return (
              <button
                key={tab.id}
                ref={el => (tabRefs.current[tab.id] = el)}
                onMouseEnter={() => {
                  setHoveredTab(tab.id);
                  playChime('click');
                }}
                onClick={() => handleNav(tab.id)}
                className={`relative z-10 h-8 px-4 rounded-full text-xs font-semibold flex items-center justify-center transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  isTabActive
                    ? 'text-white font-bold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Toolset: Clean & Uncluttered (Theme toggle, Connect, Help, Apps) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Switcher with 180° Spin Motion */}
          <button
            onClick={() => {
              playChime('click');
              toggleTheme();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary bg-card dark:bg-card border border-subtle hover:bg-elevated transition-all active:scale-90 cursor-pointer group"
            title={`Switch to ${isLight ? 'Dark Mode (EF Obsidian)' : 'Light Mode (EF Paper)'}`}
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-ef-violet group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Sun className="w-4 h-4 text-signal-warn group-hover:rotate-90 transition-transform duration-300" />
            )}
          </button>

          {/* Connect Button */}
          <button
            onClick={() => {
              playChime('click');
              onOpenWalletModal();
            }}
            className="h-9 flex items-center justify-center gap-2 px-4 rounded-full text-xs font-semibold bg-ef-violet hover:bg-ef-violet-hover text-white shadow-md shadow-ef-violet/20 transition-all active:scale-95 font-mono cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5" />
            {wallet.isConnected ? (
              <span>
                ${wallet.balances[wallet.network === 'Gnosis Chain' ? 'sDAI' : 'sUSDS'].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                <span className="opacity-80 ml-1 hidden sm:inline text-[10px]">
                  {wallet.address?.substring(0, 5)}...
                </span>
              </span>
            ) : (
              <span>Connect</span>
            )}
          </button>

          {/* (?) Help Button (Desktop only; integrated into mobile drawer) */}
          <button
            onClick={() => {
              playChime('whoosh');
              onOpenRationaleDrawer();
            }}
            className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-text-muted hover:text-text-primary bg-card dark:bg-card border border-subtle hover:bg-elevated transition-colors cursor-pointer"
            title="Inspect 7 Deliberate Design Departures"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* [:: Apps] Launcher Dropdown (Desktop only; integrated into mobile drawer & bottom dock) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setAppsMenuOpen(!appsMenuOpen)}
              className="h-9 flex items-center justify-center gap-1.5 px-3 rounded-full text-xs font-medium bg-card dark:bg-card border border-subtle hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              title="Seer Ecosystem Applications Launcher"
            >
              <Grid className="w-3.5 h-3.5 text-ef-violet" />
              <span className="font-mono text-[11px]">Apps</span>
            </button>

            {appsMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-card border border-subtle shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2">
                <div className="px-2 py-1 text-[10px] font-mono text-text-muted uppercase tracking-wider flex justify-between">
                  <span>Seer Connected Interfaces</span>
                  <span className="text-ef-violet font-bold">6 Apps</span>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  {appGrid.map(app => (
                    <button
                      key={app.id}
                      onClick={() => handleNav(app.id)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer ${
                        currentPage === app.id
                          ? 'bg-ef-violet-soft border border-ef-violet/30'
                          : 'hover:bg-elevated'
                      }`}
                    >
                      <app.icon className={`w-4 h-4 mt-0.5 shrink-0 ${app.color}`} />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-text-primary">{app.title}</div>
                        <div className="text-[10px] text-text-muted truncate">{app.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary bg-card border border-subtle cursor-pointer active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-ef-violet" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 border border-subtle bg-card/95 backdrop-blur-xl rounded-2xl p-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search markets, categories, questions..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-ground border border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-ef-violet"
            />
          </div>

          {/* Connected App Grid */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-text-muted uppercase px-1">
              Connected Interfaces
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navTabs.map(tab => {
                const isActive = currentPage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNav(tab.id)}
                    className={`p-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-ef-violet text-white font-bold border-ef-violet shadow-sm'
                        : 'bg-ground text-text-secondary border-subtle hover:bg-elevated'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-text-muted'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Actions: Create Market & 7 Departures */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-subtle">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateMarket();
              }}
              className="p-2.5 rounded-xl bg-ef-violet text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Market</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRationaleDrawer();
              }}
              className="p-2.5 rounded-xl bg-ground border border-subtle text-text-primary text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-elevated active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-ef-violet" />
              <span>7 Departures</span>
            </button>
          </div>

          {/* Sound & Faucet Footer */}
          <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-2 border-t border-subtle px-1">
            <button
              onClick={toggleSound}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-signal-yes" /> : <VolumeX className="w-3.5 h-3.5 text-text-muted" />}
              <span>Sound: {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                claimFaucet();
                playChime('chime');
              }}
              className="text-signal-yes font-bold hover:underline"
            >
              +1,000 sDAI Faucet
            </button>
          </div>
        </div>
      )}
    </header>
  );
};