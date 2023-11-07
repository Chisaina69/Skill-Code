import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Sidebar from "./studentDashboard/sidebar";

function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center relative z-20">
      <div
        className="logo flex items-center"
        onClick={showSidebar ? closeSidebar : undefined}
        style={{ cursor: showSidebar ? "pointer" : "default" }}
      >
        <button
          className="text-blue-950 text-2xl font-extrabold font-inter ml-2"
          onClick={handleSidebarToggle}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="text-blue-950 text-xl font-extrabold font-inter ml-2">
          SkillCode
        </div>
      </div>
      <div className="notification flex items-center" onClick={handleBellClick}>
        <FontAwesomeIcon icon={faBell} size="2x" color="orange" />
        <div className="bg-neutral-800 text-white font-semibold text-xs w-7 h-7 flex items-center justify-center rounded-full ml-2">
          5
        </div>
        {showNotifications && (
          <div className="notification-card">
            {/* Add your notifications content here */}
            Notification 1
            Notification 2
            {/* ... */}
          </div>
        )}
      </div>
      <div className="profile">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} size="2x" color="orange" />
        </Link>
      </div>
      <Sidebar showSidebar={showSidebar} />
    </div>
  );
}

export default TopBar;













