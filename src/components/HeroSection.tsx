import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <ParticleBackground />
      <div className="hero-content">
        <h1 style={{ color: '#fff', background: 'none', WebkitTextFillColor: 'unset', WebkitBackgroundClip: 'unset' }}>
          Your AI Shield for Sui Smart Contracts
        </h1>
        <h3>AI-Powered Security for Smart Contracts – Detect, Fix, and Protect in Minutes</h3>
        <button
          className="cta-button"
          onClick={() => navigate('/product')}
        >
          Start Free Audit <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 