import React from 'react';
import './UserBadge.css';

const UserBadge = ({ userAnswers }) => {
    // Determine badge based on experience level (Q2)
    const getBadgeInfo = () => {
        const experienceLevel = userAnswers?.[1];

        switch (experienceLevel) {
            case 0:
                return { level: 'Absolute Beginner', icon: '🌱', color: '#10B981' };
            case 1:
                return { level: 'Curious Learner', icon: '🔍', color: '#3B82F6' };
            case 2:
                return { level: 'Intermediate Developer', icon: '⚡', color: '#8B5CF6' };
            case 3:
                return { level: 'Advanced Developer', icon: '🚀', color: '#F59E0B' };
            default:
                return { level: 'Beginner Developer', icon: '💻', color: '#3B82F6' };
        }
    };

    const badge = getBadgeInfo();

    return (
        <div className="user-badge" style={{ '--badge-color': badge.color }}>
            <div className="badge-icon">{badge.icon}</div>
            <div className="badge-text">
                <span className="badge-level">{badge.level}</span>
            </div>
            <div className="badge-shine"></div>
        </div>
    );
};

export default UserBadge;
