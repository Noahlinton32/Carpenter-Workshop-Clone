import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, useAuth } from "./authContext";
import { useLocation, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoutes from "./pages/protectedRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
              path="/*"
              element={
                <ProtectedRoutes />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

function RequireAdmin({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!auth.user) {
      navigate("/", { state: { from: location } });
    } else if (!auth.user.isAdmin) {
      navigate("/dashboard", { state: { from: location } });
    } else {
      setIsAllowed(true);
    }
  }, [auth.user, navigate, location]);

  return isAllowed ? children : null;
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      navigate("/", { state: { from: location } });
    }
  }, [auth.user, navigate, location]);

  return children;
}

export default App;