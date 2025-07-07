import React from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import { cardStyle, mainBtnStyle, secBtnStyle } from '../styles/constants';
import AttendanceTable from '../components/AttendanceTable';

// PUBLIC_INTERFACE
function UserDashboard({ user, setView }) {
  /**
   * User dashboard page displaying attendance status and options
   * @param {Object} user - Current user object
   * @param {Function} setView - Function to navigate to different views
   */
  const attendance = loadFromLocal("attendance", []).filter(a => a.userId === user.id);
  const leaves = loadFromLocal("leaves", []).filter(l => l.userId === user.id);

  // Get attendance status for today
  const today = (new Date()).toISOString().split("T")[0];
  const todayAtt = attendance.find(a => a.date === today);

  // Handle "Clock in"/"Clock out"
  const handlePunch = () => {
    let allAttendance = loadFromLocal("attendance", []);
    const found = allAttendance.find(a => a.date === today && a.userId === user.id);
    if (!found) {
      const entry = {
        userId: user.id, date: today, clockIn: (new Date()).toLocaleTimeString(), clockOut: null
      };
      allAttendance.push(entry);
      saveToLocal("attendance", allAttendance);
    } else if (!found.clockOut) {
      found.clockOut = (new Date()).toLocaleTimeString();
      saveToLocal("attendance", allAttendance);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1 style={{ color: "#1976d2", fontSize: 28, fontWeight: 700 }}>
        Welcome, {user.name}
      </h1>
      <div style={{ display: "flex", gap: 28, marginTop: 22, flexWrap: "wrap" }}>
        <div className="dashboard-card" style={cardStyle}>
          <h3 style={{ margin: 0 }}>Today's Attendance</h3>
          <div style={{ fontSize: 18, margin: "12px 0" }}>
            {
              todayAtt
                ? (todayAtt.clockOut
                  ? <>Clocked in: <b>{todayAtt.clockIn}</b><br />Clocked out: <b>{todayAtt.clockOut}</b></>
                  : <>Clocked in: <b>{todayAtt.clockIn}</b><br />Status: <b>Working</b></>)
                : <span style={{ color: "#d32f2f" }}>Not marked</span>
            }
          </div>
          <button
            style={mainBtnStyle}
            onClick={handlePunch}
            disabled={todayAtt && todayAtt.clockIn && todayAtt.clockOut}
          >
            {(!todayAtt && "Clock In") || (todayAtt && !todayAtt.clockOut && "Clock Out") || "Done"}
          </button>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <h3 style={{ margin: 0 }}>Leaves Taken</h3>
          <div style={{ fontSize: 32, color: "#1976d2", fontWeight: 700 }}>
            {leaves.filter(l => l.status === "approved").length}
          </div>
          <div style={{ margin: "12px 0" }}>Approved Leaves</div>
          <button style={{ ...secBtnStyle, fontSize: 15 }} onClick={() => setView("apply-leave")}>
            Apply for Leave
          </button>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <h3 style={{ margin: 0 }}>View Attendance</h3>
          <div style={{ fontSize: 18, margin: "12px 0" }}>
            Full calendar of your attendance.
          </div>
          <button style={secBtnStyle} onClick={() => setView("attendance")}>
            Attendance Calendar
          </button>
        </div>
      </div>
      <div style={{ marginTop: 36 }}>
        <h2 style={{ fontWeight: 600, color: "#424242", fontSize: 20, marginBottom: 8 }}>Recent Attendance</h2>
        <AttendanceTable attendance={attendance.slice(-7).reverse()} showUser={false} />
      </div>
    </div>
  );
}

export default UserDashboard;
