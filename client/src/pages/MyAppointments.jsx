import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments/mine').then(res => setAppointments(res.data));
  }, []);

  const cancel = (id) => {
    axios.delete(`/api/appointments/${id}`).then(() => window.location.reload());
  };

  return (
    <div className="container">
      <h2 className="title">My Appointments</h2>
      <ul>
        {appointments.map(a => (
          <li key={a._id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <div><strong>Date:</strong> {a.date} at {a.time}</div>
            <div><strong>Doctor:</strong> {a.doctor?.name} {a.doctor?.speciality ? `- ${a.doctor.speciality}` : ''}</div>
            <div><strong>Clinic:</strong> {a.clinic?.name || 'N/A'}</div>
            <button 
              onClick={() => cancel(a._id)} 
              style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
              Cancel Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
