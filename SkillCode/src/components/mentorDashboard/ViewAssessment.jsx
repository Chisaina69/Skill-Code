import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AssessmentDetails.css';

const ViewAssessment = () => {
    const [assessment, setAssessment] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        navigate('/assessment')
    };

    console.log("assessmentId", id)


    useEffect(() => {

        const fetchAssessmentDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/SkillCode/assessments/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setAssessment(data);
                    console.log(data)
                } else {
                    throw new Error('Failed to fetch assessment details');
                }
            } catch (error) {
                console.error('Error fetching assessment details:', error);

            }
        };

        fetchAssessmentDetails();
    }, [id]);


    if (!assessment) {
        return null;
    }

    return (

        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="modal-header">
                    <h2>{assessment.title}</h2>
                    <p>Description: {assessment.description}</p>
                </div>
                <h3>Questions</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Options</th>
                            <th>Correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessment.questions.map(question => (
                            <tr key={question.id}>
                                <td>{question.text}</td>
                                <td>
                                    {question.options[0].split('\n').map((option, index) => (
                                        <tr key={index}>
                                            <td  >{option}</td>
                                        </tr>
                                    ))}
                                </td>
                                <td>{question.correct_answer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="back-btn" onClick={() => closeModal()}>
                    Back to Assessments
                </button>
            </div>
        </div>
    );
};

export default ViewAssessment;
