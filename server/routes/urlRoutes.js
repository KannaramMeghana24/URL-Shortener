const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Url = require("../models/Url");


// ===============================
// Get All URLs (Analytics)
// ===============================
router.get("/all", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ===============================
// Create Short URL
// ===============================
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortCode;

    if (customAlias) {
      const existing = await Url.findOne({ shortCode: customAlias });

      if (existing) {
        return res.status(400).json({ error: "Custom alias already taken" });
      }

      shortCode = customAlias;
    } else {
      shortCode = nanoid(6);
    }

    const newUrl = new Url({
      originalUrl,
      shortCode
    });

    await newUrl.save();

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ===============================
// Delete URL
// ===============================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Url.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ===============================
// Redirect to Original URL
// (MUST be LAST)
// ===============================
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);

  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;