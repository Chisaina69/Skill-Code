import React from 'react';
import { BrowserRouter as  Link } from 'react-router-dom';



const NavBar = () => (
    <div className='mentor'>
      <h1 className='logo'>SkillCode</h1>
      <div className='content'>
        <div className='navbar'>
          <ul>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/assessment'>Assessment</Link>
            </li>
            <li>
              <Link to='/grades'>Grades</Link>
            </li>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/help'>Help</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
);

export default NavBar;
