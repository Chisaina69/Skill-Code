import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AssessmentDetails() {
  const { assessmentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('accessToken');


  useEffect(() => {
        // Retrieve the access token from localStorage
        const studentId = localStorage.getItem('studentId'); // Retrieve student ID from localStorage
        const token = localStorage.getItem('accessToken');


        // Check if the token and student ID exist
        if (!token || !studentId) {
          // Handle the scenario where the token or student ID is missing, e.g., redirect to the login page
          console.error('Access token or student ID not found. Redirect to login page.');
          // You can redirect the user to the login page here if necessary.
          return;
        }

    // Fetch questions for the specific assessment using API endpoint
    fetch(`/api/SkillCode/assessments/${assessmentId}/questions`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        // Initialize answers state with question IDs as keys and empty string values
        const initialAnswers = {};
        data.forEach((question) => {
          initialAnswers[question.question_id] = '';
        });
        setAnswers(initialAnswers);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [assessmentId]);

  const handleAnswerChange = (questionId, answer) => {
    // Update answers based on questionId
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }
  
    // Prepare submission data
    const submissionData = questions.map((question) => ({
      question_id: question.question_id,
      answer_text: answers[question.question_id],
    }));
  
    // Submit answers to the API endpoint
    setIsSubmitting(true);
    fetch(`/api/SkillCode/students/assessments/${assessmentId}/submit_assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Submission response:', data);
        // Handle the submission response here, update UI or perform other actions if necessary
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error submitting assessment:', error);
        setIsSubmitting(false);
      });
  };
  

  return (
    <div>
      <h2>Assessment Details</h2>
      <form>
        {questions.map((question) => (
          <div key={question.question_id}>
            <p>{question.text_question}</p>
            <ul>
              {question.options.split(',').map((option, index) => (
                <li key={index}>
                  <label>
                    Answer: 
                    <input
                      type="text"
                      value={answers[question.question_id]}
                      onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
                      disabled={isSubmitting}
                    />
                    {option.trim()} {/* Display the option text */}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
        </button>
      </form>
    </div>
  );
}

export default AssessmentDetails;
