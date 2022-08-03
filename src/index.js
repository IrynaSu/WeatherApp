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

function showTemp(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3f8e63b0ac8703d0297945f6602e377d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showCurrentPositionInfo() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search_field");
  let apiKey = "3f8e63b0ac8703d0297945f6602e377d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

showCurrentPositionInfo();

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", showCity);

let buttonCurrentLocation = document.querySelector("#current-location-button");
buttonCurrentLocation.addEventListener("click", showCurrentPositionInfo);
