import { useRef, useEffect, useState } from 'react';

const NEON_COLORS = [
  [120, 100, 255],  // soft indigo
  [80, 140, 255],   // soft blue
  [60, 200, 220],   // muted cyan
  [140, 120, 255],  // lavender
  [100, 180, 255],  // sky blue
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: number[];
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

function createParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.2,
    radius: 1 + Math.random() * 2,
    color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    alpha: 0.15 + Math.random() * 0.35,
    pulseSpeed: 0.005 + Math.random() * 0.01,
    pulseOffset: Math.random() * Math.PI * 2,
  }));
}

interface NeonParticleCanvasProps {
  className?: string;
  particleCount?: number;
}

export default function NeonParticleCanvas({
  className = '',
  particleCount = 60,
}: NeonParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dimRef = useRef({ w: 0, h: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(particleCount / 2) : particleCount;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w: rect.width, h: rect.height };
      particlesRef.current = createParticles(rect.width, rect.height, count);
    };

    setupCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupCanvas, 150);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = (time: number) => {
      const { w, h } = dimRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const breathe = 0.6 + 0.4 * Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const a = p.alpha * breathe;
        const [r, g, b] = p.color;

        // Outer neon glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(80,140,255,0.05) 0%, transparent 70%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
