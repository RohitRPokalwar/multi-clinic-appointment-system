// === AdminDashboard.jsx ===
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaPlus, FaHospital, FaUserMd, FaCalendarAlt, FaFilter, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [clinicForm, setClinicForm] = useState({ name: '', address: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', password: '', clinicId: '', speciality: '' });
  const [selectedClinic, setSelectedClinic] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [editingClinic, setEditingClinic] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);

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
  const { name, email, password, clinicId, speciality } = doctorForm;
  console.log('Adding doctor with form data:', doctorForm);

  if (!name || !email || !password || !clinicId) {
    alert('Please fill all fields');
    return;
  }

  try {
    console.log('Sending doctor to server:', { name, email, clinicId, speciality });
    const response = await API.post('/admin/doctors', {
      name,
      email,
      password,
      clinicId: clinicId,
      speciality: speciality
    });
    
    console.log('Server response for doctor creation:', response.data);
    alert('Doctor registered!');
    
    // Reset form
    setDoctorForm({ name: '', email: '', password: '', clinicId: '', speciality: '' });
    
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

  // Delete functions
  const deleteClinic = async (clinicId) => {
    if (window.confirm('Are you sure you want to delete this clinic? This will also remove all associated doctors.')) {
      try {
        await API.delete(`/admin/clinics/${clinicId}`);
        alert('Clinic deleted successfully');
        const clinicsResponse = await API.get('/admin/clinics');
        setClinics(clinicsResponse.data);
        // Refresh doctors list
        const doctorsResponse = await API.get('/admin/doctors');
        setDoctors(doctorsResponse.data);
      } catch (err) {
        console.error('Error deleting clinic:', err);
        alert('Failed to delete clinic');
      }
    }
  };

  const deleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await API.delete(`/admin/doctors/${doctorId}`);
        alert('Doctor deleted successfully');
        // Refresh the doctor list based on current filter
        if (selectedClinic) {
          const response = await API.get(`/admin/clinics/${selectedClinic}/doctors`);
          setDoctors(response.data);
        } else {
          const response = await API.get('/admin/doctors');
          setDoctors(response.data);
        }
      } catch (err) {
        console.error('Error deleting doctor:', err);
        alert('Failed to delete doctor');
      }
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await API.delete(`/admin/appointments/${appointmentId}`);
        alert('Appointment deleted successfully');
        const appointmentsResponse = await API.get('/admin/appointments');
        setAppointments(appointmentsResponse.data);
      } catch (err) {
        console.error('Error deleting appointment:', err);
        alert('Failed to delete appointment');
      }
    }
  };

  // Edit functions
  const updateClinic = async (clinicId, updatedData) => {
    try {
      console.log('Updating clinic with data:', updatedData);
      const { name, address } = updatedData;
      await API.put(`/admin/clinics/${clinicId}`, { name, address });
      alert('Clinic updated successfully');
      setEditingClinic(null);
      const clinicsResponse = await API.get('/admin/clinics');
      setClinics(clinicsResponse.data);
    } catch (err) {
      console.error('Error updating clinic:', err);
      alert('Failed to update clinic');
    }
  };

  const updateDoctor = async (doctorId, updatedData) => {
    try {
      console.log('Updating doctor with data:', updatedData);
      const { name, email, speciality } = updatedData;
      await API.put(`/admin/doctors/${doctorId}`, { name, email, speciality });
      alert('Doctor updated successfully');
      setEditingDoctor(null);
      // Refresh the doctor list based on current filter
      if (selectedClinic) {
        const response = await API.get(`/admin/clinics/${selectedClinic}/doctors`);
        setDoctors(response.data);
      } else {
        const response = await API.get('/admin/doctors');
        setDoctors(response.data);
      }
    } catch (err) {
      console.error('Error updating doctor:', err);
      alert('Failed to update doctor');
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
      
      {/* Desktop Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaHospital /> Overview
        </button>
        <button 
          className={`admin-tab ${activeTab === 'clinics' ? 'active' : ''}`}
          onClick={() => setActiveTab('clinics')}
        >
          <FaHospital /> Manage Clinics
        </button>
        <button 
          className={`admin-tab ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          <FaUserMd /> Manage Doctors
        </button>
        <button 
          className={`admin-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <FaCalendarAlt /> Manage Appointments
        </button>
      </div>
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="admin-overview">
          <div className="overview-stats">
            <div className="stat-card">
              <FaHospital className="stat-icon" />
              <div className="stat-info">
                <h3>{clinics.length}</h3>
                <p>Total Clinics</p>
              </div>
            </div>
            <div className="stat-card">
              <FaUserMd className="stat-icon" />
              <div className="stat-info">
                <h3>{doctors.length}</h3>
                <p>Total Doctors</p>
              </div>
            </div>
            <div className="stat-card">
              <FaCalendarAlt className="stat-icon" />
              <div className="stat-info">
                <h3>{appointments.length}</h3>
                <p>Total Appointments</p>
              </div>
            </div>
          </div>
          
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="admin-button" onClick={() => setActiveTab('clinics')}>
                <FaPlus /> Add Clinic
              </button>
              <button className="admin-button" onClick={() => setActiveTab('doctors')}>
                <FaPlus /> Add Doctor
              </button>
              <button className="admin-button" onClick={() => setActiveTab('appointments')}>
                <FaCalendarAlt /> View Appointments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clinics Management Tab */}
      {activeTab === 'clinics' && (
        <div className="admin-content">
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
            <h3 className="admin-section-title"><FaHospital /> All Clinics</h3>
            <div className="admin-list">
              {clinics.map(clinic => (
                <div key={clinic._id} className="admin-list-item">
                  {editingClinic === clinic._id ? (
                    <div className="edit-form">
                      <input 
                        className="admin-input"
                        defaultValue={clinic.name}
                        onBlur={(e) => {
                          const newName = e.target.value;
                          if (newName !== clinic.name) {
                            updateClinic(clinic._id, { name: newName, address: clinic.address });
                          } else {
                            setEditingClinic(null);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const newName = e.target.value;
                            updateClinic(clinic._id, { name: newName, address: clinic.address });
                          }
                        }}
                        autoFocus
                      />
                      <input 
                        className="admin-input"
                        defaultValue={clinic.address}
                        onBlur={(e) => {
                          const newAddress = e.target.value;
                          if (newAddress !== clinic.address) {
                            updateClinic(clinic._id, { name: clinic.name, address: newAddress });
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const newAddress = e.target.value;
                            updateClinic(clinic._id, { name: clinic.name, address: newAddress });
                          }
                        }}
                      />
                      <button 
                        className="admin-button-secondary"
                        onClick={() => setEditingClinic(null)}
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="item-content">
                        <strong>{clinic.name}</strong>
                        <span>{clinic.address}</span>
                      </div>
                      <div className="item-actions">
                        <button 
                          className="admin-button-secondary"
                          onClick={() => setEditingClinic(clinic._id)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button 
                          className="admin-button admin-button-danger"
                          onClick={() => deleteClinic(clinic._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Doctors Management Tab */}
      {activeTab === 'doctors' && (
        <div className="admin-content">
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
              <div>
                <input 
                  className="admin-input"
                  placeholder="Speciality (e.g. Dermatology)" 
                  value={doctorForm.speciality}
                  onChange={e => setDoctorForm({ ...doctorForm, speciality: e.target.value })} 
                />
              </div>
              <div className="admin-form-full">
                <button className="admin-button" onClick={addDoctor}>
                  <FaPlus /> Add Doctor
                </button>
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h3 className="admin-section-title"><FaUserMd /> All Doctors</h3>
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
                    {editingDoctor === doctor._id ? (
                      <div className="edit-form">
                        <input 
                          className="admin-input"
                          defaultValue={doctor.name}
                          onBlur={(e) => {
                            const newName = e.target.value;
                            if (newName !== doctor.name) {
                              updateDoctor(doctor._id, { name: newName, email: doctor.email, speciality: doctor.speciality || '' });
                            } else {
                              setEditingDoctor(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const newName = e.target.value;
                              updateDoctor(doctor._id, { name: newName, email: doctor.email, speciality: doctor.speciality || '' });
                            }
                          }}
                          autoFocus
                        />
                        <input 
                          className="admin-input"
                          defaultValue={doctor.email}
                          onBlur={(e) => {
                            const newEmail = e.target.value;
                            if (newEmail !== doctor.email) {
                              updateDoctor(doctor._id, { name: doctor.name, email: newEmail, speciality: doctor.speciality || '' });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const newEmail = e.target.value;
                              updateDoctor(doctor._id, { name: doctor.name, email: newEmail, speciality: doctor.speciality || '' });
                            }
                          }}
                        />
                        <input 
                          className="admin-input"
                          placeholder="Speciality"
                          defaultValue={doctor.speciality || ''}
                          onBlur={(e) => {
                            const newSpeciality = e.target.value;
                            if (newSpeciality !== doctor.speciality) {
                              updateDoctor(doctor._id, { name: doctor.name, email: doctor.email, speciality: newSpeciality });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const newSpeciality = e.target.value;
                              updateDoctor(doctor._id, { name: doctor.name, email: doctor.email, speciality: newSpeciality });
                            }
                          }}
                        />
                        <button 
                          className="admin-button-secondary"
                          onClick={() => setEditingDoctor(null)}
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="doctor-avatar"><FaUserMd /></div>
                        <h3>{doctor.name}</h3>
                        <p>Email: {doctor.email}</p>
                        <p>Clinic: {doctor.clinic?.name || 'Not assigned'}</p>
                        <p>Speciality: {doctor.speciality || 'Not specified'}</p>
                        <div className="doctor-actions">
                          <button 
                            className="admin-button-secondary"
                            onClick={() => setEditingDoctor(doctor._id)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button 
                            className="admin-button admin-button-danger"
                            onClick={() => deleteDoctor(doctor._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Appointments Management Tab */}
      {activeTab === 'appointments' && (
        <div className="admin-content">
          <div className="admin-section">
            <h3 className="admin-section-title"><FaCalendarAlt /> All Appointments</h3>
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              <div className="appointment-list">
                {appointments.map((appointment, i) => (
                  <div key={appointment._id || i} className="appointment-item">
                    <div className="appointment-info">
                      <span className="appointment-date">{appointment.date} at {appointment.time}</span>
                      <span className="appointment-details">
                        Patient: {appointment.patient?.name || 'Unknown'} with Dr. {appointment.doctor?.name || 'Unknown'}
                      </span>
                      <span className="appointment-clinic">
                        Clinic: {appointment.clinic?.name || 'Unknown'}
                      </span>
                    </div>
                    <div className="appointment-actions">
                      <button 
                        className="admin-button admin-button-danger"
                        onClick={() => deleteAppointment(appointment._id)}
                      >
                        <FaTrash /> Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}