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

function Referrals() {
  const [referrals, setReferrals] = useState(null);
  
  useEffect (() => {
    getReferrals();
  }, []);

  const getReferrals = async () => {
    const res = await axios.get('hhttps://carpenterservice.onrender.com/referrals');
    setReferrals(res.data.referrals);
  };
  const deleteReferral = async (id) => {
    try {
      await axios.delete(`hhttps://carpenterservice.onrender.com/referrals/${id}`);
      setReferrals(referrals.filter((referral) => referral._id !== id));
    } catch (error) {
      console.error("Error deleting referral:", error);
    }
  };
  
  for (let i in referrals){
    referrals[i]['edit']=(<NavLink to={`/referrals/edit/${referrals[i]['_id']}`}><Button style={{backgroundColor: 'lightblue', border: '0'}}>Edit</Button></NavLink>)
    referrals[i]['delete']= <Button
    style={{backgroundColor: 'darkred', border: '0'}}
    onClick={() => deleteReferral(referrals[i]['_id'])}
  > Delete </Button>
    referrals[i]['date']= referrals[i]['date'].split('T')[0]
    
  
  }

  const data = {
    columns: [
      {
        label: 'Referral No.',
        field: 'referralNumber',
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
        label: 'Student',
        field: 'studentName',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Cause',
        field: 'cause',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Employee',
        field: 'employeeID',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Parent Contact',
        field: 'parentPhoneNumber',
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
      referrals
    }

  return <div style={{marginLeft: 'auto'}}>
    <GlobalStyle/>
    <h2 style={{marginLeft: '50%'}}>Referrals</h2>
    <div style={{width: '80%', marginLeft:'10%', backgroundColor: '#fff',
                borderRadius: '10px', padding: '0 20px',boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)', minWidth: '650px'}}>
    <MDBDataTable
      striped
      small
      data={data}
      noBottomColumns={true} 
    />


<div style={{paddingBottom:'20px'}}>
<NavLink to="/referrals/create" activeStyle>
    <Button>Create Referral</Button>
</NavLink>
</div>
</div>
</div>     
}
export default Referrals;