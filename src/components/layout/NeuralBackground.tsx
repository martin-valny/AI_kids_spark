import { useRef, useEffect, useState } from 'react';

// ── Data structures ──────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

interface Edge {
  a: number;
  b: number;
}

interface Pulse {
  edge: number;
  t: number;
  speed: number;
}

interface Flash {
  x: number;
  y: number;
  opacity: number;
  radius: number;
}

// ── Node generation (Poisson-disk-like grid jitter) ──────────

function generateNodes(w: number, h: number, count: number): Node[] {
  const aspect = w / h;
  const cols = Math.ceil(Math.sqrt(count * aspect));
  const rows = Math.ceil(count / cols);
  const cellW = w / cols;
  const cellH = h / rows;
  const nodes: Node[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (nodes.length >= count) break;
      const jitterX = (Math.random() - 0.5) * 0.8 * cellW;
      const jitterY = (Math.random() - 0.5) * 0.8 * cellH;
      const x = (c + 0.5) * cellW + jitterX;
      const y = (r + 0.5) * cellH + jitterY;
      nodes.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03,
        baseX: x,
        baseY: y,
      });
    }
  }
  return nodes;
}

// ── Edge building ────────────────────────────────────────────

function buildEdges(nodes: Node[]): Edge[] {
  const maxDist = 160;
  const maxPerNode = 5;
  const connectionCount = new Array(nodes.length).fill(0);
  const edges: Edge[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (connectionCount[i] >= maxPerNode || connectionCount[j] >= maxPerNode) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (dx * dx + dy * dy <= maxDist * maxDist) {
        edges.push({ a: i, b: j });
        connectionCount[i]++;
        connectionCount[j]++;
      }
    }
  }
  return edges;
}

// ── Component ────────────────────────────────────────────────

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reduced-motion detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Main canvas setup + animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let flashes: Flash[] = [];
    let lastSpawnTime = 0;
    let nextSpawnDelay = 800 + Math.random() * 1400;

    // ── Sizing ───────────────────────────────────────────────

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.scale(dpr, dpr);

      nodes = generateNodes(w, h, 90);
      edges = buildEdges(nodes);
      pulses = [];
      flashes = [];
      lastSpawnTime = performance.now();
    }

    resize();
    window.addEventListener('resize', resize);

    // ── Reduced motion: static render only ───────────────────

    if (reducedMotion) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx.lineWidth = 0.6;
      for (const edge of edges) {
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    // ── Animation loop ───────────────────────────────────────

    function frame(now: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      // 1. Drift nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (Math.abs(node.x - node.baseX) > 18) node.vx = -node.vx;
        if (Math.abs(node.y - node.baseY) > 18) node.vy = -node.vy;
      }

      // 2. Draw static edges
      ctx!.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx!.lineWidth = 0.6;
      for (const edge of edges) {
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        ctx!.beginPath();
        ctx!.moveTo(na.x, na.y);
        ctx!.lineTo(nb.x, nb.y);
        ctx!.stroke();
      }

      // 3. Spawn pulses
      if (pulses.length < 7 && now - lastSpawnTime >= nextSpawnDelay) {
        // Find edges without active pulses
        const activePulseEdges = new Set(pulses.map(p => p.edge));
        const available: number[] = [];
        for (let i = 0; i < edges.length; i++) {
          if (!activePulseEdges.has(i)) available.push(i);
        }
        if (available.length > 0) {
          const edgeIdx = available[Math.floor(Math.random() * available.length)];
          pulses.push({
            edge: edgeIdx,
            t: 0,
            speed: 0.004 + Math.random() * 0.005,
          });
        }
        lastSpawnTime = now;
        nextSpawnDelay = 800 + Math.random() * 1400;
      }

      // 4. Update and draw pulses
      const completedPulses: number[] = [];
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        pulse.t += pulse.speed;

        if (pulse.t >= 1.0) {
          completedPulses.push(i);
          // Create flash at destination node
          const edge = edges[pulse.edge];
          const dest = nodes[edge.b];
          flashes.push({ x: dest.x, y: dest.y, opacity: 0.8, radius: 12 });
          continue;
        }

        const edge = edges[pulse.edge];
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        const px = na.x + (nb.x - na.x) * pulse.t;
        const py = na.y + (nb.y - na.y) * pulse.t;
        const easedOpacity = Math.sin(pulse.t * Math.PI);

        // Edge illumination
        ctx!.strokeStyle = `rgba(255, 0, 128, ${(0.55 * easedOpacity).toFixed(3)})`;
        ctx!.lineWidth = 1.0;
        ctx!.beginPath();
        ctx!.moveTo(na.x, na.y);
        ctx!.lineTo(nb.x, nb.y);
        ctx!.stroke();

        // Core glow
        const grad = ctx!.createRadialGradient(px, py, 0, px, py, 22);
        grad.addColorStop(0,   `rgba(255, 255, 255, ${(0.90 * easedOpacity).toFixed(3)})`);
        grad.addColorStop(0.2, `rgba(255, 80,  200, ${(0.75 * easedOpacity).toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(255, 0,   128, ${(0.35 * easedOpacity).toFixed(3)})`);
        grad.addColorStop(1.0, 'rgba(255, 0, 128, 0)');
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(px, py, 22, 0, Math.PI * 2);
        ctx!.fill();

        // Outer bloom
        const bloom = ctx!.createRadialGradient(px, py, 0, px, py, 55);
        bloom.addColorStop(0,   `rgba(255, 0, 128, ${(0.12 * easedOpacity).toFixed(3)})`);
        bloom.addColorStop(1.0, 'rgba(255, 0, 128, 0)');
        ctx!.fillStyle = bloom;
        ctx!.beginPath();
        ctx!.arc(px, py, 55, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Remove completed pulses (reverse order to preserve indices)
      for (let i = completedPulses.length - 1; i >= 0; i--) {
        pulses.splice(completedPulses[i], 1);
      }

      // 5. Update and draw flashes
      const expiredFlashes: number[] = [];
      for (let i = 0; i < flashes.length; i++) {
        const f = flashes[i];
        f.opacity -= 0.04;
        f.radius += 0.8;

        if (f.opacity <= 0) {
          expiredFlashes.push(i);
          continue;
        }

        const fg = ctx!.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        fg.addColorStop(0,   `rgba(255, 255, 255, ${f.opacity.toFixed(3)})`);
        fg.addColorStop(0.4, `rgba(255, 0, 128, ${(f.opacity * 0.6).toFixed(3)})`);
        fg.addColorStop(1.0, 'rgba(255, 0, 128, 0)');
        ctx!.fillStyle = fg;
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (let i = expiredFlashes.length - 1; i >= 0; i--) {
        flashes.splice(expiredFlashes[i], 1);
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
