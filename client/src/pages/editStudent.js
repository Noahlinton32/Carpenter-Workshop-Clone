import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  useEffect(() => {
    const getStudent = async (event) => {
      try {
        event.preventDefault();
        const formWithoutCircularReferences = removeCircularReferences(form);
        const res = await axios.get(`http://localhost:3000/incidents/${id}`, formWithoutCircularReferences);
        const StudentData = res.data.incident;
        StudentData.date = formatDate(StudentData.date);
        setForm(StudentData);
      } catch (error) {
        console.error("Failed to fetch incident data:", error);
      }
    };
    getStudent();
  }, [id]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:3000/incidents/${id}`, form);
    navigate('/incidents');
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Create Student</h2>
          <label htmlFor="studentID">Student ID: </label>
          <input 
            onChange={setForm}
            value={form.studentID} 
            id="studentID" type={Number} 
            name="studentID"
          />
      
          <label id="name">Name: </label>
          <input 
            type="text"
            onChange={setForm}
            value={form.name} 
            id="name" 
            name="name"
          />
               
          <label htmlFor="address" id="address">Address: </label>
          <input 
            onChange={setForm}
            value={form.address}
            id="address" 
            name="address"
            />
         <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <div>
          <label htmlFor="gpa" id="gpa">GPA: </label>
          <input
            onChange={setForm} 
            value={form.gpa}
            id="gpa" 
            type={Number} 
            name="gpa"
            style={{width: '100%',
            backgroundColor: '#eee',
            height: '40px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            margin: '10px 0 20px 0',
            padding: '20px',
            boxSizing: 'border-box'}}
            />
        </div>
        <div>
          <label htmlFor="grade" id="grade">Grade: </label>
          <input
            onChange={setForm} 
            value={form.grade}
            id="grade" 
            name="grade"
            style={{width: '100%',
            backgroundColor: '#eee',
            height: '40px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            margin: '10px 0 20px 0',
            padding: '20px',
            boxSizing: 'border-box'}}
            />
        </div>
          </div>
           
          <label htmlFor="firstNameFirstGuardian" id="firstNameFirstGuardian">First Name 1st Guardian: </label>     
          <input
            onChange={setForm} 
            value={form.firstNameFirstGuardian}
            id="firstNameFirstGuardian" 
            name="firstNameFirstGuardian"
            />
       
          <label htmlFor="lastNameFirstGuardian" id="lastNameFirstGuardian">Last Name 1st Guardian: </label>
          <input
            onChange={setForm} 
            value={form.lastNameFirstGuardian}
            id="lastNameFirstGuardian" 
            name="lastNameFirstGuardian"
            />

          <label htmlFor="firstNameSecondGuardian" id="firstNameSecondGuardian">First Name 2nd Guardian: </label>
          <input
            onChange={setForm} 
            value={form.firstNameSecondGuardian}
            id="firstNameSecondGuardian" 
            name="firstNameSecondGuardian"
            />
  
          <label htmlFor="lastNameSecondGuardian" id="lastNameSecondGuardian">Last Name 2nd Guardian: </label>
          <input
            onChange={setForm} 
            value={form.lastNameSecondGuardian}
            id="lastNameSecondGuardian" 
            name="lastNameSecondGuardian"
            />
         
          <label htmlFor="emergencyNumber" id="emergencyNumber">Emergency Number: </label>
          <input
            onChange={setForm} 
            value={form.emergencyNumber}
            id="emergencyNumber" 
            type={Number} 
            name="emergencyNumber"
            />
          
          <label htmlFor="enrollmentDate" id="enrollmentDate">Enrollment Date: </label>
          <input
            onChange={setForm} 
            value={form.enrollmentDate}
            id="enrollmentDate" 
            type="Date" 
            name="enrollmentDate"/>
          
          <label htmlFor="graduationDate" id="graduationDate">Grad date: </label>
          <input
            onChange={setForm} 
            value={form.graduationDate}
            id="graduationDate" 
            type="Date" 
            name="graduationDate"
            />
          
          <input value="1" type={"hidden"} name="isActive"/>
          
          
          <button type="submit">Create Student</button>
  </form>
  </>
  );
};

export default EditStudent;