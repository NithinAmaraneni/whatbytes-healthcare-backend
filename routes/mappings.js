const express = require("express");
const Mapping = require("../models/Mapping");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const auth = require("../middleware/auth");
const router = express.Router();

// Assign doctor to patient
router.post("/", auth, async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;
    const patient = await Patient.findByPk(patientId);
    const doctor = await Doctor.findByPk(doctorId);

    if (!patient || !doctor) return res.status(404).json({ msg: "Patient or Doctor not found" });

    await patient.addDoctor(doctor);
    res.json({ msg: "Doctor assigned to patient" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all mappings
router.get("/", auth, async (req, res) => {
  try {
    const mappings = await Mapping.findAll({ include: [Patient, Doctor] });
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all doctors for a patient
router.get("/:patientId", auth, async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patientId, { include: Doctor });
    if (!patient) return res.status(404).json({ msg: "Patient not found" });
    res.json(patient.Doctors);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Remove doctor from patient
router.delete("/:id", auth, async (req, res) => {
  try {
    const mapping = await Mapping.findByPk(req.params.id);
    if (!mapping) return res.status(404).json({ msg: "Mapping not found" });

    await mapping.destroy();
    res.json({ msg: "Mapping deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
