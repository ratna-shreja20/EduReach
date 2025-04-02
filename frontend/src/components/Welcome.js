import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Fixed path to App.css
import './Welcome.css'; // This is correct as it's in the same directory

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to EduReach</h1>
        <p>Your gateway to quality education in rural areas</p>
        <div className="button-group">
          <button 
            className="welcome-btn login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="welcome-btn register-btn"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;