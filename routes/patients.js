const express = require("express");
const Patient = require("../models/Patient");
const auth = require("../middleware/auth");
const router = express.Router();

// Add patient
router.post("/", auth, async (req, res) => {
  try {
    const { name, age, disease } = req.body;
    const patient = await Patient.create({ name, age, disease, userId: req.user.id });
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all patients (for logged in user)
router.get("/", auth, async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get patient by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) return res.status(404).json({ msg: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update patient
router.put("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    const { name, age, disease } = req.body;
    await patient.update({ name, age, disease });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete patient
router.delete("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    await patient.destroy();
    res.json({ msg: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
