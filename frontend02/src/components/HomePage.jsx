import React from 'react';
import './HomePage.css';

export default function HomePage({ setActiveTab }) {
  return (
    <>
      {/* ── Hero — exact from index.html ── */}
      <section className="hero">
        <div className="hero-text">
          <h2>Connect Clients &amp; Freelancers Easily</h2>
          <p>
            ClientFlow helps businesses find talented freelancers
            and manage projects in one place.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => setActiveTab('Tasks')}>
              Get Started
            </button>
            <button className="secondary-btn">Explore Projects</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Team Work"
          />
        </div>
      </section>

      {/* ── Features — exact from index.html ── */}
      <section className="features">
        <h2>Why Choose ClientFlow?</h2>
        <div className="feature-container">
          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>Safe transactions between clients and freelancers.</p>
          </div>
          <div className="feature-card">
            <h3>Project Tracking</h3>
            <p>Manage work progress and deadlines easily.</p>
          </div>
          <div className="feature-card">
            <h3>Live Messaging</h3>
            <p>Communicate instantly with built-in chat support.</p>
          </div>
        </div>
      </section>
    </>
  );
}