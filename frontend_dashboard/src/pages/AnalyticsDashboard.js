import React, { useMemo } from 'react';
import { loadFromLocal } from '../utils/localStorage';
import { dataTableStyle } from '../styles/constants';
import Chart from '../components/Chart';
import SummaryWidget from '../components/SummaryWidget';

// PUBLIC_INTERFACE
function AnalyticsDashboard() {
  /**
   * Enhanced analytics dashboard page with interactive charts and comprehensive reports
   */
  const attendance = loadFromLocal("attendance", []);
  const leaves = loadFromLocal("leaves", []);
  const users = loadFromLocal("users", []);
  
  // Generate comprehensive analytics data
  const analyticsData = useMemo(() => {
    const employees = users.filter(u => u.role === "employee");
    
    // Attendance by employee
    const attendanceByEmployee = employees.map(emp => {
      const empAttendance = attendance.filter(a => a.userId === emp.id && a.clockIn && a.clockOut);
      const empLeaves = leaves.filter(l => l.userId === emp.id && l.status === "approved");
      
      return {
        name: emp.name,
        attendance: empAttendance.length,
        leaves: empLeaves.length,
        id: emp.id
      };
    });
    
    // Monthly attendance trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      const monthlyAttendance = attendance.filter(a => a.date.startsWith(monthKey) && a.clockIn && a.clockOut);
      
      monthlyTrend.push({
        month: monthName,
        attendance: monthlyAttendance.length,
        employees: new Set(monthlyAttendance.map(a => a.userId)).size
      });
    }
    
    // Leave status distribution
    const leaveStatusData = [
      { name: 'Approved', value: leaves.filter(l => l.status === 'approved').length },
      { name: 'Pending', value: leaves.filter(l => l.status === 'pending').length },
      { name: 'Rejected', value: leaves.filter(l => l.status === 'rejected').length }
    ].filter(item => item.value > 0);
    
    // Weekly attendance pattern
    const weeklyPattern = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    daysOfWeek.forEach(day => {
      const dayAttendance = attendance.filter(a => {
        const date = new Date(a.date);
        return daysOfWeek[date.getDay()] === day && a.clockIn && a.clockOut;
      });
      
      weeklyPattern.push({
        day: day.substr(0, 3),
        attendance: dayAttendance.length
      });
    });
    
    return {
      attendanceByEmployee,
      monthlyTrend,
      leaveStatusData,
      weeklyPattern
    };
  }, [attendance, leaves, users]);
  
  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalEmployees = users.filter(u => u.role === "employee").length;
    const totalAttendanceRecords = attendance.filter(a => a.clockIn && a.clockOut).length;
    const totalLeaves = leaves.length;
    const averageAttendance = totalEmployees > 0 ? (totalAttendanceRecords / totalEmployees).toFixed(1) : 0;
    
    return {
      totalEmployees,
      totalAttendanceRecords,
      totalLeaves,
      averageAttendance
    };
  }, [attendance, leaves, users]);
  
  return (
    <div className="fade-in" style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
          📊 Analytics & Reports
        </h1>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: 16,
          margin: 0 
        }}>
          Comprehensive insights into attendance patterns and leave management
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="dashboard-grid-4" style={{ marginBottom: 32 }}>
        <SummaryWidget
          title="Total Employees"
          value={summaryStats.totalEmployees}
          subtitle="Active in system"
          icon="👥"
          color="#1976d2"
        />
        
        <SummaryWidget
          title="Attendance Records"
          value={summaryStats.totalAttendanceRecords}
          subtitle="Completed sessions"
          icon="✅"
          color="#4caf50"
        />
        
        <SummaryWidget
          title="Leave Requests"
          value={summaryStats.totalLeaves}
          subtitle="All time total"
          icon="📋"
          color="#ff9800"
        />
        
        <SummaryWidget
          title="Average Attendance"
          value={summaryStats.averageAttendance}
          subtitle="Per employee"
          icon="📊"
          color="#9c27b0"
        />
      </div>
      
      {/* Charts Section */}
      <div className="dashboard-grid-2" style={{ marginBottom: 32 }}>
        <Chart
          type="bar"
          data={analyticsData.attendanceByEmployee}
          title="📈 Attendance by Employee"
          xKey="name"
          yKey="attendance"
          height={350}
        />
        
        <Chart
          type="line"
          data={analyticsData.monthlyTrend}
          title="📅 Monthly Attendance Trend"
          xKey="month"
          yKey="attendance"
          height={350}
        />
      </div>
      
      <div className="dashboard-grid-2" style={{ marginBottom: 32 }}>
        <Chart
          type="bar"
          data={analyticsData.weeklyPattern}
          title="📊 Weekly Attendance Pattern"
          xKey="day"
          yKey="attendance"
          height={300}
        />
        
        {analyticsData.leaveStatusData.length > 0 && (
          <Chart
            type="pie"
            data={analyticsData.leaveStatusData}
            title="🏖️ Leave Status Distribution"
            yKey="value"
            height={300}
          />
        )}
      </div>
      
      {/* Detailed Tables */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ 
          fontWeight: 600, 
          color: "var(--text-primary)", 
          fontSize: 24, 
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          📋 Employee Performance Summary
        </h2>
        
        <div style={{ overflowX: "auto" }}>
          <table className="data-table" style={dataTableStyle}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Attendance</th>
                <th>Approved Leaves</th>
                <th>Attendance Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.attendanceByEmployee.map(emp => {
                const totalWorkingDays = Math.max(1, emp.attendance + emp.leaves);
                const attendanceRate = ((emp.attendance / totalWorkingDays) * 100).toFixed(1);
                const status = attendanceRate >= 80 ? 'Excellent' : attendanceRate >= 60 ? 'Good' : 'Needs Improvement';
                const statusColor = attendanceRate >= 80 ? '#4caf50' : attendanceRate >= 60 ? '#ff9800' : '#f44336';
                
                return (
                  <tr key={emp.id}>
                    <td data-label="Employee">{emp.name}</td>
                    <td data-label="Total Attendance">{emp.attendance}</td>
                    <td data-label="Approved Leaves">{emp.leaves}</td>
                    <td data-label="Attendance Rate">{attendanceRate}%</td>
                    <td data-label="Status" style={{ color: statusColor, fontWeight: 600 }}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Leave Summary */}
      <div>
        <h2 style={{ 
          fontWeight: 600, 
          color: "var(--text-primary)", 
          fontSize: 24, 
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          🏖️ Leave Management Summary
        </h2>
        
        <div style={{ overflowX: "auto" }}>
          <table className="data-table" style={dataTableStyle}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                    No leave requests found
                  </td>
                </tr>
              ) : (
                leaves.slice().reverse().map(leave => {
                  const employee = users.find(u => u.id === leave.userId);
                  const statusColor = leave.status === 'approved' ? '#4caf50' : 
                                    leave.status === 'pending' ? '#ff9800' : '#f44336';
                  
                  return (
                    <tr key={leave.id}>
                      <td data-label="Employee">{employee?.name || "Unknown"}</td>
                      <td data-label="Leave Date">{leave.date}</td>
                      <td data-label="Reason" style={{ maxWidth: "200px", wordWrap: "break-word" }}>
                        {leave.reason}
                      </td>
                      <td data-label="Status" style={{ color: statusColor, fontWeight: 600 }}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </td>
                      <td data-label="Applied On">
                        {new Date(leave.id).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
