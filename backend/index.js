const express = require("express");
const bodyParser = require("body-parser");
const cardRoutes = require("./routes/cardRoutes");
const cors =require ("cors")
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Parse incoming JSON requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use("/api/cards", cardRoutes); // Route API requests to cardRoutes

// Serve static files (Frontend)
app.use(express.static("frontend")); // Serves the frontend from 'frontend' folder

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
