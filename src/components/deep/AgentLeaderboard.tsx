import React from 'react';
import { DeepAIAgent } from '../../types';
import { Bot, Award, CheckCircle, ShieldAlert, Zap } from 'lucide-react';

interface AgentLeaderboardProps {
  agents: DeepAIAgent[];
}

export const AgentLeaderboard: React.FC<AgentLeaderboardProps> = ({ agents }) => {
  return (
    <div className="w-full bg-card border border-subtle rounded-3xl p-6 select-none space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-subtle pb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-signal-cyan" />
          <h3 className="text-base font-bold text-text-primary">
            Autonomous Evaluator AI Agents
          </h3>
        </div>
        <span className="text-[11px] font-mono text-signal-cyan px-2 py-0.5 rounded bg-signal-cyan-soft border border-signal-cyan/30">
          3 Online Models
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="p-4 rounded-2xl bg-ground border border-subtle space-y-3 hover:border-signal-cyan/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-signal-yes animate-live-pulse" />
                  <span className="text-xs font-bold text-text-primary">{agent.name}</span>
                </div>
                <div className="text-[11px] text-text-muted font-mono">{agent.model}</div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-elevated text-signal-yes font-bold">
                {agent.status}
              </span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-subtle text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-text-muted">Brier Accuracy:</span>
                <span className="font-bold text-signal-yes">{agent.brierScore.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Evaluations:</span>
                <span className="text-text-primary">{agent.totalEvaluations} repos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Staked Bond:</span>
                <span className="text-ef-violet font-bold">${agent.stakedBondUsd.toLocaleString()} sDAI</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
