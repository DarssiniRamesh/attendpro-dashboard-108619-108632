import React from 'react';
import { loadFromLocal, saveToLocal } from '../utils/localStorage';
import { mainBtnStyle, secBtnStyle } from '../styles/constants';
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
    <div className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ 
          color: "var(--text-accent)", 
          fontSize: 32, 
          fontWeight: 700,
          marginBottom: 8,
          background: "linear-gradient(135deg, #1976d2, #1565c0)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Welcome back, {user.name}! 👋
        </h1>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: 16,
          margin: 0 
        }}>
          Here's your attendance overview for today
        </p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 24, marginRight: 12 }}>⏰</span>
              <h3 style={{ margin: 0, color: "var(--text-primary)" }}>Today's Attendance</h3>
            </div>
            <div style={{ fontSize: 16, margin: "16px 0", lineHeight: 1.5, flex: 1 }}>
              {
                todayAtt
                  ? (todayAtt.clockOut
                    ? <div>
                        <div style={{ color: "var(--success-color)", fontWeight: 600 }}>✅ Complete</div>
                        <div style={{ marginTop: 8, fontSize: 14 }}>
                          In: <strong>{todayAtt.clockIn}</strong><br />
                          Out: <strong>{todayAtt.clockOut}</strong>
                        </div>
                      </div>
                    : <div>
                        <div style={{ color: "var(--info-color)", fontWeight: 600 }}>🔄 In Progress</div>
                        <div style={{ marginTop: 8, fontSize: 14 }}>
                          Clocked in: <strong>{todayAtt.clockIn}</strong><br />
                          Status: <strong>Working</strong>
                        </div>
                      </div>)
                  : <div style={{ color: "var(--warning-color)", fontWeight: 600 }}>⏳ Not Started</div>
              }
            </div>
          </div>
          <button
            style={{
              ...mainBtnStyle,
              width: "100%",
              marginTop: "auto",
              marginRight: 0,
              opacity: (todayAtt && todayAtt.clockIn && todayAtt.clockOut) ? 0.6 : 1,
              cursor: (todayAtt && todayAtt.clockIn && todayAtt.clockOut) ? "not-allowed" : "pointer"
            }}
            onClick={handlePunch}
            disabled={todayAtt && todayAtt.clockIn && todayAtt.clockOut}
          >
            {(!todayAtt && "🕐 Clock In") || (todayAtt && !todayAtt.clockOut && "🕐 Clock Out") || "✅ Complete"}
          </button>
        </div>
        
        <div className="dashboard-card">
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 24, marginRight: 12 }}>🏖️</span>
              <h3 style={{ margin: 0, color: "var(--text-primary)" }}>Leave Balance</h3>
            </div>
            <div style={{ 
              fontSize: 36, 
              color: "#1976d2", 
              fontWeight: 700,
              marginBottom: 8,
              textAlign: "center"
            }}>
              {leaves.filter(l => l.status === "approved").length}
            </div>
            <div style={{ margin: "12px 0", textAlign: "center", color: "var(--text-secondary)" }}>
              Approved Leaves This Year
            </div>
          </div>
          <button 
            style={{ ...secBtnStyle, fontSize: 15, width: "100%", marginTop: "auto", marginRight: 0 }} 
            onClick={() => setView("apply-leave")}
          >
            📝 Apply for Leave
          </button>
        </div>
        
        <div className="dashboard-card">
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 24, marginRight: 12 }}>📊</span>
              <h3 style={{ margin: 0, color: "var(--text-primary)" }}>Attendance History</h3>
            </div>
            <div style={{ 
              fontSize: 18, 
              margin: "16px 0", 
              color: "var(--text-secondary)",
              textAlign: "center",
              flex: 1
            }}>
              View your complete attendance calendar and track your progress
            </div>
          </div>
          <button 
            style={{ ...secBtnStyle, width: "100%", marginTop: "auto", marginRight: 0 }} 
            onClick={() => setView("attendance")}
          >
            📅 View Calendar
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: 48 }}>
        <h2 style={{ 
          fontWeight: 600, 
          color: "var(--text-primary)", 
          fontSize: 24, 
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          📋 Recent Attendance
        </h2>
        <AttendanceTable attendance={attendance.slice(-7).reverse()} showUser={false} />
      </div>
    </div>
  );
}

export default UserDashboard;
