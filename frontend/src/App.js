import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QuizList from './components/QuizList';
import QuizComponent from './components/QuizComponent';
import VideoLessons from './components/VideoLessons';
import StudyMaterials from './components/StudyMaterials';
import SubjectList from './components/SubjectList';
import PdfViewer from './components/PdfViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Main Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Quiz Routes */}
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:subject" element={<QuizComponent />} />

        {/* Other Routes */}
        <Route path="/video-lessons" element={<VideoLessons />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/study-materials/:subject" element={<SubjectList />} />
        <Route path="/study-materials/:subject/:chapter" element={<PdfViewer />} />
      </Routes>
    </div>
  );
}

export default App;