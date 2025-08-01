const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  availableSlots: [{ date: String, time: String, isBooked: Boolean }]
});

module.exports = mongoose.model('Doctor', DoctorSchema);
