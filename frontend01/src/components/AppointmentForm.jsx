import { useState } from "react";
import axios from "axios";

function AppointmentForm() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    doctor: "",
    date: "",
    symptoms: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addAppointment = async () => {
    if (!form.patientName) {
      alert("Patient name required");
      return;
    }

    await axios.post(
      "http://localhost:3000/appointments",
      form
    );

    alert("Appointment Booked");

    setForm({
      patientName: "",
      age: "",
      gender: "",
      doctor: "",
      date: "",
      symptoms: ""
    });
  };

  return (
    <div className="box">
      <h2>Appointment Booking</h2>

      <input
        name="patientName"
        placeholder="Patient Name"
        value={form.patientName}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
      />

      <input
        name="doctor"
        placeholder="Doctor Name"
        value={form.doctor}
        onChange={handleChange}
      />

      <input
        name="date"
        placeholder="Date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        name="symptoms"
        placeholder="Symptoms"
        value={form.symptoms}
        onChange={handleChange}
      />

      <button onClick={addAppointment}>
        Book Appointment
      </button>
    </div>
  );
}

export default AppointmentForm;