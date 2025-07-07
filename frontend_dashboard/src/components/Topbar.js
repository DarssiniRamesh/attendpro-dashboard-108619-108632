import React from 'react';
import MobileMenu from './MobileMenu';

// PUBLIC_INTERFACE
function Topbar({ theme, toggleTheme, user, setView, handleLogout, view }) {
  /**
   * Top navigation bar component with theme toggle and mobile menu
   * @param {string} theme - Current theme (light/dark)
   * @param {Function} toggleTheme - Function to toggle theme
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to set current view
   * @param {Function} handleLogout - Function to handle logout
   * @param {string} view - Current active view
   */
  return (
    <header className="App-header" style={{ 
      minHeight: 0, 
      marginBottom: 0, 
      padding: "0 20px", 
      background: "var(--bg-secondary)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <MobileMenu 
        user={user} 
        setView={setView} 
        handleLogout={handleLogout} 
        view={view} 
      />
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
