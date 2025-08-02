const mongoose = require('mongoose'); // make sure this is at the top
const express = require('express');
const router = express.Router();
const Clinic = require('../models/Clinic');
const User = require('../models/user'); // ✅ fix typo: should be user.js
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');

// ==========================
// ✅ CLINIC CRUD
// ==========================
router.get('/clinics', async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (err) {
    console.error('Error fetching clinics:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// ✅ ADD NEW CLINIC
router.post('/clinics', async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: 'Name and address are required' });
    }

    const newClinic = new Clinic({ name, address });
    await newClinic.save();

    res.status(201).json({ message: 'Clinic added', clinic: newClinic });
  } catch (err) {
    console.error('Error adding clinic:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/clinics/:id', async (req, res) => {
  try {
    await Clinic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Clinic deleted' });
  } catch (err) {
    console.error('Error deleting clinic:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==========================
// ✅ ADD DOCTOR (via User Model)
// ==========================
router.post('/doctors', async (req, res) => {
  try {
    const { name, email, password, clinicId } = req.body;

    if (!name || !email || !password || !clinicId) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Doctor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'doctor',
      clinic: clinicId,
    });

    res.status(201).json({ message: 'Doctor registered successfully', doctor });
  } catch (err) {
    console.error('Error adding doctor:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==========================
// ✅ GET ALL DOCTORS
// ==========================
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).populate('clinic', 'name');
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// ✅ Get appointments for a specific doctor



// ==========================
// ✅ GET DOCTORS BY CLINIC
// ==========================
router.get('/clinics/:clinicId/doctors', async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const doctors = await User.find({  role: 'doctor' }); // You can filter by clinic later
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ error: 'Failed to get doctors' });
  }
});


// ==========================
// ✅ GET ALL APPOINTMENTS
// ==========================
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('doctor', 'name');
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
