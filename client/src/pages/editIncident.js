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
          onChange={(event) => setForm({ ...form, incidentReportNumber: event.target.value })}
        />
        <br />

        <label htmlFor="studentID">Student ID:</label>
        <input
          type="number"
          name="studentID"
          value={form.studentID}
          onChange={(event) => setForm({ ...form, studentID: event.target.value })}
        />
        <br />

        <label htmlFor="agencyOrProgram">Agency or Program:</label>
        <input
          type="text"
          name="agencyOrProgram"
          value={form.agencyOrProgram}
          onChange={(event) => setForm({ ...form, agencyOrProgram: event.target.value })}
        />
        <br />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={form.contactNumber}
          onChange={(event) => setForm({ ...form, contactNumber: event.target.value })}
        />
        <br />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={(event) => setForm({ ...form, address: event.target.value })}
        />
        <br />

        <label htmlFor="incidentType">Incident Type:</label>
        <input
          type="text"
          name="incidentType"
          value={form.incidentType}
          onChange={(event) => setForm({ ...form, incidentType: event.target.value })}
        />
        <br />

        <label htmlFor="incidentTypeOther">Incident Type (Other):</label>
        <input
          type="text"
          name="incidentTypeOther"
          value={form.incidentTypeOther}
          onChange={(event) => setForm({ ...form, incidentTypeOther: event.target.value })}
        />
        <br />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={(event) => setForm({ ...form, location: event.target.value })}
        />
        <br />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={(event) => setForm({ ...form, date: event.target.value })}
        />
        <br />

        <label htmlFor="employeeID">Employee ID:</label>
        <input
          type="number"
          name="employeeID"
          value={form.employeeID}
          onChange={(event) => setForm({ ...form, employeeID: event.target.value })}
        />
        <br />

        <label htmlFor="firstNameParticipant">First Name (Participant):</label>
        <input
          type="text"
          name="firstNameParticipant"
          value={form.firstNameParticipant}
          onChange={(event) => setForm({ ...form, firstNameParticipant: event.target.value })}
        />
        <br />

        <label htmlFor="lastNameParticipant">Last Name (Participant):</label>
        <input
          type="text"
          name="lastNameParticipant"
          value={form.lastNameParticipant}
          onChange={(event) => setForm({ ...form, lastNameParticipant: event.target.value })}
        />
        <br />
        <label htmlFor="firstNameReport">First Name (Report):</label>
        <input
          type="text"
          name="firstNameReport"
          value={form.firstNameReport}
          onChange={(event) => setForm({ ...form, firstNameReport: event.target.value })}
        />
        <br />

        <label htmlFor="lastNameReport">Last Name (Report):</label>
        <input
          type="text"
          name="lastNameReport"
          value={form.lastNameReport}
          onChange={(event) => setForm({ ...form, lastNameReport: event.target.value })}
        />
        <br />

        <label htmlFor="contactReportNumber">Contact Number (Report):</label>
        <input
          type="text"
          name="contactReportNumber"
          value={form.contactReportNumber}
          onChange={(event) => setForm({ ...form, contactReportNumber: event.target.value })}
        />
        <br />

        <label htmlFor="contactReportEmail">Email (Report):</label>
        <input
          type="email"
          name="contactReportEmail"
          value={form.contactReportEmail}
          onChange={(event) => setForm({ ...form, contactReportEmail: event.target.value })}
        />
        <br />

        <label htmlFor="firstNameManager">First Name (Manager):</label>
        <input
          type="text"
          name="firstNameManager"
          value={form.firstNameManager}
          onChange={(event) => setForm({ ...form, firstNameManager: event.target.value })}
        />
        <br />

        <label htmlFor="lastNameManager">Last Name (Manager):</label>
        <input
          type="text"
          name="lastNameManager"
          value={form.lastNameManager}
          onChange={(event) => setForm({ ...form, lastNameManager: event.target.value })}
        />
        <br />

        <label htmlFor="phoneNumberManager">Phone Number (Manager):</label>
        <input
          type="text"
          name="phoneNumberManager"
          value={form.phoneNumberManager}
          onChange={(event) => setForm({ ...form, phoneNumberManager: event.target.value })}
        />
        <br />

        <label htmlFor="emailAddressManager">Email (Manager):</label>
        <input
          type="email"
          name="emailAddressManager"
          value={form.emailAddressManager}
          onChange={(event) => setForm({ ...form, emailAddressManager: event.target.value })}
        />
        <br />

        <label htmlFor="signed">Signed:</label>
        <input
          type="text"
          name="signed"
          value={form.signed}
          onChange={(event) => setForm({ ...form, signed: event.target.value })}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditIncident;