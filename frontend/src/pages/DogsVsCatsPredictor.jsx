import { useState } from "react";
import axios from "axios";
import "../styles.css"; 

export default function DogsVsCatsPredictor() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // ✅ แสดงตัวอย่างรูปภาพ
      setPrediction(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://192.168.2.60:5000/predict-dogs-vs-cats", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      setError("Prediction failed. Please try again.");
      console.error("Prediction error", error);
    }
  };

  return (
    <div className="dogs-cats-container">
      <h1>🐶🐱 Dogs vs Cats Predictor</h1>
      <form onSubmit={handleSubmit} className="dogs-cats-form">
        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
        <button type="submit">Predict</button>
      </form>

      {preview && <img src={preview} alt="Uploaded" className="uploaded-image" />}
      {error && <p className="alert-error">{error}</p>}
      {prediction && <p className="prediction-result">{prediction}</p>}
    </div>
  );
}
