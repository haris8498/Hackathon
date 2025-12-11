import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: '🤖',
            title: 'AI-Powered Learning',
            description: 'Get personalized guidance from our advanced AI tutor tailored to your learning style'
        },
        {
            icon: '📚',
            title: 'Custom Learning Paths',
            description: 'Answer 5 simple questions and receive a completely customized learning roadmap'
        },
        {
            icon: '💬',
            title: 'Interactive Chat',
            description: 'Ask questions anytime, get instant answers, and track your conversation history'
        },
        {
            icon: '🎯',
            title: 'Goal-Oriented',
            description: 'Whether landing a job or building a project, we help you stay focused on your goals'
        }
    ];

    const developers = [
        {
            name: 'Mahnoor',
            role: 'Full Stack Developer',
            image: '/mahnoor.jpg', // Add image to public folder
            description: 'Passionate about creating intuitive user experiences and AI-powered solutions'
        },
        {
            name: 'Muhammad Haris Khan',
            role: 'Full Stack Developer',
            image: '/haris.jpg', // Add image to public folder
            description: 'Expert in building scalable applications with modern web technologies'
        }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="shape shape-1">△</div>
                    <div className="shape shape-2">○</div>
                    <div className="shape shape-3">□</div>
                    <div className="shape shape-4">◇</div>
                </div>

                <div className="hero-content">
                    <div className="logo-section">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4A90E2" />
                            <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" />
                            <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" />
                        </svg>
                        <h1 className="brand-name">LearnSpace AI</h1>
                    </div>

                    <h2 className="hero-title">
                        Your Personalized Learning Journey<br />
                        <span className="gradient-text">Powered by AI</span>
                    </h2>

                    <p className="hero-description">
                        Answer 5 simple questions and unlock a completely personalized learning experience.
                        Get AI-powered guidance, custom roadmaps, and 24/7 support tailored just for you.
                    </p>

                    <div className="cta-buttons">
                        <button
                            className="primary-cta"
                            onClick={() => navigate('/auth')}
                        >
                            Get Started Free
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="secondary-cta"
                            onClick={() => navigate('/auth')}
                        >
                            Login
                        </button>
                    </div>

                    <div className="trust-badges">
                        <span>✨ No credit card required</span>
                        <span>🔒 100% Free Forever</span>
                        <span>⚡ Instant Setup</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h3 className="section-title">Why Choose LearnSpace?</h3>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Middle CTA */}
                <div className="middle-cta">
                    <button
                        className="primary-cta large"
                        onClick={() => navigate('/auth')}
                    >
                        Get Started for Free
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <h3 className="section-title">Get Started in 3 Easy Steps</h3>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h4>Create Account</h4>
                        <p>Sign up in seconds with just your name and username</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h4>Answer 5 Questions</h4>
                        <p>Tell us about your goals and learning preferences</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h4>Start Learning</h4>
                        <p>Get personalized AI guidance and achieve your goals</p>
                    </div>
                </div>
            </section>

            {/* Developers Section */}
            <section className="developers-section">
                <h3 className="section-title">Meet the Developers</h3>
                <p className="section-subtitle">Built passionate developers</p>
                <div className="developers-grid">
                    {developers.map((dev, index) => (
                        <div key={index} className="developer-card">
                            <div className="developer-avatar">
                                {dev.name.charAt(0)}
                            </div>
                            <h4>{dev.name}</h4>
                            <p className="role">{dev.role}</p>
                            <p className="description">{dev.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
                <h3>Ready to Start Your Learning Journey?</h3>
                <p>Join thousands of learners achieving their goals with personalized AI guidance</p>
                <button
                    className="primary-cta large"
                    onClick={() => navigate('/auth')}
                    
                >
                    Get Started Now - It's Free!
                </button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>© 2024 LearnSpace AI. All rights reserved.</p>
                <p>Made with 💙 by Mahnoor & Muhammad Haris Khan</p>
            </footer>
        </div>
    );
};

export default LandingPage;
