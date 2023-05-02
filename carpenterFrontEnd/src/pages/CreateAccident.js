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

function CreateAccidents() {
  // State
  const [accidents, SetAccidents] = useState(null);
  const [error, setError] = useState('');
  const [createForm, SetCreateForm] = useState({
    accidentReportNumber: '',
    studentID: '',
    school: '',
    employeeID: '', 
    room: '', 
    date: '',
    location: '', 
    employeeIDInvolved: '', 
    studentIDInvolved: '',
    cause: '',
    response: '',
    preventativeAction: '', 
    witnesses: '',
    signed: ''
  });

  //User Effect
  useEffect (() => {
    getAccidents();
  }, []);

  //Functions 
  const getAccidents = async () => {
    //get students
    const res = await axios.get('http://localhost:3000/accidents');
    //set state
    SetAccidents(res.data.accidents);
  };

  const UpdateCreateFormField = (e) => {
    const {name, value} = e.target;

    SetCreateForm({
      ...createForm,
      [name]: value,

    })

  };

  const CreateAccident = async (e) => {
    e.preventDefault();

    //Check errors here


    // Create the student
    const res = await axios.post("http://localhost:3000/accidents", createForm);
    //Update state
    console.log(res);
    SetAccidents([...accidents, res.data.accident]);

    //Clear form state
    SetCreateForm({
        accidentReportNumber: '',
        studentID: '',
        school: '',
        employeeID: '', 
        room: '', 
        date: '',
        location: '', 
        employeeIDInvolved: '', 
        studentIDInvolved: '',
        cause: '',
        response: '',
        preventativeAction: '', 
        witnesses: '',
        signed: ''
    })
    
  }
  
  return( 
  <>
  <GlobalStyle/>
    <StyledFormWrapper>
      <StyledForm onSubmit={CreateAccident}>
        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Create Accident</h2>
          <label htmlFor="accidentReportNumber">Accident Report Number: </label>
          <StyledInput 
            onChange={UpdateCreateFormField}
            value={createForm.accidentReportNumber} 
            type='Number' 
            name="accidentReportNumber"
          />
          <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label htmlFor="studentID">Student ID: </label>
                <StyledInput
                  onChange={UpdateCreateFormField}
                  value={createForm.studentID}
                  name="studentID"
                />
              </div>
              <div>
              <label htmlFor="employeeID">Employee ID: </label>
                <StyledInput
                onChange={UpdateCreateFormField}
                value={createForm.employeeID}
                name="employeeID"
                />
              </div>
            </div>
          <label htmlFor="school">School: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.school}
            name="school"
          />          
          <label htmlFor="room">Room: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.room}
            name="room"
          />
          <label htmlFor="date">Date: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.date}
            type="date"
            name="date"
          />
          <label htmlFor="location">Location: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.location}
            name="location"
          />
          <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label htmlFor="employeeIDInvolved">Staff Involved: </label>
                <StyledInput
                  onChange={UpdateCreateFormField}
                  value={createForm.employeeIDInvolved}
                  name="employeeIDInvolved"
                  type="Number"
                />
              </div>
              <div>
              <label htmlFor="studentIDInvolved">Other Student Involved ID: </label>
                <StyledInput
                onChange={UpdateCreateFormField}
                value={createForm.studentIDInvolved}
                name="studentIDInvolved"
                />
              </div>
            </div>
          <label htmlFor="cause">Cause: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.cause}
            name="cause"
          />
          <label htmlFor="response">Response: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.response}
            name="response"
          />
          <label htmlFor="preventativeAction">preventative Action Taken: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.preventativeAction}
            name="preventativeAction"
          />
          <label htmlFor="witnesses">Witness: </label>
          <StyledInput
            onChange={UpdateCreateFormField}
            value={createForm.witnesses}
            name="witnesses"
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
          
          <StyledButton type="submit">Create Accident</StyledButton>
  </StyledForm>
  </StyledFormWrapper>
  </>
  );
   
}

export default CreateAccidents;