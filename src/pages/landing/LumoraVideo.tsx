import { useEffect, useState } from 'react';

/**
 * Lumora Video - Cinematic Hero Landing
 *
 * EXACT replica of the provided HTML design with:
 * - Inter font
 * - Emerald green color scheme (#0a3d30, #0d4a3a, #115945)
 * - Lowercase "lumora" gradient logo
 * - Background video in hero section
 * - Theme toggle (dark/light mode)
 * - Glassmorphism cards and buttons
 * - Gradient mesh background
 *
 * Content adapted for Lumora Gen Z creator platform
 */

export default function LumoraVideo() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('lumora-theme');
    if (saved === 'light') setIsLightMode(true);
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    localStorage.setItem('lumora-theme', !isLightMode ? 'light' : 'dark');
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className={isLightMode ? 'light-mode' : ''}>
        <style>{`
          :root {
            --color-bg-primary: #000000;
            --color-bg-secondary: #070808;
            --color-bg-elevated: #0c0f0e;
            --color-text-primary: #ffffff;
            --color-text-secondary: rgba(255, 255, 255, 0.72);
            --color-text-muted: rgba(255, 255, 255, 0.48);
            --color-accent: #0a3d30;
            --color-accent-secondary: #0d4a3a;
            --color-accent-tertiary: #115945;
            --color-border: rgba(255, 255, 255, 0.07);
            --color-glow: rgba(17, 89, 69, 0.15);
            --gradient-primary: linear-gradient(135deg, #0a3d30 0%, #115945 55%, #0d4a3a 100%);
            --gradient-mesh: radial-gradient(ellipse 900px 700px at 28% 18%, rgba(10, 61, 48, 0.12) 0%, transparent 55%),
                            radial-gradient(ellipse 1200px 900px at 72% 62%, rgba(17, 89, 69, 0.10) 0%, transparent 62%),
                            radial-gradient(ellipse 800px 520px at 50% 102%, rgba(13, 74, 58, 0.08) 0%, transparent 52%);
            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
            --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.45);
            --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.55);
            --shadow-xl: 0 24px 70px rgba(0, 0, 0, 0.65);
          }

          .light-mode {
            --color-bg-primary: #fafbfc;
            --color-bg-secondary: #f3f6f9;
            --color-bg-elevated: rgba(255, 255, 255, 0.9);
            --color-text-primary: #1c2b2e;
            --color-text-secondary: rgba(28, 43, 46, 0.68);
            --color-text-muted: rgba(28, 43, 46, 0.45);
            --color-accent: #0a3d30;
            --color-accent-secondary: #0d4a3a;
            --color-accent-tertiary: #115945;
            --color-border: rgba(17, 89, 69, 0.08);
            --color-glow: rgba(17, 89, 69, 0.25);
            --gradient-mesh: radial-gradient(ellipse 900px 700px at 28% 18%, rgba(10, 61, 48, 0.04) 0%, transparent 55%),
                            radial-gradient(ellipse 1200px 900px at 72% 62%, rgba(17, 89, 69, 0.03) 0%, transparent 62%),
                            radial-gradient(ellipse 800px 520px at 50% 102%, rgba(13, 74, 58, 0.02) 0%, transparent 52%);
            --shadow-sm: 0 1px 3px rgba(17, 89, 69, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
            --shadow-md: 0 4px 12px rgba(17, 89, 69, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04);
            --shadow-lg: 0 12px 32px rgba(17, 89, 69, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06);
            --shadow-xl: 0 24px 64px rgba(17, 89, 69, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);
          }

          .lumora-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--color-bg-primary);
            color: var(--color-text-primary);
            overflow-x: hidden;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
          }

          .gradient-mesh {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-mesh);
            opacity: 1;
            z-index: 0;
            pointer-events: none;
            animation: meshMove 20s ease-in-out infinite;
          }

          @keyframes meshMove {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.1) translateY(-20px); }
          }

          @keyframes logoGlow {
            0%, 100% {
              filter: drop-shadow(0 0 16px rgba(17, 89, 69, 0.8)) drop-shadow(0 0 32px rgba(10, 61, 48, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 28px rgba(17, 89, 69, 1)) drop-shadow(0 0 56px rgba(13, 74, 58, 0.7));
            }
          }

          .logo {
            font-size: 1.375rem;
            font-weight: 700;
            background: linear-gradient(135deg, #115945 0%, #1a7a5e 50%, #0d4a3a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.01em;
            position: relative;
            filter: drop-shadow(0 0 16px rgba(17, 89, 69, 0.8)) drop-shadow(0 0 32px rgba(10, 61, 48, 0.5));
            animation: logoGlow 2.5s ease-in-out infinite;
          }

          .nav-link {
            color: var(--color-text-secondary);
            text-decoration: none;
            font-size: 0.9375rem;
            font-weight: 500;
            transition: color 0.2s ease;
            position: relative;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient-primary);
            transition: width 0.3s ease;
          }

          .nav-link:hover {
            color: var(--color-text-primary);
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .theme-toggle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(12, 15, 14, 0.4);
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
            border: 1.5px solid rgba(17, 89, 69, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .light-mode .theme-toggle {
            background: rgba(255, 255, 255, 0.95);
            border: 1.5px solid rgba(17, 89, 69, 0.12);
            box-shadow: 0 4px 12px rgba(17, 89, 69, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03);
          }

          .theme-toggle:hover {
            transform: translateY(-2px);
            border-color: rgba(17, 89, 69, 0.5);
            box-shadow: 0 0 24px rgba(17, 89, 69, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4);
          }

          .theme-toggle svg {
            width: 20px;
            height: 20px;
            fill: var(--color-text-primary);
            transition: transform 0.5s ease;
          }

          .theme-toggle:hover svg {
            transform: rotate(180deg);
          }

          .btn {
            padding: 0.75rem 1.75rem;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.9375rem;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            position: relative;
            overflow: hidden;
          }

          .btn-primary {
            background: linear-gradient(135deg, rgba(17, 89, 69, 0.95) 0%, rgba(10, 61, 48, 0.95) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            color: #fff;
            box-shadow: 0 0 30px rgba(17, 89, 69, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(17, 89, 69, 0.4);
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 40px rgba(17, 89, 69, 0.7), 0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border-color: rgba(17, 89, 69, 0.6);
          }

          .btn-secondary {
            background: rgba(12, 15, 14, 0.4);
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
            color: var(--color-text-primary);
            border: 1.5px solid rgba(17, 89, 69, 0.25);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .light-mode .btn-secondary {
            background: rgba(255, 255, 255, 0.9);
            border: 1.5px solid rgba(17, 89, 69, 0.15);
            box-shadow: 0 4px 12px rgba(17, 89, 69, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(17, 89, 69, 0.05);
          }

          .btn-secondary:hover {
            transform: translateY(-3px);
            border-color: rgba(17, 89, 69, 0.5);
            background: rgba(17, 89, 69, 0.2);
            box-shadow: 0 0 24px rgba(17, 89, 69, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }

          .section-label {
            display: inline-block;
            padding: 0.5rem 1.25rem;
            background: rgba(17, 89, 69, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(17, 89, 69, 0.4);
            border-radius: 100px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1a7a5e;
            margin-bottom: 1.5rem;
            letter-spacing: 0.025em;
            box-shadow: 0 4px 16px rgba(17, 89, 69, 0.15);
          }

          .light-mode .section-label {
            background: rgba(17, 89, 69, 0.06);
            border: 1px solid rgba(17, 89, 69, 0.15);
            color: #0d4a3a;
            box-shadow: 0 2px 8px rgba(17, 89, 69, 0.08);
          }

          .tool-card {
            background: rgba(12, 15, 14, 0.4);
            backdrop-filter: blur(10px) saturate(150%);
            -webkit-backdrop-filter: blur(10px) saturate(150%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
          }

          .light-mode .tool-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px) saturate(120%);
            -webkit-backdrop-filter: blur(20px) saturate(120%);
            border: 1px solid rgba(17, 89, 69, 0.06);
            box-shadow: 0 4px 16px rgba(17, 89, 69, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02);
          }

          .tool-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
          }

          .light-mode .tool-card:hover {
            border-color: rgba(17, 89, 69, 0.12);
            box-shadow: 0 12px 40px rgba(17, 89, 69, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
          }

          .process-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: var(--gradient-primary);
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            box-shadow: 0 0 32px rgba(17, 89, 69, 0.6), 0 0 64px rgba(10, 61, 48, 0.3);
            border: 1px solid rgba(17, 89, 69, 0.4);
            color: #fff;
          }

          .feature-card {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            aspect-ratio: 1;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .feature-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: var(--shadow-xl);
          }

          .feature-card:hover .feature-image {
            transform: scale(1.025);
          }

          .feature-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
          }

          .feature-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2rem;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%);
            z-index: 2;
          }

          .video-container {
            max-width: 1100px;
            margin: 0 auto;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.65), 0 0 40px rgba(17, 89, 69, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            max-height: 380px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          @media (max-width: 768px) {
            .video-container {
              max-height: 260px;
            }
          }

          .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 10000;
            transition: width 0.1s ease;
          }

          /* Hero video background */
          .hero-video-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }

          .hero-video-bg video {
            position: absolute;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            transform: translate(-50%, -50%);
            object-fit: cover;
            opacity: 0.7;
          }

          .hero-video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.2) 40%,
              rgba(0, 0, 0, 0.3) 70%,
              rgba(0, 0, 0, 0.7) 100%
            );
          }

          .light-mode .hero-video-bg video {
            opacity: 0.25;
          }

          .light-mode .hero-video-overlay {
            background: linear-gradient(
              180deg,
              rgba(250, 251, 252, 0.8) 0%,
              rgba(250, 251, 252, 0.5) 40%,
              rgba(250, 251, 252, 0.7) 70%,
              rgba(250, 251, 252, 0.95) 100%
            );
          }
        `}</style>

        <div className="lumora-page">
          {/* Scroll Progress */}
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

          {/* Gradient Mesh Background */}
          <div className="gradient-mesh" />

          {/* Navigation */}
          <nav
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              padding: isScrolled ? '0.875rem 2rem' : '1.25rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: isScrolled
                ? (isLightMode ? 'rgba(250, 251, 252, 0.95)' : 'rgba(0, 0, 0, 0.5)')
                : (isLightMode ? 'rgba(250, 251, 252, 0.85)' : 'rgba(0, 0, 0, 0.4)'),
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom: isLightMode
                ? '1px solid rgba(17, 89, 69, 0.08)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="logo">lumora</div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="#features" className="nav-link" style={{ display: 'none' }}>Features</a>
              <a href="#how-it-works" className="nav-link" style={{ display: 'none' }}>How it Works</a>
              <a href="#pricing" className="nav-link" style={{ display: 'none' }}>Pricing</a>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {isLightMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/>
                  </svg>
                )}
              </button>
              <button className="btn btn-primary">Start Free</button>
            </div>
          </nav>

          {/* Hero Section with Video Background */}
          <section
            style={{
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '8rem 2rem 4rem',
              zIndex: 1,
              margin: '100px 3rem 0',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Video Background */}
            <div className="hero-video-bg">
              <video autoPlay muted loop playsInline>
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              </video>
              <div className="hero-video-overlay" />
            </div>

            <div style={{ maxWidth: 960, zIndex: 2 }}>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The all-in-one platform for solo creators
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '2.5rem',
                  lineHeight: 1.6,
                  maxWidth: 680,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Learn AI video generation, writing automation, design tools, and marketing workflows—no tech experience needed.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <button className="btn btn-primary">Start Creating Free</button>
                <button className="btn btn-secondary">Watch Demo</button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">EVERYTHING YOU NEED</div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Professional-grade AI tools designed for creators
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Turn product ideas into scroll-stopping social videos. No filming, no editing software required.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.75rem',
                maxWidth: 1200,
                margin: '0 auto',
              }}
            >
              {[
                {
                  title: 'AI Video Generation',
                  description: 'Turn product ideas into scroll-stopping social videos. No filming, no editing software—just describe what you want and watch it come to life.',
                  image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=375&fit=crop&auto=format',
                },
                {
                  title: 'Design Studio',
                  description: 'Generate product mockups, social graphics, and marketing assets instantly. Maintain consistent style across all your content without hiring a designer.',
                  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=375&fit=crop&auto=format',
                },
                {
                  title: 'AI Writing Assistant',
                  description: 'Write sales pages, email sequences, and social captions that convert. Our AI learns your voice and creates content that sounds authentically you.',
                  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=375&fit=crop&auto=format',
                },
                {
                  title: 'Marketing Automation',
                  description: 'Build workflows that run your marketing on autopilot. From lead capture to email nurture, spend less time on tasks and more time creating.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=375&fit=crop&auto=format',
                },
              ].map((tool) => (
                <div key={tool.title} className="tool-card">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                      {tool.title}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How it Works Section */}
          <section id="how-it-works" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">SIMPLE PROCESS</div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                No technical skills required—just follow the system
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Three simple steps from idea to published content
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem',
                maxWidth: 1100,
                margin: '0 auto',
              }}
            >
              {[
                { num: 1, title: 'Describe Your Vision', desc: 'Type a simple description of your content. Our AI guides you through the details to get exactly what you need.' },
                { num: 2, title: 'AI Creates Instantly', desc: 'Watch as Lumora creates professional-quality videos, copy, designs, and workflows in seconds—not hours.' },
                { num: 3, title: 'Edit & Launch', desc: 'Fine-tune with our simple editor, then export everything ready to post. No tech skills needed—just publish and grow.' },
              ].map((step) => (
                <div key={step.num} style={{ textAlign: 'center', padding: '2rem' }}>
                  <div className="process-number">{step.num}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Showcase Section */}
          <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">FROM IDEA TO LAUNCH</div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Explore what's possible when imagination meets AI
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: 1200,
                margin: '0 auto',
              }}
            >
              {[
                { title: 'AI Video Generation', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop&auto=format' },
                { title: 'Brand Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop&auto=format' },
                { title: 'Content Writing', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=600&fit=crop&auto=format' },
                { title: 'Marketing Tools', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop&auto=format' },
                { title: 'Audio Studio', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=600&fit=crop&auto=format' },
                { title: 'Launch Templates', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=600&fit=crop&auto=format' },
              ].map((feature) => (
                <div key={feature.title} className="feature-card">
                  <img className="feature-image" src={feature.image} alt={feature.title} />
                  <div className="feature-overlay">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              Join thousands of creators transforming their workflow
            </h2>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '2.5rem',
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Start free, upgrade as you grow
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Start Creating Free</button>
              <button className="btn btn-secondary">Talk to Sales</button>
            </div>
          </section>

          {/* Footer */}
          <footer
            style={{
              padding: '4rem 2rem 2rem',
              borderTop: '1px solid var(--color-border)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '3rem',
                marginBottom: '3rem',
              }}
            >
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.5rem' }}>Product</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['AI Video', 'Design Studio', 'Writing Assistant', 'Marketing Tools', 'Pricing'].map((item) => (
                    <li key={item} style={{ marginBottom: '0.75rem' }}>
                      <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.5rem' }}>Resources</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Documentation', 'Tutorials', 'Blog', 'Community'].map((item) => (
                    <li key={item} style={{ marginBottom: '0.75rem' }}>
                      <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.5rem' }}>Company</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['About', 'Careers', 'Contact'].map((item) => (
                    <li key={item} style={{ marginBottom: '0.75rem' }}>
                      <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.5rem' }}>Legal</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Privacy', 'Terms'].map((item) => (
                    <li key={item} style={{ marginBottom: '0.75rem' }}>
                      <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                paddingTop: '2rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <p>© 2026 Lumora AI. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {['Twitter', 'LinkedIn', 'Instagram'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
