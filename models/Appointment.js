const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  date: String,
  time: String,
  status: { type: String, default: 'booked' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
