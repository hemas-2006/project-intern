import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <h1 className="logo">ClientFlow</h1>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['Home', 'Projects', 'Freelancers', 'Contact'].map(link => (
            <li key={link}>
              <a
                href="#"
                className={activeTab === link ? 'active' : ''}
                onClick={e => {
                  e.preventDefault();
                  setActiveTab(link);
                  setMenuOpen(false);
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className={`nav-task-btn ${activeTab === 'Tasks' ? 'active' : ''}`}
            onClick={() => { setActiveTab('Tasks'); setMenuOpen(false); }}
          >
            ✦ Task Manager
          </button>
          <button className="login-btn">Login</button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}