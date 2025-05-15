import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <h4>ABOUT US</h4>
      <h2>Empowering a <span>Sustainable Future</span></h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            A commitment to building a brighter future for all. Empowering a sustainable future is
            embedded in our name, and we strive to live up to our brand promise in everything we do.
          </p>
          <p>
            Guided by our commitment to sustainability and innovation, we create solutions that make
            a lasting, positive impact.
          </p>
          <div className="about-icons">
            <div>
              🌞 <strong>Our Mission:</strong>
              <p>Harness the power of the sun with innovative solar solutions.</p>
            </div>
            <div>
              🌍 <strong>Our Vision:</strong> 
              <p>A greener, cleaner energy future for generations to come.</p> 
            </div>
          </div>
        </div>
        <div className="about-images">
          <img
            src="https://media.istockphoto.com/id/1500851820/photo/happy-young-indian-family-and-technician-standing-near-solar-panels-installation-outdoor.webp?a=1&b=1&s=612x612&w=0&k=20&c=vWc9kc3Vm3dwx3DDoHWF05Fp6t70w9FBx-URu1Uzc_c="
            alt="Engineer installing panel"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
