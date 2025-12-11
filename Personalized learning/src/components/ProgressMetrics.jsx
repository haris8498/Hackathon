import React, { useEffect, useState } from 'react';
import './ProgressMetrics.css';

const ProgressMetrics = ({ progress = 25 }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedProgress(progress);
        }, 300);

        return () => clearTimeout(timer);
    }, [progress]);

    // SVG circle calculations
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animatedProgress / 100) * circumference;

    return (
        <div className="progress-metrics">
            <h3 className="metrics-title">Progress Metrics</h3>
            <div className="circular-progress">
                <svg className="progress-ring" width="180" height="180">
                    {/* Background circle */}
                    <circle
                        className="progress-ring-background"
                        cx="90"
                        cy="90"
                        r={radius}
                        strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                        className="progress-ring-circle"
                        cx="90"
                        cy="90"
                        r={radius}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="progress-text">
                    <span className="progress-number">{animatedProgress}%</span>
                    <span className="progress-label">Complete</span>
                </div>
            </div>
            <p className="metrics-subtitle">You're making great progress!</p>
        </div>
    );
};

export default ProgressMetrics;
