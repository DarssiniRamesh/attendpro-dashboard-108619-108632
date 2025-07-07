import React from 'react';

// PUBLIC_INTERFACE
function LoadingSpinner({ size = 'medium', color = '#1976d2', text = 'Loading...' }) {
  /**
   * Loading spinner component for displaying loading states
   * @param {string} size - Size of the spinner ('small', 'medium', 'large')
   * @param {string} color - Color of the spinner
   * @param {string} text - Loading text to display
   */
  const sizeMap = {
    small: 20,
    medium: 32,
    large: 48
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      gap: '12px'
    }}>
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {text && (
        <span style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          fontWeight: 500
        }}>
          {text}
        </span>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function LoadingCard({ title = 'Loading...', height = 200 }) {
  /**
   * Loading card component for dashboard cards
   * @param {string} title - Title for the loading card
   * @param {number} height - Height of the loading card
   */
  return (
    <div className="dashboard-card" style={{ height, minHeight: height }}>
      <h3 style={{ margin: 0, marginBottom: 16, color: 'var(--text-secondary)' }}>
        {title}
      </h3>
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <LoadingSpinner size="medium" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
export { LoadingCard };
