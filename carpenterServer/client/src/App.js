import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/index';
import Students from './pages/students';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, {createGlobalStyle, css} from 'styled-components';
import CreateStudents from './pages/CreateStudent';
import Incidents from './pages/incidents';
import CreateIncidents from './pages/CreateIncident';
import Accidents from './pages/accidents';
import CreateAccidents from './pages/CreateAccident';
import Referrals from './pages/referrals';
import CreateReferrals from './pages/CreateReferral';

function App() {
return (
  <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/students" element={<Students/>} />
        <Route path="/students/create" element={<CreateStudents/>} />
        <Route path="/incidents" element={<Incidents/>} />
        <Route path="/incidents/create" element={<CreateIncidents/>} />
        <Route path="/accidents" element={<Accidents/>} />
        <Route path="/accidents/create" element={<CreateAccidents/>} />
        <Route path="/referrals" element={<Referrals/>} />
        <Route path="/referrals/create" element={<CreateReferrals/>} />
      </Routes>
    </Router>
    </>
)}
  
export default App;