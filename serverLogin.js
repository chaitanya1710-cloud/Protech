const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Login endpoint
app.post('/api/login', (req, res) => {
  const { studentId } = req.body;
  if (!studentId || studentId.trim().length < 5) {
    return res.status(400).json({ error: "ID must be at least 5 characters." });
  }
  // (Here you could add real authentication against a database)
  return res.json({ message: "Login successful!" });
});

// Fallback to index.html for any other route (optional SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`DormQ backend listening on http://localhost:${PORT}`);
});
