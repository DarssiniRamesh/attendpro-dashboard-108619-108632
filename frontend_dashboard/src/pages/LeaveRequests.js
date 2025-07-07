import React, { useState } from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import { dataTableStyle, mainBtnStyle, secBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function LeaveRequests({ setView }) {
  /**
   * Leave requests page for admin to approve/reject leave applications
   * @param {Function} setView - Function to navigate to different views
   */
  const [leaves, setLeaves] = useState(loadFromLocal("leaves", []));
  const users = loadFromLocal("users", []);
  
  // Approve or reject
  const handleDecision = (id, newStatus) => {
    const newLeaves = leaves.map(l =>
      l.id === id ? { ...l, status: newStatus } : l
    );
    saveToLocal("leaves", newLeaves);
    setLeaves(newLeaves);
  };
  
  return (
    <div>
      <h2 style={{ color: "#1976d2" }}>Pending Leave Requests</h2>
      <table className="data-table" style={dataTableStyle}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.filter(l => l.status === "pending").length === 0 && (
            <tr>
              <td colSpan={6} style={{ color: "#888", textAlign: "center" }}>
                No pending requests
              </td>
            </tr>
          )}
          {leaves
            .filter(l => l.status === "pending")
            .map(l => (
              <tr key={l.id}>
                <td>{users.find(u => u.id === l.userId)?.name || "-"}</td>
                <td>{l.date}</td>
                <td style={{ maxWidth: 120 }}>{l.reason}</td>
                <td style={{ color: "#fbc02d" }}>{l.status}</td>
                <td>
                  <button style={mainBtnStyle} onClick={() => handleDecision(l.id, "approved")}>Approve</button>
                </td>
                <td>
                  <button style={{ ...mainBtnStyle, background: "#d32f2f" }} onClick={() => handleDecision(l.id, "rejected")}>Reject</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        <button style={secBtnStyle} onClick={() => setView("admin")}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default LeaveRequests;
