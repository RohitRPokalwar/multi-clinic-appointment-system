import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function LandingPage() {
  return (
    <div className="container">
      <h1 className="title">Welcome to Multi-Clinic Appointment System</h1>

      <div className="btn-group">
        <Link to="/login/patient" className="btn">Patient Login</Link>
        <Link to="/login/doctor" className="btn">Doctor Login</Link>
        <Link to="/login/admin" className="btn">Admin Login</Link>
      </div>

      {/* Register Link */}
      <p style={{ marginTop: '2rem' }}>
        New here? <Link to="/register" className="btn" style={{ background: '#28a745' }}>Register</Link>
      </p>
    </div>
  );
}
