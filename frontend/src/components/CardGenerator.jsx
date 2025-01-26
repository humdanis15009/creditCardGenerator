import { useState } from "react";
import axios from "axios";

function CardGenerator() {
  const [quantity, setQuantity] = useState(1);
  const [cardBrand, setCardBrand] = useState("Visa");
  const [country, setCountry] = useState("US");
  const [outputFormat, setOutputFormat] = useState("JSON");
  const [generatedCards, setGeneratedCards] = useState([]);

  const generateCards = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cards/generate",
        {
          quantity,
          cardBrand,
          country,
          outputFormat,
        }
      );
      setGeneratedCards(response.data);
    } catch (error) {
      console.error("Error generating cards:", error);
      alert("Failed to generate card details.");
    }
  };

  const getCardStyle = () => {
    switch (cardType) {
      case "Visa":
        return {
          background: "linear-gradient(135deg, #1A73E8, #4285F4)",
          color: "#FFF",
          logo: "Visa Logo",
        };
      case "MasterCard":
        return {
          background: "linear-gradient(135deg, #EB001B, #FF5F00)",
          color: "#FFF",
          logo: "MasterCard Logo",
        };
      default:
        return {
          background: "linear-gradient(135deg, #CCC, #999)",
          color: "#000",
          logo: "Generic Card",
        };
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Card Generator</h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Card Brand:</label>
        <select
          value={cardBrand}
          onChange={(e) => setCardBrand(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="American Express">American Express</option>
          <option value="Discover">Discover</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Country:</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Output Format:</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
          <option value="Text">Text</option>
        </select>
      </div>

      <button
        onClick={generateCards}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Cards
      </button>

      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {generatedCards.map((card, index) => {
          const style = getCardStyle();
          return (
            <div
              key={index}
              className="p-4 rounded shadow"
              style={{
                background: style.background,
                color: style.color,
                width: "300px",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <div className="text-lg font-semibold">{style.logo}</div>
              <div className="mt-2 font-bold">{card.name}</div>
              <div>
                <div>Number: {card.number}</div>
                <div>Expiry: {card.expiry}</div>
                <div>CVV: {card.cvv}</div>
              </div>
            </div>
          );
        })}
      </div> */}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Generated Card Details:</h2>
        {/* <pre className="p-4 border rounded bg-gray-100 overflow-auto"> */}
        {JSON.stringify(generatedCards)}
        <>
          <div className="max-w-sm mx-auto mt-6">
            {generatedCards.map((card, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    Card Number
                  </span>
                  <span className="text-gray-500 text-sm">
                    {card?.cardNumber || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    Expiry Date
                  </span>
                  <span className="text-gray-500 text-sm">
                    {card?.expiryDate || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    CVV
                  </span>
                  <span className="text-gray-500 text-sm">
                    {card?.cvv || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    Country
                  </span>
                  <span className="text-gray-500 text-sm">
                    {card?.country || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
        {/* </pre> */}
      </div>
    </div>
  );
}

export default CardGenerator;
