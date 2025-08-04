import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { FaCalendarAlt, FaUserMd, FaHospital, FaClock, FaTrashAlt } from 'react-icons/fa';
import './MyAppointments.css';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get('/appointments/mine')
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching appointments:', err);
        setError('Failed to load your appointments. Please try again later.');
        setLoading(false);
      });
  }, []);

  const cancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setLoading(true);
      API.delete(`/appointments/${id}`)
        .then(() => {
          setAppointments(appointments.filter(a => a._id !== id));
          setLoading(false);
        })
        .catch(err => {
          console.error('Error cancelling appointment:', err);
          setError('Failed to cancel appointment. Please try again.');
          setLoading(false);
        });
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container appointments-container">
      <h2 className="appointments-title">My Appointments</h2>
      
      {loading && (
        <div className="loading-spinner"></div>
      )}
      
      {error && (
        <div className="auth-error" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      {!loading && !error && appointments.length === 0 && (
        <div className="no-appointments">
          <p>You don't have any appointments scheduled.</p>
        </div>
      )}
      
      {!loading && !error && appointments.length > 0 && (
        <ul className="appointments-list">
          {appointments.map((a, index) => (
            <li key={a._id} className="appointment-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="appointment-info">
                <FaCalendarAlt className="appointment-icon" />
                <strong>Date:</strong> {formatDate(a.date)}
              </div>
              <div className="appointment-info">
                <FaClock className="appointment-icon" />
                <strong>Time:</strong> {a.time}
              </div>
              <div className="appointment-info">
                <FaUserMd className="appointment-icon" />
                <strong>Doctor:</strong> {a.doctor?.name || 'Not assigned'} 
                {a.doctor?.speciality && <span> - {a.doctor.speciality}</span>}
              </div>
              <div className="appointment-info">
                <FaHospital className="appointment-icon" />
                <strong>Clinic:</strong> {a.clinic?.name || 'Not specified'}
              </div>
              <button 
                onClick={() => cancel(a._id)} 
                className="cancel-btn"
              >
                <FaTrashAlt style={{ marginRight: '8px' }} /> Cancel Appointment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
