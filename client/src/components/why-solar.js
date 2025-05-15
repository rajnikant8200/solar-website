import React from 'react';
import './why-solar.css';

const WhySolar = () => {
    return (
        <div className="why-solar-container">
            <section className="why-solar-header">
                <h2>Why Solar?</h2>
                <p>
                    Your partner in sustainable energy solutions. We harness the power of the sun to create a cleaner, 
                    brighter future for all. Join us in transforming the world with innovative solar technology.
                </p>
            </section>
            <section className="benefits">
                <h3>Benefits Of Solar Rooftop System</h3>
                <p>Solar energy offers numerous benefits to both, individuals and the environment.</p>
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <div className="icon">🌞</div>
                        <h4>Easy Installation</h4>
                        <p>We ensure a safe, secure and hassle-free installation in minimal time.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="icon">🌱</div>
                        <h4>Eco Friendly</h4>
                        <p>Reduce your carbon footprint with Solar Smart and promote green living.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="icon">🔧</div>
                        <h4>Low Maintenance</h4>
                        <p>Opt for low conservation solutions that prioritize resource efficiency.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="icon">💡</div>
                        <h4>Energy Savings</h4>
                        <p>Maximize energy and money savings with our innovative solutions.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhySolar;
