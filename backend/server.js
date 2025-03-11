const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { predictHousePrice } = require('./ml_model'); // ฟังก์ชันทำนายราคาบ้าน
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API ทำนายราคาบ้าน
app.post('/predict-house', (req, res) => {
    try {
        const inputData = req.body;
        const prediction = predictHousePrice(inputData);
        res.json({ price: prediction });
    } catch (error) {
        res.status(500).json({ error: 'Prediction failed' });
    }
});

// ตรวจสอบว่าโฟลเดอร์ uploads มีอยู่หรือไม่ ถ้าไม่มีให้สร้าง
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// API ทำนายภาพหมาแมว
app.post('/predict-dogs-vs-cats', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imagePath = req.file.path;
        console.log(`Received file: ${imagePath}`);

        // จำลองผลการพยากรณ์ (จริงๆ ต้องเชื่อมกับโมเดล AI)
        const prediction = Math.random() > 0.5 ? 'dog' : 'cat';

        res.json({ prediction: prediction });
    } catch (error) {
        console.error('Image prediction failed:', error);
        res.status(500).json({ error: 'Image prediction failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
