import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Axios instance
import { FaEnvelope, FaLock, FaSignInAlt, FaSignOutAlt, FaCheckCircle } from 'react-icons/fa';
import './LoginPage.css';

export default function LoginPage({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    // Check if user was redirected after registration
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
      setSuccessMessage('Registration successful! Please login with your credentials.');
    }
  }, []);

 const handleLogin = async (e) => {
  e?.preventDefault();
  
  // Reset error state
  setError('');
  
  // Validate inputs
  if (!email.trim()) {
    setError('Email is required');
    return;
  }
  
  if (!password) {
    setError('Password is required');
    return;
  }
  
  setLoading(true);
  
  try {
    const res = await API.post('/auth/login', {
      email,
      password,
      role
    });

    const { userId, token, role: userRole } = res.data;

    // Save to localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);

    // Navigate based on role
    if (userRole === 'patient') window.location.href = '/patient/dashboard';
    else if (userRole === 'doctor') window.location.href = '/doctor/dashboard';
    else if (userRole === 'admin') window.location.href = '/admin/dashboard';
  } catch (err) {
    setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2 className="auth-title">{role} Login</h2>
        <p className="auth-subtitle">Welcome back! Please enter your credentials to continue</p>
        
        {successMessage && (
          <div className="auth-success">
            <FaCheckCircle style={{ marginRight: '8px' }} />
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              className="auth-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          <div className="input-group">
            <FaLock className="icon" />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
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
                <FaSignInAlt style={{ marginRight: '8px' }} /> Login
              </>
            )}
          </button>
        </form>
        
        <button 
          className="auth-button secondary-button" 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            window.location.href = '/';
          }}
          disabled={loading}
        >
          <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
        </button>
        
        <div className="auth-footer">
          Don't have an account? <a href="/register" className="auth-link">Register here</a>
        </div>
      </div>
    </div>
  );
}
