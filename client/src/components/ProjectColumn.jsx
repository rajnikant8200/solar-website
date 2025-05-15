import React from 'react';
import './ProjectColumn.css';

const ProjectColumn = ({ title, projects, onProjectClick }) => {
  return (
    <div className="project-column">
      <h3>{title}</h3>
      {projects.map(project => (
        <div
          key={project._id}
          className="project-card styled-card"
          onClick={() => onProjectClick(project)}
        >
          <div className="card-header">
            <strong>{project.name}</strong>
            <span className="card-date">{new Date(project.date).toDateString()}</span>
          </div>
          <div className="card-type-badge">{project.type}</div>
          <div className="card-footer">
            <span className="card-id">{project.code}</span>
            <span className="card-circle">raynex</span>
            <span className="card-kw">{project.kw} KW</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectColumn;
