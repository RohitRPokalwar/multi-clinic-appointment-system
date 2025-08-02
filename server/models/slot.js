const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  times: [String], // ['10:00 AM', '10:30 AM']
});

module.exports = mongoose.model('Slot', slotSchema);