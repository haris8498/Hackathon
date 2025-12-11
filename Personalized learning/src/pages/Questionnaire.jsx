import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import OptionCard from '../components/OptionCard';
import FloatingMessage from '../components/FloatingMessage';
import { questionsData } from '../data/questionsData';
import './Questionnaire.css';

const Questionnaire = ({ onComplete, userName }) => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [floatingMessage, setFloatingMessage] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const question = questionsData[currentQuestion];
    const isLastQuestion = currentQuestion === questionsData.length - 1;
    const hasAnswer = answers[currentQuestion] !== undefined;

    const handleOptionSelect = (optionIndex) => {
        setAnswers({
            ...answers,
            [currentQuestion]: optionIndex
        });

        // Show floating message
        const message = question.options[optionIndex].message;
        setFloatingMessage(message);
    };

    const handleNext = () => {
        if (!hasAnswer) return;

        setIsTransitioning(true);
        setFloatingMessage('');

        setTimeout(() => {
            if (isLastQuestion) {
                // Save answers and navigate to dashboard
                onComplete(answers);
                navigate('/dashboard');
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setIsTransitioning(false);
            }
        }, 400);
    };

    return (
        <div className="questionnaire-page">
            <Header />

            <div className="questionnaire-container">
                <div className="decorative-shapes">
                    <div className="shape shape-1">△</div>
                    <div className="shape shape-2">○</div>
                    <div className="shape shape-3">□</div>
                    <div className="shape shape-4">◇</div>
                    <div className="shape shape-5">▽</div>
                    <div className="shape shape-6">○</div>
                </div>

                <ProgressBar
                    currentQuestion={currentQuestion}
                    totalQuestions={questionsData.length}
                />

                <div className={`question-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                    <h2 className="question-title">{question.question}</h2>

                    <div className={`options-grid ${question.options.length === 3 ? 'three-columns' : ''}`}>
                        {question.options.map((option, index) => (
                            <OptionCard
                                key={index}
                                icon={option.icon}
                                text={option.text}
                                isSelected={answers[currentQuestion] === index}
                                onClick={() => handleOptionSelect(index)}
                            />
                        ))}
                    </div>

                    <button
                        className={`next-button ${!hasAnswer ? 'disabled' : ''}`}
                        onClick={handleNext}
                        disabled={!hasAnswer}
                    >
                        {isLastQuestion ? 'Get My Personalized Path!' : 'Next Question'}
                    </button>
                </div>

                <FloatingMessage
                    message={floatingMessage}
                    position={currentQuestion % 2 === 0 ? 'left' : 'right'}
                />
            </div>
        </div>
    );
};

export default Questionnaire;
