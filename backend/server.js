const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files and parse JSON
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json()); // for parsing application/json

// ================== CAR ENDPOINTS ==================

// Endpoint to get all cars from testBase.json
app.get('/api/cars', (req, res) => {
    fs.readFile('testBase.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to get a single car by number
app.get('/api/cars/:number', (req, res) => {
    fs.readFile('testBase.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const cars = JSON.parse(data);
        const car = cars.find(car => car.number === req.params.number);
        if (car) {
            res.json(car);
        } else {
            res.status(404).send('Car not found');
        }
    });
});

// Endpoint to create a new car
app.post('/api/cars', (req, res) => {
    fs.readFile('testBase.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');
        
        const cars = JSON.parse(data);
        const newCar = req.body;

        // Optional: Check if the car number already exists
        if (cars.find(car => car.number === newCar.number)) {
            return res.status(400).send('Car number already exists');
        }

        cars.push(newCar); // Add new car to the list

        fs.writeFile('testBase.json', JSON.stringify(cars, null, 2), (err) => {
            if (err) return res.status(500).send('Error writing data');
            res.status(201).json(newCar); // Respond with the created car
        });
    });
});

// Endpoint to update a car
app.put('/api/cars/:number', (req, res) => {
    fs.readFile('testBase.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');

        const cars = JSON.parse(data);
        const carIndex = cars.findIndex(car => car.number === req.params.number);
        
        if (carIndex !== -1) {
            cars[carIndex] = { ...cars[carIndex], ...req.body }; // Update the car details
            
            fs.writeFile('testBase.json', JSON.stringify(cars, null, 2), (err) => {
                if (err) return res.status(500).send('Error writing data');
                res.json(cars[carIndex]); // Respond with the updated car
            });
        } else {
            res.status(404).send('Car not found');
        }
    });
});

// Endpoint to delete a car
app.delete('/api/cars/:number', (req, res) => {
    fs.readFile('testBase.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');

        const cars = JSON.parse(data);
        const updatedCars = cars.filter(car => car.number !== req.params.number);
        
        if (cars.length === updatedCars.length) {
            return res.status(404).send('Car not found');
        }

        fs.writeFile('testBase.json', JSON.stringify(updatedCars, null, 2), (err) => {
            if (err) return res.status(500).send('Error writing data');
            res.status(204).send(); // Respond with no content
        });
    });
});

// ================== CLIENT ENDPOINTS ==================

// Endpoint to get all clients from testBase1.json
app.get('/api/clients', (req, res) => {
    fs.readFile('testBase1.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to create a new client
app.post('/api/clients', (req, res) => {
    fs.readFile('testBase1.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');
        
        const clients = JSON.parse(data);
        const newClient = req.body;

        // Validate required fields
        if (!newClient.id || !newClient.name || !newClient.email) {
            return res.status(400).send('Missing required fields');
        }

        // Ensure id is a string
        newClient.id = String(newClient.id);
        
        clients.push(newClient); // Add new client to the list

        fs.writeFile('testBase1.json', JSON.stringify(clients, null, 2), (err) => {
            if (err) return res.status(500).send('Error writing data');
            res.status(201).json(newClient); // Respond with the created client
        });
    });
});

// Endpoint to update a client
app.put('/api/clients/:id', (req, res) => {
    fs.readFile('testBase1.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');

        const clients = JSON.parse(data);
        const clientIndex = clients.findIndex(client => client.id === req.params.id);
        
        if (clientIndex !== -1) {
            const updatedClient = { ...clients[clientIndex], ...req.body };

            // Validate required fields
            if (!updatedClient.name || !updatedClient.email) {
                return res.status(400).send('Missing required fields');
            }

            clients[clientIndex] = updatedClient; // Update the client details
            
            fs.writeFile('testBase1.json', JSON.stringify(clients, null, 2), (err) => {
                if (err) return res.status(500).send('Error writing data');
                res.json(clients[clientIndex]); // Respond with the updated client
            });
        } else {
            res.status(404).send('Client not found');
        }
    });
});

// Endpoint to delete a client
app.delete('/api/clients/:id', (req, res) => {
    fs.readFile('testBase1.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');

        const clients = JSON.parse(data);
        const updatedClients = clients.filter(client => client.id !== req.params.id);
        
        if (clients.length === updatedClients.length) {
            return res.status(404).send('Client not found');
        }

        fs.writeFile('testBase1.json', JSON.stringify(updatedClients, null, 2), (err) => {
            if (err) return res.status(500).send('Error writing data');
            res.status(204).send(); // Respond with no content
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
