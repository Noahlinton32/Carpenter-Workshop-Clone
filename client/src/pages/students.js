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



function Students() {
  // State
  const [students, setStudents] = useState(null);
  
  //User Effect
  useEffect (() => {
    getStudents();
  }, []);

  //Functions 
  const getStudents = async () => {
    const res = await axios.get('http://localhost:3000/students');
    setStudents(res.data.students);
  };
  
  
  return <div style={{marginLeft: '45%'}}>
    <GlobalStyle/>
    <h2>Students</h2>
    <div style={{display: 'grid', marginLeft: '-45%'}}>
    {students && students.map (student => {
        return <div key={student._id}> 

<td>
    {student.isActive === 1 ? 
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
    <Collapsible trigger={<h5>{student.name}</h5>} style={{backgroundColor: '#fff'}}>
      <div style={{
        display: 'grid',
        width:'100%',
        gridTemplateRows: '40px 40px 40px 60px 10px 30px',
        gridTemplateColumns: '400px 400px',


      }}>
    <p>Student ID: {student.studentID}</p>
    <p>Address: {student.address}</p>
    <p>GPA: {student.gpa}</p>
    <p>Grade: {student.grade}</p>
    <p>Guardian 1: {student.firstNameFirstGuardian} {student.lastNameFirstGuardian}</p>
    <p>Guardian 2: {student.firstNameSecondGuardian} {student.lastNameSecondGuardian}</p>
    <p>Emergency Number: {student.emergencyNumber}</p>
    <p>Enrollment Date: {student.enrollmentDate.split('T')[0]}</p> 
    <div>
    <NavLink to={`/students/edit/${student._id}`}>
    <Button style={{backgroundColor: '#D1913C', color:'#000', border: '0'}}>Edit Student</Button>
    </NavLink>

    </div> 
      </div>
  </Collapsible>
  </div>
  :null}
</td>
</div>
    })}
</div> 


<div style={{marginLeft:'-2%', marginTop: '2%'}}>
<NavLink to="/students/create" activeStyle>
    <Button>Create Student</Button>
</NavLink>
</div>
</div>     
}
export default Students;
