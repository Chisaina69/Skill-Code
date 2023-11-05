import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InviteStudents from './InviteStudents';


const Assessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // const { assessmentId } = useParams();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const endpoint = 'http://127.0.0.1:5000/SkillCode/assessments';
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.assessments)) {
            setAssessments(data.assessments);
          } else {
            throw new Error('Fetched data does not contain an "assessments" array');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []);

  console.log(assessments);



  const filteredAssessments = assessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleViewAssessment = assessmentId => {
    navigate(`/assessments/${assessmentId}`);

  };

  const handleInviteStudents = assessmentId => {
    // Pass the assessment ID to the InviteStudents component
    navigate(`/invite-students/${assessmentId}`);
  };

  console.log(assessments)

  return (
    <>
      <div style={{ backgroundColor: '#15284C', padding: '20px' }}>
        <h1 style={{ color: '#faa307' }}>Your Assessmets</h1>
        <Link to="/create-assessment">
          <button style={{ backgroundColor: '#faa307', color: '#15284C', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Create Assessment</button>
        </Link>
      </div>

      <div className='assessment-search' style={{ padding: '20px' }}>
        <input
          type='text'
          placeholder='Search assessments...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderColor: '#15284C',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            color: '#15284C',
            borderRadius: '8px',
            border: '2px solid #15284C',
            outline: 'none',
            width: '100%',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', border: '2px solid #15284C' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#faa307', color: '#15284C', padding: '10px' }}>ID</th>
            <th style={{ backgroundColor: '#faa307', color: '#15284C', padding: '10px' }}>Title</th>
            <th style={{ backgroundColor: '#faa307', color: '#15284C', padding: '10px' }}>Number of Questions</th>
            <th style={{ backgroundColor: '#faa307', color: '#15284C', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssessments.map(assessment => (
            <tr key={assessment.id} style={{ backgroundColor: '#f5f5f5' }}>
              <td style={{ color: '#15284C', padding: '10px', border: '1px solid #15284C', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{assessment.id}</td>
              <td style={{ color: '#15284C', padding: '10px', border: '1px solid #15284C', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{assessment.title}</td>
              <td style={{ color: '#15284C', padding: '10px', border: '1px solid #15284C', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{assessment.questions_count}</td>
              <td style={{ color: '#15284C', padding: '10px', border: '1px solid #15284C', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <button
                  style={{ backgroundColor: '#15284C', color: '#faa307', padding: '8px 12px', border: 'none', cursor: 'pointer', borderRadius: '5px', marginRight: '5px' }}
                  onClick={() => handleInviteStudents(assessment.id)}
                >
                  Invite Students</button>
                <button
                  style={{ backgroundColor: '#15284C', color: '#faa307', padding: '8px 12px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
                  onClick={() => handleViewAssessment(assessment.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </>
  );
};

export default Assessment;
