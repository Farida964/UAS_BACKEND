// Import Express JS
const express = require("express");
const router = require("./routes");

// Create an Express JS instance
const app = express();

// Middleware to parse the request body
app.use(express.json());
app.use(router);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
