// Accessing weather information via OpenWeatherMap API
let weather;

function getWeather(x) {
   // Accessing containers for weather info
   let temp = document.querySelector('#temp');
   let humidity = document.querySelector('#humidity');
   let location = document.querySelector('#location');

   // Updating container's inner HTML
   temp.innerHTML = Math.round(x.main.temp-273) + " °C";
   humidity.innerHTML = x.main.humidity + " %";
   location.innerHTML = x.name+ ", " + x.sys.country;
}

// API Request
fetch('https://api.openweathermap.org/data/2.5/weather?lat=51.4025&lon=21.1471&appid=e4af92d28fd259ed941e40e83ea4c432')
.then(data => data.json())
.then(data => getWeather(data));