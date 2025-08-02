// === AdminDashboard.jsx ===
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaPlus, FaHospital, FaUserMd, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinicForm, setClinicForm] = useState({ name: '', address: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', password: '', clinicId: '' });
  const [selectedClinic, setSelectedClinic] = useState('');

  useEffect(() => {
    API.get('/admin/clinics').then(res => setClinics(res.data));
    API.get('/admin/doctors').then(res => setDoctors(res.data));
    API.get('/admin/appointments').then(res => setAppointments(res.data));
  }, []);

  // Fetch doctors by clinic when a clinic is selected
  useEffect(() => {
    console.log('Selected clinic changed:', selectedClinic);
    if (selectedClinic) {
      console.log('Fetching doctors for clinic:', selectedClinic);
      API.get(`/admin/clinics/${selectedClinic}/doctors`)
        .then(res => {
          console.log('Received doctors for clinic:', res.data);
          setDoctors(res.data);
        })
        .catch(err => {
          console.error('Error loading doctors for clinic:', err);
          setDoctors([]);
        });
    } else {
      // If no clinic selected, fetch all doctors
      console.log('Fetching all doctors');
      API.get('/admin/doctors')
        .then(res => {
          console.log('Received all doctors:', res.data);
          setDoctors(res.data);
        })
        .catch(err => {
          console.error('Error loading all doctors:', err);
          setDoctors([]);
        });
    }
  }, [selectedClinic]);

  const addClinic = async () => {
    try {
      const response = await API.post('/admin/clinics', clinicForm);
      alert('Clinic added');
      
      // Reset form
      setClinicForm({ name: '', address: '' });
      
      // Refresh the clinics list
      const clinicsResponse = await API.get('/admin/clinics');
      setClinics(clinicsResponse.data);
    } catch (err) {
      console.error('Error adding clinic:', err);
      alert('Failed to add clinic');
    }
  };
const addDoctor = async () => {
  const { name, email, password, clinicId } = doctorForm;
  console.log('Adding doctor with form data:', doctorForm);

  if (!name || !email || !password || !clinicId) {
    alert('Please fill all fields');
    return;
  }

  try {
    console.log('Sending doctor to server:', { name, email, clinicId });
    const response = await API.post('/admin/doctors', {
      name,
      email,
      password,
      clinicId: clinicId,
    });
    
    console.log('Server response for doctor creation:', response.data);
    alert('Doctor registered!');
    
    // Reset form
    setDoctorForm({ name: '', email: '', password: '', clinicId: '' });
    
    // Refresh the doctor list based on current filter
    if (selectedClinic) {
      // If a clinic is selected, fetch doctors for that clinic
      console.log('Refreshing doctors for clinic:', selectedClinic);
      const response = await API.get(`/admin/clinics/${selectedClinic}/doctors`);
      console.log('Updated doctors for clinic:', response.data);
      setDoctors(response.data);
    } else {
      // If no clinic selected, fetch all doctors
      console.log('Refreshing all doctors');
      const response = await API.get('/admin/doctors');
      console.log('Updated all doctors:', response.data);
      setDoctors(response.data);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert('Failed to register doctor');
  }
};



  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
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
      <div className="admin-section">
        <h3 className="admin-section-title"><FaPlus /> Add New Clinic</h3>
        <div className="admin-form">
          <div>
            <input 
              className="admin-input"
              placeholder="Clinic Name" 
              value={clinicForm.name}
              onChange={e => setClinicForm({ ...clinicForm, name: e.target.value })} 
            />
          </div>
          <div>
            <input 
              className="admin-input"
              placeholder="Clinic Address" 
              value={clinicForm.address}
              onChange={e => setClinicForm({ ...clinicForm, address: e.target.value })} 
            />
          </div>
          <div className="admin-form-full">
            <button className="admin-button" onClick={addClinic}>
              <FaPlus /> Add Clinic
            </button>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3 className="admin-section-title"><FaPlus /> Add New Doctor</h3>
        <div className="admin-form">
          <div>
            <input 
              className="admin-input"
              placeholder="Doctor Name" 
              value={doctorForm.name}
              onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} 
            />
          </div>
          <div>
            <input 
              className="admin-input"
              placeholder="Email" 
              value={doctorForm.email}
              onChange={e => setDoctorForm({ ...doctorForm, email: e.target.value })} 
            />
          </div>
          <div>
            <input 
              className="admin-input"
              placeholder="Password" 
              type="password" 
              value={doctorForm.password}
              onChange={e => setDoctorForm({ ...doctorForm, password: e.target.value })} 
            />
          </div>
          <div>
            <select
              className="admin-select"
              value={doctorForm.clinicId}
              onChange={e => setDoctorForm({ ...doctorForm, clinicId: e.target.value })}
            >
              <option value="">Select Clinic</option>
              {clinics.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="admin-form-full">
            <button className="admin-button" onClick={addDoctor}>
              <FaPlus /> Add Doctor
            </button>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3 className="admin-section-title"><FaHospital /> Clinics</h3>
        <ul className="admin-list">
          {clinics.map(c => (
            <li key={c._id} className="admin-list-item">
              <strong>{c.name}</strong>
              <span>{c.address}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h3 className="admin-section-title"><FaUserMd /> Doctors</h3>
        <div className="admin-filter">
          <label htmlFor="clinic-select"><FaFilter /> Filter by Clinic:</label>
          <select 
            id="clinic-select"
            className="admin-select"
            value={selectedClinic} 
            onChange={(e) => {
              setSelectedClinic(e.target.value);
            }}
          >
            <option value="">All Clinics</option>
            {clinics.map(clinic => (
              <option key={clinic._id} value={clinic._id}>
                {clinic.name}
              </option>
            ))}
          </select>
        </div>

        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <div className="doctor-list">
            {doctors.map(doctor => (
              <div key={doctor._id} className="doctor-card">
                <div className="doctor-avatar"><FaUserMd /></div>
                <h3>{doctor.name}</h3>
                <p>Email: {doctor.email}</p>
                <p>Clinic: {doctor.clinic?.name || 'Not assigned'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-section">
        <h3 className="admin-section-title"><FaCalendarAlt /> All Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="appointment-list">
            {appointments.map((a, i) => (
              <li key={i} className="appointment-item">
                <div className="appointment-info">
                  <span className="appointment-date">{a.date} at {a.time}</span>
                  <span className="appointment-details">Patient: {a.patient?.name || 'Unknown'} with Dr. {a.doctor?.name || 'Unknown'}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}