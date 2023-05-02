import { useState, useEffect } from "react";
import styled, {createGlobalStyle, css} from 'styled-components';
import axios from "axios";
import { FaBorderStyle } from "react-icons/fa";


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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
` 

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  height: 100%;
  padding: 0 20px;
  padding-bottom: 2%;

`
const StyledForm = styled.form`
  width: 100%;
  max-width: 1000px;
  padding: 40px; 
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
`

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}

`
const StyledTextArea = styled.textarea`

`

const StyledButton = styled.button`
  display: block;
  background-color: #D1913C;
  color: #fff;
  font-size: .9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  boz-sizing: border-box;

`

const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  
  legend{
    padding: 0 10px;
  }

  label{
    padding-right: 20px;
  }

  input{
    margin-right: 10px;
  }
  `
const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`

function CreateReferrals() {
  // State
  const [referrals, SetReferrals] = useState(null);
  const [error, setError] = useState('');
  const [createForm, SetCreateForm] = useState({
    referralNumber: '',
    studentID: '',
    studentName: '',
    date: '',
    cause: '', 
    action: '',
    employeeID: '', 
    parentPhoneNumber: ''
  });

  //User Effect
  useEffect (() => {
    getReferrals();
  }, []);

  //Functions 
  const getReferrals = async () => {
    //get students
    const res = await axios.get('https://carpenterservice.onrender.com/referrals');
    //set state
    SetReferrals(res.data.referrals);
  };

  const UpdateCreateFormField = (e) => {
    const {name, value} = e.target;

    SetCreateForm({
      ...createForm,
      [name]: value,

    })

  };

  const CreateReferral = async (e) => {
    e.preventDefault();

    //Check errors here


    // Create the student
    const res = await axios.post("https://carpenterservice.onrender.com/referrals", createForm);
    //Update state
    console.log(res);
    SetReferrals([...referrals, res.data.referral]);

    //Clear form state
    SetCreateForm({
        referralNumber: '',
        studentID: '',
        studentName: '',
        date: '',
        cause: '', 
        action: '',
        employeeID: '', 
        parentPhoneNumber: ''
    })
    
  }
  
  return( 
  <>
  <GlobalStyle/>
    <StyledFormWrapper>
      <StyledForm onSubmit={CreateReferral}>
        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Create Referral</h2>
          <label htmlFor="referralNumber">Referral Number: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.referralNumber}
            name="referralNumber"
            type="Number"
          />
          <label htmlFor="studentID">Student ID: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.studentID}
            name="studentID"
            type="number"
          />
          <label htmlFor="studentName">Student Name: </label>
          <StyledInput
          onChange={UpdateCreateFormField}
          value={createForm.studentName}
          name="studentName"
          />
          <label htmlFor="date">Date: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.date}
            type="date"
            name="date"
          />
          <label htmlFor="cause">Cause: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.cause}
            name="cause"
          />
          <label htmlFor="action">Action: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.action}
            name="action"
          />
          <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label htmlFor="employeeID">Employee ID: </label>
                <StyledInput
                  onChange={UpdateCreateFormField}
                  value={createForm.employeeID}
                  name="employeeID"
                  type="Number"
                />
              </div>
              <div>
              <label htmlFor="parentPhoneNumber">Parent Contact Number: </label>
                <StyledInput
                onChange={UpdateCreateFormField}
                value={createForm.parentPhoneNumber}
                name="parentPhoneNumber"
                type="Number"
                />
              </div>
            </div>
          
          {error && (
            <StyledError>
            <p>{error}</p>
            </StyledError>
            )}
          
          <StyledButton type="submit">Create Referral</StyledButton>
  </StyledForm>
  </StyledFormWrapper>
  </>
  );
   
}

export default CreateReferrals;