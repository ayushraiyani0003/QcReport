const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Default root route
app.get("/", (req, res) => {
    res.send("Welcome to the API server!");
});

// Example placeholder route
app.get("/api/example", (req, res) => {
    res.json({ message: "This is an example endpoint" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
