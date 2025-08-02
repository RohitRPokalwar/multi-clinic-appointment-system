const mongoose = require('mongoose');
const doctorSlotSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String, // YYYY-MM-DD
  slots: [String], // ["10:00", "10:30", ...]
});
module.exports = mongoose.model('DoctorSlot', doctorSlotSchema);
