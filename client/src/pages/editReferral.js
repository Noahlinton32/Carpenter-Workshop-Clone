import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditReferral = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const formWithoutCircularReferences = removeCircularReferences(form);
    await axios.put(`http://localhost:3000/referrals/${id}`, formWithoutCircularReferences);
    navigate('/referrals');
  };

  return (
    <div>
      <h1>Edit Referral</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="referralNumber">Referral Number: </label>
        <input
            onChange={(event) => setForm({ ...form, referralNumber: event.target.value })}
            value={form.referralNumber}
            name="referralNumber"
            type="Number"
        />
        <label htmlFor="studentID">Student ID: </label>
        <input
            onChange={(event) => setForm({ ...form, studentID: event.target.value })}
            value={form.studentID}
            name="studentID"
            type="number"
        />
        <label htmlFor="studentName">Student Name: </label>
        <input
            onChange={(event) => setForm({ ...form, studentName: event.target.value })}
            value={form.studentName}
            name="studentName"
        />
        <label htmlFor="date">Date: </label>
        <input
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            value={form.date}
            type="date"
            name="date"
        />
        <label htmlFor="cause">Cause: </label>
        <input
            onChange={(event) => setForm({ ...form, cause: event.target.value })}
            value={form.cause}
            name="cause"
        />
        <label htmlFor="action">Action: </label>
        <input
            onChange={(event) => setForm({ ...form, action: event.target.value })}
            value={form.action}
            name="action"
        />
        <label htmlFor="employeeID">Employee ID: </label>
        <input
            onChange={(event) => setForm({ ...form, employeeID: event.target.value })}
            value={form.employeeID}
            name="employeeID"
            type="Number"
        />
        <label htmlFor="parentPhoneNumber">Parent Contact Number: </label>
        <input
            onChange={(event) => setForm({ ...form, parentPhoneNumber: event.target.value })}
            value={form.parentPhoneNumber}
            name="parentPhoneNumber"
            type="Number"
        />

        <button type="submit">Create Referral</button>
        </form>
    </div>
  );
};

export default EditReferral;