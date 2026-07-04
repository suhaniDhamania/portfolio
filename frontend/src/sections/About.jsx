import React from 'react';

export default function About() {
  const categories = [
    {
      title: "Frontend Stack",
      skills: ["React.js", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS", "Bootstrap", "Responsive Web Design"]
    },
    {
      title: "Backend & Systems",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Middleware Integration", "API Rate Limiting"]
    },
    {
      title: "Database Layer",
      skills: ["MongoDB", "Mongoose ODM", "PostgreSQL", "SQL (Relational DBs)"]
    }
  ];

  return (
    <section id="about" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--accent-primary)' }}>01.</span> Technical Skills & Stack
          </h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', margin: '0 auto' }}></div>
        </div>

        {/* Content Layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          {/* Left: Brief bio, education, certification */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ color: 'var(--accent-primary)', marginBottom: '15px', fontSize: '1.25rem' }}>Professional Summary</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                I am a results-driven MERN Stack Developer specializing in building high-performance web applications. My experience ranges from real-time communication platforms to complex healthcare software architectures.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                I excel at designing robust RESTful APIs, securing applications with advanced authentication models (RBAC, JWT, OTP verification), and optimizing client-server operations.
              </p>
            </div>

            {/* Education */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '15px', fontSize: '1.25rem' }}>Education</h3>
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Bachelor of Computer Applications (BCA)</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
                  <span>PIIT College, Greater Noida</span>
                  <span>2023 – 2026</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '15px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Senior Secondary Education — Science Stream</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
                  <span>Shaiffali Public School, Dadri</span>
                  <span>2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Skills grid */}
          <div style={{ flex: '1.2', minWidth: '320px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {categories.map((cat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '25px', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)',
                  marginBottom: '15px',
                  borderBottom: '1px solid var(--surface-border)',
                  paddingBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: idx % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'
                  }}></span>
                  {cat.title}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="interactive-node"
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = idx % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.boxShadow = `0 0 8px ${idx % 2 === 0 ? 'var(--accent-primary-glow)' : 'var(--accent-secondary-glow)'}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--surface-border)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
