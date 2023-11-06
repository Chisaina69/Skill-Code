import Assessment from './components/mentorDashboard/assessment'
import Grades from './components/mentorDashboard/grades'
import NavBar from './components/mentorDashboard/Navbar'
import Profile from './components/mentorDashboard/Profile'
import Home from './components/mentorDashboard/Home'
import Help from './components/mentorDashboard/Help'
import Logout from './components/mentorDashboard/Logout'
import ViewAssessment from './components/mentorDashboard/ViewAssessment'
import InviteStudents from './components/mentorDashboard/InviteStudents'
import './App.css'
import {BrowserRouter,Outlet,Route, Router, Routes} from "react-router-dom"


function App() {

  return (
    <>
      <div className='flex' >
      <NavBar />
      <Routes>
      
          <Route path="/profile" element={<Profile/>} />
          <Route path="/assessment" element={<Assessment/>} />
          <Route path="/grades" element={<Grades/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/assessments/:id" element={<ViewAssessment />} />
          <Route path="/invite-students/:id" element={<InviteStudents />} />
          <Route path="/logout" element={<Logout/>}/>
        
      </Routes>
        
        <Outlet/>
      </div>
    
    </>
  )
}

export default App
