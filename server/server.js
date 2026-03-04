const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==============================
// CORS Configuration (IMPORTANT)
// ==============================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://url-shortener-kappa-smoky.vercel.app" // Vercel frontend
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// ==============================
// Health Route
// ==============================
app.get("/", (req, res) => {
  res.send("URL Shortener Backend is running 🚀");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("API routes working");
});

// ==============================
// Routes
// ==============================
const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

// ==============================
// MongoDB Connection + Server
// ==============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));