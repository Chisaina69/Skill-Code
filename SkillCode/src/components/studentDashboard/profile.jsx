import React, { useState, useEffect } from 'react';
import TopBar from "../topbar";

function StudentProfile({ student }) {
  const studentId =1;
  const [studentData, setStudentData] = useState(null);
  const placeholderImageURL = `https://picsum.photos/200/200?random=${studentId}`;
  

  useEffect(() => {
    fetch(`/api/SkillCode/students/${studentId}`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStudentData(data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [studentId]);

  return (
    <div className="max-w-md bg-blue-100 rounded-lg overflow-hidden shadow-lg">
      <TopBar />
      <img src={placeholderImageURL} alt={studentId} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl text-orange-500 mb-2">{studentData ? studentData.name : 'Loading...'}</div>
        <p className="text-gray-700 text-lg mb-2">{studentData ? studentData.email : 'Loading...'}</p>
        {studentData && studentData.assignments && (
          <div>
            <h2 className="text-lg font-semibold text-orange-500">Assignments</h2>
            <ul className="list-disc ml-4">
              {studentData.assignments.map((assignment) => (
                <li key={assignment.id} className="text-lg text-gray-700">
                  Assignment ID: {assignment.id}, Assessment ID: {assignment.assessment_id}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;




