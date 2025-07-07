import React from 'react';
import { loadFromLocal } from '../utils/localStorage';
import { dataTableStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function AnalyticsDashboard() {
  /**
   * Analytics dashboard page displaying reports and charts
   */
  const attendance = loadFromLocal("attendance", []);
  const leaves = loadFromLocal("leaves", []);
  const users = loadFromLocal("users", []);
  
  // Attendance by employee
  const stats = {};
  users.filter(u => u.role === "employee").forEach(u => {
    stats[u.id] = {
      name: u.name,
      attendance: attendance.filter(a => a.userId === u.id && a.clockIn && a.clockOut).length,
      leaves: leaves.filter(l => l.userId === u.id && l.status === "approved").length
    };
  });
  
  // "Chart": Use bars
  const maxAtt = Math.max(1, ...Object.values(stats).map(s => s.attendance));
  const maxLeaves = Math.max(1, ...Object.values(stats).map(s => s.leaves));
  
  return (
    <div>
      <h2 style={{ color: "#1976d2" }}>Analytics & Reports</h2>
      <h3>Attendance by Employee</h3>
      {Object.values(stats).map(s => (
        <div key={s.name} style={{ margin: "10px 0" }}>
          <b>{s.name}</b>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              background: "#1976d2",
              width: `${Math.round((s.attendance / maxAtt) * 220)}px`,
              height: "18px",
              borderRadius: 5
            }}/>
            <span style={{ fontSize: 13 }}>{s.attendance} days present</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
            <div style={{
              background: "#fbc02d",
              width: `${Math.round((s.leaves / maxLeaves) * 120)}px`,
              height: "13px",
              borderRadius: 4
            }}/>
            <span style={{ fontSize: 12 }}>{s.leaves} leaves</span>
          </div>
        </div>
      ))}
      <h3 style={{marginTop: 34}}>Leave Summary</h3>
      <table className="data-table" style={dataTableStyle}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Dates</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{users.find(u => u.id === l.userId)?.name || "-"}</td>
              <td>{l.date}</td>
              <td style={{ color: l.status === "approved" ? "green" : l.status === "pending" ? "#fbc02d" : "#d32f2f" }}>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsDashboard;
