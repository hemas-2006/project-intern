const Appointment = require("../models/appointment");

// CREATE
exports.createAppointment = async (req, res) => {
  try {
    const data = new Appointment(req.body);
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAppointments = async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
};

// DELETE
exports.deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};