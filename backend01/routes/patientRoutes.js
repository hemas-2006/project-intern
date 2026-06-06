const express = require("express");
const router = express.Router();

const Patient = require("../models/patient");

// CREATE
router.post("/", async (req, res) => {
  const data = new Patient(req.body);
  await data.save();
  res.json(data);
});

// READ
router.get("/", async (req, res) => {
  const data = await Patient.find();
  res.json(data);
});

module.exports = router;