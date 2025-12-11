import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Learn 2x Faster with<br />Personalized AI
                    </h1>
                    <p className="hero-subtitle">
                        Your adaptive learning path for coding, data<br />science, and design.
                    </p>

                    <div className="dashboard-preview">
                        <img
                            src="/dashboard-preview.png"
                            alt="Dashboard Preview"
                            className="dashboard-image"
                        />
                        <button className="play-button">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M12 9L22 16L12 23V9Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
