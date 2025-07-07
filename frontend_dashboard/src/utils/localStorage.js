// PUBLIC_INTERFACE
export function getInitialUsers() {
  /**
   * Returns the default app users (id, name, role, password)
   */
  return [
    { id: 1, name: "Alice Johnson", username: "alice", email: "alice@company.com", role: "employee", password: "1234" },
    { id: 2, name: "Bob Smith", username: "bob", email: "bob@company.com", role: "employee", password: "1234" },
    { id: 3, name: "Carol Roberts", username: "carol", email: "carol@company.com", role: "admin", password: "admin" },
  ];
}

// PUBLIC_INTERFACE
export function ensureDemoAdminExists() {
  /**
   * Ensures a demo admin account exists in localStorage
   * Creates one if it doesn't exist
   */
  const users = loadFromLocal('users', []);
  
  // Check if demo admin already exists
  const demoAdmin = users.find(user => user.username === 'demo_admin');
  
  if (!demoAdmin) {
    // Create demo admin account
    const newDemoAdmin = {
      id: Date.now() + 1000, // Ensure unique ID
      name: "Demo Administrator",
      username: "demo_admin",
      email: "demo_admin@company.com",
      role: "admin",
      password: "Demo@123"
    };
    
    users.push(newDemoAdmin);
    saveToLocal('users', users);
  }
}

// PUBLIC_INTERFACE
export function ensureDemoEmployeeExists() {
  /**
   * Ensures a demo employee account exists in localStorage
   * Creates one if it doesn't exist
   */
  const users = loadFromLocal('users', []);
  
  // Check if demo employee already exists
  const demoEmployee = users.find(user => user.username === 'demoemp');
  
  if (!demoEmployee) {
    // Create demo employee account
    const newDemoEmployee = {
      id: Date.now() + 2000, // Ensure unique ID
      name: "John Doe",
      username: "demoemp",
      email: "johndoe@company.com",
      role: "employee",
      password: "employee"
    };
    
    users.push(newDemoEmployee);
    saveToLocal('users', users);
  }
}

// PUBLIC_INTERFACE
export function registerUser(userData) {
  /**
   * Registers a new user and saves to localStorage
   * @param {Object} userData - User data including name, username, email, password
   * @returns {boolean} Success status
   */
  try {
    const users = loadFromLocal('users', []);
    
    // Check if username already exists
    const existingUser = users.find(user => user.username === userData.username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }
    
    // Create new user with unique ID
    const newUser = {
      id: Date.now(),
      name: userData.name,
      username: userData.username,
      email: userData.email,
      role: userData.role || 'employee',
      password: userData.password
    };
    
    users.push(newUser);
    saveToLocal('users', users);
    
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: 'Registration failed' };
  }
}

// PUBLIC_INTERFACE
export function saveToLocal(key, data) {
  /**
   * Saves data to localStorage
   * @param {string} key - The key to store data under
   * @param {any} data - The data to store
   */
  localStorage.setItem(key, JSON.stringify(data));
}

// PUBLIC_INTERFACE
export function loadFromLocal(key, fallback) {
  /**
   * Loads data from localStorage
   * @param {string} key - The key to retrieve data from
   * @param {any} fallback - Fallback value if key doesn't exist
   * @returns {any} The stored data or fallback value
   */
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : fallback;
}

// PUBLIC_INTERFACE
export function initializeStorage() {
  /**
   * Initializes localStorage with default data if not already present
   * Always ensures demo admin and demo employee accounts exist
   */
  if (!localStorage.getItem("users"))
    saveToLocal("users", getInitialUsers());
  if (!localStorage.getItem("attendance"))
    saveToLocal("attendance", []);
  if (!localStorage.getItem("leaves"))
    saveToLocal("leaves", []);
  
  // Always ensure demo accounts exist
  ensureDemoAdminExists();
  ensureDemoEmployeeExists();
}
