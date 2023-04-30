import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditReferral = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    referralNumber: '',
    studentID: '',
    studentName: '',
    date: '',
    cause: '',
    action: '',
    employeeID: '',
    parentPhoneNumber: '',
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
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
      }
    }

    return errors;
  };

  const validationRules = {
    referralNumber: { required: true, type: 'number' },
    studentID: { required: true, type: 'number' },
    studentName: { required: true, type: 'string' },
    date: { required: true, type: 'string' },
    cause: { required: true, type: 'string' },
    action: { required: true, type: 'string' },
    employeeID: { required: true, type: 'number' },
    parentPhoneNumber: { required: true, type: 'number' },
  };

  useEffect(() => {
    const getReferral = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/referrals/${id}`);
        const referralData = res.data.referral;
        referralData.date = formatDate(referralData.date);
        setForm(referralData);
      } catch (error) {
        console.error("Failed to fetch referral data:", error);
      }
    };
    getReferral();
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
      await axios.put(`http://localhost:3000/referrals/${id}`, formWithoutCircularReferences);
      navigate('/referrals');
    }
  };
  return (
    <div>
      <h1>Edit Referral</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="referralNumber">Referral Number: </label>
    <input
      type="number"
      id="referralNumber"
      name="referralNumber"
      value={form.referralNumber}
      onChange={handleChange}
    />
    {errors.referralNumber && (
      <p className="error">{errors.referralNumber}</p>
    )}

    <label htmlFor="studentID">Student ID: </label>
    <input
      type="number"
      id="studentID"
      name="studentID"
      value={form.studentID}
      onChange={handleChange}
    />
    {errors.studentID && <p className="error">{errors.studentID}</p>}

    <label htmlFor="studentName">Student Name: </label>
    <input
      type="text"
      id="studentName"
      name="studentName"
      value={form.studentName}
      onChange={handleChange}
    />
    {errors.studentName && (
      <p className="error">{errors.studentName}</p>
    )}

    <label htmlFor="date">Date: </label>
    <input
      type="date"
      id="date"
      name="date"
      value={form.date}
      onChange={handleChange}
    />
    {errors.date && <p className="error">{errors.date}</p>}

    <label htmlFor="cause">Cause: </label>
    <input
      type="text"
      id="cause"
      name="cause"
      value={form.cause}
      onChange={handleChange}
    />
    {errors.cause && <p className="error">{errors.cause}</p>}

    <label htmlFor="action">Action: </label>
    <input
      type="text"
      id="action"
      name="action"
      value={form.action}
      onChange={handleChange}
    />
    {errors.action && <p className="error">{errors.action}</p>}

    <label htmlFor="employeeID">Employee ID: </label>
    <input
      type="number"
      id="employeeID"
      name="employeeID"
      value={form.employeeID}
      onChange={handleChange}
    />
    {errors.employeeID && (
      <p className="error">{errors.employeeID}</p>
    )}

    <label htmlFor="parentPhoneNumber">Parent Contact Number: </label>
    <input
      type="number"
      id="parentPhoneNumber"
      name="parentPhoneNumber"
      value={form.parentPhoneNumber}
      onChange={handleChange}
    />
    {errors.parentPhoneNumber && (
      <p className="error">{errors.parentPhoneNumber}</p>
    )}

    <button type="submit">Update Referral</button>
  </form>
</div>

);
};

export default EditReferral;