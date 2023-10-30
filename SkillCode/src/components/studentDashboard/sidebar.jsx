import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboard, faQuestionCircle, faHome, faLifeRing, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div className="sidebar fixed left-0 top-0 h-full bg-blue-950 text-white p-4 flex flex-col">
      <Link to="/profile" className="sidebar-link my-2">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Profile
      </Link>
      <Link to="/assessment" className="sidebar-link my-2">
        <FontAwesomeIcon icon={faClipboard} className="mr-2" />
        Assessment
      </Link>
      <Link to="/quiz" className="sidebar-link my-2">
        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
        Quiz
      </Link>
      <Link to="/home" className="sidebar-link my-2">
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        Home
      </Link>
      <Link to="/help" className="sidebar-link my-2 mt-auto">
        <FontAwesomeIcon icon={faLifeRing} className="mr-2" />
        Help
      </Link>
      <Link to="/logout" className="sidebar-link my-2">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Log Out
      </Link>
    </div>
  );
}

export default Sidebar;








