let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[new Date().getDay()];

let hours = new Date().getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = new Date().getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function showCurrentPositionInfo() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3f8e63b0ac8703d0297945f6602e377d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentPositionTemp);
}

function showCurrentPositionTemp(response) {
  let cityName = response.data.name;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = temperature;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = feelsLike;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
}

showCurrentPositionInfo();

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search_field");
  let cityNameSearch = citySearch.value;
  let apiKey = "3f8e63b0ac8703d0297945f6602e377d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameSearch}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let cityName = response.data.name;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = temperature;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = feelsLike;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", showCity);

let buttonCurrentLocation = document.querySelector("#current-location-button");
buttonCurrentLocation.addEventListener("click", showCurrentPositionInfo);
