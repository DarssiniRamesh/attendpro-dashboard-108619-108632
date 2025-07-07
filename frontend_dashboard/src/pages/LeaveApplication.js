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
    <div style={{ 
      maxWidth: 380, 
      margin: "40px auto", 
      background: "var(--bg-secondary)", 
      borderRadius: 12, 
      boxShadow: "0 4px 16px var(--shadow-light)", 
      padding: 24,
      border: "1px solid var(--border-light)"
    }}>
      <h2 style={{ 
        color: "#1976d2", 
        marginBottom: 20,
        fontSize: "var(--font-size-xl)",
        fontWeight: "var(--font-weight-semibold)",
        textAlign: "center"
      }}>Apply for Leave</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="leave-date">Leave Date</label>
          <input 
            id="leave-date"
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="leave-reason">Reason for Leave</label>
          <textarea 
            id="leave-reason"
            value={reason} 
            onChange={e => setReason(e.target.value)} 
            required 
            rows={3} 
            className="form-input form-textarea"
            placeholder="Please provide a reason for your leave request..."
          />
        </div>
        
        <div className="form-button-group">
          <button 
            type="submit" 
            className="form-button primary"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <button 
            type="button" 
            className="form-button secondary"
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
