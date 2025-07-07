import React, { useEffect, useState } from "react";
import "./App.css";

/**
 * THEME COLORS (use as CSS variables in App.css for styling as per layout description)
 * Primary: #1976d2
 * Secondary: #424242
 * Accent: #fbc02d
 */

/* --------------------------------- UTILS --------------------------------- */

// PUBLIC_INTERFACE
function getInitialUsers() {
  // Default app users (id, name, role, password)
  return [
    { id: 1, name: "Alice Johnson", username: "alice", role: "employee", password: "1234" },
    { id: 2, name: "Bob Smith", username: "bob", role: "employee", password: "1234" },
    { id: 3, name: "Carol Roberts", username: "carol", role: "admin", password: "admin" },
  ];
}

// PUBLIC_INTERFACE
function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// PUBLIC_INTERFACE
function loadFromLocal(key, fallback) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : fallback;
}

/* ------------------------- INITIALIZE LOCAL STORAGE ------------------------ */
function initializeStorage() {
  if (!localStorage.getItem("users"))
    saveToLocal("users", getInitialUsers());
  if (!localStorage.getItem("attendance"))
    saveToLocal("attendance", []);
  if (!localStorage.getItem("leaves"))
    saveToLocal("leaves", []);
}

/* ----------------------------- MAIN COMPONENT ----------------------------- */
function App() {
  // THEME
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  // ON FIRST LOAD: Initialize storage if needed
  useEffect(() => {
    initializeStorage();
  }, []);

  // AUTH STATE
  const [user, setUser] = useState(null);

  // ---------- ROUTING & VIEW STATE ----------
  // "user", "admin", "login", "apply-leave", "leave-requests", "attendance", "analytics"
  const [view, setView] = useState("login");

  // On logout, return to login screen and reset
  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  // ---------- HANDLE LOGIN ----------
  const handleLogin = (username, password) => {
    const users = loadFromLocal("users", []);
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      setView(found.role === "admin" ? "admin" : "user");
    } else {
      alert("Invalid username or password");
    }
  };

  // ---------- CONTENT RENDERING ----------
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex" }}>
      {user && <Sidebar user={user} setView={setView} handleLogout={handleLogout} view={view} />}
      <div style={{ flex: 1, minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <header className="App-header" style={{ minHeight: 0, marginBottom: 0, padding: 0, background: "var(--bg-secondary)" }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </header>
        <main style={{ padding: "24px" }}>
          {!user && <LoginForm handleLogin={handleLogin} />}
          {user && user.role === "employee" && view === "user" && <UserDashboard user={user} setView={setView} />}
          {user && user.role === "employee" && view === "apply-leave" && <LeaveApplication user={user} setView={setView} />}
          {user && user.role === "employee" && view === "attendance" && <AttendanceCalendar user={user} setView={setView} />}
          {user && user.role === "admin" && view === "admin" && <AdminDashboard setView={setView} />}
          {user && user.role === "admin" && view === "leave-requests" && <LeaveRequests setView={setView} />}
          {user && user.role === "admin" && view === "analytics" && <AnalyticsDashboard />}
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- SIDEBAR NAV ----------------------------- */

function Sidebar({ user, setView, handleLogout, view }) {
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

/* ----------------------------- LOGIN FORM ----------------------------- */

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      style={{
        maxWidth: 340,
        margin: "80px auto 0 auto",
        background: "var(--bg-secondary)",
        borderRadius: 12,
        boxShadow: "0 6px 32px #0001",
        padding: "38px 36px",
      }}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        Employee Attendance Tracker
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(username, password);
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <input
            type="text"
            autoFocus
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={inputStyle}
            autoComplete="username"
            required
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
            required
          />
        </div>
        <button style={mainBtnStyle} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

/* -------------------------- USER DASHBOARD -------------------------- */
function UserDashboard({ user, setView }) {
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

/* -------------------------- ATTENDANCE CALENDAR -------------------------- */
function AttendanceCalendar({ user }) {
  const attendance = loadFromLocal("attendance", []).filter(a => a.userId === user.id);

  // Generate calendar days for the month
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  // Attendance map for marking
  const attendanceMap = {};
  attendance.forEach(a => { attendanceMap[a.date] = a; });

  function prevMonth() {
    setMonth(m => m === 0 ? 11 : m - 1);
    if (month === 0) setYear(y => y - 1);
  }
  function nextMonth() {
    setMonth(m => m === 11 ? 0 : m + 1);
    if (month === 11) setYear(y => y + 1);
  }

  return (
    <div>
      <h2 style={{ color: "#1976d2" }}>Attendance Calendar</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", margin: "14px 0" }}>
        <button style={secBtnStyle} onClick={prevMonth}>Prev</button>
        <b>{year} - {String(month + 1).padStart(2, '0')}</b>
        <button style={secBtnStyle} onClick={nextMonth}>Next</button>
      </div>
      <table style={{ width: "100%", background: "var(--bg-secondary)", borderRadius: 11, padding: 8, boxShadow: "0 2px 12px #0001", margin: "auto" }}>
        <thead>
          <tr style={{ textAlign: "center" }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <th style={{ padding: 3, color: "#1976d2" }} key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {(() => {
            const rows = [];
            let row = [];
            const firstWDay = days[0].getDay();
            for (let i = 0; i < firstWDay; i++) row.push(<td key={"e" + i}></td>);
            days.forEach((d, idx) => {
              const dStr = d.toISOString().split("T")[0];
              const att = attendanceMap[dStr];
              let color = "#fbc02d"; // pending
              let text = "-";
              if (att && att.clockIn && att.clockOut) {
                color = "#388e3c"; text = "Present";
              } else if (att && att.clockIn) {
                color = "#1976d2"; text = "Clocked In";
              }
              row.push(
                <td key={dStr} style={{
                  background: att ? color + "30" : "none",
                  color,
                  borderRadius: 6,
                  fontWeight: att ? 700 : 400,
                  padding: "4px 2px"
                }}>
                  <span style={{ fontSize: 13 }}>{d.getDate()}</span><br />
                  <span style={{ fontSize: 10 }}>{att ? text : ""}</span>
                </td>);
              if (((idx + firstWDay + 1) % 7 === 0) || idx === days.length - 1) {
                rows.push(<tr key={"row" + idx}>{row}</tr>);
                row = [];
              }
            });
            if (row.length) rows.push(<tr>{row}</tr>);
            return rows;
          })()}
        </tbody>
      </table>
      <div style={{ marginTop: 22, textAlign: "center" }}>
        <span style={{ background: "#388e3c30", color: "#388e3c", padding: "2px 6px", borderRadius: 3 }}>Present</span>{" "}
        <span style={{ background: "#fbc02d30", color: "#fbc02d", padding: "2px 6px", borderRadius: 3 }}>Clocked In</span>{" "}
      </div>
    </div>
  );
}

/* ----------------------- LEAVE APPLICATION FORM ----------------------- */
function LeaveApplication({ user, setView }) {
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

/* --------------------- ADMIN DASHBOARD (EMPLOYEE LIST) -------------------- */
function AdminDashboard({ setView }) {
  const users = loadFromLocal("users", []);
  const attendance = loadFromLocal("attendance", []);
  const leaves = loadFromLocal("leaves", []);
  // Calculate last status for each
  const today = (new Date()).toISOString().split("T")[0];
  return (
    <div>
      <h1 style={{ color: "#1976d2", fontSize: 28 }}>Admin Dashboard</h1>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", margin: "20px 0" }}>
        <div style={cardStyle}>
          <h3>Total Employees</h3>
          <div style={{ fontSize: 30, color: "#1976d2" }}>{users.filter(u => u.role === "employee").length}</div>
        </div>
        <div style={cardStyle}>
          <h3>Attendance Today</h3>
          <div style={{ fontSize: 30, color: "#1976d2" }}>
            {
              attendance.filter(a => a.date === today && a.clockIn && !a.clockOut).length
              + " checked-in"
            }
          </div>
        </div>
        <div style={cardStyle}>
          <h3>Leaves Pending</h3>
          <div style={{ fontSize: 30, color: "#fbc02d" }}>{leaves.filter(l => l.status === "pending").length}</div>
          <button style={secBtnStyle} onClick={() => setView("leave-requests")}>Approve Leaves</button>
        </div>
        <div style={cardStyle}>
          <h3>Analytics</h3>
          <div style={{ fontSize: 15, color: "#1976d2" }}>Overall reports</div>
          <button style={secBtnStyle} onClick={() => setView("analytics")}>View Analytics</button>
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
                <td>{u.name}</td>
                <td>{thisMonth}</td>
                <td>{leavesApp.length}</td>
                <td>{last ? last.date : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------- ADMIN: LEAVE REQUESTS --------------------- */
function LeaveRequests({ setView }) {
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

/* ------------------ ANALYTICS: Simple Reports/Charts ------------------ */
function AnalyticsDashboard() {
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

/* ------------------------------- TABLES ------------------------------- */
function AttendanceTable({ attendance, showUser }) {
  const users = loadFromLocal("users", []);
  return (
    <table className="data-table" style={dataTableStyle}>
      <thead>
        <tr>
          {showUser && <th>Employee</th>}
          <th>Date</th>
          <th>Clock In</th>
          <th>Clock Out</th>
        </tr>
      </thead>
      <tbody>
        {attendance.length === 0 &&
          <tr><td colSpan={showUser ? 4 : 3} style={{ color: "#888", textAlign: "center" }}>No records</td></tr>}
        {attendance.map((a, i) => (
          <tr key={i}>
            {showUser && <td>{users.find(u => u.id === a.userId)?.name || "-"}</td>}
            <td>{a.date}</td>
            <td>{a.clockIn || "-"}</td>
            <td>{a.clockOut || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* --------------------------- UI STYLES (INLINE) --------------------------- */
const cardStyle = {
  minWidth: 190,
  minHeight: 90,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 2px 12px #0001",
  padding: "25px 22px",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  borderRadius: 7,
  border: "1px solid var(--border-color)",
  padding: "9px 12px",
  fontSize: 15,
  marginTop: "3px",
};

const mainBtnStyle = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: 7,
  padding: "10px 20px",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  marginRight: 5,
};
const secBtnStyle = {
  background: "#fbc02d",
  color: "#1a1a1a",
  border: "none",
  borderRadius: 7,
  padding: "10px 18px",
  fontWeight: 500,
  fontSize: 14,
  cursor: "pointer",
  marginRight: 6,
  marginTop: 6,
};

const dataTableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  background: "#fff",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 1px 7px #0001",
  marginBottom: 22
};

export default App;
