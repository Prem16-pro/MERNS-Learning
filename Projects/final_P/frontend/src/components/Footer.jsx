import React from 'react'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} CalendarApp. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
            <Link to="/privacyPolicy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
