// === client/src/App.jsx ===
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';

import DoctorDashboard from './pages/DoctorDashboard'; // ✅ real one
import DoctorSlotManager from './pages/DoctorSlotManager'; // ✅ real one

const MyAppointments = () => (
  <div className="container"><h2 className="title">My Appointments</h2></div>
);
const NotFound = () => (
  <div className="container"><h2 className="title">404 - Page Not Found</h2></div>
);

function LoginRouter() {
  const { role } = useParams();
  return <LoginPage role={role} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<LoginRouter />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Patient */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/book" element={<BookAppointment />} />
        <Route path="/patient/my" element={<MyAppointments />} />

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/slots" element={<DoctorSlotManager />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
