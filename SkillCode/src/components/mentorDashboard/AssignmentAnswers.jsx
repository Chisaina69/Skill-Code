import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const AssignmentAnswers = () => {
  const [assessmentsData, setAssessmentsData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/SkillCode/assessments/students');
        setAssessmentsData(response.data.assessments);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex'>
      <NavBar />
      <div className='ml-8'>
        <h1 className='font-medium font-sans text-lg p-10 py-1 px-10 bg-orange-600 rounded inline-block mt-11 text-white w-full text-center'>Assessment Grades</h1>
        {assessmentsData.length > 0 ? (
          <table className='mt-5 w-full border-collapse border'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border p-2'>Assessment ID</th>
                <th className='border p-2'>Title</th>
                <th className='border p-2'>Student Email</th>
                <th className='border p-2'>Grade</th>
              </tr>
            </thead>
            <tbody>
              {assessmentsData.map((assessment) => (
                <React.Fragment key={assessment.assessment_id}>
                  {assessment.students.map((student) => (
                    <tr key={student.student_email}>
                      <td className='border p-2'>{assessment.assessment_id}</td>
                      <td className='border p-2'>{assessment.title}</td>
                      <td className='border p-2'>{student.student_email}</td>
                      <td className='border p-2'>{student.grade}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='mt-5'>No assessments available.</p>
        )}
        {error && <div className='text-red-500 mt-3'>{error}</div>}
      </div>
    </div>
  );
};

export default AssignmentAnswers;
