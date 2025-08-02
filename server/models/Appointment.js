const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  date: String,
  time: String,
});

// ✅ This prevents OverwriteModelError:
module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
