//Importing necessary modules from React and React Router DOM

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Register component
const Register = () => {

//State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

//State to hold the selected user type (student or mentor)
  const [userType, setUserType] = useState(null);

//State to track the registration status (success or null)
  const [registrationStatus, setRegistrationStatus] = useState(null);

//Hook to navigate between routes
  const navigate = useNavigate();

//Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

//Function to handle navigation back to home page
  const handleBack = () => {
    navigate('/');
  };

//Function to handle user type selection (student or mentor)
  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setFormData({
      ...formData,
      role: type
    });
  };

//Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType) {
      const registerRoute = userType === 'mentor' ? 'api/mentors/signup' : 'api/students/signup';

      fetch(registerRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token);
          setRegistrationStatus('success');
        } else {
          alert(data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering.');
      });
    }
  };

//Function to handle clicking on the "Login" button
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="centered-container">
      <h2 style={{ color: 'white' }}>Register</h2>
      {registrationStatus === 'success' ? (
        <div>
          <p style={{ color: 'white' }}>You have Successfully created a SkillCode account!</p>
          <button onClick={handleLoginClick}>Proceed to Login</button>
        </div>
      ) : (
        <div>
          <p style={{ color: 'white' }}>Are you registering as a student or mentor?</p>
          <button
            type="button"
            onClick={() => handleUserTypeSelection('student')}
            style={{ marginRight: '50px' }} 
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeSelection('mentor')}
          >
            Mentor
          </button>
        </div>
      )}
      {userType !== null && registrationStatus !== 'success' && (
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ color: 'white' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ color: 'white' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ color: 'white' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleBack}>Back to Home</button>
      </div>
    </div>
  );
};


export default Register;
