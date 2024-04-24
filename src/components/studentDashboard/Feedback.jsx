import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function QuestionFeedback() {
  const { studentId, assessmentId } = useParams();
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch question feedback for the student's assessment
    fetch('https://skill-code.onrender.com/SkillCode/students/assessments/1/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback))
      .catch((error) => console.error('Error fetching data:', error));
  }, [studentId, assessmentId]);

  return (
    <div className="question-feedback-container">
      <h2>Question Feedback</h2>
      <ul>
        {feedbackData.map((feedback) => (
          <li key={feedback.question_id} className="my-4 p-4 bg-blue-950">
            <div className="text-xl font-semibold text-orange-500">
              Question ID: {feedback.question_id}
            </div>
            <div className="text-white">Feedback: {feedback.feedback}</div>
            <div className="text-white">
              Mentor: {feedback.mentor_name || "N/A"}
            </div>
            <div className="text-white">
              Student: {feedback.student_name || "N/A"}
            </div>
            <div className="text-white">
              Assessment Title: {feedback.assessment_title || "N/A"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionFeedback;
