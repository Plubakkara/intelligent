import joblib
import numpy as np
import pandas as pd

# 📌 โหลดโมเดลที่ Train ไว้
model = joblib.load("house_price_model.pkl")

def predict_price(area, bedrooms, bathrooms, stories):
    # 📌 กำหนดชื่อฟีเจอร์ให้ตรงกับตอน Train โมเดล
    feature_names = ["area", "bedrooms", "bathrooms", "stories"]
    input_data = pd.DataFrame([[area, bedrooms, bathrooms, stories]], columns=feature_names)

    # 📌 ใช้โมเดลทำนาย
    price = model.predict(input_data)[0]
    return round(price, 2)

# 📌 ทดสอบการพยากรณ์
test_price = predict_price(2500, 3, 2, 1)
print(f"Predicted Price: {test_price} THB")
