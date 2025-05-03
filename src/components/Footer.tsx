import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>AI Audit Shield</h3>
          <p>Empowering secure smart contracts with AI innovation</p>
        </div>
        <div className="footer-right">
          <p>Follow Us On</p>
          <a 
            href="https://github.com/aiauditshield" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="/github-icon.png" alt="GitHub" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 AI Audit Shield. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 