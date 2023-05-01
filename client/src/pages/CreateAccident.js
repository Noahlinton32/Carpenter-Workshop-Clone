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
  const [accidents, SetAccidents] = useState(null);
  const [errors, setErrors] = useState({});
  const [generatedReportNumber, setGeneratedReportNumber] = useState("");
  const [form, setForm] = useState({
    accidentReportNumber: "",
    studentID: "",
    school: "",
    employeeID: "",
    room: "",
    date: "",
    location: "",
    employeeIDInvolved: "",
    studentIDInvolved: "",
    cause: "",
    response: "",
    preventativeAction: "",
    witnesses: "",
    signed: "",
  });

  const validationRules = {
    accidentReportNumber: { required: true, type: "number" },
    studentID: { required: true, type: "number" },
    school: { required: true, type: "string" },
    employeeID: { required: true, type: "number" },
    room: { required: true, type: "string" },
    date: { required: true, type: "string" },
    location: { required: true, type: "string" },
    employeeIDInvolved: { required: false, type: "number" },
    studentIDInvolved: { required: false, type: "number" },
    cause: { required: true, type: "string" },
    response: { required: true, type: "string" },
    preventativeAction: { required: true, type: "string" },
    witnesses: { required: false, type: "string" },
    signed: { required: true, type: "string" },
  };

  const validateForm = (form) => {
    const errors = {};

    for (const key in validationRules) {
      const rule = validationRules[key];
      const value = form[key];

      if (rule.required && (value === null || value === "")) {
        errors[key] = `${key} is required`;
      } else if (rule.type && typeof value !== rule.type) {
        errors[key] = `${key} must be a ${rule.type}`;
      }
    }

    return errors;
  };

  const generateAccidentReportNumber = async () => {
    let unique = false;
    let accidentReportNumber;

    while (!unique) {
      accidentReportNumber = "A" + Math.floor(Math.random() * 1000000);
      const res = await axios.get(`http://localhost:3000/accidents/${accidentReportNumber}`);
      if (!res.data.accident) {
        unique = true;
      }
    }
    setGeneratedReportNumber(accidentReportNumber);
  };

  useEffect(() => {
    getAccidents();
    (async () => {
      const accidentReportNumber = await generateAccidentReportNumber();
      setForm({
        ...form,
        accidentReportNumber,
      });
    })();
  }, []);

  // Functions
  const getAccidents = async () => {
    // get students
    const res = await axios.get("http://localhost:3000/accidents");
    // set state
    SetAccidents(res.data.accidents);
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/accidents", form);
      if (response.status === 201) {
        SetAccidents([...accidents, response.data]);
        setErrors('');
      } else {
        setErrors('Error creating accident report. Please try again.');
      }
    } catch (error) {
      setErrors(`Error: ${error.message}`);
    }
  }

  
  return( 
<>
  <GlobalStyle />
  <StyledFormWrapper>
    <StyledForm onSubmit={handleSubmit}>
      <h2>Edit Accident</h2>

      <div style={{ display: 'grid', gridGap: '10px', gridTemplateColumns: '50% 50%' }}>
        <div>
        <label htmlFor="accidentReportNumber">Accident Report Number:</label>
            <StyledInput
              onChange={handleChange}
              value={generatedReportNumber}
              type="number"
              name="accidentReportNumber"
              disabled
            />
        </div>
        <div>
          <label htmlFor="studentID">Student ID:</label>
          <StyledInput
            onChange={(event) => setForm({ ...form, studentID: event.target.value })}
            value={form.studentID}
            name="studentID"
          />
          {errors.studentID && <StyledError>{errors.studentID}</StyledError>}
        </div>
      </div>

      <label htmlFor="school">School:</label>
      <StyledInput
        onChange={(event) => setForm({ ...form, school: event.target.value })}
        value={form.school}
        name="school"
      />
      {errors.school && <StyledError>{errors.school}</StyledError>}

      <div style={{ display: 'grid', gridGap: '10px', gridTemplateColumns: '50% 50%' }}>
        <div>
          <label htmlFor="employeeID">Employee ID:</label>
          <StyledInput
            onChange={(event) => setForm({ ...form, employeeID: event.target.value })}
            value={form.employeeID}
            name="employeeID"
          />
          {errors.employeeID && <StyledError>{errors.employeeID}</StyledError>}
        </div>
        <div>
          <label htmlFor="room">Room:</label>
          <StyledInput
            onChange={(event) => setForm({ ...form, room: event.target.value })}
            value={form.room}
            name="room"
          />
          {errors.room && <StyledError>{errors.room}</StyledError>}
        </div>
      </div>

      <label htmlFor="date">Date:</label>
      <StyledInput
        onChange={(event) => setForm({ ...form, date: event.target.value })}
        value={form.date}
        type="date"
        name="date"
        style={{ width: '50%' }}
      />
      {errors.date && <StyledError>{errors.date}</StyledError>}

      <label htmlFor="location">Location:</label>
      <StyledInput
        onChange={(event) => setForm({ ...form, location: event.target.value })}
        value={form.location}
        name="location"
      />
      {errors.location && <StyledError>{errors.location}</StyledError>}

      <div style={{ display: 'grid', gridGap: '10px', gridTemplateColumns: '50% 50%' }}>
        <div>
          <label htmlFor="employeeIDInvolved">Staff Involved:</label>
          <StyledInput
            onChange={(event) => setForm({ ...form, employeeIDInvolved: event.target.value })}
            value={form.employeeIDInvolved}
            name="employeeIDInvolved"
            type="number"
          />
          {errors.employeeIDInvolved && <StyledError>{errors.employeeIDInvolved}</StyledError>}
        </div>
        <div>
          <label htmlFor="supervisorID">Supervisor ID:</label>
          <StyledInput
              onChange={(event) => setForm({ ...form, supervisorID: event.target.value })}
              value={form.supervisorID}
              name="supervisorID"
              type="number"
            />
            {errors.supervisorID && <StyledError>{errors.supervisorID}</StyledError>}
          </div>
        </div>
    
        <label htmlFor="description">Description of Accident:</label>
        <StyledTextArea
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          value={form.description}
          name="description"
        />
        {errors.description && <StyledError>{errors.description}</StyledError>}
    
        <label htmlFor="actionTaken">Action Taken:</label>
        <StyledTextArea
          onChange={(event) => setForm({ ...form, actionTaken: event.target.value })}
          value={form.actionTaken}
          name="actionTaken"
        />
        {errors.actionTaken && <StyledError>{errors.actionTaken}</StyledError>}
    
        <StyledButton type="submit">Create</StyledButton>
      </StyledForm>
      {errors.nonFieldErrors && <StyledError>{errors.nonFieldErrors}</StyledError>}
    </StyledFormWrapper>
    </>
  );
   
}

export default CreateAccidents;