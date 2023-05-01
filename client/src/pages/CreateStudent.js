import { useState, useEffect } from "react";
import styled, {createGlobalStyle, css} from 'styled-components';
import axios from "axios";


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

function CreateStudents() {
  // State
  const [students, SetStudents] = useState(null);
  const [error, setError] = useState('');
  const [createForm, SetCreateForm] = useState({
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
    isActive: '1'
  });

  //User Effect
  useEffect (() => {
    getStudents();
  }, []);

  //Functions 
  const getStudents = async () => {
    //get students
    const res = await axios.get('http://localhost:3000/students');
    //set state
    SetStudents(res.data.students);
  };

  const UpdateCreateFormField = (e) => {
    const {name, value} = e.target;

    SetCreateForm({
      ...createForm,
      [name]: value,

    })

  };

  const CreateStudent = async (e) => {
    e.preventDefault();
    //regex functions to validate format 
    //regex returns true if PHONE number is valid
    function isValidPhone(phoneNumber) {
      var found = phoneNumber.search(/^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/);
      if(found > -1) {
          return true;
      }
      else {
          return false;
      }
    }
    //regex returns true if DATE is valid
    function isValidDate(date) {
      var found = date.search(/(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[4678]|1[02])[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[1359]|11)[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))/);
      if(found > -1) {
        return true;
      }
      else {
        return false;
      }
    }

    //Check errors here

    for (let key in createForm){
      if (isNaN(createForm.studentID)){
        setError(`Student ID must be a number`)
        return
       }
      if (isNaN(createForm.gpa)){
        setError(`GPA must be a number`)
        return
       }
      if (parseFloat(createForm.gpa) > 4 || parseFloat(createForm.gpa) < 0){
        setError(`GPA must be between 0 and 4`)
        return
       }
      if (!isValidPhone(createForm.emergencyNumber)){
        setError(`Emergency Number must be a valid number`)
        return
      }
      if (!isValidDate(createForm.enrollmentDate)){
        setError(`Enrollment Date must be a valid date`)
        return
      }
      if (!isValidDate(createForm.graduationDate)){
        setError(`Graduation Date must be a valid date`)
        return
      }
      if (createForm[key] === ''){
        setError(`${key} cannot be blank`)
        return
     }
    }
    setError('');


    // Create the student
    const res = await axios.post("http://localhost:3000/students", createForm);
    //Update state
    console.log(res);
    SetStudents([...students, res.data.student]);

    //Clear form state
    SetCreateForm({
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
      isActive: '1'
    })
    
  }
  
  return( 
  <>
  <GlobalStyle/>
    <StyledFormWrapper>
      <StyledForm onSubmit={CreateStudent}>
        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Create Student</h2>
          <label htmlFor="studentID">Student ID: </label>
          <StyledInput 
            onChange={UpdateCreateFormField}
            value={createForm.studentID} 
            id="studentID" type={Number} 
            name="studentID"
          />
      
          <label id="name">Name: </label>
          <StyledInput 
            type="text"
            onChange={UpdateCreateFormField}
            value={createForm.name} 
            id="name" 
            name="name"
          />
               
          <label htmlFor="address" id="address">Address: </label>
          <StyledInput 
            onChange={UpdateCreateFormField}
            value={createForm.address}
            id="address" 
            name="address"
            />
         <div style={{display: 'grid', gridGap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <div>
          <label htmlFor="gpa" id="gpa">GPA: </label>
          <input
            onChange={UpdateCreateFormField} 
            value={createForm.gpa}
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
            onChange={UpdateCreateFormField} 
            value={createForm.grade}
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
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.firstNameFirstGuardian}
            id="firstNameFirstGuardian" 
            name="firstNameFirstGuardian"
            />
       
          <label htmlFor="lastNameFirstGuardian" id="lastNameFirstGuardian">Last Name 1st Guardian: </label>
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.lastNameFirstGuardian}
            id="lastNameFirstGuardian" 
            name="lastNameFirstGuardian"
            />

          <label htmlFor="firstNameSecondGuardian" id="firstNameSecondGuardian">First Name 2nd Guardian: </label>
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.firstNameSecondGuardian}
            id="firstNameSecondGuardian" 
            name="firstNameSecondGuardian"
            />
  
          <label htmlFor="lastNameSecondGuardian" id="lastNameSecondGuardian">Last Name 2nd Guardian: </label>
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.lastNameSecondGuardian}
            id="lastNameSecondGuardian" 
            name="lastNameSecondGuardian"
            />
         
          <label htmlFor="emergencyNumber" id="emergencyNumber">Emergency Number: </label>
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.emergencyNumber}
            id="emergencyNumber" 
            type={Number} 
            name="emergencyNumber"
            />
          
          <label htmlFor="enrollmentDate" id="enrollmentDate">Enrollment Date: </label>
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.enrollmentDate}
            id="enrollmentDate" 
            type="Date" 
            name="enrollmentDate"/>
          
          <label htmlFor="graduationDate" id="graduationDate">Grad date: </label>
          <StyledInput
            onChange={UpdateCreateFormField} 
            value={createForm.graduationDate}
            id="graduationDate" 
            type="Date" 
            name="graduationDate"
            />
          
          <StyledInput value="1" type={"hidden"} name="isActive"/>
          
          {error && (
            <StyledError>
            <p>{error}</p>
            </StyledError>
            )}
          
          <StyledButton type="submit">Create Student</StyledButton>
  </StyledForm>
  </StyledFormWrapper>
  </>
  );
   
}

export default CreateStudents;
