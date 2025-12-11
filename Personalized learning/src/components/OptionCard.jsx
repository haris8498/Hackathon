import React from 'react';
import './OptionCard.css';

const OptionCard = ({ icon, text, isSelected, onClick }) => {
    return (
        <div
            className={`option-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {isSelected && (
                <div className="checkmark">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#10B981" />
                        <path
                            d="M8 12.5L10.5 15L16 9.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
            <div className="option-icon">{icon}</div>
            <p className="option-text">{text}</p>
        </div>
    );
};

export default OptionCard;
