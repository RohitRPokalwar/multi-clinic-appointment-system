const mongoose = require('mongoose');
const express = require('express');
const AppointmentModel = require('../models/Appointment');
const UserModel = require('../models/user');
const DoctorModel = require('../models/doctor');
const ClinicModel = require('../models/Clinic');
const { sendAppointmentConfirmation } = require('../services/emailService');
const { sendAppointmentConfirmation: sendAppointmentConfirmationBackup } = require('../services/emailServiceBackup');
const appointmentRouter = express.Router();

// Book appointment
appointmentRouter.post('/', async (req, res) => {
  try {
    const { patient, doctor, clinic, date, time } = req.body;

    const exists = await AppointmentModel.findOne({ doctor, date, time });
    if (exists) return res.status(409).json({ error: 'Slot already booked' });

    const appointment = await AppointmentModel.create({ patient, doctor, clinic, date, time });
    
    // Send confirmation email to patient
    try {
      // Get patient, doctor, and clinic details for email
      const [patientData, doctorData, clinicData] = await Promise.all([
        UserModel.findById(patient).select('name email'),
        DoctorModel.findById(doctor).select('name'),
        ClinicModel.findById(clinic).select('name')
      ]);

      if (patientData && patientData.email) {
        const appointmentData = {
          patientName: patientData.name,
          doctorName: doctorData?.name || 'Doctor',
          clinicName: clinicData?.name || 'Clinic',
          date,
          time
        };

        // Send email asynchronously (don't wait for it to complete)
        sendAppointmentConfirmation(patientData.email, appointmentData)
          .then(success => {
            if (success) {
              console.log('Appointment confirmation email sent successfully');
            } else {
              console.log('Primary email method failed, trying backup method...');
              // Try backup email method
              return sendAppointmentConfirmationBackup(patientData.email, appointmentData);
            }
          })
          .then(success => {
            if (success !== undefined) { // Only log if backup method was called
              if (success) {
                console.log('Appointment confirmation email sent successfully (backup method)');
              } else {
                console.log('Failed to send appointment confirmation email (both methods)');
              }
            }
          })
          .catch(err => {
            console.error('Error in email sending:', err);
          });
      }
    } catch (emailError) {
      console.error('Error preparing email data:', emailError);
      // Don't fail the appointment booking if email fails
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Get appointments for a patient by ID
appointmentRouter.get('/mine/:patientId', async (req, res) => {
  try {
    const list = await AppointmentModel.find({ patient: req.params.patientId })
      .populate('doctor', 'name email speciality')
      .populate('clinic', 'name');
    res.json(list);
  } catch (err) {
    console.error('Error fetching appointments by patient ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get appointments for the logged-in patient
appointmentRouter.get('/mine', async (req, res) => {
  try {
    // Get patient ID from token if available
    const patientId = req.user ? req.user.id : null;
    
    if (!patientId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const list = await AppointmentModel.find({ patient: patientId })
      .populate('doctor', 'name email speciality')
      .populate('clinic', 'name');
    res.json(list);
  } catch (err) {
    console.error('Error fetching appointments for logged-in patient:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel appointment
appointmentRouter.delete('/:id', async (req, res) => {
  await AppointmentModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Cancelled' });
});

// Get appointments for a doctor
appointmentRouter.get('/doctor/:id', async (req, res) => {
  const doctorId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ error: 'Invalid doctor ID' });
  }

  try {
    const appointments = await AppointmentModel.find({ doctor: doctorId })
      .populate('patient', 'name')
      .populate('clinic', 'name');

    res.json(appointments);
  } catch (err) {
    console.error('Error loading appointments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = appointmentRouter;
