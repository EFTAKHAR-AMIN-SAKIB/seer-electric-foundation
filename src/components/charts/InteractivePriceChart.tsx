import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Clock, BarChart2 } from 'lucide-react';

interface InteractivePriceChartProps {
  baseProbability: number;
  marketTitle?: string;
  outcomeName?: string;
}

type Timeframe = '1H' | '24H' | '7D' | '30D' | 'ALL';

export const InteractivePriceChart: React.FC<InteractivePriceChartProps> = ({
  baseProbability = 0.5,
  marketTitle = 'Market',
  outcomeName = 'YES'
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('24H');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val: number; time: string; vol: number } | null>(null);

  // Generate synthetic trajectory according to timeframe
  const data = useMemo(() => {
    const pointsCount = timeframe === '1H' ? 24 : timeframe === '24H' ? 32 : timeframe === '7D' ? 40 : 50;
    const pts: { time: string; prob: number; vol: number }[] = [];
    let current = Math.max(0.05, Math.min(0.95, baseProbability));

    for (let i = 0; i < pointsCount; i++) {
      const volatility = timeframe === '1H' ? 0.015 : timeframe === '24H' ? 0.025 : 0.04;
      const change = (Math.sin(i * 0.4) * 0.01) + (Math.cos(i * 0.8) * 0.015) + ((Math.random() - 0.49) * volatility);
      current = Math.max(0.02, Math.min(0.98, current + change));
      
      const timeLabel =
        timeframe === '1H'
          ? `${i * 2.5}m ago`
          : timeframe === '24H'
          ? `${(24 - (i * 0.75)).toFixed(0)}h ago`
          : timeframe === '7D'
          ? `Day ${(i * 0.2).toFixed(0)}`
          : `Week ${(i * 0.5).toFixed(0)}`;

      pts.push({
        time: timeLabel,
        prob: +current.toFixed(3),
        vol: Math.round(5000 + Math.random() * 25000)
      });
    }

    // Ensure final point matches current baseProbability
    pts[pts.length - 1].prob = baseProbability;
    return pts;
  }, [baseProbability, timeframe]);

  const minProb = Math.min(...data.map(d => d.prob));
  const maxProb = Math.max(...data.map(d => d.prob));
  const range = maxProb - minProb || 0.1;

  const width = 640;
  const height = 240;
  const chartHeight = 180;
  const volHeight = 45;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 20) + 10;
    const y = chartHeight - 15 - ((d.prob - minProb) / range) * (chartHeight - 35);
    return { x, y, prob: d.prob, time: d.time, vol: d.vol };
  });

  const pathD = `M ${points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}`;
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)},${chartHeight} L ${points[0].x.toFixed(1)},${chartHeight} Z`;

  const isUp = data[data.length - 1].prob >= data[0].prob;
  const changePercent = (((data[data.length - 1].prob - data[0].prob) / data[0].prob) * 100).toFixed(1);

  return (
    <div className="w-full bg-ground border border-subtle rounded-2xl p-5 select-none space-y-4">
      {/* Chart Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold text-text-primary">
                {(baseProbability * 100).toFixed(0)}¢
              </span>
              <span className={`text-xs font-mono font-bold flex items-center gap-0.5 px-2 py-0.5 rounded ${
                isUp ? 'bg-signal-yes-soft text-signal-yes' : 'bg-signal-no-soft text-signal-no'
              }`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isUp ? '+' : ''}{changePercent}%
              </span>
            </div>
            <div className="text-[11px] text-text-muted mt-0.5 font-mono">
              Implied Odds: {(baseProbability * 100).toFixed(1)}% • Payout $1.00 / Share
            </div>
          </div>
        </div>

        {/* Timeframe Selector Pills */}
        <div className="flex items-center gap-1 p-1 bg-elevated rounded-xl border border-subtle">
          {(['1H', '24H', '7D', '30D', 'ALL'] as Timeframe[]).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-card text-ef-violet font-bold border border-subtle shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair touch-none"
          onMouseLeave={() => setHoveredPoint(null)}
          onTouchStart={e => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = ((touch.clientX - rect.left) / rect.width) * width;
            let closest = points[0];
            let minDist = Math.abs(mouseX - closest.x);
            for (let i = 1; i < points.length; i++) {
              const dist = Math.abs(mouseX - points[i].x);
              if (dist < minDist) {
                minDist = dist;
                closest = points[i];
              }
            }
            setHoveredPoint({
              x: closest.x,
              y: closest.y,
              val: closest.prob,
              time: closest.time,
              vol: closest.vol
            });
          }}
          onTouchMove={e => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = ((touch.clientX - rect.left) / rect.width) * width;
            let closest = points[0];
            let minDist = Math.abs(mouseX - closest.x);
            for (let i = 1; i < points.length; i++) {
              const dist = Math.abs(mouseX - points[i].x);
              if (dist < minDist) {
                minDist = dist;
                closest = points[i];
              }
            }
            setHoveredPoint({
              x: closest.x,
              y: closest.y,
              val: closest.prob,
              time: closest.time,
              vol: closest.vol
            });
          }}
          onTouchEnd={() => setHoveredPoint(null)}
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * width;
            let closest = points[0];
            let minDist = Math.abs(mouseX - closest.x);
            for (let i = 1; i < points.length; i++) {
              const dist = Math.abs(mouseX - points[i].x);
              if (dist < minDist) {
                minDist = dist;
                closest = points[i];
              }
            }
            setHoveredPoint({
              x: closest.x,
              y: closest.y,
              val: closest.prob,
              time: closest.time,
              vol: closest.vol
            });
          }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isUp ? 'var(--signal-yes)' : 'var(--signal-no)'} stopOpacity="0.25" />
              <stop offset="100%" stopColor={isUp ? 'var(--signal-yes)' : 'var(--signal-no)'} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="10" y1={chartHeight * 0.25} x2={width - 10} y2={chartHeight * 0.25} stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <line x1="10" y1={chartHeight * 0.5} x2={width - 10} y2={chartHeight * 0.5} stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <line x1="10" y1={chartHeight * 0.75} x2={width - 10} y2={chartHeight * 0.75} stroke="var(--border-subtle)" strokeDasharray="3 3" />

          {/* Volume histogram bars */}
          {points.map((p, idx) => {
            const maxVol = 30000;
            const barH = (p.vol / maxVol) * volHeight;
            return (
              <rect
                key={idx}
                x={p.x - 3}
                y={height - barH}
                width="6"
                height={barH}
                fill="var(--ef-violet)"
                opacity="0.25"
                rx="1"
              />
            );
          })}

          {/* Gradient area under curve */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Main Price Path */}
          <path
            d={pathD}
            fill="none"
            stroke={isUp ? 'var(--signal-yes)' : 'var(--signal-no)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crosshair & Active Tooltip */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1="0"
                x2={hoveredPoint.x}
                y2={height}
                stroke="var(--border-focus)"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="5"
                fill="var(--text-primary)"
                stroke={isUp ? 'var(--signal-yes)' : 'var(--signal-no)'}
                strokeWidth="2.5"
              />
            </g>
          )}
        </svg>

        {/* Hovered point floating label */}
        {hoveredPoint && (
          <div
            className="absolute top-2 pointer-events-none p-2 rounded-lg bg-card border border-subtle shadow-xl text-xs font-mono z-10 animate-in fade-in duration-100"
            style={{ left: Math.min(width - 140, Math.max(10, hoveredPoint.x - 60)) }}
          >
            <div className="font-bold text-text-primary">
              {(hoveredPoint.val * 100).toFixed(1)}¢ ({(hoveredPoint.val * 100).toFixed(1)}%)
            </div>
            <div className="text-[10px] text-text-muted">
              {hoveredPoint.time} • Vol ${hoveredPoint.vol.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Axis Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-1 border-t border-subtle">
        <span>Reality.eth Escalation Window Active</span>
        <span>Resolution Settlement: 1 Outcome Token = 1.00 sDAI</span>
      </div>
    </div>
  );
};
