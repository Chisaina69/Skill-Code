import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

const ViewAssessment = () => {
  const [assessment, setAssessment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessmentDetails = async () => {
      try {
        const response = await fetch(`/api/SkillCode/assessments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAssessment(data);
        } else {
          throw new Error('Failed to fetch assessment details');
        }
      } catch (error) {
        console.error('Error fetching assessment details:', error);
      }
    };

    fetchAssessmentDetails();
  }, [id]);

  const closeModal = () => {
    navigate('/assessment');
  };

  if (!assessment) {
    return null;
  }

  return (
    <div className='flex'>
      <NavBar />
      <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <div className='modal-header'>
            <h2>{assessment.title}</h2>
            <p>Description: {assessment.description}</p>
          </div>
          <h3 className='font-medium text-white font-sans text-lg bg-orange-600 text-center'>Questions</h3>
          <table>
            <thead>
              <tr>
                <th className='font-medium text-white font-sans text-lg bg-blue-950'>Question</th>
                <th className='font-medium text-white font-sans text-lg bg-blue-950'>Options</th>
                <th className='font-medium text-white font-sans text-lg bg-blue-950'>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {assessment.questions.map(question => (
                <tr key={question.id}>
                  <td>{question.text}</td>
                  <td>
                    {question.options.map((option, index) => (
                      <div key={index}>{option}</div>
                    ))}
                  </td>
                  <td>{question.correct_answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='font-medium text-white font-sans text-lg bg-blue-950' onClick={closeModal}>
            Back to Assessments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAssessment;
