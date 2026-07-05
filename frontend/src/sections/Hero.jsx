import React, { useState, useEffect } from 'react';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  const titles = ["MERN Stack Developer", "Full Stack Developer", "Freelancer"];
  const [titleIdx, setTitleIdx] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = titles[titleIdx];
    
    if (isDeleting) {
      // Deleting chars
      timer = setTimeout(() => {
        setSubText(currentFullText.substring(0, subText.length - 1));
      }, 50);
    } else {
      // Adding chars
      timer = setTimeout(() => {
        setSubText(currentFullText.substring(0, subText.length + 1));
      }, 100);
    }

    // Check if word typed fully
    if (!isDeleting && subText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait 1.5s before delete
    } else if (isDeleting && subText === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, titleIdx]);

  return (
    <section id="hero" style={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 0 40px 0',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap-reverse',
        gap: '40px',
        width: '100%'
      }}>
        {/* Intro text */}
        <div style={{ flex: '1.2', minWidth: '300px' }}>
          <span style={{
            color: 'var(--accent-primary)',
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            Welcome to my cyberspace
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: '1.1',
            marginBottom: '15px',
            color: 'var(--text-primary)'
          }}>
            Hi, I'm <br />
            <span className="glow-text" style={{
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Suhani Dhamania
            </span>
          </h1>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            I am a&nbsp;
            <span style={{
              color: 'var(--accent-primary)',
              borderRight: '2px solid var(--accent-primary)',
              animation: 'blink 0.75s step-end infinite',
              paddingRight: '4px'
            }}>
              {subText}
            </span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '35px',
            maxWidth: '550px'
          }}>
            Passionate MERN Stack Developer based in India, building responsive, scalable full-stack web applications. Expert in React.js, Node.js, Express.js, and database management systems, focused on delivering clean code and premium user experiences.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              className="interactive-node"
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(0, 229, 255, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              View My Work
            </a>
            <a
              href="/RESUME.pdf"
              download="Suhani_Dhamania_Resume.pdf"
              className="interactive-node"
              style={{
                padding: '12px 28px',
                background: 'transparent',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: '600',
                border: '1.5px solid var(--surface-border)',
                transition: 'border-color 0.2s, background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Profile Image Frame */}
        <div style={{
          flex: '0.8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '280px'
        }}>
          <div className="pulse-glow-element" style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            padding: '8px',
            border: '2px solid var(--surface-border)',
            background: 'var(--bg-color)',
            transition: 'border-color 0.3s'
          }}>
            {/* Outer revolving ring */}
            <div style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              right: '-5px',
              bottom: '-5px',
              borderRadius: '50%',
              border: '2.5px dashed var(--accent-primary)',
              opacity: 0.4,
              animation: 'spin 20s linear infinite',
              pointerEvents: 'none'
            }} />

            {/* Profile image container */}
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={profileImg}
                alt="Suhani Dhamania"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(15%) contrast(105%)',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Spin Keyframe */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}
