const express = require("express");
const { generateCardDetails } = require("../controllers/cardController");

const router = express.Router();

// POST: Generate card details
router.post("/generate", generateCardDetails);

module.exports = router;
