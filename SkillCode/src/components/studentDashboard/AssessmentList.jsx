import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const studentId = localStorage.getItem('studentId'); // Retrieve student ID from localStorage
  console.log('Student ID:', studentId);

  useEffect(() => {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('accessToken');

    // Check if the token and student ID exist
    if (!token || !studentId) {
      console.error('Access token or student ID not found. Redirect to login page.');
      return;
    }

    fetch(`/api/SkillCode/students/assessment_details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAssessments(data.assessments);
      })
      .catch((error) => {
        console.error('Error fetching assessments:', error);
      });
  }, [studentId]); 

  return (
    <div>
      <h2>Assessments</h2>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment.assignment_id}>
            <Link to={`/assessment/${assessment.assignment_id}`}>{assessment.assessment_title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssessmentList;
