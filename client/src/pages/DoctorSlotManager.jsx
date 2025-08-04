import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaPlus, FaClipboardList, FaSignOutAlt, FaCog } from 'react-icons/fa';
import './DoctorSlotManager.css';

export default function DoctorSlotManager() {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const doctorId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      setError('Doctor not logged in.');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    axios.get(`/api/doctor/slots/${doctorId}`)
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading slots:', err);
        setError('Failed to load slots.');
        setLoading(false);
      });
  }, [doctorId]);

  const addSlot = () => {
    if (!date || !timeInput) {
      setError('Please enter both date and time');
      return;
    }

    setLoading(true);
    // Convert 24h time to 12h AM/PM format if your backend expects it
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
      setError(null);
      setTimeInput('');
      return axios.get(`/api/doctor/slots/${doctorId}`);
    })
    .then(res => {
      setSlots(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error adding slot:', err);
      setError('Failed to add slot. Please try again.');
      setLoading(false);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container slot-manager">
      <div className="slot-header">
        <h2 className="slot-title">
          <FaCog className="slot-title-icon" /> Manage Slots
        </h2>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '20px' }}>{error}</div>}
      
      {loading && <div className="loading-spinner"></div>}

      <div className="slot-form">
        <div className="form-group">
          <label className="form-label">
            <FaCalendarAlt className="label-icon" /> Select Date
          </label>
          <input 
            type="date" 
            className="form-input"
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FaClock className="label-icon" /> Select Time
          </label>
          <input
            type="time"
            className="form-input"
            value={timeInput}
            onChange={e => setTimeInput(e.target.value)}
          />
        </div>

        <button className="add-slot-btn" onClick={addSlot}>
          <FaPlus style={{ marginRight: '8px' }} /> Add Slot
        </button>
      </div>

      <div className="slots-section">
        <h3 className="section-title">
          <FaClipboardList className="section-icon" /> Your Available Slots
        </h3>
        
        {!loading && slots.length === 0 && !error && (
          <div className="no-slots">
            <p>No slots available. Add slots above to make yourself available for appointments.</p>
          </div>
        )}
        
        {!loading && slots.length > 0 && (
          <ul className="slots-list">
            {slots.map((slot, index) => (
              <li key={index} className="slot-item" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="slot-info">
                  <span className="slot-date">{formatDate(slot.date)}</span>
                  <div className="slot-times">
                    {(slot.times || slot.slots || []).map((time, i) => (
                      <span key={i} className="slot-time">{time}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
