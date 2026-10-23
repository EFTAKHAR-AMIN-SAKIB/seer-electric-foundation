import React, { useRef, useEffect, useState } from 'react';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

interface Dot {
  x0: number;
  y0: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isGlyph: boolean;
  col: number;
  row: number;
  color: string;
  glowColor: string;
  energy: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export const PixelSeerLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playChime } = useSound();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // 12x12 grid for Aperture Diamond Glyph
  const glyphGrid = [
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,0,0,1,1,1,1,0],
    [1,1,1,1,0,0,0,0,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,0,0,1,1,1],
    [1,1,1,1,0,0,0,0,1,1,1,1],
    [0,1,1,1,1,0,0,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0],
  ];

  // 23x7 grid for lowercase "seer"
  const textGrid = [
    [0,1,1,1,0, 0, 0,1,1,1,0, 0, 0,1,1,1,0, 0, 1,1,0,1,1],
    [1,1,0,0,1, 0, 1,1,0,0,1, 0, 1,1,0,0,1, 0, 1,1,1,1,0],
    [1,1,0,0,0, 0, 1,1,1,1,1, 0, 1,1,1,1,1, 0, 1,1,0,0,0],
    [0,1,1,1,0, 0, 1,1,0,0,0, 0, 1,1,0,0,0, 0, 1,1,0,0,0],
    [0,0,0,1,1, 0, 1,1,0,0,1, 0, 1,1,0,0,1, 0, 1,1,0,0,0],
    [1,1,0,0,1, 0, 0,1,1,1,0, 0, 0,1,1,1,0, 0, 1,1,0,0,0],
    [0,1,1,1,0, 0, 0,0,0,0,0, 0, 0,0,0,0,0, 0, 0,0,0,0,0]
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina & fluid sizing
    const dpr = window.devicePixelRatio || 1;
    const baseWidth = 380;
    const baseHeight = 120;
    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.maxWidth = `${baseWidth}px`;
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = `${baseWidth} / ${baseHeight}`;
    ctx.scale(dpr, dpr);

    const dots: Dot[] = [];
    const sparks: Spark[] = [];

    const pitch = 7.5;
    const dotRadius = 2.4;
    const glyphStartX = 24;
    const glyphStartY = 16;
    const textStartX = glyphStartX + 12 * pitch + 24;
    const textStartY = glyphStartY + 2.5 * pitch;

    const baseDotColor = isLight ? '#17171C' : '#EDEDF2';
    const baseGlowColor = isLight ? '#6C2BD9' : '#7D33FF';

    // 1. Glyph Dots
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 12; c++) {
        if (glyphGrid[r][c] === 1) {
          const x0 = glyphStartX + c * pitch;
          const y0 = glyphStartY + r * pitch;
          dots.push({
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
            radius: dotRadius,
            isGlyph: true,
            col: c,
            row: r,
            color: baseDotColor,
            glowColor: baseGlowColor,
            energy: 0
          });
        }
      }
    }

    // 2. Text Dots
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 23; c++) {
        if (textGrid[r][c] === 1) {
          const x0 = textStartX + c * pitch;
          const y0 = textStartY + r * pitch;
          dots.push({
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
            radius: dotRadius,
            isGlyph: false,
            col: c,
            row: r,
            color: baseDotColor,
            glowColor: baseGlowColor,
            energy: 0
          });
        }
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = baseWidth / rect.width;
      const scaleY = baseHeight / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
      isMouseOver = true;

      if (Math.random() > 0.45) {
        sparks.push({
          x: mouseX + (Math.random() - 0.5) * 12,
          y: mouseY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 1.8 - 0.4,
          alpha: 1.0,
          color: isLight
            ? (Math.random() > 0.5 ? '#6C2BD9' : '#0284C7')
            : (Math.random() > 0.5 ? '#7D33FF' : '#00F59B'),
          size: Math.random() * 2 + 1
        });
      }
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
      setIsHovered(true);
      playChime('click');
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      mouseX = -1000;
      mouseY = -1000;
      setIsHovered(false);
      setTilt({ rx: 0, ry: 0 });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = baseWidth / rect.width;
        const scaleY = baseHeight / rect.height;
        mouseX = (e.touches[0].clientX - rect.left) * scaleX;
        mouseY = (e.touches[0].clientY - rect.top) * scaleY;
        isMouseOver = true;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    let animId: number;
    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, baseWidth, baseHeight);
      frame++;

      const spring = 0.085;
      const damping = 0.82;
      const interactRadius = 45;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (isMouseOver) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < interactRadius && dist > 0.001) {
            const force = (1 - dist / interactRadius) * 4.8;
            const angle = Math.atan2(dy, dx);
            dot.vx += Math.cos(angle) * force;
            dot.vy += Math.sin(angle) * force;
            dot.energy = Math.min(1.0, dot.energy + 0.38);
          }
        }

        if (isMouseOver && !dot.isGlyph) {
          const wavePhase = (frame * 0.08) - (dot.col * 0.4);
          const wave = Math.sin(wavePhase);
          if (wave > 0.7) {
            dot.energy = Math.max(dot.energy, (wave - 0.7) * 2.8);
          }
        }

        if (Math.sin(frame * 0.03 + dot.col + dot.row) > 0.96) {
          dot.energy = Math.max(dot.energy, 0.4);
        }

        const ax = (dot.x0 - dot.x) * spring;
        const ay = (dot.y0 - dot.y) * spring;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.x += dot.vx;
        dot.y += dot.vy;

        dot.energy *= 0.94;

        let fillColor = baseDotColor;
        let glow = false;
        let scale = 1.0;

        if (dot.energy > 0.15) {
          scale = 1.0 + dot.energy * 0.45;
          glow = true;

          if (isLight) {
            if (dot.energy > 0.7) {
              fillColor = '#5B21B6';
              dot.glowColor = '#0284C7';
            } else if (dot.energy > 0.4) {
              fillColor = '#7D33FF';
              dot.glowColor = '#7D33FF';
            } else {
              fillColor = '#059669';
              dot.glowColor = '#059669';
            }
          } else {
            if (dot.energy > 0.7) {
              fillColor = '#FFFFFF';
              dot.glowColor = '#38BDF8';
            } else if (dot.energy > 0.4) {
              fillColor = '#A78BFA';
              dot.glowColor = '#7D33FF';
            } else {
              fillColor = '#00F59B';
              dot.glowColor = '#00F59B';
            }
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * scale, 0, Math.PI * 2);

        if (glow) {
          ctx.shadowColor = dot.glowColor;
          ctx.shadowBlur = isLight ? 7 * dot.energy : 9 * dot.energy;
          ctx.fillStyle = fillColor;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = dot.color;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha *= 0.92;

        if (s.alpha < 0.05) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [playChime, isLight]);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({
      rx: -dy * 10,
      ry: dx * 14
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      className={`relative inline-flex items-center justify-center p-2 sm:p-3 rounded-2xl cursor-pointer select-none transition-transform duration-200 ease-out max-w-full ${className}`}
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${isHovered ? 1.03 : 1.0})`
      }}
      title="Hover over the Seer logo to experience dynamic kinetic phosphor displacement"
    >
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered
            ? isLight
              ? 'opacity-100 bg-radial-gradient from-ef-violet/20 via-ef-violet-soft to-transparent blur-xl'
              : 'opacity-100 bg-radial-gradient from-ef-violet/25 via-signal-cyan/10 to-transparent blur-xl'
            : isLight
              ? 'opacity-40 bg-radial-gradient from-ef-violet/10 to-transparent blur-md'
              : 'opacity-40 bg-radial-gradient from-ef-violet/10 to-transparent blur-md'
        }`}
      />

      <canvas
        ref={canvasRef}
        className="relative z-10 block max-w-full h-auto"
      />
    </div>
  );
};