const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: Number,
  gender: String,
  phone: String,
  address: String,
  bloodGroup: String
});

module.exports = mongoose.model("Patient", patientSchema);