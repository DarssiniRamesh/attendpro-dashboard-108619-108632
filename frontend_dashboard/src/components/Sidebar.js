import React from 'react';

function SidebarButton({ label, onClick, active, style, icon, isIconOnly }) {
  return (
    <button
      onClick={onClick}
      className="sidebar-btn"
      style={{
        background: active ? "#1976d2" : "transparent",
        color: active ? "#fff" : "var(--text-primary)",
        border: "none",
        padding: isIconOnly ? "12px" : "12px 24px",
        borderRadius: 8,
        textAlign: "left",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-base)",
        lineHeight: "var(--line-height-normal)",
        transition: "all 0.2s ease",
        margin: "4px 12px",
        cursor: "pointer",
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
        gap: icon ? "12px" : "0",
        justifyContent: isIconOnly ? "center" : "flex-start",
        ...style,
      }}
    >
      {icon && (
        <span style={{ 
          fontSize: isIconOnly ? "20px" : "16px",
          minWidth: "20px",
          textAlign: "center"
        }}>
          {icon}
        </span>
      )}
      {!isIconOnly && label}
    </button>
  );
}

// PUBLIC_INTERFACE
function Sidebar({ user, setView, handleLogout, view, theme, toggleTheme }) {
  /**
   * Sidebar navigation component with theme toggle and logout controls
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to set current view
   * @param {Function} handleLogout - Function to handle user logout
   * @param {string} view - Current active view
   * @param {string} theme - Current theme (light/dark)
   * @param {Function} toggleTheme - Function to toggle theme
   */
  const navs =
    user.role === "admin"
      ? [
          { label: "Dashboard", view: "admin", icon: "📊" },
          { label: "Leave Requests", view: "leave-requests", icon: "📋" },
          { label: "Analytics", view: "analytics", icon: "📈" },
        ]
      : [
          { label: "Dashboard", view: "user", icon: "🏠" },
          { label: "Attendance", view: "attendance", icon: "📅" },
          { label: "Apply Leave", view: "apply-leave", icon: "🏖️" },
        ];

  return (
    <nav
      className="sidebar"
      style={{
        width: 220,
        background: "var(--bg-secondary)",
        borderRight: "1.5px solid var(--border-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        paddingTop: "36px",
        gap: "6px",
        position: "relative",
        zIndex: 1000,
      }}
    >
      <h2 style={{
        color: "#1976d2", // primary
        margin: "0 0 28px 24px",
        fontWeight: "var(--font-weight-bold)",
        fontSize: "var(--font-size-xl)",
        letterSpacing: "0.5px",
        lineHeight: "var(--line-height-tight)",
      }}>AttendPro</h2>
      
      {/* Navigation Menu */}
      <div style={{ flex: 1 }}>
        {navs.map(({ label, view: v, icon }) => (
          <SidebarButton
            key={v}
            label={label}
            icon={icon}
            active={v === view}
            onClick={() => setView(v)}
          />
        ))}
      </div>
      
      {/* Controls Section */}
      <div style={{ 
        borderTop: "1px solid var(--border-light)",
        paddingTop: "16px",
        marginBottom: "16px"
      }}>
        {/* Theme Toggle and Logout Controls */}
        <div style={{ 
          display: "flex", 
          gap: "8px",
          margin: "0 12px 16px 12px"
        }}>
          <SidebarButton
            label="Toggle Theme"
            icon={theme === "light" ? "🌙" : "☀️"}
            onClick={toggleTheme}
            active={false}
            isIconOnly={true}
            style={{ 
              background: theme === "light" 
                ? "linear-gradient(135deg, #4a5568, #2d3748)" 
                : "linear-gradient(135deg, #fbb040, #f7931e)",
              color: theme === "light" ? "#ffffff" : "#1a202c",
              flex: 1,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "none"
            }}
          />
          <SidebarButton
            label="Logout"
            icon="🚪"
            onClick={handleLogout}
            active={false}
            isIconOnly={true}
            style={{ 
              background: "linear-gradient(135deg, #e53e3e, #c53030)",
              color: "#ffffff",
              flex: 1,
              boxShadow: "0 2px 8px rgba(229, 62, 62, 0.3)",
              border: "none"
            }}
          />
        </div>
        
        {/* User Info */}
        <div style={{ 
          fontSize: "var(--font-size-sm)", 
          color: "var(--text-secondary)", 
          margin: "0 20px 16px 20px",
          lineHeight: "var(--line-height-normal)",
          textAlign: "center"
        }}>
          <strong style={{ 
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--text-primary)"
          }}>
            {user.name}
          </strong><br />
          <span style={{ 
            fontSize: "var(--font-size-xs)",
            color: "var(--text-secondary)"
          }}>
            ({user.role})
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
