import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Menu, Search, Phone, Mail, Linkedin, Twitter,
  ChevronRight, Play, Layers, Volume2, Sparkles, Zap,
  ArrowRight, CheckCircle2, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

/**
 * COSMIC DATA - Landing Page Variation 4
 *
 * Futuristic tech/data visualization aesthetic
 * Dark cosmic background with geometric sphere + flowing particle wave
 * Ethereal, data-driven, elegant, HIGH-TECH POLISH
 */

// ============================================
// COLOR SYSTEM
// ============================================
const colors = {
  bg: '#0a0e1a',
  bgElevated: '#0f1424',
  bgCard: '#141a2e',
  bgGlass: 'rgba(15, 20, 36, 0.8)',
  bgGradient: 'radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(217, 70, 239, 0.05) 0%, transparent 70%), #0a0e1a',

  purple: '#8b5cf6',
  purpleGlow: 'rgba(139, 92, 246, 0.4)',
  cyan: '#06b6d4',
  cyanGlow: 'rgba(6, 182, 212, 0.4)',
  magenta: '#d946ef',
  magentaGlow: 'rgba(217, 70, 239, 0.3)',
  gold: '#fbbf24',

  text: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textDim: 'rgba(248, 250, 252, 0.4)',

  border: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(139, 92, 246, 0.4)',
};

// ============================================
// ENHANCED GEOMETRIC SPHERE (Three.js)
// ============================================
function GeoSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const dataNodesRef = useRef<THREE.Points>(null);

  // Create multiple layered geometries for depth
  const icosahedronGeo = useMemo(() => new THREE.IcosahedronGeometry(1.8, 2), []);
  const dodecahedronGeo = useMemo(() => new THREE.DodecahedronGeometry(1.2, 0), []);

  // Data nodes floating inside the sphere
  const nodePositions = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 0.6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -t * 0.15;
      innerSphereRef.current.rotation.z = t * 0.1;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.2;
    }

    if (dataNodesRef.current) {
      const material = dataNodesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.5 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-2.5, 0, 0]}>
      {/* Outer wireframe icosahedron */}
      <lineSegments>
        <edgesGeometry args={[icosahedronGeo]} />
        <lineBasicMaterial color={colors.cyan} transparent opacity={0.4} linewidth={1} />
      </lineSegments>

      {/* Inner wireframe dodecahedron */}
      <group ref={innerSphereRef}>
        <lineSegments>
          <edgesGeometry args={[dodecahedronGeo]} />
          <lineBasicMaterial color={colors.purple} transparent opacity={0.6} />
        </lineSegments>
      </group>

      {/* Orbital ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color={colors.cyan} transparent opacity={0.3} />
      </mesh>

      {/* Second orbital ring at angle */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.01, 16, 100]} />
        <meshBasicMaterial color={colors.magenta} transparent opacity={0.2} />
      </mesh>

      {/* Data nodes inside */}
      <points ref={dataNodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={colors.cyan}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central core glow */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={colors.purple} transparent opacity={0.6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={colors.purple} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// ============================================
// ENHANCED PARTICLE WAVE (Three.js)
// ============================================
function ParticleWave() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 4000;

  const [positions, velocities, colors_arr, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);

    const purpleColor = new THREE.Color(colors.purple);
    const cyanColor = new THREE.Color(colors.cyan);
    const magentaColor = new THREE.Color(colors.magenta);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create flowing wave distribution
      const x = (Math.random() - 0.2) * 14;
      const baseY = Math.sin(x * 0.4) * 1.2;
      const y = baseY + (Math.random() - 0.5) * 2.5;
      const z = (Math.random() - 0.5) * 3;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Individual particle velocities for varied movement
      vel[i3] = 0.5 + Math.random() * 0.5;
      vel[i3 + 1] = Math.random() * 0.3;
      vel[i3 + 2] = Math.random() * 0.2;

      // Gradient color based on position
      const t = (x + 3) / 14;
      let color: THREE.Color;
      if (t < 0.33) {
        color = purpleColor.clone().lerp(magentaColor, t * 3);
      } else if (t < 0.66) {
        color = magentaColor.clone().lerp(cyanColor, (t - 0.33) * 3);
      } else {
        color = cyanColor.clone();
      }

      // Add some brightness variation
      const brightness = 0.7 + Math.random() * 0.3;
      cols[i3] = color.r * brightness;
      cols[i3 + 1] = color.g * brightness;
      cols[i3 + 2] = color.b * brightness;

      // Varied sizes for depth
      siz[i] = 0.02 + Math.random() * 0.04;
    }

    return [pos, vel, cols, siz];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const vx = velocities[i3];
      const vy = velocities[i3 + 1];
      const vz = velocities[i3 + 2];

      // Complex flowing motion
      const baseX = positions[i3];
      const baseY = positions[i3 + 1];
      const baseZ = positions[i3 + 2];

      posArray[i3] = baseX + Math.sin(t * vx + baseX * 0.5) * 0.4;
      posArray[i3 + 1] = baseY +
        Math.sin(t * 0.8 + baseX * 0.3) * 0.6 +
        Math.cos(t * 0.5 + baseZ) * 0.3;
      posArray[i3 + 2] = baseZ + Math.sin(t * vz + baseY) * 0.3;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors_arr} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ============================================
// ENERGY BRIDGE WITH FLOWING PARTICLES
// ============================================
function EnergyBridge() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const base = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const x = -0.8 + t * 2.8;
      const curve = Math.sin(t * Math.PI) * 0.8;
      const y = curve + (Math.random() - 0.5) * 0.4;
      const z = (Math.random() - 0.5) * 0.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }
    return [pos, base];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const progress = i / particleCount;

      // Flowing along the bridge
      const flowOffset = (t * 2 + progress * 4) % 1;
      const pulse = Math.sin(flowOffset * Math.PI * 2) * 0.1;

      posArray[i3] = basePositions[i3] + Math.sin(t * 3 + progress * 10) * 0.05;
      posArray[i3 + 1] = basePositions[i3 + 1] + pulse + Math.sin(t * 2 + progress * 8) * 0.1;
      posArray[i3 + 2] = basePositions[i3 + 2] + Math.cos(t * 2 + progress * 6) * 0.05;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Pulsing opacity
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.4 + Math.sin(t * 3) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={colors.magenta}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ============================================
// AMBIENT FLOATING PARTICLES
// ============================================
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(t * speeds[i] + i) * 0.002;
      posArray[i3] += Math.cos(t * speeds[i] * 0.5 + i) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================
// CAMERA RIG WITH SUBTLE MOVEMENT
// ============================================
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.cos(t * 0.08) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================
// 3D SCENE
// ============================================
function Scene3D({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: Math.max(0, 1 - scrollProgress * 1.5),
      }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <ambientLight intensity={0.3} />
        <GeoSphere />
        <ParticleWave />
        <EnergyBridge />
        <AmbientParticles />
      </Suspense>
    </Canvas>
  );
}

// ============================================
// BOKEH BACKGROUND
// ============================================
function BokehBackground() {
  const orbs = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 150 + Math.random() * 300,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.02 + Math.random() * 0.06,
      color: [colors.purple, colors.cyan, colors.magenta][i % 3],
      duration: 15 + Math.random() * 10,
    })),
  []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: orb.opacity,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// UI COMPONENTS
// ============================================
function GlassCard({
  children,
  className = '',
  glow,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'cyan' | 'magenta';
  hover?: boolean;
}) {
  const glowStyles = {
    purple: `0 0 40px ${colors.purpleGlow}`,
    cyan: `0 0 40px ${colors.cyanGlow}`,
    magenta: `0 0 40px ${colors.magentaGlow}`,
  };

  return (
    <motion.div
      className={`relative backdrop-blur-xl rounded-2xl border ${className}`}
      style={{
        background: colors.bgGlass,
        borderColor: colors.border,
        boxShadow: glow ? glowStyles[glow] : 'none',
      }}
      whileHover={hover ? {
        borderColor: colors.borderHover,
        y: -4,
        transition: { duration: 0.3 },
      } : {}}
    >
      {children}
    </motion.div>
  );
}

function CosmicText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.cyan} 50%, ${colors.magenta} 100%)`,
      }}
    >
      {children}
    </span>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function CosmicData() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setScrollProgress(v));
  }, [scrollYProgress]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const navItems = ['ABOUT', 'COURSES', 'PROJECTS', 'PRICING'];

  const domains = [
    { icon: <Layers className="w-6 h-6" />, title: 'AI Video Editing', desc: 'Create viral TikToks and Reels with CapCut AI', lessons: 12, color: colors.cyan },
    { icon: <Volume2 className="w-6 h-6" />, title: 'AI Music Production', desc: 'Produce original tracks with Suno and Udio', lessons: 10, color: colors.magenta },
    { icon: <Sparkles className="w-6 h-6" />, title: 'AI Content Writing', desc: 'Write viral captions and scripts with ChatGPT', lessons: 11, color: colors.purple },
    { icon: <Zap className="w-6 h-6" />, title: 'AI Automation', desc: 'Build no-code workflows with Make.com', lessons: 12, color: colors.gold },
  ];

  const stats = [
    { value: '45', suffix: '+', label: 'Lessons' },
    { value: '$150', suffix: '', label: 'Avg Project Value' },
    { value: '98', suffix: '%', label: 'Success Rate' },
    { value: '30', suffix: '', label: 'Days to Earn' },
  ];

  const testimonials = [
    {
      quote: "I made my first $2,000 editing videos for local businesses. Lumora taught me everything I needed to know.",
      name: "Sarah Chen",
      age: 17,
      role: "Video Editor",
      earned: "$4,800",
    },
    {
      quote: "The automation course changed everything. I built workflows that save clients 15+ hours per week.",
      name: "Marcus Johnson",
      age: 22,
      role: "Automation Expert",
      earned: "$8,200",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative"
      style={{ background: colors.bgGradient }}
    >
      <BokehBackground />
      <Scene3D scrollProgress={scrollProgress} />

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{ borderColor: colors.border, background: 'rgba(10, 14, 26, 0.8)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors md:hidden">
              <Menu className="w-5 h-5" style={{ color: colors.text }} />
            </button>
            <Link to="/landing" className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})` }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-lg font-light tracking-[0.2em]"
                style={{ color: colors.text, fontFamily: "'Josefin Sans', sans-serif" }}
              >
                LUMORA
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs tracking-[0.15em] font-light transition-colors hover:text-white"
                style={{ color: colors.textMuted }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/lessons"
              className="hidden sm:inline-flex px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})`,
                color: colors.text,
              }}
            >
              Start Free
            </Link>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Search className="w-5 h-5" style={{ color: colors.textMuted }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center px-6 lg:px-12 pt-20"
      >
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Spacer for 3D scene */}
          <div className="hidden lg:block" />

          {/* Right: Content */}
          <motion.div
            className="relative z-10 text-right lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs tracking-widest"
              style={{ background: `${colors.purple}20`, color: colors.purple, border: `1px solid ${colors.purple}30` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: colors.purple }} />
              FOR GEN Z CREATORS
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight mb-6"
              style={{ fontFamily: "'Josefin Sans', 'Raleway', sans-serif" }}
            >
              <span style={{ color: colors.text }}>Master AI.</span>
              <br />
              <CosmicText className="font-light">Create Everything.</CosmicText>
            </h1>

            <p
              className="text-lg md:text-xl mb-10 max-w-lg ml-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              The premier creative AI platform for ages 13-25.
              Learn video, music, writing & automation. Start earning in 30 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-end mb-12">
              <Link
                to="/lessons"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})`,
                  color: colors.text,
                  boxShadow: `0 4px 30px ${colors.purpleGlow}`,
                }}
              >
                Start Learning Free
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium border transition-all hover:bg-white/5"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 justify-end">
              {[
                { label: 'Creators', value: '10K+' },
                { label: 'Projects', value: '500+' },
                { label: 'Earned', value: '$50K+' },
              ].map((stat) => (
                <div key={stat.label} className="text-right">
                  <div className="text-2xl font-light" style={{ color: colors.text }}>{stat.value}</div>
                  <div className="text-xs tracking-wider" style={{ color: colors.textMuted }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Icons */}
        <motion.div
          className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[Phone, Mail, Linkedin, Twitter].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              className="p-2 rounded-full transition-all hover:bg-white/10"
              style={{ color: colors.textMuted }}
              whileHover={{ color: colors.cyan, scale: 1.1 }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: colors.border }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: colors.purple }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-12">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent, ${colors.bgElevated}, transparent)` }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-light mb-1">
                    <CosmicText>{stat.value}{stat.suffix}</CosmicText>
                  </div>
                  <div className="text-xs tracking-wider" style={{ color: colors.textMuted }}>
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
      {/* ============================================ */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              <span style={{ color: colors.text }}>Master </span>
              <CosmicText>4 Creative Domains</CosmicText>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
              Each domain is a complete skill path—from fundamentals to earning real money
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover className="p-6 flex items-center gap-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${domain.color}20, ${domain.color}10)`,
                      border: `1px solid ${domain.color}40`,
                      color: domain.color,
                    }}
                  >
                    {domain.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium mb-1" style={{ color: colors.text }}>
                      {domain.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {domain.desc}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-lg font-light" style={{ color: domain.color }}>
                      {domain.lessons}
                    </div>
                    <div className="text-xs" style={{ color: colors.textMuted }}>lessons</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif", color: colors.text }}>
              Real Students, <CosmicText>Real Results</CosmicText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard glow={index === 0 ? 'cyan' : 'magenta'} className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: colors.gold }} />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 leading-relaxed" style={{ color: colors.text }}>
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                        style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})`, color: colors.text }}
                      >
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-sm" style={{ color: colors.text }}>
                          {t.name}, {t.age}
                        </div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>{t.role}</div>
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${colors.gold}20`, color: colors.gold }}
                    >
                      {t.earned} earned
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
              style={{ background: `linear-gradient(135deg, ${colors.purpleGlow}, ${colors.cyanGlow})` }}
            />
            <GlassCard className="relative p-12 md:p-16 text-center rounded-3xl">
              <h2
                className="text-3xl md:text-5xl font-light mb-6"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                <span style={{ color: colors.text }}>Ready to </span>
                <CosmicText>Transform Your Future?</CosmicText>
              </h2>
              <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: colors.textSecondary }}>
                Join 10,000+ creators mastering AI tools and building real income.
                Free to start. No credit card required.
              </p>

              <Link
                to="/lessons"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-medium transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan})`,
                  color: colors.text,
                  boxShadow: `0 4px 40px ${colors.purpleGlow}`,
                }}
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: colors.textMuted }}>
                {['100% free to start', 'No credit card', 'Cancel anytime'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: colors.cyan }} />
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3" style={{ color: colors.textMuted }}>
            <Sparkles className="w-4 h-4" style={{ color: colors.purple }} />
            <span className="text-sm tracking-wider">© 2024 LUMORA. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-sm tracking-wider transition-colors hover:text-white"
                style={{ color: colors.textMuted }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Scan line overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  );
}
