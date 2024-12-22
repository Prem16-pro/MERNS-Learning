require('dotenv').config(); // Load .env variables
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


const app = express();

// Use body-parser to parse JSON data
app.use(bodyParser.json());


const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'htmlForm.html'));
});

app.post('/', async (req, res) => {
    const { name, prn } = req.body;
  
    // Validate the input
    if (!name || !prn) {
      return res.status(400).send('Name and prn are required');
    }
  
    try {
      // Insert data into the users table
      const query = 'INSERT INTO htmlform (s_name,s_prn) VALUES ($1, $2) RETURNING *';
      const values = [name, prn];
  
      const result = await pool.query(query, values);
  
      // Send the ID of the new user as a response
      res.status(200).send(`Data submitted successfully! User ID: ${result.rows[0].id}`);
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
