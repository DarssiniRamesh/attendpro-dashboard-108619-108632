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
  padding: "14px 18px",
  fontSize: "var(--font-size-base)",
  lineHeight: "var(--line-height-normal)",
  marginTop: "4px",
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  transition: "all 0.3s ease",
  outline: "none",
  fontFamily: "inherit",
  minHeight: "48px",
};

export const mainBtnStyle = {
  background: "linear-gradient(135deg, #1976d2, #1565c0)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "14px 28px",
  fontWeight: "var(--font-weight-semibold)",
  fontSize: "var(--font-size-base)",
  lineHeight: "var(--line-height-normal)",
  cursor: "pointer",
  marginRight: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
  position: "relative",
  overflow: "hidden",
  minHeight: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
};

export const secBtnStyle = {
  background: "linear-gradient(135deg, #fbc02d, #f9a825)",
  color: "#1a1a1a",
  border: "none",
  borderRadius: 10,
  padding: "12px 24px",
  fontWeight: "var(--font-weight-medium)",
  fontSize: "var(--font-size-sm)",
  lineHeight: "var(--line-height-normal)",
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(251, 192, 45, 0.3)",
  minHeight: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
};

export const dangerBtnStyle = {
  background: "linear-gradient(135deg, #d32f2f, #c62828)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 24px",
  fontWeight: "var(--font-weight-medium)",
  fontSize: "var(--font-size-sm)",
  lineHeight: "var(--line-height-normal)",
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
  minHeight: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const successBtnStyle = {
  background: "linear-gradient(135deg, #4caf50, #388e3c)",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 24px",
  fontWeight: "var(--font-weight-medium)",
  fontSize: "var(--font-size-sm)",
  lineHeight: "var(--line-height-normal)",
  cursor: "pointer",
  marginRight: 8,
  marginTop: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
  minHeight: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
