import React, { useState } from 'react';
import { DeepOverview } from '../components/deep/DeepOverview';
import { DependencyDAGCanvas } from '../components/charts/DependencyDAGCanvas';
import { ScalarStakeTable } from '../components/deep/ScalarStakeTable';
import { AgentLeaderboard } from '../components/deep/AgentLeaderboard';
import { MOCK_DEEP_NODES, MOCK_DEEP_AGENTS } from '../data/mockDeep';

export const DeepPage: React.FC = () => {
  const [nodes, setNodes] = useState(MOCK_DEEP_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('deep-eth-core');
  const [showAiModel, setShowAiModel] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8">
      {/* Overview Intro */}
      <DeepOverview />

      {/* DAG Model Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
          Interactive Codebase Dependency Graph
        </h2>

        <div className="flex items-center p-1 bg-card border border-subtle rounded-xl font-mono text-xs w-fit">
          <button
            onClick={() => setShowAiModel(false)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              !showAiModel ? 'bg-ef-violet text-white font-bold' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Human Consensus Weights
          </button>
          <button
            onClick={() => setShowAiModel(true)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              showAiModel ? 'bg-signal-cyan text-black font-bold' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            AI Agent Raw Telemetry
          </button>
        </div>
      </div>

      {/* Interactive DAG Visualizer */}
      <DependencyDAGCanvas
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
        showAiModel={showAiModel}
      />

      {/* Interactive Multi-Scalar Calibrations Table */}
      <ScalarStakeTable
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
      />

      {/* AI Evaluator Agents Leaderboard */}
      <AgentLeaderboard agents={MOCK_DEEP_AGENTS} />
    </div>
  );
};
