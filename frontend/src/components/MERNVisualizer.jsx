import React, { useState, useEffect } from 'react';

export default function MERNVisualizer() {
  const [packetPos, setPacketPos] = useState(null); // 'react', 'to-express', 'express', 'to-db', 'db', 'from-db', 'express-return', 'to-react', 'complete'
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const startRequest = async () => {
    if (loading) return;
    setLoading(true);
    setApiData(null);

    // Step 1: Client initiate
    setPacketPos('to-express');
    await delay(800);
    
    // Step 2: Express receives
    setPacketPos('express');
    await delay(600);
    
    // Step 3: Express calls Database
    setPacketPos('to-db');
    await delay(800);
    
    // Step 4: DB query
    setPacketPos('db');
    
    // Perform actual API request to backend
    let stats = null;
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/stats`);
      stats = await response.json();
    } catch (e) {
      stats = { status: 'offline', uptime: 'N/A', totalRequests: 'N/A', error: 'Could not connect' };
    }
    
    await delay(800);

    // Step 5: DB returns to Express
    setPacketPos('from-db');
    await delay(800);
    
    // Step 6: Express processes
    setPacketPos('express-return');
    await delay(600);
    
    // Step 7: Express returns to React Client
    setPacketPos('to-react');
    await delay(800);
    
    // Step 8: Complete
    setPacketPos('complete');
    setApiData(stats);
    setLoading(false);
  };

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  return (
    <div className="glass-card" style={{ padding: '30px', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></span>
        Live MERN Architecture Visualizer
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
        Click the button below to see a real-time request travel through our MERN stack architecture. It triggers an actual backend API call to fetch live stats!
      </p>

      {/* The Visualizer Flow Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px 0',
        position: 'relative'
      }}>
        {/* React Client Node */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: '1',
          minWidth: '100px',
          zIndex: 2
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '2px solid var(--accent-primary)',
            boxShadow: packetPos === 'to-express' || packetPos === 'to-react' || packetPos === 'complete' ? '0 0 25px var(--accent-primary)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.3s'
          }}>
            {/* React Atom Logo */}
            <svg width="40" height="40" viewBox="-11.5 -10.23174 23 20.46348">
              <circle cx="0" cy="0" r="2.05" fill="var(--accent-primary)"/>
              <g stroke="var(--accent-primary)" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          </div>
          <span style={{ marginTop: '10px', fontWeight: '600', fontSize: '0.9rem' }}>React.js</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Client / Frontend</span>
        </div>

        {/* Link 1: React to Express */}
        <div style={{
          flex: '1.5',
          height: '4px',
          background: 'var(--surface-border)',
          position: 'relative',
          minWidth: '50px',
          borderRadius: '2px'
        }}>
          {packetPos === 'to-express' && (
            <div style={{
              position: 'absolute',
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-primary)',
              top: '-2px',
              animation: 'moveRight 0.8s linear forwards'
            }} />
          )}
          {packetPos === 'to-react' && (
            <div style={{
              position: 'absolute',
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)',
              boxShadow: '0 0 10px var(--accent-secondary)',
              top: '-2px',
              animation: 'moveLeft 0.8s linear forwards'
            }} />
          )}
        </div>

        {/* Express Server Node */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: '1',
          minWidth: '100px',
          zIndex: 2
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(189, 0, 255, 0.1)',
            border: '2px solid var(--accent-secondary)',
            boxShadow: packetPos === 'express' || packetPos === 'to-db' || packetPos === 'from-db' || packetPos === 'express-return' ? '0 0 25px var(--accent-secondary)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.3s'
          }}>
            {/* Express/Node icon */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2">
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
              <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
              <line x1="18" y1="6" x2="12" y2="6" />
              <line x1="18" y1="18" x2="12" y2="18" />
            </svg>
          </div>
          <span style={{ marginTop: '10px', fontWeight: '600', fontSize: '0.9rem' }}>Node & Express</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>REST API / Backend</span>
        </div>

        {/* Link 2: Express to DB */}
        <div style={{
          flex: '1.5',
          height: '4px',
          background: 'var(--surface-border)',
          position: 'relative',
          minWidth: '50px',
          borderRadius: '2px'
        }}>
          {packetPos === 'to-db' && (
            <div style={{
              position: 'absolute',
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-primary)',
              top: '-2px',
              animation: 'moveRight 0.8s linear forwards'
            }} />
          )}
          {packetPos === 'from-db' && (
            <div style={{
              position: 'absolute',
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-secondary)',
              boxShadow: '0 0 10px var(--accent-secondary)',
              top: '-2px',
              animation: 'moveLeft 0.8s linear forwards'
            }} />
          )}
        </div>

        {/* MongoDB Database Node */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: '1',
          minWidth: '100px',
          zIndex: 2
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '2px solid var(--success)',
            boxShadow: packetPos === 'db' ? '0 0 25px var(--success)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.3s'
          }}>
            {/* DB cylinder icon */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
          </div>
          <span style={{ marginTop: '10px', fontWeight: '600', fontSize: '0.9rem' }}>MongoDB / SQLite</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Database Layer</span>
        </div>
      </div>

      {/* Button & Response Info */}
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={startRequest}
          disabled={loading}
          className="interactive-node"
          style={{
            padding: '12px 28px',
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(0, 229, 255, 0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => { if(!loading) e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {loading ? 'Executing Pipeline...' : 'Fire Live API Request'}
        </button>

        {/* Live response window */}
        <div style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '8px',
          border: '1px solid var(--surface-border)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          padding: '15px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
            <span>CONSOLE STATUS</span>
            <span style={{ color: loading ? 'var(--accent-primary)' : apiData ? 'var(--success)' : 'var(--text-muted)' }}>
              {loading ? '● PENDING' : apiData ? '● 200 OK' : '● IDLE'}
            </span>
          </div>
          {loading && (
            <div style={{ color: 'var(--accent-primary)', animation: 'blink 1s infinite' }}>
              &gt; Sending HTTP GET request to `/api/stats`...
            </div>
          )}
          {!loading && !apiData && (
            <div style={{ color: 'var(--text-muted)' }}>
              &gt; Awaiting request initiation...
            </div>
          )}
          {apiData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ color: 'var(--success)' }}>&gt; Response successfully received:</div>
              <div style={{ paddingLeft: '10px', color: 'var(--text-primary)' }}>
                {JSON.stringify(apiData, null, 2)}
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveRight {
          0% { left: 0%; transform: translateX(0); opacity: 1; }
          100% { left: 100%; transform: translateX(-100%); opacity: 1; }
        }
        @keyframes moveLeft {
          0% { left: 100%; transform: translateX(-100%); opacity: 1; }
          100% { left: 0%; transform: translateX(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
