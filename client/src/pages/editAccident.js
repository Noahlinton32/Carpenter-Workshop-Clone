import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
const EditAccident = () => {
    const { id } = useParams();
    const navigate = useNavigate();
      const [form, setForm] = useState({
        accidentReportNumber: '',
        studentID: '',
        employeeID: '',
        school: '',
        room: '',
        date: '',
        location: '',
        employeeIDInvolved: '',
        studentIDInvolved: '',
        cause: '',
        response: '',
        preventativeAction: '',
        witnesses: '',
        signed: '',
      });
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };
      useEffect(() => {
        const getAccident = async () => {
          try {
            const res = await axios.get(`http://localhost:3000/accidents/${id}`);
            const accidentData = res.data.accident;
            accidentData.date = formatDate(accidentData.date);
            setForm(accidentData);
          } catch (error) {
            console.error("Failed to fetch accident data:", error);
          }
        };
        getAccident();
      }, [id]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      await axios.put(`http://localhost:3000/accidents/${id}`, form);
      navigate('/accidents');
    };
  
    return (
        <form onSubmit={handleSubmit}>
        <h2>Edit Accident</h2>
      
        <label htmlFor="accidentReportNumber">Accident Report Number:</label>
        <input
          onChange={setForm}
          value={form.accidentReportNumber}
          type="number"
          name="accidentReportNumber"
        />
      
        <div>
          <label htmlFor="studentID">Student ID:</label>
          <input
            onChange={setForm}
            value={form.studentID}
            name="studentID"
          />
      
          <label htmlFor="employeeID">Employee ID:</label>
          <input
            onChange={setForm}
            value={form.employeeID}
            name="employeeID"
          />
        </div>
      
        <label htmlFor="school">School:</label>
        <input
          onChange={setForm}
          value={form.school}
          name="school"
        />
      
        <label htmlFor="room">Room:</label>
        <input
          onChange={setForm}
          value={form.room}
          name="room"
        />
      
        <label htmlFor="date">Date:</label>
        <input
          onChange={setForm}
          value={form.date}
          type="date"
          name="date"
        />
      
        <label htmlFor="location">Location:</label>
        <input
          onChange={setForm}
          value={form.location}
          name="location"
        />
      
        <div>
          <label htmlFor="employeeIDInvolved">Staff Involved:</label>
          <input
            onChange={setForm}
            value={form.employeeIDInvolved}
            name="employeeIDInvolved"
            type="number"
          />
      
          <label htmlFor="studentIDInvolved">Other Student Involved ID:</label>
          <input
            onChange={setForm}
            value={form.studentIDInvolved}
            name="studentIDInvolved"
          />
        </div>
      
        <label htmlFor="cause">Cause:</label>
        <input
          onChange={setForm}
          value={form.cause}
          name="cause"
        />
      
        <label htmlFor="response">Response:</label>
        <input
          onChange={setForm}
          value={form.response}
          name="response"
        />
      
        <label htmlFor="preventativeAction">Preventative Action Taken:</label>
        <input
          onChange={setForm}
          value={form.preventativeAction}
          name="preventativeAction"
        />
      
        <label htmlFor="witnesses">Witness:</label>
        <input
          onChange={setForm}
          value={form.witnesses}
          name="witnesses"
        />
      
        <fieldset>
          <legend>Signed?</legend>
          <label>
            <input
              type="radio"
              value="Yes"
              name="signed"
              checked={form.signed === 'Yes'}
              onChange={setForm}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              name="signed"
              checked={form.signed === 'No'}
              onChange={setForm}
            />
            No
          </label>
        </fieldset>
      
        <button type="submit">Update Accident</button>
      </form>
    );
    };
  export default EditAccident;