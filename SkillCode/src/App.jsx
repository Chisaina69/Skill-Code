import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './components/studentDashboard/studentdashboard';
import AssessmentComponent from './components/studentDashboard/Assesment';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import HomePage from './components/HomePage';
import './App.css'; 
import Assessment from './components/mentorDashboard/assessment'
import Grades from './components/mentorDashboard/grades'
import NavBar from './components/mentorDashboard/Navbar'
import Profile from './components/mentorDashboard/profile'
import Home from './components/mentorDashboard/Home'
import Help from './components/mentorDashboard/Help'
import Logout from './components/mentorDashboard/Logout'
import './App.css'
import {BrowserRouter,Outlet,Route, Router, Routes} from "react-router-dom"



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
    <>
      <div>
      <NavBar />
      <Routes>
      
          <Route path="/profile" element={<Profile/>} />
          <Route path="/assessment" element={<Assessment/>} />
          <Route path="/grades" element={<Grades/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/logout" element={<Logout/>}/>
        
      </Routes>
        
        <Outlet/>
      </div>
    
    </>
  )
}

export default App;


