import React, { useEffect, useState } from "react";
import TopBar from "../topbar";
import QuestionFeedback from "./Feedback";

function AssessmentComponent() {
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const studentId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/SkillCode/students/assessment_details/${studentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAssessmentData(data.assessments);
        setStudentAnswers(new Array(data.assessments[0]?.questions.length).fill(null));
        setLoading(false);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleAnswerQuestion = (answer) => {
    const updatedAnswers = [...studentAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setStudentAnswers(updatedAnswers);
  };

  const submitAssessment = () => {
    const currentAssessment = assessmentData[currentQuestionIndex];
    if (!currentAssessment) {
      console.error("No assessment data for the current question.");
      return;
    }

    const submissionData = {
      student_id: studentId,
      assessment_id: currentAssessment.assignment_id,
      answers: studentAnswers,
    };

    fetch(`/api/SkillCode/students/${studentId}/assessments/${currentAssessment.assignment_id}/submit_assessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Assessment submitted successfully!");
          setSubmitted(true);
        } else {
          console.error("Failed to submit assessment");
        }
      })
      .catch((error) => {
        console.error("Error submitting assessment:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <TopBar />
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Assessment Questions</h1>
      {assessmentData?.map((assignment, assignmentIndex) => (
        <div key={assignmentIndex} className="mb-4 border p-4 rounded-lg bg-blue-100 shadow-md">
          <h2 className="text-lg font-semibold text-orange-500">{assignment.assessment_title}</h2>
          <p className="text-gray-600 mb-2">{assignment.assessment_description}</p>
          {assignment.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4">
              <div
                className="border p-4 rounded-lg bg-white shadow-md cursor-pointer"
                onClick={() => setCurrentQuestionIndex(qIndex)}
              >
                <h3 className="text-md font-semibold text-blue-500">{question.text_question}</h3>
                {submitted ? (
                  <p className="text-blue-500">Correct Answer: {question.correct_answer}</p>
                ) : (
                  studentAnswers[qIndex] !== null ? (
                    <>
                      <p className="text-gray-600">Your answer: {studentAnswers[qIndex]}</p>
                    </>
                  ) : (
                    <p className="text-gray-600">Click to answer this question</p>
                  )
                )}
              </div>
              {currentQuestionIndex === qIndex && (
                <div className="mt-2">
                  {question.options ? (
                    <ul>
                      {question.options.split('\n').map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          className={`border p-2 rounded-md cursor-pointer ${
                            studentAnswers[qIndex] === option
                              ? option === question.correct_answer
                                ? "bg-blue-200 text-blue-500"
                                : "bg-red-200 text-red-500"
                              : "bg-orange-200 text-blue-500"
                          }`}
                          onClick={() => {
                            if (!submitted) {
                              handleAnswerQuestion(option);
                            }
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">Options not available for this question.</p>
                  )}
                </div>
              )}
            </div>
          ))}
          {submitted && (
            <div className="mt-4">
              <QuestionFeedback studentId={studentId} assessmentId={assignment.assignment_id} />
            </div>
          )}
        </div>
      ))}
      <button
        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer mt-4"
        onClick={submitAssessment}
      >
        Submit Assessment
      </button>
    </div>
  );
}

export default AssessmentComponent;









