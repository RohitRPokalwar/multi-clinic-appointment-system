require('dotenv').config();
const { sendAppointmentConfirmation } = require('./services/emailServiceBackup');

// Test backup email functionality
async function testBackupEmail() {
  console.log('Testing backup email functionality...');
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
    console.log('Backup email test result:', result);
  } catch (error) {
    console.error('Backup email test failed:', error);
  }
}

testBackupEmail(); 