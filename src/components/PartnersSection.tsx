import React from 'react';
import './PartnersSection.css';

const PartnersSection: React.FC = () => {
  return (
    <section className="partners-section">
      <h2>Trusted Partners</h2>
      <div className="partners-grid">
        <a 
          href="https://sui.io/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="partner-logo"
        >
          <img src="/sui-logo.svg" alt="Sui" />
          <span>Sui</span>
        </a>
        <a 
          href="https://www.walrus.xyz/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="partner-logo"
        >
          <img src="/walrus_logo.svg" alt="Walrus" />
        </a>
      </div>
    </section>
  );
};

export default PartnersSection; 