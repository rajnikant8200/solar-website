import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust path if Sidebar is elsewhere
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    notifications: true,
    theme: 'light',
    language: 'English',
    password: '',
    newPassword: '',
    profilePicture: null,
    twoStepVerification: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setFormData({
        ...formData,
        ...parsedSettings,
        profilePicture: null,
        password: '',
        newPassword: '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password) {
      alert('Please enter your current password.');
      return;
    }

    const toSave = {
      userId: formData.userId,
      username: formData.username,
      email: formData.email,
      notifications: formData.notifications,
      theme: formData.theme,
      language: formData.language,
      twoStepVerification: formData.twoStepVerification,
    };

    localStorage.setItem('userSettings', JSON.stringify(toSave));

    setFormData(prev => ({
      ...prev,
      password: '',
      newPassword: '',
      profilePicture: null,
    }));

    alert('✅ Settings saved locally (no backend).');
  };

  return (
    <div className="settings-page">
      <Sidebar />
      <div className="settings-container">
        <div className="settings-header">
          <h2>Settings</h2>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-section">
            <h3>Profile Settings</h3>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
              />
              {formData.profilePicture && (
                <p>Selected file: {formData.profilePicture.name}</p>
              )}
            </div>
          </div>

          <div className="settings-section">
            <h3>Account Settings</h3>
            <div className="input-group">
              <label htmlFor="theme">Theme:</label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="language">Language Preference:</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Security Settings</h3>
            <div className="input-group">
              <label htmlFor="password">Current Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="twoStepVerification">Enable Two-Step Verification:</label>
              <input
                type="checkbox"
                id="twoStepVerification"
                name="twoStepVerification"
                checked={formData.twoStepVerification}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="buttons">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
