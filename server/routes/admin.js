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
    console.log('Deleting clinic with ID:', req.params.id);
    const result = await Clinic.findByIdAndDelete(req.params.id);
    console.log('Delete clinic result:', result);
    
    if (!result) {
      return res.status(404).json({ error: 'Clinic not found' });
    }
    
    res.json({ message: 'Clinic deleted', deletedClinic: result });
  } catch (err) {
    console.error('Error deleting clinic:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ==========================
// ✅ ADD DOCTOR (via User Model)
// ==========================
router.post('/doctors', async (req, res) => {
  try {
    const { name, email, password, clinicId, speciality } = req.body;
    console.log('Adding doctor with data:', { name, email, clinicId, speciality });

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
      speciality
    });

    console.log('Doctor created successfully:', doctor);
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
    console.log('Fetching all doctors');
    const doctors = await User.find({ role: 'doctor' }).populate('clinic', 'name');
    console.log('Found all doctors:', doctors.length, doctors);
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==========================
// ✅ GET SINGLE DOCTOR
// ==========================
router.get('/doctors/:id', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await User.findById(doctorId).populate('clinic', 'name');
    
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error('Error fetching doctor:', err);
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
    console.log('Fetching doctors for clinic ID:', clinicId);
    
    // Validate clinicId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(clinicId)) {
      return res.status(400).json({ error: 'Invalid clinic ID format' });
    }
    
    // Find doctors that belong to the specified clinic
    const doctors = await User.find({ 
      role: 'doctor',
      clinic: clinicId 
    }).populate('clinic', 'name');
    
    console.log('Found doctors for clinic:', doctors.length, doctors);
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors for clinic:', err);
    res.status(500).json({ error: 'Failed to get doctors for this clinic' });
  }
});


// ==========================
// ✅ GET ALL APPOINTMENTS
// ==========================
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('doctor', 'name')
      .populate('clinic', 'name');
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==========================
// ✅ UPDATE CLINIC
// ==========================
router.put('/clinics/:id', async (req, res) => {
  try {
    const { name, address } = req.body;
    const updatedClinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      { name, address },
      { new: true }
    );
    res.json({ message: 'Clinic updated successfully', clinic: updatedClinic });
  } catch (err) {
    console.error('Error updating clinic:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==========================
// ✅ DELETE DOCTOR
// ==========================
router.delete('/doctors/:id', async (req, res) => {
  try {
    console.log('Deleting doctor with ID:', req.params.id);
    const result = await User.findByIdAndDelete(req.params.id);
    console.log('Delete doctor result:', result);
    
    if (!result) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json({ message: 'Doctor deleted successfully', deletedDoctor: result });
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// ==========================
// ✅ UPDATE DOCTOR
// ==========================
router.put('/doctors/:id', async (req, res) => {
  try {
    const { name, email, clinicId, speciality } = req.body;
    const updateData = { name, email };
    if (clinicId) updateData.clinic = clinicId;
    if (speciality) updateData.speciality = speciality;
    
    const updatedDoctor = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('clinic', 'name');
    
    res.json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==========================
// ✅ DELETE APPOINTMENT
// ==========================
router.delete('/appointments/:id', async (req, res) => {
  try {
    console.log('Deleting appointment with ID:', req.params.id);
    const result = await Appointment.findByIdAndDelete(req.params.id);
    console.log('Delete appointment result:', result);
    
    if (!result) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment deleted successfully', deletedAppointment: result });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
