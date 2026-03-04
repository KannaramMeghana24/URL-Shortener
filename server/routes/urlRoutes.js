const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

// ============================
// Get all URLs (Analytics)
// ============================
router.get("/all", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// ============================
// Create Short URL
// ============================
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    // Validate URL
    if (!originalUrl.startsWith("http://") &&
        !originalUrl.startsWith("https://")) {
      return res.status(400).json({
        error: "Invalid URL format"
      });
    }

    let shortCode;

    // If custom alias exists
    if (customAlias) {

      const existing = await Url.findOne({ shortCode: customAlias });

      if (existing) {
        return res.status(400).json({
          error: "Custom alias already taken"
        });
      }

      shortCode = customAlias;

    } else {
      shortCode = nanoid(6);
    }

    // Save URL
    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });

    // Auto-detect backend URL (important for deployment)
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.json({
      shortUrl: `${baseUrl}/${shortCode}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
});


// ============================
// Delete URL
// ============================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Url.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// ============================
// Redirect to original URL
// ============================
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;