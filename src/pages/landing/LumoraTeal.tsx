import { useEffect, useState, useRef } from 'react';

/**
 * Lumora Teal - Premium Creator Platform Landing Page
 *
 * Dark theme with teal/emerald accents (#047857, #0d9488, #14b8a6)
 * Features:
 * - Animated mesh gradient background
 * - Glassmorphism effects with backdrop blur
 * - Scroll progress indicator
 * - Nav blur on scroll
 * - Feature card hover effects with radial glow
 * - Parallax scroll effects
 * - Intersection Observer fade-in animations
 *
 * High-end premium aesthetic for Gen Z creators
 */

export default function LumoraTeal() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Nav scroll state
      setIsScrolled(currentScroll > 100);

      // Scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);

      // Parallax on mesh
      if (meshRef.current) {
        meshRef.current.style.transform = `translateY(${currentScroll * 0.3}px) scale(${1 + currentScroll * 0.0001})`;
      }

      // Parallax on hero content
      if (heroContentRef.current && currentScroll < window.innerHeight) {
        heroContentRef.current.style.transform = `translateY(${currentScroll * 0.15}px)`;
        heroContentRef.current.style.opacity = String(1 - (currentScroll / window.innerHeight) * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="lumora-teal">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .lumora-teal {
          --color-bg-primary: #000000;
          --color-bg-secondary: #070808;
          --color-bg-elevated: #0c0f0e;
          --color-text-primary: #ffffff;
          --color-text-secondary: rgba(255, 255, 255, 0.72);
          --color-text-muted: rgba(255, 255, 255, 0.48);
          --color-accent: #047857;
          --color-accent-secondary: #0d9488;
          --color-accent-tertiary: #14b8a6;
          --color-border: rgba(255, 255, 255, 0.07);
          --color-glow: rgba(20, 184, 166, 0.10);
          --gradient-primary: linear-gradient(135deg, #0d9488 0%, #14b8a6 55%, #047857 100%);
          --gradient-mesh: radial-gradient(ellipse 900px 700px at 28% 18%, rgba(13, 148, 136, 0.10) 0%, transparent 55%),
                          radial-gradient(ellipse 1200px 900px at 72% 62%, rgba(20, 184, 166, 0.08) 0%, transparent 62%),
                          radial-gradient(ellipse 800px 520px at 50% 102%, rgba(4, 120, 87, 0.06) 0%, transparent 52%);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
          --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.45);
          --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.55);
          --shadow-xl: 0 24px 70px rgba(0, 0, 0, 0.65);

          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
          overflow-x: hidden;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        .lumora-teal * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Animated mesh gradient background */
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

        /* Scroll indicator */
        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: var(--gradient-primary);
          z-index: 9999;
          transition: width 0.1s ease;
        }

        /* Navigation */
        .lumora-teal nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--color-border);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lumora-teal nav.scrolled {
          padding: 0.875rem 2rem;
          background: rgba(0, 0, 0, 0.8);
        }

        .logo {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: -0.03em;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .logo:hover {
          opacity: 0.7;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-links a {
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          display: none;
        }

        .nav-links a:hover {
          color: var(--color-text-primary);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        @media (min-width: 768px) {
          .lumora-teal nav {
            padding: 1.5rem 3rem;
          }

          .lumora-teal nav.scrolled {
            padding: 1rem 3rem;
          }

          .logo {
            font-size: 1.5rem;
          }

          .nav-links {
            gap: 2rem;
          }

          .nav-links a {
            display: block;
            font-size: 0.95rem;
          }
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .btn-primary {
          background: rgba(13, 148, 136, 0.14);
          color: white;
          border: 1px solid rgba(20, 184, 166, 0.26);
          box-shadow: 0 6px 22px rgba(20, 184, 166, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.10);
        }

        .btn-primary:hover {
          background: rgba(13, 148, 136, 0.22);
          border-color: rgba(20, 184, 166, 0.42);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(20, 184, 166, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          color: var(--color-text-primary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 3rem 4rem;
          text-align: center;
          z-index: 1;
          overflow: hidden;
        }

        .hero-bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          object-position: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.75));
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.05em;
          margin-bottom: 1.5rem;
          color: var(--color-text-primary);
          transform: translateZ(0);
        }

        @media (min-width: 768px) {
          .hero h1 {
            font-size: 5rem;
          }
        }

        .hero .highlight {
          color: var(--color-text-primary);
          display: inline-block;
          position: relative;
        }

        .hero .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, rgba(13, 148, 136, 0.28), rgba(20, 184, 166, 0.22), rgba(4, 120, 87, 0.22));
          filter: blur(10px);
          z-index: -1;
        }

        .hero-metric {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(13, 148, 136, 0.08);
          border: 1px solid rgba(20, 184, 166, 0.15);
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-accent-tertiary);
          margin-bottom: 2rem;
        }

        .hero p {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .hero p {
            font-size: 1.3rem;
          }
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Trust Strip */
        .trust-strip {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin: 2.5rem 0;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--color-border);
          border-radius: 12px;
        }

        .trust-strip-label {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-right: 1rem;
        }

        .logo-placeholder {
          width: 120px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          opacity: 0.6;
        }

        /* Video showcase */
        .video-showcase {
          position: relative;
          margin-top: 5rem;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .video-showcase:hover {
          transform: translateY(-4px);
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 300px;
          border-radius: 0;
          overflow: hidden;
          background: var(--color-bg-primary);
        }

        @media (min-width: 768px) {
          .video-container {
            height: 500px;
          }
        }

        .video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .video-placeholder::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, transparent 0%, rgba(13, 148, 136, 0.03) 50%, transparent 100%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }

        /* Features Section */
        .features {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .features {
            padding: 4rem 1.5rem;
          }
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-label {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(13, 148, 136, 0.1);
          border: 1px solid rgba(20, 184, 166, 0.2);
          border-radius: 100px;
          color: var(--color-accent-tertiary);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .section-header h2 {
            font-size: 3.5rem;
          }
        }

        .section-header p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          }
        }

        .feature-card {
          background-color: rgba(255, 255, 255, 0.01);
          background-size: cover;
          background-position: center;
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
          will-change: transform;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(20, 184, 166, 0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(2px);
          z-index: 0;
        }

        .feature-card:hover {
          border-color: rgba(20, 184, 166, 0.3);
          transform: translateY(-6px) translateZ(0);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.05);
          background: rgba(13, 148, 136, 0.15);
        }

        .feature-icon {
          position: relative;
          z-index: 2;
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(13, 148, 136, 0.1);
          border: 1px solid rgba(20, 184, 166, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-icon svg {
          width: 22px;
          height: 22px;
          stroke: var(--color-accent-tertiary);
          fill: none;
          stroke-width: 1.5;
        }

        .feature-card h3 {
          position: relative;
          z-index: 2;
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .feature-card p {
          position: relative;
          z-index: 2;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* How It Works Section */
        .how-it-works {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .how-it-works {
            padding: 4rem 1.5rem;
          }
        }

        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          max-width: 1200px;
          margin: 3rem auto 0;
        }

        @media (min-width: 768px) {
          .steps-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        .step-card {
          text-align: center;
          position: relative;
        }

        .step-number {
          width: 60px;
          height: 60px;
          margin: 0 auto 1.5rem;
          background: rgba(13, 148, 136, 0.1);
          border: 2px solid rgba(20, 184, 166, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-accent-tertiary);
        }

        .step-visual {
          width: 100%;
          height: 200px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          text-align: center;
          padding: 1rem;
        }

        .step-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .step-card p {
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Gallery Section */
        .gallery {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .gallery {
            padding: 4rem 1.5rem;
          }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 1400px;
          margin: 3rem auto 0;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 0;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover {
          opacity: 0.8;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .gallery-overlay p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        /* Testimonials */
        .testimonials {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .testimonials {
            padding: 4rem 1.5rem;
          }
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1400px;
          margin: 3rem auto 0;
        }

        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          }
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
          color: #fbbf24;
        }

        .testimonial-content {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 148, 136, 0.15);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 1.1rem;
        }

        .author-info h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .author-info p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        /* Pricing Section */
        .pricing {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .pricing {
            padding: 4rem 1.5rem;
          }
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 3rem auto 0;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        .pricing-card {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .pricing-card.featured {
          background: rgba(13, 148, 136, 0.04);
          border-color: rgba(20, 184, 166, 0.35);
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
          border-color: rgba(20, 184, 166, 0.45);
          transform: scale(1.02) translateY(-4px);
        }

        .pricing-best-for {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: rgba(13, 148, 136, 0.1);
          border: 1px solid rgba(20, 184, 166, 0.2);
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--color-accent-tertiary);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .pricing-savings {
          display: inline-block;
          margin-left: 0.5rem;
          padding: 0.25rem 0.6rem;
          background: rgba(13, 148, 136, 0.15);
          border-radius: 4px;
          font-size: 0.75rem;
          color: var(--color-accent-tertiary);
          font-weight: 600;
        }

        .pricing-header {
          margin-bottom: 2rem;
        }

        .pricing-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .pricing-header p {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
        }

        .pricing-price {
          margin-bottom: 2rem;
        }

        .pricing-price .amount {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .pricing-price .period {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
        }

        .pricing-features {
          list-style: none;
          margin-bottom: 2rem;
        }

        .pricing-features li {
          padding: 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-text-secondary);
          border-bottom: 1px solid var(--color-border);
        }

        .pricing-features li:last-child {
          border-bottom: none;
        }

        .pricing-features svg {
          width: 20px;
          height: 20px;
          stroke: var(--color-accent-tertiary);
          flex-shrink: 0;
        }

        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border);
          border-radius: 100px;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-right: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .trust-badge svg {
          width: 14px;
          height: 14px;
          stroke: var(--color-accent-tertiary);
        }

        /* FAQ Section */
        .faq {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .faq {
            padding: 4rem 1.5rem;
          }
        }

        .faq-grid {
          max-width: 900px;
          margin: 3rem auto 0;
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(10px);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .faq-question {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--color-text-primary);
        }

        .faq-answer {
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* CTA Section */
        .cta {
          position: relative;
          padding: 8rem 3rem;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .cta {
            padding: 4rem 1.5rem;
          }
        }

        .cta-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 4rem;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .cta-content {
            padding: 2.5rem 1.5rem;
          }
        }

        .cta-content::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(13, 148, 136, 0.03) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-content > * {
          position: relative;
          z-index: 1;
        }

        .cta h2 {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .cta h2 {
            font-size: 3rem;
          }
        }

        .cta p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
        }

        /* Footer */
        .lumora-teal footer {
          position: relative;
          padding: 4rem 3rem 2rem;
          border-top: 1px solid var(--color-border);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .lumora-teal footer {
            padding: 4rem 1.5rem 2rem;
          }
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        .footer-section h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section li {
          margin-bottom: 0.75rem;
        }

        .footer-section a {
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: var(--color-text-primary);
        }

        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }

        .footer-social {
          display: flex;
          gap: 1.5rem;
        }

        .footer-social a {
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-social a:hover {
          color: var(--color-text-primary);
        }

        /* Image placeholder loading */
        .img-placeholder {
          width: 100%;
          height: 100%;
          background: var(--color-bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .img-placeholder::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.02), transparent);
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} />

      {/* Animated Background */}
      <div className="gradient-mesh" ref={meshRef} />

      {/* Navigation */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="logo">Lumora</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Pricing</a>
          <button className="btn btn-primary">Start Creating</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        {/* Background Video */}
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="hero-overlay" />

        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-metric">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Create professional content in under 30 seconds
          </div>
          <h1>
            Master AI Tools to <span className="highlight">Create, Design &amp; Market</span> Your Products
          </h1>
          <p>
            The all-in-one platform for solo creators. Learn AI video generation, writing automation, design tools, and marketing workflows—no tech experience needed.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started Free</button>
            <button className="btn btn-secondary">Watch Demo</button>
          </div>

          <div className="trust-strip">
            <span className="trust-strip-label">Trusted by creators at</span>
            <div className="logo-placeholder">Brand Logo 1</div>
            <div className="logo-placeholder">Brand Logo 2</div>
            <div className="logo-placeholder">Brand Logo 3</div>
            <div className="logo-placeholder">Brand Logo 4</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-label">Powerful Features</span>
          <h2>Everything you need to create</h2>
          <p>Professional-grade AI tools designed for creators, marketers, and visionaries</p>
        </div>

        <div className="features-grid">
          <div className="feature-card animate-on-scroll" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop)' }}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
              </svg>
            </div>
            <h3>AI Video in Minutes</h3>
            <p>Turn product ideas into scroll-stopping social videos. No filming, no editing software—just describe what you want and watch it come to life.</p>
          </div>

          <div className="feature-card animate-on-scroll" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop)' }}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </div>
            <h3>Brand Visuals On-Demand</h3>
            <p>Generate product mockups, social graphics, and marketing assets instantly. Maintain consistent style across all your content without hiring a designer.</p>
          </div>

          <div className="feature-card animate-on-scroll" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop)' }}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>AI Writing Assistant</h3>
            <p>Write sales pages, email sequences, and social captions that convert. Our AI learns your voice and creates content that sounds authentically you.</p>
          </div>

          <div className="feature-card animate-on-scroll" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop)' }}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Marketing Automation</h3>
            <p>Build workflows that run your marketing on autopilot. From lead capture to email nurture, spend less time on tasks and more time creating.</p>
          </div>

          <div className="feature-card animate-on-scroll" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop)' }}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 18V5l12-2v13M9 9l12-2"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <h3>Music &amp; Audio Tools</h3>
            <p>Generate royalty-free background music, voiceovers, and sound effects. Perfect audio for every video without licensing headaches.</p>
          </div>

          <div className="feature-card animate-on-scroll" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop)' }}>
            <div className="feature-icon">
              <svg viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Done-For-You Templates</h3>
            <p>Start with proven templates for every creator need—course launches, product drops, challenge funnels. Customize and launch in hours, not weeks.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <span className="section-label">Simple Process</span>
          <h2>From idea to launch in 3 steps</h2>
          <p>No technical skills required—just follow the system</p>
        </div>

        <div className="steps-grid">
          <div className="step-card animate-on-scroll">
            <div className="step-number">1</div>
            <div className="step-visual">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                alt="Creator typing prompt"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <h3>Describe What You Want</h3>
            <p>Type a simple description of your content. Our AI guides you through the details to get exactly what you need.</p>
          </div>

          <div className="step-card animate-on-scroll">
            <div className="step-number">2</div>
            <div className="step-visual">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
                alt="AI generating content"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <h3>AI Generates Your Content</h3>
            <p>Watch as Lumora creates professional-quality videos, copy, designs, and workflows in seconds—not hours.</p>
          </div>

          <div className="step-card animate-on-scroll">
            <div className="step-number">3</div>
            <div className="step-visual">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                alt="Export and launch"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <h3>Edit, Export &amp; Launch</h3>
            <p>Fine-tune with our simple editor, then export everything ready to post. No tech skills needed—just publish and grow.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <div className="section-header">
          <span className="section-label">Inspiration</span>
          <h2>Created with Lumora</h2>
          <p>Explore what's possible when imagination meets AI</p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=450&fit=crop" alt="Cyberpunk Dreams" />
            <div className="gallery-overlay">
              <h4>Cyberpunk Dreams</h4>
              <p>Neon-lit cityscape</p>
            </div>
          </div>

          <div className="gallery-item animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=450&fit=crop" alt="Ocean Serenity" />
            <div className="gallery-overlay">
              <h4>Ocean Serenity</h4>
              <p>Underwater exploration</p>
            </div>
          </div>

          <div className="gallery-item animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=450&fit=crop" alt="Product Showcase" />
            <div className="gallery-overlay">
              <h4>Product Showcase</h4>
              <p>Commercial photography</p>
            </div>
          </div>

          <div className="gallery-item animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop" alt="Character Design" />
            <div className="gallery-overlay">
              <h4>Character Design</h4>
              <p>Fantasy portrait</p>
            </div>
          </div>

          <div className="gallery-item animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=600&h=450&fit=crop" alt="Abstract Art" />
            <div className="gallery-overlay">
              <h4>Abstract Art</h4>
              <p>Generative patterns</p>
            </div>
          </div>

          <div className="gallery-item animate-on-scroll">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop" alt="Nature's Beauty" />
            <div className="gallery-overlay">
              <h4>Nature's Beauty</h4>
              <p>Landscape photography</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2>Loved by creators worldwide</h2>
          <p>Join thousands of creators transforming their workflow</p>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card animate-on-scroll">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <div className="testimonial-content">
              "I went from spending 12 hours editing one video to creating 5 videos in an afternoon. Lumora handles all the heavy lifting—I just guide the creative direction. Saved me $3,000/month in editing costs."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SK</div>
              <div className="author-info">
                <h4>Sarah Kim</h4>
                <p>Online Course Creator • $42K/mo</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card animate-on-scroll">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <div className="testimonial-content">
              "The AI copywriting alone is worth 10x the price. I launched my info product in 3 days instead of 3 weeks. Sales page, emails, social posts—all done while I focused on the product itself."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MC</div>
              <div className="author-info">
                <h4>Marcus Chen</h4>
                <p>Digital Product Creator • 2,400 students</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card animate-on-scroll">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <div className="testimonial-content">
              "Finally, AI tools that actually work together. I can go from product idea to full marketing campaign without switching between 10 different apps. My launch revenue jumped 340% with half the stress."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">EP</div>
              <div className="author-info">
                <h4>Emily Parker</h4>
                <p>Solopreneur • From $8K to $35K/mo in 90 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2>Choose your plan</h2>
          <p>Start free, upgrade as you grow</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card animate-on-scroll">
            <span className="pricing-best-for">Test the waters</span>
            <div className="pricing-header">
              <h3>Starter</h3>
              <p>Perfect for exploring AI tools</p>
            </div>
            <div className="pricing-price">
              <span className="amount">$0</span>
              <span className="period">/month</span>
            </div>
            <ul className="pricing-features">
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                50 generations per month
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                720p video quality
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Basic style presets
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Community support
              </li>
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Get Started</button>
          </div>

          <div className="pricing-card featured animate-on-scroll">
            <span className="pricing-best-for">Best for full-time creators</span>
            <div className="pricing-header">
              <h3>Pro</h3>
              <p>For serious solo creators scaling up</p>
            </div>
            <div className="pricing-price">
              <span className="amount">$49</span>
              <span className="period">/month</span>
              <span className="pricing-savings">Save $108/year</span>
            </div>
            <ul className="pricing-features">
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Unlimited generations
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                4K video quality
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Advanced style controls
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Priority rendering
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Team collaboration
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Priority support
              </li>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }}>Start Pro Trial</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Cancel anytime
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                No credit card
              </div>
            </div>
          </div>

          <div className="pricing-card animate-on-scroll">
            <span className="pricing-best-for">For agencies &amp; businesses</span>
            <div className="pricing-header">
              <h3>Enterprise</h3>
              <p>Custom solutions for scale</p>
            </div>
            <div className="pricing-price">
              <span className="amount" style={{ fontSize: '2.5rem' }}>Custom</span>
            </div>
            <ul className="pricing-features">
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Unlimited everything
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Custom model training
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                API access
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Dedicated support
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                SLA guarantee
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Custom integrations
              </li>
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="section-header">
          <span className="section-label">Questions</span>
          <h2>Everything you need to know</h2>
          <p>Can't find what you're looking for? Chat with our team</p>
        </div>

        <div className="faq-grid">
          <div className="faq-item animate-on-scroll">
            <div className="faq-question">Do I own the commercial rights to what I create?</div>
            <div className="faq-answer">Yes, 100%. Everything you create with Lumora is yours to use commercially—sell products, run ads, post on social media, use in client work. No attribution required, no royalties owed.</div>
          </div>

          <div className="faq-item animate-on-scroll">
            <div className="faq-question">I'm not tech-savvy. Is this really beginner-friendly?</div>
            <div className="faq-answer">Absolutely. If you can type and click a button, you can use Lumora. We've designed every tool with beginners in mind—no coding, no complex software, no learning curve. Most creators generate their first content in under 5 minutes.</div>
          </div>

          <div className="faq-item animate-on-scroll">
            <div className="faq-question">How fast is the generation? Do I have to wait hours?</div>
            <div className="faq-answer">Most content generates in 10-45 seconds. Videos take slightly longer (1-2 minutes for high quality), but you can queue multiple projects and let them process while you work on other things. No overnight rendering—everything is near-instant.</div>
          </div>

          <div className="faq-item animate-on-scroll">
            <div className="faq-question">What if I don't like what the AI generates?</div>
            <div className="faq-answer">Regenerate as many times as you need (unlimited on Pro plan). You can also use our editor to tweak colors, adjust text, swap elements, or refine details without starting over. Most creators get what they want within 2-3 iterations.</div>
          </div>

          <div className="faq-item animate-on-scroll">
            <div className="faq-question">Can I cancel my subscription at any time?</div>
            <div className="faq-answer">Yes, cancel anytime—no questions asked, no penalties. You'll keep access until the end of your billing period. Need to pause for a month? No problem. Want to downgrade? Easy. We're flexible because your business needs change.</div>
          </div>

          <div className="faq-item animate-on-scroll">
            <div className="faq-question">Is my data and content private and secure?</div>
            <div className="faq-answer">Your data is encrypted and never shared with third parties. We don't train our models on your private content. You can delete your data anytime. We're SOC 2 compliant and take security seriously—your creations and business information stay confidential.</div>
          </div>

          <div className="faq-item animate-on-scroll">
            <div className="faq-question">What makes Lumora different from other AI tools?</div>
            <div className="faq-answer">Most AI tools do one thing. Lumora is an integrated system built specifically for solo creators—video, copy, design, automation, and music in one place. No switching apps, no exporting and importing, no compatibility issues. One login, one workflow, everything connected.</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to bring your ideas to life?</h2>
          <p>Join thousands of creators already using Lumora to push the boundaries of creative expression</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start Creating Free</button>
            <button className="btn btn-secondary">Schedule Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Lumora AI. All rights reserved.</p>
          <div className="footer-social">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
