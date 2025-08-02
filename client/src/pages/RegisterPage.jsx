import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });

 const handleSubmit = async () => {
  if (!form.name || !form.email || !form.password || !form.role) {
    alert('Please fill all fields');
    return;
  }

  try {
    await axios.post('/api/register', form);
    alert('Registered successfully!');
    window.location.href = `/login/${form.role}`;
  } catch (err) {
    alert(err?.response?.data?.message || 'Registration failed');
  }
};


  return (
    <div className="container">
      <h2 className="title">Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
}
