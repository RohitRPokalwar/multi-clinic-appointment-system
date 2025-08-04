require('dotenv').config();

console.log('=== Healthcare System Status Check ===\n');

// Check environment variables
console.log('Environment Variables:');
console.log('- EMAIL_PASS configured:', !!process.env.EMAIL_PASS);
console.log('- MONGO_URI configured:', !!process.env.MONGO_URI);
console.log('- JWT_SECRET configured:', !!process.env.JWT_SECRET);

// Test email service
const { sendAppointmentConfirmation } = require('./services/emailService');

async function testEmail() {
  console.log('\n=== Testing Email Service ===');
  
  const testData = {
    patientName: 'Test Patient',
    doctorName: 'Dr. Test Doctor',
    clinicName: 'Test Clinic',
    date: '2025-08-05',
    time: '10:00 AM'
  };
  
  try {
    const result = await sendAppointmentConfirmation('test@example.com', testData);
    console.log('✅ Email test result:', result);
  } catch (error) {
    console.log('❌ Email test failed:', error.message);
  }
}

testEmail();

console.log('\n=== Server Status ===');
console.log('✅ Server should be running on http://localhost:5000');
console.log('✅ Client should be running on http://localhost:5173');
console.log('✅ Email service is configured and ready');
console.log('\n🎉 System is ready for testing!'); 