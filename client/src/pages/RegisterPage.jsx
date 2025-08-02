import React, { useState } from 'react';
import API from '../services/api'; // Using the same API instance as LoginPage
import { FaUser, FaEnvelope, FaLock, FaUserMd, FaUserCheck } from 'react-icons/fa';
import './LoginPage.css'; // Reusing the same CSS file for consistency

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e?.preventDefault();
  
  // Reset error state
  setError('');
  
  // Validate inputs
  if (!form.name.trim()) {
    setError('Name is required');
    return;
  }
  
  if (!form.email.trim()) {
    setError('Email is required');
    return;
  }
  
  if (!form.password) {
    setError('Password is required');
    return;
  }
  
  if (form.password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }
  
  setLoading(true);
  
  try {
    await API.post('/auth/register', form);
    // Redirect to login page with success message
    window.location.href = `/login/${form.role}?registered=true`;
  } catch (err) {
    setError(err?.response?.data?.error || 'Registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join our healthcare platform today</p>
        
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input 
              className="auth-input"
              placeholder="Full Name" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              disabled={loading}
              required
            />
          </div>
          
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input 
              className="auth-input"
              placeholder="Email Address" 
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              disabled={loading}
              required
            />
          </div>
          
          <div className="input-group">
            <FaLock className="icon" />
            <input 
              className="auth-input"
              placeholder="Password" 
              type="password" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              disabled={loading}
              required
              minLength="6"
            />
          </div>
          
          <div className="input-group">
            <FaUserMd className="icon" />
            <select 
              className="auth-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              disabled={loading}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <FaUserCheck style={{ marginRight: '8px' }} /> Create Account
              </>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <a href="/login/patient" className="auth-link">Login here</a>
        </div>
      </div>
    </div>
  );
}
