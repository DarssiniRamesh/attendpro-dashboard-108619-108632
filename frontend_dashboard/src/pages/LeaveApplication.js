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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !reason.trim()) {
      alert("Please fill all fields");
      return;
    }
    
    // Validate date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      alert("Please select a future date");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const leaves = loadFromLocal("leaves", []);
      
      // Check if user already has a leave request for this date
      const existingLeave = leaves.find(
        l => l.userId === user.id && l.date === date && l.status !== "rejected"
      );
      
      if (existingLeave) {
        alert("You already have a leave request for this date");
        setIsSubmitting(false);
        return;
      }
      
      leaves.push({
        id: Date.now(),
        userId: user.id,
        name: user.name,
        date,
        reason: reason.trim(),
        status: "pending"
      });
      
      saveToLocal("leaves", leaves);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert("Leave application submitted successfully!");
      setView("user");
    } catch (error) {
      alert("Error submitting leave application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button 
            type="submit" 
            style={{
              ...mainBtnStyle,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              flex: 1
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <button 
            type="button" 
            style={{
              ...secBtnStyle,
              marginTop: 0,
              flex: 1
            }}
            onClick={() => setView("user")}
            disabled={isSubmitting}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaveApplication;
