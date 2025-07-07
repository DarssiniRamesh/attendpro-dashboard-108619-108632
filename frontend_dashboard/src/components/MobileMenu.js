import React, { useState } from 'react';

// PUBLIC_INTERFACE
function MobileMenu({ user, setView, handleLogout, view, theme, toggleTheme }) {
  /**
   * Mobile hamburger menu component for responsive navigation
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to set current view
   * @param {Function} handleLogout - Function to handle user logout
   * @param {string} view - Current active view
   * @param {string} theme - Current theme (light/dark)
   * @param {Function} toggleTheme - Function to toggle theme
   */
  const [isOpen, setIsOpen] = useState(false);

  const navs = user?.role === "admin"
    ? [
        { label: "📊 Dashboard", view: "admin" },
        { label: "📋 Leave Requests", view: "leave-requests" },
        { label: "📈 Analytics", view: "analytics" },
      ]
    : [
        { label: "🏠 Dashboard", view: "user" },
        { label: "📅 Attendance", view: "attendance" },
        { label: "🏖️ Apply Leave", view: "apply-leave" },
      ];

  const handleNavClick = (navView) => {
    setView(navView);
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <>
      <button
        style={{
          display: "none",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "var(--text-primary)",
          padding: "8px"
        }}
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {isOpen && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "none"
          }}
          className="mobile-menu-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? 0 : -280,
          width: 280,
          height: "100vh",
          background: "var(--bg-secondary)",
          zIndex: 1001,
          transition: "left 0.3s ease",
          display: "none",
          flexDirection: "column",
          padding: "20px 0"
        }}
        className="mobile-menu-sidebar"
      >
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "0 20px",
          marginBottom: "20px"
        }}>
          <h2 style={{
            color: "#1976d2",
            margin: 0,
            fontWeight: 700,
            fontSize: 18
          }}>
            AttendPro
          </h2>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "var(--text-primary)"
            }}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, paddingTop: "20px" }}>
          {navs.map(({ label, view: navView }) => (
            <button
              key={navView}
              style={{
                background: navView === view ? "#1976d2" : "transparent",
                color: navView === view ? "#fff" : "var(--text-primary)",
                border: "none",
                padding: "15px 20px",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: navView === view ? 600 : 400
              }}
              onClick={() => handleNavClick(navView)}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding: "20px" }}>
          <button
            style={{
              background: theme === "light" 
                ? "linear-gradient(135deg, #4a5568, #2d3748)" 
                : "linear-gradient(135deg, #fbb040, #f7931e)",
              color: theme === "light" ? "#ffffff" : "#1a202c",
              border: "none",
              padding: "12px 16px",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "8px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
          >
            <span>{theme === "light" ? "🌙" : "☀️"}</span>
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
          
          <button
            style={{
              background: "linear-gradient(135deg, #e53e3e, #c53030)",
              color: "#ffffff",
              border: "none",
              padding: "12px 16px",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onClick={handleLogoutClick}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
          
          <div style={{ 
            marginTop: "15px", 
            fontSize: "14px", 
            color: "var(--text-secondary)",
            textAlign: "center"
          }}>
            <strong>{user.name}</strong><br />
            ({user.role})
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block !important;
          }
          .mobile-menu-overlay {
            display: block !important;
          }
          .mobile-menu-sidebar {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

export default MobileMenu;
