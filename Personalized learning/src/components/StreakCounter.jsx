import React from 'react';
import './StreakCounter.css';

const StreakCounter = ({ streak = 3 }) => {
    return (
        <div className="streak-counter">
            <h3 className="streak-title">Streak Counter</h3>
            <div className="streak-display">
                <div className="fire-emojis">
                    <span className="fire-emoji">🔥</span>
                    <span className="fire-emoji">🔥</span>
                    <span className="fire-emoji">🔥</span>
                </div>
                <div className="streak-text">
                    <span className="streak-number">{streak}</span>
                    <span className="streak-label">Day Streak</span>
                </div>
            </div>
            <p className="streak-subtitle">Keep it up! You're on fire!</p>
        </div>
    );
};

export default StreakCounter;
