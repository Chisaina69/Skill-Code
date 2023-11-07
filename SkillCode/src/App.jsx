
import Assessment from './components/mentorDashboard/assessment'
import Grades from './components/mentorDashboard/grades'
import NavBar from './components/mentorDashboard/Navbar'
import Profile from './components/mentorDashboard/Profile'
import Logout from './components/mentorDashboard/Logout'
import ViewAssessment from './components/mentorDashboard/ViewAssessment'
import InviteStudents from './components/mentorDashboard/InviteStudents'
import CreateAssessment from './components/mentorDashboard/CreateAssessment'
import {Outlet,Route,Routes} from "react-router-dom"
import React from 'react';
import './App.css';
import StudentProfile from './components/studentDashboard/profile';
import StudentDashboard from './components/studentDashboard/studentdashboard';
import AssessmentComponent from './components/studentDashboard/Assesment';
import Help from './components/help';
import Trials from './components/studentDashboard/Trialassesment';
import StudentGrades from './components/studentDashboard/grades';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
      
        <Routes>
          {/* Mentor Dashboard Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/viewAssessment/:id" element={<ViewAssessment />} />
          <Route path="/inviteStudents" element={<InviteStudents />} />
          <Route path="/createAssessment" element={<CreateAssessment />} />
          {/* ... other mentor dashboard routes */}
          <Route path="/create-assessment" element={<CreateAssessment />} />
          <Route path="/invite-students/:id" element={<InviteStudents />} />
          <Route path="/logout" element={<Logout />} />
          

          {/* Student Dashboard Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/assessment" element={<AssessmentComponent />} />
          <Route path="/Profile" element={<StudentProfile />} />
          <Route path="/Trials" element={<Trials />} />
          <Route path="/Grades" element={<StudentGrades />} />

          {/* Other Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path='/help' element={<Help />} />
        </Routes>
        <Outlet />
    </>
  );
}



export default App;