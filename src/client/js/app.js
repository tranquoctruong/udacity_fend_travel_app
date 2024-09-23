const fetchCountries = async () => {
    try {
        const response = await fetch('/api/countries');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
};

const fetchWeather = async (city) => {
    const apiKey = 'YOUR_WEATHER_API_KEY'; // Thay YOUR_WEATHER_API_KEY bằng API key của bạn
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weather = await response.json();
        displayWeather(weather);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
};

const displayCountries = (countries) => {
    const countryListDiv = document.getElementById('country-list');
    countryListDiv.innerHTML = countries.map(country => `
        <div class="country" onclick="fetchWeather('${country.capital}')">
            <h3>${country.name}</h3>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <img src="${country.flag}" alt="Flag of ${country.name}" style="width: 50px;">
        </div>
    `).join('');
};

// Tính năng tìm kiếm
document.getElementById('search-input').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const countries = document.querySelectorAll('.country');
    countries.forEach(country => {
        const countryName = country.querySelector('h3').textContent.toLowerCase();
        country.style.display = countryName.includes(searchTerm) ? 'block' : 'none';
    });
});

const displayWeather = (weather) => {
    const weatherInfoDiv = document.getElementById('weather-info');
    if (weather.cod === 200) {
        weatherInfoDiv.innerHTML = `
            <h3>${weather.name}</h3>
            <p>Temperature: ${weather.main.temp} °C</p>
            <p>Weather: ${weather.weather[0].description}</p>
        `;
    } else {
        weatherInfoDiv.innerHTML = `<p>Weather information not available.</p>`;
    }
};

// Fetch countries when the app loads
fetchCountries();
