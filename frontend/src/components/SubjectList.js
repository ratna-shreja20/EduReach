import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './studyMaterials.css';

// Sample data - replace with your actual PDFs
const subjectData = {
  mathematics: [
    { name: 'Algebra', pdf: '/pdfs/maths/algebra.pdf' },
    { name: 'Geometry', pdf: '/pdfs/maths/geometry.pdf' },
    { name: 'Calculus', pdf: '/pdfs/maths/calculus.pdf' },
  ],
  physics: [
    { name: 'Mechanics', pdf: '/pdfs/physics/mechanics.pdf' },
    { name: 'Electromagnetism', pdf: '/pdfs/physics/electromagnetism.pdf' },
    { name: 'Thermodynamics', pdf: '/pdfs/physics/thermodynamics.pdf' },
  ],
  // Add other subjects...
};

const SubjectList = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const chapters = subjectData[subject] || [];

  return (
    <div className="subject-list-container">
      <div className="subject-header">
        <button onClick={() => navigate('/study-materials')} className="back-button">
          ← Back to Subjects
        </button>
        <h2>{subject.charAt(0).toUpperCase() + subject.slice(1)} Study Materials</h2>
      </div>
      
      <div className="chapters-list">
        {chapters.map((chapter, index) => (
          <div 
            key={index}
            className="chapter-card"
            onClick={() => navigate(`/study-materials/${subject}/${chapter.name.toLowerCase()}`)}
          >
            <div className="chapter-icon">📄</div>
            <div className="chapter-info">
              <h3>{chapter.name}</h3>
              <div className="chapter-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(chapter.pdf, '_blank');
                  }}
                  className="download-button"
                >
                  Download
                </button>
                <button className="view-button">
                  View Online
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;