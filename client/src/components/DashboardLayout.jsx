import React from 'react';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <div className="main-panel">
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
