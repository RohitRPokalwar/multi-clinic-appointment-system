const express = require('express');
const Clinic = require('../models/clinic');
const router = express.Router();

// GET all clinics
router.get('/', async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new clinic
router.post('/', async (req, res) => {
  const { name, address } = req.body;
  try {
    const newClinic = new Clinic({ name, address });
    await newClinic.save();
    res.status(201).json(newClinic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
