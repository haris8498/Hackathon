import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse, getStarterSuggestions } from '../services/aiService';
import './AIChat.css';

const AIChat = ({ userAnswers }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your personalized learning assistant. I'm here to help you achieve your goals. Ask me anything about your learning journey!",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const suggestions = getStarterSuggestions(userAnswers);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Generate AI response
        const response = await generateAIResponse(inputValue, userAnswers, messages);

        const aiMessage = {
            id: messages.length + 2,
            text: response.message,
            isUser: false,
            timestamp: new Date(),
            error: !response.success
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        inputRef.current?.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="ai-chat">
            <div className="chat-header">
                <div className="header-content">
                    <div className="ai-avatar">🤖</div>
                    <div className="header-text">
                        <h3 className="chat-title">AI Learning Assistant</h3>
                        <p className="chat-status">
                            {isTyping ? 'Typing...' : 'Online'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`message ${message.isUser ? 'user-message' : 'ai-message'} ${message.error ? 'error-message' : ''}`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {!message.isUser && (
                            <div className="message-avatar">🤖</div>
                        )}
                        <div className="message-bubble">
                            <p className="message-text">{message.text}</p>
                        </div>
                        {message.isUser && (
                            <div className="message-avatar user-avatar">👤</div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="message ai-message typing-indicator">
                        <div className="message-avatar">🤖</div>
                        <div className="message-bubble">
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
                <div className="quick-suggestions">
                    <p className="suggestions-label">Quick start questions:</p>
                    <div className="suggestions-grid">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className="suggestion-btn"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="chat-input-container">
                <textarea
                    ref={inputRef}
                    className="chat-input"
                    placeholder="Ask me anything about your learning journey..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows="1"
                    disabled={isTyping}
                />
                <button
                    className="send-button"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M2 10L18 2L10 18L8 11L2 10Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AIChat;
