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


const EditReferral = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    referralNumber: '',
    studentID: '',
    studentName: '',
    date: '',
    cause: '',
    action: '',
    employeeID: '',
    parentPhoneNumber: '',
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
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
      }
    }

    return errors;
  };

  const validationRules = {
    referralNumber: { required: true, type: 'number' },
    studentID: { required: true, type: 'number' },
    studentName: { required: true, type: 'string' },
    date: { required: true, type: 'string' },
    cause: { required: true, type: 'string' },
    action: { required: true, type: 'string' },
    employeeID: { required: true, type: 'number' },
    parentPhoneNumber: { required: true, type: 'number' },
  };

  useEffect(() => {
    const getReferral = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/referrals/${id}`);
        const referralData = res.data.referral;
        referralData.date = formatDate(referralData.date);
        setForm(referralData);
      } catch (error) {
        console.error("Failed to fetch referral data:", error);
      }
    };
    getReferral();
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
      await axios.put(`http://localhost:3000/referrals/${id}`, formWithoutCircularReferences);
      navigate('/referrals');
    }
  };
  return (
    <>
    <GlobalStyle/>
    <StyledFormWrapper>

      <StyledForm onSubmit={handleSubmit}>
      <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Edit Referral</h2>
      <label htmlFor="referralNumber">Referral Number: </label>
    <StyledInput
      type="number"
      id="referralNumber"
      name="referralNumber"
      value={form.referralNumber}
      onChange={handleChange}
      disabled
    />
    {errors.referralNumber && (
      <p className="error">{errors.referralNumber}</p>
    )}

    <label htmlFor="studentID">Student ID: </label>
    <StyledInput
      type="number"
      id="studentID"
      name="studentID"
      value={form.studentID}
      onChange={handleChange}
    />
    {errors.studentID && <p className="error">{errors.studentID}</p>}

    <label htmlFor="studentName">Student Name: </label>
    <StyledInput
      type="text"
      id="studentName"
      name="studentName"
      value={form.studentName}
      onChange={handleChange}
    />
    {errors.studentName && (
      <p className="error">{errors.studentName}</p>
    )}

    <label htmlFor="date">Date: </label>
    <StyledInput
      type="date"
      id="date"
      name="date"
      value={form.date}
      onChange={handleChange}
    />
    {errors.date && <p className="error">{errors.date}</p>}

    <label htmlFor="cause">Cause: </label>
    <StyledInput
      type="text"
      id="cause"
      name="cause"
      value={form.cause}
      onChange={handleChange}
    />
    {errors.cause && <p className="error">{errors.cause}</p>}

    <label htmlFor="action">Action: </label>
    <StyledInput
      type="text"
      id="action"
      name="action"
      value={form.action}
      onChange={handleChange}
    />
    {errors.action && <p className="error">{errors.action}</p>}

    <label htmlFor="employeeID">Employee ID: </label>
    <StyledInput
      type="number"
      id="employeeID"
      name="employeeID"
      value={form.employeeID}
      onChange={handleChange}
    />
    {errors.employeeID && (
      <p className="error">{errors.employeeID}</p>
    )}

    <label htmlFor="parentPhoneNumber">Parent Contact Number: </label>
    <StyledInput
      type="number"
      id="parentPhoneNumber"
      name="parentPhoneNumber"
      value={form.parentPhoneNumber}
      onChange={handleChange}
    />
    {errors.parentPhoneNumber && (
      <p className="error">{errors.parentPhoneNumber}</p>
    )}

    <StyledButton type="submit">Update Referral</StyledButton>
  </StyledForm>
  </StyledFormWrapper>
</>

);
};

export default EditReferral;