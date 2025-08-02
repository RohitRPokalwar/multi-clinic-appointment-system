import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarPlus, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa';
import './PatientDashboard.css';
import './AdminDashboard.css';

export default function PatientDashboard() {
  return (
    <div className="container">
      <div className="admin-header">
        <h2 className="title">Patient Dashboard</h2>
        <button 
          className="admin-logout"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            window.location.href = '/';
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
      
      <div className="dashboard-cards">
        <Link to="/patient/book" className="dashboard-card">
          <div className="card-icon"><FaCalendarPlus /></div>
          <h3>Book Appointment</h3>
          <p>Schedule a new appointment with a doctor</p>
        </Link>
        
        <Link to="/patient/my" className="dashboard-card">
          <div className="card-icon"><FaCalendarCheck /></div>
          <h3>My Appointments</h3>
          <p>View and manage your existing appointments</p>
        </Link>
      </div>
    </div>
  );
}
