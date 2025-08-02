import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ clinic: '', doctor: '', date: '', time: '', patient: '' });
  const [error, setError] = useState(null);
const [hasCheckedSlots, setHasCheckedSlots] = useState(false);

  const navigate = useNavigate();

  // Fetch all clinics on mount
  useEffect(() => {
    axios.get('/api/admin/clinics')
      .then(res => setClinics(res.data))
      .catch(err => {
        console.error('Error loading clinics:', err);
        setError('Failed to load clinics.');
      });

    const patientId = localStorage.getItem('userId');
    setForm(prev => ({ ...prev, patient: patientId }));
  }, []);

  // Fetch doctors based on clinic
  const fetchDoctors = (clinicId) => {
    axios.get(`/api/admin/clinics/${clinicId}/doctors`)
      .then(res => {
        setDoctors(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error loading doctors:', err);
        setDoctors([]);
        setError('No doctors found for this clinic.');
      });
  };

  // Fetch available slots
 const fetchSlots = () => {
  if (!form.doctor || !form.date) {
    alert('Select doctor and date first.');
    return;
  }

  setHasCheckedSlots(true); // mark that user initiated a slot check

  axios.get(`/api/doctor/${form.doctor}/slots?date=${form.date}`)
    .then(res => {
      setSlots(res.data);
      if (res.data.length === 0) {
        setError('No available slots.');
        alert('⚠️ No available slots for this doctor on selected date.');
      } else {
        setError(null);
      }
    })
    .catch(err => {
      console.error('Error loading slots:', err);
      setSlots([]);
      setError('Error fetching slots.');
    });
};


  // Book appointment
  const bookAppointment = () => {
    if (!form.clinic || !form.doctor || !form.date || !form.time) {
      alert('Please fill all fields before booking.');
      return;
    }

    const patientId = localStorage.getItem('userId');
    if (!patientId) {
      alert('Please login as patient.');
      return;
    }

    const payload = {
      ...form,
      patient: patientId,
    };

    axios.post('/api/appointments', payload)
      .then(() => {
        alert('✅ Appointment booked successfully!');
        setForm({ clinic: '', doctor: '', date: '', time: '', patient: patientId });
        setDoctors([]);
        setSlots([]);
        setError(null);
      })
      .catch(err => {
        console.error('Booking failed:', err.response?.data || err.message);
        alert('❌ Booking failed');
      });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="container">
      {/* Header and Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="title">📅 Book Appointment</h2>
        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
          🚪 Logout
        </button>
      </div>

      {hasCheckedSlots && form.doctor && form.date && slots.length === 0 && !error && (
  <p style={{ color: 'orange' }}>⚠️ No available slots for this doctor on selected date.</p>
)}


      {/* Clinic Selection */}
      <label>🏥 Select Clinic</label>
      <select
        value={form.clinic}
        onChange={(e) => {
          const clinicId = e.target.value;
          setForm({ ...form, clinic: clinicId, doctor: '', time: '' });
          if (clinicId) fetchDoctors(clinicId);
        }}
      >
        <option value="">-- Select Clinic --</option>
        {clinics.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* Doctor Selection */}
      <label>👨‍⚕️ Select Doctor</label>
      <select
        value={form.doctor}
        onChange={(e) => setForm({ ...form, doctor: e.target.value, time: '' })}
        disabled={!doctors.length}
      >
        <option value="">-- Select Doctor --</option>
        {doctors.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      {/* Date Selection */}
      <label>📆 Select Date</label>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value, time: '' })}
      />

      {/* Slot Fetch Button */}
      <button onClick={fetchSlots} disabled={!form.doctor || !form.date}>
        🔍 Check Slots
      </button>

      {/* Time Slot Selection */}
      <label>⏰ Select Time Slot</label>
      <select
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        disabled={!slots.length}
      >
        <option value="">-- Select Time Slot --</option>
        {slots.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      {/* Submit Button */}
      <button onClick={bookAppointment} style={{ marginTop: '1rem' }}>
        ✅ Confirm Booking
      </button>
    </div>
  );
}
