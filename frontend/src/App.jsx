import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutModel from "./pages/AboutModel";
import HousePricePredictor from "./pages/HousePricePredictor";
import DogsVsCatsPredictor from "./pages/DogsVsCatsPredictor";
import "./styles.css";

export default function App() {
  return (
    <Router basename="/intelligent"> {/* ✅ ใช้ basename สำหรับ GitHub Pages */}
      <nav className="navbar">
        <ul>
          <li><Link to="/home">🏠 Home</Link></li>  
          <li><Link to="/about-model">📊 About Model</Link></li>
          <li><Link to="/house-price">🏡 Predict House Price</Link></li>
          <li><Link to="/dogs-vs-cats">🐶🐱 Predict Dogs vs Cats</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />  {/* ✅ Redirect หน้าแรกไป /about-model */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/about-model" element={<AboutModel />} />
        <Route path="/house-price" element={<HousePricePredictor />} />
        <Route path="/dogs-vs-cats" element={<DogsVsCatsPredictor />} />
      </Routes>
    </Router>
  );
}
