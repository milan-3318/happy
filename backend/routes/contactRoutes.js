const express = require("express");
const Contact = require("../models/contact");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
