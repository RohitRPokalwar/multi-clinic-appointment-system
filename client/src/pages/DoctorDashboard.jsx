import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserMd, FaCalendarAlt, FaClock, FaUser, FaHospital, FaClipboardList, FaCog, FaSignOutAlt, FaEnvelope, FaStethoscope } from 'react-icons/fa';
import './DoctorDashboard.css';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const doctorId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      setError('Doctor not logged in.');
      setLoading(false);
      return;
    }

    axios.get(`/api/doctor/appointments?doctor=${doctorId}`)
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading appointments:', err);
        setError('Failed to load appointments.');
        setLoading(false);
      });
  }, [doctorId]);

  // Get doctor info including speciality
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    if (doctorId) {
      axios.get(`/api/admin/doctors/${doctorId}`)
        .then(res => setDoctorInfo(res.data))
        .catch(err => console.error('Error loading doctor info:', err));
    }
  }, [doctorId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2 className="dashboard-title">
            <FaUserMd className="dashboard-title-icon" /> Doctor Dashboard
          </h2>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" /> Logout
          </button>
        </div>
        
        {error && <div className="auth-error" style={{ marginBottom: '20px' }}>{error}</div>}
        
        {loading && <div className="loading-spinner"></div>}

        {!loading && doctorInfo && (
          <div className="doctor-info-card">
            <h3 className="doctor-name">{doctorInfo.name}</h3>
            
            <div className="doctor-detail">
              <FaEnvelope className="detail-icon" />
              <span className="detail-label">Email:</span>
              <span>{doctorInfo.email}</span>
            </div>
            
            <div className="doctor-detail">
              <FaStethoscope className="detail-icon" />
              <span className="detail-label">Speciality:</span>
              <span>{doctorInfo.speciality || 'Not specified'}</span>
            </div>
            
            <div className="doctor-detail">
              <FaHospital className="detail-icon" />
              <span className="detail-label">Clinic:</span>
              <span>{doctorInfo.clinic?.name || 'Not assigned'}</span>
            </div>
          </div>
        )}

        <Link to="/doctor/slots" style={{ textDecoration: 'none' }}>
          <button className="manage-slots-btn">
            <FaCog style={{ marginRight: '8px' }} /> Manage Available Slots
          </button>
        </Link>

        <div className="appointments-section">
          <h3 className="section-title">
            <FaClipboardList className="section-icon" /> Your Appointments
          </h3>
          
          {!loading && appointments.length === 0 && !error && (
            <div className="no-appointments">
              <p>No appointments scheduled at this time.</p>
            </div>
          )}
          
          {!loading && appointments.length > 0 && (
            <ul className="appointments-list">
              {appointments.map((a, index) => (
                <li key={a._id} className="appointment-item" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="appointment-detail">
                    <FaCalendarAlt className="appointment-icon" />
                    <strong>Date:</strong> {formatDate(a.date)}
                  </div>
                  
                  <div className="appointment-detail">
                    <FaClock className="appointment-icon" />
                    <strong>Time:</strong> {a.time}
                  </div>
                  
                  <div className="appointment-detail">
                    <FaUser className="appointment-icon" />
                    <strong>Patient:</strong> {a.patient?.name || 'Not assigned'}
                  </div>
                  
                  <div className="appointment-detail">
                    <FaHospital className="appointment-icon" />
                    <strong>Clinic:</strong> {a.clinic?.name || 'Not specified'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
