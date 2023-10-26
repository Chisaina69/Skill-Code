import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>SkillCode</h1>
      <nav className="nav">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

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

const JoinUsButton = () => {
  return (
    <button className="join-us-btn">
      Join <span className="join-us-text">Us</span>
    </button>
  );
};

const Copyright = () => {
  return (
    <div className="copyright">
      <p>&copy; Copyright @ 2023 SkillCode. All Rights Reserved.</p>
    </div>
  );
};

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
