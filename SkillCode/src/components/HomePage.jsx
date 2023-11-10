// Importing necessary modules from React and React Router DOM

import React from 'react';
import { Link } from 'react-router-dom';

//Header component
const Header = () => {
  return (
    <header className="header">
      <h1>SkillCode</h1>
      <nav className="nav">
        {/* Links to the Login and Register pages */}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

//Text component
const Text = () => {
  return (
    <div className="centered-text">
      <h1>      
        <span className="highlight">Unleash Your Coding </span>
        <br />
        <span className="highlight-two">Potential With</span>
        <br />
        <span className="highlight-two">Engaging Challenges</span>
        <br />      
        Elevate Your Skills One Line at a Time
      </h1>
    </div>
  );
};

//JoinUsButton component
const JoinUsButton = () => {
  return (
    <button className="join-us-btn">
      Join <span className="join-us-text">Us</span>
    </button>
  );
};

//Copyright component
const Copyright = () => {
  return (
    <div className="copyright">
      <p>&copy; Copyright @ 2023 SkillCode. All Rights Reserved.</p>
    </div>
  );
};

//HomePage component
const HomePage = () => {
  return (
    <div> 
      <Header />     
      <Text />     
      <JoinUsButton />     
      <Copyright />
    </div>
  );
};


export default HomePage;