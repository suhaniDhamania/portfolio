import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Track links / buttons hovering
    const handleLinkHover = () => setLinkHovered(true);
    const handleLinkLeave = () => setLinkHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const updateLinkListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-node');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
    };

    // Run periodically to catch dynamically added items
    updateLinkListeners();
    const interval = setInterval(updateLinkListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, []);

  // Soft trail delay animation
  useEffect(() => {
    let animationFrameId;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15, // Trail speed factor
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (hidden || typeof window === 'undefined') return null;

  return (
    <>
      {/* Glow aura trail */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: linkHovered ? '50px' : '30px',
          height: linkHovered ? '50px' : '30px',
          transform: `translate3d(${trail.x - (linkHovered ? 25 : 15)}px, ${trail.y - (linkHovered ? 25 : 15)}px, 0)`,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: `1.5px solid ${linkHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
          boxShadow: `0 0 15px ${linkHovered ? 'var(--accent-secondary-glow)' : 'var(--accent-primary-glow)'}`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
          opacity: 0.8,
        }}
      />
      {/* High-speed inner pointer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: clicked ? '4px' : '8px',
          height: clicked ? '4px' : '8px',
          transform: `translate3d(${position.x - (clicked ? 2 : 4)}px, ${position.y - (clicked ? 2 : 4)}px, 0)`,
          borderRadius: '50%',
          backgroundColor: linkHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)',
          boxShadow: `0 0 8px ${linkHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'transform 0.1s, width 0.15s, height 0.15s, background-color 0.2s',
        }}
      />
    </>
  );
}
