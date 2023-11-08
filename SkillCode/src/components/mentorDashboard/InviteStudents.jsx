import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AssessmentDetails.css';

const InviteStudents = ({ assessmentId }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [filteredStudents, setFilteredStudents] = useState([]);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
    console.log('invite', id);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('api/SkillCode/students');

                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                    setFilteredStudents(data); // Set initial data to filteredStudents
                } else {
                    console.error('Failed to fetch students');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);
    const handleInvite = async () => {
        const data = { assessment_id: id, student_emails: selectedStudents, message: message };
        await sendBulkInvite(data);
    }

    const handleStudentFilter = (searchTerm) => {
        const filtered = students.filter((student) =>
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

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


    const sendBulkInvite = async (data) => {
        try {
            const response = await fetch('api/SkillCode/assessments/bulk_invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Students invited to the assessment successfully');
            } else {
                const errorData = await response.json();
                console.error('Failed to invite students:', errorData.error);
            }
        } catch (error) {
            console.error('Failed to invite students:', error);
        }
    };


    return (
        <div>
           

            <div className="invite-content">
            <h1 className='font-medium text-white font-sans text-lg bg-blue-950'>Invite Students to Assessment</h1>
                <div className="invite-form">
                    <label className="message-field">
                        Message:
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </label>
                    <div className='invite-tools'>
                        <div>
                            <input
                                type="text"
                                placeholder="Search by Email"
                                onChange={(e) => handleStudentFilter(e.target.value)}
                            />
                        </div>
                        <div>
                        <button className="invite-button font-medium text-white font-sans  bg-blue-950" onClick={handleInvite}>
                            Invite
                        </button>
                        </div>


                    </div>


                    <table>
                        <thead>
                            <tr>
                                <th className='font-medium text-white font-sans text-lg bg-orange-600 ' >Name</th>
                                <th className='font-medium text-white font-sans text-lg bg-orange-600 ' >Email</th>
                                <th className='font-medium text-white font-sans text-lg bg-orange-600 '>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.student_id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <input
                                            type="checkbox"
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