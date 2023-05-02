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



function Accidents() {
  const [accidents, setAccidents] = useState(null);
  useEffect (() => {
    getAccidents();
  }, []);

  const getAccidents = async () => {
    const res = await axios.get('http://localhost:3000/accidents');
    setAccidents(res.data.accidents);
  };

const handleDeleteAccident = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/accidents/${id}`);
    setAccidents(accidents.filter((accident) => accident._id !== id));
  } catch (error) {
    console.error('Error deleting accident:', error.response);
  }
};
for (let i in accidents){
  accidents[i]['edit']=(<NavLink to={`/accidents/edit/${accidents[i]['_id']}`}><Button style={{backgroundColor: 'lightblue', border: '0'}}>Edit</Button></NavLink>)
  accidents[i]['delete']= <Button
  style={{backgroundColor: 'darkred', border: '0'}}
  onClick={() => handleDeleteAccident(accidents[i]['_id'])}
> Delete </Button>
  accidents[i]['date']= accidents[i]['date'].split('T')[0]
  

}
const data = {
  columns: [
    {
      label: 'Accident Report No.',
      field: 'accidentReportNumber',
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
      label: 'School',
      field: 'school',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Employee',
      field: 'employeeID',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Room',
      field: 'room',
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
      label: 'Cause',
      field: 'cause',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Response',
      field: 'response',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Action',
      field: 'preventativeAction',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Witnesses',
      field: 'witnesses',
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
    accidents
  }
  console.log(data)
  return <div style={{marginLeft: 'auto'}}>
    <GlobalStyle/>
    <h2 style={{marginLeft: '50%'}}>Accidents</h2>
    <div style={{width: '80%', marginLeft:'10%', backgroundColor: '#fff',
                borderRadius: '10px', padding: '0 20px',boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)', minWidth: '650px'}}>
    <MDBDataTable
      striped
      small
      data={data}
      noBottomColumns={true} 
    />
    <div style={{ paddingBottom:'20px'}}>
<NavLink to="/accidents/create" activeStyle>
    <Button>Create Accident</Button>
</NavLink>
</div>
</div>     
</div>     
}
export default Accidents;