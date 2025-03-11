import { useState } from "react";
import axios from "axios";
import "../styles.css"; 

export default function HousePricePredictor() {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // ✅ กำหนดให้ใช้ API จาก Localhost เท่านั้น
  const API_BASE_URL = "http://localhost:5000"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const requestData = { ...formData, area: parseFloat(formData.area) };
      const response = await axios.post(`${API_BASE_URL}/predict-house`, requestData);
      setPrediction(response.data.price);
    } catch (error) {
      setError("Prediction failed. Please try again.");
      console.error("Prediction failed", error);
    }
  };

  return (
    <div className="dogs-cats-container house-price-container">
      <h1>🏡 House Price Predictor</h1>
      <form onSubmit={handleSubmit} className="dogs-cats-form">
        <input name="area" value={formData.area} onChange={handleChange} placeholder="Area (sq.m)" type="number" required />
        <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" type="number" required />
        <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" type="number" required />
        <input name="stories" value={formData.stories} onChange={handleChange} placeholder="Stories" type="number" required />
        <button type="submit">Predict</button>
      </form>

      {error && <p className="alert-error">{error}</p>}
      {prediction !== null && (
        <p className="prediction-result">Predicted Price: {prediction.toLocaleString()} THB</p>
      )}
    </div>
  );
}
