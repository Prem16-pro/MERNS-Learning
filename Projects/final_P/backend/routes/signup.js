const express = require('express');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL for Signup'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const result = await client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);

   
    console.log('User inserted:', result);
    res.status(200).json({ message: 'Signup successful' });
    
  } catch (err) {
    console.error('Error during Signup:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
