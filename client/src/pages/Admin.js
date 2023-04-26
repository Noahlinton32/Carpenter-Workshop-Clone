// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../mySite.css'

const Admin = () => {
  // Staff state variables
const [editStaffPassword, setEditStaffPassword] = useState('');
const [editStudentPassword, setEditStudentPassword] = useState('');
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
// Student state variables
const [newStudentStudentID, setNewStudentStudentID] = useState('');
const [newStudentAddress, setNewStudentAddress] = useState('');
const [newStudentGPA, setNewStudentGPA] = useState('');
const [newStudentGrade, setNewStudentGrade] = useState('');
const [newStudentFirstNameFirstGuardian, setNewStudentFirstNameFirstGuardian] = useState('');
const [newStudentLastNameFirstGuardian, setNewStudentLastNameFirstGuardian] = useState('');
const [newStudentFirstNameSecondGuardian, setNewStudentFirstNameSecondGuardian] = useState('');
const [newStudentLastNameSecondGuardian, setNewStudentLastNameSecondGuardian] = useState('');
const [newStudentEmergencyNumber, setNewStudentEmergencyNumber] = useState('');
const [newStudentEnrollmentDate, setNewStudentEnrollmentDate] = useState('');
const [newStudentGraduationDate, setNewStudentGraduationDate] = useState('');
const [newStudentIsActive, setNewStudentIsActive] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetchStaff();
    fetchStudents();
  }, []);

  const fetchStaff = async () => {
    const staffResponse = await axios.get('http://localhost:3000/admin/staff');
    setStaffList(staffResponse.data.staff);
  };

  const fetchStudents = async () => {
    const studentResponse = await axios.get('http://localhost:3000/admin/students');
    setStudentList(studentResponse.data.students);
  };

  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    if (editStaffId) {
      await axios.put(`http://localhost:3000/admin/staff/${editStaffId}/password`, { password: editStaffPassword });
      setEditStaffPassword('');
    } else {
      alert('Please enter a valid Staff ID');
    }
  };

  const handleNewStaffSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3000/admin/staff', { name: newStaffName });
    setNewStaffName('');
    fetchStaff();
  };

  const handleNewStudentSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3000/admin/students', { name: newStudentName });
    setNewStudentName('');
    fetchStudents();
  };

  const handleEditStaffSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:3000/admin/staff/${editStaffId}`, { employeeID: editStaffName });
    setEditStaffId('');
    setEditStaffName('');
    fetchStaff();
  };

  const handleEditStudentSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:3000/admin/students/${editStudentId}`, { employeeID: editStudentName });
    setEditStudentId('');
    setEditStudentName('');
    fetchStudents();
  };
  const handleUnarchiveStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/staff/${id}`);
      fetchStaff(); // Refresh staff list
    } catch (error) {
      console.error('Error unarchiving staff:', error);
    }
  };
  const handleArchiveStaff = async (staffId) => {
    await axios.delete(`http://localhost:3000/admin/staff/${staffId}`);
    fetchStaff();
  };

  const handleUnarchiveStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/students/${id}`);
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error('Error unarchiving student:', error);
    }
  };

  const handleArchiveStudent = async (studentId) => {
    await axios.delete(`http://localhost:3000/admin/students/${studentId}`);
    fetchStudents();
  };

  return (
    <div>
      <div className="admin-dashboard">
  <h1>Admin Dashboard</h1>
  <div className="staff-section">
    <h2>Staff</h2>
    <div className="form-container create-staff">
      <form onSubmit={handleNewStaffSubmit}>
        <label htmlFor="newStaffName">Add Staff: </label>
        <input
          id="newStaffName"
          type="text"
          value={newStaffName}
          onChange={(event) => setNewStaffName(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    <div className="form-container edit-staff">
      <form onSubmit={handleEditStaffSubmit}>
        <label htmlFor="editStaffId">Edit Staff ID: </label>
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
      </form>
    </div>
    <div className="form-container edit-student-password">
  <form onSubmit={handleChangePasswordSubmit}>
    <label htmlFor="editStudentId">Edit Staff Password: </label>
    <input
      id="editStudentId"
      type="text"
      value={editStudentId}
      onChange={(event) => setEditStaffPassword(event.target.value)}
    />
    <label htmlFor="editStaffPassword">New Password: </label>
    <input
      id="editStaffPassword"
      type="text"
      value={editStudentPassword}
      onChange={(event) => setEditStaffPassword(event.target.value)}
    />
    <button type="submit">Edit</button>
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
    <div className="form-container create-student">
      <form onSubmit={handleNewStudentSubmit}>
        <label htmlFor="newStudentName">Add Student: </label>
        <input
          id="newStudentName"
          type="text"
          value={newStudentName}
          onChange={(event) => setNewStudentName(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    <div className="form-container edit-student">
      <form onSubmit={handleEditStudentSubmit}>
        <label htmlFor="editStudentId">Edit Student ID: </label>
        <input
          id="editStudentId"
          type="text"
          value={editStudentId}
          onChange={(event) => setEditStudentId(event.target.value)}
        />
        <label htmlFor="editStudentName">Edit Student Name: </label>
        <input
          id="editStudentName"
          type="text"
          value={editStudentName}
          onChange={(event) => setEditStudentName(event.target.value)}
        />
        <button type="submit">Edit</button>
      </form>
    </div>
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
  <form onSubmit={handleNewStaffSubmit}>
    {/* Add fields here */}
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
    // Add Staff form continued
    <input
      id="newStaffIsAdmin"
      type="checkbox"
      checked={newStaffIsAdmin}
      onChange={(event) => setNewStaffIsAdmin(event.target.checked)}
    />
    {/* isActive */}
    <label htmlFor="newStaffIsActive">Is Active: </label>
    <input
      id="newStaffIsActive"
      type="checkbox"
      checked={newStaffIsActive}
      onChange={(event) => setNewStaffIsActive(event.target.checked)}
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
<div className="form-container create-student">
  <form onSubmit={handleNewStudentSubmit}>
    {/* Add fields here */}
    {/* StudentID */}
    <label htmlFor="newStudentStudentID">Student ID: </label>
    <input
      id="newStudentStudentID"
      type="number"
      value={newStudentStudentID}
      onChange={(event) => setNewStudentStudentID(event.target.value)}
      required
    />
    {/* Name */}
    <label htmlFor="newStudentName">Name: </label>
    <input
      id="newStudentName"
      type="text"
      value={newStudentName}
      onChange={(event) => setNewStudentName(event.target.value)}
      required
    />
    {/* Address */}
    <label htmlFor="newStudentAddress">Address: </label>
    <input
      id="newStudentAddress"
      type="text"
      value={newStudentAddress}
      onChange={(event) => setNewStudentAddress(event.target.value)}
      required
    />
    {/* GPA */}
    <label htmlFor="newStudentGPA">GPA: </label>
    <input
      id="newStudentGPA"
      type="number"
      step="0.01"
      min="0"
      max="4"
      value={newStudentGPA}
      onChange={(event) => setNewStudentGPA(event.target.value)}
      required
    />
    {/* Grade */}
    <label htmlFor="newStudentGrade">Grade: </label>
    <input
      id="newStudentGrade"
      type="text"
      value={newStudentGrade}
      onChange={(event) => setNewStudentGrade(event.target.value)}
      required
    />
    {/* First Guardian's First Name */}
    <label htmlFor="newStudentFirstNameFirstGuardian">First Guardian's First Name: </label>
    <input
      id="newStudentFirstNameFirstGuardian"
      type="text"
      value={newStudentFirstNameFirstGuardian}
      onChange={(event) => setNewStudentFirstNameFirstGuardian(event.target.value)}
      required
    />
    {/* First Guardian's Last Name */}
    <label htmlFor="newStudentLastNameFirstGuardian">First Guardian's Last Name: </label>
    <input
      id="newStudentLastNameFirstGuardian"
      type="text"
      value={newStudentLastNameFirstGuardian}
      onChange={(event) => setNewStudentLastNameFirstGuardian(event.target.value)}
      required
    />
    {/* Second Guardian's First Name */}
    <label htmlFor="newStudentFirstNameSecondGuardian">Second Guardian's First Name: </label>
	 <input
      id="newStudentFirstNameSecondGuardian"
      type="text"
      value={newStudentFirstNameSecondGuardian}
      onChange={(event) => setNewStudentFirstNameSecondGuardian(event.target.value)}
    />
    {/* Second Guardian's Last Name */}
    <label htmlFor="newStudentLastNameSecondGuardian">Second Guardian's Last Name: </label>
    <input
      id="newStudentLastNameSecondGuardian"
      type="text"
      value={newStudentLastNameSecondGuardian}
      onChange={(event) => setNewStudentLastNameSecondGuardian(event.target.value)}
    />
    {/* Emergency Number */}
    <label htmlFor="newStudentEmergencyNumber">Emergency Number: </label>
    <input
      id="newStudentEmergencyNumber"
      type="tel"
      value={newStudentEmergencyNumber}
      onChange={(event) => setNewStudentEmergencyNumber(event.target.value)}
      required
    />
    {/* Enrollment Date */}
    <label htmlFor="newStudentEnrollmentDate">Enrollment Date: </label>
    <input
      id="newStudentEnrollmentDate"
      type="date"
      value={newStudentEnrollmentDate}
      onChange={(event) => setNewStudentEnrollmentDate(event.target.value)}
      required
    />
    {/* Graduation Date */}
    <label htmlFor="newStudentGraduationDate">Graduation Date: </label>
    <input
      id="newStudentGraduationDate"
      type="date"
      value={newStudentGraduationDate}
      onChange={(event) => setNewStudentGraduationDate(event.target.value)}
      required
    />
    {/* isActive */}
    <label htmlFor="newStudentIsActive">Is Active: </label>
    <input
      id="newStudentIsActive"
      type="checkbox"
      checked={newStudentIsActive}
      onChange={(event) => setNewStudentIsActive(event.target.checked)}
    />
    <button type="submit">Add Student</button>
  </form>
</div>
</div>
);
};

export default Admin;