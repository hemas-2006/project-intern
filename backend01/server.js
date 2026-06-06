const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MUST BE EXACT
app.use("/appointments", appointmentRoutes);
app.use("/patients", patientRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});