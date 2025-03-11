import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // ✅ โหลด App.jsx ตรงๆ
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* ✅ ไม่มี <Router> ที่นี่ */}
  </StrictMode>
);
