import React, { useState } from 'react';
import './LearningGoals.css';

const LearningGoals = () => {
    const [goals] = useState([
        { id: 1, icon: '📊', title: 'Core Concepts', completed: false },
        { id: 2, icon: '⚙️', title: 'Setting up Environment', completed: false },
        { id: 3, icon: '🎧', title: 'Mediocre', completed: false }
    ]);

    const [completedGoals, setCompletedGoals] = useState([]);

    const toggleGoal = (goalId) => {
        setCompletedGoals(prev =>
            prev.includes(goalId)
                ? prev.filter(id => id !== goalId)
                : [...prev, goalId]
        );
    };

    return (
        <div className="learning-goals">
            <h3 className="goals-title">Learning Goals</h3>
            <div className="goals-list">
                {goals.map((goal, index) => (
                    <div
                        key={goal.id}
                        className={`goal-item ${completedGoals.includes(goal.id) ? 'completed' : ''}`}
                        onClick={() => toggleGoal(goal.id)}
                        style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                        <div className="goal-checkbox">
                            {completedGoals.includes(goal.id) && (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M3 8L6.5 11.5L13 5"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>
                        <span className="goal-icon">{goal.icon}</span>
                        <span className="goal-title">{goal.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearningGoals;
