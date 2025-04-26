const API_KEY = "154d5bba1064e837fe3ab1a5a1050fbb"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const weather = document.querySelector('.weather');
const error = document.querySelector('.error');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
    
    if (response.status === 404) {
        error.style.display = 'block';
        weather.style.display = 'none';
    } else {
        const data = await response.json();
        error.style.display = 'none';
        weather.style.display = 'block';

        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + "°C";
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main.toLowerCase();
        updateWeatherIcon(weatherCondition);
    }
}

function updateWeatherIcon(condition) {
    if (condition === "clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition === "clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        weatherIcon.src = "images/default.png"; // Default image
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value;
    checkWeather(city);
});