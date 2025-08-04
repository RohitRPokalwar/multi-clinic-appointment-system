require('dotenv').config();
const { sendAppointmentConfirmation } = require('./services/emailService');

// Test email functionality
async function testEmail() {
  console.log('Testing email functionality...');
  console.log('Email password available:', !!process.env.EMAIL_PASS);
  
  const testData = {
    patientName: 'Test Patient',
    doctorName: 'Dr. Test Doctor',
    clinicName: 'Test Clinic',
    date: '2025-08-05',
    time: '10:00 AM'
  };
  
  try {
    const result = await sendAppointmentConfirmation('test@example.com', testData);
    console.log('Email test result:', result);
  } catch (error) {
    console.error('Email test failed:', error);
  }
}

testEmail(); 