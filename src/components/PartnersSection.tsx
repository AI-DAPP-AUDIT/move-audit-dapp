import React from 'react';
import './PartnersSection.css';

const PartnersSection: React.FC = () => {
  return (
    <section className="partners-section">
      <h2>Trusted Partners</h2>
      <div className="partners-grid">
        <div className="partner-logo">
          <img src="/sui-logo.png" alt="Sui" />
          <span>Sui</span>
        </div>
        <a 
          href="https://walrus.network/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="partner-logo"
        >
          <img src="/walrus-logo.png" alt="Walrus" />
          <span>Walrus</span>
        </a>
      </div>
    </section>
  );
};

export default PartnersSection; 