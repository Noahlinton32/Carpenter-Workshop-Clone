import {React, useEffect} from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Students from './pages/students';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, {createGlobalStyle, css} from 'styled-components';
import Dashboard from './pages/Dashboard';
import CreateStudents from './pages/CreateStudent';
import Incidents from './pages/incidents';
import CreateIncidents from './pages/CreateIncident';
import Accidents from './pages/accidents';
import CreateAccidents from './pages/CreateAccident';
import Referrals from './pages/referrals';
import CreateReferrals from './pages/CreateReferral';
import Profile from './pages/profile';
import { AuthProvider,useAuth } from './authContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
function App() {
return (
  <>
  <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" 
        element={
        <Login/>
        } />
         <Route path="/dashboard" 
        element={
          <RequireAuth>
        <Dashboard/>
        </RequireAuth>
        } />
        <Route path="/students" 
        element={
          <RequireAuth>
        <Students/>
        </RequireAuth>
        } />
        <Route path="/students/create" 
        element={
          <RequireAuth>
        <CreateStudents/>
        </RequireAuth>
        } />
        <Route path="/incidents" 
        element={
          <RequireAuth>
        <Incidents/>
        </RequireAuth>
        } />
        <Route path="/incidents/create" 
        element={
          <RequireAuth>
        <CreateIncidents/>
        </RequireAuth>
        } />
        <Route path="/accidents" 
        element={
          <RequireAuth>
        <Accidents/>
        </RequireAuth>
        } />
        <Route path="/accidents/create" 
        element={
          <RequireAuth>
        <CreateAccidents/>
        </RequireAuth>
        } />
        <Route path="/referrals" 
        element={
          <RequireAuth>
        <Referrals/>
        </RequireAuth>
        } />
        <Route path="/referrals/create" 
        element={
          <RequireAuth>
        <CreateReferrals/>
        </RequireAuth>
        
        } />
        <Route path="/profile" 
        element={
          <RequireAuth>
        <Profile/>
        </RequireAuth>
        } />
      </Routes>
    </Router>
    </AuthProvider>
    </>
)}
function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("RequireAuth - auth.user:", auth.user);
  useEffect(() => {
    if (!auth.user) {
      console.log("not authed");
      navigate("/", { state: { from: location } });
    }
  }, [auth.user, navigate, location]);

  return children;
}
export default App;