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
// Apply verifyToken middleware to admin routes
app.use('/api/admin', verifyToken, require('./routes/admin'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/appointments', appointmentRoutes);
app.use('/api', authRoutes); // ✅ So /api/register will work

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
