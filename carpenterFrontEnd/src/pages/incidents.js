import { useState, useEffect } from "react";
import axios from "axios";
import {NavLink} from "../components/Navbar/NavbarElements";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import styled, {createGlobalStyle, css} from 'styled-components';
import Collapsible from 'react-collapsible';

const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }
  body{
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to top, #d1913c, #ffd194);
    background-attachment: fixed;
    height: 100%;
    margin: 0;
    color: 555;
  }
`

function Incidents() {

  const [incidents, setIncidents] = useState(null);

  useEffect (() => {
    getIncidents();
  }, []);

  const getIncidents = async () => {
    const res = await axios.get('http://localhost:3000/incidents');
    setIncidents(res.data.incidents);
  };
  const deleteIncident = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/incidents/${id}`);
      setIncidents(incidents.filter((incident) => incident._id !== id));
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };
  
  return <div style={{marginLeft: '45%'}}>
    <GlobalStyle/>
    <h2>Incidents</h2>
    <div style={{display: 'grid', marginLeft: '-45%'}}>
    {incidents && incidents.map (incident => {
        return <div key={incident._id}> 
<td>
<div style={{backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                rowGap: '5px',
                alignItems: 'center',
                marginTop: '2%',
                height: '100%',
                width: '100%',
                maxWidth: '1000px',
                padding: '0 20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)'
                }}>
    <Collapsible trigger={<h5>Incident Number: {incident.incidentReportNumber}</h5>} style={{backgroundColor: '#fff'}}>
      <div style={{
        display: 'grid',
        width:'100%',
        gridTemplateRows: '40px 40px 40px 40px 40px 40px 40px 40px 40px 40px',
        gridTemplateColumns: '400px 400px',


      }}>
    <p>Student ID: {incident.studentID}</p>
    <p>Agency or Program: {incident.agencyOrProgram}</p>
    <p>Contact Number: {incident.contactNumber}</p>
    <p>Address: {incident.address}</p>
    <p>Incident Type: {incident.incidentType}</p>
    <p>Other if applicable: {incident.incidentTypeOTher}</p>
    <p>Location: {incident.location}</p>
    <p>Date of Incident: {incident.date.split('T')[0]}</p>
    <p>Employee ID: {incident.employeeID}</p>
    <p>Participant: {incident.firstNameParticipant} {incident.lastNameParticipant}</p>
    <p>Reporter: {incident.firstNameReport} {incident.laatNameReport}</p> 
    <p>Reporter's Contact Number: {incident.contactReportNumber}</p>
    <p>Reporter's Email: {incident.contactReportEmail}</p>
    <p>Manager: {incident.firstNameManager} {incident.lastNameManager}</p>
    <p>Manager's Contact Number: {incident.phoneNumberManager}</p>
    <p>Manager's Email: {incident.emailAddressManager}</p>
    <p>Signed? {incident.signed}</p>
    <div></div>
    <div>
    <NavLink to={`/incidents/edit/${incident._id}`}>Edit
    <Button style={{backgroundColor: '#D1913C', color:'#000', border: '0'}}>Edit Incident</Button>
    </NavLink>
    </div>
    <div>
    <Button
  onClick={() => deleteIncident(incident._id)}
  style={{ backgroundColor: "#c75252", color: "#000", border: "0" }}
>
  Delete Incident
</Button>
    </div> 
      </div>
  </Collapsible>
  </div>
  </td>
</div>
    })}
</div> 

<div style={{marginTop:'5%'}}>
<NavLink to="/incidents/create" activeStyle>
    <Button>Create Incident</Button>
</NavLink>
</div>
</div>     
}
export default Incidents;