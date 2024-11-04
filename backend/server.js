const express = require('express');
const path = require('path');
const db = require('./config/db'); // Keeping this for the connection log
const carRoutes = require('./routes/carRoutes');
const contractRoutes = require('./routes/contractRoutes'); // Ensure this is included
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 3000; // Use the environment variable PORT or default to 3000

// Middleware to serve static files and parse JSON
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// Use routes
app.use('/api/cars', carRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Changed message to reflect the new PORT usage
});


