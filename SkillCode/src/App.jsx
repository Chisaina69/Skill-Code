import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import StudentProfile from './components/studentDashboard/profile';
import StudentDashboard from './components/studentDashboard/studentdashboard';
import AssessmentComponent from './components/studentDashboard/Assesment';
import Help from './components/help';
import Trials from './components/studentDashboard/Trialassesment';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import HomePage from './components/HomePage';
import Assessment from './components/mentorDashboard/assessment';
import Grades from './components/mentorDashboard/grades';
import NavBar from './components/mentorDashboard/Navbar';
import Profile from './components/mentorDashboard/profile';
import Home from './components/mentorDashboard/Home';

import Logout from './components/mentorDashboard/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/assessment" element={<AssessmentComponent />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/Trials" element={<Trials />} />
      <Route path='/help' element={<Help/>} />
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



