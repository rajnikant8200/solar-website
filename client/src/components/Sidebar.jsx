import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const sidebarItems = [
  { name: 'Projects', path: 'projects' },
  { name: 'Tasks', path: 'tasks' },
  { name: 'Settings', path: 'settings' }
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/dashboard/${path}`);
  };

  const handleLogout = () => {
    // Clear all local storage data (authentication/session tokens, etc.)
    localStorage.clear();

    // Navigate to login page
    navigate('/login');

    // Force reload to reset all component state
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <h1>Raynex Solar</h1>
      <ul>
        {sidebarItems.map(item => (
          <li key={item.path} onClick={() => handleNavigation(item.path)}>
            {item.name}
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
