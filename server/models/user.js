// Example: models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);