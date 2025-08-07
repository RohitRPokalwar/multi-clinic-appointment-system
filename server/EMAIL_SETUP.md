# Email Setup Instructions

## Setting up Email Functionality

To enable email notifications for appointment bookings, follow these steps:

### 1. Create a .env file in the server directory

Create a file named `.env` in the `server/` directory with the following content:

```
EMAIL_PASS=your_app_password_here
MONGO_URI=mongodb://localhost:27017/healthcare-app
JWT_SECRET=your_jwt_secret_here
```

### 2. Set up Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Replace `your_app_password_here` in the .env file with the generated password 

### 3. Email Features

- **Appointment Confirmation**: When a patient books an appointment, they will receive a professional email confirmation
- **Email Content**: Includes appointment details, doctor information, clinic details, and important reminders
- **Professional Design**: Beautiful HTML email template with gradient backgrounds and modern styling

### 4. Email Template Features

- Responsive design that works on all devices
- Professional healthcare branding
- Appointment details with clear formatting
- Important reminders for patients
- Gradient backgrounds and modern styling
- Emoji icons for better visual appeal

### 5. Testing

To test the email functionality:

1. Start the server
2. Book an appointment as a patient
3. Check the patient's email for the confirmation message

### Note

The email service is configured to send emails from `rohitpokalwar95@gmail.com`. Make sure this email account has the app password set up correctly.

If you need to change the sender email, update the `user` field in `server/services/emailService.js`.
