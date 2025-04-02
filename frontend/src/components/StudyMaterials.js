import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studyMaterials.css';

const StudyMaterials = () => {
  const navigate = useNavigate();
  const subjects = [
    { name: 'Mathematics', icon: '🧮', color: '#FF6B6B' },
    { name: 'Physics', icon: '⚛️', color: '#4ECDC4' },
    { name: 'Chemistry', icon: '🧪', color: '#45B7D1' },
    { name: 'Biology', icon: '🧬', color: '#98D8C8' },
    { name: 'History', icon: '🏛️', color: '#FFA07A' },
    { name: 'Geography', icon: '🌍', color: '#F06292' },
  ];

  return (
    <div className="study-materials-container">
      <div className="study-header">
        <h1>📚 Study Materials</h1>
        <p>Access chapter-wise resources for your subjects</p>
      </div>
      
      <div className="subjects-grid">
        {subjects.map((subject, index) => (
          <div 
            key={index}
            className="subject-card"
            style={{ backgroundColor: subject.color }}
            onClick={() => navigate(`/study-materials/${subject.name.toLowerCase()}`)}
          >
            <span className="subject-icon">{subject.icon}</span>
            <h3>{subject.name}</h3>
            <div className="card-hover-effect">View Chapters →</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;