// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../mySite.css'

const Admin = () => {
  const [staffList, setStaffList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [editStaffId, setEditStaffId] = useState(null);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editStaffName, setEditStaffName] = useState('');
  const [editStudentName, setEditStudentName] = useState('');

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
    await axios.put(`http://localhost:3000/admin/staff/${editStaffId}`, { name: editStaffName });
    setEditStaffId(null);
    setEditStaffName('');
    fetchStaff();
  };

  const handleEditStudentSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:3000/admin/students/${editStudentId}`, { name: editStudentName });
    setEditStudentId(null);
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
</div>
);
};

export default Admin;