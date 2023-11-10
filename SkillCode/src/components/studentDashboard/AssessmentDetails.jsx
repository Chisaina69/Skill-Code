import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AssessmentDetails() {
  const { assessmentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');

    if (!token || !studentId) {
      console.error('Access token or student ID not found. Redirect to login page.');
      return;
    }

    fetch(`/api/SkillCode/assessments/${assessmentId}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        const initialAnswers = {};
        data.forEach((question) => {
          initialAnswers[question.question_id] = '';
        });
        setAnswers(initialAnswers);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [assessmentId, token]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }
  
    // Create an array of objects with question_id and answer_text properties
    const submissionData = Object.entries(answers).map(([questionId, answerText]) => ({
      question_id: parseInt(questionId, 10),
      answer_text: answerText,
    }));
  
    if (submissionData.length === 0 || submissionData.some(item => !item.answer_text.trim())) {
      console.error('Please provide answers to all questions before submitting.');
      return;
    }
  
    setIsSubmitting(true);
  
    fetch(`/api/SkillCode/students/assessments/${assessmentId}/submit_assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Submission response:', data);
        setIsSubmitting(false);
        // Handle the submission response here if needed
      })
      .catch((error) => {
        console.error('Error submitting assessment:', error.message);
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
                    {option.trim()} 
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
