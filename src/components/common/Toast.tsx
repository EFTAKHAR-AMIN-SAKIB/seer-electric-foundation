import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useWallet();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto p-4 rounded-xl bg-card border border-subtle shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200 transition-all"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-signal-yes shrink-0 mt-0.5" />
          )}
          {toast.type === 'warn' && (
            <AlertTriangle className="w-5 h-5 text-signal-warn shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-ef-violet shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-0.5">
            <h5 className="text-xs font-bold text-text-primary">{toast.title}</h5>
            <p className="text-[11px] text-text-secondary leading-snug">{toast.description}</p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="p-1 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
