import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('learnspace-theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('learnspace-theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <button
            className="floating-theme-toggle"
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <svg className="theme-icon sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                    <path d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ) : (
                <svg className="theme-icon moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79C20.5 16.79 17 19.5 13 19.5C9 19.5 5.5 16 5.5 12C5.5 8 8.5 4.5 12.5 4.5C13 4.5 13.5 4.6 14 4.7C13 6 12.5 7.7 12.5 9.5C12.5 12.8 15.2 15.5 18.5 15.5C19.3 15.5 20 15.3 20.5 15C20.5 15.3 20.5 15.7 20.5 16C20.5 16.3 20.5 16.4 21 12.79Z"
                        fill="currentColor" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
