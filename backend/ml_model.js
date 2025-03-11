function predictHousePrice(data) {
    // ตัวอย่าง: ใช้สูตรคำนวณง่ายๆ (จริงๆ ควรใช้โมเดล Machine Learning ที่ train ไว้)
    return 5000000 + (data.area * 3000);
}

module.exports = { predictHousePrice };
