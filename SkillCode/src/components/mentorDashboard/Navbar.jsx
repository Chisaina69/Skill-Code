import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';



const NavBar = () => (
    <div className="font-sans text-base w-1/4 p-10">
      <h1 className='"font-medium text-lg p-4"'>SkillCode</h1>
      <div className='p-4'>
        <div >
          <ul>
            <li className='mb-4 flex items-center'>
              <Link to='/profile'>Profile</Link>
            </li>
            <li className='mb-4 flex items-center'>
              <Link to='/assessment'>Assessment</Link>
            </li>
            <li className='mb-4 flex items-center'>
              <Link to='/grades'>Grades</Link>
            </li>
            <li className='mb-4 flex items-center' >
              <Link to='/home'>Home</Link>
            </li>
            <li className='mb-4 flex items-center'>
              <Link to='/help'>Help</Link>
            </li>
            <li className='mb-4 flex items-center'>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
);

export default NavBar;
