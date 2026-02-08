import { useEffect, useState, useRef } from 'react';

/**
 * Lumora Runway - Clean, Minimal Landing Page
 *
 * EXACT replica of the provided HTML design with:
 * - SF Pro Display / system-ui font
 * - Pure black/white color scheme
 * - Rounded hero with image background
 * - Transparent nav with blur on scroll
 * - 3D tilt effect on cards
 * - FAB scroll-to-top button
 * - Theme toggle with sun/moon
 *
 * Premium high-tech minimal aesthetic inspired by Runway
 */

export default function LumoraRunway() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      setIsScrolled(window.scrollY > 50);
      setShowFab(winScroll > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved theme
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(c => c.trim().startsWith('theme='));
    if (themeCookie && themeCookie.split('=')[1] === 'light') {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    document.cookie = `theme=${newMode ? 'light' : 'dark'}; path=/; max-age=31536000`;
    showToast(newMode ? 'Light mode activated' : 'Dark mode activated');
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .lumora-runway {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        .lumora-runway.light-mode {
          background: #fff;
          color: #000;
        }

        /* Navigation */
        .runway-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          transition: background 0.3s ease, backdrop-filter 0.3s ease;
        }

        .runway-nav.scrolled {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
        }

        .light-mode .runway-nav.scrolled {
          background: rgba(255, 255, 255, 0.9);
        }

        .runway-nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .runway-nav-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          transition: color 0.2s ease;
        }

        .runway-nav-links a:hover {
          color: #fff;
        }

        .light-mode .runway-nav-links a {
          color: rgba(0, 0, 0, 0.6);
        }

        .light-mode .runway-nav-links a:hover {
          color: #000;
        }

        /* Buttons */
        .runway-btn {
          padding: 0.625rem 1.25rem;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          text-decoration: none;
          display: inline-block;
        }

        .runway-btn-primary {
          background: #fff;
          color: #000;
          position: relative;
          overflow: hidden;
        }

        .runway-btn-primary:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
        }

        .light-mode .runway-btn-primary {
          background: #000;
          color: #fff;
        }

        .light-mode .runway-btn-primary:hover {
          background: rgba(0, 0, 0, 0.9);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .runway-btn-secondary {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .runway-btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .light-mode .runway-btn-secondary {
          color: #000;
          border-color: rgba(0, 0, 0, 0.2);
        }

        .light-mode .runway-btn-secondary:hover {
          border-color: rgba(0, 0, 0, 0.4);
        }

        /* Theme Toggle */
        .runway-theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .runway-theme-toggle:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .light-mode .runway-theme-toggle {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
        }

        .light-mode .runway-theme-toggle:hover {
          background: rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 0, 0, 0.2);
        }

        .runway-theme-toggle svg {
          position: absolute;
          transition: all 0.3s ease;
          stroke: #fff;
        }

        .light-mode .runway-theme-toggle svg {
          stroke: #000;
        }

        .runway-theme-toggle .sun-icon {
          opacity: 0;
          transform: rotate(-90deg) scale(0.5);
        }

        .runway-theme-toggle .moon-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .light-mode .runway-theme-toggle .sun-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .light-mode .runway-theme-toggle .moon-icon {
          opacity: 0;
          transform: rotate(90deg) scale(0.5);
        }

        /* Hero Section */
        .runway-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: 0 3rem;
          border-radius: 16px;
          margin-top: 100px;
          background: #000;
        }

        .light-mode .runway-hero {
          background: #f5f5f5;
        }

        .runway-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          object-position: center;
        }

        .runway-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
          z-index: 1;
        }

        .runway-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
          padding: 0 2rem;
        }

        .runway-category-label {
          display: inline-block;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .light-mode .runway-category-label {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
          color: rgba(0, 0, 0, 0.7);
        }

        .runway-hero h1 {
          font-size: 5rem;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          color: #fff;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .runway-hero p {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.5rem;
          line-height: 1.5;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        .runway-hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Content Section */
        .runway-content-section {
          position: relative;
          padding: 8rem 3rem;
          background: #000;
        }

        .light-mode .runway-content-section {
          background: #fff;
        }

        .runway-section-title {
          font-size: 3rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          text-align: center;
        }

        .runway-section-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .light-mode .runway-section-subtitle {
          color: rgba(0, 0, 0, 0.6);
        }

        /* Features Grid */
        .runway-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .runway-feature-card {
          position: relative;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .runway-feature-card:hover {
          transform: translateY(-8px);
        }

        .runway-feature-card:hover .runway-feature-image::after {
          opacity: 1;
        }

        .runway-feature-card:hover .runway-feature-image img {
          filter: blur(4px);
          transform: scale(1.05);
        }

        .runway-feature-card:hover .runway-feature-learn-more {
          opacity: 1;
        }

        .runway-feature-image {
          position: relative;
          aspect-ratio: 16/11;
          border-radius: 12px;
          overflow: hidden;
        }

        .runway-feature-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .runway-feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .runway-feature-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 40%, transparent 100%);
          min-height: 35%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          pointer-events: none;
        }

        .runway-feature-overlay h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0;
          line-height: 1.2;
          color: #fff;
        }

        .runway-feature-learn-more {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 10;
          text-align: center;
          white-space: nowrap;
        }

        .runway-feature-info {
          margin-top: 1rem;
        }

        .runway-feature-info p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .light-mode .runway-feature-info p {
          color: rgba(0, 0, 0, 0.65);
        }

        /* Products Section */
        .runway-products-section {
          padding: 8rem 3rem;
          background: #0a0a0a;
        }

        .light-mode .runway-products-section {
          background: #f9f9f9;
        }

        .runway-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .runway-product-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-product-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .runway-product-card:hover .runway-product-image {
          transform: scale(1.05);
        }

        .light-mode .runway-product-card {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .light-mode .runway-product-card:hover {
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .runway-product-image-container {
          overflow: hidden;
        }

        .runway-product-image {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-product-content {
          padding: 2rem;
        }

        .runway-product-tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .light-mode .runway-product-tag {
          background: rgba(0, 0, 0, 0.08);
          color: rgba(0, 0, 0, 0.7);
        }

        .runway-product-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .runway-product-content p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .light-mode .runway-product-content p {
          color: rgba(0, 0, 0, 0.6);
        }

        .runway-product-link {
          color: #fff;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.2s ease;
        }

        .runway-product-link:hover {
          gap: 0.75rem;
        }

        .light-mode .runway-product-link {
          color: #000;
        }

        /* CTA Section */
        .runway-cta-section {
          padding: 10rem 3rem;
          background: #000;
          text-align: center;
        }

        .light-mode .runway-cta-section {
          background: #fff;
        }

        .runway-cta-section h2 {
          font-size: 4rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }

        .runway-cta-section p {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .light-mode .runway-cta-section p {
          color: rgba(0, 0, 0, 0.6);
        }

        /* FAB */
        .runway-fab-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .runway-fab-container.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .runway-fab-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fff;
          color: #000;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .runway-fab-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .light-mode .runway-fab-button {
          background: #000;
          color: #fff;
        }

        /* Toast */
        .runway-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(255, 255, 255, 0.95);
          color: #000;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
        }

        .runway-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .light-mode .runway-toast {
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
        }

        /* Footer */
        .runway-footer {
          padding: 4rem 3rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: #000;
        }

        .light-mode .runway-footer {
          background: #fff;
          border-top-color: rgba(0, 0, 0, 0.08);
        }

        .runway-footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .runway-footer-section h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .light-mode .runway-footer-section h4 {
          color: rgba(0, 0, 0, 0.9);
        }

        .runway-footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .runway-footer-section li {
          margin-bottom: 0.75rem;
        }

        .runway-footer-section a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .runway-footer-section a:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .light-mode .runway-footer-section a {
          color: rgba(0, 0, 0, 0.5);
        }

        .light-mode .runway-footer-section a:hover {
          color: rgba(0, 0, 0, 0.8);
        }

        .runway-footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
        }

        .light-mode .runway-footer-bottom {
          border-top-color: rgba(0, 0, 0, 0.08);
          color: rgba(0, 0, 0, 0.4);
        }

        .runway-footer-bottom a {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .runway-footer-bottom a:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        .light-mode .runway-footer-bottom a {
          color: rgba(0, 0, 0, 0.4);
        }

        .light-mode .runway-footer-bottom a:hover {
          color: rgba(0, 0, 0, 0.6);
        }

        /* Scroll Progress */
        .runway-scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.6));
          z-index: 9999;
          transition: width 0.1s ease;
        }

        .light-mode .runway-scroll-progress {
          background: linear-gradient(90deg, #000, rgba(0, 0, 0, 0.6));
        }

        /* Responsive */
        @media (max-width: 768px) {
          .runway-hero {
            margin: 0;
            margin-top: 80px;
            min-height: 100vh;
            border-radius: 0;
          }

          .runway-hero h1 {
            font-size: 2.5rem;
          }

          .runway-hero p {
            font-size: 1.1rem;
          }

          .runway-nav {
            padding: 1rem 1.5rem;
          }

          .runway-nav-links a {
            display: none;
          }

          .runway-features-grid,
          .runway-products-grid {
            grid-template-columns: 1fr;
          }

          .runway-section-title {
            font-size: 2rem;
          }

          .runway-cta-section h2 {
            font-size: 2rem;
          }

          .runway-cta-section p {
            font-size: 1rem;
          }

          .runway-content-section,
          .runway-products-section {
            padding: 5rem 1.5rem;
          }

          .runway-cta-section {
            padding: 6rem 2rem;
          }

          .runway-fab-container {
            bottom: 1rem;
            right: 1rem;
          }

          .runway-fab-button {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <div className={`lumora-runway ${isLightMode ? 'light-mode' : ''}`}>
        {/* Scroll Progress */}
        <div className="runway-scroll-progress" style={{ width: `${scrollProgress}%` }} />

        {/* Navigation */}
        <nav className={`runway-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="logo">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
              <rect x="2" y="4" width="3" height="24" rx="1.5" fill="#2DD4BF"/>
              <rect x="7" y="10" width="3" height="18" rx="1.5" fill="#2DD4BF" opacity="0.8"/>
              <rect x="12" y="14" width="3" height="14" rx="1.5" fill="#2DD4BF" opacity="0.6"/>
              <rect x="17" y="18" width="3" height="10" rx="1.5" fill="#2DD4BF" opacity="0.4"/>
              <text x="36" y="21" fontFamily="'SF Pro Display', system-ui, sans-serif" fontSize="18" fontWeight="600" fill={isLightMode ? 'rgba(0,0,0,0.92)' : 'rgba(255,255,255,0.92)'} letterSpacing="-0.02em">Lumora</text>
            </svg>
          </div>
          <div className="runway-nav-links">
            <a href="#features">Product</a>
            <a href="#research">Research</a>
            <a href="#company">Company</a>
            <button className="runway-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <button className="runway-btn runway-btn-primary">Try Lumora</button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="runway-hero">
          <img
            className="runway-hero-bg"
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop&auto=format"
            alt="Creative Technology"
            loading="eager"
          />
          <div className="runway-hero-overlay" />
          <div className="runway-hero-content">
            <div className="runway-category-label">AI Creative Tools</div>
            <h1>Building AI to<br/>Create the World</h1>
            <p>The all-in-one platform for creators to master AI video, design, writing, and marketing—no technical experience needed.</p>
            <div className="runway-hero-buttons">
              <button className="runway-btn runway-btn-primary">Get Started</button>
              <button className="runway-btn runway-btn-secondary">Learn More →</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="runway-content-section" id="features">
          <h2 className="runway-section-title">Our latest Research<br/>and Products</h2>
          <p className="runway-section-subtitle">AI is changing how stories are told, how creative work is made and how the next frontiers of content are reached.</p>

          <div className="runway-features-grid">
            <FeatureCard
              image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&auto=format"
              title="AI Video in Minutes"
              description="Turn product ideas into scroll-stopping social videos. No filming, no editing software required."
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&auto=format"
              title="Brand Visuals On-Demand"
              description="Generate product mockups, social graphics, and marketing assets instantly with AI."
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&auto=format"
              title="AI Writing Assistant"
              description="Write sales pages, email sequences, and social captions that convert in your authentic voice."
            />
            <FeatureCard
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format"
              title="Marketing Automation"
              description="Build workflows that run your marketing on autopilot from lead capture to nurture."
            />
          </div>
        </section>

        {/* Products Section */}
        <section className="runway-products-section" id="research">
          <h2 className="runway-section-title">Explore Our AI Tools</h2>
          <p className="runway-section-subtitle">Professional-grade AI tools designed for creators, marketers, and visionaries.</p>

          <div className="runway-products-grid">
            <ProductCard
              image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop&auto=format"
              tag="Video"
              title="Lumora Gen-3"
              description="State-of-the-art AI video generation model built to create engaging content in real time. Interactive, controllable and general-purpose."
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&auto=format"
              tag="Design"
              title="Design Studio"
              description="Generate professional product mockups, social graphics, and marketing materials with AI-powered design tools."
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop&auto=format"
              tag="Writing"
              title="Content Creator"
              description="AI writing assistant that learns your voice and creates authentic content for sales pages, emails, and social media."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="runway-cta-section">
          <h2>Ready to bring your<br/>ideas to life?</h2>
          <p>Join thousands of creators already using Lumora to push the boundaries of creative expression.</p>
          <div className="runway-hero-buttons">
            <button className="runway-btn runway-btn-primary">Start Creating Free</button>
            <button className="runway-btn runway-btn-secondary">Watch Demo →</button>
          </div>
        </section>

        {/* FAB */}
        <div className={`runway-fab-container ${showFab ? 'visible' : ''}`}>
          <button className="runway-fab-button" onClick={scrollToTop} aria-label="Scroll to top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Toast */}
        <div className={`runway-toast ${toast ? 'show' : ''}`}>
          {toast}
        </div>

        {/* Footer */}
        <footer className="runway-footer" id="company">
          <div className="runway-footer-content">
            <div className="runway-footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Lumora Gen-3</a></li>
                <li><a href="#">Design Studio</a></li>
                <li><a href="#">Content Creator</a></li>
                <li><a href="#">API Access</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div className="runway-footer-section">
              <h4>Research</h4>
              <ul>
                <li><a href="#">AI Video Models</a></li>
                <li><a href="#">Publications</a></li>
                <li><a href="#">AI Safety</a></li>
                <li><a href="#">Technical Blog</a></li>
              </ul>
            </div>
            <div className="runway-footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Kit</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="runway-footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="runway-footer-bottom">
            <p>© 2026 Lumora AI. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
              <a href="#">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Feature Card Component
function FeatureCard({ image, title, description }: { image: string; title: string; description: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.15s ease-out';
  };

  return (
    <div
      ref={cardRef}
      className="runway-feature-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="runway-feature-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="runway-feature-overlay">
          <h3>{title}</h3>
        </div>
        <div className="runway-feature-learn-more">Learn more →</div>
      </div>
      <div className="runway-feature-info">
        <p>{description}</p>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ image, tag, title, description }: { image: string; tag: string; title: string; description: string }) {
  return (
    <div className="runway-product-card">
      <div className="runway-product-image-container">
        <img className="runway-product-image" src={image} alt={title} loading="lazy" />
      </div>
      <div className="runway-product-content">
        <span className="runway-product-tag">{tag}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#" className="runway-product-link">
          Learn more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
