import React, { useState } from 'react';

const Login = () => {
  // Step 1: Initialize state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false); // Step 2: State for password validity

  // Step 3: Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents the form from refreshing the page

    // Step 4: Prepare form data
    const formData = {
      email: email,
      password: password
    };
    console.log(formData);
    
    // Step 5: Send POST request to backend
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login Successful:', data);
      // Handle the response from your backend (e.g., redirect or show an error message)
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Step 6: Check password length validity
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Validate if password length is at least 8 characters
    if (newPassword.length >= 8) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <div>
      <h2>Login Here</h2>
      <form className="w-75 m-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={handlePasswordChange} // Use the new password change handler
          />
          
          {/* Step 7: Conditional rendering based on password validity */}
          {!passwordValid && (
            <div className="form-text text-danger">
              Password must be at least 8 characters long.
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!passwordValid} // Disable submit button if password is invalid
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
