import React, { useState } from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import { inputStyle, mainBtnStyle, secBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function LeaveApplication({ user, setView }) {
  /**
   * Leave application page for submitting leave requests
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to navigate to different views
   */
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !reason) {
      alert("Please fill all fields");
      return;
    }
    const leaves = loadFromLocal("leaves", []);
    leaves.push({
      id: Date.now(),
      userId: user.id,
      name: user.name,
      date,
      reason,
      status: "pending"
    });
    saveToLocal("leaves", leaves);
    alert("Leave applied!");
    setView("user");
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", background: "var(--bg-secondary)", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 28 }}>
      <h2 style={{ color: "#1976d2", marginBottom: 22 }}>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Date:&nbsp;
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>
            Reason: <br/>
            <textarea value={reason} onChange={e => setReason(e.target.value)} required rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 58 }} />
          </label>
        </div>
        <button type="submit" style={mainBtnStyle}>Submit</button>
        <button type="button" style={secBtnStyle} onClick={() => setView("user")}>Back</button>
      </form>
    </div>
  );
}

export default LeaveApplication;
