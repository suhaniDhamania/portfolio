import React, { useEffect, useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import MERNVisualizer from './components/MERNVisualizer';
import Terminal from './components/Terminal';

// Section imports
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function App() {
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollWidth(`${scrolled}%`);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="progress-bar" style={{ width: scrollWidth }}></div>

      {/* Interactive Background & Cursor */}
      <ParticleBackground />
      <CustomCursor />
      <ThemeToggle />

      {/* Header/Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        background: 'var(--header-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--surface-border)',
        zIndex: 100,
        transition: 'background-color 0.3s'
      }}>
        <div className="container" style={{
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <a href="#hero" className="interactive-node" style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-primary)'
            }}></span>
            SUHANI DHAMANIA
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#about" className="interactive-node nav-link">Skills</a>
            <a href="#projects" className="interactive-node nav-link">Projects</a>
            <a href="#visualizer" className="interactive-node nav-link">Visualizer</a>
            <a href="#experience" className="interactive-node nav-link">History</a>
            <a href="#terminal" className="interactive-node nav-link">Console</a>
            <a href="#contact" className="interactive-node nav-link" style={{
              padding: '8px 18px',
              border: '1px solid var(--accent-primary)',
              borderRadius: '20px',
              color: 'var(--accent-primary)',
              transition: 'all 0.3s'
            }}>Contact</a>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="interactive-node mobile-menu-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              display: 'none',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="mobile-nav-container" style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            width: '100%',
            background: 'var(--bg-color)',
            borderBottom: '1px solid var(--surface-border)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            boxShadow: 'var(--shadow-card)',
            zIndex: 99
          }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="mobile-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)', animationDelay: '0.05s' }}>Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="mobile-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)', animationDelay: '0.1s' }}>Projects</a>
            <a href="#visualizer" onClick={() => setMobileMenuOpen(false)} className="mobile-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)', animationDelay: '0.15s' }}>Visualizer</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="mobile-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)', animationDelay: '0.2s' }}>History</a>
            <a href="#terminal" onClick={() => setMobileMenuOpen(false)} className="mobile-link" style={{ textDecoration: 'none', color: 'var(--text-secondary)', animationDelay: '0.25s' }}>Console</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mobile-link" style={{
              textDecoration: 'none',
              color: 'var(--accent-primary)',
              textAlign: 'center',
              border: '1.5px solid var(--accent-primary)',
              padding: '8px',
              borderRadius: '20px',
              marginTop: '5px',
              animationDelay: '0.3s'
            }}>Contact</a>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />

        {/* Live Visualizer Section */}
        <section id="visualizer" style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent-primary)' }}>03.</span> Interactive Stack
              </h2>
              <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', margin: '0 auto' }}></div>
            </div>
            <MERNVisualizer />
          </div>
        </section>

        <Experience />

        {/* Interactive Terminal Section */}
        <section id="terminal" style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--accent-primary)' }}>05.</span> Interactive Shell
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Use the retro command line console below to query system profiles.
              </p>
              <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', margin: '15px auto 0 auto' }}></div>
            </div>
            <Terminal />
          </div>
        </section>

        <Contact />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--surface-border)',
        padding: '40px 0',
        background: 'var(--footer-bg)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Suhani Dhamania. Crafted with MERN. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
            <a href="https://linkedin.com/in/suhanidhamania" target="_blank" rel="noreferrer" className="interactive-node social-link">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Extra styles for nav hover effects & mobile responsiveness */}
      <style dangerouslySetInnerHTML={{__html: `
        .nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.25s ease;
        }
        .nav-link:hover {
          color: var(--accent-primary);
          text-shadow: 0 0 8px var(--accent-primary-glow);
        }
        .social-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.25s;
        }
        .social-link:hover {
          color: var(--accent-primary);
        }

        /* Mobile Responsive media query rules */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}} />
    </>
  );
}
