# 🏥 Modern Healthcare Appointment System

A professional, full-stack healthcare appointment booking system with beautiful UI/UX, email notifications, and responsive design.

## ✨ Features

### 🎨 **Professional Design**

- **Modern UI/UX**: Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Professional Branding**: Healthcare-focused design with medical icons and color schemes
- **Smooth Animations**: Hover effects, transitions, and loading animations

### 📧 **Email Notifications**

- **Appointment Confirmations**: Patients receive professional email confirmations when booking appointments
- **Beautiful Email Templates**: HTML emails with gradient backgrounds and medical branding
- **Important Reminders**: Email includes appointment details and patient instructions
- **Professional Sender**: Emails sent from `rohitpokalwar95@gmail.com`

### 👨‍⚕️ **Doctor Dashboard**

- **Full-Screen Experience**: Optimized for laptop and desktop viewing
- **Mobile Responsive**: Perfect layout on all mobile devices
- **Professional Cards**: Glassmorphism design with hover effects
- **Real-time Updates**: Live appointment data with smooth animations

### 🏥 **Patient Features**

- **Easy Booking**: Intuitive appointment booking interface
- **Appointment Management**: View, cancel, and manage appointments
- **Email Confirmations**: Receive professional confirmation emails
- **Multiple Clinics**: Book appointments across different healthcare facilities

### 🔐 **Security & Authentication**

- **JWT Authentication**: Secure login/logout system
- **Role-based Access**: Separate dashboards for patients, doctors, and admins
- **Protected Routes**: Secure access to different user interfaces

## 🚀 Technology Stack

### Frontend

- **React.js** - Modern UI framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Beautiful icon library

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account for email notifications

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Hackathon-1
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server/` directory:

   ```env
   EMAIL_PASS=your_gmail_app_password
   MONGO_URI=mongodb://localhost:27017/healthcare-app
   JWT_SECRET=your_jwt_secret_here
   ```

```

```

4. **Set up Gmail App Password**

   - Go to Google Account settings
   - Enable 2-Factor Authentication
   - Generate an app password for "Mail"
   - Add it to the `.env` file

5. **Start the application**

   ```bash
   # Start server (from server directory)
   npm start

   # Start client (from client directory)
   npm run dev
   ```

```

## 🎯 Usage

### For Patients

1. Register/Login to your account
2. Browse available doctors and clinics
3. Book appointments at your convenience
4. Receive email confirmations
5. Manage your appointments

### For Doctors

1. Login to your professional dashboard
2. View upcoming appointments
3. Manage available time slots
4. Access patient information
5. Professional full-screen interface

### For Admins

1. Manage clinics and doctors
2. Monitor system activity
3. Handle user registrations
4. Oversee appointment system

## 🎨 Design Features

### Homepage

- **Animated Background**: Dynamic gradient animations
- **Professional Hero Section**: Clear call-to-action buttons
- **Feature Cards**: Highlighted healthcare benefits
- **Responsive Layout**: Perfect on all devices

### Doctor Dashboard

- **Full-Screen Design**: Optimized for laptop viewing
- **Glassmorphism Cards**: Modern transparent effects
- **Hover Animations**: Interactive elements
- **Mobile Responsive**: Adapts to all screen sizes

### Email Templates

- **Professional Design**: Healthcare branding
- **Gradient Backgrounds**: Beautiful visual appeal
- **Responsive Layout**: Works on all email clients
- **Important Information**: Clear appointment details

## 🔧 Configuration

### Email Setup

See `server/EMAIL_SETUP.md` for detailed email configuration instructions.

### Database

The system uses MongoDB. Make sure MongoDB is running locally or update the connection string in the `.env` file.

### Customization

- Update colors in CSS files for different branding
- Modify email templates in `server/services/emailService.js`
- Add new features through the modular architecture

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop/Laptop**: Full-screen professional interface
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with proper spacing

## 🎉 Professional Features

- **Modern UI/UX**: Glassmorphism, gradients, and animations
- **Email Notifications**: Professional appointment confirmations
- **Responsive Design**: Perfect on all devices
- **Security**: JWT authentication and protected routes
- **Scalable Architecture**: Modular code structure
- **Professional Branding**: Healthcare-focused design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for modern healthcare management**
```
