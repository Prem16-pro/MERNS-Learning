const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the auth routes
const authRoutes = require('./routes/auth.js');
const signRoutes = require('./routes/signup.js');
const taskAddRoutes = require('./routes/taskAdd');
const taskDeleteRoutes = require('./routes/taskDelete');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Use the auth routes for handling login
app.use('/api',taskDeleteRoutes);
app.use('/api', authRoutes);
app.use('/api', signRoutes);
app.use('/api', taskAddRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
