import { useEffect, useState } from 'react';

/**
 * Lumora Video - Cinematic Hero Landing
 *
 * SECTIONS (aligned with all Lumora landing pages):
 * 1. Navigation
 * 2. Hero with background video
 * 3. Features (4 cards with images)
 * 4. How It Works (3 steps)
 * 5. Showcase Gallery (6 cards)
 * 6. Testimonials (3 cards)
 * 7. Pricing (3 tiers)
 * 8. FAQ (7 items)
 * 9. Final CTA
 * 10. Footer (4-column)
 *
 * Emerald green color scheme (#0a3d30, #0d4a3a, #115945)
 * Inter font, glassmorphism, gradient mesh background
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

          .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 10000;
            transition: width 0.1s ease;
          }

          /* Testimonial card */
          .testimonial-card {
            background: rgba(12, 15, 14, 0.4);
            backdrop-filter: blur(10px) saturate(150%);
            -webkit-backdrop-filter: blur(10px) saturate(150%);
            border: 1px solid var(--color-border);
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s ease;
          }

          .light-mode .testimonial-card {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(17, 89, 69, 0.06);
          }

          .testimonial-card:hover {
            border-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          }

          /* Pricing card */
          .pricing-card {
            background: rgba(12, 15, 14, 0.4);
            backdrop-filter: blur(10px) saturate(150%);
            -webkit-backdrop-filter: blur(10px) saturate(150%);
            border: 1px solid var(--color-border);
            border-radius: 16px;
            padding: 2.5rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
          }

          .light-mode .pricing-card {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(17, 89, 69, 0.06);
          }

          .pricing-card.featured {
            background: rgba(17, 89, 69, 0.08);
            border-color: rgba(17, 89, 69, 0.35);
            transform: scale(1.02);
          }

          .pricing-card.featured::before {
            content: 'Most Popular';
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-accent);
            padding: 0.35rem 0.9rem;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 500;
            color: white;
          }

          .pricing-card:hover {
            border-color: rgba(255, 255, 255, 0.12);
            transform: translateY(-4px);
            box-shadow: 0 16px 35px rgba(0, 0, 0, 0.25);
          }

          .pricing-card.featured:hover {
            border-color: rgba(17, 89, 69, 0.45);
            transform: scale(1.02) translateY(-4px);
          }

          /* FAQ item */
          .faq-item {
            background: rgba(12, 15, 14, 0.4);
            backdrop-filter: blur(10px) saturate(150%);
            -webkit-backdrop-filter: blur(10px) saturate(150%);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
          }

          .light-mode .faq-item {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(17, 89, 69, 0.06);
          }

          .faq-item:hover {
            border-color: rgba(255, 255, 255, 0.1);
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
              <a href="#gallery" className="nav-link" style={{ display: 'none' }}>Gallery</a>
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
              <div className="section-label" style={{ marginBottom: '2rem' }}>
                Create professional content in under 30 seconds
              </div>
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
                Master AI Tools to Create, Design & Market Your Products
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
                The all-in-one platform for solo creators. Learn AI video generation, writing automation, design tools, and marketing workflows—no tech experience needed.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <button className="btn btn-primary">Get Started Free</button>
                <button className="btn btn-secondary">Watch Demo</button>
              </div>

              {/* Trust Strip */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '2.5rem',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
              }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '1rem' }}>
                  Trusted by creators at
                </span>
                {['Brand Logo 1', 'Brand Logo 2', 'Brand Logo 3', 'Brand Logo 4'].map((logo, i) => (
                  <div key={i} style={{
                    width: 120, height: 36,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', color: 'var(--color-text-muted)', opacity: 0.6,
                  }}>{logo}</div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">POWERFUL FEATURES</div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Everything you need to create
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Professional-grade AI tools designed for creators, marketers, and visionaries
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
                  title: 'AI Video in Minutes',
                  description: 'Turn product ideas into scroll-stopping social videos. No filming, no editing software—just describe what you want and watch it come to life.',
                  image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop',
                },
                {
                  title: 'Brand Visuals On-Demand',
                  description: 'Generate product mockups, social graphics, and marketing assets instantly. Maintain consistent style across all your content without hiring a designer.',
                  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
                },
                {
                  title: 'AI Writing Assistant',
                  description: 'Write sales pages, email sequences, and social captions that convert. Our AI learns your voice and creates content that sounds authentically you.',
                  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
                },
                {
                  title: 'Marketing Automation',
                  description: 'Build workflows that run your marketing on autopilot. From lead capture to email nurture, spend less time on tasks and more time creating.',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
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
                From idea to launch in 3 steps
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                No technical skills required—just follow the system
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
                { num: 1, title: 'Describe What You Want', desc: 'Type a simple description of your content. Our AI guides you through the details to get exactly what you need.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop' },
                { num: 2, title: 'AI Generates Your Content', desc: 'Watch as Lumora creates professional-quality videos, copy, designs, and workflows in seconds—not hours.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop' },
                { num: 3, title: 'Edit, Export & Launch', desc: 'Fine-tune with our simple editor, then export everything ready to post. No tech skills needed—just publish and grow.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
              ].map((step) => (
                <div key={step.num} style={{ textAlign: 'center' }}>
                  <div className="process-number">{step.num}</div>
                  <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
                    <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">INSPIRATION</div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Created with Lumora
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Explore what's possible when imagination meets AI
              </p>
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
                { title: 'Cyberpunk Dreams', subtitle: 'Neon-lit cityscape', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=450&fit=crop' },
                { title: 'Ocean Serenity', subtitle: 'Underwater exploration', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=450&fit=crop' },
                { title: 'Product Showcase', subtitle: 'Commercial photography', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=450&fit=crop' },
                { title: 'Character Design', subtitle: 'Fantasy portrait', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop' },
                { title: 'Abstract Art', subtitle: 'Generative patterns', image: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=600&h=450&fit=crop' },
                { title: "Nature's Beauty", subtitle: 'Landscape photography', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop' },
              ].map((feature) => (
                <div key={feature.title} className="feature-card">
                  <img className="feature-image" src={feature.image} alt={feature.title} />
                  <div className="feature-overlay">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">TESTIMONIALS</div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Loved by creators worldwide
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Join thousands of creators transforming their workflow
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: 1400, margin: '0 auto' }}>
              {[
                { initials: 'SK', name: 'Sarah Kim', role: 'Online Course Creator \u2022 $42K/mo', quote: 'I went from spending 12 hours editing one video to creating 5 videos in an afternoon. Lumora handles all the heavy lifting\u2014I just guide the creative direction. Saved me $3,000/month in editing costs.' },
                { initials: 'MC', name: 'Marcus Chen', role: 'Digital Product Creator \u2022 2,400 students', quote: 'The AI copywriting alone is worth 10x the price. I launched my info product in 3 days instead of 3 weeks. Sales page, emails, social posts\u2014all done while I focused on the product itself.' },
                { initials: 'EP', name: 'Emily Parker', role: 'Solopreneur \u2022 From $8K to $35K/mo in 90 days', quote: 'Finally, AI tools that actually work together. I can go from product idea to full marketing campaign without switching between 10 different apps. My launch revenue jumped 340% with half the stress.' },
              ].map((t) => (
                <div key={t.name} className="testimonial-card">
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#fbbf24' }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                    "{t.quote}"
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(17, 89, 69, 0.15)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, fontSize: '1.1rem' }}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{t.name}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">PRICING</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.2 }}>
                Choose your plan
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Start free, upgrade as you grow
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
              {[
                { badge: 'Test the waters', name: 'Starter', desc: 'Perfect for exploring AI tools', price: '$0', period: '/month', features: ['50 generations per month', '720p video quality', 'Basic style presets', 'Community support'], cta: 'Get Started', featured: false },
                { badge: 'Best for full-time creators', name: 'Pro', desc: 'For serious solo creators scaling up', price: '$49', period: '/month', savings: 'Save $108/year', features: ['Unlimited generations', '4K video quality', 'Advanced style controls', 'Priority rendering', 'Team collaboration', 'Priority support'], cta: 'Start Pro Trial', featured: true },
                { badge: 'For agencies & businesses', name: 'Enterprise', desc: 'Custom solutions for scale', price: 'Custom', period: '', features: ['Unlimited everything', 'Custom model training', 'API access', 'Dedicated support', 'SLA guarantee', 'Custom integrations'], cta: 'Contact Sales', featured: false },
              ].map((plan) => (
                <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                  <div style={{ display: 'inline-block', padding: '0.35rem 0.75rem', background: 'rgba(17, 89, 69, 0.1)', border: '1px solid rgba(17, 89, 69, 0.2)', borderRadius: 6, fontSize: '0.8rem', color: '#1a7a5e', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {plan.badge}
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{plan.name}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{plan.desc}</p>
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{plan.price}</span>
                    {plan.period && <span style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>{plan.period}</span>}
                    {plan.savings && <span style={{ display: 'inline-block', marginLeft: '0.5rem', padding: '0.25rem 0.6rem', background: 'rgba(17, 89, 69, 0.15)', borderRadius: 4, fontSize: '0.75rem', color: '#1a7a5e', fontWeight: 600 }}>{plan.savings}</span>}
                  </div>
                  <ul style={{ listStyle: 'none', marginBottom: '2rem', padding: 0 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" style={{ width: 20, height: 20, stroke: '#1a7a5e', flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={plan.featured ? 'btn btn-primary' : 'btn btn-secondary'} style={{ width: '100%', justifyContent: 'center' }}>{plan.cta}</button>
                  {plan.featured && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: 100, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" style={{ width: 14, height: 14, stroke: '#1a7a5e' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Cancel anytime
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: 100, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" style={{ width: 14, height: 14, stroke: '#1a7a5e' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        No credit card
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
              <div className="section-label">QUESTIONS</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.2 }}>
                Everything you need to know
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Can't find what you're looking for? Chat with our team
              </p>
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              {[
                { q: 'Do I own the commercial rights to what I create?', a: 'Yes, 100%. Everything you create with Lumora is yours to use commercially\u2014sell products, run ads, post on social media, use in client work. No attribution required, no royalties owed.' },
                { q: "I'm not tech-savvy. Is this really beginner-friendly?", a: "Absolutely. If you can type and click a button, you can use Lumora. We've designed every tool with beginners in mind\u2014no coding, no complex software, no learning curve. Most creators generate their first content in under 5 minutes." },
                { q: 'How fast is the generation? Do I have to wait hours?', a: 'Most content generates in 10-45 seconds. Videos take slightly longer (1-2 minutes for high quality), but you can queue multiple projects and let them process while you work on other things. No overnight rendering\u2014everything is near-instant.' },
                { q: "What if I don't like what the AI generates?", a: 'Regenerate as many times as you need (unlimited on Pro plan). You can also use our editor to tweak colors, adjust text, swap elements, or refine details without starting over. Most creators get what they want within 2-3 iterations.' },
                { q: 'Can I cancel my subscription at any time?', a: "Yes, cancel anytime\u2014no questions asked, no penalties. You'll keep access until the end of your billing period. Need to pause for a month? No problem. Want to downgrade? Easy. We're flexible because your business needs change." },
                { q: 'Is my data and content private and secure?', a: "Your data is encrypted and never shared with third parties. We don't train our models on your private content. You can delete your data anytime. We're SOC 2 compliant and take security seriously\u2014your creations and business information stay confidential." },
                { q: 'What makes Lumora different from other AI tools?', a: 'Most AI tools do one thing. Lumora is an integrated system built specifically for solo creators\u2014video, copy, design, automation, and music in one place. No switching apps, no exporting and importing, no compatibility issues. One login, one workflow, everything connected.' },
              ].map((faq) => (
                <div key={faq.q} className="faq-item">
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>{faq.q}</div>
                  <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{faq.a}</div>
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
              Ready to bring your ideas to life?
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
              Join thousands of creators already using Lumora to push the boundaries of creative expression
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Start Creating Free</button>
              <button className="btn btn-secondary">Schedule Demo</button>
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
              {[
                { title: 'Product', links: ['Features', 'Pricing', 'Gallery', 'API', 'Changelog'] },
                { title: 'Resources', links: ['Documentation', 'Tutorials', 'Blog', 'Community', 'Support'] },
                { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
              ].map((section) => (
                <div key={section.title}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.5rem' }}>{section.title}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {section.links.map((item) => (
                      <li key={item} style={{ marginBottom: '0.75rem' }}>
                        <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
              <p>&copy; 2026 Lumora AI. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map((link) => (
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
