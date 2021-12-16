import { pageHeader } from "./header";
import { showDefaultWeather, showContentOfWeather } from "./heroContent";

const content = document.querySelector(".content");
const queryLocation = document.createElement("input");
const searchBtn = document.createElement("button");
const defaultWeatherContainer = document.createElement("section");
const errorContainer = document.createElement("div");
const temperatureBtn = document.createElement("button");
let fetchedDataInFahrenheit;
let fetchedDataInCelsius;

queryLocation.setAttribute("type", "text");
queryLocation.setAttribute("class", "search");
errorContainer.setAttribute("class", "error-info");
temperatureBtn.setAttribute("class", "temp-toggle-btn");
searchBtn.textContent = "Search";
temperatureBtn.textContent = "Display \xB0F";
defaultWeatherContainer.append(showDefaultWeather());
content.append(
  pageHeader(),
  defaultWeatherContainer,
  queryLocation,
  searchBtn,
  temperatureBtn
);

searchBtn.addEventListener("click", () => {
  const userQuery = queryLocation.value.toLocaleLowerCase();
  async function displayWeather() {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userQuery}&units=imperial&appid=42cb9ecb74688a62504925b13afb6382`,
      { mode: "cors" }
    );
    const getWeatherData = await weatherData.json();
    fetchedDataInFahrenheit = getWeatherData;
    return getWeatherData;
  }

  async function displayReceivedData() {
    try {
      const weatherDataReceived = await displayWeather();
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
        showContentOfWeather(
          parseFetchedUserWeatherQuery,
          fetchedDataInFahrenheit
        )
      );
    } catch (error) {
      if (defaultWeatherContainer.textContent.match(/\bnetwork error\b/i)) {
        defaultWeatherContainer.textContent = "";
        errorContainer.textContent = "Network error! Request unreachable.";
        defaultWeatherContainer.appendChild(errorContainer);
      } else {
        errorContainer.textContent =
          "Location not found! Search by name of City or Country.";
        defaultWeatherContainer.appendChild(errorContainer);
      }
    }
  }
  displayReceivedData();
});

temperatureBtn.addEventListener("click", (e) => {
  const getTempContainer = document.querySelector(".weather-temp-container");
  const getFeelsLikeContainer = document.querySelector(
    ".weather-feels_like-container"
  );

  if (e.target.textContent === "Display °F") {
    e.target.textContent = "Display \xB0C";
    getTempContainer.textContent = `${Math.ceil(
      fetchedDataInFahrenheit.main.temp
    )} \xB0F`;
    getFeelsLikeContainer.textContent = `${Math.ceil(
      fetchedDataInFahrenheit.main.feels_like
    )} \xB0F`;
  } else {
    e.target.textContent = "Display \xB0F";
    getTempContainer.textContent = `${Math.ceil(
      fetchedDataInCelsius.current.temp
    )} \xB0C`;
    getFeelsLikeContainer.textContent = `${Math.ceil(
      fetchedDataInCelsius.current.feels_like
    )} \xB0C`;
  }
});
