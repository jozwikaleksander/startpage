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
let openWeatherURL = "";
chrome.storage.sync.get(['openWeatherAPIURL'], function(url) {
    openWeatherURL = url.openWeatherAPIURL;

    // API Request
   fetch(openWeatherURL)
   .then(data => data.json())
   .then(data => getWeather(data));
    })   