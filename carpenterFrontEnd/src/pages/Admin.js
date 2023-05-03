// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../mySite.css'

const Admin = () => {
  // Staff state variables
const [editStaffPassword, setEditStaffPassword] = useState('');
const [newStaffEmployeeID, setNewStaffEmployeeID] = useState('');
const [newStaffPassword, setNewStaffPassword] = useState('');
const [newStaffUsername, setNewStaffUsername] = useState('');
const [newStaffEmail, setNewStaffEmail] = useState('');
const [newStaffIsAdmin, setNewStaffIsAdmin] = useState(false);
const [newStaffIsActive, setNewStaffIsActive] = useState(true);
const [newStaffUserAvatar, setNewStaffUserAvatar] = useState('');
const [newStaffName, setNewStaffName] = useState('');
const [staffList, setStaffList] = useState([]);
const [studentList, setStudentList] = useState([]);
const [newStudentName, setNewStudentName] = useState('');
const [editStaffId, setEditStaffId] = useState('');
const [editStudentId, setEditStudentId] = useState('');
const [editStaffName, setEditStaffName] = useState('');
const [editStudentName, setEditStudentName] = useState('');
const [newPassword, setNewPassword] = useState('');
const [errorMessage, setErrorMessage] = useState(null);

  // Fetch data from API
  useEffect(() => {
    fetchStaff();
    fetchStudents();
  }, []);

  const fetchStaff = async () => {
    const staffResponse = await axios.get('https://carpenterservice.onrender.com/admin/staff');
    setStaffList(staffResponse.data.staff);
  };

  const fetchStudents = async () => {
    const studentResponse = await axios.get('https://carpenterservice.onrender.com/admin/students');
    setStudentList(studentResponse.data.students);
  };


  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    if (editStaffId) {
      try {
        const response = await axios.put(`https://carpenterservice.onrender.com/admin/staff/${editStaffId}/password`, { password: editStaffPassword });
        
        if (response.status === 200) {
          setEditStaffPassword('');
          setErrorMessage('');
        } else if (response.status === 400) {
          setErrorMessage('Invalid employee ID');
        } else {
          setErrorMessage('Invalid employee ID');
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Invalid employee ID');
      }
    } else {
      setErrorMessage('Please enter a valid Staff ID');
    }
  };
  const handleNewStaffSubmit = async (event) => {
    event.preventDefault();
  
    // Validation checks
    if (!newStaffEmployeeID || !newStaffPassword || !newStaffName || !newStaffUsername || !newStaffEmail) {
      setErrorMessage('All fields are required except User Avatar.');
      return;
    }
  
    if (isNaN(newStaffEmployeeID)) {
      setErrorMessage('Employee ID must be a number.');
      return;
    }
  
    if (newStaffPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
  
    if (!/^[\w\s]+$/.test(newStaffName)) {
      setErrorMessage('Name must only contain letters, numbers, and spaces.');
      return;
    }
  
    if (!/^[a-zA-Z0-9_]+$/.test(newStaffUsername)) {
      setErrorMessage('Username must only contain letters, numbers, and underscores.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(newStaffEmail)) {
      setErrorMessage('Invalid email address.');
      return;
    }
  
    // Check if Employee ID already exists
    try {
      const response = await axios.get(`https://carpenterservice.onrender.com/admin/staff/exists/${newStaffEmployeeID}`);
      if(response.status === 200 || response.status === 304){
        console.error('Error checking Employee ID existence:');
        setErrorMessage('Employee ID already exists.');
      }
      else{
        console.error('Error checking Employee ID existence:');
        setErrorMessage('An error occurred while checking employee ID existence.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          await axios.post('https://carpenterservice.onrender.com/admin/staff', {
            employeeID: newStaffEmployeeID,
            password: newStaffPassword,
            name: newStaffName,
            username: newStaffUsername,
            email: newStaffEmail,
            isAdmin: newStaffIsAdmin ? 1 : 0,
            isActive: newStaffIsActive ? 1 : 0,
            userAvatar: newStaffUserAvatar
          });
      
          // Clear the form
          setNewStaffEmployeeID('');
          setNewStaffPassword('');
          setNewStaffName('');
          setNewStaffUsername('');
          setNewStaffEmail('');
          setNewStaffIsAdmin(false);
          setNewStaffIsActive(true);
          setNewStaffUserAvatar('');
      
          // Refresh the staff list
          fetchStaff();
        } catch (error) {
          console.error('Error creating new staff member:', error);
          setErrorMessage('An error occurred while creating the new staff member.');
        }
      return;
    }
    
  };
}
  const handleNewStudentSubmit = async (event) => {
    event.preventDefault();
    await axios.post('https://carpenterservice.onrender.com/admin/students', { name: newStudentName });
    setNewStudentName('');
    fetchStudents();
  };

  const handleEditStaffSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.put(`https://carpenterservice.onrender.com/admin/staff/${editStaffId}`, { name: editStaffName });
      
      if (response.status === 200) {
        setEditStaffId(null);
        setEditStaffName('');
        setErrorMessage('');
        fetchStaff();
      } else if (response.status === 400) {
        setErrorMessage('Invalid employee ID');
      } else {
        setErrorMessage('Invalid employee ID');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Invalid employee ID');
    }
  };

  const handleEditStudentSubmit = async (event) => {
    try{
    event.preventDefault();
    await axios.put(`https://carpenterservice.onrender.com/admin/students/${editStudentId}`, { name: editStudentName });
    setEditStudentId('');
    setEditStudentName('');
    fetchStudents();
  }catch(error){
    console.log(error);
  }
  };
  const handleUnarchiveStaff = async (id) => {
    try {
      await axios.delete(`https://carpenterservice.onrender.com/admin/staff/${id}`);
      fetchStaff(); // Refresh staff list
    } catch (error) {
      console.error('Error unarchiving staff:', error);
    }
  };
  const handleArchiveStaff = async (staffId) => {
    await axios.delete(`https://carpenterservice.onrender.com/admin/staff/${staffId}`);
    fetchStaff();
  };

  const handleUnarchiveStudent = async (id) => {
    try {
      await axios.delete(`https://carpenterservice.onrender.com/admin/students/${id}`);
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error('Error unarchiving student:', error);
    }
  };

  const handleArchiveStudent = async (studentId) => {
    await axios.delete(`https://carpenterservice.onrender.com/admin/students/${studentId}`);
    fetchStudents();
  };

  return (
    <div>
      <div className="admin-dashboard">
  <h1>Admin Dashboard</h1>
  <div className="staff-section">
    <h2>Staff</h2>
    <div className="form-container edit-staff">
      <form onSubmit={handleEditStaffSubmit}>
        <label htmlFor="editStaffId">ID: </label>
        <input
          id="editStaffId"
          type="text"
          value={editStaffId}
          onChange={(event) => setEditStaffId(event.target.value)}
        />
        <label htmlFor="editStaffName">Edit Staff Name: </label>
        <input
          id="editStaffName"
          type="text"
          value={editStaffName}
          onChange={(event) => setEditStaffName(event.target.value)}
        />
        <button type="submit">Edit</button>
        <div className="error-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
      </form>
    </div>
    <div className="form-container edit-student-password">
  <form onSubmit={handleChangePasswordSubmit}>
  <label htmlFor="editStaffId">ID: </label>
        <input
          id="editStaffId"
          type="text"
          value={editStaffId}
          onChange={(event) => setEditStaffId(event.target.value)}
        />
    <label htmlFor="editStaffPassword">New Password: </label>
    <input
      id="editStaffPassword"
      type="text"
      value={editStaffPassword}
      onChange={(event) => setEditStaffPassword(event.target.value)}
    />
    <button type="submit">Edit</button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
</div>
    <div className="form-container archive-staff">
      {staffList.map((staff) => (
        <button key={staff._id} onClick={() => handleArchiveStaff(staff._id)}>
          Archive {staff.name}
        </button>
      ))}
    </div>
    <div className="form-container unarchive-staff">
      {staffList
        .filter((staff) => !staff.isActive)
        .map((staff) => (
          <button key={staff._id} onClick={() => handleUnarchiveStaff(staff._id)}>
            Unarchive {staff.name}
          </button>
        ))}
    </div>

    <ul className="staff-list">
      {staffList.map((staff) => (
        <li key={staff._id}>{staff.name}</li>
      ))}
    </ul>
  </div>
</div>
  <div className="student-section">
    <h2>Students</h2>
    <div className="form-container archive-student">
      {studentList.map((student) => (
        <button key={student._id} onClick={() => handleArchiveStudent(student._id)}>
          Archive {student.name}
        </button>
      ))}
    </div>
    <div className="form-container unarchive-student">
      {studentList
        .filter((student) => !student.isActive)
        .map((student) => (
          <button key={student._id} onClick={() => handleUnarchiveStudent(student._id)}>
            Unarchive {student.name}
          </button>
        ))}
    </div>

    <ul>
      {studentList.map((student) => (
        <li key={student._id}>{student.name}</li>
      ))}
    </ul>
  </div>
    <div className="form-container create-staff">
    {errorMessage && <p className="error-message">{errorMessage}</p>}
<form onSubmit={handleNewStaffSubmit}>
  {/* Rest of the form */}
    {/* EmployeeID */}
    <label htmlFor="newStaffEmployeeID">Employee ID: </label>
    <input
      id="newStaffEmployeeID"
      type="number"
      value={newStaffEmployeeID}
      onChange={(event) => setNewStaffEmployeeID(event.target.value)}
      required
    />
    {/* Password */}
    <label htmlFor="newStaffPassword">Password: </label>
    <input
      id="newStaffPassword"
      type="password"
      value={newStaffPassword}
      onChange={(event) => setNewStaffPassword(event.target.value)}
      required
    />
    {/* Name */}
    <label htmlFor="newStaffName">Name: </label>
    <input
      id="newStaffName"
      type="text"
      value={newStaffName}
      onChange={(event) => setNewStaffName(event.target.value)}
      required
    />
    {/* Username */}
    <label htmlFor="newStaffUsername">Username: </label>
    <input
      id="newStaffUsername"
      type="text"
      value={newStaffUsername}
      onChange={(event) => setNewStaffUsername(event.target.value)}
      required
    />
    {/* Email */}
    <label htmlFor="newStaffEmail">Email: </label>
    <input
      id="newStaffEmail"
      type="email"
      value={newStaffEmail}
      onChange={(event) => setNewStaffEmail(event.target.value)}
      required
    />
    {/* isAdmin */}
    <label htmlFor="newStaffIsAdmin">Is Admin: </label>
    <input
      id="newStaffIsAdmin"
      type="checkbox"
      checked={newStaffIsAdmin}
      onChange={(event) => setNewStaffIsAdmin(event.target.checked)}
    />
    {/* UserAvatar */}
    <label htmlFor="newStaffUserAvatar">User Avatar: </label>
    <input
      id="newStaffUserAvatar"
      type="text"
      value={newStaffUserAvatar}
      onChange={(event) => setNewStaffUserAvatar(event.target.value)}
    />
    <button type="submit">Add Staff</button>
  </form>
</div>
</div>
);
};

export default Admin;