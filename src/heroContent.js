const weatherContent = ["date", "temp", "humidity", "wind_speed", "feels_like"];
const displayWeatherRetrieved = document.createElement("div");
const weatherPageData = document.createElement("div");
// const displayWeatherRetrieved = document.createElement("div");

displayWeatherRetrieved.className = "weather-container";

const showDefaultWeather = () => {
  displayWeatherRetrieved.textContent = "";
  document.addEventListener("DOMContentLoaded", () => {
    async function displayDefaultWeather() {
      const weatherData = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=51.51&lon=-0.13&units=metric&appid=42cb9ecb74688a62504925b13afb6382",
        { mode: "cors" }
      );
      const storeWeatherData = await weatherData.json();
      console.log(storeWeatherData);
      const showContentOfWeather = weatherContent.forEach((item) => {
        const containerDivForAll = document.createElement("div");
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const dateInTimestamp = new Date(storeWeatherData.current.dt * 1000);
        const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
          dateInTimestamp
        );
        switch (item) {
          case "date":
            containerDivForAll.textContent = formattedDate;
            containerDivForAll.className = `weather-${item}-container`;
            displayWeatherRetrieved.appendChild(containerDivForAll);
            break;
          case "temp":
            containerDivForAll.textContent = `${storeWeatherData.current.temp}\xB0C`;
            containerDivForAll.className = `weather-${item}-container`;
            displayWeatherRetrieved.appendChild(containerDivForAll);
            break;
        }
      });
      return displayWeatherRetrieved;
    }
    displayDefaultWeather();
  });
};

const showContentOfWeather = (fetchedWeather) => {
  displayWeatherRetrieved.textContent = "";
  weatherContent.forEach((item) => {
    const containerDivForAll = document.createElement("div");
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateInTimestamp = new Date(fetchedWeather.current.dt * 1000);
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      dateInTimestamp
    );
    switch (item) {
      case "date":
        containerDivForAll.textContent = formattedDate;
        containerDivForAll.className = `weather-${item}-container`;
        displayWeatherRetrieved.appendChild(containerDivForAll);
        break;
      case "temp":
        containerDivForAll.textContent = `${fetchedWeather.current.temp}\xB0C`;
        containerDivForAll.className = `weather-${item}-container`;
        displayWeatherRetrieved.appendChild(containerDivForAll);
        break;
    }
  });
  return displayWeatherRetrieved;
};

export { showDefaultWeather, showContentOfWeather };
