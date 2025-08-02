import React, { useState } from 'react';
import API from '../services/api'; // Axios instance

export default function LoginPage({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async () => {
  try {
    const res = await API.post('/auth/login', {
      email,
      password,
      role
    });

    const { userId, token, role: userRole } = res.data;

    // ✅ Save to localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);

    alert('Login successful');

    // Navigate based on role
    if (userRole === 'patient') window.location.href = '/patient/dashboard';
    else if (userRole === 'doctor') window.location.href = '/doctor/dashboard';
    else if (userRole === 'admin') window.location.href = '/admin/dashboard';
  } catch (err) {
    alert(err.response?.data?.error || 'Login failed');
  }
};



  return (
    <div className="container">
      <h2 className="title">{role} Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => {
  localStorage.removeItem('token');
  window.location.href = '/';
}}>
  Logout
</button>

    </div>
  );
}
