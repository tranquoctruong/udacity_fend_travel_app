const countrySelect = document.getElementById('country');
const dateInput = document.getElementById('date');
const weatherInfo = document.getElementById('weatherInfo');
const getWeatherButton = document.getElementById('getWeather');

// Lấy danh sách quốc gia từ server Node.js
async function fetchCountries() {
    try {
        const response = await fetch('http://localhost:3000/api/countries');
        const countries = await response.json();
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.alpha2Code;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

// Lấy thông tin thời tiết từ server Node.js
async function fetchWeather(countryCode) {
    try {
        const cityName = 'Ha Noi';
        const response = await fetch(`http://localhost:3000/api/weather?cityName=${cityName}&countryCode=${countryCode}`);
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Hiển thị thông tin thời tiết
function displayWeather(data) {
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <p>Nhiệt độ: ${data.main.temp} °C</p>
            <p>Thời tiết: ${data.weather[0].description}</p>
            <p>Địa điểm: ${data.name}, ${data.sys.country}</p>
        `;
    } else {
        weatherInfo.textContent = 'Không tìm thấy thông tin thời tiết.';
    }
}

// Thêm sự kiện cho nút xem thời tiết
getWeatherButton.addEventListener('click', () => {
    const selectedCountry = countrySelect.value;
    const selectedDate = dateInput.value;

    if (selectedCountry && selectedDate) {
        fetchWeather(selectedCountry, selectedDate);
    } else {
        alert('Vui lòng chọn quốc gia và ngày.');
    }
});

// Khởi động ứng dụng
fetchCountries();
