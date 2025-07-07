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
      <h1 style={{ color: "#1976d2", fontSize: 28 }}>Admin Dashboard</h1>
      <div className="dashboard-grid-4">
        <div className="dashboard-card">
          <div>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Total Employees</h3>
            <div style={{ fontSize: 30, color: "#1976d2", fontWeight: 700 }}>
              {users.filter(u => u.role === "employee").length}
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Attendance Today</h3>
            <div style={{ fontSize: 30, color: "#1976d2", fontWeight: 700 }}>
              {attendance.filter(a => a.date === today && a.clockIn && !a.clockOut).length}
            </div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>
              checked-in
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Leaves Pending</h3>
            <div style={{ fontSize: 30, color: "#fbc02d", fontWeight: 700 }}>
              {leaves.filter(l => l.status === "pending").length}
            </div>
          </div>
          <button style={{ ...secBtnStyle, marginTop: "auto", marginRight: 0, width: "100%" }} onClick={() => setView("leave-requests")}>
            Approve Leaves
          </button>
        </div>
        <div className="dashboard-card">
          <div>
            <h3 style={{ margin: 0, marginBottom: 12 }}>Analytics</h3>
            <div style={{ fontSize: 15, color: "#1976d2", marginBottom: 16 }}>Overall reports</div>
          </div>
          <button style={{ ...secBtnStyle, marginTop: "auto", marginRight: 0, width: "100%" }} onClick={() => setView("analytics")}>
            View Analytics
          </button>
        </div>
      </div>
      <h2 style={{ marginTop: 36, marginBottom: 8, color: "#424242", fontWeight: 600 }}>Employees</h2>
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
