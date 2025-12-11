import React from 'react';
import './FloatingMessage.css';

const FloatingMessage = ({ message, position = 'left' }) => {
    if (!message) return null;

    return (
        <div className={`floating-message ${position}`}>
            <div className="message-bubble">
                {message}
            </div>
        </div>
    );
};

export default FloatingMessage;
