import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ match }) => {
    const [mentor, setMentor] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/SkillCode/mentors/${1}`)
            .then(response => {
                setMentor(response.data);
            })
            .catch(error => {
                console.log(error);
                setError(true); // Set error state to true for error handling
            });
    }, []);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#15284C' }}>
            <h1 style={{ color: '#15284C', textAlign: 'center', borderBottom: '2px solid #15284C' }}>Mentor Profile</h1>
            {error ? (
                <p style={{ color: '#faa307', textAlign: 'center' }}>Error: Unable to fetch mentor data. Please try again later.</p>
            ) : mentor ? (
                <div>
                    <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '2px solid #15284C' }}>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #15284C', padding: '10px' }}>ID</td>
                                <td style={{ border: '1px solid #15284C', padding: '10px' }}>{mentor.id}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #15284C', padding: '10px' }}>Name</td>
                                <td style={{ border: '1px solid #15284C', padding: '10px' }}>{mentor.name}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #15284C', padding: '10px' }}>Email</td>
                                <td style={{ border: '1px solid #15284C', padding: '10px' }}>{mentor.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 style={{ color: '#15284C', textAlign: 'center' }}>Assessments</h2>
                    {mentor.assessments && mentor.assessments.length > 0 ? (
                        <table style={{ border: '1px solid #15284C', borderCollapse: 'collapse', width: '100%', margin: '20px auto' }}>
                            <thead>
                                <tr style={{ background: '#faa307', color: '#15284C' }}>
                                    <th style={{ border: '1px solid #15284C', padding: '8px' }}>Assessment ID</th>
                                    <th style={{ border: '1px solid #15284C', padding: '8px' }}>Title</th>
                                    <th style={{ border: '1px solid #15284C', padding: '8px' }}>Number of Questions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mentor.assessments.map(assessment => (
                                    <tr key={assessment.id}>
                                        <td style={{ border: '1px solid #15284C', padding: '8px' }}>{assessment.id}</td>
                                        <td style={{ border: '1px solid #15284C', padding: '8px' }}>{assessment.title}</td>
                                        <td style={{ border: '1px solid #15284C', padding: '8px' }}>{assessment.questions_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: 'center' }}>No assessments found.</p>
                    )}
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
