import React from 'react';

export default function Projects() {
  const projectList = [
    {
      title: "PACS Medical Imaging Platform",
      category: "Healthcare Technology",
      description: "A secure medical imaging platform integrating Orthanc PACS with Stone and Osmosis Viewers for viewing and analyzing DICOM studies directly in the browser.",
      highlights: [
        "Built dynamic reporting module: print, export, and email templates synced with patient records.",
        "Integrated Modality Worklist (MWL) and designed a robust patient/user management console.",
        "Implemented strict Role-Based Access Control (RBAC) to ensure HIPAA compliance for studies."
      ],
      tags: ["React.js", "Node.js", "Express.js", "Orthanc PACS", "DICOM", "Stone Viewer", "RBAC"],
      glowColor: "var(--accent-primary)"
    },
    {
      title: "Radiology Healthcare System",
      category: "Healthcare & AI",
      description: "A workflow automation system for radiologists, enabling smooth study assignment, tracking, and AI-assisted diagnosis reports.",
      highlights: [
        "Integrated AI report generation models processing medical images for fast diagnosis drafts.",
        "Created custom analytics dashboards monitoring TAT (Turnaround Time) metrics and doctor performance.",
        "Designed PostgreSQL tables to manage high-throughput study workflows and reporting queues."
      ],
      tags: ["React.js", "Node.js", "PostgreSQL", "AI Report Gen", "TAT Dashboards", "Sequelize"],
      glowColor: "var(--accent-secondary)"
    },
    {
      title: "Blood Donation & Inventory Platform",
      category: "Web Portal / Logistics",
      description: "A secure, role-based platform bridging donor networks, hospitals, and blood bank administrators with real-time stock notifications.",
      highlights: [
        "Automated hospital request checks matching live stock inventory thresholds and sending quick notifications.",
        "Built donor eligibility verification questionnaires based on medical history, age, and weight parameters.",
        "Integrated JWT session management and OTP verification via Nodemailer for registration security."
      ],
      tags: ["MERN Stack", "JWT Auth", "Nodemailer", "OTP Verification", "Real-time Alerts"],
      glowColor: "var(--success)"
    }
  ];

  return (
    <section id="projects" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--accent-primary)' }}>02.</span> Featured Projects
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A curated showcase of complex applications solving real-world logistics and medical workflow challenges.
          </p>
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', margin: '15px auto 0 auto' }}></div>
        </div>

        {/* Project Layout (Responsive Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
        }}>
          {projectList.map((project, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `4px solid ${project.glowColor}`
              }}
            >
              <div>
                {/* Category & Title */}
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: project.glowColor, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {project.category}
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '8px 0 15px 0' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                  {project.description}
                </p>

                {/* Key Bullet Points */}
                <ul style={{ paddingLeft: '18px', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {project.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '12px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
