import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  // Redirect to login if no user data
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome to EduReach, {user.firstName}!</h1>
        <p>Your personalized learning dashboard</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <h2>Profile Details</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Class:</strong> {user.class}</p>
          <p><strong>Board:</strong> {user.board}</p>
          <p><strong>Address:</strong> {user.address}, {user.city}, {user.state}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          onClick={() => navigate('/study-materials')}
          className="action-btn study-materials-btn"
        >
          Study Materials
        </button>
        <button 
          onClick={() => navigate('/quizzes')}
          className="action-btn quizzes-btn"
        >
          Interactive Quizzes
        </button>
        <button 
         
           
  onClick={() => navigate('/video-lessons')}
  className="action-btn video-lessons-btn"
>
  Video Lessons
        </button>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;