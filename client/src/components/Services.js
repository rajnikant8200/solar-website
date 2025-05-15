import React from 'react';
import './Services.css';

function Services() {
  return (
    <section className="services">
      <h4>OUR SERVICES</h4>
      <h2>Explore Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <span>🔆</span>
          <h3>Industrial Solar</h3>
          <p>Raynex power solution understands that industrial facilities have unique energy needs.</p>
        </div>
        <div className="service-card">
          <span>⚙️</span>
          <h3>Ground Mount Solar</h3>
          <p>Raynex specializes in large-scale solar parks, allowing SMEs to invest like owning apartments</p>
        </div>
        <div className="service-card">
          <span>📊</span>
          <h3>Wind Park</h3>
          <p>Our Wind Park Solutions provide clean, renewable energy to communities, businesses, and governments.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
