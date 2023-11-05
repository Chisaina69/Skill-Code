import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentAnswers = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/SkillCode/view_student_answers');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (assignmentId) => {
    setExpanded({ ...expanded, [assignmentId]: !expanded[assignmentId] });
  };

  const renderResponses = (responses) => {
    return responses.map((response, index) => (
      <div key={index}>
        <div>
          <strong>Student ID:</strong> {response.student_id}
        </div>
        <div>
          <strong>Student Name:</strong> {response.student_name}
        </div>
        <div>
          <strong>Question ID:</strong> {response.question_id}
        </div>
        <div>
          <strong>Answer:</strong> {response.answer_text}
        </div>
        {/* Add additional fields like feedback and score */}
        <hr />
      </div>
    ));
  };

  const renderAssignment = (assignment) => {
    return (
      <div key={assignment.assignment_id}>
        <button onClick={() => toggleExpand(assignment.assignment_id)}>
          {assignment.assessment_title}
        </button>
        {expanded[assignment.assignment_id] && renderResponses(assignment.responses)}
      </div>
    );
  };

  return (
    <div>
      {data.map((assignment) => renderAssignment(assignment))}
    </div>
  );
};

export default AssignmentAnswers;
