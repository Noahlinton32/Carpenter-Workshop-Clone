import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
    incidentReportNumber: { required: true, type: 'number' },
    studentID: { required: true, type: 'number' },
    agencyOrProgram: { required: true, type: 'string' },
    contactNumber: { required: true, type: 'number' },
    address: { required: true, type: 'string' },
    incidentType: { required: true, type: 'string' },
    incidentTypeOther: { required: false, type: 'string' },
    location: { required: true, type: 'string' },
    date: { required: true, type: 'string' },
    employeeID: { required: true, type: 'number' },
    firstNameParticipant: { required: true, type: 'string' },
    lastNameParticipant: { required: true, type: 'string' },
    firstNameReport: { required: true, type: 'string' },
    lastNameReport: { required: true, type: 'string' },
    contactReportNumber: { required: true, type: 'number' },
    contactReportEmail: { required: true, type: 'string' },
    firstNameManager: { required: true, type: 'string' },
    lastNameManager: { required: true, type: 'string' },
    phoneNumberManager: { required: true, type: 'number' },
    emailAddressManager: { required: true, type: 'string' },
    signed: { required: true, type: 'number', min: 0, max: 1 },
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

    const errors = validateForm(form);
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      console.error("Form validation errors:", errors);
      setErrors(errors);
    } else {
      const formWithoutCircularReferences = removeCircularReferences(form);
      await axios.put(`http://localhost:3000/incidents/${id}`, formWithoutCircularReferences);
      navigate('/incidents');
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  return (
    <div>
      <h1>Edit Incident</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="incidentReportNumber">Incident Report Number</label>
        <input
          type="number"
          id="incidentReportNumber"
          name="incidentReportNumber"
          value={form.incidentReportNumber}
          onChange={handleChange}
        />
        {errors.incidentReportNumber && (
          <p className="error">{errors.incidentReportNumber}</p>
        )}

        <label htmlFor="studentID">Student ID</label>
        <input
          type="number"
          id="studentID"
          name="studentID"
          value={form.studentID}
          onChange={handleChange}
        />
        {errors.studentID && <p className="error">{errors.studentID}</p>}

        <label htmlFor="agencyOrProgram">Agency or Program</label>
        <input
          type="text"
          id="agencyOrProgram"
          name="agencyOrProgram"
          value={form.agencyOrProgram}
          onChange={handleChange}
        />
        {errors.agencyOrProgram && (
          <p className="error">{errors.agencyOrProgram}</p>
        )}

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="number"
          id="contactNumber"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
        />
        {errors.contactNumber && (
          <p className="error">{errors.contactNumber}</p>
        )}

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <label htmlFor="incidentType">Incident Type</label>
        <input
          type="text"
          id="incidentType"
          name="incidentType"
          value={form.incidentType}
          onChange={handleChange}
        />
        {errors.incidentType && (
          <p className="error">{errors.incidentType}</p>
        )}

        <label htmlFor="incidentTypeOther">Incident Type (Other)</label>
        <input
          type="text"
          id="incidentTypeOther"
          name="incidentTypeOther"
          value={form.incidentTypeOther}
          onChange={handleChange}
        />
        {errors.incidentTypeOther && (
          <p className="error">{errors.incidentTypeOther}</p>
        )}

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        {errors.date && <p className="error">{errors.date}</p>}
        <label htmlFor="employeeID">Employee ID</label>
        <input
          type="number"
          id="employeeID"
          name="employeeID"
          value={form.employeeID}
          onChange={handleChange}
        />
        {errors.employeeID && <p className="error">{errors.employeeID}</p>}

        <label htmlFor="firstNameParticipant">First Name (Participant)</label>
        <input
          type="text"
          id="firstNameParticipant"
          name="firstNameParticipant"
          value={form.firstNameParticipant}
          onChange={handleChange}
        />
        {errors.firstNameParticipant && (
          <p className="error">{errors.firstNameParticipant}</p>
        )}

        <label htmlFor="lastNameParticipant">Last Name (Participant)</label>
        <input
          type="text"
          id="lastNameParticipant"
          name="lastNameParticipant"
          value={form.lastNameParticipant}
          onChange={handleChange}
        />
        {errors.lastNameParticipant && (
          <p className="error">{errors.lastNameParticipant}</p>
        )}

        <label htmlFor="firstNameReport">First Name (Report)</label>
        <input
          type="text"
          id="firstNameReport"
          name="firstNameReport"
          value={form.firstNameReport}
          onChange={handleChange}
        />
        {errors.firstNameReport && (
          <p className="error">{errors.firstNameReport}</p>
        )}

        <label htmlFor="lastNameReport">Last Name (Report)</label>
        <input
          type="text"
          id="lastNameReport"
          name="lastNameReport"
          value={form.lastNameReport}
          onChange={handleChange}
        />
        {errors.lastNameReport && (
          <p className="error">{errors.lastNameReport}</p>
        )}

        <label htmlFor="contactReportNumber">Contact Report Number</label>
        <input
          type="number"
          id="contactReportNumber"
          name="contactReportNumber"
          value={form.contactReportNumber}
          onChange={handleChange}
        />
        {errors.contactReportNumber && (
          <p className="error">{errors.contactReportNumber}</p>
        )}

        <label htmlFor="contactReportEmail">Contact Report Email</label>
        <input
          type="email"
          id="contactReportEmail"
          name="contactReportEmail"
          value={form.contactReportEmail}
          onChange={handleChange}
        />
        {errors.contactReportEmail && (
          <p className="error">{errors.contactReportEmail}</p>
        )}

        <label htmlFor="firstNameManager">First Name (Manager)</label>
        <input
          type="text"
          id="firstNameManager"
          name="firstNameManager"
          value={form.firstNameManager}
          onChange={handleChange}
        />
        {errors.firstNameManager && (
          <p className="error">{errors.firstNameManager}</p>
        )}

        <label htmlFor="lastNameManager">Last Name (Manager)</label>
        <input
          type="text"
          id="lastNameManager"
          name="lastNameManager"
          value={form.lastNameManager}
          onChange={handleChange}
        />
        {errors.lastNameManager && (
          <p className="error">{errors.lastNameManager}</p>
        )}

        <label htmlFor="phoneNumberManager">Phone Number (Manager)</label>
        <input
          type="number"
          id="phoneNumberManager"
          name="phoneNumberManager"
          value={form.phoneNumberManager}
          onChange={handleChange}
        />
        {errors.phoneNumberManager && (
          <p className="error">{errors.phoneNumberManager}</p>
        )}
        <label htmlFor="emailAddressManager">Email Address (Manager)</label>
        <input
          type="email"
          id="emailAddressManager"
          name="emailAddressManager"
          value={form.emailAddressManager}
          onChange={handleChange}
        />
        {errors.emailAddressManager && (
          <p className="error">{errors.emailAddressManager}</p>
        )}

        <label htmlFor="signed">Signed</label>
        <input
          type="checkbox"
          id="signed"
          name="signed"
          checked={form.signed}
          onChange={(event) =>
            setForm({ ...form, signed: event.target.checked })
          }
        />
        {errors.signed && <p className="error">{errors.signed}</p>}

        <button type="submit">Update Incident</button>
      </form>
    </div>
  );
};

export default EditIncident;