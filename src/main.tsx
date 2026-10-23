import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { WalletProvider } from './context/WalletContext';
import { TradeSlipProvider } from './context/TradeSlipContext';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <SoundProvider>
          <WalletProvider>
            <TradeSlipProvider>
              <App />
            </TradeSlipProvider>
          </WalletProvider>
        </SoundProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
