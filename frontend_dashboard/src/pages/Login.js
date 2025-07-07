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
        maxWidth: 360,
        margin: "60px auto 0 auto",
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
          marginBottom: 8,
          textAlign: "center",
          lineHeight: "var(--line-height-tight)",
        }}
      >
        AttendPro
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: 24,
          textAlign: "center",
          fontSize: "var(--font-size-sm)",
          lineHeight: "var(--line-height-normal)",
        }}
      >
        Employee Attendance Tracker
      </p>
      
      {error && (
        <div style={{
          background: 'rgba(211, 47, 47, 0.1)',
          color: '#d32f2f',
          padding: '10px 14px',
          borderRadius: 6,
          marginBottom: 16,
          fontSize: 13,
          textAlign: 'center',
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            autoFocus
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="form-input"
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-input"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="form-button-group">
          <button 
            className="form-button primary"
            style={{ width: '100%' }}
            type="submit"
          >
            Login
          </button>
        </div>
        
        <button 
          type="button"
          className="form-button secondary"
          style={{
            width: '100%',
            marginTop: 12,
          }}
          onClick={() => setView('register')}
        >
          Don't have an account? Sign Up
        </button>
      </form>
      
      <div style={{
        marginTop: 20,
        padding: '14px',
        background: 'rgba(25, 118, 210, 0.1)',
        borderRadius: 8,
        fontSize: "var(--font-size-xs)",
        color: 'var(--text-secondary)',
        lineHeight: "var(--line-height-relaxed)",
      }}>
        <strong style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--text-primary)" }}>
          Demo Accounts:
        </strong><br />
        <span style={{ fontFamily: "monospace", fontSize: "var(--font-size-xs)" }}>
          Employee: alice / 1234<br />
          <strong style={{ color: "var(--text-accent)" }}>Demo Employee: demoemp / employee</strong><br />
          Admin: carol / admin<br />
          <strong style={{ color: "var(--text-accent)" }}>Demo Admin: demo_admin / Demo@123</strong>
        </span>
      </div>
    </div>
  );
}

export default Login;
