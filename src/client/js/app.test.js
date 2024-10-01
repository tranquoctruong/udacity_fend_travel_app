// app.test.js
require('jest-fetch-mock').enableMocks();

const countrySelect = document.createElement('select');
countrySelect.id = 'country';
const dateInput = document.createElement('input');
dateInput.id = 'date';
const weatherInfo = document.createElement('div');
weatherInfo.id = 'div-weatherInfo';
const getWeatherButton = document.createElement('button');
getWeatherButton.id = 'btn-getWeather';

document.body.appendChild(countrySelect);
document.body.appendChild(dateInput);
document.body.appendChild(weatherInfo);
document.body.appendChild(getWeatherButton);

// Import the functions after setting up the DOM elements
const { fetchCountries, fetchWeather, displayWeather } = require('./app');

describe('Weather App', () => {
    beforeEach(() => {
        fetch.resetMocks();
        countrySelect.innerHTML = ''; // Reset country select options
    });

    test('fetchCountries populates country select', async () => {
        const mockCountries = [
            { alpha2Code: 'US', name: 'United States' },
            { alpha2Code: 'FR', name: 'France' },
        ];

        fetch.mockResponseOnce(JSON.stringify(mockCountries));

        await fetchCountries();

        expect(countrySelect.childElementCount).toBe(2);
        expect(countrySelect.children[0].value).toBe('US');
        expect(countrySelect.children[0].textContent).toBe('United States');
        expect(countrySelect.children[1].value).toBe('FR');
        expect(countrySelect.children[1].textContent).toBe('France');
    });

    test('fetchWeather fetches weather data and displays it', async () => {
        const mockWeatherData = {
            cod: 200,
            main: { temp: 25 },
            weather: [{ description: 'Clear sky' }],
            name: 'Paris',
            sys: { country: 'FR' },
        };

        fetch.mockResponseOnce(JSON.stringify(mockWeatherData));

        countrySelect.value = 'FR'; // Simulate selecting France
        await fetchWeather('FR');

        expect(weatherInfo.innerHTML).toContain('Nhiệt độ: 25 °C');
        expect(weatherInfo.innerHTML).toContain('Thời tiết: Clear sky');
        expect(weatherInfo.innerHTML).toContain('Địa điểm: Paris, FR');
    });

    test('displayWeather shows error message for invalid data', () => {
        const mockInvalidData = { cod: 404 };
        displayWeather(mockInvalidData);

        expect(weatherInfo.textContent).toBe('Không tìm thấy thông tin thời tiết.');
    });
});