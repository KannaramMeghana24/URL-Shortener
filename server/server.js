const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ============================
// Middleware
// ============================
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ============================
// Health Check Route
// ============================
app.get("/", (req, res) => {
  res.send("URL Shortener Backend is running 🚀");
});

// ============================
// API Routes
// ============================
// You can access routes using:
// /all
// /shorten
// /delete/:id
// /:shortCode
app.use("/", require("./routes/urlRoutes"));

// OPTIONAL: If you want /api/all etc.
// app.use("/api", require("./routes/urlRoutes"));


// ============================
// Start Server + MongoDB
// ============================
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is missing in environment variables");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
    process.exit(1);
  }
};

startServer();