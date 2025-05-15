import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Raynex</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/why-solar">Why Solar?</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact" >Contact Us</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li> 
      </ul>
    </nav>
  );
}

export default Navbar;
