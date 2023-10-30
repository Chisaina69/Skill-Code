import React, { useEffect, useState } from "react";

function AssessmentComponent() {
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/assessments")
      .then((response) => response.json())
      .then((data) => {
        setAssessmentData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!assessmentData || !assessmentData.questions || !Array.isArray(assessmentData.questions) || assessmentData.questions.length === 0) {
    return <div>No assessment questions available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">
        Assessment Questions
      </h1>
      <div className="flex flex-wrap -m-4">
        {assessmentData.questions.map((question, index) => (
          <div key={index} className="p-4 w-1/2">
            <div className="bg-orange-500 p-4 rounded-lg shadow-md hover:bg-orange-600 cursor-pointer">
              <h2 className="text-white text-lg font-semibold">
                {question.text}
              </h2>
              <ul className="mt-2">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="text-gray-700">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssessmentComponent;

