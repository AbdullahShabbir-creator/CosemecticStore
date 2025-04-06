// src/Frontend/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/'); // redirect to home or dashboard
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
