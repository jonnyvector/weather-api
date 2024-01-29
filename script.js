const apiKey = "87f395a78bc64e53ab860605242601";
const cityZip = document.getElementById("city-zip");
const submitButton = document.querySelector("button");
const cityName = document.getElementsByClassName("city-name")[0];
const temperature = document.getElementsByClassName("temperature")[0];
const forecastWeatherContainer = document.getElementsByClassName(
  "forecast-weather-container"
);
const days = document.getElementsByClassName("day");
const dayElementsArray = Array.from(days);

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityZip.value}&days=4`
    );
    const data = await response.json();
    console.log(data);
    populateWeather(data);
    getDayLoop(data.forecast.forecastday);
    populateForecastDays();
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

function populateForecastDays() {
  for (let i = 0; i < dayElementsArray.length; i++) {
    console.log(dayArray[i]);
    console.log(dayElementsArray[i]);
    dayElementsArray[i].textContent = dayArray[i];
  }
}
