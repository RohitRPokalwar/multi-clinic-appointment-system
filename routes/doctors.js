const express = require('express');
const Doctor = require('../models/doctor');
const router = express.Router();

// GET all doctors or by clinicId
router.get('/', async (req, res) => {
  const clinicId = req.query.clinicId;
  try {
    const doctors = clinicId
      ? await Doctor.find({ clinicId })
      : await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add doctor
router.post('/', async (req, res) => {
  const { name, specialization, clinicId, availableSlots } = req.body;
  try {
    const doctor = new Doctor({ name, specialization, clinicId, availableSlots });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
