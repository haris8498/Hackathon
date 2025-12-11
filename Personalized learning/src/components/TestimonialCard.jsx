import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ name, title, quote, avatar, delay }) => {
    return (
        <div
            className="testimonial-card"
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="testimonial-header">
                <div className="avatar">
                    {avatar ? (
                        <img src={avatar} alt={name} />
                    ) : (
                        <div className="avatar-placeholder">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="user-info">
                    <h4 className="user-name">{name}</h4>
                    <p className="user-title">{title}</p>
                </div>
            </div>
            <p className="testimonial-quote">"{quote}"</p>
        </div>
    );
};

export default TestimonialCard;
