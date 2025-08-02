const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic'  // 👈 This enables population
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
