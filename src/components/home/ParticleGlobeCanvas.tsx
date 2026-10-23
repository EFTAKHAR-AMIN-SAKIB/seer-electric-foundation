import React, { useRef, useEffect } from 'react';
import { WORLD_LAND_POINTS } from '../../data/worldLandmassPoints';
import { useTheme } from '../../context/ThemeContext';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  color: string;
  glow: boolean;
  isCity?: boolean;
}

export const ParticleGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const globeRadius = Math.min(width, height) * 0.42;
    const fov = 500;

    // Load real continental landmass particles from WORLD_LAND_POINTS
    const particles: Particle3D[] = [];

    // 1. Continental landmass points adapted to theme palette
    for (let i = 0; i < WORLD_LAND_POINTS.length; i++) {
      const [ux, uy, uz] = WORLD_LAND_POINTS[i];
      
      const isHub = i % 29 === 0;
      const isCyan = i % 43 === 0;
      const isEmerald = i % 37 === 0;

      let color = isLight ? '#2B2C3B' : '#FFFFFF';
      let glow = false;

      if (isHub) {
        color = isLight ? '#6C2BD9' : '#7D33FF'; // Electric Violet
        glow = true;
      } else if (isCyan) {
        color = isLight ? '#0284C7' : '#38BDF8'; // Sky Cyan
        glow = true;
      } else if (isEmerald) {
        color = isLight ? '#059669' : '#00F59B'; // Signal Emerald
        glow = true;
      } else if (i % 7 === 0) {
        color = isLight ? '#4B4D61' : '#E0D4FF'; // Secondary continent shade
      }

      particles.push({
        x: ux * globeRadius,
        y: uy * globeRadius,
        z: uz * globeRadius,
        baseRadius: isHub || isCyan ? 1.65 : 1.05 + (i % 3) * 0.25,
        color,
        glow,
        isCity: isHub || isCyan || isEmerald
      });
    }

    // 2. Subtle celestial latitude/longitude grid rings for spherical volume
    for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
      const latRad = (latDeg * Math.PI) / 180;
      const r = globeRadius * Math.cos(latRad);
      const y = -globeRadius * Math.sin(latRad);
      for (let j = 0; j < 36; j++) {
        const theta = (j / 36) * Math.PI * 2;
        particles.push({
          x: r * Math.sin(theta),
          y: y,
          z: r * Math.cos(theta),
          baseRadius: 0.75,
          color: isLight ? 'rgba(108, 43, 217, 0.16)' : '#5B4B8A',
          glow: false
        });
      }
    }

    // Directional light vector (coming from top-right, front)
    const lightDir = { x: 0.65, y: -0.45, z: 0.6 };
    const lLen = Math.hypot(lightDir.x, lightDir.y, lightDir.z);
    lightDir.x /= lLen;
    lightDir.y /= lLen;
    lightDir.z /= lLen;

    // Rotation state & Momentum Physics
    let rotY = 0.5;
    let rotX = 0.22;
    let velY = 0.0018;
    let velX = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        velY = 0.0016 + (mouseX / width) * 0.0015;
        velX = (mouseY / height) * 0.001;
        return;
      }
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.004;
      rotX += dy * 0.004;
      velY = dx * 0.0025;
      velX = dy * 0.0025;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.004;
      rotX += dy * 0.004;
      velY = dx * 0.002;
      velX = dy * 0.002;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Inertia & continuous spin
      if (!isDragging) {
        velY = velY * 0.95 + 0.0018 * 0.05;
        velX = velX * 0.93;
        rotY += velY;
        rotX += velX;
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Ambient atmospheric glow behind the globe
      const ambientGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        globeRadius * 0.65,
        centerX,
        centerY,
        globeRadius * 1.35
      );
      if (isLight) {
        ambientGlow.addColorStop(0, 'rgba(108, 43, 217, 0.12)');
        ambientGlow.addColorStop(0.5, 'rgba(2, 132, 199, 0.06)');
        ambientGlow.addColorStop(1, 'rgba(247, 247, 249, 0)');
      } else {
        ambientGlow.addColorStop(0, 'rgba(125, 51, 255, 0.08)');
        ambientGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)');
        ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Project 3D particles to 2D screen
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Occlude back hemisphere
        if (z2 < -globeRadius * 0.25) {
          continue;
        }

        const invR = 1 / globeRadius;
        const nx = x1 * invR;
        const ny = y2 * invR;
        const nz = z2 * invR;

        const dotLight = nx * lightDir.x + ny * lightDir.y + nz * lightDir.z;
        const diffuse = Math.max(0, dotLight);
        const fresnel = Math.pow(1 - Math.max(0, nz), 2.2);
        const luminosity = Math.min(1.0, 0.22 + diffuse * 0.70 + fresnel * 0.50);

        const scale = fov / (fov + z2 + globeRadius * 0.2);
        const x2d = centerX + x1 * scale;
        const y2d = centerY + y2 * scale;

        const alpha = Math.max(0.18, Math.min(1.0, luminosity * ((z2 + globeRadius * 0.5) / (globeRadius * 1.5))));

        projected.push({
          x: x2d,
          y: y2d,
          z: z2,
          radius: Math.max(0.65, p.baseRadius * scale * (0.85 + luminosity * 0.35)),
          color: p.color,
          alpha,
          glow: p.glow,
          luminosity
        });
      }

      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.glow && p.luminosity > 0.4) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = isLight ? 6 : 9;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      title="Click and drag to spin the 3D Seer Continental Particle Planet"
    />
  );
};