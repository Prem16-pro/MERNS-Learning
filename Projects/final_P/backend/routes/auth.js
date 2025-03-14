const express = require('express');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

// Create PostgreSQL client (you can move this to a separate module if needed)
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL for auth'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password 1' });
    }

    const user = result.rows[0];
    
    const match = await bcrypt.compare(password, user.password);
    
    if (password != user.password) {
      return res.status(400).json({ message: 'Invalid email or password 2' });
    }

    // If the password matches, send a success response
    res.status(200).json({ message: 'Login successful', id : user.id });
 
    
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
