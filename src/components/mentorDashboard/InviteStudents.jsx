import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AssessmentDetails.css';
import NavBar from './Navbar';

const InviteStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://skill-code.onrender.com//SkillCode/students');
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleCheckboxChange = (email) => {
    const updatedSelected = [...selectedStudents];
    if (updatedSelected.includes(email)) {
      const index = updatedSelected.indexOf(email);
      updatedSelected.splice(index, 1);
    } else {
      updatedSelected.push(email);
    }
    setSelectedStudents(updatedSelected);
  };

  const handleInvite = async () => {
    try {
      const response = await fetch('/api/SkillCode/assessments/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          assessment_id: id,
          student_emails: selectedStudents,
          message: message,
        }),
      });

      if (response.ok) {
        console.log('Students invited to the assessment successfully');
        alert('Students invited to the assessment successfully!');
        // Handle success, e.g., show a success message to the user
      } else {
        const errorData = await response.json();
        console.error('Failed to invite students:', errorData.error);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Failed to invite students:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className='flex'>
      <NavBar />
      <div className='invite-content'>
        <h1 className='font-medium text-white font-sans text-lg bg-blue-950'>Invite Students to Assessment</h1>
        <div className='invite-form'>
          <label className='message-field'>
            Message:
            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <div className='invite-tools'>
            <input
              type='text'
              placeholder='Search by Email'
              onChange={(e) => {
                // Filter students as user types in the input field
                const searchTerm = e.target.value.toLowerCase();
                const filteredStudents = students.filter((student) =>
                  student.email.toLowerCase().includes(searchTerm)
                );
                setStudents(filteredStudents);
              }}
            />
            <button className='invite-button font-medium text-white font-sans bg-blue-950' onClick={handleInvite}>
              Invite
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th className='font-medium text-white font-sans text-lg bg-orange-600'>Name</th>
                <th className='font-medium text-white font-sans text-lg bg-orange-600'>Email</th>
                <th className='font-medium text-white font-sans text-lg bg-orange-600'>Select</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <input
                      type='checkbox'
                      onChange={() => handleCheckboxChange(student.email)}
                      checked={selectedStudents.includes(student.email)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InviteStudents;
