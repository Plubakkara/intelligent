from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os
import gdown
import logging

# ✅ ตั้งค่า Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)

# ✅ เปิดใช้งาน CORS (รองรับทั้ง Local และ GitHub Pages)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5174", "https://plubakkara.github.io"]}})

logger.info("🚀 Flask Server is starting...")

# 📌 ลิงก์ Google Drive ของโมเดล
HOUSE_PRICE_MODEL_URL = "https://drive.google.com/uc?id=1geNJkAvt94KU8-CewHJ_JMQe_pSM57Y6"
DOGS_CATS_MODEL_URL = "https://drive.google.com/uc?id=1A-Hritg_KtNcT0PQyp7S-M5_x1MZTSSp"

# 📌 ชื่อไฟล์โมเดล
house_price_model_path = "house_price_model.pkl"
dogs_cats_model_path = "model_cats_dogs.keras"

# ✅ ฟังก์ชันดาวน์โหลดโมเดล
def download_model(url, output_path):
    if not os.path.exists(output_path):
        logger.info(f"⬇️ Downloading {output_path} from Google Drive...")
        gdown.download(url, output_path, quiet=False)
    else:
        logger.info(f"✅ {output_path} already exists, skipping download.")

# ✅ ดาวน์โหลดโมเดล (ถ้ายังไม่มี)
download_model(HOUSE_PRICE_MODEL_URL, house_price_model_path)
download_model(DOGS_CATS_MODEL_URL, dogs_cats_model_path)

# 📌 โหลดโมเดล
try:
    house_price_model = joblib.load(house_price_model_path)
    logger.info("🏠✅ House Price Model loaded successfully!")
except Exception as e:
    logger.error("🏠❌ Error loading House Price Model:", exc_info=True)
    house_price_model = None

try:
    dogs_cats_model = tf.keras.models.load_model(dogs_cats_model_path)
    logger.info("🐶🐱✅ Dogs vs Cats Model loaded successfully!")
except Exception as e:
    logger.error("🐶🐱❌ Error loading Dogs vs Cats Model:", exc_info=True)
    dogs_cats_model = None

# 🚩 API ทำนายราคาบ้าน
@app.route("/predict-house", methods=["POST"])
def predict_house():
    try:
        if house_price_model is None:
            return jsonify({"error": "House Price Model not loaded"}), 500

        data = request.json
        logger.info("📌 Received JSON: %s", data)

        area = float(data["area"])
        bedrooms = int(data["bedrooms"])
        bathrooms = int(data["bathrooms"])
        stories = int(data["stories"])

        input_data = np.array([[area, bedrooms, bathrooms, stories]])
        price = house_price_model.predict(input_data)[0]

        logger.info("🏠 Predicted Price: %s", price)
        return jsonify({"price": round(price, 2)})

    except Exception as e:
        logger.error("🏠❌ Error:", exc_info=True)
        return jsonify({"error": str(e)}), 500

# 🚩 API ทำนายหมา-แมว
@app.route('/predict-dogs-vs-cats', methods=['POST'])
def predict_dogs_vs_cats():
    try:
        if dogs_cats_model is None:
            return jsonify({"error": "Dogs vs Cats Model not loaded"}), 500

        # ✅ ตรวจสอบว่ามีไฟล์ถูกส่งมาหรือไม่
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        upload_dir = 'uploads/'

        # ✅ สร้างโฟลเดอร์หากยังไม่มี
        os.makedirs(upload_dir, exist_ok=True)

        # ✅ บันทึกไฟล์ภาพ
        filepath = os.path.join(upload_dir, file.filename)
        file.save(filepath)

        # ✅ โหลดและแปลงภาพเป็น Array
        img = image.load_img(filepath, target_size=(150, 150))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # ✅ ทำนายผล
        prediction = dogs_cats_model.predict(img_array)
        result = 'dog 🐶' if prediction[0][0] > 0.5 else 'cat 🐱'

        # ✅ ลบไฟล์ภาพหลังจากใช้งาน
        os.remove(filepath)
        
        logger.info("🐶🐱 Prediction Result: %s", result)
        return jsonify({'prediction': result})

    except Exception as e:
        logger.error("🐶🐱❌ Error:", exc_info=True)
        return jsonify({'error': str(e)}), 500

# ✅ รัน Flask Server
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
