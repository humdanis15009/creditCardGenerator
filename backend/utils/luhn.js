// Generate a card number using the Luhn Algorithm
const generateCardNumber = (cardBrand) => {
  let prefix;
  switch (cardBrand) {
    case "Visa":
      prefix = "4";
      break;
    case "MasterCard":
      prefix = "5";
      break;
    case "American Express":
      prefix = "34";
      break;
    case "Discover":
      prefix = "6011";
      break;
    default:
      prefix = "4"; // Default to Visa
  }

  let number = prefix + Math.random().toString().slice(2, 15); // Generate random digits
  return number + calculateLuhnCheckDigit(number);
};

// Calculate Luhn check digit
const calculateLuhnCheckDigit = (number) => {
  const digits = number.split("").map(Number);
  const sum = digits
    .reverse()
    .map((digit, index) => (index % 2 === 0 ? digit * 2 : digit))
    .map((digit) => (digit > 9 ? digit - 9 : digit))
    .reduce((acc, digit) => acc + digit, 0);

  return (10 - (sum % 10)) % 10; // Returns the check digit
};

module.exports = { generateCardNumber };
