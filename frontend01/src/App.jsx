import PatientForm from "./components/PatientForm.jsx";
import PatientList from "./components/PatientList.jsx";
import AppointmentForm from "./components/AppointmentForm.jsx";
import AppointmentList from "./components/AppointmentList.jsx";
function App() {
  return (
    <div className="container">
      <h1>🏥 MedQueue System</h1>

      <PatientForm />
      <PatientList />

      <hr />

      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default App;