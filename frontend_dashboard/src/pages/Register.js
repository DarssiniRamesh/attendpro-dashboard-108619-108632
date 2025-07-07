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
        maxWidth: 420,
        margin: "60px auto 0 auto",
        background: "var(--bg-secondary)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        padding: "40px 36px",
      }}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Create Account
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: 32,
          textAlign: "center",
          fontSize: 14,
        }}
      >
        Join the AttendPro team
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#d32f2f' : 'var(--border-color)',
            }}
            required
          />
          {errors.name && (
            <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 4 }}>
              {errors.name}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.username ? '#d32f2f' : 'var(--border-color)',
            }}
            required
          />
          {errors.username && (
            <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 4 }}>
              {errors.username}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#d32f2f' : 'var(--border-color)',
            }}
            required
          />
          {errors.email && (
            <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 4 }}>
              {errors.email}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.password ? '#d32f2f' : 'var(--border-color)',
            }}
            required
          />
          {errors.password && (
            <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 4 }}>
              {errors.password}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.confirmPassword ? '#d32f2f' : 'var(--border-color)',
            }}
            required
          />
          {errors.confirmPassword && (
            <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 4 }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>
        
        <button 
          style={{
            ...mainBtnStyle,
            width: '100%',
            marginBottom: 12,
            padding: '12px 20px',
            fontSize: 16,
          }} 
          type="submit"
        >
          Create Account
        </button>
        
        <button 
          type="button"
          style={{
            ...secBtnStyle,
            width: '100%',
            marginTop: 0,
            marginRight: 0,
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
