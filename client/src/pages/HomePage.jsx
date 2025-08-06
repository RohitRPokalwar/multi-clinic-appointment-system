import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import {
    FaUserMd,
    FaCalendarCheck,
    FaHospital,
    FaSignInAlt,
    FaUserPlus,
    FaHeartbeat,
    FaShieldAlt,
    FaSearch,
    FaCalendarAlt
} from 'react-icons/fa';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon">
          <FaHeartbeat />
        </div>
        <p className="loading-text">Initializing ...</p>
      </div>
    );
  }

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
          <Link to="/login/patient" className="cta-button">
            <FaSignInAlt /> Patient Login
          </Link>
          <Link to="/login/doctor" className="admin-button">
            <FaUserMd /> Doctor Login
          </Link>
          <Link to="/login/admin" className="glass-button">
            <FaHospital /> Admin Login
          </Link>
          <Link to="/register" className="cyber-button">
            <FaUserPlus /> Register
          </Link>
        </div>
      </section>

      {/* ====================================================
          MOVED "How It Works" Section to be after the Hero
          ==================================================== */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Get started in three simple steps.</p>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon"><FaUserPlus /></div>
            <h3 className="step-title">Register & Create Profile</h3>
            <p className="step-description">
              Sign up quickly and create your secure patient profile. Your health journey begins here.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon"><FaSearch /></div>
            <h3 className="step-title">Find Your Doctor</h3>
            <p className="step-description">
              Search our network of verified specialists and clinics. Filter by location, specialty, and availability.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon"><FaCalendarAlt /></div>
            <h3 className="step-title">Book & Confirm</h3>
            <p className="step-description">
              Select a suitable time slot and book your appointment instantly. Get reminders and manage your schedule with ease.
            </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <p className="section-subtitle">
          Experience the future of healthcare with our cutting-edge appointment system
        </p>
        
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
            <FaShieldAlt />
          </div>
          <h3 className="feature-title">Secure & Private</h3>
          <p className="feature-description">
            Your health information is protected with industry-standard security.
            We prioritize your privacy and confidentiality at every step.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <FaCalendarCheck />
          </div>
          <h3 className="feature-title">Smart Scheduling</h3>
          <p className="feature-description">
            AI-powered scheduling that learns your preferences and suggests
            optimal appointment times based on your availability and doctor schedules.
          </p>
        </div>
      </section>
      
      <footer className="footer">
        <p className="footer-text">© 2025 Healthcare Appointment System. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}