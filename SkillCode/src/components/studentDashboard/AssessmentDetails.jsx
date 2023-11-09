import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AssessmentDetails() {
  const { assessmentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch questions for the specific assessment using API endpoint
    fetch(`/api/SkillCode/assessments/1/questions`)
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
    const submissionData = {
      student_id: '<student_id>', // Replace with the actual student ID
      assessment_id: assessmentId,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        question_id: parseInt(questionId, 10),
        answer_text: answer,
      })),
    };

    // Submit answers to the API endpoint
    setIsSubmitting(true);
    fetch(`/api/SkillCode/students/${submissionData.student_id}/assessments/${submissionData.assessment_id}/submit_assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API after submitting answers
        console.log('Submission response:', data);
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
