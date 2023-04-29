import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    incidentReportNumber: '',
    studentID: '',
    agencyOrProgram: '',
    contactNumber: '',
    address: '',
    incidentType: '',
    incidentTypeOther: '',
    location: '',
    date: '',
    employeeID: '',
    firstNameParticipant: '',
    lastNameParticipant: '',
    firstNameReport: '',
    lastNameReport: '',
    contactReportNumber: '',
    contactReportEmail: '',
    firstNameManager: '',
    lastNameManager: '',
    phoneNumberManager: '',
    emailAddressManager: '',
    signed: '',
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  useEffect(() => {
    const getIncident = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/incidents/${id}`);
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
    const formWithoutCircularReferences = removeCircularReferences(form);
    await axios.put(`http://localhost:3000/incidents/${id}`, formWithoutCircularReferences);
    navigate('/incidents');
  };

  return (
    <div>
      <h1>Edit Incident</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="incidentReportNumber">Incident Report Number:</label>
        <input
          type="number"
          name="incidentReportNumber"
          value={form.incidentReportNumber}
          onChange={setForm}
        />
        <br />

        <label htmlFor="studentID">Student ID:</label>
        <input
          type="number"
          name="studentID"
          value={form.studentID}
          onChange={setForm}
        />
        <br />

        <label htmlFor="agencyOrProgram">Agency or Program:</label>
        <input
          type="text"
          name="agencyOrProgram"
          value={form.agencyOrProgram}
          onChange={setForm}
        />
        <br />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={form.contactNumber}
          onChange={setForm}
        />
        <br />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={setForm}
        />
        <br />

        <label htmlFor="incidentType">Incident Type:</label>
        <input
          type="text"
          name="incidentType"
          value={form.incidentType}
          onChange={setForm}
        />
        <br />

        <label htmlFor="incidentTypeOther">Incident Type (Other):</label>
        <input
          type="text"
          name="incidentTypeOther"
          value={form.incidentTypeOther}
          onChange={setForm}
        />
        <br />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={setForm}
        />
        <br />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={setForm}
        />
        <br />

        <label htmlFor="employeeID">Employee ID:</label>
        <input
          type="number"
          name="employeeID"
          value={form.employeeID}
          onChange={setForm}
        />
        <br />

        <label htmlFor="firstNameParticipant">First Name (Participant):</label>
        <input
          type="text"
          name="firstNameParticipant"
          value={form.firstNameParticipant}
          onChange={setForm}
        />
        <br />

        <label htmlFor="lastNameParticipant">Last Name (Participant):</label>
        <input
          type="text"
          name="lastNameParticipant"
          value={form.lastNameParticipant}
          onChange={setForm}
        />
        <br />

        <label htmlFor="firstNameReport">First Name (Report):</label>
        <input
          type="text"
          name="firstNameReport"
          value={form.firstNameReport}
          onChange={setForm}
        />
        <br />

        <label htmlFor="lastNameReport">Last Name (Report):</label>
        <input
          type="text"
          name="lastNameReport"
          value={form.lastNameReport}
          onChange={setForm}
        />
        <br />

        <label htmlFor="contactReportNumber">Contact Number (Report):</label>
        <input
          type="text"
          name="contactReportNumber"
          value={form.contactReportNumber}
          onChange={setForm}
        />
        <br />

        <label htmlFor="contactReportEmail">Email (Report):</label>
        <input
          type="email"
          name="contactReportEmail"
          value={form.contactReportEmail}
          onChange={setForm}
        />
        <br />

        <label htmlFor="firstNameManager">First Name (Manager):</label>
        <input
          type="text"
          name="firstNameManager"
          value={form.firstNameManager}
          onChange={setForm}
        />
        <br />

        <label htmlFor="lastNameManager">Last Name (Manager):</label>
        <input
          type="text"
          name="lastNameManager"
          value={form.lastNameManager}
          onChange={setForm}
        />
        <br />

        <label htmlFor="phoneNumberManager">Phone Number (Manager):</label>
        <input
          type="text"
          name="phoneNumberManager"
          value={form.phoneNumberManager}
          onChange={setForm}
        />
        <br />

        <label htmlFor="emailAddressManager">Email (Manager):</label>
        <input
          type="email"
          name="emailAddressManager"
          value={form.emailAddressManager}
          onChange={setForm}
        />
        <br />

        <label htmlFor="signed">Signed:</label>
        <input
          type="text"
          name="signed"
          value={form.signed}
          onChange={setForm}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditIncident;