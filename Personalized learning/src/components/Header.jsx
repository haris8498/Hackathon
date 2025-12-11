import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        LearnSpace AI
                    </div>
                    <button className="sign-in-btn">
                        Sign In
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
