0// Example: models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  speciality: String // Added speciality field for doctors
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);