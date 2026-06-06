const Patient = require("../models/patient");

// CREATE
exports.createPatient = async (req, res) => {
  try {
    const data = new Patient(req.body);
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getPatients = async (req, res) => {
  const data = await Patient.find();
  res.json(data);
};

// DELETE
exports.deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};