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
        padding: "12px 24px",
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
        margin: "0 0 28px 24px",
        fontWeight: "var(--font-weight-bold)",
        fontSize: "var(--font-size-xl)",
        letterSpacing: "0.5px",
        lineHeight: "var(--line-height-tight)",
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
      <div style={{ 
        fontSize: "var(--font-size-sm)", 
        color: "var(--text-secondary)", 
        margin: "16px 20px",
        lineHeight: "var(--line-height-normal)"
      }}>
        <strong style={{ fontWeight: "var(--font-weight-semibold)" }}>
          {user.name}
        </strong><br />
        <span style={{ fontSize: "var(--font-size-xs)" }}>({user.role})</span>
      </div>
    </nav>
  );
}

export default Sidebar;
