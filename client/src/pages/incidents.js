import { useState, useEffect } from "react";
import axios from "axios";
import {NavLink} from "../components/Navbar/NavbarElements";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import styled, {createGlobalStyle, css} from 'styled-components';
import { MDBDataTable } from 'mdbreact';

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
  for (let i in incidents){
    incidents[i]['edit']=(<NavLink to={`/incidents/edit/${incidents[i]['_id']}`}><Button style={{backgroundColor: 'lightblue', border: '0'}}>Edit</Button></NavLink>)
    incidents[i]['delete']= <Button
    style={{backgroundColor: 'darkred', border: '0'}}
    onClick={() => deleteIncident(incidents[i]['_id'])}
  > Delete </Button>
  incidents[i]['date']= incidents[i]['date'].split('T')[0]
  incidents[i]['participant']= incidents[i]['firstNameParticipant']+' '+incidents[i]['lastNameParticipant']
  incidents[i]['reporter']= incidents[i]['firstNameReport']+' '+incidents[i]['lastNameReport']
  incidents[i]['manager']= incidents[i]['firstNameManager']+' '+incidents[i]['lastNameManager']  
  
  }
  const data = {
    columns: [
      {
        label: 'Incident Report No.',
        field: 'incidentReportNumber',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Student ID',
        field: 'studentID',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Agency',
        field: 'agencyOrProgram',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Contact',
        field: 'contactNumber',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Type',
        field: 'incidentType',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Location',
        field: 'location',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Employee',
        field: 'employeeID',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Participant',
        field: 'participant',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Reporter',
        field: 'reporter',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Manager',
        field: 'manager',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Edit',
        field: 'edit',
      },
      {
        label: 'Delete',
        field: 'delete',
      }
    ],
    rows: 
      incidents
    }
  
  return <div style={{marginLeft: 'auto'}}>
    <GlobalStyle/>
    <h2 style={{marginLeft: '50%'}}>Incidents</h2>
    <div style={{width: '80%', marginLeft:'10%', backgroundColor: '#fff',
                borderRadius: '10px', padding: '0 20px',boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)', minWidth: '650px'}}>
    <MDBDataTable
      striped
      small
      data={data}
      noBottomColumns={true} 
    />

<div style={{paddingBottom:'20px'}}>
<NavLink to="/incidents/create" activeStyle>
    <Button>Create Incident</Button>
</NavLink>
</div>
</div>  
</div>   
}
export default Incidents;
