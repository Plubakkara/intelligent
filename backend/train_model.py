import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# 📌 โหลด Dataset
df = pd.read_csv("Housing.csv")  # ตรวจสอบว่าไฟล์ Housing.csv อยู่ใน backend

# 📌 เลือกฟีเจอร์ที่ใช้ทำนาย
features = ["area", "bedrooms", "bathrooms", "stories"]
target = "price"

X = df[features]
y = df[target]

# 📌 แบ่งข้อมูล Train/Test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 📌 Train โมเดล Machine Learning
model = LinearRegression()
model.fit(X_train, y_train)

# 📌 ทดสอบความแม่นยำของโมเดล
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2f}")

# 📌 บันทึกโมเดลเป็นไฟล์ .pkl
joblib.dump(model, "house_price_model.pkl")
print("Model saved as house_price_model.pkl")
