import React, { useState } from 'react';
import { Copy, Check, Sparkles, ExternalLink, ShieldCheck, Share2 } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useSound } from '../../context/SoundContext';
import confetti from 'canvas-confetti';

export const PoidhSubmissionHelper: React.FC = () => {
  const { showToast } = useWallet();
  const { playChime } = useSound();
  const [copied, setCopied] = useState(false);
  const [xHandle, setXHandle] = useState('@seer_architect');
  const [submissionTitle, setSubmissionTitle] = useState('Seer: Electric Foundation Protocol Matrix (6 Connected Interfaces)');
  const [hostedBaseUrl, setHostedBaseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://seer-electric-foundation.vercel.app';
  });

  const generatedMarkdown = `# ${submissionTitle}

**X Handle**: ${xHandle}
**Contest**: Seer Rebrand Contest Part II (Electric Foundation)
**Hosted Protocol Demos**:
1. **Seer Homepage**: ${hostedBaseUrl}/
2. **Seer App Terminal**: ${hostedBaseUrl}/app
3. **Deep (Multi-Scalar DAG & Distilled Human Judgment)**: ${hostedBaseUrl}/deep
4. **Futarchy (Conditional Decision Governance)**: ${hostedBaseUrl}/futarchy
5. **Opportunity Markets (Selection Forecasting & Triage Queue)**: ${hostedBaseUrl}/opportunity
6. **Risk Pricing (Tail-Risk Matrix & Net-Yield Positive Hedge Calculator)**: ${hostedBaseUrl}/risk
7. **Design Rationale & EF Departures Dossier**: ${hostedBaseUrl}/rationale

---

## Short Design Rationale
The Electric Foundation (EF) design system established a striking obsidian and violet brand foundation. However, moving from static mockups to an institutional, Etherscan-grade multi-page protocol operating across six distinct market mechanics requires bridging visual identity with cognitive neuroscience, mathematical probability conservation, and real EVM execution.

We built and shipped all six connected interfaces as fully reactive, mathematically sound applications anchored by yield-bearing sDAI (~5.2% APY) and sUSDS collateral, optimistic Reality.eth escalation bonds, Kleros Court arbitration backstops, and autonomous Zodiac Safe execution.

---

## 7 Deliberate Departures from the EF Brand Kit

1. **Strict Semantic Signal Separation (Electric Emerald & Coral vs Electric Violet)**:
   - *EF Kit Flaw*: Both YES and NO outcome buttons used identical violet/purple swatches, inducing cognitive friction and mis-clicks.
   - *Seer Departure*: We isolated Electric Violet (#7D33FF) strictly for protocol actions and brand chrome, reserving Electric Emerald (#00F59B) for YES/UP/PASS and Electric Coral (#FF4D6D) for NO/DOWN/FAIL.

2. **Probability Conservation Invariant Enforcement ($\sum P = 1.000$)**:
   - *EF Kit Flaw*: Binary cards displayed arbitrary prices like "Yes 69¢" and "No 37¢" summing to 106¢.
   - *Seer Departure*: Enforced strict mathematical probability conservation across all 6 applications: $P(\\text{Yes}) + P(\\text{No}) = 100.0¢$ ($1.00), multi-scalar weights $\\sum W_j = 1.000$, and complementary scalar tokens.

3. **No-Idle-Capital Architecture (Active Yield-Bearing Collateral Visibility)**:
   - *EF Kit Flaw*: Treated stakes as passive static cash balances.
   - *Seer Departure*: Surfaced continuous ~5.20% sDAI (Gnosis Chain) and ~4.80% sUSDS (Ethereum) accrual directly in trade slips, hedge calculators, and juror escrow.

4. **Consumer Card Grid + Pro Institutional Terminal Dual-Mode View**:
   - *EF Kit Flaw*: Only provided consumer card grids, unwieldy for high-throughput arbitrageurs.
   - *Seer Departure*: Built an Etherscan-grade high-density pro table with live order books, Depth charts, and sortable volume/liquidity metrics.

5. **2D Tail-Risk Heatmap Matrix with Net-Yield Positive Hedging**:
   - *EF Kit Flaw*: Risk was limited to isolated binary cards.
   - *Seer Departure*: Constructed a full 2D tail-risk pricing matrix (Loss Severity 10%–90% × Time Horizons 30D–365D) paired with an interactive calculator demonstrating how sDAI base yield offsets insurance premiums.

6. **Distilled Human Judgment (High-Cardinality Multi-Scalar DAGs)**:
   - *EF Kit Flaw*: Lacked a framework for AI agent telemetry vs human juror consensus.
   - *Seer Departure*: Built interactive DAG visualization where autonomous AI evaluators seed raw telemetry while human jurors calibrate grant weights with normalized rebalancing sliders.

7. **Conditional Decision Counterfactuals with 100% Refund Guarantee**:
   - *EF Kit Flaw*: Generic governance cards failed to explain what happens to capital on failed votes.
   - *Seer Departure*: Engineered explicit \`IF PASS\` vs \`IF FAIL\` conditional branches with programmatic 100% capital refund on the discarded counterfactual branch and Zodiac Safe calldata inspection.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    playChime('success');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#7D33FF', '#00F59B', '#38BDF8']
    });
    showToast(
      'Poidh Claim Copied to Clipboard!',
      'All 6 labelled demo links, X handle, rationale, and 7 EF departures formatted for direct submission.',
      'success'
    );
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 sm:p-8 select-none space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-ef-violet" />
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              Poidh Submission Dossier Generator
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            One-click generator compliant with all Seer Rebrand Contest Part II bounty submission requirements.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="h-10 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-ef-violet hover:bg-ef-violet-hover text-white shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-signal-yes" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Poidh Description</span>
            </>
          )}
        </button>
      </div>

      {/* Inputs for Customization */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div>
          <label className="block text-text-muted text-[11px] uppercase mb-1">Your X (Twitter) Handle</label>
          <input
            type="text"
            value={xHandle}
            onChange={e => setXHandle(e.target.value)}
            className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-text-primary focus:outline-none focus:border-ef-violet"
            placeholder="@your_handle"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-text-muted text-[11px] uppercase mb-1">Hosted Public Base URL</label>
          <input
            type="text"
            value={hostedBaseUrl}
            onChange={e => setHostedBaseUrl(e.target.value)}
            className="w-full px-3 py-2 bg-ground border border-subtle rounded-xl text-text-primary focus:outline-none focus:border-ef-violet"
            placeholder="https://your-deployment.vercel.app"
          />
        </div>
      </div>

      {/* Labelled Links Summary Grid */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-text-muted uppercase">
          Six Labelled Public Hosted Demos (Required by Bounty):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono text-xs">
          {[
            { name: '1. Seer Homepage', path: '/' },
            { name: '2. Seer App Terminal', path: '/app' },
            { name: '3. Deep DAG Markets', path: '/deep' },
            { name: '4. Futarchy Governance', path: '/futarchy' },
            { name: '5. Opportunity Markets', path: '/opportunity' },
            { name: '6. Risk Pricing Matrix', path: '/risk' },
          ].map(link => (
            <a
              key={link.path}
              href={`${hostedBaseUrl}${link.path}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-ground border border-subtle hover:border-ef-violet flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors group cursor-pointer"
            >
              <div className="truncate">
                <span className="font-bold text-ef-violet">{link.name}</span>
                <span className="block text-[10px] text-text-muted truncate">{hostedBaseUrl}{link.path}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-ef-violet shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>

      {/* Raw Markdown Output Preview */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono text-text-muted">
          <span>Formatted Markdown Preview:</span>
          <span>{generatedMarkdown.length} characters</span>
        </div>
        <pre className="p-4 rounded-2xl bg-ground border border-subtle text-[11px] font-mono text-text-secondary overflow-x-auto max-h-56 no-scrollbar select-text whitespace-pre-wrap">
          {generatedMarkdown}
        </pre>
      </div>
    </div>
  );
};