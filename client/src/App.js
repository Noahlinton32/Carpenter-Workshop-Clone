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
import AdminProfile from './pages/Admin';
import EditAccident from './pages/editAccident';
import EditIncident from './pages/editIncident';
import EditReferral from './pages/editReferral';
import EditStudent from './pages/editStudent';
import { AuthProvider,useAuth} from './authContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
function App() {
return (
  <>
  <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        {/* Wrap the entire app with the AuthProvider to make the authentication state available to all components */}
        <Route exact path="/" 
        element={
        <Login/>
        } />
        {/* Other routes are wrapped with RequireAuth to protect them */}
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
        <Route path="/students/edit/:id" 
        element={
          <RequireAuth>
        <EditStudent/>
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
        <Route path="/incidents/edit/:id" 
        element={
          <RequireAuth>
        <EditIncident/>
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
        <Route path="/accidents/edit/:id" 
        element={
          <RequireAuth>
        <EditAccident/>
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
        <Route path="/referrals/edit/:id" 
        element={
          <RequireAuth>
        <EditReferral/>
        </RequireAuth>
        } />
        <Route path="/profile" 
        element={
          <RequireAuth>
        <Profile/>
        </RequireAuth>
        } />
        <Route path="/admin"
        element={
        <RequireAdmin>
          <AdminProfile />
        </RequireAdmin>
        }
          />
      </Routes>
    </Router>
    </AuthProvider>
    
    </>
)}
// RequireAuth component to protect routes that require authentication
function RequireAdmin({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user || !auth.user.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
      // If the user is not authenticated, redirect them to the login page
    if (!auth.user) {
      navigate("/", { state: { from: location } });
    }
  }, [auth.user, navigate, location]);
  // If the user is authenticated, render the protected route
  return children;
}
export default App;