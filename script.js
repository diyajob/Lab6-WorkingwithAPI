const cityButtons = document.querySelectorAll(".city-buttons button");
const cityLabel = document.querySelector("#city-label");
const tempEl = document.querySelector("#temperature");
const messageEl = document.querySelector("#message");
const feelsLikeEl = document.querySelector("#feels-like");
const windEl = document.querySelector("#wind");

const cityImages = {
  Toronto: "images/Toronto.jpg",
  Boston: "images/Boston.jpg",
  Bengaluru: "images/Bengaluru.jpg",
  Rome: "images/Rome.jpg",
};


function loadCityWeather(city, lat, lon, clickedButton) {
  cityLabel.textContent = city;
  tempEl.textContent = "Loading...";
  messageEl.textContent = "";

  if (cityImages[city]) {
    document.body.style.backgroundImage = `url("${cityImages[city]}")`;
  }

  cityButtons.forEach((btn) => btn.classList.remove("active"));
  if (clickedButton) {
    clickedButton.classList.add("active");
  }

const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,wind_speed_10m`;

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
        throw new Error("Request Failed");
    }
    return response.json();
    })
  .then((data) => {
    let temperature = data.current.temperature_2m;
    let feelsLike = data.current.apparent_temperature;
    let windSpeed = data.current.wind_speed_10m;

    tempEl.textContent = temperature + "°C";
    feelsLikeEl.textContent = `Feels like: ${feelsLike}°C`;
    windEl.textContent = `Wind speed: ${windSpeed} km/h`;

    if (temperature < 10) {
      document.body.className = "cold";
      messageEl.textContent = `It's feeling cold in ${city} today.`;

    } else if (temperature < 25) {
      document.body.className = "mild";
      messageEl.textContent = `It's feeling pretty mild in ${city}.`;
     
    } else {
      document.body.className = "hot";
      messageEl.textContent = `It's a hot one in ${city}!`;
    }
  })
  .catch((error) => {
      console.error("Error:", error);
      tempEl.textContent = "--°C";
      messageEl.textContent = "Could not load weather data right now.";
    });
    }

cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const city = button.dataset.city;
    const lat = button.dataset.lat;
    const lon = button.dataset.lon;
    loadCityWeather(city, lat, lon, button);
  });
});

loadCityWeather("Toronto", "43.65", "-79.38", cityButtons[0]);