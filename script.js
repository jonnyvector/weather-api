const cityZip = document.getElementById("city-zip");
const submitButton = document.querySelector("button");
const cityName = document.getElementsByClassName("city-name")[0];
const temperature = document.getElementsByClassName("temperature")[0];
const apiKey = "87f395a78bc64e53ab860605242601";

console.log(submitButton);

async function getWeather() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityZip.value}&days=4`
    );
    const data = await response.json();
    console.log(data);
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
