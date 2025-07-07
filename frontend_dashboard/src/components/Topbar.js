import React from 'react';
import MobileMenu from './MobileMenu';

// PUBLIC_INTERFACE
function Topbar({ theme, toggleTheme, user, setView, handleLogout, view }) {
  /**
   * Top navigation bar component with mobile menu - theme toggle and logout moved to sidebar
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
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      {/* Empty space for future content or branding */}
      <div style={{ flex: 1 }}></div>
    </header>
  );
}

export default Topbar;
