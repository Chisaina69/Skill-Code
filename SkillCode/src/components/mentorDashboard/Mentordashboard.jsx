import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar"; // Make sure to provide the correct path to your NavBar component.

function MentorDashboard() {
  const backgroundStyle = {
    backgroundImage: `url("../image.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "full",
  };

  return (
    <div className="flex h-screen">
      <NavBar />

      <div className="" style={backgroundStyle}>
        <div className="h-full flex flex-col justify-center items-center p-4 text-center bg-gray-100 bg-opacity-75">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome, Mentor!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We are excited to have you on board as a mentor. Get ready to guide
            and inspire your students. If you have any questions or need
            assistance, feel free to reach out.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
