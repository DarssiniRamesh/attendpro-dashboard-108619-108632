import React from 'react';

// PUBLIC_INTERFACE
function Topbar({ theme, toggleTheme }) {
  /**
   * Top navigation bar component with theme toggle
   * @param {string} theme - Current theme (light/dark)
   * @param {Function} toggleTheme - Function to toggle theme
   */
  return (
    <header className="App-header" style={{ minHeight: 0, marginBottom: 0, padding: 0, background: "var(--bg-secondary)" }}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}

export default Topbar;
