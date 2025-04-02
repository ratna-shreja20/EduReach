import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionBank } from '../data/questionBank';
import './QuizComponent.css';

const QuizComponent = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  
  // Get questions for the selected subject or fallback to GK
  const subjectQuestions = questionBank[subject?.toLowerCase()] || questionBank.gk;
  
  const [quizState, setQuizState] = useState({
    questions: subjectQuestions,
    currentQuestion: 0,
    selectedOptions: Array(subjectQuestions.length).fill(null),
    score: 0,
    showResult: false
  });

  const handleOptionSelect = (optionIndex) => {
    setQuizState(prev => {
      const newSelectedOptions = [...prev.selectedOptions];
      newSelectedOptions[prev.currentQuestion] = optionIndex;
      return { ...prev, selectedOptions: newSelectedOptions };
    });
  };

  const handleNext = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: Math.min(prev.currentQuestion + 1, prev.questions.length - 1)
    }));
  };

  const handlePrev = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0)
    }));
  };

  const handleSubmit = () => {
    const newScore = quizState.questions.reduce((acc, question, index) => {
      return acc + (quizState.selectedOptions[index] === question.answer ? 1 : 0);
    }, 0);

    setQuizState(prev => ({
      ...prev,
      score: newScore,
      showResult: true
    }));
  };

  const handleRestart = () => {
    navigate('/dashboard');
  };

  // Destructure state
  const { 
    questions, 
    currentQuestion, 
    selectedOptions, 
    score, 
    showResult 
  } = quizState;

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>{subject?.charAt(0)?.toUpperCase() + subject?.slice(1)} Quiz Results</h2>
        <div className="score-display">
          <p>Your Score: <span>{score}/{questions.length}</span></p>
          <p>{score >= questions.length/2 ? "🎉 Great job!" : "Keep practicing!"}</p>
        </div>
        <button onClick={handleRestart} className="quiz-button">
          Back to Subjects
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{subject?.charAt(0)?.toUpperCase() + subject?.slice(1)} Quiz</h2>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="question-box">
        <h3>{currentQ.question}</h3>
        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedOptions[currentQuestion] === index ? 'selected' : ''
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button 
          onClick={handlePrev} 
          disabled={currentQuestion === 0}
          className="quiz-button"
        >
          Previous
        </button>
        
        {currentQuestion < questions.length - 1 ? (
          <button 
            onClick={handleNext} 
            disabled={selectedOptions[currentQuestion] === null}
            className="quiz-button primary"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={handleSubmit} 
            disabled={selectedOptions[currentQuestion] === null}
            className="quiz-button submit"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;