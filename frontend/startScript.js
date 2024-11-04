// startScript.js

// Login functionality
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get username and password values
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Create a payload for the POST request
    const payload = { username, password };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Handle server response
        if (response.ok) {
            const data = await response.json();
            alert(`Welcome, ${data.username}!`);
            window.location.href = 'new-index.html'; // Redirecting to the new page
        } else {
            const error = await response.json();
            console.error('Login error:', error); // Logging error details
            document.getElementById('error').textContent = error.message;
        }
    } catch (err) {
        console.error('Error during login:', err);
        document.getElementById('error').textContent = 'An error occurred. Please try again.';
    }
});
// Registration functionality
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get username and password values
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    // Create a payload for the POST request
    const payload = { username, password }; // Leaving email empty for now

    try {
        const response = await fetch('/api/users', { // Ensure this is the correct route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Handle server response
        if (response.ok) {
            const data = await response.json();
            alert(`Registration successful! Welcome, ${data.username}!`);
            // Optionally redirect to login page or auto-login
        } else {
            const error = await response.json();
            console.error('Registration error:', error); // Logging error details
            document.getElementById('registerError').textContent = error.message;
        }
    } catch (err) {
        console.error('Error during registration:', err);
        document.getElementById('registerError').textContent = 'An error occurred. Please try again.';
    }
});
