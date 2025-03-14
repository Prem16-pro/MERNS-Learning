const express = require('express');
const { Client } = require('pg');  // Import the PostgreSQL client
const app = express();


const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL for taskadd');
});

const router = express.Router();

router.post('/taskadd', (req, res) => {
  const { id, taskDateKey, taskDescription } = req.body;

  if (!id || !taskDateKey || !taskDescription) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO tasks (id, taskDateKey, taskDescription)
    VALUES ($1, $2, $3) RETURNING task_id;
  `;

  client.query(query, [id, taskDateKey, taskDescription], (err, result) => {
    if (err) {
      console.error('Error inserting task:', err.stack);
      return res.status(500).json({ success: false, error: 'Database error' });
    }

    const taskId = result.rows[0].task_id;
    res.status(200).json({ success: true, taskId });
  });
});

module.exports = router;