import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './components/studentDashboard/studentdashboard';
import AssessmentComponent from './components/studentDashboard/Assesment';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/assessment" element={<AssessmentComponent />} />
      </Routes>
  );
}

export default App;

