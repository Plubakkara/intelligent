import { useState } from "react";
import axios from "axios";
import "../styles.css"; // ✅ ใช้สไตล์จาก styles.css

export default function HousePricePredictor() {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    const areaValue = parseFloat(formData.area);
    if (!areaValue || isNaN(areaValue) || areaValue <= 0) {
      setError("Please enter a valid area in square meters.");
      return;
    }

    try {
      const requestData = { ...formData, area: areaValue };
      const response = await axios.post("http://192.168.2.60:5000/predict-house", requestData);
      setPrediction(response.data.price);
    } catch (error) {
      setError("Prediction failed. Please try again.");
      console.error("Prediction failed", error);
    }
  };

  return (
    <div className="dogs-cats-container house-price-container"> {/* ✅ ใช้กรอบเดียวกับ DogsVsCatsPredictor */}
      <h1>🏡 House Price Predictor</h1>
      <form onSubmit={handleSubmit} className="dogs-cats-form"> {/* ✅ ใช้ฟอร์มเดียวกัน */}
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area (sq.m)"
          type="number"
          className="file-input"
          min="1"
          required
        />
        <input
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          type="number"
          className="file-input"
          min="1"
          required
        />
        <input
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          type="number"
          className="file-input"
          min="1"
          required
        />
        <input
          name="stories"
          value={formData.stories}
          onChange={handleChange}
          placeholder="Stories"
          type="number"
          className="file-input"
          min="1"
          required
        />
        <button type="submit">Predict</button>
      </form>

      {error && <p className="alert-error">{error}</p>}
      {prediction !== null && (
        <p className="prediction-result">
          Predicted Price: {prediction.toLocaleString()} THB
        </p>
      )}
    </div>
  );
}
