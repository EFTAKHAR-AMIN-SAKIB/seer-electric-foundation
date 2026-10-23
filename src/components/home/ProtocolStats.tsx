import React from 'react';
import { TrendingUp, ShieldCheck, Cpu, DollarSign, Layers } from 'lucide-react';

export const ProtocolStats: React.FC = () => {
  const stats = [
    { label: 'Total Value Locked', val: '$64.2M', sub: 'in sDAI & sUSDS Collateral', icon: DollarSign, color: 'text-signal-yes' },
    { label: 'Cumulative Bettor Yield', val: '$1.48M', sub: 'Earned while awaiting resolution', icon: TrendingUp, color: 'text-signal-yes' },
    { label: 'Reality.eth Escalations', val: '1,842', sub: 'Optimistic bonded questions', icon: ShieldCheck, color: 'text-ef-violet' },
    { label: 'Kleros Juror Network', val: '890', sub: 'Staked PNK jurors on Gnosis', icon: Layers, color: 'text-signal-cyan' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 select-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-5 bg-card border border-subtle rounded-2xl sm:rounded-3xl shadow-sm space-y-1 hover:border-ef-violet/40 transition-colors"
          >
            <div className="flex items-center justify-between text-text-muted text-[11px] sm:text-xs font-mono">
              <span className="truncate pr-1.5">{s.label}</span>
              <s.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${s.color}`} />
            </div>
            <div className={`text-xl sm:text-2xl lg:text-3xl font-mono font-extrabold ${s.color}`}>
              {s.val}
            </div>
            <div className="text-[10px] sm:text-[11px] text-text-muted truncate">
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};