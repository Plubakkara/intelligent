import React from 'react';
import '../styles.css';  // ✅ นำเข้าไฟล์ CSS

export default function AboutModel() {
  return (
    <div className="about-container">
      <h1>📊 About the Models</h1>

      {/* ✅ House Price Prediction */}
      <div className="model-section">
        <h2>🏡 House Price Prediction (Machine Learning)</h2>
        <p>
          The House Price Prediction model was trained using a dataset containing 
          information such as <b>area (sqm), number of bedrooms, bathrooms, and stories.</b> 
          The model was built using <b>Linear Regression</b>, which provides an estimation 
          based on historical data.
        </p>

        <h3>📂 Dataset Used:</h3>
        <ul>
          <li>📌 Dataset: <b>Housing.csv</b></li>
          <li>📊 Data Size: Thousands of records</li>
          <li>📏 Features: Area, Bedrooms, Bathrooms, Stories</li>
        </ul>

        <h3>⚙️ Model Development Process:</h3>
        <ul>
          <li>🔹 Data Preprocessing: Converted units, handled missing values, performed scaling.</li>
          <li>🔹 Model Selection: Used Linear Regression with 80/20 split.</li>
          <li>🔹 Model Training: Evaluated using <b>Mean Absolute Error (MAE)</b>.</li>
          <li>🔹 Model Testing: Used unseen data for accuracy check.</li>
        </ul>
      </div>

      {/* ✅ Cats vs Dogs Classification */}
      <div className="model-section">
        <h2>🐶🐱 Cats vs Dogs Classification (Neural Network)</h2>
        <p>
          This model was developed using a <b>Convolutional Neural Network (CNN)</b> trained 
          on a dataset of cat and dog images. It classifies uploaded images as either a cat or a 
          dog with high accuracy.
        </p>

        <h3>📂 Dataset Used:</h3>
        <ul>
          <li>📌 Dataset: <b>Kaggle Cats vs Dogs</b></li>
          <li>🖼️ Image Count: 25,000 images (cats & dogs)</li>
          <li>📏 Image Size: 150x150 pixels</li>
          <li>📄 File Type: JPG</li>
        </ul>

        <h3>⚙️ Model Development Process:</h3>
        <ul>
          <li>🔹 Data Preprocessing: Resized images, normalized, applied Data Augmentation.</li>
          <li>🔹 CNN Architecture: Used Convolution, MaxPooling, and Dense layers.</li>
          <li>🔹 Model Training: Trained for <b>10 epochs</b> with validation.</li>
          <li>🔹 Model Testing:
            <ul>
              <li>✅ If <b>prediction &gt; 0.5</b>, classified as a 🐶 <b>dog</b></li>
              <li>✅ If <b>prediction ≤ 0.5</b>, classified as a 🐱 <b>cat</b></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* ✅ Steps in Model Development */}
      <div className="model-section">
        <h2>🛠️ Steps in Model Development:</h2>
        <ul>
          <li>✔️ Data Collection & Preprocessing</li>
          <li>✔️ Feature Engineering & Model Training</li>
          <li>✔️ Testing & Deployment</li>
        </ul>
      </div>

      {/* ✅ Summary */}
      <div className="summary">
        <p>🏡 The <b>House Price Prediction Model</b> uses <b>Linear Regression</b> for price estimation.</p>
        <p>🐶🐱 The <b>Cats vs Dogs Classification Model</b> is built with <b>CNN</b> for image classification.</p>
        <p>🚀 Both models are deployed using a <b>Flask API</b> and integrated into a <b>React frontend</b>.</p>
      </div>
    </div>
  );
}
