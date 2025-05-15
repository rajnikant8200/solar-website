import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h5>Welcome to Raynex Power Solution Private Limited</h5>
        <h1>Empowering the Renewable</h1>
        <h1> Energy Transition with Visionary Solutions</h1>
        <p>Your partner in sustainable energy solutions. We harness the power of the sun to create a cleaner,</p>
        <p>brighter future for all. Join us in transforming the world with innovative solar technology.</p>
        <div className="hero-buttons">
          <button className="btn-green">Discover More</button>
          <a href="/services">
            <button className="btn-outline">Our Services</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
