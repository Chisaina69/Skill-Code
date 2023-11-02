import React, { useState, useEffect } from 'react';

function StudentProfile({ student }) {
  const [studentData, setStudentData] = useState(null);
  const placeholderImageURL = `https://picsum.photos/200/200?random=${student.id}`;

  // Simulate data fetching (replace with actual fetch logic)
  useEffect(() => {
    setTimeout(() => {
      const mockData = {
        grades: ["A", "B", "C"],
        questionsDone: 20,
        assignmentNotification: true,
      };
      setStudentData(mockData);
    }, 1000);
  }, [student.id]); // Use student.id as a dependency

  return (
    <div className="max-w-md bg-blue-100 rounded-lg overflow-hidden shadow-lg">
      {/* Use a placeholder image from Lorem Picsum */}
      <img src={placeholderImageURL} alt={student.name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl text-orange-500 mb-2">{student.name}</div>
        <p className="text-gray-700 text-lg mb-2">{student.major}</p>
        <p className="text-gray-700 text-lg mb-2">{student.batch}</p>
        <p className="text-gray-700 text-lg">{student.email}</p>
      </div>

      {/* Display grades */}
      {studentData && (
        <div className="p-4 bg-blue-200">
          <h2 className="text-lg font-semibold text-orange-500">Grades</h2>
          <ul className="list-disc ml-4">
            {studentData.grades.map((grade, index) => (
              <li key={index} className="text-lg text-gray-700">{grade}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display questions done */}
      {studentData && (
        <div className="p-4 bg-blue-200">
          <h2 className="text-lg font-semibold text-orange-500">Questions Done</h2>
          <p className="text-lg text-gray-700">{studentData.questionsDone}</p>
        </div>
      )}

      {/* Display assignment notification */}
      {studentData && studentData.assignmentNotification && (
        <div className="p-4 bg-blue-200">
          <h2 className="text-lg font-semibold text-orange-500">Assignment Notification</h2>
          <p className="text-lg text-gray-700">You have a new assignment.</p>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;



