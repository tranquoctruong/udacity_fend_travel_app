const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Phục vụ các tệp tĩnh từ thư mục dist

// API endpoint để lấy thông tin quốc gia
app.get('/api/countries', async (req, res) => {
    try {
        const response = await axios.get('http://api.countrylayer.com/v2/all?access_key=e10f7c7441d1817da134e0c6e01781f8'); 
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).send('Error fetching countries');
    }
});

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
