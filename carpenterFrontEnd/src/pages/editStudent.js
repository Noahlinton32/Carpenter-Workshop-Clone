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

const styledFieldset = styled.fieldset`
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




const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    studentID: '',
    name: '',
    address: '',
    gpa: '',
    grade: '',
    firstNameFirstGuardian: '',
    lastNameFirstGuardian: '',
    firstNameSecondGuardian: '',
    lastNameSecondGuardian: '',
    emergencyNumber: '',
    enrollmentDate: '',
    graduationDate: '',
    isActive: '',
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
    studentID: { required: true, type: 'number' },
    name: { required: true, type: 'string' },
    address: { required: true, type: 'string' },
    gpa: { required: true, type: 'number', min: 0, max: 4 },
    grade: { required: true, type: 'string' },
    firstNameFirstGuardian: { required: false, type: 'string' },
    lastNameFirstGuardian: { required: false, type: 'string' },
    firstNameSecondGuardian: { required: false, type: 'string' },
    lastNameSecondGuardian: { required: false, type: 'string' },
    emergencyNumber: { required: true, type: 'number' },
    enrollmentDate: { required: true, type: 'string' },
    graduationDate: { required: true, type: 'string' },
    isActive: { required: true, type: 'number', min: 0, max: 1 },
  };
 useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await axios.get(`hhttps://carpenterservice.onrender.com/students/${id}`);
        const studentData = res.data.student;
        studentData.enrollmentDate = formatDate(studentData.enrollmentDate);
        studentData.graduationDate = formatDate(studentData.graduationDate);
        setForm(studentData);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };
    getStudent();
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
      await axios.put(`hhttps://carpenterservice.onrender.com/students/${id}`, formWithoutCircularReferences);
      navigate('/students');
    }
  };


  return (
    <>
    <GlobalStyle/>
    <StyledFormWrapper>
  <StyledForm onSubmit={handleSubmit}>
  <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Edit Student</h2>
  <label htmlFor="studentID">Student ID: </label>
  <StyledInput 
    type="number"
    name="studentID"
    value={form.studentID || ''}
    onChange={(e) => setForm({ ...form, studentID: parseInt(e.target.value) })}
  />

  <label id="name">Name: </label>
  <StyledInput 
    type="text"
    name="name"
    value={form.name || ''}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />

  <label htmlFor="address" id="address">Address: </label>
  <StyledInput 
    name="address"
    value={form.address || ''}
    onChange={(e) => setForm({ ...form, address: e.target.value })}
  />

  <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
    <div>
      <label htmlFor="gpa" id="gpa">GPA: </label>
      <StyledInput
        type="number"
        name="gpa"
        value={form.gpa || ''}
        onChange={(e) => setForm({ ...form, gpa: parseFloat(e.target.value) })}
        style={{
          width: '100%',
          backgroundColor: '#eee',
          height: '40px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          margin: '10px 0 20px 0',
          padding: '20px',
          boxSizing: 'border-box'
        }}
      />
    </div>
    <div>
      <label htmlFor="grade" id="grade">Grade: </label>
      <StyledInput
        name="grade"
        value={form.grade || ''}
        onChange={(e) => setForm({ ...form, grade: e.target.value })}
        style={{
          width: '100%',
          backgroundColor: '#eee',
          height: '40px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          margin: '10px 0 20px 0',
          padding: '20px',
          boxSizing: 'border-box'
        }}
      />
    </div>
  </div>
      
    <label htmlFor="firstNameFirstGuardian" id="firstNameFirstGuardian">First Name 1st Guardian: </label>
    <StyledInput
      name="firstNameFirstGuardian"
      value={form.firstNameFirstGuardian || ''}
      onChange={(e) => setForm({ ...form, firstNameFirstGuardian: e.target.value })}
    />

    <label htmlFor="lastNameFirstGuardian" id="lastNameFirstGuardian">Last Name 1st Guardian: </label>
    <StyledInput
      name="lastNameFirstGuardian"
      value={form.lastNameFirstGuardian || ''}
      onChange={(e) => setForm({ ...form, lastNameFirstGuardian: e.target.value })}
    />

    <label htmlFor="firstNameSecondGuardian" id="firstNameSecondGuardian">First Name 2nd Guardian: </label>
    <StyledInput
      name="firstNameSecondGuardian"
      value={form.firstNameSecondGuardian || ''}
      onChange={(e) => setForm({ ...form, firstNameSecondGuardian: e.target.value })}
    />

    <label htmlFor="lastNameSecondGuardian" id="lastNameSecondGuardian">Last Name 2nd Guardian: </label>
    <StyledInput
      name="lastNameSecondGuardian"
      value={form.lastNameSecondGuardian || ''}
      onChange={(e) => setForm({ ...form, lastNameSecondGuardian: e.target.value })}
    />

    <label htmlFor="emergencyNumber" id="emergencyNumber">Emergency Number: </label>
    <StyledInput
      type="number"
      name="emergencyNumber"
      value={form.emergencyNumber || ''}
      onChange={(e) => setForm({ ...form, emergencyNumber: parseInt(e.target.value) })}
    />

    <label htmlFor="enrollmentDate" id="enrollmentDate">Enrollment Date: </label>
    <StyledInput
      type="date"
      name="enrollmentDate"
      value={form.enrollmentDate || ''}
      onChange={(e) => setForm({ ...form, enrollmentDate: e.target.value })}
    />

    <label htmlFor="graduationDate" id="graduationDate">Grad date: </label>
    <StyledInput
      type="date"
      name="graduationDate"
      value={form.graduationDate || ''}
      onChange={(e) => setForm({ ...form, graduationDate: e.target.value })}
    />

    <StyledInput type="hidden" name="isActive" value="1" />

    <StyledButton type="submit">Update Student</StyledButton>
    </StyledForm>
    </StyledFormWrapper>
  </>
  );
};

export default EditStudent;