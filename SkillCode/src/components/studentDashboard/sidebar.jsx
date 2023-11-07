import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboard, faQuestionCircle, faHome, faLifeRing, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ showSidebar }) {
  const sidebarClasses = showSidebar ? "fixed left-0 top-0 h-full bg-blue-950 text-white p-4 flex flex-col w-16 z-10" : "fixed left-0 top-0 h-full bg-blue-950 text-white p-4 flex flex-col w-16 hidden";

  return (
    <div className={sidebarClasses}>
      <Link to="/Profile" className="sidebar-link my-2 hover:bg-blue-850">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Profile
      </Link>
      <Link to="/assessment" className="sidebar-link my-2 hover:bg-blue-850">
        <FontAwesomeIcon icon={faClipboard} className="mr-2" />
        Assessment
      </Link>
      <Link to="/Grades" className="sidebar-link my-2 hover-bg-blue-850">
        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
        Grades
      </Link>
      <Link to="/student" className="sidebar-link my-2 hover:bg-blue-850">
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        Home
      </Link>
      <Link to="/help" className="sidebar-link my-2 mt-auto hover:bg-blue-850">
        <FontAwesomeIcon icon={faLifeRing} className="mr-2" />
        Help
      </Link>
      <Link to="/logout" className="sidebar-link my-2 hover-bg-blue-850">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Log Out
      </Link>
    </div>
  );
}

export default Sidebar;












