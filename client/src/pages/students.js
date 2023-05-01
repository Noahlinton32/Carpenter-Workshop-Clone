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
  for (let i in students){
    students[i]['edit']=(<NavLink to={`/students/edit/${students[i]['_id']}`}><button style={{backgroundColor: 'lightblue'}}>Edit</button></NavLink>)
    students[i]['guardian']= students[i]['firstNameFirstGuardian']+' '+students[i]['lastNameFirstGuardian']
    students[i]['guardian2']= students[i]['firstNameSecondGuardian']+' '+students[i]['lastNameSecondGuardian']

  }
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
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
        label: 'GPA',
        field: 'gpa',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Grade',
        field: 'grade',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Emergency Number',
        field: 'emergencyNumber',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Guardian',
        field: 'guardian',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Secondary Guardian',
        field: 'guardian2',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Edit',
        field: 'edit',
      }
    ],
    rows: 
      students
    }
    console.log(data)
  
  
  return <div style={{margin: 'auto'}}>
    <GlobalStyle/>
    <h2 style={{marginLeft: '50%'}}>Students</h2>
    <div style={{width: '80%', marginLeft:'10%', backgroundColor: '#fff',
                borderRadius: '10px', padding: '0 20px',boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)', minWidth: '650px'}}>
    <MDBDataTable
      striped
      small
      data={data}
      noBottomColumns={true} 
    />
    <div style={{ paddingBottom:'20px'}}>
<NavLink to="/students/create" activeStyle>
    <Button>Create Student</Button>
</NavLink>
</div>
    </div>


</div>     
}
export default Students;
