import React from 'react';

function SidebarButton({ label, onClick, active, style }) {
  return (
    <button
      onClick={onClick}
      className="sidebar-btn"
      style={{
        background: active ? "#1976d2" : "transparent",
        color: active ? "#fff" : "var(--text-primary)",
        border: "none",
        padding: "10px 24px",
        borderRadius: 6,
        textAlign: "left",
        fontWeight: 500,
        fontSize: 16,
        transition: "background 0.1s",
        margin: "3px 12px",
        cursor: "pointer",
        ...style,
      }}
    >
      {label}
    </button>
  );
}

// PUBLIC_INTERFACE
function Sidebar({ user, setView, handleLogout, view }) {
  /**
   * Sidebar navigation component for the application
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to set current view
   * @param {Function} handleLogout - Function to handle user logout
   * @param {string} view - Current active view
   */
  const navs =
    user.role === "admin"
      ? [
          { label: "Dashboard", view: "admin" },
          { label: "Leave Requests", view: "leave-requests" },
          { label: "Analytics", view: "analytics" },
        ]
      : [
          { label: "Dashboard", view: "user" },
          { label: "Attendance", view: "attendance" },
          { label: "Apply Leave", view: "apply-leave" },
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
        margin: "0 0 25px 22px",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: 2,
      }}>AttendPro</h2>
      <div style={{ flex: 1 }}>
        {navs.map(({ label, view: v }) => (
          <SidebarButton
            key={v}
            label={label}
            active={v === view}
            onClick={() => setView(v)}
          />
        ))}
      </div>
      <SidebarButton
        label="Logout"
        onClick={handleLogout}
        active={false}
        style={{ marginBottom: 28, color: "#d32f2f" }}
      />
      <div style={{ fontSize: 13, color: "var(--text-secondary)", margin: "12px" }}>
        <strong>{user.name}</strong><br />({user.role})
      </div>
    </nav>
  );
}

export default Sidebar;
