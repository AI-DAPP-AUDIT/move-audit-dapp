import React from 'react';
import './FeaturesSection.css';

const features = [
  {
    icon: '⚡',
    title: 'Instant AI Audits',
    description: 'Get comprehensive security analysis in minutes with our advanced AI engine, trained on thousands of audited contracts for unmatched accuracy.'
  },
  {
    icon: '🌐',
    title: 'Multi-Agent System',
    description: 'Our AI multi-agent system breaks down audits into specialized tasks, with each agent focused on specific functions to enhance precision and efficiency.'
  },
  {
    icon: '🔍',
    title: 'RAG-Powered Precision',
    description: 'Leveraging Retrieval-Augmented Generation (RAG), our audits tap into a professional vulnerability pattern knowledge base for highly accurate results.'
  },
  {
    icon: '📄',
    title: 'Shareable Audit Reports',
    description: 'Generate detailed, professional audit reports with actionable findings and recommendations, securely stored on Walrus for easy sharing.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2>AI Audits – Simple, Fast, and Powerful</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection; 