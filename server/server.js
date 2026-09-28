const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import your new routes
const employeeRoutes = require('./routes/employeeRoutes');

// Basic Test Route
app.get('/', (req, res) => {
    res.send('CorpDirectory API is running!');
});

// Mount the routes to a specific URL path
app.use('/api/employees', employeeRoutes);

// Connect to local MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB"))
    .catch((err) => console.error("❌ Database connection error:", err));

// Define the port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});