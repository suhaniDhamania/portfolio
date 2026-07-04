import React, { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { text: 'Suhani OS [Version 1.0.0]', type: 'system' },
    { text: "Copyright (c) 2026 Suhani Dhamania. Type 'help' for a list of commands.", type: 'system' },
    { text: '', type: 'spacer' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const commands = {
    help: 'List all available terminal commands.',
    about: 'Learn about Suhani Dhamania.',
    skills: 'Display technical skill sets.',
    projects: 'View major software development projects.',
    contact: 'Get contact info & links.',
    clear: 'Clear the terminal output screen.'
  };

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { text: `visitor@suhani-portfolio:~$ ${cmdStr}`, type: 'input' }];

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case 'help':
        newHistory.push({ text: 'Available commands:', type: 'header' });
        Object.entries(commands).forEach(([cmd, desc]) => {
          newHistory.push({ text: `  ${cmd.padEnd(10)} - ${desc}`, type: 'info' });
        });
        break;

      case 'about':
        newHistory.push({
          text: 'Suhani Dhamania is a results-driven MERN Stack Developer with hands-on experience building responsive, scalable full-stack web applications and robust database architectures.',
          type: 'text'
        });
        newHistory.push({ text: 'Degree: Bachelor of Computer Applications (BCA) [2023 - 2026]', type: 'text' });
        break;

      case 'skills':
        newHistory.push({ text: '--- FRONTEND ---', type: 'header' });
        newHistory.push({ text: 'React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive Web Design', type: 'text' });
        newHistory.push({ text: '--- BACKEND & DB ---', type: 'header' });
        newHistory.push({ text: 'Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, SQL, Mongoose, JWT Auth', type: 'text' });
        newHistory.push({ text: '--- SPECIALIZED & CONCEPTS ---', type: 'header' });
        newHistory.push({ text: 'Healthcare Tech (DICOM, Orthanc PACS, AI-Assisted Reports), RBAC, APIs, State Management', type: 'text' });
        break;

      case 'projects':
        newHistory.push({ text: '1. PACS Medical Imaging Platform', type: 'header' });
        newHistory.push({ text: '   Integrated Orthanc PACS with Stone/Osmosis Viewers for secure DICOM study access. Scalable RBAC.', type: 'text' });
        newHistory.push({ text: '2. Radiology Healthcare System', type: 'header' });
        newHistory.push({ text: '   React/Node workflows with PostgreSQL and AI-powered report generation from medical images.', type: 'text' });
        newHistory.push({ text: '3. Blood Donation & Inventory Platform', type: 'header' });
        newHistory.push({ text: '   Full-stack blood portal, donation screening, real-time inventory alerts, JWT auth & Nodemailer OTP.', type: 'text' });
        break;

      case 'contact':
        newHistory.push({ text: `Email:     ${import.meta.env.VITE_CONTACT_EMAIL || 'suhanidhamania157@gmail.com'}`, type: 'text' });
        newHistory.push({ text: `Phone:     ${import.meta.env.VITE_CONTACT_PHONE || '+91 8851648618'}`, type: 'text' });
        newHistory.push({ text: `LinkedIn:  ${import.meta.env.VITE_CONTACT_LINKEDIN || 'https://linkedin.com/in/suhanidhamania'}`, type: 'link' });
        newHistory.push({ text: `Portfolio: ${import.meta.env.VITE_CONTACT_PORTFOLIO || 'https://suhaniportfolio.onrender.com/'}`, type: 'link' });
        break;

      default:
        newHistory.push({
          text: `Command not found: "${trimmed}". Type "help" to see available commands.`,
          type: 'error'
        });
        break;
    }

    newHistory.push({ text: '', type: 'spacer' });
    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div
      className="neon-border"
      style={{
        background: '#0c0d12',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
        minHeight: '300px',
        maxHeight: '450px',
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: '#39ff14', // Matrix green text color
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'text'
      }}
      onClick={() => document.getElementById('terminal-input')?.focus()}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(57, 255, 20, 0.15)', paddingBottom: '8px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <span style={{ fontSize: '0.75rem', color: 'rgba(57, 255, 20, 0.5)' }}>guest@suhani-shell</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {history.map((line, idx) => {
          let style = { color: '#39ff14' };
          if (line.type === 'error') style = { color: '#ff3b30' };
          if (line.type === 'header') style = { color: 'var(--accent-primary)', fontWeight: 'bold' };
          if (line.type === 'system') style = { color: '#8e8e93' };
          if (line.type === 'input') style = { color: '#ffffff' };
          if (line.type === 'link') style = { color: '#00e5ff', textDecoration: 'underline' };

          if (line.type === 'spacer') {
            return <div key={idx} style={{ height: '8px' }} />;
          }

          return (
            <div key={idx} style={{ ...style, whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <span style={{ color: '#ffffff', marginRight: '8px' }}>visitor@suhani-portfolio:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            flex: 1
          }}
        />
      </div>
    </div>
  );
}
