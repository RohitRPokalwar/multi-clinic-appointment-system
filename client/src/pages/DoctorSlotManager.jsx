import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DoctorSlotManager() {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const doctorId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) return;
    axios.get(`/api/doctor/slots/${doctorId}`)
      .then(res => setSlots(res.data))
      .catch(err => console.error('Error loading slots:', err));
  }, [doctorId]);

  const addSlot = () => {
    if (!date || !timeInput) return alert('Enter both date and time');

    // Optional: Convert 24h time to 12h AM/PM format if your backend expects it
    const formattedTime = new Date(`1970-01-01T${timeInput}:00`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    axios.post('/api/doctor/slots', {
      doctor: doctorId,
      date,
      slots: [formattedTime], // Send in formatted 12h format
    })
    .then(res => {
      alert('Slot added successfully!');
      setTimeInput('');
      return axios.get(`/api/doctor/slots/${doctorId}`);
    })
    .then(res => setSlots(res.data))
    .catch(err => {
      console.error('Error adding slot:', err);
      alert('Failed to add slot');
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🩺 Manage Slots</h2>
        <button onClick={handleLogout} style={{ background: 'red', color: 'white' }}>
          🚪 Logout
        </button>
      </div>

      <label>📆 Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <label>⏰ Time Slot</label>
      <input
        type="time"
        value={timeInput}
        onChange={e => setTimeInput(e.target.value)}
      />

      <button onClick={addSlot} style={{ marginTop: '10px' }}>➕ Add Slot</button>

      <h3>📋 Your Slots</h3>
      {slots.length === 0 ? (
        <p>No slots found.</p>
      ) : (
        <ul>
          {slots.map((slot, index) => (
            <li key={index}>
              📅 <strong>{slot.date}</strong>: {slot.times?.join(', ') || slot.slots?.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
