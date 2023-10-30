import React from "react";
import Sidebar from "./sidebar";
import TopBar from "../topbar";


function Student() {
  return (
    <div>
      <Sidebar />
      <TopBar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Welcome, Student!</h1>
        <p className="text-gray-600">
          We are thrilled to have you on board. Get ready to embark on an
          exciting learning journey. If you have any questions or need
          assistance, feel free to reach out.
        </p>
      </div>
    </div>
  );
}

export default Student;
