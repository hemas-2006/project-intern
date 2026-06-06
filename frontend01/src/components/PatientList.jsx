import { useEffect, useState } from "react";
import axios from "axios";

function PatientList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await axios.get(
      "http://localhost:3000/patients"
    );

    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = async (id) => {
    await axios.delete(
      `http://localhost:3000/patients/${id}`
    );

    fetchPatients();
  };

  return (
    <div className="box">
      <h2>Patients List</h2>

      <ul>
        {patients.map((p) => (
          <li key={p._id}>
            {p.patientName} - {p.phone}

            <button
              onClick={() => deletePatient(p._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;