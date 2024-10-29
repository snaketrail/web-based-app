const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files and parse JSON
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json()); // for parsing application/json


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
