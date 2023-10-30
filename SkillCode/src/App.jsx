import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './components/studentDashboard/studentdashboard';
import AssessmentComponent from './components/studentDashboard/Assesment';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import HomePage from './components/HomePage';
import './App.css'; 

function App() {
  return (
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/assessment" element={<AssessmentComponent />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;


