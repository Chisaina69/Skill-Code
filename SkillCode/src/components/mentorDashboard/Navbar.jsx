import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboard, faChartLine, faHome, faLifeRing, faSignOutAlt, faUserTie } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => (
  <div className="font-sans text-sm w-1/9 min-h-screen p-0 bg-blue-500 text-white flex flex-col items-start">
    <Link to="/mentor" className="font-bold text-2xl mb-4 flex items-center p-2">
      SkillCode
    </Link>
    <div>
      <ul className="space-y-2 p-0 m-0">
        <li className="flex items-center p-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <Link className="text-base font-medium" to="/profile">Profile</Link>
        </li>
        <li className="flex items-center p-2">
          <FontAwesomeIcon icon={faClipboard} className="mr-2" />
          <Link className="text-base font-medium" to="/assessment">Assessment</Link>
        </li>
        <li className="flex items-center p-2">
          <FontAwesomeIcon icon={faChartLine} className="mr-2" />
          <Link className="text-base font-medium" to="/grades">Grades</Link>
        </li>
        <li className="flex items-center p-2">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          <Link className="text-base font-medium" to="/home">Home</Link>
        </li>
        <li className="flex items-center p-2">
          <FontAwesomeIcon icon={faLifeRing} className="mr-2" />
          <Link className="text-base font-medium" to="/help">Help</Link>
        </li>
        <li className="flex items-center p-2">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          <Link className="text-base font-medium" to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default NavBar;





