const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
  name: String,
  address: String
});

module.exports = mongoose.model('Clinic', ClinicSchema);
