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
  console.log('Connected to PostgreSQL for taskdelete');
});

const router = express.Router();

router.post('/taskdelete', (req, res) => {
  const { id, taskDateKey , taskDescription} = req.body;

  const query = `
DELETE FROM tasks WHERE id = $1 and taskDateKey = $2  and taskDescription = $3;
  `;

  client.query(query, [id, taskDateKey, taskDescription], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err.stack);
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    else{
        return res.send({success:true})
    }

  });
});

module.exports = router;