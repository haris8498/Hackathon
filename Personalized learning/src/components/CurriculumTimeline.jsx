import React, { useState } from 'react';
import './CurriculumTimeline.css';

const CurriculumTimeline = ({ userAnswers }) => {
    const [expandedCourse, setExpandedCourse] = useState(null);

    // Determine curriculum based on user's main mission (Q1)
    const getCurriculum = () => {
        const mission = userAnswers?.[0];

        // Default curriculum
        const courses = [
            {
                id: 1,
                icon: '😊',
                title: 'Web Development Fundamentals',
                progress: 25,
                description: 'Learn HTML, CSS, and JavaScript basics',
                lessons: ['HTML Basics', 'CSS Styling', 'JavaScript Introduction']
            },
            {
                id: 2,
                icon: '📊',
                title: 'Core Concepts',
                progress: 10,
                description: 'Understanding programming fundamentals',
                lessons: ['Variables', 'Functions', 'Control Flow']
            },
            {
                id: 3,
                icon: '⚙️',
                title: 'Setting up Environment',
                progress: 0,
                description: 'Development tools and workspace setup',
                lessons: ['VS Code Setup', 'Git Basics', 'Terminal Commands']
            }
        ];

        return courses;
    };

    const courses = getCurriculum();

    const toggleCourse = (courseId) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    return (
        <div className="curriculum-timeline">
            <h3 className="timeline-title">Timeline View of Curriculum</h3>
            <div className="courses-list">
                {courses.map((course, index) => (
                    <div
                        key={course.id}
                        className="course-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div
                            className="course-header"
                            onClick={() => toggleCourse(course.id)}
                        >
                            <div className="course-info">
                                <span className="course-icon">{course.icon}</span>
                                <div className="course-details">
                                    <h4 className="course-title">{course.title}</h4>
                                    <div className="progress-bar-small">
                                        <div
                                            className="progress-fill-small"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <button className={`expand-btn ${expandedCourse === course.id ? 'expanded' : ''}`}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M6 8L10 12L14 8"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        {expandedCourse === course.id && (
                            <div className="course-content">
                                <p className="course-description">{course.description}</p>
                                <ul className="lessons-list">
                                    {course.lessons.map((lesson, idx) => (
                                        <li key={idx} className="lesson-item">
                                            <span className="lesson-check">✓</span>
                                            {lesson}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurriculumTimeline;
