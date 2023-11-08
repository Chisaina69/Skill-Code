import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentAnswers = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [feedbacks, setFeedbacks] = useState([]); // Store feedback for each response
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/SkillCode/view_student_answers');
        const filteredData = response.data.filter((assessment) => assessment.responses.length > 0);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data)

  const toggleExpand = (assessmentId) => {
    setExpanded({ ...expanded, [assessmentId]: !expanded[assessmentId] });
  };

  const handleFeedback = (event, assessmentID, questionID, studentID) => {
    const feedback = {
      "text": event.target.value,
      "assessment_id": assessmentID,
      "student_id": studentID,
      "question_id": questionID
    };

    const updatedFeedbacks = [...feedbacks, feedback];
    setFeedbacks(updatedFeedbacks);
  }

  const handleScore = (event, assessmentID, questionID, studentID) => {
    const score = {
      "score": event.target.value,
      "assessment_id": assessmentID,
      "student_id": studentID,
      "question_id": questionID
    };

    console.log(scores)

    const updatedScores = [...scores];
    updatedScores.push(score);
    setScores(updatedScores);
  };

  const handleSubmit = async () => {
    if (feedbacks.length === 0 || scores.length === 0) {
      setError("Please provide feedback and scores before submitting.");
      return;
    }

    try {
      // Log the feedbacks to check if they are being sent correctly
      console.log("Feedbacks:", feedbacks);

      // Send each feedback individually to the server
      for (const feedback of feedbacks) {
        console.log("Sending feedback:", feedback);
        const response = await axios.post('api/SkillCode/mentors/feedback', feedback, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Response from server:", response.data);
      }
      for (const score of scores) {
        await axios.put('api/SkillCode/update_score', score, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      setMessage('Feedback and scores submitted successfully');
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };


  const resetForm = () => {
      setError('');
      setFeedbacks([]);
      setMessage('');
    }

    function formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      return date.toLocaleString('en-US', options);
    }


    const renderResponses = (responses, assessmentID) => {
      return responses.map((response, index) => (
        <div key={index}>
          <div>
            <strong>Student Name:</strong> {response.student_name}
          </div>
          <div>
            <strong>Submission Date:</strong> {formatDateTime(response.created_at)}
          </div>

          <div>
            <strong>Qustion:</strong> {response.question}
          </div>
          <div>
            <strong>Answer:</strong> {response.answer_text}
          </div>
          <div>
            <label>Feedback</label>
            <input
              name={`feedback_${index}`}
              onChange={(e) => handleFeedback(e, assessmentID, response.question_id, response.student_id)}
              required
            />
          </div>
          <div>
            <label>Score</label>
            <input
              name={`score_${index}`}
              onChange={(e) => handleScore(e, assessmentID, response.question_id, response.student_id)}
              required
            />
          </div>
          <hr />
        </div>
      ));
    };

    const renderAssessment = (assessment) => {
      return (
        <div key={assessment.assessment_id}>
          <button onClick={() => toggleExpand(assessment.assessment_id)}>
            {assessment.assessment_title}
          </button>
          {expanded[assessment.assessment_id] && renderResponses(assessment.responses, assessment.assessment_id)}
        </div>
      );
    };

    return (
      <div>
        {data.map((assessment) => renderAssessment(assessment))}
        <button onClick={handleSubmit}>Submit Feedback & scores</button>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
      </div>
    );
  };

  export default AssignmentAnswers;