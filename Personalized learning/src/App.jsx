import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './components/Auth';
import Questionnaire from './pages/Questionnaire';
import Dashboard from './pages/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const username = localStorage.getItem('learnspace-current-user');
    if (username) {
      const users = JSON.parse(localStorage.getItem('learnspace-users') || '{}');
      const user = users[username];
      if (user) {
        setCurrentUser(user);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username, hasCompletedQuestionnaire) => {
    const users = JSON.parse(localStorage.getItem('learnspace-users') || '{}');
    const user = users[username];
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('learnspace-current-user');
    setCurrentUser(null);
  };

  const handleQuestionnaireComplete = (answers) => {
    if (!currentUser) return;

    // Update user data with questionnaire answers
    const users = JSON.parse(localStorage.getItem('learnspace-users') || '{}');
    users[currentUser.username] = {
      ...users[currentUser.username],
      hasCompletedQuestionnaire: true,
      answers: answers
    };
    localStorage.setItem('learnspace-users', JSON.stringify(users));
    setCurrentUser(users[currentUser.username]);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <ThemeToggle />
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              currentUser ? (
                currentUser.hasCompletedQuestionnaire ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/questionnaire" replace />
                )
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Auth Route */}
          <Route
            path="/auth"
            element={
              currentUser ? (
                currentUser.hasCompletedQuestionnaire ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/questionnaire" replace />
                )
              ) : (
                <Auth onLogin={handleLogin} />
              )
            }
          />

          {/* Questionnaire Route - Only for new users */}
          <Route
            path="/questionnaire"
            element={
              currentUser && !currentUser.hasCompletedQuestionnaire ? (
                <Questionnaire
                  onComplete={handleQuestionnaireComplete}
                  userName={currentUser.name}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Dashboard Route - Only for authenticated users who completed questionnaire */}
          <Route
            path="/dashboard"
            element={
              currentUser && currentUser.hasCompletedQuestionnaire ? (
                <Dashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
