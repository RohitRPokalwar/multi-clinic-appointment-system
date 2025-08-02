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
          <li key={a._id}>{a.date} {a.time} with {a.doctor?.name}
            <button onClick={() => cancel(a._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
