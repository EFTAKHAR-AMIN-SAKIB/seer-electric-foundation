import React from 'react';
import { Cpu, Users, GitMerge, Award, TrendingUp, Sparkles } from 'lucide-react';

export const DeepOverview: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-card via-card to-ground border border-subtle p-6 sm:p-8">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-ef-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-ef-violet-soft text-ef-violet border border-ef-violet/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interface 3 • High-Cardinality Multi-Scalar Decision Primitives</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
          Distilled Human Judgment for AI Agents &amp; Ecosystem Grants
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
          Traditional prediction markets collapse under high outcome cardinality. <strong>Seer Deep</strong> overcomes this bottleneck by coupling autonomous AI agents with prediction market jurors. AI models trace commit telemetry and dependency graphs to seed initial DAG weights; human jurors stake scalar tokens to correct hallucinations, producing a fraud-proof, distilled consensus.
        </p>

        {/* 3 Metric Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-ground/80 border border-subtle space-y-1">
            <div className="flex items-center gap-2 text-signal-cyan font-mono text-xs font-bold">
              <Cpu className="w-4 h-4" />
              <span>AI Agent Seed Telemetry</span>
            </div>
            <div className="text-lg font-mono font-bold text-text-primary">Continuous DAG</div>
            <p className="text-[11px] text-text-muted leading-snug">
              Autonomous bots parse AST dependencies, test velocity, and call-graphs 24/7.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ground/80 border border-subtle space-y-1">
            <div className="flex items-center gap-2 text-ef-violet font-mono text-xs font-bold">
              <Users className="w-4 h-4" />
              <span>Distilled Human Jury</span>
            </div>
            <div className="text-lg font-mono font-bold text-text-primary">Multi-Scalar Stakes</div>
            <p className="text-[11px] text-text-muted leading-snug">
              Jurors stake sDAI on scalar UP/DOWN tokens to adjust weights and resolve edge ambiguity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ground/80 border border-subtle space-y-1">
            <div className="flex items-center gap-2 text-signal-yes font-mono text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Strict Conservation</span>
            </div>
            <div className="text-lg font-mono font-bold text-text-primary">Σ W(T → S) = 1.000</div>
            <p className="text-[11px] text-text-muted leading-snug">
              Mathematical certainty ensures total allocated grant pool is always conserved at 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
