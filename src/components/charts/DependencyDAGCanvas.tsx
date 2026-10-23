import React, { useState } from 'react';
import { DeepProjectNode } from '../../types';
import { GitFork, Cpu, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface DependencyDAGCanvasProps {
  nodes: DeepProjectNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  showAiModel: boolean;
}

export const DependencyDAGCanvas: React.FC<DependencyDAGCanvasProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  showAiModel
}) => {
  // Pre-calculated node coordinates on canvas for clean DAG layout
  const nodePositions: Record<string, { x: number; y: number }> = {
    'deep-eth-core': { x: 120, y: 190 },
    'deep-solidity': { x: 320, y: 110 },
    'deep-openzeppelin': { x: 520, y: 110 },
    'deep-foundry': { x: 320, y: 270 },
    'deep-seer-core': { x: 720, y: 190 },
    'deep-viem': { x: 520, y: 270 }
  };

  const canvasWidth = 840;
  const canvasHeight = 380;

  // Render edges
  const edges: { fromId: string; toId: string; weight: number }[] = [];
  nodes.forEach(node => {
    node.upstreamDependencies.forEach(dep => {
      edges.push({
        fromId: dep.targetId,
        toId: node.id,
        weight: dep.weight
      });
    });
  });

  return (
    <div className="w-full bg-abyss border border-subtle rounded-2xl p-5 select-none space-y-4">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-3">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-ef-violet" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
            Multi-Scalar Dependency DAG (Distilled Human Judgment)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2 py-0.5 rounded flex items-center gap-1 ${
            showAiModel ? 'bg-signal-cyan-soft text-signal-cyan' : 'bg-ef-violet-soft text-ef-violet font-bold'
          }`}>
            {showAiModel ? <Cpu className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
            {showAiModel ? 'Model: AI Agent AST Telemetry' : 'Model: Human Juror Calibrated Consensus'}
          </span>
          <span className="text-text-muted hidden sm:inline">• Conservation Σ W = 1.000</span>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden text-[10px] font-mono text-text-muted flex items-center justify-between px-1 bg-ground/50 py-1.5 rounded-lg border border-subtle">
        <span>← Swipe horizontally to explore DAG nodes →</span>
        <span className="text-ef-violet font-bold">Tap node to calibrate</span>
      </div>

      {/* SVG DAG Visualizer */}
      <div className="relative w-full overflow-x-auto no-scrollbar rounded-xl">
        <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          className="w-full min-w-[700px] h-auto select-none"
        >
          <defs>
            {/* Arrow marker for edges */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-focus)" />
            </marker>

            <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--ef-violet)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--signal-cyan)" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Render Bezier Connection Edges */}
          {edges.map((edge, idx) => {
            const start = nodePositions[edge.fromId];
            const end = nodePositions[edge.toId];
            if (!start || !end) return null;

            const isHighlighted = selectedNodeId === edge.fromId || selectedNodeId === edge.toId;
            const dx = end.x - start.x;
            const cp1x = start.x + dx * 0.5;
            const cp1y = start.y;
            const cp2x = end.x - dx * 0.5;
            const cp2y = end.y;
            const pathD = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

            return (
              <g key={idx}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHighlighted ? 'url(#edgeGradient)' : 'var(--border-subtle)'}
                  strokeWidth={isHighlighted ? Math.max(2, edge.weight * 5) : Math.max(1, edge.weight * 3)}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  markerEnd="url(#arrow)"
                  className="transition-all duration-300"
                />
                {/* Edge Weight Pill */}
                {isHighlighted && (
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 - 8}
                    fill="var(--signal-cyan)"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                    className="font-bold select-none"
                  >
                    W={edge.weight.toFixed(2)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map(node => {
            const pos = nodePositions[node.id] || { x: 400, y: 200 };
            const isSelected = selectedNodeId === node.id;
            const activeWeight = showAiModel ? node.aiScore : node.weight;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => onSelectNode(node.id)}
                className="cursor-pointer group"
              >
                {/* Outer Glow on Selected */}
                {isSelected && (
                  <circle
                    r="46"
                    fill="none"
                    stroke="var(--ef-violet)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-spin"
                    style={{ animationDuration: '12s' }}
                  />
                )}

                {/* Node Base Capsule */}
                <circle
                  r="34"
                  fill="var(--bg-card)"
                  stroke={isSelected ? 'var(--ef-violet)' : 'var(--border-subtle)'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  className="transition-all duration-200 group-hover:stroke-ef-violet"
                />

                {/* Inner Score Accent Ring */}
                <circle
                  r="28"
                  fill="none"
                  stroke={showAiModel ? 'var(--signal-cyan)' : 'var(--signal-yes)'}
                  strokeWidth="2.5"
                  strokeDasharray={`${(node.originalityScore * 175).toFixed(0)} 200`}
                  transform="rotate(-90)"
                />

                {/* Node Center Label */}
                <text
                  y="-4"
                  fill="var(--text-primary)"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="select-none"
                >
                  {node.symbol}
                </text>

                <text
                  y="12"
                  fill={showAiModel ? 'var(--signal-cyan)' : 'var(--signal-yes)'}
                  fontSize="11"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="select-none"
                >
                  {(activeWeight * 100).toFixed(1)}%
                </text>

                {/* Node bottom tag */}
                <text
                  y="48"
                  fill="var(--text-muted)"
                  fontSize="9"
                  fontFamily="Inter"
                  textAnchor="middle"
                  className="select-none"
                >
                  {node.name.length > 22 ? `${node.name.substring(0, 20)}...` : node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-text-muted pt-2 border-t border-subtle">
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-signal-yes" /> Originality Score (OS)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-signal-cyan" /> AI Telemetry Seed
          </span>
        </div>
        <div className="text-[11px] font-mono">
          Click any node to calibrate weight sliders or review juror stakes
        </div>
      </div>
    </div>
  );
};
