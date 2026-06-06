const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  doctor: String,
  date: String,
  symptoms: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);