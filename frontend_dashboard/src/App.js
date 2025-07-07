import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeStorage, loadFromLocal } from "./utils/localStorage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AttendanceCalendar from "./pages/AttendanceCalendar";
import LeaveApplication from "./pages/LeaveApplication";
import LeaveRequests from "./pages/LeaveRequests";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

/**
 * THEME COLORS (use as CSS variables in App.css for styling as per layout description)
 * Primary: #1976d2
 * Secondary: #424242
 * Accent: #fbc02d
 */

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component that handles routing, authentication, and layout
   */
  // THEME
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  // ON FIRST LOAD: Initialize storage if needed
  useEffect(() => {
    initializeStorage();
  }, []);

  // AUTH STATE
  const [user, setUser] = useState(null);

  // ---------- ROUTING & VIEW STATE ----------
  // "user", "admin", "login", "register", "apply-leave", "leave-requests", "attendance", "analytics"
  const [view, setView] = useState("login");

  // On logout, return to login screen and reset
  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  // ---------- HANDLE LOGIN ----------
  const handleLogin = (username, password) => {
    const users = loadFromLocal("users", []);
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      setView(found.role === "admin" ? "admin" : "user");
      return true;
    }
    return false;
  };

  // ---------- RENDER CURRENT VIEW ----------
  const renderView = () => {
    if (!user) {
      switch (view) {
        case "register":
          return <Register setView={setView} />;
        case "login":
        default:
          return <Login handleLogin={handleLogin} setView={setView} />;
      }
    }

    switch (view) {
      case "user":
        return user.role === "employee" ? <UserDashboard user={user} setView={setView} /> : null;
      case "admin":
        return user.role === "admin" ? <AdminDashboard setView={setView} /> : null;
      case "attendance":
        return user.role === "employee" ? <AttendanceCalendar user={user} /> : null;
      case "apply-leave":
        return user.role === "employee" ? <LeaveApplication user={user} setView={setView} /> : null;
      case "leave-requests":
        return user.role === "admin" ? <LeaveRequests setView={setView} /> : null;
      case "analytics":
        return user.role === "admin" ? <AnalyticsDashboard /> : null;
      default:
        return <Login handleLogin={handleLogin} setView={setView} />;
    }
  };

  // ---------- CONTENT RENDERING ----------
  return (
    <div className="App">
      {user && <Sidebar user={user} setView={setView} handleLogout={handleLogout} view={view} theme={theme} toggleTheme={toggleTheme} />}
      <div className="app-main-content">
        <Topbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          user={user}
          setView={setView}
          handleLogout={handleLogout}
          view={view}
        />
        <main>
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
