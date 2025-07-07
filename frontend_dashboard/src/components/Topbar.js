import React from 'react';
import MobileMenu from './MobileMenu';

// PUBLIC_INTERFACE
function Topbar({ theme, toggleTheme, user, setView, handleLogout, view }) {
  /**
   * Top navigation bar component with theme toggle, logout button, and mobile menu
   * @param {string} theme - Current theme (light/dark)
   * @param {Function} toggleTheme - Function to toggle theme
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to set current view
   * @param {Function} handleLogout - Function to handle logout
   * @param {string} view - Current active view
   */
  
  const buttonBaseStyle = {
    border: "none",
    borderRadius: "12px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden"
  };

  const themeToggleStyle = {
    ...buttonBaseStyle,
    background: theme === "light" 
      ? "linear-gradient(135deg, #4a5568, #2d3748)" 
      : "linear-gradient(135deg, #fbb040, #f7931e)",
    color: theme === "light" ? "#ffffff" : "#1a202c",
    marginRight: "8px"
  };

  const logoutButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #e53e3e, #c53030)",
    color: "#ffffff"
  };

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
      
      {/* User Controls - only show when user is logged in */}
      {user && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <button
            style={themeToggleStyle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <span style={{ fontSize: "16px" }}>
              {theme === "light" ? "🌙" : "☀️"}
            </span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>
          
          <button
            style={logoutButtonStyle}
            onClick={handleLogout}
            aria-label="Logout"
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(229, 62, 62, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <span style={{ fontSize: "16px" }}>🚪</span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>
              Logout
            </span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Topbar;
