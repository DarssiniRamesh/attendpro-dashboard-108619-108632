import React, { useState } from 'react';
import { inputStyle, mainBtnStyle, secBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function Login({ handleLogin, setView }) {
  /**
   * Login page component for user authentication
   * @param {Function} handleLogin - Function to handle login submission
   * @param {Function} setView - Function to switch between login and register views
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const success = handleLogin(username, password);
    if (!success) {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        maxWidth: 380,
        margin: "80px auto 0 auto",
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
        AttendPro
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: 32,
          textAlign: "center",
          fontSize: 14,
        }}
      >
        Employee Attendance Tracker
      </p>
      
      {error && (
        <div style={{
          background: 'rgba(211, 47, 47, 0.1)',
          color: '#d32f2f',
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14,
          textAlign: 'center',
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            autoFocus
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={inputStyle}
            autoComplete="username"
            required
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
            required
          />
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
          Login
        </button>
        
        <button 
          type="button"
          style={{
            ...secBtnStyle,
            width: '100%',
            marginTop: 0,
            marginRight: 0,
          }}
          onClick={() => setView('register')}
        >
          Don't have an account? Sign Up
        </button>
      </form>
      
      <div style={{
        marginTop: 24,
        padding: '16px',
        background: 'rgba(25, 118, 210, 0.1)',
        borderRadius: 8,
        fontSize: 12,
        color: 'var(--text-secondary)',
      }}>
        <strong>Demo Accounts:</strong><br />
        Employee: alice / 1234<br />
        Admin: carol / admin
      </div>
    </div>
  );
}

export default Login;
