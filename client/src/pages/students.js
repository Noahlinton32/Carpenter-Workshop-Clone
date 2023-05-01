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
    fetchStudents();
  }, []);

  //Functions 
  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:3000/students');
    setStudents(res.data.students);
  };
<<<<<<< HEAD
  const handleArchiveStudent = async (studentId) => {
    await axios.delete(`http://localhost:3000/admin/students/${studentId}`);
    fetchStudents();
  };
=======
  for (let i in students){
    students[i]['edit']=(<NavLink to={`/students/edit/${students[i]['_id']}`}><Button style={{backgroundColor: 'lightblue', border: '0'}}>Edit</Button></NavLink>)
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
  
>>>>>>> d72bfab541a295c42ed18822a470d81362abc60b
  
  return <div style={{margin: 'auto'}}>
    <GlobalStyle/>
<<<<<<< HEAD
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
    <div>
    <Button
      style={{ backgroundColor: '#c75252', color: '#000', border: '0' }}
      onClick={() => handleArchiveStudent(student._id)}
    > Archive Student </Button>
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
=======
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
>>>>>>> d72bfab541a295c42ed18822a470d81362abc60b
<NavLink to="/students/create" activeStyle>
    <Button>Create Student</Button>
</NavLink>
</div>
    </div>


</div>     
}
export default Students;
