const express = require("express");
const Doctor = require("../models/Doctor");
const auth = require("../middleware/auth");
const router = express.Router();

// Add doctor
router.post("/", auth, async (req, res) => {
  try {
    const { name, specialization } = req.body;
    const doctor = await Doctor.create({ name, specialization });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update doctor
router.put("/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    const { name, specialization } = req.body;
    await doctor.update({ name, specialization });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete doctor
router.delete("/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    await doctor.destroy();
    res.json({ msg: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
