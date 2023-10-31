import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Student from './components/studentDashboard/studentdashboard';
import AssessmentComponent from './components/studentDashboard/Assesment';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import HomePage from './components/HomePage';
import './App.css';
import Assessment from './components/mentorDashboard/assessment';
import Grades from './components/mentorDashboard/grades';
import NavBar from './components/mentorDashboard/Navbar'; 
import Profile from './components/mentorDashboard/profile';
import Home from './components/mentorDashboard/Home';
import Help from './components/mentorDashboard/Help';
import Logout from './components/mentorDashboard/Logout';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/assessment" element={<AssessmentComponent />} />
        <Route path="/navbar" element={<NavBar />}/> 
        <Route path="/mentor" element={<Profile />} />
        <Route path="/mentor/assessment" element={<Assessment />} />
        <Route path="/mentor/grades" element={<Grades />} />
        <Route path="/mentor/home" element={<Home />} />
        <Route path="/mentor/help" element={<Help />} />
        <Route path="/mentor/logout" element={<Logout />} />
      </Routes>
  );
}

export default App;


