import React, { useState, useEffect } from 'react';
import TopBar from "../topbar";

function StudentProfile({ student }) {
    const studentId =1;
    const [studentData, setStudentData] = useState(null);
    const placeholderImageURL = `https://picsum.photos/200/200?random=${studentId}`;

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
    
      fetch('https://skill-code.onrender.com/SkillCode/students/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setStudentData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [studentId]);
    

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-orange-400 to-blue-600 p-4">
        <TopBar />

        <div className="flex-grow p-6 flex justify-center items-start">
          <div className="bg-white rounded-lg shadow w-full md:max-w-md mt-4 flex flex-col">
            <img src={placeholderImageURL} alt={studentId} className="w-full h-56 rounded-t-lg object-cover object-center" />

            <div className="p-6">
              <div className="font-bold text-blue-700 text-2xl mb-2">{studentData ? studentData.name : 'Loading...'}</div>
              <p className="text-gray-600 text-lg mb-4">{studentData ? studentData.email : 'Loading...'}</p>

              {studentData && studentData.assignments && (
                <div>
                  <h2 className="text-lg font-semibold text-orange-500 mb-2">Assignments</h2>
                  <ul className="space-y-1">
                    {studentData.assignments.map((assignment) => (
                      <li key={assignment.id} className="text-gray-700">
                        <span className="font-semibold text-gray-900">Assignment:</span> {assignment.id}, <span className="font-semibold text-gray-900">Assessment:</span> {assignment.assessment_id}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
    );
}

export default StudentProfile;





