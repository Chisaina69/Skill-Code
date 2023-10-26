import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleLoginClick = (type) => {
    setUserType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType) {
      console.log(`Logging in as a ${userType}:
        Email: ${formData.email}
        Password: ${formData.password}`);

      
      navigate('/');
    }
  };

  return (
    <div className="centered-container">
      <h2>Login</h2>
      {userType === null ? (
        <div>
          <select onChange={(e) => handleLoginClick(e.target.value)}>
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <button type="button" onClick={handleBack}>Back to Home</button>
        </form>
      )}
    </div>
  );
};

export default Login;
