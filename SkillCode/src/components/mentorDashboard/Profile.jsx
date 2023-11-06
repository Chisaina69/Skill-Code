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
        <div className='font-serif text-zinc-950' >
            <h1 className='font-medium  font-sans text-lg p-10 py-1 px-10 bg-orange-600 rounded inline-block mt-11 text-white w-full text-center'>Mentor Profile</h1>
            {error ? (
                <p className='text-zinc-950 font-semibold'>Error: Unable to fetch mentor data. Please try again later.</p>
            ) : mentor ? (
                <div className='p-10'>
                    <table className='table-auto'>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2" >ID</td>
                                <td className="px-4 py-2">{mentor.id}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2" >Name</td>
                                <td className="px-4 py-2">{mentor.name}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Email</td>
                                <td className="px-4 py-2">{mentor.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className='font-medium  font-sans text-lg p-10 py-1 px-10 bg-blue-950 rounded inline-block mt-11 text-white w-full text-center'>Assessments</h2>
                    {mentor.assessments && mentor.assessments.length > 0 ? (
                        <table className='table-auto border'>
                            <thead >
                                <tr  >
                                    <th className='font-medium text-white font-sans text-lg bg-orange-600 '>Assessment ID</th>
                                    <th className='font-medium text-white font-sans text-lg bg-orange-600'>Title</th>
                                    <th className='font-medium text-white font-sans text-lg bg-orange-600'>Number of Questions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mentor.assessments.map(assessment => (
                                    <tr key={assessment.id}>
                                        <td >{assessment.id}</td>
                                        <td >{assessment.title}</td>
                                        <td >{assessment.questions_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center'>No assessments found.</p>
                    )}
                </div>
            ) : (
                <p className='text-center'>Loading...</p>
            )}
        </div>
    );
};

export default Profile;