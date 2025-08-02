const express = require('express');
const doctorRouter = express.Router();
const Appointment = require('../models/Appointment');
const DoctorSlot = require('../models/DoctorSlot');

// ==========================
// ✅ Get Appointments for a Doctor
// ==========================
doctorRouter.get('/appointments', async (req, res) => {
  try {
    const doctorId = req.query.doctor;
    if (!doctorId) return res.status(400).json({ error: 'Doctor ID missing in query' });

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name')
      .populate('doctor', 'name email speciality')
      .populate('clinic', 'name');

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// ==========================
// ✅ Add/Update Slots for Doctor
// POST /api/doctor/slots
// ==========================
doctorRouter.post('/slots', async (req, res) => {
  const { doctor, date, slots } = req.body;

  const existing = await DoctorSlot.findOne({ doctor, date });

  if (existing) {
    // Merge without duplicates
    const updatedSlots = Array.from(new Set([...existing.slots, ...slots]));
    existing.slots = updatedSlots;
    await existing.save();
    return res.json(existing);
  }

  const newSlot = new DoctorSlot({ doctor, date, slots });
  await newSlot.save();
  res.json(newSlot);
});

// ==========================
// ✅ Get All Slots for a Doctor (regardless of date)
// GET /api/doctor/slots/:doctorId
// ==========================
doctorRouter.get('/slots/:doctorId', async (req, res) => {
  try {
    const slots = await DoctorSlot.find({ doctor: req.params.doctorId });
    res.json(slots);
  } catch (err) {
    console.error('Error fetching doctor slots:', err);
    res.status(500).json({ error: 'Failed to fetch slots' });
  }
});

// ==========================
// ✅ Get Available Slots for a Doctor on a Specific Date
// GET /api/doctor/:id/slots?date=YYYY-MM-DD
// ==========================
doctorRouter.get('/:id/slots', async (req, res) => {
  try {
    const doctor = req.params.id;
    const date = req.query.date;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const slotDoc = await DoctorSlot.findOne({ doctor, date });
    const allSlots = slotDoc ? slotDoc.slots : [];

    const booked = await Appointment.find({ doctor, date });
    const taken = booked.map(a => a.time);

    const available = allSlots.filter(s => !taken.includes(s));
    res.json(available);
  } catch (err) {
    console.error('Error getting available slots:', err);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

module.exports = doctorRouter;
