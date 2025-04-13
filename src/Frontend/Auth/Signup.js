// src/Frontend/Auth/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'customer' // Default role
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { signup, loading, error, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!form.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!form.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user types
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Create user data object from form
      const userData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        role: form.role === 'admin' ? 'admin' : 'customer'
      };
      
      console.log('Submitting signup with data:', userData);
      
      // Call signup function from AuthContext
      await signup(userData);
      
      // Success will be handled by the AuthContext
      // If we get here without errors, show success message
      alert('Account created successfully! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      // Error is handled by the AuthContext
      console.error('Signup error:', err);
    }
  };

  // Admin code for testing - in production this would be more secure
  const [adminCode, setAdminCode] = useState('');
  const [showAdminField, setShowAdminField] = useState(false);
  
  const toggleAdminField = () => {
    setShowAdminField(!showAdminField);
    if (!showAdminField) {
      setForm(prev => ({ ...prev, role: 'customer' }));
    }
  };
  
  const handleAdminCodeChange = (e) => {
    setAdminCode(e.target.value);
    // Simple admin code check - in production use a more secure method
    if (e.target.value === 'admin123') {
      setForm(prev => ({ ...prev, role: 'admin' }));
    } else {
      setForm(prev => ({ ...prev, role: 'customer' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join us to explore our beauty products!</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName" 
                placeholder="Enter your first name" 
                value={form.firstName}
                onChange={handleChange} 
                className={formErrors.firstName ? 'error' : ''}
              />
              {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName" 
                placeholder="Enter your last name" 
                value={form.lastName}
                onChange={handleChange} 
                className={formErrors.lastName ? 'error' : ''}
              />
              {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              placeholder="Enter your email" 
              value={form.email}
              onChange={handleChange} 
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number (Optional)</label>
            <input 
              type="tel" 
              id="phoneNumber"
              name="phoneNumber" 
              placeholder="Enter your phone number" 
              value={form.phoneNumber}
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Create a password" 
              value={form.password}
              onChange={handleChange} 
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              placeholder="Confirm your password" 
              value={form.confirmPassword}
              onChange={handleChange} 
              className={formErrors.confirmPassword ? 'error' : ''}
            />
            {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
          </div>
          
          <div className="admin-toggle">
            <button 
              type="button" 
              className="admin-toggle-button" 
              onClick={toggleAdminField}
            >
              {showAdminField ? 'Register as Customer' : 'Register as Admin'}
            </button>
          </div>
          
          {showAdminField && (
            <div className="form-group">
              <label htmlFor="adminCode">Admin Code</label>
              <input 
                type="password" 
                id="adminCode"
                placeholder="Enter admin code" 
                value={adminCode}
                onChange={handleAdminCodeChange} 
              />
              <span className="admin-note">Current role: {form.role}</span>
            </div>
          )}
          
          <div className="form-terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></label>
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
