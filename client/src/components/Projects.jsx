// components/Projects.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ProjectColumn from './ProjectColumn';
import './Projects.css';

const Projects = () => {
  const [data, setData] = useState({ preQualified: [], enquiry: [], quotation: [], design: [] });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    code: '',
    kw: '',
    status: 'preQualified'
  });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(projects => {
        const categorized = { preQualified: [], enquiry: [], quotation: [], design: [] };
        projects.forEach(proj => {
          if (categorized[proj.status]) categorized[proj.status].push(proj);
        });
        setData(categorized);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('modal-open', showForm);
  }, [showForm]);

  const filterProjects = (projects) => {
    return projects.filter(proj =>
      proj.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({
      status: project.status
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.status) {
      setError('Status is required!');
      return;
    }

    let newCode = formData.code;

    if (!editingProject) {
      const totalProjects = Object.values(data).flat().length + 1;
      const paddedNumber = String(totalProjects).padStart(2, '0');
      newCode = `ray-${paddedNumber}`;
    }

    const payload = editingProject
      ? { status: formData.status }
      : {
          ...formData,
          code: newCode,
          date: formData.date.split('T')[0]
        };

    const request = editingProject
      ? fetch(`http://localhost:5000/api/projects/${editingProject._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      : fetch('http://localhost:5000/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

    request
      .then(res => {
        if (!res.ok) throw new Error('Failed to save project');
        return res.json();
      })
      .then(() => {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
          name: '',
          type: '',
          date: '',
          code: '',
          kw: '',
          status: 'preQualified'
        });
        fetchData();
      })
      .catch(err => {
        setError('Failed to save project');
        console.error(err);
      });
  };

  const handleDelete = () => {
    if (!editingProject) return;

    if (!window.confirm("Are you sure you want to delete this project?")) return;

    fetch(`http://localhost:5000/api/projects/${editingProject._id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete project');
        return res.json();
      })
      .then(() => {
        setShowForm(false);
        setEditingProject(null);
        fetchData();
      })
      .catch(err => {
        setError('Failed to delete project');
        console.error(err);
      });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-panel">
        <div className="dashboard-header">
          <input
            type="text"
            placeholder="Search projects..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="add-project-btn" onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}>
            + Add Project
          </button>
        </div>

        <div className="columns-container">
          <ProjectColumn title="Pre Qualified" projects={filterProjects(data.preQualified)} onProjectClick={handleEditClick} />
          <ProjectColumn title="Enquiry" projects={filterProjects(data.enquiry)} onProjectClick={handleEditClick} />
          <ProjectColumn title="Quotation" projects={filterProjects(data.quotation)} onProjectClick={handleEditClick} />
          <ProjectColumn title="Design" projects={filterProjects(data.design)} onProjectClick={handleEditClick} />
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">⚠️ {error}</div>}

        {showForm && (
          <div className="modal">
            <form className="project-form" onSubmit={handleSubmit}>
              {editingProject ? (
                <>
                  <h3>Edit Project Status</h3>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="preQualified">Pre Qualified</option>
                    <option value="enquiry">Enquiry</option>
                    <option value="quotation">Quotation</option>
                    <option value="design">Design</option>
                  </select>
                </>
              ) : (
                <>
                  <h3>Add Project</h3>
                  <input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="residential">Residential</option>
                  </select>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <input
                    placeholder="Code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="KW"
                    value={formData.kw}
                    onChange={(e) => setFormData({ ...formData, kw: e.target.value })}
                    required
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="preQualified">Pre Qualified</option>
                    <option value="enquiry">Enquiry</option>
                    <option value="quotation">Quotation</option>
                    <option value="design">Design</option>
                  </select>
                </>
              )}
              <div className="form-buttons">
                {editingProject ? (
                  <>
                    <button type="submit">Update</button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                  </>
                ) : (
                  <>
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => {
                      setShowForm(false);
                      setEditingProject(null);
                    }}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
