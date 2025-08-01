const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/doctor');
const router = express.Router();

// POST book appointment
router.post('/', async (req, res) => {
  const { userId, doctorId, clinicId, date, time } = req.body;

  try {
    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing) return res.status(400).json({ message: 'Slot already booked' });

    const newAppointment = new Appointment({ userId, doctorId, clinicId, date, time });
    await newAppointment.save();

    // Optionally update doctor's slot as booked
    await Doctor.updateOne(
      { _id: doctorId, 'availableSlots.date': date, 'availableSlots.time': time },
      { $set: { 'availableSlots.$.isBooked': true } }
    );

    res.status(201).json({ message: 'Appointment booked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user appointments
router.get('/user/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.id }).populate('doctorId clinicId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
