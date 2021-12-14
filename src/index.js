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
content.append(pageHeader(), queryLocation, searchBtn, defaultWeatherContainer);

searchBtn.addEventListener("click", () => {
  const useVal = queryLocation.value.toLocaleLowerCase();
  async function displayWeather() {
    try {
      const weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${useVal}&units=imperial&appid=42cb9ecb74688a62504925b13afb6382`
      );
      const getWeatherData = await weatherData.json();
      if (getWeatherData.cod === 200) {
        displayReceivedData(getWeatherData);
      } else {
        errorContainer.textContent = `${getWeatherData.message}. Try again later.`;
        defaultWeatherContainer.appendChild(errorContainer);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function displayReceivedData(weatherDataReceived) {
    const longitude = weatherDataReceived.coord.lon;
    const latitude = weatherDataReceived.coord.lat;
    const getUserWeatherQuery = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=42cb9ecb74688a62504925b13afb6382`,
      { mode: "cors" }
    );
    const parseFetchedUserWeatherQuery = await getUserWeatherQuery.json();
    defaultWeatherContainer.textContent = "";
    defaultWeatherContainer.append(
      showContentOfWeather(parseFetchedUserWeatherQuery)
    );
  }
  displayWeather();
});
