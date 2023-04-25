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



function Accidents() {
  // State
  const [accidents, setAccidents] = useState(null);
  
  //User Effect
  useEffect (() => {
    getAccidents();
  }, []);

  //Functions 
  const getAccidents = async () => {
    //get students
    const res = await axios.get('http://localhost:3000/accidents');
    //set state
    setAccidents(res.data.accidents);
  };
  
  
  return <div style={{marginLeft: '45%'}}>
    <GlobalStyle/>
    <h2>Accidents</h2>
    <div style={{display: 'grid', marginLeft: '-45%'}}>
    {accidents && accidents.map (accident => {
        return <div key={accident.id}> 
<td>
<div style={{backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2%',
                height: '100%',
                width: '100%',
                maxWidth: '1000px',
                padding: '0 20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)'
                }}>
    <Collapsible trigger={<h5>Accident Number: {accident.accidentReportNumber}</h5>} style={{backgroundColor: '#fff'}}>
      <div style={{
        display: 'grid',
        width:'100%',
        gridTemplateRows: '40px 40px 40px 40px 40px 40px 40px 40px 40px 40px',
        gridTemplateColumns: '400px 400px',


      }}>

    <p>Student ID: {accident.studentID}</p>
    <p>School: {accident.school}</p>
    <p>Employee ID: {accident.employeeID}</p>
    <p>Room: {accident.room}</p>
    <p>Date: {accident.date}</p>
    <p>Location: {accident.location}</p>
    <p>ID of Staff Involved: {accident.employeeIDInvolved}</p>
    <p>ID of Student Involved: {accident.studentIDInvolved}</p>
    <p>Cause: {accident.cause}</p>
    <p>Response: {accident.response}</p>
    <p>Preventative Action Taken: {accident.preventativeAction}</p>
    <p>Witnesses: {accident.witnesses}</p>
    <p>Signed? {accident.signed}</p>

    <div></div>
    <div>
    <NavLink to="/accidents/edit">
    <Button style={{backgroundColor: '#D1913C', color:'#000', border: '0'}}>Edit Accident</Button>
    </NavLink>
    </div>
    <div>
    <Button style={{backgroundColor: '#c75252', color:'#000', border: '0'}}>Delete Accident</Button>
    </div> 
      </div>
  </Collapsible>
  </div>
  </td>
</div>
    })}
</div> 


<div style={{marginLeft:'-2%', marginTop: '2%'}}>
<NavLink to="/accidents/create" activeStyle>
    <Button>Create Accident</Button>
</NavLink>
</div>
</div>     
}
export default Accidents;