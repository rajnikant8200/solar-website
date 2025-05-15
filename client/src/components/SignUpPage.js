import React, { useState } from 'react';
import './login.css'; // Reuse the same styling as LoginPage
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password
      };

      const res = await axios.post('http://localhost:5000/register', payload);
      alert(res.data.message);

      // Optionally redirect to login after signup
      if (res.data.success) {
        navigate('/login');
      }

    } catch (err) {
      console.error('❌ Signup Error:', err);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
        <div className="login-links">
          <a href="/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
