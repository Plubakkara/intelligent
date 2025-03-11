import React from 'react';
import { Link } from 'react-router-dom';  // ใช้ลิงก์ไปยังหน้าอื่น
import '../styles.css'; // นำเข้าไฟล์ CSS

export default function Home2() {
  return (
    <div className="home-container">
      <h1>🚀 Welcome to AI Predictor</h1>
      <p>
        This web application uses Machine Learning and Deep Learning models to predict house prices and classify dog vs cat images. 
        Explore the features below and try it out! 🎯
      </p>

      {/* ✅ Section: House Price Prediction */}
      <div className="feature-section">
        <h2>🏡 House Price Prediction</h2>
        <p>
          Enter details such as area, number of bedrooms, bathrooms, and stories to get an estimated house price using a Linear Regression model.
        </p>
        <Link to="/house-price" className="button">Predict House Price</Link>
      </div>

      {/* ✅ Section: Dogs vs Cats Classification */}
      <div className="feature-section">
        <h2>🐶🐱 Dogs vs Cats Classification</h2>
        <p>
          Upload an image and let our Convolutional Neural Network (CNN) determine whether it's a cat or a dog.
        </p>
        <Link to="/dogs-vs-cats" className="button">Classify Image</Link>
      </div>
    </div>
  );
}
