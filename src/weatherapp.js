function showWeather(response) {
  console.log(response);
  document.querySelector("#cityB").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  let umbrellaIcon = document.querySelector("#rain-icon");
  let umbrella = response.data.weather[0].icon;
  console.log(umbrella);
  if (
    umbrella === "01d" ||
    umbrella === "01n" ||
    umbrella === "02d" ||
    umbrella === "02n" ||
    umbrella === "13d" ||
    umbrella === "13n" ||
    umbrella === "50n" ||
    umbrella === "50d"
  ) {
    umbrellaIcon.innerHTML = "🌂";
  } else {
    if (
      umbrella === "03d" ||
      umbrella === "03n" ||
      umbrella === "04n" ||
      umbrella === "04d"
    ) {
      umbrellaIcon.innerHTML = "☂️";
    } else {
      umbrellaIcon.innerHTML = "☔";
    }
  }

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecastHourly(response.data.coord);
  getForecastDaily(response.data.coord);
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

function getForecastHourly(coordinates) {
  let apiKey = "7cc7a1eacfc053e2fe7ef8d9cb7298e3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayHourly);
}

function getForecastDaily(coordinates) {
  let apiKey = "7cc7a1eacfc053e2fe7ef8d9cb7298e3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayDaily);
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:00`;
}

function displayHourly(response) {
  let hourlyForecast = response.data.hourly;
  let hourlyElement = document.querySelector("#hour-forecast");

  let hourlyHTML = `<div class="row">`;

  hourlyForecast.forEach(function (hour, index) {
    if (index < 6) {
      hourlyHTML =
        hourlyHTML +
        `<div class="col-2 text-center" id="hourly">
      <div class="hourly-temp">${Math.round(hour.temp)} ºC</div>
      <img src="https://openweathermap.org/img/wn/${
        hour.weather[0].icon
      }@2x.png" alt="" class="hourly-forecast-icon">
      <div class="forecast-hour">${formatHour(hour.dt)}</div>
    </div>`;
    }
  });
  hourlyHTML = hourlyHTML + `</div>`;
  hourlyElement.innerHTML = hourlyHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayDaily(response) {
  let dailyForecast = response.data.daily;
  console.log(dailyForecast);
  let dailyElement = document.querySelector("#day-forecast");

  let dailyHTML = `<ul class="daily-forecast">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      dailyHTML =
        dailyHTML +
        `<li class="forecast-line">
            <span class="forecast-day">${formatDay(forecastDay.dt)}</span>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" class="daily-forecast-icon">
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )} ºC</span>
            <span>|</span>
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )} ºC</span>      
          </li>`;
    }
  });
  dailyHTML = dailyHTML + `</ul>`;
  dailyElement.innerHTML = dailyHTML;
}

function searchCity(city) {
  let apiKey = "7cc7a1eacfc053e2fe7ef8d9cb7298e3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

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

searchCity("Leipzig");
