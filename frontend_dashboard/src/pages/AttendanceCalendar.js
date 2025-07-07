import React from 'react';
import Calendar from '../components/Calendar';

// PUBLIC_INTERFACE
function AttendanceCalendar({ user }) {
  /**
   * Attendance calendar page displaying user's attendance in calendar format
   * @param {Object} user - Current user object
   */
  return <Calendar user={user} />;
}

export default AttendanceCalendar;
