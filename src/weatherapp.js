function showWeather(response) {
  console.log(response);
  document.querySelector("#cityB").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  let humidityIcon = document.querySelector("#humidity-icon");
  let newHumidity = response.data.main.humidity;
  if (newHumidity <= 50) {
    humidityIcon.innerHTML = "🌂";
  } else {
    if (newHumidity > 50 && newHumidity < 75) {
      humidityIcon.innerHTML = "☂️";
    } else {
      humidityIcon.innerHTML = "☔";
    }
  }

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day} ${month} ${date}`;
}

function formatTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function tempFahrenheit(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temp");
  let a = tempC.innerHTML;
  let tempF = Math.round(a * 1.8 + 32);
  tempC.innerHTML = `${tempF}`;
  tempFButton.setAttribute("style", "background-color: lightgray;");
  let tempCButton = document.querySelector("#celsius");
  tempCButton.setAttribute("style", "background-color: rgb(113, 157, 194);");
}

function tempCelsius(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temp");
  let a = tempF.innerHTML;
  let tempC = Math.round((a - 32) / 1.8);
  tempF.innerHTML = `${tempC}`;
  tempCButton.setAttribute("style", "background-color: lightgray;");
  let tempFButton = document.querySelector("#fahrenheit");
  tempFButton.setAttribute("style", "background-color: rgb(113, 157, 194);");
}

function searchCity(city) {
  let apiKey = "7cc7a1eacfc053e2fe7ef8d9cb7298e3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
// Chooses the city and gets the data from openweather
// for the selected city using an API with an API key
// The function chooseCity is called by submitting a city name in the form
// From the response we can extract the city name and temperature with the function showWeather
function chooseCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  searchCity(city);
}

function getCurrentLocationTemp(position) {
  console.log(position);
  let units = "metric";
  let apiKey = "7cc7a1eacfc053e2fe7ef8d9cb7298e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

// You can google JS location and look for the modzilla link to get this function
function getLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemp);
}

let showDate = document.querySelector(".date");
showDate.innerHTML = formatDate(showDate);

let showTime = document.querySelector(".time");
showTime.innerHTML = formatTime(showTime);

let form = document.querySelector("#weather-app-form");
form.addEventListener("submit", chooseCity);

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getLocation);

let tempFButton = document.querySelector("#fahrenheit");
tempFButton.addEventListener("click", tempFahrenheit);

let tempCButton = document.querySelector("#celsius");
tempCButton.addEventListener("click", tempCelsius);

searchCity("Leipzig");
