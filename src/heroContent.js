const showDefaultWeather = () => {
  const weatherContent = [
    "date",
    "temp",
    "humidity",
    "wind_speed",
    "feels_like",
  ];
  const displayWeatherRetrieved = document.createElement("div");
  const weatherPageData = document.createElement("div");
  const weatherPageInfo = document.createElement("div");

  document.addEventListener("DOMContentLoaded", () => {
    async function displayWeather() {
      const weatherData = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=metric&appid=42cb9ecb74688a62504925b13afb6382",
        { mode: "cors" }
      );
      const storeWeatherData = await weatherData.json();
      //   const showTemperature = await storeWeatherData.main.temp;
      // console.log(showTemperature);
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
            weatherPageData.appendChild(containerDivForAll);
            break;
          case "temp":
            containerDivForAll.textContent = `${storeWeatherData.current.temp}\xB0C`;
            containerDivForAll.className = `weather-${item}-container`;
            weatherPageInfo.appendChild(containerDivForAll);
            break;
        }
      });
    }
    displayWeather();
  });
  displayWeatherRetrieved.append(weatherPageData, weatherPageInfo);
  return displayWeatherRetrieved;
};

export { showDefaultWeather };
