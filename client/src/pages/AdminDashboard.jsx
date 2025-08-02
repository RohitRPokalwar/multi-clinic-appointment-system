  // === AdminDashboard.jsx ===
import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function AdminDashboard() {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinicForm, setClinicForm] = useState({ name: '', address: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', password: '', clinicId: '' });

  useEffect(() => {
    API.get('/admin/clinics').then(res => setClinics(res.data));
    API.get('/admin/doctors').then(res => setDoctors(res.data));
    API.get('/admin/appointments').then(res => setAppointments(res.data));
  }, []);

  const addClinic = async () => {

    await API.post('/admin/clinics', clinicForm);
    alert('Clinic added');
    window.location.reload();
  };
const addDoctor = async () => {
  const { name, email, password, clinicId } = doctorForm;

  if (!name || !email || !password || !clinicId) {
    alert('Please fill all fields');
    return;
  }

  try {
    console.log('Sending doctor:', doctorForm);
    await API.post('/admin/doctors', {
      name,
      email,
      password,
      clinicId: clinicId,
    });

    alert('Doctor registered!');
    window.location.reload();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert('Failed to register doctor');
  }
};



  return (
    <div className="container">
      <h2 className="title">Admin Dashboard</h2>
<button onClick={() => {
  localStorage.removeItem('token');
  window.location.href = '/';
}}>
  Logout
</button>
      <h3>➕ Add New Clinic</h3>
      <input placeholder="Clinic Name" onChange={e => setClinicForm({ ...clinicForm, name: e.target.value })} />
      <input placeholder="Clinic Address" onChange={e => setClinicForm({ ...clinicForm, address: e.target.value })} />
      <button onClick={addClinic}>Add Clinic</button>

      <h3>➕ Add New Doctor</h3>
      <input placeholder="Doctor Name" onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setDoctorForm({ ...doctorForm, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setDoctorForm({ ...doctorForm, password: e.target.value })} />
      <select
  value={doctorForm.clinicId}
  onChange={e => setDoctorForm({ ...doctorForm, clinicId: e.target.value })}
>
  <option value="">Select Clinic</option>

  {clinics.map(c => (
    <option key={c._id} value={c._id}>{c.name}</option>
  ))}
</select>


      <button onClick={addDoctor}>Add Doctor</button>

      <h3>🏥 Clinics</h3>
      <ul>
        {clinics.map(c => <li key={c._id}>{c.name} - {c.address}</li>)}
      </ul>

      <h3>👨‍⚕️ Doctors</h3>
      <ul>
        {doctors.map(d => <li key={d._id}>{d.name} ({d.email})</li>)}
      </ul>

      <h3>📅 All Appointments</h3>
      <ul>
        {appointments.map((a, i) => (
          <li key={i}>{a.date} {a.time} - {a.patient?.name} with {a.doctor?.name}</li>
        ))}
      </ul>
    </div>
  );
}