const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointment');
const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/auth');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/auth', require('./routes/auth'));
// Set up admin routes with public and protected endpoints
const adminRoutes = require('./routes/admin');
// Public routes don't require authentication
app.use('/api/admin/clinics', adminRoutes.publicRoutes);
// Protected routes require authentication
app.use('/api/admin', verifyToken, adminRoutes);
app.use('/api/appointments', verifyToken, appointmentRoutes);
app.use('/api', authRoutes); // ✅ So /api/register will work

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
