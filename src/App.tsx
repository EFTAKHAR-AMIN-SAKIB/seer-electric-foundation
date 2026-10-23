import React, { useState, useEffect } from 'react';
import { PageRoute, Market } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WalletModal } from './components/common/WalletModal';
import { CreateMarketModal } from './components/common/CreateMarketModal';
import { RationaleDrawer } from './components/common/RationaleDrawer';
import { TradeSlipDrawer } from './components/common/TradeSlipDrawer';
import { ToastContainer } from './components/common/Toast';
import { MarketDetailModal } from './components/app/MarketDetailModal';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { useWallet } from './context/WalletContext';
import { useTradeSlip } from './context/TradeSlipContext';

// Pages
import { HomePage } from './pages/HomePage';
import { AppPage } from './pages/AppPage';
import { DeepPage } from './pages/DeepPage';
import { FutarchyPage } from './pages/FutarchyPage';
import { OpportunityPage } from './pages/OpportunityPage';
import { RiskPage } from './pages/RiskPage';
import { RationalePage } from './pages/RationalePage';

export const App: React.FC = () => {
  const { markets } = useWallet();
  const { openTradeSlip } = useTradeSlip();

  // Route resolution supporting both clean paths and .html paths
  const getInitialRoute = (): PageRoute => {
    // Check if HTML document specified a page
    const docPage = document.documentElement.getAttribute('data-page') as PageRoute | null;
    if (docPage && ['home', 'app', 'deep', 'futarchy', 'opportunity', 'risk', 'rationale'].includes(docPage)) {
      return docPage;
    }

    const path = window.location.pathname.toLowerCase();
    if (path.includes('/app')) return 'app';
    if (path.includes('/deep')) return 'deep';
    if (path.includes('/futarchy')) return 'futarchy';
    if (path.includes('/opportunity')) return 'opportunity';
    if (path.includes('/risk')) return 'risk';
    if (path.includes('/rationale')) return 'rationale';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [createMarketModalOpen, setCreateMarketModalOpen] = useState(false);
  const [rationaleDrawerOpen, setRationaleDrawerOpen] = useState(false);
  const [selectedMarketForDetail, setSelectedMarketForDetail] = useState<Market | null>(null);

  // Synchronize browser history and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL cleanly
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl && window.location.pathname !== `${targetUrl}.html`) {
      window.history.pushState(null, '', targetUrl);
    }
  };

  const handleQuickTrade = (market: Market, outcomeId: string, direction: 'YES' | 'NO' | 'UP' | 'DOWN') => {
    openTradeSlip(market, outcomeId, direction);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ground text-text-primary">
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCreateMarket={() => setCreateMarketModalOpen(true)}
        onOpenWalletModal={() => setWalletModalOpen(true)}
        onOpenRationaleDrawer={() => setRationaleDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={q => {
          setSearchQuery(q);
          if (q.trim() && currentPage === 'home') {
            handleNavigate('app');
          }
        }}
      />

      {/* Main Dynamic View Controller */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentPage === 'home' && (
          <HomePage
            markets={markets}
            onSelectMarket={setSelectedMarketForDetail}
            onQuickTrade={handleQuickTrade}
            onNavigate={handleNavigate}
            onOpenRationale={() => setRationaleDrawerOpen(true)}
          />
        )}

        {currentPage === 'app' && (
          <AppPage
            markets={markets}
            onSelectMarket={setSelectedMarketForDetail}
            onQuickTrade={handleQuickTrade}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === 'deep' && <DeepPage />}

        {currentPage === 'futarchy' && <FutarchyPage />}

        {currentPage === 'opportunity' && <OpportunityPage />}

        {currentPage === 'risk' && <RiskPage />}

        {currentPage === 'rationale' && <RationalePage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals & Drawers */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      <CreateMarketModal
        isOpen={createMarketModalOpen}
        onClose={() => setCreateMarketModalOpen(false)}
      />

      <RationaleDrawer
        isOpen={rationaleDrawerOpen}
        onClose={() => setRationaleDrawerOpen(false)}
        onNavigateToFullPage={() => handleNavigate('rationale')}
      />

      <TradeSlipDrawer />

      <MarketDetailModal
        market={selectedMarketForDetail}
        onClose={() => setSelectedMarketForDetail(null)}
        onTrade={handleQuickTrade}
      />

      {/* Persistent Mobile Bottom Navigation Dock */}
      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCreateMarket={() => setCreateMarketModalOpen(true)}
        onOpenWalletModal={() => setWalletModalOpen(true)}
        onOpenRationaleDrawer={() => setRationaleDrawerOpen(true)}
      />

      <ToastContainer />
    </div>
  );
};
