import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setFormData({
      ...formData,
      role: type
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType) {
      console.log(`Registering user as a ${userType}:
        Name: ${formData.name}
        Email: ${formData.email}
        Password: ${formData.password}`);

      navigate('/');
    }
  };

  return (
    <div className="centered-container">
      <h2>Register</h2>
      {userType === null ? (
        <div>
          <p>Are you registering as a student or mentor?</p>
          <button
            type="button"
            onClick={() => handleUserTypeSelection('student')}
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
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
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
      <button onClick={handleBack}>Back to Home</button>
    </div>
  );
};

export default Register;
