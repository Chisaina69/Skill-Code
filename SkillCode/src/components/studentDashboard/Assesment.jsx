import React, { useEffect, useState } from "react";

function AssessmentComponent() {
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/SkillCode/students/assessment_details/${studentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAssessmentData(data.assessments); // Update to match your response structure
        setLoading(false);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  if (!assessmentData || assessmentData.length === 0) {
    return <div className="text-center mt-4">No assessment data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">Assessment Questions</h1>
      {assessmentData.map((assessment, index) => (
        <div key={index} className="mb-4 border p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-lg font-semibold">{assessment.assessment_title}</h2>
          <p className="text-gray-600 mb-2">{assessment.assessment_description}</p>
          {assessment.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4">
              <h3 className="text-md font-semibold">{question.title}</h3>
              {Array.isArray(question.options) ? (
                <ul className="list-disc list-inside mb-2">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="text-gray-600">
                      {option}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Options not available for this question.</p>
              )}
              {question.user_answer === null ? (
                <p className="text-gray-600">Your answer will be revealed after submission.</p>
              ) : (
                <div>
                  <p className="text-green-600">Your Answer: {question.user_answer}</p>
                  <p className="text-blue-600">Correct Answer: {question.correct_answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AssessmentComponent;




