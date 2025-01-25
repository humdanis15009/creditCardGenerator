import { useState } from "react";

function CardGenerator() {
  const [quantity, setQuantity] = useState(1);
  const [cardType, setCardType] = useState("Visa");
  const [mockCards, setMockCards] = useState([]);

  // Function to generate cards
  const generateCards = () => {
    const newCards = Array(quantity)
      .fill(null)
      .map((_, i) => ({
        number: "4" + Math.random().toString().slice(2, 18).padEnd(16, "0"),
        name: ["IRFAN HUSSAIN", "HUMD ANIS", "ZAFAR BEG", "ADNAN AHMAD"][i % 4],
        expiry: `${String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        )}/${Math.floor(Math.random() * 5) + 24}`,
        cvv: Math.floor(Math.random() * 900 + 100).toString(),
      }));
    setMockCards(newCards);
  };

  // Dynamic logo and color based on cardType
  const getCardDetails = (type) => {
    switch (type) {
      case "Visa":
        return {
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Visa_Logo.png",
          color: "#1E88E5",
        };
      case "Mastercard":
        return {
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/MasterCard_logo.png",
          color: "#FF5F00",
        };
      case "American Express":
        return {
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/American_Express_logo.png",
          color: "#34B7F1",
        };
      case "Capital One":
        return {
          logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Capital_One_logo.svg",
          color: "#D50032",
        };
      case "Citi":
        return {
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Citibank.svg",
          color: "#0066CC",
        };
      case "Bank of America":
        return {
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Bank_of_America_logo.svg",
          color: "#003B5C",
        };
      default:
        return { logo: "", color: "#1E88E5" };
    }
  };

  const { logo, color } = getCardDetails(cardType);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-center font-bold mb-2">
          Credit Card Generator
        </h1>
        <p className="text-gray-600">
          Humd&apos; <span className="font-medium">credit card generator</span>{" "}
          is an efficient tool for generating dummy credit card numbers for
          testing needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div>
          <label className="block text-sm mb-2">Card Type</label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="w-full p-2 border rounded-md bg-white"
          >
            <option>Visa</option>
            <option>Mastercard</option>
            <option>American Express</option>
            <option>Capital One</option>
            <option>Citi</option>
            <option>Bank of America</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max="10"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <button
        onClick={generateCards}
        className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50 mb-8"
      >
        Generate
      </button>

      <div className="bg-white rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Results</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockCards.map((card, i) => (
            <div
              key={i}
              className={`aspect-[1.6/1] rounded-xl p-4 flex flex-col justify-between bg-[${color}]`}
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-8 bg-[#FFC107] rounded" />
                <img
                  src={logo}
                  alt={cardType}
                  className="h-6 brightness-0 invert"
                />
              </div>
              <div className="font-mono text-white text-lg tracking-wider">
                {card.number.match(/.{1,4}/g)?.join(" ")}
              </div>
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <div className="text-xs opacity-70 mb-1">Card Holder</div>
                  <div className="font-mono">{card.name}</div>
                </div>
                <div className="text-white">
                  <div className="text-xs opacity-70 mb-1">Expires</div>
                  <div className="font-mono">{card.expiry}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardGenerator;
