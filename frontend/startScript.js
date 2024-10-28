document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "admin";

    // Validate credentials
    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
        // Redirect to loggedin.html
        window.location.href = "new-index.html"; // Replace with your actual file path
    } else {
        document.getElementById("error").innerText = "Invalid username or password.";
    }
});
