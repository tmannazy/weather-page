import { pageHeader } from "./header";
import {
  showDefaultWeather,
  showContentOfWeather,
  postDefaultWeatherData,
} from "./heroContent";
import "./style.css";
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context("./images/", true));

const content = document.querySelector(".content");
const queryLocation = document.createElement("input");
const searchBtn = document.createElement("button");
const defaultWeatherContainer = document.createElement("section");
const errorContainer = document.createElement("div");
const temperatureBtn = document.createElement("button");
const queryContainer = document.createElement("div");
const loadingImg = document.createElement("img");
let fetchedDataInFahrenheit;
let fetchedDataInCelsius;

queryLocation.setAttribute("type", "text");
queryLocation.setAttribute("class", "search-input");
errorContainer.setAttribute("class", "error-info");
temperatureBtn.setAttribute("class", "temp-toggle-btn");
queryContainer.setAttribute("class", "search-box-container");
searchBtn.setAttribute("class", "search-btn");
loadingImg.className = "load-img";
searchBtn.textContent = "Search";
temperatureBtn.textContent = "Display \xB0F";
queryContainer.append(queryLocation, searchBtn, temperatureBtn);
defaultWeatherContainer.append(showDefaultWeather());
content.append(pageHeader(), defaultWeatherContainer, queryContainer);

async function displayWeather(query) {
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=42cb9ecb74688a62504925b13afb6382`,
    { mode: "cors" }
  );
  const getWeatherData = await weatherData.json();
  fetchedDataInFahrenheit = getWeatherData;
  return getWeatherData;
}

async function displayReceivedData(query) {
  try {
    const weatherDataReceived = await displayWeather(query);
    const longitude = weatherDataReceived.coord.lon;
    const latitude = weatherDataReceived.coord.lat;
    const getUserWeatherQuery = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=42cb9ecb74688a62504925b13afb6382`,
      { mode: "cors" }
    );
    const parseFetchedUserWeatherQuery = await getUserWeatherQuery.json();
    fetchedDataInCelsius = parseFetchedUserWeatherQuery;
    defaultWeatherContainer.textContent = "";
    defaultWeatherContainer.append(
      showContentOfWeather({
        fetchedWeatherInCelsius: parseFetchedUserWeatherQuery,
        weatherDataInFahrenheit: fetchedDataInFahrenheit,
      })
    );
    loadingImg.style.display = "none";
  } catch (error) {
    if (defaultWeatherContainer.textContent.match(/\bnetwork error\b/i)) {
      defaultWeatherContainer.textContent = "";
      errorContainer.textContent = "Network error! Request unreachable.";
      defaultWeatherContainer.appendChild(errorContainer);
      loadingImg.style.display = "none";
    } else {
      errorContainer.textContent =
        "Location not found! Search by name of City or Country.";
      defaultWeatherContainer.appendChild(errorContainer);
      loadingImg.style.display = "none";
    }
  }
}

searchBtn.addEventListener("click", () => {
  requestingImg();
  const userQuery = queryLocation.value.toLocaleLowerCase();
  displayReceivedData(userQuery);
});

const requestingImg = () => {
  loadingImg.src = "./e157bc007c2f7fc44591.webp";
  loadingImg.style.display = "block";
  content.append(loadingImg);
};

temperatureBtn.addEventListener("click", (e) => {
  const getTempContainer = document.querySelector(".weather-temp-container");
  const getFeelsLikeContainer = document.querySelector(".feels_like-container");
  const getWindSpeedContainer = document.querySelector(".wind_speed-container");
  if (fetchedDataInFahrenheit === undefined) {
    const parsePostedDefaultData = postDefaultWeatherData();
    fetchedDataInFahrenheit = parsePostedDefaultData.fahrenheitData;
    fetchedDataInCelsius = parsePostedDefaultData.celsiusData;
  }
  if (e.target.textContent === "Display °F") {
    e.target.textContent = "Display \xB0C";
    getTempContainer.textContent = `${Math.ceil(
      fetchedDataInFahrenheit.main.temp
    )} \xB0F`;
    getFeelsLikeContainer.textContent = `${Math.ceil(
      fetchedDataInFahrenheit.main.feels_like
    )} \xB0F`;
    getWindSpeedContainer.textContent = `${Math.ceil(
      fetchedDataInFahrenheit.wind.speed
    ).toFixed(1)} mph`;
  } else {
    e.target.textContent = "Display \xB0F";
    getTempContainer.textContent = `${Math.ceil(
      fetchedDataInCelsius.current.temp
    )} \xB0C`;
    getFeelsLikeContainer.textContent = `${Math.ceil(
      fetchedDataInCelsius.current.feels_like
    )} \xB0C`;
    getWindSpeedContainer.textContent = `${(
      fetchedDataInCelsius.current.wind_speed * 3.6
    ).toFixed(1)} km/h`;
  }
});

document.addEventListener("keydown", (e) => {
  const userQuery = queryLocation.value.toLocaleLowerCase();
  if (e.key === "Enter") {
    requestingImg();
    displayReceivedData(userQuery);
  }
});

queryLocation.addEventListener("focus", (e) => {
  e.target.value = "";
});
