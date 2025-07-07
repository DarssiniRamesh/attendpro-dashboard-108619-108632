// PUBLIC_INTERFACE
export function getInitialUsers() {
  /**
   * Returns the default app users (id, name, role, password)
   */
  return [
    { id: 1, name: "Alice Johnson", username: "alice", role: "employee", password: "1234" },
    { id: 2, name: "Bob Smith", username: "bob", role: "employee", password: "1234" },
    { id: 3, name: "Carol Roberts", username: "carol", role: "admin", password: "admin" },
  ];
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
   */
  if (!localStorage.getItem("users"))
    saveToLocal("users", getInitialUsers());
  if (!localStorage.getItem("attendance"))
    saveToLocal("attendance", []);
  if (!localStorage.getItem("leaves"))
    saveToLocal("leaves", []);
}
