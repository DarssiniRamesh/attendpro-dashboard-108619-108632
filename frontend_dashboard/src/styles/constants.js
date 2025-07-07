// UI STYLES CONSTANTS
export const cardStyle = {
  minWidth: 220,
  minHeight: 120,
  background: "var(--bg-secondary)",
  borderRadius: 16,
  boxShadow: "0 4px 16px var(--shadow-light)",
  padding: "28px 24px",
  marginBottom: 16,
  border: "1px solid var(--border-light)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
};

export const inputStyle = {
  width: "100%",
  borderRadius: 10,
  border: "2px solid var(--border-color)",
  padding: "12px 16px",
  fontSize: 15,
  marginTop: "4px",
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  transition: "all 0.3s ease",
  outline: "none",
  fontFamily: "inherit",
};

export const mainBtnStyle = {
  background: "linear-gradient(135deg, #1976d2, #1565c0)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 24px",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  marginRight: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
  position: "relative",
  overflow: "hidden",
};

export const secBtnStyle = {
  background: "linear-gradient(135deg, #fbc02d, #f9a825)",
  color: "#1a1a1a",
  border: "none",
  borderRadius: 10,
  padding: "10px 20px",
  fontWeight: 500,
  fontSize: 14,
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(251, 192, 45, 0.3)",
};

export const dangerBtnStyle = {
  background: "linear-gradient(135deg, #d32f2f, #c62828)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 20px",
  fontWeight: 500,
  fontSize: 14,
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
};

export const successBtnStyle = {
  background: "linear-gradient(135deg, #4caf50, #388e3c)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 20px",
  fontWeight: 500,
  fontSize: 14,
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
};

export const dataTableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  background: "var(--bg-secondary)",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 4px 16px var(--shadow-light)",
  marginBottom: 24,
  border: "1px solid var(--border-light)",
};

export const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

export const modalContentStyle = {
  background: "var(--bg-secondary)",
  borderRadius: 16,
  padding: "32px",
  maxWidth: "500px",
  width: "90%",
  maxHeight: "80vh",
  overflow: "auto",
  boxShadow: "0 8px 32px var(--shadow-heavy)",
};

// Hover effects for buttons
export const addHoverEffect = (baseStyle) => ({
  ...baseStyle,
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: baseStyle.boxShadow?.replace('0 2px', '0 4px') || '0 4px 16px var(--shadow-medium)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});
