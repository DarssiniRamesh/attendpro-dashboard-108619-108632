import React from 'react';
import { loadFromLocal } from '../utils/localStorage';
import { dataTableStyle, secBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function AdminDashboard({ setView }) {
  /**
   * Admin dashboard page displaying employee management and analytics
   * @param {Function} setView - Function to navigate to different views
   */
  const users = loadFromLocal("users", []);
  const attendance = loadFromLocal("attendance", []);
  const leaves = loadFromLocal("leaves", []);
  
  // Calculate last status for each
  const today = (new Date()).toISOString().split("T")[0];
  
  return (
    <div>
      <h1 style={{ 
        color: "#1976d2", 
        fontSize: "var(--font-size-4xl)",
        fontWeight: "var(--font-weight-bold)",
        marginBottom: "28px",
        lineHeight: "var(--line-height-tight)"
      }}>Admin Dashboard</h1>
      <div className="dashboard-grid-4">
        <div className="dashboard-card">
          <div>
            <h3 style={{ 
              margin: 0, 
              marginBottom: 16,
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--text-primary)"
            }}>Total Employees</h3>
            <div style={{ 
              fontSize: "var(--font-size-4xl)", 
              color: "#1976d2", 
              fontWeight: "var(--font-weight-bold)",
              lineHeight: "var(--line-height-tight)"
            }}>
              {users.filter(u => u.role === "employee").length}
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 style={{ 
              margin: 0, 
              marginBottom: 16,
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--text-primary)"
            }}>Attendance Today</h3>
            <div style={{ 
              fontSize: "var(--font-size-4xl)", 
              color: "#1976d2", 
              fontWeight: "var(--font-weight-bold)",
              lineHeight: "var(--line-height-tight)"
            }}>
              {attendance.filter(a => a.date === today && a.clockIn && !a.clockOut).length}
            </div>
            <div style={{ 
              fontSize: "var(--font-size-sm)", 
              color: "var(--text-secondary)", 
              marginTop: 8,
              fontWeight: "var(--font-weight-medium)"
            }}>
              checked-in
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 style={{ 
              margin: 0, 
              marginBottom: 16,
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--text-primary)"
            }}>Leaves Pending</h3>
            <div style={{ 
              fontSize: "var(--font-size-4xl)", 
              color: "#fbc02d", 
              fontWeight: "var(--font-weight-bold)",
              lineHeight: "var(--line-height-tight)"
            }}>
              {leaves.filter(l => l.status === "pending").length}
            </div>
          </div>
          <button style={{ ...secBtnStyle, marginTop: "auto", marginRight: 0, width: "100%" }} onClick={() => setView("leave-requests")}>
            Approve Leaves
          </button>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 style={{ 
              margin: 0, 
              marginBottom: 16,
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--text-primary)"
            }}>Analytics</h3>
            <div style={{ 
              fontSize: "var(--font-size-base)", 
              color: "#1976d2", 
              marginBottom: 20,
              lineHeight: "var(--line-height-normal)"
            }}>Overall reports</div>
          </div>
          <button style={{ ...secBtnStyle, marginTop: "auto", marginRight: 0, width: "100%" }} onClick={() => setView("analytics")}>
            View Analytics
          </button>
        </div>
      </div>
      <h2 style={{ 
        marginTop: 48, 
        marginBottom: 20, 
        color: "#424242", 
        fontWeight: "var(--font-weight-semibold)",
        fontSize: "var(--font-size-2xl)",
        lineHeight: "var(--line-height-tight)"
      }}>Employees</h2>
      <table className="data-table" style={dataTableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance (Month)</th>
            <th>Leaves Approved</th>
            <th>Last Attendance</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(u => u.role === "employee").map(u => {
            const att = attendance.filter(a => a.userId === u.id);
            const leavesApp = leaves.filter(l => l.userId === u.id && l.status === "approved");
            // This month:
            const thisMonth = att.filter(a => {
              const [year, mon] = a.date.split("-");
              const now = new Date();
              return (
                Number(year) === now.getFullYear() &&
                Number(mon) === now.getMonth() + 1
              );
            }).length;
            // Last attendance
            const last = att.length
              ? att.sort((a, b) => b.date.localeCompare(a.date))[0]
              : null;
            return (
              <tr key={u.id}>
                <td data-label="Name">{u.name}</td>
                <td data-label="Attendance (Month)">{thisMonth}</td>
                <td data-label="Leaves Approved">{leavesApp.length}</td>
                <td data-label="Last Attendance">{last ? last.date : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
