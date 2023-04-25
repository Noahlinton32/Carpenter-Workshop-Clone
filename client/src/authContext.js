import React, { useState, useEffect, useContext, createContext } from "react";
// Create the authentication context
const AuthContext = createContext();
// AuthProvider component to provide authentication state and functions to the entire app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  // Login function to set the user state
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  // Logout function to clear the user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  // Provide the authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook to access the authentication context
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };