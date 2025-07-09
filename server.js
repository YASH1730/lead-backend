const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./database/knex');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", require('./src/routes/router'));

// Fallback route (404)
app.use((req, res) => {
  res.status(404).send("Route not found. Welcome to Leads server.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is Live now at http://localhost:${PORT}`);
});
