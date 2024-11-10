const apiKey = '0edf4d262883b8e1e069f9953fa46124'; // Replace with your OpenWeatherMap API key
let city = 'Delhi'; // Default city

document.getElementById('search-button').addEventListener('click', () => {
    city = document.getElementById('city-input').value;
    if (city) {
        getWeather();
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    
    // Change background image based on weather condition
    changeBackground(data.weather[0].main);
}

function changeBackground(weatherCondition) {
    const backgroundDiv = document.getElementById('background');
    let bgImage = 'images/bg_image_weatherapp.webp';

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            bgImage = 'url("images/sunny_image.wp.jpg")'; // Replace with your image path
            break;
        case 'clouds':
            bgImage = 'url("images/cloudy_image.wp.jpg")'; // Replace with your image path
            break;
        case 'rain':
            bgImage = 'url("images/Rainy_image.wp.jpg")'; // Replace with your image path
            break;
        case 'snow':
            bgImage = 'url("images/snow_wp..jpg")'; // Replace with your image path
            break;
        case 'thunderstorm':
            bgImage = 'url("images/thunder_wp.jpg")'; // Replace with your image path
            break;
        default:
            bgImage = 'url("images/bg_image_weatherapp.webp")'; // Default image
    }

    backgroundDiv.style.backgroundImage = bgImage;
}

// Call the function to fetch weather data on page load
getWeather();
