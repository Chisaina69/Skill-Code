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
      // Handle the scenario where the token or student ID is missing, e.g., redirect to the login page
      console.error('Access token or student ID not found. Redirect to login page.');
      // You can redirect the user to the login page here if necessary.
      return;
    }

    // Fetch assessments for the current student using API endpoint with the dynamic student ID
    fetch(`/api/SkillCode/students/assessment_details`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the access token in the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAssessments(data.assessments);
      })
      .catch((error) => {
        console.error('Error fetching assessments:', error);
      });
  }, [studentId]); // Add studentId as a dependency to useEffect

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
