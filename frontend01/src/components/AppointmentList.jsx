import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await axios.get(
      "http://localhost:3000/appointments"
    );

    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    await axios.delete(
      `http://localhost:3000/appointments/${id}`
    );

    fetchAppointments();
  };

  return (
    <div className="box">
      <h2>Appointments List</h2>

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.patientName} - {a.doctor} - {a.date}

            <button
              onClick={() =>
                deleteAppointment(a._id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;