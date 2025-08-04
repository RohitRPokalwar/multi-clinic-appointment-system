const mongoose = require('mongoose');

const express = require('express');
const AppointmentModel = require('../models/Appointment');
const appointmentRouter = express.Router();

// Book appointment
appointmentRouter.post('/', async (req, res) => {
  const { patient, doctor, clinic, date, time } = req.body;

  const exists = await AppointmentModel.findOne({ doctor, date, time });
  if (exists) return res.status(409).json({ error: 'Slot already booked' });

  const appointment = await AppointmentModel.create({ patient, doctor, clinic, date, time });
  res.json(appointment);
});

// Get appointments for a patient by ID
appointmentRouter.get('/mine/:patientId', async (req, res) => {
  try {
    const list = await AppointmentModel.find({ patient: req.params.patientId })
      .populate('doctor', 'name email speciality')
      .populate('clinic', 'name');
    res.json(list);
  } catch (err) {
    console.error('Error fetching appointments by patient ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get appointments for the logged-in patient
appointmentRouter.get('/mine', async (req, res) => {
  try {
    // Get patient ID from token if available
    const patientId = req.user ? req.user.id : null;
    
    if (!patientId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const list = await AppointmentModel.find({ patient: patientId })
      .populate('doctor', 'name email speciality')
      .populate('clinic', 'name');
    res.json(list);
  } catch (err) {
    console.error('Error fetching appointments for logged-in patient:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel appointment
appointmentRouter.delete('/:id', async (req, res) => {
  await AppointmentModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Cancelled' });
});

// ✅ Get appointments for a doctor
appointmentRouter.get('/doctor/:id', async (req, res) => {
  const doctorId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ error: 'Invalid doctor ID' });
  }

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name')  // ✅ patient name
      .populate('clinic', 'name');  // ✅ clinic name 

    res.json(appointments);
  } catch (err) {
    console.error('Error loading appointments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
appointmentRouter.get('/doctor/:id', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await AppointmentModel.find({ doctor: doctorId })
      .populate('patient', 'name')
      .populate('clinic', 'name');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = appointmentRouter;
