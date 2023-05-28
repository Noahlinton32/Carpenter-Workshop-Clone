// ProtectedRoutes.js
import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import { AuthProvider,useAuth } from "../authContext";
import { Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import Students from './students';
import CreateStudents from './CreateStudent';
import Incidents from './incidents';
import CreateIncidents from './CreateIncident';
import Accidents from './accidents';
import CreateAccidents from './CreateAccident';
import Referrals from './referrals';
import CreateReferrals from './CreateReferral';
import AdminProfile from './Admin';
import EditAccident from './editAccident';
import EditIncident from './editIncident';
import EditReferral from './editReferral';
import EditStudent from './editStudent';

function ProtectedRoutes() {
    const auth = useAuth();
    return (
        <AuthProvider>
          {auth.user && <Navbar />}
          <Routes>
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
        <Route path="/admin"
        element={
        <RequireAdmin>
          <AdminProfile />
        </RequireAdmin>
        }
          />
      </Routes>
    </AuthProvider>
        );
    }
    function RequireAdmin({ children }) {
        const auth = useAuth();
        const location = useLocation();
        const navigate = useNavigate();
        const [isAllowed, setIsAllowed] = useState(false);
      
        useEffect(() => {
          if (!auth.user) {
            // If the user is not authenticated, redirect them to the login page
            navigate("/", { state: { from: location } });
          } else if (!auth.user.isAdmin) {
            // If the user is not an admin, redirect them to the dashboard
            navigate("/dashboard", { state: { from: location } });
          } else {
            // If the user is an admin, set isAllowed to true
            setIsAllowed(true);
          }
        }, [auth.user, navigate, location]);
      
        // Render the protected route only if the user is allowed (i.e., an admin)
        return isAllowed ? children : null;
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
    export default ProtectedRoutes;