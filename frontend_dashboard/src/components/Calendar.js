import React, { useState } from 'react';
import { loadFromLocal } from '../utils/localStorage';
import { secBtnStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function Calendar({ user }) {
  /**
   * Calendar component to display attendance for a specific user
   * @param {Object} user - User object to display attendance for
   */
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

export default Calendar;
