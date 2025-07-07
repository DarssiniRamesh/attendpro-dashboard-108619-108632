import React, { useState } from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import { inputStyle, mainBtnStyle, secBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function Register({ handleRegister, setView }) {
  /**
   * Registration page component for user signup
   * @param {Function} handleRegister - Function to handle registration submission
   * @param {Function} setView - Function to switch between login and register views
   */
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Check if username already exists
    const existingUsers = loadFromLocal('users', []);
    const usernameExists = existingUsers.some(user => user.username === formData.username);
    
    if (usernameExists) {
      setErrors({ username: 'Username already exists' });
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: 'employee' // Default role for new registrations
    };
    
    // Save user to localStorage
    const updatedUsers = [...existingUsers, newUser];
    saveToLocal('users', updatedUsers);
    
    alert('Registration successful! Please login with your credentials.');
    setView('login');
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto 0 auto",
        background: "var(--bg-secondary)",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        padding: "32px 28px",
      }}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: "var(--font-weight-bold)",
          fontSize: "var(--font-size-2xl)",
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        Create Account
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: 24,
          textAlign: "center",
          fontSize: "var(--font-size-sm)",
        }}
      >
        Join the AttendPro team
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            required
          />
          {errors.name && (
            <span className="form-error">
              {errors.name}
            </span>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`form-input ${errors.username ? 'error' : ''}`}
            required
          />
          {errors.username && (
            <span className="form-error">
              {errors.username}
            </span>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            required
          />
          {errors.email && (
            <span className="form-error">
              {errors.email}
            </span>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
            required
          />
          {errors.password && (
            <span className="form-error">
              {errors.password}
            </span>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            required
          />
          {errors.confirmPassword && (
            <span className="form-error">
              {errors.confirmPassword}
            </span>
          )}
        </div>
        
        <div className="form-button-group">
          <button 
            className="form-button primary"
            style={{ width: '100%' }}
            type="submit"
          >
            Create Account
          </button>
        </div>
        
        <button 
          type="button"
          className="form-button secondary"
          style={{
            width: '100%',
            marginTop: 12,
          }}
          onClick={() => setView('login')}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default Register;
