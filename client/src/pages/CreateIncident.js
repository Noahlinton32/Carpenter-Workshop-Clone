import { useState, useEffect } from "react";
import axios from "axios";
import styled, {createGlobalStyle, css} from 'styled-components';
import {NavLink} from "../components/Navbar/NavbarElements";
import { Navigate, useNavigate } from "react-router-dom";

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
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
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






function CreateIncidents() {
  // State
  const [incidents, SetIncidents] = useState(null);
  const [error, setError] = useState('');
  const [createForm, SetCreateForm] = useState({
    incidentReportNumber: '',
    studentID: '',
    agencyOrProgram: '',
    contactNumber: '',
    address: '',
    incidentType: '', 
    incidentTypeOther: '',
    location: '', 
    date: '', 
    employeeID: '', 
    firstNameParticipant: '', 
    lastNameParticipant: '', 
    dateTimeReport: '', 
    firstNameReport: '', 
    lastNameReport: '',
    contactReportNumber: '', 
    contactReportEmail: '', 
    firstNameManager: '', 
    lastNameManager: '', 
    phoneNumberManager: '', 
    emailAddressManager: '', 
    signed: ''
  });

  //User Effect
  useEffect (() => {
    getIncidents();
  }, []);

  //Functions 
  const getIncidents = async () => {
    //get incidents
    const res = await axios.get('http://localhost:3000/incidents');
    //set state
    SetIncidents(res.data.incidents);
  };

  const UpdateCreateFormField = (e) => {
    const {name, value} = e.target;

    SetCreateForm({
      ...createForm,
      [name]: value,

    })

  };

  const CreateIncident = async (e) => {
    e.preventDefault();
    //functions to check errors

    //check errors here


    // Create the incident
    const res = await axios.post("http://localhost:3000/incidents", createForm);
    //Update state
    console.log(res);
    SetIncidents([...incidents, res.data.incident]);

    //Clear form state
    SetCreateForm({
        incidentReportNumber: '',
        studentID: '',
        agencyOrProgram: '',
        contactNumber: '',
        address: '',
        incidentType: '', 
        incidentTypeOther: '',
        location: '', 
        date: '', 
        employeeID: '', 
        firstNameParticipant: '', 
        lastNameParticipant: '', 
        dateTimeReport: '', 
        firstNameReport: '', 
        lastNameReport: '',
        contactReportNumber: '', 
        contactReportEmail: '', 
        firstNameManager: '', 
        lastNameManager: '', 
        phoneNumberManager: '', 
        emailAddressManager: '', 
        signed: '',
    })
  }
  
  return( 
    <>
    <GlobalStyle/>
      <StyledFormWrapper>
        <StyledForm onSubmit={CreateIncident}>
          <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Create Incident</h2>
          <label htmlFor="incidentReportNumber">Incident Report Number: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.incidentReportNumber}
              name="incidentReportNumber"
              type="Number"            
            />
            <label htmlFor="studentID">Student ID: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.studentID}
              name='studentID'
              type="Number"
            />
            <label htmlFor="agencyOrProgram">Agency or Program: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.agencyOrProgram}
              name="agencyOrProgram"
            />
            <label htmlFor="contactNumber">Contact Number: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.contactNumber}
              name="contactNumber"
              type="Number"
            />
            <label htmlFor="address">Address: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.address}
              name="address"            
            />
            <StyledFieldset
              onChange={UpdateCreateFormField}
              value={createForm.incidentType}
              name="incidentType"
            >
              <legend>Incident Type</legend>
                <label>
                  <input type="radio" value="Media Coverage" name="incident" />
                  Media Coverage
                </label>
                <label>
                  <input type="radio" value="Program Awards" name="incident" />
                  Program Awards
                </label>
                <label>
                  <input type="radio" value="Injury to Participant" name="incident" />
                  Injury to Participant
                </label>
                <label>
                  <input type="radio" value="Illness" name="incident" />
                  Illness                  
                </label>
                <label>
                  <input type="radio" value="Missing Participants" name="incident" />
                  Missing Participants
                </label>
                <label>
                  <input type="radio" value="Notable Participant Achievements" name="incident" />
                  Notable Participant Achievements
                </label>
                <label>
                  <input type="radio" value="Auto Accident" name="incident" />
                  Auto Accident
                </label>
                <label>
                  <input type="radio" value="Injury to Employee" name="incident" />
                  Injury to Employee
                </label>
                <label>
                  <input type="radio" value="Behavior Requiring Disciplinary Action" name="incident" />
                  Behavior Requiring Disciplinary Action
                </label>
            </StyledFieldset>
            <label htmlFor="incidentTypeOther">Other: </label>
            <StyledTextArea
              onChange={UpdateCreateFormField}
              value={createForm.incidentTypeOther}
              name="incidentTypeOther"
            />
            <label htmlFor="location">Location: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.location}
              name="location"
            />
            <label htmlFor="date">Date: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.date}
              type="date"
              name="date"
            />
            <label htmlFor="employeeID">Employee ID: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.employeeID}
              name="employeeID"
            />
            <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label htmlFor="firstNameParticipant">Participant's 1st Name: </label>
                <StyledInput
                  onChange={UpdateCreateFormField}
                  value={createForm.firstNameParticipant}
                  name="firstNameParticipant"
                />
              </div>
              <div>
              <label htmlFor="lastNameParticipant">Participant's Last Name: </label>
                <StyledInput
                onChange={UpdateCreateFormField}
                value={createForm.lastNameParticipant}
                name="lastNameParticipant"
                />
              </div>
            </div>
            <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label htmlFor="firstNameReport">Reporter's 1st Name: </label>
                <StyledInput
                  onChange={UpdateCreateFormField}
                  value={createForm.firstNameReport}
                  name="firstNameReport"
                />
              </div>
              <div>
              <label htmlFor="lastNameReport">Reporter's Last Name: </label>
                <StyledInput
                onChange={UpdateCreateFormField}
                value={createForm.lastNameReport}
                name="lastNameReport"
                />
              </div>
            </div>
            <label htmlFor="contactReportNumber">Reporter's Contact Number: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.contactReportNumber}
              name="contactReportNumber"
            />
            <label htmlFor="contactReportEmail">Reporter's Email: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.contactReportEmail}
              name="contactReportEmail"
              type="email" 
            />
            <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label htmlFor="firstNameManager">Managers's 1st Name: </label>
                <StyledInput
                  onChange={UpdateCreateFormField}
                  value={createForm.firstNameManager}
                  name="firstNameManager"
                />
              </div>
              <div>
              <label htmlFor="lastNameManager">Managers's Last Name: </label>
                <StyledInput
                onChange={UpdateCreateFormField}
                value={createForm.lastNameManager}
                name="lastNameManager"
                />
              </div>
            </div>
            <label htmlFor="phoneNumberManager">Manager's Contact Number: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.phoneNumberManager}
              name="phoneNumberManager"
            />
            <label htmlFor="emailAddressManager">Manager's Email: </label>
            <StyledInput
              onChange={UpdateCreateFormField}
              value={createForm.emailAddressManager}
              name="emailAddressManager"
              type="email"
            />
            <StyledFieldset
              onChange={UpdateCreateFormField}
              value={createForm.signed}
              name="signed"
            >
              <legend>Signed?</legend>
                <label>
                  <input type="radio" value="Yes" name="signed" />
                  Yes
                </label>
                <label>
                  <input type="radio" value="No" name="signed" />
                  No
                </label>
            </StyledFieldset>
            {error && (
              <StyledError>
              <p>{error}</p>
              </StyledError>
              )}

            <StyledButton type="submit">Create Incident</StyledButton>

    </StyledForm>
    </StyledFormWrapper>
    </>
  ); 
}

export default CreateIncidents;
