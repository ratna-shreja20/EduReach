import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizList.css';

const QuizList = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: 'Maths', color: '#FF6B6B' },
    { name: 'Physics', color: '#4ECDC4' },
    { name: 'Chemistry', color: '#45B7D1' },
    { name: 'History', color: '#FFA07A' },
    { name: 'Geography', color: '#98D8C8' },
    { name: 'Civics', color: '#F06292' },
    { name: 'Economics', color: '#FFD166' },
    { name: 'GK', color: '#06D6A0' },
    { name: 'Computer', color: '#118AB2' },
    { name: 'English', color: '#A78AFF' }
  ];

  const handleSubjectClick = (subjectName) => {
    navigate(`/quiz/${subjectName.toLowerCase()}`);
  };

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <button 
          onClick={() => navigate('/Dashboard',{ replace: true})}  // This should now work correctly
          className="back-to-dashboard"
        >
          ← Back to Dashboard
        </button>
        <h1 className="quiz-list-title">Choose a Subject</h1>
      </div>
      
      <div className="subjects-grid">
        {subjects.map((subject, index) => (
          <div 
            key={index}
            className="subject-card"
            style={{ backgroundColor: subject.color }}
            onClick={() => handleSubjectClick(subject.name)}
          >
            <h3>{subject.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;