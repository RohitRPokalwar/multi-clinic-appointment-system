// === client/src/App.jsx ===
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import DoctorDashboard from './pages/DoctorDashboard'; // ✅ real one
import DoctorSlotManager from './pages/DoctorSlotManager'; // ✅ real one
import MyAppointments from './pages/MyAppointments'; // Import the real MyAppointments component
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login/:role" element={<LoginRouter />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Patient */}
        <Route path="/patient/dashboard" element={<ProtectedRoute element={<PatientDashboard />} requiredRole="patient" />} />
        <Route path="/patient/book" element={<ProtectedRoute element={<BookAppointment />} requiredRole="patient" />} />
        <Route path="/patient/my" element={<ProtectedRoute element={<MyAppointments />} requiredRole="patient" />} />

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<ProtectedRoute element={<DoctorDashboard />} requiredRole="doctor" />} />
        <Route path="/doctor/slots" element={<ProtectedRoute element={<DoctorSlotManager />} requiredRole="doctor" />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
