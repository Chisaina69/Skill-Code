import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; 

function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center">
      <div className="logo flex items-center">
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
    </div>
  );
}

export default TopBar;












