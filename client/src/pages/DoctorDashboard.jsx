import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const doctorId = localStorage.getItem('userId');

  useEffect(() => {
  if (!doctorId) {
    setError('Doctor not logged in.');
    return;
  }

  axios.get(`/api/doctor/appointments?doctor=${doctorId}`)
    .then(res => setAppointments(res.data))
    .catch(err => {
      console.error('Error loading appointments:', err);
      setError('Failed to load appointments.');
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

  return (
    <div className="container">
      <h2 className="title">👨‍⚕️ Doctor Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {doctorInfo && (
        <div className="doctor-info" style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          <h3>{doctorInfo.name}</h3>
          <p>Email: {doctorInfo.email}</p>
          <p>Speciality: <strong>{doctorInfo.speciality || 'Not specified'}</strong></p>
          <p>Clinic: {doctorInfo.clinic?.name || 'Not assigned'}</p>
        </div>
      )}

      <Link to="/doctor/slots">
        <button>🛠️ Manage Available Slots</button>
      </Link>

      <h3>📋 Your Appointments:</h3>
      {appointments.length === 0 && !error && <p>No appointments found.</p>}
      <ul>
        {appointments.map(a => (
          <li key={a._id}>
            📅 <strong>{a.date}</strong> at ⏰ <strong>{a.time}</strong><br />
            👤 Patient: <em>{a.patient?.name || 'N/A'}</em><br />
            🏥 Clinic: <em>{a.clinic?.name || 'N/A'}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
