# VISUAL EFFECTS SPECIFICATION - Session 0
## Lumora Platform Redesign

**Purpose:** Detailed specifications for all 8 visual effects, including 3D elements, particles, and vapor gradients.

**Date Created:** 2026-01-23
**Session:** 0 (Design Foundation)
**Quality Standard:** Awwwards-level execution (formless.xyz benchmark)

---

## ⚠️ CRITICAL: QUALITY GATES

**User Requirement:** "Make sure if you implementing cool 3D design that you can do it properly so it actually looks cool and not half assed"

**Every effect must meet these standards:**
- ✅ 60fps on desktop, 30fps minimum on mobile
- ✅ Looks polished and professional (not amateur/buggy)
- ✅ Degrades gracefully on low-end devices
- ✅ Serves a purpose (reinforces concept, not just decoration)
- ✅ Accessible (respects prefers-reduced-motion)
- ✅ Performant (lazy loading, intersection observer, cleanup)

**If quality cannot be achieved:**
- ❌ Don't implement half-assed version
- ✅ Use advanced CSS/SVG alternative instead
- ✅ Prioritize polish over complexity

---

## 🎨 EFFECT #1: WIREFRAME HEAD

**Inspiration:** Pytia (cyan particle head), Blackbox (holographic aesthetic)
**Tech Stack:** Three.js + React Three Fiber + Drei
**Difficulty:** High
**Priority:** Medium (hero impact but resource-intensive)

### Purpose & Usage
- **Hero section focal point** - Landing page, About page
- **AI/Personalization theme** - Represents intelligence, human connection
- **Brand identity element** - Memorable, distinctive visual
- **Loading state** - Rotate while content loads

### Visual Specification
**Geometry:**
- Low-poly head mesh (500-1000 vertices max)
- Wireframe material (edges only, no faces)
- Point cloud at vertices (glowing dots)

**Materials:**
- Wireframe lines: Cyan (#00d4ff), 1px width
- Vertex particles: Cyan with glow, 3px size
- Background: Transparent (composites over page)

**Animation:**
- Slow rotation: Y-axis, 20-30 seconds per revolution
- Subtle float: Y-axis, 2px range, 3-second loop
- Vertex pulse: Glow intensity oscillates (0.8 → 1.0 → 0.8)

**Interactivity:**
- Mouse parallax: Head tilts slightly toward cursor
- Sensitivity: 5-10 degrees max tilt
- Smooth interpolation: 0.5s easing

### Implementation Approach
```typescript
// /src/components/effects/WireframeHead.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function HeadMesh() {
  const meshRef = useRef();
  const { scene } = useGLTF('/models/head-lowpoly.glb'); // Pre-made low-poly head

  useFrame((state) => {
    // Slow rotation
    meshRef.current.rotation.y += 0.002;

    // Subtle float
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <primitive object={scene} />
      <meshBasicMaterial wireframe color="#00d4ff" />
    </mesh>
  );
}

export function WireframeHead() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <HeadMesh />
    </Canvas>
  );
}
```

### Performance Optimizations
1. **LOD (Level of Detail):**
   - Desktop: 1000 vertices
   - Mobile: 500 vertices (simplified model)
   - Detect device: `window.matchMedia('(max-width: 768px)')`

2. **Lazy Loading:**
   ```typescript
   const WireframeHead = lazy(() => import('./WireframeHead'));
   // Only load when hero section is in viewport
   ```

3. **Intersection Observer:**
   - Only animate when visible on screen
   - Pause/resume based on visibility

4. **Cleanup:**
   ```typescript
   useEffect(() => {
     return () => {
       // Dispose geometries, materials, textures
       scene.traverse((object) => {
         if (object.geometry) object.geometry.dispose();
         if (object.material) object.material.dispose();
       });
     };
   }, []);
   ```

### Fallback Strategy
**If 3D fails or performs poorly:**
- Use SVG wireframe head (2D)
- Animate with CSS transforms
- Simpler but still elegant

### Quality Checklist
- [ ] Runs at 60fps on desktop (Chrome DevTools FPS meter)
- [ ] Runs at 30fps on mobile (test on real device)
- [ ] No memory leaks (check DevTools Memory)
- [ ] Proper cleanup on unmount
- [ ] Respects prefers-reduced-motion
- [ ] Looks professional (not glitchy or amate

ur)

---

## 🎨 EFFECT #2: HOLOGRAPHIC CUBE

**Inspiration:** Blackbox (wireframe geometric shapes)
**Tech Stack:** Three.js + React Three Fiber
**Difficulty:** Medium
**Priority:** High (multiple use cases, easier than head)

### Purpose & Usage
- **Landing page variations** - Tech/Professional option
- **Feature section highlights** - Float next to feature descriptions
- **Loading states** - Rotate while loading content
- **Section dividers** - Visual interest between content blocks

### Visual Specification
**Geometry:**
- Wireframe cube (or octahedron, icosahedron variants)
- Edge glow effect
- Semi-transparent faces (optional)

**Materials:**
- Edges: Cyan → Magenta gradient (#00d4ff → #ff006e)
- Faces: rgba(37,37,64,0.1) (barely visible, adds depth)
- Vertex glow: Small cyan dots at corners

**Animation:**
- Multi-axis rotation: X + Y axes simultaneously
- Rotation speed: 30 seconds per full revolution
- Floating: Gentle Y-axis bounce, 5px range

**Variants:**
1. Cube (standard)
2. Octahedron (8 faces, more complex)
3. Icosahedron (20 faces, most complex)

### Implementation
```typescript
function HolographicCube({ variant = 'cube' }: { variant?: 'cube' | 'octahedron' | 'icosahedron' }) {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
  });

  const geometryMap = {
    cube: <boxGeometry args={[2, 2, 2]} />,
    octahedron: <octahedronGeometry args={[1.5]} />,
    icosahedron: <icosahedronGeometry args={[1.5]} />,
  };

  return (
    <mesh ref={meshRef}>
      {geometryMap[variant]}
      <meshBasicMaterial
        wireframe
        color="#00d4ff"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
```

### Gradient Edge Implementation
```typescript
// For gradient edges, use custom shader material
const gradientMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: { value: new THREE.Color('#00d4ff') },
    color2: { value: new THREE.Color('#ff006e') },
  },
  vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec3 vPosition;
    void main() {
      vec3 color = mix(color1, color2, (vPosition.y + 1.0) * 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  wireframe: true,
});
```

### Performance
- **Vertices:** Cube: 8, Octahedron: 6, Icosahedron: 12
- **Extremely lightweight** - can have 10+ on page simultaneously
- **Mobile-friendly** - minimal performance impact

### Use Cases
- Hero background (1-2 cubes, large)
- Feature cards (1 cube per card, small)
- Loading spinner (rotating cube instead of circular spinner)
- Section decorations (floating in background)

---

## 🎨 EFFECT #3: MUSIC NOTE PARTICLES

**Inspiration:** SPLY85 (music notes forming shapes)
**Tech Stack:** Canvas 2D (lighter than Three.js) OR CSS particles
**Difficulty:** Medium
**Priority:** High (music domain branding)

### Purpose & Usage
- **Music lesson pages** - Background effect
- **Music domain hero** - Particles form musical shapes
- **Lesson completion** - Burst effect celebration
- **Ambient background** - Floating throughout music sections

### Visual Specification
**Particle Shapes:**
- Music notes: ♪ (U+266A), ♫ (U+266B), ♬ (U+266C)
- Font: Use font glyph, not image
- Size: 16px - 32px (variety)

**Colors:**
- Cyan: #00d4ff (40% of particles)
- Magenta: #ff006e (40% of particles)
- Purple: #8b5cf6 (20% of particles)
- Opacity: 0.4 - 0.8 (fades as particles age)

**Animation:**
- Float upward: 0.5 - 2px per frame
- Rotate: Gentle spin (0 → 360° over 10 seconds)
- Fade: Opacity decreases as Y position increases
- Respawn: When offscreen, reset to bottom

**Particle Count:**
- Desktop: 100-150 particles
- Mobile: 50-75 particles

### Canvas 2D Implementation
```typescript
// /src/components/effects/MusicParticles.tsx
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  symbol: string;
  rotation: number;
  speed: number;
  opacity: number;
}

export function MusicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const particles: Particle[] = [];
    const symbols = ['♪', '♫', '♬'];
    const colors = ['#00d4ff', '#ff006e', '#8b5cf6'];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 16 + 16, // 16-32px
        color: colors[Math.floor(Math.random() * colors.length)],
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        rotation: Math.random() * 360,
        speed: Math.random() * 1.5 + 0.5, // 0.5-2px per frame
        opacity: Math.random() * 0.4 + 0.4, // 0.4-0.8
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update position
        p.y -= p.speed;
        p.rotation += 0.5;

        // Fade as it rises
        p.opacity = Math.max(0, 0.8 - (canvas.height - p.y) / canvas.height);

        // Respawn at bottom when offscreen
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
          p.opacity = 0.8;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px Arial`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  );
}
```

### Interactive Variant (Mouse Repulsion)
```typescript
// Add mouse tracking
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

const handleMouseMove = (e: MouseEvent) => {
  setMousePos({ x: e.clientX, y: e.clientY });
};

// In animation loop:
particles.forEach((p) => {
  // Calculate distance from mouse
  const dx = p.x - mousePos.x;
  const dy = p.y - mousePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Repel if too close (within 100px)
  if (distance < 100) {
    const angle = Math.atan2(dy, dx);
    const force = (100 - distance) / 100;
    p.x += Math.cos(angle) * force * 5;
    p.y += Math.sin(angle) * force * 5;
  }
});
```

### Performance
- **Canvas 2D** is lighter than Three.js for 2D particles
- Use `requestAnimationFrame` for smooth 60fps
- Clear only changed areas for optimization (advanced)
- Reduce particle count on mobile

### Use Cases
- Music lesson background (always on)
- Lesson completion (burst from center)
- Music portfolio showcase
- Music domain landing hero

---

## 🎨 EFFECT #4: HEXAGONAL CONTAINERS

**Inspiration:** Blackbox, formless.xyz
**Tech Stack:** CSS clip-path OR SVG
**Difficulty:** Easy
**Priority:** High (versatile, many use cases)

### Purpose & Usage
- **Profile images** - Avatar in hexagon frame
- **Feature highlights** - Icon containers
- **Lesson cards** - Thumbnail frames
- **Achievement badges** - Hexagon badges
- **Team member photos** - Futuristic frames

### Visual Specification
**Shape:**
- Regular hexagon (6 sides, equal angles)
- Proportions: Width = height (1:1 ratio)

**Border:**
- Default: 1px solid rgba(255,255,255,0.1)
- Hover: 2px solid with gradient (cyan → magenta)
- Glow: box-shadow with cyan/magenta

**Sizes:**
- Small: 64px (icons)
- Medium: 96px (profile pictures)
- Large: 128px (feature highlights)
- XL: 256px (hero images)

### CSS Implementation
```css
/* Method 1: CSS clip-path (simple, performant) */
.hexagon {
  width: 96px;
  height: 96px;
  clip-path: polygon(
    30% 0%, 70% 0%,
    100% 30%, 100% 70%,
    70% 100%, 30% 100%,
    0% 70%, 0% 30%
  );
  position: relative;
}

/* Add border with pseudo-element */
.hexagon::before {
  content: '';
  position: absolute;
  inset: -2px;
  clip-path: inherit;
  background: linear-gradient(135deg, #00d4ff, #ff006e);
  z-index: -1;
}

/* Hover glow */
.hexagon:hover::before {
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}
```

### SVG Implementation (Better Browser Support)
```tsx
function HexagonFrame({ size = 96, children }: { size?: number; children: React.ReactNode }) {
  const id = useId();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        <defs>
          <clipPath id={`hex-${id}`}>
            <polygon points="
              30,0 70,0
              100,30 100,70
              70,100 30,100
              0,70 0,30
            " />
          </clipPath>
          <linearGradient id={`hex-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#ff006e" />
          </linearGradient>
        </defs>

        {/* Border */}
        <polygon
          points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30"
          fill="none"
          stroke={`url(#hex-gradient-${id})`}
          strokeWidth="2"
        />
      </svg>

      {/* Content */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#hex-${id})` }}
      >
        {children}
      </div>
    </div>
  );
}
```

### Hover States
```css
.hexagon-card {
  transition: all 300ms ease;
}

.hexagon-card:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
}

.hexagon-card:hover .hexagon-border {
  stroke: url(#gradient-glow);
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6));
}
```

### Use Cases & Variants
1. **Profile Picture:**
   - 96px hexagon
   - Photo inside
   - Cyan glow on hover

2. **Feature Icon:**
   - 64px hexagon
   - Icon centered
   - Background: bg-card

3. **Achievement Badge:**
   - 80px hexagon
   - Gold border
   - Icon + text

4. **Team Member:**
   - 128px hexagon
   - Photo + name overlay

### Performance
- **CSS clip-path:** Fastest, GPU-accelerated
- **SVG:** Slightly slower but better compatibility
- **Both:** Very performant, can have 50+ on page

---

## 🎨 EFFECT #5: ORBITAL RINGS

**Inspiration:** Famous.ai, Pytia
**Tech Stack:** Three.js (3D) OR CSS conic-gradient (2D)
**Difficulty:** Medium (3D), Easy (2D)
**Priority:** Medium (decorative, loading states)

### Purpose & Usage
- **Background decoration** - Behind hero content
- **Loading states** - Animated spinner
- **Brand identity** - Recurring visual motif
- **Section transitions** - Visual interest

### Visual Specification (3D)
**Geometry:**
- Torus (donut shape)
- Ring thickness: 0.1 - 0.2
- Ring diameter: 2 - 4 units

**Material:**
- Gradient: Cyan → Transparent
- Emissive glow
- Semi-transparent

**Animation:**
- Orbital rotation: Around Y-axis
- Multiple rings at different speeds
- Layered for depth

### Three.js Implementation
```typescript
function OrbitalRings() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.5} />

      {/* Ring 1 - Outer, slowest */}
      <Ring radius={3} speed={0.001} color="#00d4ff" opacity={0.3} />

      {/* Ring 2 - Middle */}
      <Ring radius={2.5} speed={0.002} color="#8b5cf6" opacity={0.4} />

      {/* Ring 3 - Inner, fastest */}
      <Ring radius={2} speed={0.003} color="#ff006e" opacity={0.5} />
    </Canvas>
  );
}

function Ring({ radius, speed, color, opacity }: any) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += speed;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.15, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
```

### CSS 2D Alternative (Simpler)
```css
@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbital-ring {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #00d4ff;
  border-right-color: rgba(0, 212, 255, 0.5);
  animation: rotate-ring 4s linear infinite;
}

.orbital-ring-2 {
  width: 250px;
  height: 250px;
  border-top-color: #ff006e;
  animation-duration: 3s;
  animation-direction: reverse;
}
```

### Loading Spinner Variant
```tsx
function OrbitalLoader() {
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" />
      <div className="absolute inset-2 border-4 border-transparent border-t-magenta-500 rounded-full animate-spin-reverse" />
      <div className="absolute inset-4 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '0.8s' }} />
    </div>
  );
}
```

### Performance
- **3D:** Medium load, use sparingly
- **2D:** Very light, can use extensively
- **Recommendation:** Use 2D for loading spinners, 3D for hero backgrounds

---

## 🎨 EFFECT #6: PARTICLE NETWORK (Connection Lines)

**Inspiration:** Blackbox, general tech aesthetic
**Tech Stack:** Canvas 2D
**Difficulty:** Medium
**Priority:** Low (background texture, not critical)

### Purpose & Usage
- **Background texture** - Tech/AI aesthetic
- **Hero sections** - Subtle background motion
- **About page** - Network/connection theme

### Visual Specification
**Particles:**
- Small cyan dots (2-4px diameter)
- 50-100 particles (desktop), 30-50 (mobile)
- Slow random drift

**Connection Lines:**
- Draw line between particles within 150px distance
- Cyan color (#00d4ff)
- Opacity: 0.2 - 0.4 (subtle)
- Line width: 1px

**Animation:**
- Particles drift slowly (Perlin noise or random walk)
- Lines appear/disappear as particles move in/out of range
- Subtle, organic motion

### Implementation
```typescript
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const particles: Particle[] = [];
    const count = window.innerWidth < 768 ? 30 : 50;
    const connectionDistance = 150;

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" />;
}
```

### Mouse Interaction (Optional)
```typescript
// Add mouse influence
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

// In animate loop:
particles.forEach((p) => {
  const dx = mousePos.x - p.x;
  const dy = mousePos.y - p.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 200) {
    const force = (200 - distance) / 2000;
    p.vx += (dx / distance) * force;
    p.vy += (dy / distance) * force;
  }

  // Add friction
  p.vx *= 0.95;
  p.vy *= 0.95;
});
```

### Performance
- Limit particle count (50 max on desktop)
- Use Web Worker for calculations (advanced optimization)
- Throttle mouse events
- Pause when not visible (Intersection Observer)

---

## 🎨 EFFECT #7: VAPOR/PRISM COLOR SHIFTS

**Inspiration:** formless.xyz (PRIMARY INTERACTIVE EFFECT)
**Tech Stack:** CSS gradients + Framer Motion
**Difficulty:** Medium
**Priority:** HIGH (defines brand aesthetic)

### Purpose & Usage
- **All section backgrounds** - Core visual identity
- **Hero sections** - Scroll-based color shifts
- **Interactive backgrounds** - Mouse parallax
- **Ambient atmosphere** - Always present

### Visual Specification
**Color Journey (on scroll):**
- 0%: Deep purple (#1a0a2e)
- 25%: Cyan influence appears
- 50%: Magenta influence appears
- 75%: Purple intensifies
- 100%: Gold highlights appear

**Implementation Approach:**
- 3-5 overlapping radial gradients
- Gradient centers animate based on scroll
- Mouse position adds parallax shift
- Smooth 1-2s transitions

### Full Implementation (See COLOR_SYSTEM.md)
- Detailed CSS + Framer Motion code already documented
- Vapor Effect Implementation section
- JavaScript scroll hooks
- Mouse parallax code

### Quality Standards
- Smooth 60fps animations
- Subtle, never garish
- Works on mobile (simplified)
- Respects reduced-motion

---

## 🎨 EFFECT #8: INTERACTIVE 3D STORYTELLING

**Inspiration:** davidlangarica.dev
**Tech Stack:** Three.js + React Three Fiber + Framer Motion scroll
**Difficulty:** High
**Priority:** Medium-High (lesson intros, high impact)

### Purpose & Usage
- **Lesson introductions** - 3D scene introduces concept
- **Portfolio showcases** - 3D mockups of student work
- **Brand moments** - Memorable storytelling

### Philosophy
**"Every 3D element reinforces the concept"**
- Not decorative - purposeful
- Tells a story - narrative-driven
- Memorable - resonates long-term

### Example 1: Video Lesson Intro
**Concept:** Camera dolly through 3D video frame tunnel

```typescript
function VideoLessonIntro() {
  const { scrollYProgress } = useScroll();
  const cameraZ = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <Canvas>
      <PerspectiveCamera position={[0, 0, cameraZ]} />

      {/* Video frames arranged in tunnel */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 3]}>
          <planeGeometry args={[16, 9]} />
          <meshBasicMaterial>
            <videoTexture attach="map" args={[videoElements[i]]} />
          </meshBasicMaterial>
        </mesh>
      ))}
    </Canvas>
  );
}
```
**Story:** Video is about sequencing frames, moving through time

---

### Example 2: Music Lesson Intro
**Concept:** 3D sound wave visualization

```typescript
function MusicLessonIntro({ audioSrc }: { audioSrc: string }) {
  const audioAnalyzer = useAudioAnalyzer(audioSrc);

  return (
    <Canvas>
      <SoundWave frequencies={audioAnalyzer.frequencies} />
    </Canvas>
  );
}

function SoundWave({ frequencies }: { frequencies: number[] }) {
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(10, 2, frequencies.length, 1);
    const positions = geometry.attributes.position.array;

    frequencies.forEach((freq, i) => {
      positions[i * 3 + 2] = freq * 2; // Z position based on frequency
    });

    return geometry;
  }, [frequencies]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial wireframe color="#00d4ff" />
    </mesh>
  );
}
```
**Story:** Music is sound waves, vibrations, frequencies

---

### Example 3: Automation Lesson Intro
**Concept:** Gears connecting on scroll

```typescript
function AutomationLessonIntro() {
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  return (
    <Canvas>
      {/* Multiple gears */}
      <Gear position={[-2, 0, 0]} rotation={rotation} />
      <Gear position={[0, 0, 0]} rotation={rotation} reverse />
      <Gear position={[2, 0, 0]} rotation={rotation} />

      {/* Connection lines appear as gears turn */}
      <ConnectionLines opacity={scrollYProgress} />
    </Canvas>
  );
}
```
**Story:** Automation is connecting systems, gears working together

---

### Performance & Quality Gates
- Lazy load per lesson (only load when needed)
- Dispose properly on unmount
- Test on mid-range devices
- Fallback to 2D animation if needed
- Must feel purposeful, not gimmicky

---

## 📊 EFFECTS PRIORITY MATRIX

| Effect | Priority | Difficulty | Impact | Use Cases |
|--------|----------|------------|--------|-----------|
| Vapor Gradients | **HIGH** | Medium | High | Everywhere |
| Hexagonal Containers | **HIGH** | Easy | Medium | Many |
| Holographic Cube | **HIGH** | Medium | Medium | Multiple |
| Music Particles | **HIGH** | Medium | High | Music domain |
| 3D Storytelling | Medium | High | Very High | Lesson intros |
| Orbital Rings | Medium | Medium | Low | Loading, decoration |
| Wireframe Head | Medium | High | Medium | Hero only |
| Particle Network | Low | Medium | Low | Background texture |

**Implementation Order:**
1. Vapor Gradients (Session 1.1-1.2)
2. Hexagonal Containers (Session 1.4)
3. Holographic Cube (Session 1.7)
4. Music Particles (Month 2, Music lessons)
5. 3D Storytelling (Month 2-3, per lesson)
6. Orbital Rings (Month 2, loading states)
7. Wireframe Head (Month 2, hero refinement)
8. Particle Network (Optional, if time permits)

---

## ✅ IMPLEMENTATION CHECKLIST

Before implementing any effect:
- [ ] Read full specification
- [ ] Understand purpose (not just visual)
- [ ] Check quality gates
- [ ] Plan fallback strategy
- [ ] Set up performance monitoring
- [ ] Test on target devices
- [ ] Implement lazy loading
- [ ] Add Intersection Observer
- [ ] Respect prefers-reduced-motion
- [ ] Clean up on unmount
- [ ] Verify 60fps on desktop
- [ ] Verify 30fps on mobile
- [ ] Get user feedback (looks cool? or half-assed?)

---

**Document Status:** Complete ✅
**Effects Specified:** 8 (with quality gates)
**Tech Stack:** Three.js, Canvas 2D, CSS, Framer Motion
**User Requirement Addressed:** "Not half-assed" quality gates enforced
**Ready For:** Session 1.1+ (phased implementation)
**Next:** Task 5 (Landing Page Variations)
