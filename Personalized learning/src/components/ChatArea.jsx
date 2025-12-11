import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../services/aiService';
import './ChatArea.css';

const ChatArea = ({ userAnswers, currentUser, onLogout }) => {
    // Load theme from localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('learnspace-theme');
        return savedTheme === 'dark';
    });

    // Load user-specific chats from localStorage
    const [chats, setChats] = useState(() => {
        if (!currentUser) return [];
        const users = JSON.parse(localStorage.getItem('learnspace-users') || '{}');
        return users[currentUser.username]?.chats || [];
    });
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeMode, setActiveMode] = useState('AI Tutor');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Save theme preference
    useEffect(() => {
        localStorage.setItem('learnspace-theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    // Save chats to user-specific storage whenever they change
    useEffect(() => {
        if (!currentUser) return;
        const users = JSON.parse(localStorage.getItem('learnspace-users') || '{}');
        if (users[currentUser.username]) {
            users[currentUser.username].chats = chats;
            localStorage.setItem('learnspace-users', JSON.stringify(users));
        }
    }, [chats, currentUser]);

    // Load current chat messages
    useEffect(() => {
        if (currentChatId) {
            const currentChat = chats.find(chat => chat.id === currentChatId);
            if (currentChat) {
                setMessages(currentChat.messages);
            }
        } else {
            setMessages([]);
        }
    }, [currentChatId, chats]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            isUser: true,
            timestamp: new Date()
        };

        let chatId = currentChatId;
        let initialMessagesForNewChat = [];

        // Create new chat if none exists
        if (!chatId) {
            chatId = Date.now();
            const chatTitle = inputValue.substring(0, 30) + (inputValue.length > 30 ? '...' : '');
            initialMessagesForNewChat = [userMessage]; // Include the first message
            const newChat = {
                id: chatId,
                title: chatTitle,
                messages: initialMessagesForNewChat,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setChats(prev => [newChat, ...prev]);
            setCurrentChatId(chatId);
        }

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsTyping(true);

        // Update chat in chats array if chat already existed
        if (currentChatId) { // Only update if it was an existing chat, new chat was already created with the message
            setChats(prev => prev.map(chat =>
                chat.id === chatId
                    ? { ...chat, messages: updatedMessages, updatedAt: new Date().toISOString() }
                    : chat
            ));
        }

        // Generate AI response
        const response = await generateAIResponse(inputValue, userAnswers, messages);

        const aiMessage = {
            id: Date.now() + 1,
            text: response.message,
            isUser: false,
            timestamp: new Date(),
            error: !response.success
        };

        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages);

        // Update chat with AI response
        setChats(prev => prev.map(chat =>
            chat.id === chatId
                ? { ...chat, messages: finalMessages, updatedAt: new Date().toISOString() }
                : chat
        ));

        setIsTyping(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        setCurrentChatId(null);
        setMessages([]);
    };

    const handleSelectChat = (chatId) => {
        setCurrentChatId(chatId);
    };

    const handleDeleteChat = (chatId, e) => {
        e.stopPropagation();
        setChats(prev => prev.filter(chat => chat.id !== chatId));
        if (currentChatId === chatId) {
            setCurrentChatId(null);
            setMessages([]);
        }
    };

    // Group chats by date
    const groupChatsByDate = () => {
        const groups = {
            'Today': [],
            'Yesterday': [],
            'Last 7 Days': [],
            'Older': []
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        chats.forEach(chat => {
            const chatDate = new Date(chat.updatedAt);
            const chatDay = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

            if (chatDay.getTime() === today.getTime()) {
                groups['Today'].push(chat);
            } else if (chatDay.getTime() === yesterday.getTime()) {
                groups['Yesterday'].push(chat);
            } else if (chatDate >= lastWeek) {
                groups['Last 7 Days'].push(chat);
            } else {
                groups['Older'].push(chat);
            }
        });

        // Remove empty groups
        return Object.entries(groups).filter(([_, chats]) => chats.length > 0);
    };

    const groupedChats = groupChatsByDate();

    return (
        <div className="chat-area">
            {/* Sidebar */}
            <div className={`chat-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4A90E2" />
                            <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" />
                            <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" />
                        </svg>
                        {!sidebarCollapsed && <span className="logo-text">LearnSpace</span>}
                    </div>
                    <div className="header-actions">
                        <button
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDarkMode ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="sun-icon">
                                    <circle cx="10" cy="10" r="3" fill="currentColor" />
                                    <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="moon-icon">
                                    <path d="M17 10.5C16.5 14.5 13 17 9 17C5 17 2 14 2 10C2 6 5 3 9 3C9.5 3 10 3.1 10.5 3.2C9.5 4.5 9 6.2 9 8C9 11.3 11.7 14 15 14C15.8 14 16.5 13.8 17 13.5C17 13.8 17 14.2 17 14.5C17 14.8 17 14.9 17 15.2"
                                        fill="currentColor" />
                                </svg>
                            )}
                        </button>
                        <button
                            className="toggle-sidebar-btn"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                <line x1="9" y1="3" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {!sidebarCollapsed && (
                    <>
                        <button className="new-chat-btn" onClick={handleNewChat}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 5V11M5 8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            New chat
                        </button>

                        <div className="chat-history">
                            {groupedChats.length === 0 ? (
                                <div className="no-history">
                                    <p>No chat history yet</p>
                                    <p className="no-history-hint">Start a conversation to begin!</p>
                                </div>
                            ) : (
                                groupedChats.map(([date, dateChats]) => (
                                    <div key={date} className="history-group">
                                        <div className="history-date">{date}</div>
                                        {dateChats.map(chat => (
                                            <div
                                                key={chat.id}
                                                className={`history-item ${currentChatId === chat.id ? 'active' : ''}`}
                                                onClick={() => handleSelectChat(chat.id)}
                                            >
                                                <span className="history-item-title">{chat.title}</span>
                                                <button
                                                    className="delete-chat-btn"
                                                    onClick={(e) => handleDeleteChat(chat.id, e)}
                                                    title="Delete chat"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                        <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="sidebar-footer">
                            <div className="user-profile">
                                <div className="user-avatar">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'User'}`} alt="User" />
                                </div>
                                <span className="user-name">{currentUser?.name || 'User'}</span>
                                <button
                                    className="logout-btn"
                                    onClick={onLogout}
                                    title="Logout"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M10 11L14 7.5L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 7.5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                <div className="chat-messages-container">
                    {messages.length === 0 ? (
                        <div className="chat-welcome">
                            <div className="welcome-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4A90E2" />
                                    <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" />
                                    <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" />
                                </svg>
                            </div>
                            <h2 className="welcome-title">How can I help you learn today?</h2>
                            <p className="welcome-subtitle">Ask me anything about your learning journey</p>
                        </div>
                    ) : (
                        <div className="chat-messages">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chat-message ${message.isUser ? 'user-message' : 'ai-message'}`}
                                >
                                    {!message.isUser && (
                                        <div className="message-avatar">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4A90E2" />
                                                <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" />
                                                <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="message-content">
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-message ai-message">
                                    <div className="message-avatar">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4A90E2" />
                                            <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="2" />
                                            <path d="M2 12L12 17L22 12" stroke="#4A90E2" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <div className="message-content">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="chat-input-area">
                    <div className="input-wrapper">
                        <div className="input-container">
                            <div className="input-modes">
                                <button
                                    className={`mode-btn ${activeMode === 'AI Tutor' ? 'active' : ''}`}
                                    onClick={() => setActiveMode('AI Tutor')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 2L2 5L8 8L14 5L8 2Z" fill="currentColor" />
                                        <path d="M2 11L8 14L14 11" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M2 8L8 11L14 8" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                    AI Tutor
                                </button>
                                <button
                                    className={`mode-btn ${activeMode === 'Search' ? 'active' : ''}`}
                                    onClick={() => setActiveMode('Search')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Search
                                </button>
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                className="chat-input"
                                placeholder="Message LearnSpace"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isTyping}
                            />
                            <div className="input-actions">
                                <button className="voice-btn" title="Voice input">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 2C8.89543 2 8 2.89543 8 4V10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10V4C12 2.89543 11.1046 2 10 2Z" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M5 9V10C5 12.7614 7.23858 15 10 15C12.7614 15 15 12.7614 15 10V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M10 15V18M7 18H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <button
                                    className="send-btn"
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 16L10 4M10 4L6 8M10 4L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
