import React from 'react';
import './CallToActionSection.css';
import { useNavigate } from 'react-router-dom';

const CallToActionSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <h2 className="cta-title">Ready to Secure Your Move Smart Contracts?</h2>
      <p className="cta-subtitle">Start your first AI-powered audit today and experience the future of smart contract security.</p>
      <button className="cta-main-btn" onClick={() => navigate('/product')}>
        Start Free Audit
      </button>
    </section>
  );
};

export default CallToActionSection; 