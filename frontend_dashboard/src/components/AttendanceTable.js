import React from 'react';
import { loadFromLocal } from '../utils/localStorage';
import { dataTableStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function AttendanceTable({ attendance, showUser }) {
  /**
   * Displays attendance records in a table format
   * @param {Array} attendance - Array of attendance records
   * @param {boolean} showUser - Whether to show user column
   */
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

export default AttendanceTable;
