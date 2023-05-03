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

function Referrals() {
  const [referrals, setReferrals] = useState(null);
  
  useEffect (() => {
    getReferrals();
  }, []);

  const getReferrals = async () => {
    const res = await axios.get('httphttps://carpenterservice.onrender.com/referrals');
    setReferrals(res.data.referrals);
  };
  const deleteReferral = async (id) => {
    try {
      await axios.delete(`httphttps://carpenterservice.onrender.com/referrals/${id}`);
      setReferrals(referrals.filter((referral) => referral._id !== id));
    } catch (error) {
      console.error("Error deleting referral:", error);
    }
  };
  
  return <div style={{marginLeft: '45%'}}>
    <GlobalStyle/>
    <h2>Referrals</h2>
    <div style={{display: 'grid', marginLeft: '-45%'}}>
    {referrals && referrals.map (referral => {
        return <div key={referral._id}> 
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
    <Collapsible trigger={<h5>Referral Number: {referral.referralNumber}</h5>} style={{backgroundColor: '#fff'}}>
      <div style={{
        display: 'grid',
        width:'100%',
        gridTemplateRows: '40px 40px 40px 40px 40px 10px',
        gridTemplateColumns: '400px 400px',


      }}>
    <p>Student ID: {referral.studentID}</p>
    <p>Student: {referral.studentName}</p>
    <p>Date: {referral.date.split('T')[0]}</p>
    <p>Cause: {referral.cause}</p>
    <p>Action: {referral.action}</p>
    <p>Employee ID: {referral.employeeID}</p>
    <p>Parent Contact Number: {referral.parentPhoneNumber}</p>
    <div></div>
    <div>
    <NavLink to={`/referrals/edit/${referral._id}`}>
    <Button style={{backgroundColor: '#D1913C', color:'#000', border: '0'}}>Edit Referral</Button>
    </NavLink>
    </div>
    <div>
    <Button
  onClick={() => deleteReferral(referral._id)}
  style={{ backgroundColor: "#c75252", color: "#000", border: "0" }}
>
  Delete Referral
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
<NavLink to="/referrals/create" activeStyle>
    <Button>Create Referral</Button>
</NavLink>
</div>
</div>     
}
export default Referrals;