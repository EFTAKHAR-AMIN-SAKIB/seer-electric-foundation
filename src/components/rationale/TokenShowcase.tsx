import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Check, ShieldCheck, Sun, Moon } from 'lucide-react';

export const TokenShowcase: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const darkTokens = [
    { name: '--bg-ground', hex: '#101013', role: 'Page Background (Dark)' },
    { name: '--bg-card', hex: '#1A1A1E', role: 'Card base (Dark)' },
    { name: '--bg-elevated', hex: '#1F1F24', role: 'Nested Surface (Dark)' },
    { name: '--text-primary', hex: '#EDEDF2', role: 'Text Primary (Dark)' },
    { name: '--text-secondary', hex: '#A8A8B3', role: 'Text Secondary (Dark)' },
    { name: '--text-muted', hex: '#67676F', role: 'Muted labels (Dark)' },
    { name: '--ef-violet', hex: '#7D33FF', role: 'Button Primary (Electric Violet)' },
    { name: '--btn-secondary-bg', hex: '#1F1F24', role: 'Button Secondary (Dark)' },
    { name: '--signal-yes', hex: '#00F59B', role: 'Electric Emerald (YES / UP)' },
    { name: '--signal-no', hex: '#FF4D6D', role: 'Electric Coral (NO / DOWN)' },
    { name: '--signal-cyan', hex: '#38BDF8', role: 'Forecast Cyan' }
  ];

  const lightTokens = [
    { name: '--bg-ground', hex: '#F7F7F9', role: 'Page Background (Exact Figma: F7F7F9)' },
    { name: '--bg-card', hex: '#FFFFFF', role: 'Card base (Exact Figma: FFFFFF)' },
    { name: '--bg-elevated', hex: '#F2EFF9', role: 'Nested Surface (Figma Tint: F2EFF9)' },
    { name: '--text-primary', hex: '#17171C', role: 'Text Primary (Exact Figma: 17171C)' },
    { name: '--text-secondary', hex: '#5C5C66', role: 'Text Secondary (Exact Figma: 5C5C66)' },
    { name: '--text-muted', hex: '#8E8E99', role: 'Muted labels (Exact Figma: 8E8E99)' },
    { name: '--ef-violet', hex: '#7D33FF', role: 'Button Primary (Exact Figma: 7D33FF)' },
    { name: '--btn-secondary-bg', hex: '#EFE9FC', role: 'Button Secondary (Exact Figma: EFE9FC)' },
    { name: '--btn-secondary-text', hex: '#6C2BD9', role: 'Button Secondary Text (Exact Figma: 6C2BD9)' },
    { name: '--signal-yes', hex: '#059669', role: 'Signal YES (Light Contrast)' },
    { name: '--signal-no', hex: '#E11D48', role: 'Signal NO (Light Contrast)' }
  ];

  const activeTokens = theme === 'dark' ? darkTokens : lightTokens;

  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 sm:p-8 select-none space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            Electric Foundation Color Token Palette
          </h3>
          <p className="text-xs text-text-secondary font-mono mt-0.5">
            Extracted from Seer Figma node 118-16652 • Full Dark &amp; Light Mode parity
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-ground border border-subtle hover:bg-elevated text-text-primary flex items-center gap-2 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-signal-warn" /> : <Moon className="w-3.5 h-3.5 text-ef-violet" />}
          <span>Active: {theme === 'dark' ? 'Dark Mode (EF Obsidian)' : 'Light Mode (EF Paper)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeTokens.map(tok => (
          <div
            key={tok.name}
            className="p-3 bg-ground border border-subtle rounded-2xl flex items-center gap-3"
          >
            <div
              className="w-12 h-12 rounded-xl shrink-0 border border-subtle shadow-inner"
              style={{ backgroundColor: tok.hex }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-text-primary truncate">
                  {tok.name}
                </span>
                <span className="text-[10px] font-mono font-bold text-text-muted">
                  {tok.hex}
                </span>
              </div>
              <div className="text-[11px] text-text-secondary truncate mt-0.5">
                {tok.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
