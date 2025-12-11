import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (isSignup && !formData.name) {
            setError('Please enter your name');
            return;
        }

        // Get all users from localStorage
        const users = JSON.parse(localStorage.getItem('learnspace-users') || '{}');

        if (isSignup) {
            // Check if username already exists
            if (users[formData.username]) {
                setError('Username already exists. Please choose another.');
                return;
            }

            // Create new user
            users[formData.username] = {
                username: formData.username,
                password: formData.password,
                name: formData.name,
                createdAt: new Date().toISOString(),
                hasCompletedQuestionnaire: false,
                answers: {},
                chats: []
            };

            localStorage.setItem('learnspace-users', JSON.stringify(users));
            localStorage.setItem('learnspace-current-user', formData.username);

            // New user needs to answer questions
            onLogin(formData.username, false);

        } else {
            // Login
            const user = users[formData.username];

            if (!user) {
                setError('Username not found');
                return;
            }

            if (user.password !== formData.password) {
                setError('Incorrect password');
                return;
            }

            localStorage.setItem('learnspace-current-user', formData.username);

            // Existing user - check if they've completed questionnaire
            onLogin(formData.username, user.hasCompletedQuestionnaire);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="shape shape-1">△</div>
                <div className="shape shape-2">○</div>
                <div className="shape shape-3">□</div>
                <div className="shape shape-4">◇</div>
            </div>

            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4A90E2" />
                                <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" />
                                <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" />
                            </svg>
                        </div>
                        <h1>LearnSpace AI</h1>
                        <p className="tagline">Your Personalized Learning Journey</p>
                    </div>

                    <div className="auth-tabs">
                        <button
                            className={`tab ${isSignup ? 'active' : ''}`}
                            onClick={() => {
                                setIsSignup(true);
                                setError('');
                            }}
                        >
                            Sign Up
                        </button>
                        <button
                            className={`tab ${!isSignup ? 'active' : ''}`}
                            onClick={() => {
                                setIsSignup(false);
                                setError('');
                            }}
                        >
                            Login
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {isSignup && (
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Choose a unique username"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete={isSignup ? "new-password" : "current-password"}
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="submit-btn">
                            {isSignup ? 'Create Account' : 'Login'}
                        </button>
                    </form>

                    {isSignup && (
                        <p className="auth-note">
                            ✨ New users will complete a quick 5-question personalization quiz
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
