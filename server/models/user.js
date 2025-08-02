// Example: models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);