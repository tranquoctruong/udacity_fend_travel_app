import './styles/style.scss';
import './js/app'; // Điều chỉnh tên tệp nếu cần

const { fetchCountries, fetchWeather } = require('./js/app');

const countrySelect = document.getElementById('country');
const dateInput = document.getElementById('date');
const getWeatherButton = document.getElementById('btn-getWeather');

fetchCountries();

getWeatherButton.addEventListener('click', () => {
    const selectedCountry = countrySelect.value;
    const selectedDate = dateInput.value;

    if (selectedCountry && selectedDate) {
        fetchWeather(selectedCountry, selectedDate);
    } else {
        alert('Vui lòng chọn quốc gia và ngày.');
    }
});