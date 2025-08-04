import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaUserMd, FaCalendarCheck, FaHospital, FaSignInAlt, FaUserPlus, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="floating-circles">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        
        <h1 className="hero-title">Modern Healthcare Appointment System</h1>
        <p className="hero-subtitle">
          A seamless platform connecting patients with healthcare providers across multiple clinics.
          Book appointments, manage your schedule, and receive quality care with ease.
        </p>
        
        <div className="cta-buttons">
          <Link to="/login/patient" className="cta-button primary-button">
            <FaSignInAlt /> Patient Login
          </Link>
          <Link to="/login/doctor" className="cta-button secondary-button">
            <FaUserMd /> Doctor Login
          </Link>
          <Link to="/login/admin" className="cta-button secondary-button admin-button">
            <FaHospital /> Admin Login
          </Link>
          <Link to="/register" className="cta-button secondary-button">
            <FaUserPlus /> Register
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <FaCalendarCheck />
          </div>
          <h3 className="feature-title">Easy Appointment Booking</h3>
          <p className="feature-description">
            Book appointments with your preferred doctors at your convenience.
            Our intuitive interface makes scheduling healthcare visits simple and stress-free.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaUserMd />
          </div>
          <h3 className="feature-title">Expert Healthcare Providers</h3>
          <p className="feature-description">
            Connect with qualified healthcare professionals across various specialties.
            View doctor profiles and choose the right specialist for your needs.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaHospital />
          </div>
          <h3 className="feature-title">Multiple Clinic Network</h3>
          <p className="feature-description">
            Access healthcare services from a network of clinics in your area.
            Find the most convenient location for your appointment.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <FaHeartbeat />
          </div>
          <h3 className="feature-title">Patient-Centered Care</h3>
          <p className="feature-description">
            Experience healthcare that puts you first. Our system is designed
            to provide personalized care and improve patient outcomes.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaHeartbeat />
          </div>
          <h3 className="feature-title">Centered Care</h3>
          <p className="feature-description">
            Experience healthcare that puts you first. Our system is designed
            to provide personalized care and improve patient outcomes.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <FaShieldAlt />
          </div>
          <h3 className="feature-title">Secure & Private</h3>
          <p className="feature-description">
            Your health information is protected with industry-standard security.
            We prioritize your privacy and confidentiality at every step.
          </p>
        </div>
      </section>
      
      <footer className="footer">
        <p className="footer-text">© 2025 Healthcare Appointment System. All rights reserved.</p>
      </footer>
    </div>
  );
}