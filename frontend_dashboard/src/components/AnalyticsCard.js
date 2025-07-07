import React from 'react';
import { cardStyle } from '../styles/constants';

// PUBLIC_INTERFACE
function AnalyticsCard({ title, value, description, button, onClick }) {
  /**
   * Reusable card component for displaying analytics and dashboard information
   * @param {string} title - Card title
   * @param {string|number} value - Main value to display
   * @param {string} description - Description text
   * @param {string} button - Button text (optional)
   * @param {Function} onClick - Button click handler (optional)
   */
  return (
    <div className="dashboard-card" style={cardStyle}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {value && (
        <div style={{ fontSize: 30, color: "#1976d2", fontWeight: 700 }}>
          {value}
        </div>
      )}
      {description && (
        <div style={{ margin: "12px 0", fontSize: 15 }}>{description}</div>
      )}
      {button && onClick && (
        <button 
          style={{
            background: "#fbc02d",
            color: "#1a1a1a",
            border: "none",
            borderRadius: 7,
            padding: "10px 18px",
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            marginTop: 6,
          }}
          onClick={onClick}
        >
          {button}
        </button>
      )}
    </div>
  );
}

export default AnalyticsCard;
