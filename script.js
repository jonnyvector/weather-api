const cityZip = document.getElementById("city-zip");
const submitButton = document.querySelector("button");
const cityName = document.getElementsByClassName("city-name")[0];
const temperature = document.getElementsByClassName("temperature")[0];
const forecastWeatherContainer = document.getElementsByClassName(
  "forecast-weather-container"
);
const forecastBlockOne = document.getElementById("forecast-block-1");
const forecastBlockTwo = document.getElementById("forecast-block-2");
const forecastBlockThree = document.getElementById("forecast-block-3");
const forecastBlockFour = document.getElementById("forecast-block-4");

const apiKey = "87f395a78bc64e53ab860605242601";

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityZip.value}&days=4`
    );
    const data = await response.json();
    console.log(data);
    populateWeather(data);
    getDayLoop(data.forecast.forecastday);
  } catch (error) {
    alert(
      `We couldn't find that city or zip code. Please enter a valid city name, US zip code, or UK zip code.`
    );
    cityZip.value = "";
  }
}
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  getWeather();
  populateForecastDays();
});

function populateWeather(data) {
  cityName.innerHTML = data.location.name;
  temperature.innerHTML = data.current.temp_f;
}

function getDay(date) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(date);
  let day = weekday[d.getDay()];
  return day;
}

const dayArray = [];

function getDayLoop(forecastArray) {
  forecastArray.forEach((day) => {
    dayArray.push(getDay(day.date));
  });
}

const forecastBlockArray = [
  forecastBlockOne,
  forecastBlockTwo,
  forecastBlockThree,
  forecastBlockFour,
];

function populateForecastDays() {
  console.log(forecastWeatherContainer[0]);
  dayArray.forEach((day) => {
    const dayName = document.createElement("p");
    console.log(day);
    dayName.textContent = day;
    console.log(dayName);
    console.log(forecastWeatherContainer[0]);
    forecastWeatherContainer[0].appendChild(dayName);
  });
}
