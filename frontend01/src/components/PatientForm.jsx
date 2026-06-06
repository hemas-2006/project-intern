import { useState } from "react";
import axios from "axios";

function PatientForm() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addPatient = async () => {
    if (!form.patientName) {
      alert("Patient name required");
      return;
    }

    await axios.post(
      "http://localhost:3000/patients",
      form
    );

    alert("Patient Added");

    setForm({
      patientName: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      bloodGroup: ""
    });
  };

  return (
    <div className="box">
      <h2>Patient Registration</h2>

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
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <input
        name="bloodGroup"
        placeholder="Blood Group"
        value={form.bloodGroup}
        onChange={handleChange}
      />

      <button onClick={addPatient}>
        Add Patient
      </button>
    </div>
  );
}

export default PatientForm;