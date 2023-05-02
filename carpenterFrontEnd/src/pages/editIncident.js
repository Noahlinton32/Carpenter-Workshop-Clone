import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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




const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    incidentReportNumber: 0,
    studentID: 0,
    agencyOrProgram: '',
    contactNumber: 0,
    address: '',
    incidentType: '',
    incidentTypeOther: '',
    location: '',
    date: '',
    employeeID: 0,
    firstNameParticipant: '',
    lastNameParticipant: '',
    firstNameReport: '',
    lastNameReport: '',
    contactReportNumber: 0,
    contactReportEmail: '',
    firstNameManager: '',
    lastNameManager: '',
    phoneNumberManager: 0,
    emailAddressManager: '',
    signed: 0,
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const validateForm = (form) => {
    const errors = {};

    for (const key in validationRules) {
      const rule = validationRules[key];
      const value = form[key];

      if (rule.required && (value === null || value === '')) {
        errors[key] = `${key} is required`;
      } else if (rule.type && typeof value !== rule.type) {
        errors[key] = `${key} must be a ${rule.type}`;
      } else if (rule.min !== undefined && value < rule.min) {
        errors[key] = `${key} must be at least ${rule.min}`;
      } else if (rule.max !== undefined && value > rule.max) {
        errors[key] = `${key} must be at most ${rule.max}`;
      }
    }

    return errors;
  };
  const validationRules = {
    incidentReportNumber: { required: true, type: 'number' },
    studentID: { required: true, type: 'number' },
    agencyOrProgram: { required: true, type: 'string' },
    contactNumber: { required: true, type: 'number' },
    address: { required: true, type: 'string' },
    incidentType: { required: true, type: 'string' },
    incidentTypeOther: { required: false, type: 'string' },
    location: { required: true, type: 'string' },
    date: { required: true, type: 'string' },
    employeeID: { required: true, type: 'number' },
    firstNameParticipant: { required: true, type: 'string' },
    lastNameParticipant: { required: true, type: 'string' },
    firstNameReport: { required: true, type: 'string' },
    lastNameReport: { required: true, type: 'string' },
    contactReportNumber: { required: true, type: 'number' },
    contactReportEmail: { required: true, type: 'string' },
    firstNameManager: { required: true, type: 'string' },
    lastNameManager: { required: true, type: 'string' },
    phoneNumberManager: { required: true, type: 'number' },
    emailAddressManager: { required: true, type: 'string' },
    signed: { required: true, type: 'number', min: 0, max: 1 },
  };
  useEffect(() => {
    const getIncident = async () => {
      try {
        const res = await axios.get(`hhttps://carpenterservice.onrender.com/incidents/${id}`);
        const incidentData = res.data.incident;
        incidentData.date = formatDate(incidentData.date);
        setForm(incidentData);
      } catch (error) {
        console.error("Failed to fetch incident data:", error);
      }
    };
    getIncident();
  }, [id]);
  const removeCircularReferences = (obj) => {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(form);
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      console.error("Form validation errors:", errors);
      setErrors(errors);
    } else {
      const formWithoutCircularReferences = removeCircularReferences(form);
      await axios.put(`hhttps://carpenterservice.onrender.com/incidents/${id}`, formWithoutCircularReferences);
      navigate('/incidents');
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    const convertedValue = validationRules[name].type === 'number' && !isNaN(parseFloat(value)) ? parseFloat(value) : value;
    setForm((prevForm) => ({ ...prevForm, [name]: convertedValue }));
  };
  return (
    <>
    <GlobalStyle/>
    <StyledFormWrapper>
      
      <StyledForm onSubmit={handleSubmit}>
      <h1>Edit Incident</h1>
        <label htmlFor="incidentReportNumber">Incident Report Number</label>
        <StyledInput
          type="number"
          id="incidentReportNumber"
          name="incidentReportNumber"
          value={form.incidentReportNumber}
          onChange={handleChange}
          disabled
        />
        {errors.incidentReportNumber && (
          <p className="error">{errors.incidentReportNumber}</p>
        )}

        <label htmlFor="studentID">Student ID</label>
        <StyledInput
          type="number"
          id="studentID"
          name="studentID"
          value={form.studentID}
          onChange={handleChange}
        />
        {errors.studentID && <p className="error">{errors.studentID}</p>}

        <label htmlFor="agencyOrProgram">Agency or Program</label>
        <StyledInput
          type="text"
          id="agencyOrProgram"
          name="agencyOrProgram"
          value={form.agencyOrProgram}
          onChange={handleChange}
        />
        {errors.agencyOrProgram && (
          <p className="error">{errors.agencyOrProgram}</p>
        )}

        <label htmlFor="contactNumber">Contact Number</label>
        <StyledInput
          type="number"
          id="contactNumber"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
        />
        {errors.contactNumber && (
          <p className="error">{errors.contactNumber}</p>
        )}

        <label htmlFor="address">Address</label>
        <StyledInput
          type="text"
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}



        <StyledFieldset
        id="incidentType"
        name="incidentType"
        value={form.incidentType}
        onChange={handleChange}
      >
        <legend>Incident Type</legend>
        <label>
          <input
            type="radio"
            value="Media Coverage"
            name="incidentType"
            checked={form.incidentType === "Media Coverage"}
            onChange={handleChange}
          />
          Media Coverage
        </label>
        <label>
          <input
            type="radio"
            value="Program Awards"
            name="incidentType"
            checked={form.incidentType === "Program Awards"}
            onChange={handleChange}
          />
          Program Awards
        </label>
        <label>
          <input
            type="radio"
            value="Injury to Participant"
            name="incidentType"
            checked={form.incidentType === "Injury to Participant"}
            onChange={handleChange}
          />
          Injury to Participant
        </label>
        <label>
          <input
            type="radio"
            value="Illness"
            name="incidentType"
            checked={form.incidentType === "Illness"}
            onChange={handleChange}
          />
          Illness
        </label>
        <label>
          <input
            type="radio"
            value="Missing Participants"
            name="incidentType"
            checked={form.incidentType === "Missing Participants"}
            onChange={handleChange}
          />
          Missing Participants
        </label>
        <label>
          <input
            type="radio"
            value="Notable Participant Achievements"
            name="incidentType"
            checked={form.incidentType === "Notable Participant Achievements"}
            onChange={handleChange}
          />
          Notable Participant Achievements
        </label>
        <label>
          <input
            type="radio"
            value="Auto Accident"
            name="incidentType"
            checked={form.incidentType === "Auto Accident"}
            onChange={handleChange}
          />
          Auto Accident
        </label>
        <label>
          <input
            type="radio"
            value="Injury to Employee"
            name="incidentType"
            checked={form.incidentType === "Injury to Employee"}
            onChange={handleChange}
          />
          Injury to Employee
        </label>
        <label>
          <input
            type="radio"
            value="Behavior Requiring Disciplinary Action"
            name="incidentType"
            checked={form.incidentType === "Behavior Requiring Disciplinary Action"}
            onChange={handleChange}
          />
          Behavior Requiring Disciplinary Action
        </label>
      </StyledFieldset>
      {errors.incidentType && (
        <p className="error">{errors.incidentType}</p>
      )}

        <label htmlFor="incidentTypeOther">Incident Type (Other)</label>
        <StyledInput
          type="text"
          id="incidentTypeOther"
          name="incidentTypeOther"
          value={form.incidentTypeOther}
          onChange={handleChange}
        />
        {errors.incidentTypeOther && (
          <p className="error">{errors.incidentTypeOther}</p>
        )}

        <label htmlFor="location">Location</label>
        <StyledInput
          type="text"
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}

        <label htmlFor="date">Date</label>
        <StyledInput
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        {errors.date && <p className="error">{errors.date}</p>}
        <label htmlFor="employeeID">Employee ID</label>
        <StyledInput
          type="number"
          id="employeeID"
          name="employeeID"
          value={form.employeeID}
          onChange={handleChange}
        />
        {errors.employeeID && <p className="error">{errors.employeeID}</p>}

        <label htmlFor="firstNameParticipant">First Name (Participant)</label>
        <StyledInput
          type="text"
          id="firstNameParticipant"
          name="firstNameParticipant"
          value={form.firstNameParticipant}
          onChange={handleChange}
        />
        {errors.firstNameParticipant && (
          <p className="error">{errors.firstNameParticipant}</p>
        )}

        <label htmlFor="lastNameParticipant">Last Name (Participant)</label>
        <StyledInput
          type="text"
          id="lastNameParticipant"
          name="lastNameParticipant"
          value={form.lastNameParticipant}
          onChange={handleChange}
        />
        {errors.lastNameParticipant && (
          <p className="error">{errors.lastNameParticipant}</p>
        )}

        <label htmlFor="firstNameReport">First Name (Report)</label>
        <StyledInput
          type="text"
          id="firstNameReport"
          name="firstNameReport"
          value={form.firstNameReport}
          onChange={handleChange}
        />
        {errors.firstNameReport && (
          <p className="error">{errors.firstNameReport}</p>
        )}

        <label htmlFor="lastNameReport">Last Name (Report)</label>
        <StyledInput
          type="text"
          id="lastNameReport"
          name="lastNameReport"
          value={form.lastNameReport}
          onChange={handleChange}
        />
        {errors.lastNameReport && (
          <p className="error">{errors.lastNameReport}</p>
        )}

        <label htmlFor="contactReportNumber">Contact Report Number</label>
        <StyledInput
          type="number"
          id="contactReportNumber"
          name="contactReportNumber"
          value={form.contactReportNumber}
          onChange={handleChange}
        />
        {errors.contactReportNumber && (
          <p className="error">{errors.contactReportNumber}</p>
        )}

        <label htmlFor="contactReportEmail">Contact Report Email</label>
        <StyledInput
          type="email"
          id="contactReportEmail"
          name="contactReportEmail"
          value={form.contactReportEmail}
          onChange={handleChange}
        />
        {errors.contactReportEmail && (
          <p className="error">{errors.contactReportEmail}</p>
        )}

        <label htmlFor="firstNameManager">First Name (Manager)</label>
        <StyledInput
          type="text"
          id="firstNameManager"
          name="firstNameManager"
          value={form.firstNameManager}
          onChange={handleChange}
        />
        {errors.firstNameManager && (
          <p className="error">{errors.firstNameManager}</p>
        )}

        <label htmlFor="lastNameManager">Last Name (Manager)</label>
        <StyledInput
          type="text"
          id="lastNameManager"
          name="lastNameManager"
          value={form.lastNameManager}
          onChange={handleChange}
        />
        {errors.lastNameManager && (
          <p className="error">{errors.lastNameManager}</p>
        )}

        <label htmlFor="phoneNumberManager">Phone Number (Manager)</label>
        <StyledInput
          type="number"
          id="phoneNumberManager"
          name="phoneNumberManager"
          value={form.phoneNumberManager}
          onChange={handleChange}
        />
        {errors.phoneNumberManager && (
          <p className="error">{errors.phoneNumberManager}</p>
        )}
        <label htmlFor="emailAddressManager">Email Address (Manager)</label>
        <StyledInput
          type="email"
          id="emailAddressManager"
          name="emailAddressManager"
          value={form.emailAddressManager}
          onChange={handleChange}
        />
        {errors.emailAddressManager && (
          <p className="error">{errors.emailAddressManager}</p>
        )}
        <StyledFieldset
          type="checkbox"
          id="signed"
          name="signed"
          checked={form.signed}
          onChange={(event) =>
            setForm({ ...form, signed: event.target.checked })
          }
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
        {errors.signed && <p className="error">{errors.signed}</p>}

        <StyledButton type="submit">Update Incident</StyledButton>
      </StyledForm>
    </StyledFormWrapper>
    </>
  );
};

export default EditIncident;