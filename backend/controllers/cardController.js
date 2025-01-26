const { generateCardNumber } = require("../utils/luhn");

const generateCardDetails = (req, res) => {
  const { cardBrand, country, outputFormat, quantity } = req.body;

  // Validate input
  if (!cardBrand || !country || !outputFormat || !quantity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number." });
  }

  // Generate multiple card details
  const cardDetailsArray = [];
  for (let i = 0; i < quantity; i++) {
    const cardNumber = generateCardNumber(cardBrand); // Uses Luhn logic
    const expiryDate = generateExpiryDate(); // Random expiry date
    const cvv = generateCVV(cardBrand); // Random CVV based on brand

    cardDetailsArray.push({ cardNumber, expiryDate, cvv, country });
  }

  // Format response
  if (outputFormat === "JSON") {
    res.json(cardDetailsArray); // Responds in JSON format
  } else if (outputFormat === "CSV") {
    const csvData = cardDetailsArray
      .map(
        ({ cardNumber, expiryDate, cvv, country }) =>
          `${cardNumber}, ${expiryDate}, ${cvv}, ${country}`
      )
      .join("\n");

    res.send(`Card Number, Expiry Date, CVV, Country\n${csvData}`);
  } else if (outputFormat === "Text") {
    const textData = cardDetailsArray
      .map(
        ({ cardNumber, expiryDate, cvv, country }) =>
          `Card Details:\nCard Number: ${cardNumber}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}\nCountry: ${country}`
      )
      .join("\n\n");

    res.send(textData);
  } else {
    res.status(400).json({ error: "Invalid output format." });
  }
};

// Generate random expiry date
const generateExpiryDate = () => {
  const currentYear = new Date().getFullYear();
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const year = String(currentYear + Math.floor(Math.random() * 5));
  return `${month}/${year}`;
};

// Generate random CVV
const generateCVV = (cardBrand) => {
  const length = cardBrand === "American Express" ? 4 : 3;
  return String(Math.floor(Math.random() * Math.pow(10, length))).padStart(
    length,
    "0"
  );
};

module.exports = { generateCardDetails };
