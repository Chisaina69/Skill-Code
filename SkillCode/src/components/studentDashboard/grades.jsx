import React, { useEffect, useState } from 'react';
import TopBar from '../topbar';

const StudentGrades = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const student_id = 1;

  useEffect(() => {
    fetch(`/api/SkillCode/students/grades/${student_id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStudentInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500 text-2xl mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-orange-400 to-blue-600 p-4">
      <TopBar />

      <div className="flex-grow p-6 rounded-lg shadow-lg my-4 mx-auto bg-white max-w-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Student Grade Information</h2>
        <p className="text-lg text-blue-900 mb-2">Student: {studentInfo.student_name}</p>
        <p className="text-lg text-blue-900 mb-6">Student Email: {studentInfo.student_email}</p>

        <h3 className="text-xl font-bold text-orange-700 mt-6 mb-4">Grade History</h3>
        <ul className="space-y-2">
          {studentInfo.grade_history.map((gradeData) => (
            <li key={gradeData.grade_id} className="flex justify-between items-center border p-2 rounded-md">
              <span className="text-blue-700 font-semibold">Assessment: {gradeData.assessment_id}</span>
              <span className="text-red-600 font-semibold">Grade: {gradeData.grade}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentGrades;


