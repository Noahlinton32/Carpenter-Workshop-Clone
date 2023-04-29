import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import styled, {createGlobalStyle, css} from 'styled-components';


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



const EditAccident = () => {
    const { id } = useParams();
    const navigate = useNavigate();
      const [form, setForm] = useState({
        accidentReportNumber: '',
        studentID: '',
        employeeID: '',
        school: '',
        room: '',
        date: '',
        location: '',
        employeeIDInvolved: '',
        studentIDInvolved: '',
        cause: '',
        response: '',
        preventativeAction: '',
        witnesses: '',
        signed: '',
      });
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };
      useEffect(() => {
        const getAccident = async () => {
          try {
            const res = await axios.get(`http://localhost:3000/accidents/${id}`);
            const accidentData = res.data.accident;
            accidentData.date = formatDate(accidentData.date);
            setForm(accidentData);
          } catch (error) {
            console.error("Failed to fetch accident data:", error);
          }
        };
        getAccident();
      }, [id]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      await axios.put(`http://localhost:3000/accidents/${id}`, form);
      navigate('/accidents');
    };
  
    return (
      <>
      <GlobalStyle/>
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
        <h2>Edit Accident</h2>

         <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '50% 50%' }}>     
         <div>
        <label htmlFor="accidentReportNumber">Accident Report Number:</label>
        <StyledInput
          onChange={setForm}
          value={form.accidentReportNumber}
          type="number"
          name="accidentReportNumber"
          disabled
        />
        </div>
        <div>
          <label htmlFor="studentID">Student ID:</label>
          <StyledInput
            onChange={setForm}
            value={form.studentID}
            name="studentID"
          />
        </div>
        </div>

          <label htmlFor="employeeID">Employee ID:</label>
          <StyledInput
            onChange={setForm}
            value={form.employeeID}
            name="employeeID"
          />

      
        <label htmlFor="school">School:</label>
        <StyledInput
          onChange={setForm}
          value={form.school}
          name="school"
        />
        <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '50% 50%' }}>    
        <div>
        <label htmlFor="room">Room:</label>
        <StyledInput
          onChange={setForm}
          value={form.room}
          name="room"
        />
        </div>
      <div>
        <label htmlFor="date">Date:</label>
        <StyledInput
          onChange={setForm}
          value={form.date}
          type="date"
          name="date"
        />
        </div>
      </div>
        <label htmlFor="location">Location:</label>
        <StyledInput
          onChange={setForm}
          value={form.location}
          name="location"
        />
      <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '50% 50%' }}>
        <div>
          <label htmlFor="employeeIDInvolved">Staff Involved:</label>
          <StyledInput
            onChange={setForm}
            value={form.employeeIDInvolved}
            name="employeeIDInvolved"
            type="number"
          />
          </div>
      <div>
          <label htmlFor="studentIDInvolved">Other Student Involved ID:</label>
          <StyledInput
            onChange={setForm}
            value={form.studentIDInvolved}
            name="studentIDInvolved"
          />
        </div>
        </div>
        <label htmlFor="cause">Cause:</label>
        <StyledInput
          onChange={setForm}
          value={form.cause}
          name="cause"
        />
      
        <label htmlFor="response">Response:</label>
        <StyledInput
          onChange={setForm}
          value={form.response}
          name="response"
        />
      
        <label htmlFor="preventativeAction">Preventative Action Taken:</label>
        <StyledInput
          onChange={setForm}
          value={form.preventativeAction}
          name="preventativeAction"
        />
      
        <label htmlFor="witnesses">Witness:</label>
        <StyledInput
          onChange={setForm}
          value={form.witnesses}
          name="witnesses"
        />
      
        <StyledFieldset
          onChange={setForm}
          value={form.signed}
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
      
        <StyledButton type="submit">Update Accident</StyledButton>
      </StyledForm>
      </StyledFormWrapper>
      </>
    );
    };
  export default EditAccident;