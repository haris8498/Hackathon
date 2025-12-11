import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="progress-container">
            <div className="progress-header">
                <span className="progress-text">Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className="progress-percentage">{Math.round(progress)}% Complete</span>
            </div>
            <div className="progress-bar-wrapper">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                >
                    <div className="rocket-icon">🚀</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
