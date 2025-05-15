// components/Header1.jsx
import React from 'react';
import './header1.css';

const Header1 = () => {
  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = "/login";
  };

  return (
    <div className="header1">
      <div className="spacer" /> {/* Flexible space pushes logout to the right */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header1;
