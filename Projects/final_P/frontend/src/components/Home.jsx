import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to CalendarApp</h1>
        <p>Simplify your life with our intuitive and powerful calendar service.</p>
        <Link to="/signup" className="cta-button">Get Started for Free</Link>
      </header>

      <section className="features">
        <h2>Why Choose CalendarApp?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Easy Scheduling</h3>
            <p>Create and manage events with just a few clicks. Our intuitive interface makes scheduling a breeze.</p>
          </div>
          <div className="feature-item">
            <h3>Smart Reminders</h3>
            <p>Never miss an important date again. Set up customizable reminders for all your events.</p>
          </div>
          <div className="feature-item">
            <h3>Sync Across Devices</h3>
            <p>Access your calendar from anywhere. Seamlessly sync across all your devices.</p>
          </div>
          <div className="feature-item">
            <h3>Share and Collaborate</h3>
            <p>Easily share your calendar with friends, family, or colleagues. Perfect for team coordination.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol className="steps">
          <li>Sign up for a free account</li>
          <li>Create your first event</li>
          <li>Set reminders and invite others</li>
          <li>Stay organized and never miss an important date</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          <blockquote>
            "CalendarApp has revolutionized the way I manage my time. It's simple, effective, and keeps me on track!"
            <footer>- Sarah J., Freelance Designer</footer>
          </blockquote>
          <blockquote>
            "As a busy professional, I need a reliable calendar app. This one exceeds all my expectations!"
            <footer>- Michael R., Project Manager</footer>
          </blockquote>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied users and take control of your schedule today.</p>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
    </div>
  );
};

export default Home;

