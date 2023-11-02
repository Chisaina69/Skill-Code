import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import Sidebar from "./sidebar";
import TopBar from "../topbar";

function Student() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar className="fixed top-0 left-0 right-0 bg-blue-500 text-white py-2 px-4 shadow-lg" />
      <div className="flex-1 p-4 text-center bg-gray-100">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, Student!</h1>
        <p className="text-lg text-gray-600 mb-8">
          We are excited to have you on board. Get ready for an amazing learning journey.
          If you have any questions or need assistance, feel free to reach out.
        </p>
        <Link to="/trial-assessment" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
          Try It Out
        </Link>
      </div>
    </div>
  );
}

export default Student


