import { pageHeader } from "./header";
import { showDefaultWeather, showContentOfWeather } from "./heroContent";

const content = document.querySelector(".content");
const queryLocation = document.createElement("input");
const searchBtn = document.createElement("button");
const defaultWeatherContainer = document.createElement("section");
const errorContainer = document.createElement("div");

queryLocation.setAttribute("type", "text");
queryLocation.setAttribute("class", "search");
errorContainer.setAttribute("class", "error-info");
searchBtn.textContent = "Search";
defaultWeatherContainer.append(showDefaultWeather());
content.append(pageHeader(), defaultWeatherContainer, queryLocation, searchBtn);

searchBtn.addEventListener("click", () => {
  const userQuery = queryLocation.value.toLocaleLowerCase();
  let fetchedLocationName;
  async function displayWeather() {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userQuery}&units=imperial&appid=42cb9ecb74688a62504925b13afb6382`,
      { mode: "cors" }
    );
    const getWeatherData = await weatherData.json();
    fetchedLocationName = getWeatherData.name;
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
      defaultWeatherContainer.textContent = "";
      defaultWeatherContainer.append(
        showContentOfWeather(parseFetchedUserWeatherQuery, fetchedLocationName)
      );
    } catch (error) {
      errorContainer.textContent =
        "Location not found! Search by name of City or Country.";
      defaultWeatherContainer.appendChild(errorContainer);
    }
  }
  displayReceivedData();
});
