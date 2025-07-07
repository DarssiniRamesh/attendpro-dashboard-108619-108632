import React from 'react';

// PUBLIC_INTERFACE
function SummaryWidget({ title, value, subtitle, icon, color = "#1976d2", trend }) {
  /**
   * Summary widget component for displaying key metrics
   * @param {string} title - Widget title
   * @param {string|number} value - Main value to display
   * @param {string} subtitle - Subtitle text
   * @param {string} icon - Icon emoji
   * @param {string} color - Primary color
   * @param {Object} trend - Trend data with direction and percentage
   */
  return (
    <div className="dashboard-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
          <h3 style={{ margin: 0, fontSize: 16, color: "var(--text-primary)" }}>{title}</h3>
        </div>
        {trend && (
          <div style={{ 
            fontSize: 12, 
            color: trend.direction === 'up' ? '#4caf50' : '#f44336',
            display: "flex",
            alignItems: "center",
            gap: 2
          }}>
            {trend.direction === 'up' ? '↗' : '↘'} {trend.percentage}%
          </div>
        )}
      </div>
      
      <div style={{ 
        fontSize: 28, 
        fontWeight: 700, 
        color: color,
        marginBottom: 8,
        textAlign: "center"
      }}>
        {value}
      </div>
      
      {subtitle && (
        <div style={{ 
          fontSize: 14, 
          color: "var(--text-secondary)",
          textAlign: "center",
          marginTop: "auto"
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default SummaryWidget;
