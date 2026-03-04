const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

// Get all URLs
router.get("/all", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create short URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    let shortCode = customAlias || nanoid(6);

    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) return res.status(404).send("URL not found");

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;