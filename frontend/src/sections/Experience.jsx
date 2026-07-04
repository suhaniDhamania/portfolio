import React from 'react';

export default function Experience() {
  const experiences = [
    {
      role: "Software Developer",
      company: "Subharti University",
      period: "2025 – Present",
      location: "Meerut / Noida, India",
      details: [
        "Architecting full-stack solutions for university medical centers and healthcare departments.",
        "Developing web tools to streamline clinical work and radiology tasks (DICOM/PACS viewer integration).",
        "Configuring security layers (RBAC, JWT, OTP email verification) across student and patient portals."
      ]
    },
    {
      role: "Freelance MERN Developer",
      company: "Self-Employed",
      period: "2023 – Present",
      location: "Remote",
      details: [
        "Built and deployed a full-featured Clinic Appointment Booking System using React, Node.js, Express, and MongoDB."
      ]
    }
  ];

  return (
    <section id="experience" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--accent-primary)' }}>04.</span> Work History
          </h2>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', margin: '0 auto' }}></div>
        </div>

        {/* Timeline representation */}
        <div style={{
          position: 'relative',
          borderLeft: '2px solid var(--surface-border)',
          paddingLeft: '30px',
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {experiences.map((exp, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Glowing timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-41px',
                top: '5px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--bg-color)',
                border: `3px solid ${idx === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'}`,
                boxShadow: `0 0 10px ${idx === 0 ? 'var(--accent-primary-glow)' : 'var(--accent-secondary-glow)'}`,
                zIndex: 1
              }} />

              {/* Card body */}
              <div className="glass-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1rem', color: 'var(--accent-primary)', fontWeight: '600', marginTop: '2px' }}>
                      {exp.company}
                    </h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '4px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '12px',
                      color: 'var(--text-secondary)',
                      display: 'inline-block'
                    }}>{exp.period}</span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{exp.location}</p>
                  </div>
                </div>

                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
