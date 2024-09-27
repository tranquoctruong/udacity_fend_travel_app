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

// API Endpoint để lấy thông tin thời tiết
app.get('/api/weather', async (req, res) => {
    const { cityName, countryCode } = req.query; // Nhận mã quốc gia và tên thành phố từ query params
    const apiKey = '08b035f8457a95aa9b71eb7f75932bda'; //
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}&units=metric`);
        res.json(response.data);
    } catch (error) {
        const defaultWeatherData = {
            main: {
                temp: 30,
                pressure: 1013,
                humidity: 70,
            },
            weather: [{ description: "clear sky", icon: "01d" }],
            name: "Ha Noi",
            sys: { country: "VN" },
            cod: 200
        };

        // Trả về thông tin mặc định
        res.json(defaultWeatherData);
    }
});

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
