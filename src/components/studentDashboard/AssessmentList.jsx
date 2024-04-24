import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AssessmentList() {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    // Fetch assessments for the current student using API endpoint
    fetch('/api/SkillCode/students/assessment_details/1')
      .then((response) => response.json())
      .then((data) => {
        setAssessments(data.assessments);
      })
      .catch((error) => {
        console.error('Error fetching assessments:', error);
      });
  }, []);

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
