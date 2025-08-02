import React from 'react';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  return (
    <div className="container">
      <h2 className="title">Patient Dashboard</h2>
      <div className="btn-group">
        <Link to="/patient/book" className="btn">Book Appointment</Link>
        <Link to="/patient/my" className="btn">My Appointments</Link>
        <button onClick={() => {
  localStorage.removeItem('token');
  window.location.href = '/';
}}>
  Logout
</button>
      </div>
    </div>
  );
}
