import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const SetupAdmin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/set-admin', { email });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to set user as admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-setup-container">
      <div className="admin-setup-box">
        <h2>Set User as Admin</h2>
        <p className="admin-setup-subtitle">
          Use this form to set an existing user account as an admin
        </p>

        {message && <div className="admin-setup-success">{message}</div>}
        {error && <div className="admin-setup-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the user's email address"
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-setup-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Set as Admin'}
          </button>
        </form>

        <div className="admin-setup-note">
          <p>
            <strong>Note:</strong> This will immediately update the user's role to admin.
            The user will need to log out and log back in for the changes to take effect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupAdmin;
