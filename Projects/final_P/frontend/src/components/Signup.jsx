import React, { useState } from "react";
import '../styles/Login.css'
const Signup = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  function handleLogin(event) {
    event.preventDefault();

    // Reset error messages
    document.querySelectorAll(".error-message").forEach((elem) => {
      elem.style.display = "none";
    });

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic validation
    let isValid = true;

    // Email validation
    if (!isValidEmail(email)) {
      showError("emailError", "Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters long");
      isValid = false;
    }

    if (isValid) {
      // Here you would typically send the data to your server
      console.log("Login attempt:", { email, password });
      alert("Login successful! (This is just a demo)");

      // Clear the form
      document.getElementById("loginForm").reset();
    }

    return false;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful login
      alert('SignUp successful!');
    } else {
      // Handle error response
      setErrorMessage(data.message);
    }

  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <h1>Register Here</h1>
          <p>Please enter your credentials to Register</p>
        </div>
        <form
          className="login-form"
          id="loginForm"
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <span className="error-message" id="emailError"></span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error-message" id="passwordError"></span>
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <div className="additional-options">
          <a
            href="#"
          >
            Forgot Password?
          </a>
          <br />
          <br />
          <span>Already have an account? </span>
          <a
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
