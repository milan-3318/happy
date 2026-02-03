const express = require("express");
const router = express.Router();
const Suggestion = require("../models/Suggestion");

/* POST suggestion */
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newSuggestion = new Suggestion({
      name,
      email,
      message
    });

    await newSuggestion.save();
    res.status(201).json({ message: "Suggestion saved" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* GET all suggestions (admin use later) */
router.get("/", async (req, res) => {
  const suggestions = await Suggestion.find().sort({ createdAt: -1 });
  res.json(suggestions);
});

module.exports = router;
