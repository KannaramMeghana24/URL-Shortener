const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Url = require("../models/Url");


// ✅ Get All URLs (Analytics)
router.get("/all", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Create Short URL (Custom Alias Support)
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl.startsWith("http://") &&
        !originalUrl.startsWith("https://")) {
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


// 🗑️ Delete URL (MUST be above redirect route)
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Url.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Redirect Route (Keep this LAST)
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json("URL not found");
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);

  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;