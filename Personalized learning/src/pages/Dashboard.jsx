import React from 'react';
import ChatArea from '../components/ChatArea';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
    // User data comes from App.jsx now
    const userAnswers = user?.answers || {};

    return (
        <div className="dashboard-page">
            <ChatArea userAnswers={userAnswers} currentUser={user} onLogout={onLogout} />
        </div>
    );
};

export default Dashboard;
