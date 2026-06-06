const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

/* =========================
   CREATE APPOINTMENT (POST)
========================= */
router.post("/", async (req, res) => {
  try {
    console.log("DATA RECEIVED:", req.body);

    const appt = new Appointment(req.body);
    const saved = await appt.save();

    console.log("SAVED DATA:", saved);

    res.json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Booking failed" });
  }
});

/* =========================
   GET ALL APPOINTMENTS
========================= */
router.get("/", async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* =========================
   UPDATE APPOINTMENT
========================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

/* =========================
   DELETE APPOINTMENT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;