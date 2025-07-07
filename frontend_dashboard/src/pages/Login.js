import React, { useState } from 'react';
import { inputStyle, mainBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function Login({ handleLogin }) {
  /**
   * Login page component for user authentication
   * @param {Function} handleLogin - Function to handle login submission
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        maxWidth: 340,
        margin: "80px auto 0 auto",
        background: "var(--bg-secondary)",
        borderRadius: 12,
        boxShadow: "0 6px 32px #0001",
        padding: "38px 36px",
      }}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        Employee Attendance Tracker
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(username, password);
        }}
      >
        <div style={{ marginBottom: 18 }}>
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
        <div style={{ marginBottom: 20 }}>
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
        <button style={mainBtnStyle} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
