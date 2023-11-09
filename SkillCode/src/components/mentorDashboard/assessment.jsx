import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import NavBar from './Navbar';

const Assessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const endpoint = 'api/SkillCode/assessments';
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
    <div className='flex' >
      <NavBar />
      <div className='flex-column'>
      <div >
        <h1 className='font-medium  font-sans text-lg p-10 py-1 px-10 bg-orange-600 rounded inline-block mt-11 text-white w-full text-center '>Assessmets</h1>
        <Link to="/create-assessment">
          <button className='font-medium  font-sans text-lg p-10 py-1 px-10 bg-blue-950 rounded inline-block mt-11 text-white w- text-center'> + Create Assessment</button>
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

      <table className='table-auto border '>
        <thead>
          <tr>
            <th className='font-medium text-white font-sans text-lg bg-blue-950 '>ID</th>
            <th className='font-medium text-white font-sans text-lg bg-blue-950' >Title</th>
            <th className='font-medium text-white font-sans text-lg bg-blue-950'>Number of Questions</th>
            <th className='font-medium text-white font-sans text-lg bg-blue-950'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssessments.map(assessment => (
            <tr key={assessment.id} style={{ backgroundColor: '#f5f5f5' }}>
              <td >{assessment.id}</td>
              <td >{assessment.title}</td>
              <td >{assessment.questions_count}</td>
              <td >
                <button
                  className="bg-orange-600 text-white py-2 px-3 rounded-md cursor-pointer mr-1 font-semibold"
                  onClick={() => handleInviteStudents(assessment.id)}
                >
                  Invite Students</button>
                <button
                  className="bg-blue-950 text-white py-2 px-3 rounded-md cursor-pointer mr-1 font-semibold"
                  onClick={() => handleViewAssessment(assessment.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </div>
    </>
  );
};

export default Assessment;
