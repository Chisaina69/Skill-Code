import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboard, faChartLine, faHome, faLifeRing, faSignOutAlt,faUserTie } from "@fortawesome/free-solid-svg-icons";


const NavBar = () => (
      <div className="font-sans text-base w-1/4 p-10">
        <h1 className='font-semibold text-blue-950 text-lg p-4'>
          SkillCode
           {/* <FontAwesomeIcon icon={faUserTie} className="mr-2 w-20" /> */}
        </h1>
      <div className='p-4'>
        <div >
          <ul>                 
            <li className='mb-4  flex items-center'>
            <FontAwesomeIcon icon={faUser} className="mr-2" />
              <Link className='text-zinc-950 font-semibold'to='/profile'>Profile</Link>
            </li>
            <li className='mb-4 flex items-center'>
            <FontAwesomeIcon icon={faClipboard} className="mr-2" />
              <Link  className='text-zinc-950 font-semibold' to='/assessment'>Assessment</Link>
            </li>
            <li className='mb-4 flex items-center'>
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              <Link className='text-zinc-950 font-semibold'to='/grades'>Grades</Link>
            </li>
            <li className='mb-4 flex items-center' >
             <FontAwesomeIcon icon={faHome} className="mr-2" />
              <Link className='text-zinc-950 font-semibold' to='/home'>Home</Link>
            </li>
            <li className='mb-4 flex items-center'>
            <FontAwesomeIcon icon={faLifeRing} className="mr-2" />
              <Link className='text-zinc-950 font-semibold'to='/help'>Help</Link>
            </li>
            <li className='mb-4 flex items-center'>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <Link className='text-zinc-950 font-semibold' to='/logout'>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
);

export default NavBar;
