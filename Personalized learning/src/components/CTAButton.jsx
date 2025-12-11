import React from 'react';
import { Link } from 'react-router-dom';
import './CTAButton.css';

const CTAButton = () => {
    return (
        <div className="cta-container">
            <Link to="/questionnaire">
                <button className="cta-button">
                    Get Started For Free
                </button>
            </Link>
        </div>
    );
};

export default CTAButton;
