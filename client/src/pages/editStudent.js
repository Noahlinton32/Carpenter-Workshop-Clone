import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        const res = await axios.get(`http://localhost:3000/students/${id}`);
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
      await axios.put(`http://localhost:3000/students/${id}`, formWithoutCircularReferences);
      navigate('/students');
    }
  };


  return (
    <>
  <form onSubmit={handleSubmit}>
  <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Create Student</h2>
  <label htmlFor="studentID">Student ID: </label>
  <input 
    type="number"
    name="studentID"
    value={form.studentID || ''}
    onChange={(e) => setForm({ ...form, studentID: parseInt(e.target.value) })}
  />

  <label id="name">Name: </label>
  <input 
    type="text"
    name="name"
    value={form.name || ''}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />

  <label htmlFor="address" id="address">Address: </label>
  <input 
    name="address"
    value={form.address || ''}
    onChange={(e) => setForm({ ...form, address: e.target.value })}
  />

  <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
    <div>
      <label htmlFor="gpa" id="gpa">GPA: </label>
      <input
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
      <input
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
    <input
      name="firstNameFirstGuardian"
      value={form.firstNameFirstGuardian || ''}
      onChange={(e) => setForm({ ...form, firstNameFirstGuardian: e.target.value })}
    />

    <label htmlFor="lastNameFirstGuardian" id="lastNameFirstGuardian">Last Name 1st Guardian: </label>
    <input
      name="lastNameFirstGuardian"
      value={form.lastNameFirstGuardian || ''}
      onChange={(e) => setForm({ ...form, lastNameFirstGuardian: e.target.value })}
    />

    <label htmlFor="firstNameSecondGuardian" id="firstNameSecondGuardian">First Name 2nd Guardian: </label>
    <input
      name="firstNameSecondGuardian"
      value={form.firstNameSecondGuardian || ''}
      onChange={(e) => setForm({ ...form, firstNameSecondGuardian: e.target.value })}
    />

    <label htmlFor="lastNameSecondGuardian" id="lastNameSecondGuardian">Last Name 2nd Guardian: </label>
    <input
      name="lastNameSecondGuardian"
      value={form.lastNameSecondGuardian || ''}
      onChange={(e) => setForm({ ...form, lastNameSecondGuardian: e.target.value })}
    />

    <label htmlFor="emergencyNumber" id="emergencyNumber">Emergency Number: </label>
    <input
      type="number"
      name="emergencyNumber"
      value={form.emergencyNumber || ''}
      onChange={(e) => setForm({ ...form, emergencyNumber: parseInt(e.target.value) })}
    />

    <label htmlFor="enrollmentDate" id="enrollmentDate">Enrollment Date: </label>
    <input
      type="date"
      name="enrollmentDate"
      value={form.enrollmentDate || ''}
      onChange={(e) => setForm({ ...form, enrollmentDate: e.target.value })}
    />

    <label htmlFor="graduationDate" id="graduationDate">Grad date: </label>
    <input
      type="date"
      name="graduationDate"
      value={form.graduationDate || ''}
      onChange={(e) => setForm({ ...form, graduationDate: e.target.value })}
    />

    <input type="hidden" name="isActive" value="1" />

    <button type="submit">Create Student</button>
    </form>
  </>
  );
};

export default EditStudent;